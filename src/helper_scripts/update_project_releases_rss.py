import requests
from dataclasses import dataclass
from datetime import datetime
from typing import List, Optional
import os


import re
import html

import xml.sax.saxutils as xml_escape

def write_rss_feed(items, output_path, title="GitHub Releases", link="https://github.com", description="Latest GitHub releases"):
    rss_items = []

    for item in items:
        pub_date = item.release_creation_date.strftime("%a, %d %b %Y %H:%M:%S +0000")

        # Build item XML
        rss_items.append(f"""
        <item>
            <title>{xml_escape.escape(item.org_name + "/" + item.repository_name + " - " + item.git_release_name)}</title>
            <link>https://github.com/{item.org_name}/{item.repository_name}</link>
            <guid>https://github.com/{item.org_name}/{item.repository_name}/releases/tag/{xml_escape.escape(item.git_release_name)}</guid>
            <pubDate>{pub_date}</pubDate>
            <description><![CDATA[{item.git_release_text}]]></description>
        </item>
        """.strip())

    rss_body = "\n".join(rss_items)

    rss_xml = f"""<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
    <title>{xml_escape.escape(title)}</title>
    <link>{xml_escape.escape(link)}</link>
    <description>{xml_escape.escape(description)}</description>
    <lastBuildDate>{datetime.utcnow().strftime("%a, %d %b %Y %H:%M:%S +0000")}</lastBuildDate>

    {rss_body}

</channel>
</rss>
"""

    with open(output_path, "w", encoding="utf-8") as f:
        f.write(rss_xml)


def markdown_to_html(md: str) -> str:
    md = html.escape(md)

    # Headings
    md = re.sub(r"^### (.*)$", r"<h3>\1</h3>", md, flags=re.MULTILINE)
    md = re.sub(r"^## (.*)$", r"<h2>\1</h2>", md, flags=re.MULTILINE)
    md = re.sub(r"^# (.*)$", r"<h1>\1</h1>", md, flags=re.MULTILINE)

    # Bold and italic
    md = re.sub(r"\*\*(.*?)\*\*", r"<strong>\1</strong>", md)
    md = re.sub(r"\*(.*?)\*", r"<em>\1</em>", md)

    # Inline code
    md = re.sub(r"`([^`]+)`", r"<code>\1</code>", md)

    # Links
    md = re.sub(r"\[([^\]]+)\]\(([^)]+)\)", r'<a href="\2">\1</a>', md)

    # Lists
    def list_block(match):
        items = match.group(0).strip().split("\n")
        items = [f"<li>{i[2:].strip()}</li>" for i in items]
        return "<ul>" + "".join(items) + "</ul>"

    md = re.sub(r"(?:^[-\*] .+(?:\n|$))+", list_block, md, flags=re.MULTILINE)

    # Paragraphs
    parts = [p.strip() for p in md.split("\n\n") if p.strip()]
    html_blocks = []
    for p in parts:
        if p.startswith(("<h", "<ul>")):
            html_blocks.append(p)
        else:
            html_blocks.append("<p>" + p.replace("\n", "<br>") + "</p>")

    return "\n".join(html_blocks)



GITHUB_API_URL = "https://api.github.com/graphql"

@dataclass
class GitHubReleaseItem:
    org_name: str
    repository_name: str
    git_release_name: str
    release_creation_date: datetime
    git_release_text: str


def run_query(query: str, variables: dict, token: str):
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.post(
        GITHUB_API_URL,
        json={"query": query, "variables": variables},
        headers=headers
    )
    data = response.json()
    if "errors" in data:
        raise RuntimeError(data["errors"])
    return data["data"]


def fetch_all_repositories(org: str, token: str):
    repos = []
    cursor = None

    query = """
    query($org: String!, $cursor: String) {
      organization(login: $org) {
        repositories(first: 100, after: $cursor, orderBy: {field: PUSHED_AT, direction: DESC}) {
          nodes {
            name
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    }
    """

    while True:
        data = run_query(query, {"org": org, "cursor": cursor}, token)
        repo_data = data["organization"]["repositories"]
        repos.extend(repo_data["nodes"])

        if not repo_data["pageInfo"]["hasNextPage"]:
            break

        cursor = repo_data["pageInfo"]["endCursor"]

    return repos


def fetch_latest_release_or_tag(org: str, repo: str, token: str):
    query = """
    query($org: String!, $repo: String!) {
      repository(owner: $org, name: $repo) {
        releases(first: 1, orderBy: {field: CREATED_AT, direction: DESC}) {
          nodes {
            name
            createdAt
            description
          }
        }
        refs(first: 1, refPrefix: "refs/tags/") {
          nodes {
            name
            target {
              ... on Tag {
                tagger {
                  date
                }
              }
              ... on Commit {
                committedDate
              }
            }
          }
        }
      }
    }
    """

    data = run_query(query, {"org": org, "repo": repo}, token)
    repo_data = data["repository"]

    # Prefer releases
    if repo_data["releases"]["nodes"]:
        r = repo_data["releases"]["nodes"][0]
        release_name = r["name"] or "unnamed-release"
        release_date = r["createdAt"]
        release_text = r.get("description") or ""
        return release_name, release_date, release_text

    # Fallback to tags
    if repo_data["refs"]["nodes"]:
        t = repo_data["refs"]["nodes"][0]
        tag_name = t["name"] or "unnamed-tag"
        target = t.get("target") or {}

        # Annotated tag → tagger.date
        if "tagger" in target and target["tagger"] and "date" in target["tagger"]:
            return tag_name, target["tagger"]["date"], ""

        # Lightweight tag → commit timestamp
        if "committedDate" in target:
            return tag_name, target["committedDate"], ""

        # Fallback timestamp
        return tag_name, datetime.utcnow().isoformat() + "Z", ""

    # No releases, no tags
    return None




def fetch_releases_for_orgs(org_list: List[str], github_token: str) -> List[GitHubReleaseItem]:
    results = []

    for org in org_list:
        repos = fetch_all_repositories(org, github_token)

        for repo in repos:
            print(org+"/"+repo["name"])	
            repo_name = repo["name"]
            release_info = fetch_latest_release_or_tag(org, repo_name, github_token)
            if not release_info:
                continue

            release_name, release_date, release_text = release_info

            item = GitHubReleaseItem(
                org_name=org,
                repository_name=repo_name,
                git_release_name=release_name,
                release_creation_date=datetime.fromisoformat(release_date.replace("Z", "+00:00")),
                git_release_text=markdown_to_html(release_text)
            )
            results.append(item)

    results.sort(key=lambda x: x.release_creation_date, reverse=True)
    return results


org_list=["gardenlinux","cobaltcore-dev","gardener","ironcore-dev","cloudoperators","open-resource-discovery","open-component-model","openmfp","openmcp-project","platform-mesh","konfidence-project","luigi-project"]

github_token = os.environ.get("GITHUB_TOKEN")
if not github_token:
    raise RuntimeError("GITHUB_TOKEN environment variable not set")

res = fetch_releases_for_orgs(org_list,github_token)
print(res)

output_path = "src/docs/public/feeds/project/releases.xml"
os.makedirs(os.path.dirname(output_path), exist_ok=True)
write_rss_feed(res, output_path)


print("RSS feed written to:", output_path)

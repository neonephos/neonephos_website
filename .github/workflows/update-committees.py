#!/usr/bin/env python3

import argparse
import requests
import io
from urllib.parse import urlparse

import frontmatter
from frontmatter import Post
from ruamel.yaml import YAML
from ruamel.yaml.scalarstring import DoubleQuotedScalarString

yaml = YAML()
yaml.preserve_quotes = True
yaml.indent(mapping=2, sequence=4, offset=2)
yaml.width = 10**9

def force_quotes(value):
    """Convert all strings in a structure to double-quoted scalars."""
    if isinstance(value, dict):
        return {k: force_quotes(v) for k, v in value.items()}
    elif isinstance(value, list):
        return [force_quotes(v) for v in value]
    elif isinstance(value, str):
        return DoubleQuotedScalarString(value)
    return value

def load_ordered_frontmatter(path):
    with io.open(path, "r", encoding="utf8") as f:
        text = f.read()

    if text.startswith("---"):
        _, fm_text, body = text.split("---", 2)
    else:
        return Post(text)

    metadata = yaml.load(fm_text) or {}
    return Post(content=body.lstrip(), **metadata)

def dump_ordered_frontmatter(post, path):
    data = force_quotes(post.metadata)

    with io.open(path, "w", encoding="utf8") as f:
        f.write("---\n")
        yaml.dump(data, f)
        f.write("---\n")
        f.write(post.content)

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("-f", "--filename", help="filename to save output to")
    parser.add_argument("-c", "--lfx_committee_url", help="LFX committee URL")
    args = parser.parse_args()

    # Load file with ordered YAML
    post = load_ordered_frontmatter(args.filename)

    # Process LFX URL
    urlparts = urlparse(args.lfx_committee_url).path.split("/")
    if (
        urlparts
        and urlparts[1] == "project"
        and urlparts[3] == "collaboration"
        and urlparts[4] == "committees"
    ):
        committee_url = (
            "https://api-gw.platform.linuxfoundation.org/project-service/v2/public/"
            "projects/{project_id}/committees/{committee_id}/members"
            "?$filter=votingstatus%20eq%20Voting%20Rep"
        ).format(project_id=urlparts[2], committee_id=urlparts[5])

        alternates_url = (
            "https://api-gw.platform.linuxfoundation.org/project-service/v2/public/"
            "projects/{project_id}/committees/{committee_id}/members"
            "?$filter=votingstatus%20eq%20Alternate%20Voting%20Rep"
        ).format(project_id=urlparts[2], committee_id=urlparts[5])
        
        tsc_observers_url = (
            "https://api-gw.platform.linuxfoundation.org/project-service/v2/public/"
            "projects/{project_id}/committees/{committee_id}/members"
            "?$filter=votingstatus%20eq%20Observer"
        ).format(project_id=urlparts[2], committee_id=urlparts[5])

        members = []
        alternates = []
        tsc_observers = []
        response = requests.get(committee_url).json()
        alternates_response = requests.get(alternates_url).json()
        tsc_observers_response = requests.get(tsc_observers_url).json()

        for m in response.get("Data", []):
            print(f"Processing {m.get('FirstName').title()} {m.get('LastName').title()}...")
            role = ""

            if m.get("Role") == "Chair":
                role += "Chairperson and "

            appointed = m.get("AppointedBy")
            org = m.get("Organization", {}).get("Name")

            if appointed == "Membership Entitlement":
                role += f"{org} Representative"
            elif appointed == "Vote of General Member Class":
                role += "General Member Representative"
            elif appointed == "Vote of TSC Committee":
                role += "Project Representative"
            elif appointed == "Vote of TAC Committee":
                role += "TAC Representative"

            members.append({
                "name": f"{m.get('FirstName').title()} {m.get('LastName').title()}",
                "imgsrc": m.get("LogoURL"),
                "role": role,
                "details": m.get("AboutMe", {}).get("Description"),
                "linkedin": m.get("AboutMe", {}).get("LinkedIn")
            })

        for m in alternates_response.get("Data", []):
            print(f"Processing alternate {m.get('FirstName').title()} {m.get('LastName').title()}...")
            role = "Alternate "

            appointed = m.get("AppointedBy")
            org = m.get("Organization", {}).get("Name")

            if appointed == "Membership Entitlement":
                role += f"{org} Representative"
            elif appointed == "Vote of General Member Class":
                role += "General Member Representative"
            elif appointed == "Vote of TSC Committee":
                role += "Project Representative"
            elif appointed == "Vote of TAC Committee":
                role += "TAC Representative"

            alternates.append({
                "name": f"{m.get('FirstName').title()} {m.get('LastName').title()}",
                "imgsrc": m.get("LogoURL"),
                "role": role,
                "details": m.get("AboutMe", {}).get("Description"),
                "linkedin": m.get("AboutMe", {}).get("LinkedIn")
            })

        for m in alternates_response.get("Data", []):
            print(f"Processing alternate {m.get('FirstName').title()} {m.get('LastName').title()}...")
            role = "Observer "

            appointed = m.get("AppointedBy")
            org = m.get("Organization", {}).get("Name")

            if appointed == "Vote of TSC Committee":
                role += f"TSC Representative"
            else:
                continue

            tsc_observers.append({
                "name": f"{m.get('FirstName').title()} {m.get('LastName').title()}",
                "imgsrc": m.get("LogoURL"),
                "role": role,
                "details": m.get("AboutMe", {}).get("Description"),
                "linkedin": m.get("AboutMe", {}).get("LinkedIn")
            })

        post["members"] = members
        post["alternates"] = alternates
        post["tsc_observers"] = tsc_observers
        
    # Save with ordered keys preserved
    dump_ordered_frontmatter(post, args.filename)

if __name__ == "__main__":
    main()

import { createContentLoader } from 'vitepress'
import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'

// Load and parse authors.yml
const authorsPath = path.resolve(process.cwd(), 'docs/blog/authors.yml')
const authorsIndex = yaml.load(fs.readFileSync(authorsPath, 'utf8'))

export default createContentLoader('blog/*.md', {
  includeSrc: true,
  excerpt: false,
  render: false,
  transform(data) {
    return data
      .filter(post => post.frontmatter.published !== false)
      .sort((a, b) => +new Date(b.frontmatter.date) - +new Date(a.frontmatter.date))
      .map(post => {
        const raw = post.src || ''
        const content = raw
          .replace(/^---[\s\S]*?---/, '')
          .replace(/^#.*$\n?/gm, '')
          .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
          .trim()

        const short = content.length > 120 ? content.slice(0, 120) + '...' : content

        // Resolve author names
        const authorIds = post.frontmatter.authors || []
        const resolvedAuthors = authorIds.map(id => {
          const entry = authorsIndex[id]
          return entry?.[0]?.name || id // fallback to ID if name not found
        })

        return {
          title: post.frontmatter.title,
          authors: resolvedAuthors,
          banner: post.frontmatter.banner || '/assets/blog/default_banner.jpg',
          date: post.frontmatter.date,
          tags: post.frontmatter.tags,
          url: post.url,
          excerpt: short
        }
      })
  }
})


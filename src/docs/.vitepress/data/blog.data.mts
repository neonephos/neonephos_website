import { createContentLoader } from 'vitepress'
//for options used see https://vitepress.dev/guide/data-loading
export default createContentLoader('blog/*.md', {
  includeSrc: true,
  excerpt: false,
  render: false,
  transform(data) {
    return data
      .filter(post => post.frontmatter.published !== false)
      .sort((a, b) => {
        return +new Date(b.frontmatter.date) - +new Date(a.frontmatter.date)
      })
      .map(post => {
        const raw = post.src || ''
        const content = raw
          .replace(/^---[\s\S]*?---/, '')
          .replace(/^#.*$\n?/gm, '')
          .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
          .trim()

        const short = content.length > 120 ? content.slice(0, 120) + '...' : content

        return {
          title: post.frontmatter.title,
          author: post.frontmatter.author,
          banner: post.frontmatter.banner,
          date: post.frontmatter.date,
          tags: post.frontmatter.tags,
          url: post.url,
          excerpt: short
        }
      })
  }
})

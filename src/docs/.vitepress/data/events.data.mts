import { createContentLoader } from 'vitepress'

export default createContentLoader('events/*.md', {
  excerpt: true,
  render: true,
  transform(data) {
    return data
      .filter(post => post.frontmatter.published !== false)
      .sort((a, b) => {
        return +new Date(a.frontmatter.date) - +new Date(b.frontmatter.date)
      })
      .map(post => {
        const raw = post.src || ''
        const content = raw.replace(/^---[\s\S]*?---/, '').trim()

        return {
          title: post.frontmatter.title,
          banner: post.frontmatter.banner,
          bannerSmall: post.frontmatter.bannerSmall,
          bannerMobile: post.frontmatter.bannerMobile,
          date: post.frontmatter.date,
          url: post.url,
          backgroundhex: post.frontmatter.backgroundhex,
          full: content
        }
      })
  }
})

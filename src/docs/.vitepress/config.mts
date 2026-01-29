// .vitepress/config.mts
import { defineConfig } from 'vitepress'
import { fileURLToPath, URL } from 'node:url'
import path from 'path'
import fs from 'fs'
import { createMarkdownRenderer } from 'vitepress'


const base = process.env.BASE || '/'

export default defineConfig({
  title: "NeoNephos Foundation",
  description: "The website of the NeoNephos Foundation.",
  head: [
    ['link', { rel: 'icon', type: 'image/webp', href: '/favicon.webp' }]
  ],
  ignoreDeadLinks: true,
  cleanUrls : true,
  base,
  vite: getViteConfig(),

  transformPageData(pageData) {
    if (pageData.relativePath.startsWith('blog/')) {
      pageData.frontmatter.sidebar = false
      pageData.frontmatter.aside = false
      pageData.frontmatter.prev = false
      pageData.frontmatter.next = false
      pageData.frontmatter.layout = "BlogEntryThemeComponent"
    }
    if (pageData.relativePath.startsWith('events/')) {
      pageData.frontmatter.sidebar = false
      pageData.frontmatter.aside = false
      pageData.frontmatter.prev = false
      pageData.frontmatter.next = false
      pageData.frontmatter.layout = "EventEntryThemeComponent"
    }
  },

  // ⭐ FIXED: Import the loader *inside* buildEnd
  async buildEnd(siteConfig) {
    //const { default: posts } = await import('./data/blog.data.mts')
    const md = await createMarkdownRenderer( siteConfig.srcDir, siteConfig.markdown, siteConfig.site.base );
    const loader = (await import('./data/blog.data.mts')).default
    const posts = await loader.load()
    const outDir = siteConfig.outDir
    const rss = generateRSS(posts, md)
    const docsDir = path.resolve(process.cwd(), 'docs');
    fs.writeFileSync(path.join(outDir, '/feeds/blog/rss.xml'), rss);


  },

  themeConfig: {
    nav: [
      {
        text: 'About',
        items: [
          { text: 'Introduction', link: '/introduction' },
          { text: 'Members', link: '/members' },
          { text: 'Governing Board', link: '/governing_board' },
          { text: 'Technical Advisory Council', link: '/technical_advisory_council' },
        ]
      },
      {
        text: 'Projects',
        items: [
          { text: 'Projects', link: '/projects' },
          { text: 'Contribute', link: '/new_project' },
        ]
      },
      {
        text: 'Community',
        items: [
          { text: 'Events', link: '/events'},
          { text: 'Blog', link: '/blog'},
          { text: 'Zulip', link: 'https://linuxfoundation.zulipchat.com/#narrow/channel/525732-neonephos-discussion/topic/channel.20events/with/558483910'},
          { text: 'Mailing Lists', link: 'https://lists.neonephos.org/g/main/subgroups' },
          { text: 'YouTube', link: 'https://www.youtube.com/channel/UCqTJlPfPRAynwpcNI0O7xkw' },
          { text: 'Artwork & Branding', link: '/branding_guidelines' },
          { text: 'Contact', link: '/contact'},
        ]
      }
    ],

    sidebar: [
      {
        text: 'About',
        items: [
          { text: 'Introduction', link: '/introduction' },
          { text: 'Members', link: '/members' },
          { text: 'Governing Board', link: '/governing_board' },
          { text: 'Technical Advisory Council', link: '/technical_advisory_council' },
          { text: 'FAQ', link: '/faq' }
        ]
      },
      {
        text: 'Projects',
        items: [
          { text: 'Current Projects', link: '/projects' }
        ]
      }
    ],

    search: {
      provider: 'local'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/neonephos' },
      { icon: 'youtube', link: 'https://www.youtube.com/channel/UCqTJlPfPRAynwpcNI0O7xkw' },
    ],

    logo: {
      light: '/assets/neonephos_logo.svg',
      dark: '/assets/neonephos_logo_white.svg',
      alt: 'NeoNephos Logo'
    },
    
    siteTitle: false,
    footer: {
      message: 'For applicable policies including privacy policy, terms of use and trademark usage guidelines, please see <a href="https://linuxfoundation.eu">https://linuxfoundation.eu</a>.',
      copyright: 'Copyright © The Linux Foundation Europe.'
    }
  }
})

function getViteConfig() {
  return {
    resolve: {
      alias: [
        {
          find: /^.*\/VPFooter\.vue$/,
          replacement: fileURLToPath(
            new URL('./theme/components/NeoNephosFooter.vue', import.meta.url)
          )
        },
        {
          find: '@theme',
          replacement: fileURLToPath(new URL('./theme', import.meta.url))
        },
        {
          find: '@components',
          replacement: fileURLToPath(new URL('./theme/components', import.meta.url))
        },
        {
          find: '@assets',
          replacement: fileURLToPath(new URL('/assets', import.meta.url))
        }
      ]
    }
  }
}

function generateRSS(posts, md) {
  const siteUrl = 'https://neonephos.org'

  const items = posts
    .map(post => {
      const link = siteUrl + post.url

      // Convert Markdown → HTML using VitePress’s own renderer
      const html = md.render(post.full)

      return `
  <item>
    <title><![CDATA[${post.title}]]></title>
    <link>${link}</link>
    <guid>${link}</guid>
    <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    <description><![CDATA[${html}]]></description>
  </item>`
    })
    .join('')

  return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
<channel>
  <title>NeoNephos Blog</title>
  <link>${siteUrl}</link>
  <description>Updates from the NeoNephos Foundation</description>
  <language>en</language>
  ${items}
</channel>
</rss>`
}

import { defineConfig } from 'vitepress'
import { fileURLToPath, URL } from 'node:url'
import path from 'path'

const base = process.env.BASE || '/'

// https://vitepress.dev/reference/site-config
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
        pageData.frontmatter.aside = false
        pageData.frontmatter.prev = false
        pageData.frontmatter.next = false

        pageData.frontmatter.layout = "BlogEntryThemeComponent"
      }
      if (pageData.relativePath.startsWith('events/')) {
        pageData.frontmatter.sidebar = false
        pageData.frontmatter.aside = false
        pageData.frontmatter.aside = false
        pageData.frontmatter.prev = false
        pageData.frontmatter.next = false

        pageData.frontmatter.layout = "EventEntryThemeComponent"
      }
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
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
        { text: 'Artwork', link: 'https://artwork.neonephos.org/' },
       { text: 'Contact', link: '/contact'},
        ]
      }
      //{ text: 'Home', link: '/' },

      //{ text: 'Members', link: '/members' },
      //{ text: 'Calendar', link: 'https://zoom-lfx.platform.linuxfoundation.org/meetings/neonephos-foundation?view=month' },
      //{ text: 'Mailing Lists', link: 'https://lists.neonephos.org/g/main/subgroups' },

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
    
    siteTitle: false,        // Hides the default text title
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

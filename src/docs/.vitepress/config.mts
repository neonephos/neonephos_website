import { defineConfig } from 'vitepress'
import { fileURLToPath, URL } from 'node:url'
import path from 'path'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "NeoNephos Foundation",
  description: "The website of the NeoNephos Foundation.",
  ignoreDeadLinks: true,
  cleanUrls : true,
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
        { text: 'Mailing Lists', link: 'https://lists.neonephos.org/g/main/subgroups' },
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
    ],

    logo: {
      light: '/neonephos_logo.svg',
      dark: '/neonephos_logo_white.svg',
      alt: 'My Logo'
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
        }
      ]
    }
  }
}

import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import NeoNephosLayout from '@components/NeoNephosLayout.vue' // ✅ Import your layout
import { layoutMap } from '@theme/importRegistry'

export default {
  extends: DefaultTheme,
  Layout: NeoNephosLayout,
  enhanceApp({ app }) {
    for (const [name, component] of Object.entries(layoutMap)) {
      app.component(name, component)
    }
  }
} satisfies Theme

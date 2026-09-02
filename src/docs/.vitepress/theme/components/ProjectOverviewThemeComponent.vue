<!-- ProjectOverviewThemeComponent.vue -->
<script setup lang="ts">
import NeoNephosDefaultTheme01 from './NeoNephosDefaultTheme01.vue'
import DynamicProjectCardThemeComponent from './DynamicProjectCardThemeComponent.vue'
import LandingTilesThemeComponent from './LandingTilesThemeComponent.vue'

import { useData } from 'vitepress'
import { computed } from 'vue'

const { frontmatter } = useData()

// Build relationships_logos dynamically from frontmatter.cards:
// classname → logo
const relationships_logos = computed(() => {
  const map: Record<string, string> = {}

  const cards = frontmatter.value.cards || []
  cards.forEach((card: any) => {
    if (card.classname && card.logo) {
      map[card.classname] = card.logo
    }
  })

  return map
})
</script>

<template>
  <NeoNephosDefaultTheme01 :hero="frontmatter.hero">
    <template #home-hero-after>

      <div class="project-lifecycle-hero">
        <DynamicProjectCardThemeComponent
          :cards="frontmatter.cards"
          :relationships_logos="relationships_logos"
        />
      </div>

      <div class="neonephos-blue-section">
        <div class="neonephos-blue-section-inner">
          <LandingTilesThemeComponent
            :key="frontmatter.title"
            :titleColor="'white'"
            :tiles="frontmatter.tiles"
            :heading="frontmatter.tilesHeading"
          />
        </div>
      </div>

      <br>

    </template>
  </NeoNephosDefaultTheme01>
</template>

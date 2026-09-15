<!-- ProjectOverviewThemeComponent.vue -->
<script setup lang="ts">
import NeoNephosDefaultTheme02 from './NeoNephosDefaultTheme02.vue'
import DynamicProjectCardThemeComponent from './DynamicProjectCardThemeComponent.vue'

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
  <NeoNephosDefaultTheme02 :hero="frontmatter.hero">
    <template #home-hero-after>

      <!-- BREAKOUT WRAPPER: only the card section becomes 1300px wide -->
      <div class="project-lifecycle-hero-breakout">
        <div class="project-lifecycle-hero">
          <DynamicProjectCardThemeComponent
            :cards="frontmatter.cards"
            :relationships_logos="relationships_logos"
          />
        </div>
      </div>

      <br>

    </template>
  </NeoNephosDefaultTheme02>
</template>

<style scoped>
.project-lifecycle-hero-breakout {
  width: 100vw;
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
  display: flex;
  justify-content: center;
}

.project-lifecycle-hero {
  max-width: 1300px;
  width: 100%;
  padding: 0 1.5rem;
  display: flex;
  justify-content: center;
}
</style>

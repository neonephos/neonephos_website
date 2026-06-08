<script setup lang="ts">
import NeoNephosDefaultTheme01 from './NeoNephosDefaultTheme01.vue'
import DynamicCardThemeComponent from './DynamicCardThemeComponent.vue'

import { useData, withBase} from 'vitepress'

const { frontmatter } = useData()
</script>

<template>
  <div >
    <NeoNephosDefaultTheme01 :hero="frontmatter.hero">
      <template #home-hero-after>
  

<div class="project-lifecycle-hero">
<DynamicCardThemeComponent />

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
      </template>
    </NeoNephosDefaultTheme01>
  </div>
</template>

<style scoped>
.events-text-container {
  padding: 2rem 1rem;
}

</style>

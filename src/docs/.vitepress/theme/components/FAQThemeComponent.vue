<script setup lang="ts">
import NeoNephosDefaultTheme01 from './NeoNephosDefaultTheme01.vue'
import DynamicCardThemeComponent from './DynamicCardThemeComponent.vue'

import { useData, withBase} from 'vitepress'

const { frontmatter } = useData()
</script>

<template>
  <div>
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
        <br>

      </template>
    </NeoNephosDefaultTheme01>
  </div>
</template>

<style scoped>

.lifecycle-section {
  text-align: center;
  padding: 3rem 1rem 2rem;
}

.lifecycle-heading {
  font-size: 2.4rem;
  font-weight: 700;
  margin-bottom: 1.8rem;
  color: var(--vp-neonephos-blue);
  letter-spacing: -0.5px;
}

.lifecycle-image {
  max-width: 900px;
  width: 100%;
  margin: 0 auto 2.5rem;
  display: block;
  border-radius: 6px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.08);
}

.lifecycle-intro {
  max-width: 900px;
  margin: 0 auto 2rem;
  font-size: 1.15rem;
  line-height: 1.6;
  color: var(--vp-c-text-2);
}




</style>

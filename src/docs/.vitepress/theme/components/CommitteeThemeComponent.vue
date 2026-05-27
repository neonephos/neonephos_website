<script setup>
import VPHome from 'vitepress/dist/client/theme-default/components/VPHome.vue'
import NeoNephosDefaultTheme01 from './NeoNephosDefaultTheme01.vue'
import CommitteeTilesThemeComponent from './CommitteeTilesThemeComponent.vue'

import { useData } from 'vitepress'
const { frontmatter } = useData()
</script>

<template>
  <NeoNephosDefaultTheme01 :key="frontmatter.title" :hero="frontmatter.hero">
    <template #home-hero-after-title-before-end>
    <section>
    <p class="neonephos-home-hero-text">
        <span v-html="frontmatter.hero?.description" />
    </p>
    <br>
    <br>
    </section>
      <section>
        <CommitteeTilesThemeComponent :features="frontmatter.members" />
        <section v-if="frontmatter.alternates">
          <br>
          <br>
          <p class="neonephos-home-hero-subtitle">
            Alternates
          </p>
          <CommitteeTilesThemeComponent
            :features="frontmatter.alternates"
          />
        </section>
        <section v-if="frontmatter.observers">
          <br>
          <br>
          <p class="neonephos-home-hero-subtitle">
            Observers
          </p>
          <CommitteeTilesThemeComponent
            :features="frontmatter.observers"
          />
        </section>
      </section>

      <br>
      <br>
    </template>

  <template #home-hero-after>
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
</template>

<style scoped>



</style>

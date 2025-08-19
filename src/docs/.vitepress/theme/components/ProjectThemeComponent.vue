<script setup lang="ts">
import NeoNephosDefaultTheme01 from './NeoNephosDefaultTheme01.vue'
import ProjectTilesThemeComponent from './ProjectTilesThemeComponent.vue'
import { useData } from 'vitepress'

const { frontmatter } = useData();


</script>

<template>
  <NeoNephosDefaultTheme01 :hero="frontmatter.hero">
    <template #home-hero-after-title-before-end>
      <section>
        <ProjectTilesThemeComponent :features="frontmatter.projects" />
      </section>
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

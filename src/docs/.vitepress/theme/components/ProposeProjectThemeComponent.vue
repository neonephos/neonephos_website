<script setup lang="ts">
import NeoNephosDefaultTheme01 from './NeoNephosDefaultTheme01.vue'
import { useData } from 'vitepress'

const { frontmatter } = useData();


</script>

<template>
  <NeoNephosDefaultTheme01 :hero="frontmatter.hero">
    <template #home-hero-after-title-before-end>
      <section>
        <p class="neonephos-home-hero-text" v-html="frontmatter.hero.descriptionPart1" />
        <div class="neonephos-home-hero-subtitle" v-html="frontmatter.hero.descriptionHeading2" />
        <p class="neonephos-home-hero-text" v-html="frontmatter.hero.descriptionPart2" />
        <div class="neonephos-home-hero-subtitle" v-html="frontmatter.hero.descriptionHeading3" />
        <p class="neonephos-home-hero-text" v-html="frontmatter.hero.descriptionPart3" />
        <br>
        <br>
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

.neonephos-home-hero-subtitle{
  margin-top:2rem;
}

</style>

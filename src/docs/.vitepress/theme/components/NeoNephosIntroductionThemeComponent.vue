<script setup lang="ts">
import NeoNephosDefaultTheme01 from './NeoNephosDefaultTheme01.vue'
import LandingTilesThemeComponent from './LandingTilesThemeComponent.vue'
import IntroductionTile from './NeoNephosIntroductionTilesThemeComponent.vue'
import { useData } from 'vitepress'

const { frontmatter } = useData()
</script>

<template>
  <div >
    <NeoNephosDefaultTheme01 :hero="frontmatter.hero">
      <template #home-hero-after>
        <IntroductionTile
          image=""
          :html="frontmatter.hero?.descriptionPart1"
          align="left"
          titleColor="white"
        />
        <IntroductionTile
          image="/introduction_member_logo_banner.svg"
          :html="frontmatter.hero?.descriptionPart2"
          align="right"
          titleColor="white"
        />
        <IntroductionTile
          image="/cloud-edge-continuum.svg"
          :html="frontmatter.hero?.descriptionPart3"
          align="left"
          titleColor="white"
        />
        <IntroductionTile
          image="/introduction_neonephos_banner.svg"
          :html="frontmatter.hero?.descriptionPart4"
          align="right"
          titleColor="white"
        />

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

<script setup lang="ts">
import NeoNephosDefaultTheme01 from './NeoNephosDefaultTheme01.vue'
import MemberTilesThemeComponent from './MemberTilesThemeComponent.vue'
import { useData } from 'vitepress'

const { frontmatter } = useData();

console.log(frontmatter.members?.premier);
console.log(frontmatter.hero?.premier);

</script>

<template>
  <NeoNephosDefaultTheme01 :hero="frontmatter.hero">
    <template #home-hero-after-title-before-end>
      <section>
        <h2>Premier Members</h2>
        <MemberTilesThemeComponent :features="frontmatter.members.premier" />

        <h2>General Members</h2>
        <MemberTilesThemeComponent :features="frontmatter.members.general" />

        <h2>Associate Members</h2>
        <MemberTilesThemeComponent :features="frontmatter.members.associate" />
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

h2 {
  font-size: 2rem;
  font-weight: 600;

  color: var( --vp-home-hero-name-color);
  border-bottom: 2px solid var(--vp-c-divider, #e0e0e0);
  padding-bottom: 0.5rem;
  letter-spacing: 0.5px;
}


</style>

<script setup lang="ts">
import { data as rawPosts } from '../../data/events.data'
import NeoNephosDefaultTheme01 from './NeoNephosDefaultTheme01.vue'
import EventsTilesThemeComponent from './EventsTilesThemeComponent.vue'
import { useData } from 'vitepress'

const { frontmatter } = useData();

const now = new Date();
const posts = rawPosts.filter(post => {
  const postDate = new Date(post.date);
  return postDate >= now;
});

</script>

<template>
  <NeoNephosDefaultTheme01 :hero="frontmatter.hero">
    <template #home-hero-after-title-before-end>
      <section>
            <div class="vp-features">
            <div v-for="post in posts" :key="post.url" class="vp-feature" :style="{ background: post.backgroundhex || '#876296' }">
                <a :href="post.url" class="vp-feature-link">
                <div class="vp-feature-imgsrc-container">
                <img class="vp-feature-imgsrc" :src="post.bannerSmall" :alt="post.name" />
                <div class="vp-feature-text-overlay">
                    <h2 class="vp-feature-title">{{ post.title }}</h2>
                    <h3 class="vp-feature-date">{{ post.date }}</h3>
                </div>
                </div>
                </a>
            </div>
            </div>
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

.events-text-container ::v-deep(.VPHome) {
  margin-bottom: 3.5rem; /* Reduce space below title */
}

/* Use ::v-deep to reach into VPHomeHero */
.events-text-container ::v-deep(.VPHomeHero .name) {
  font-size: 3rem;
  color: pink;
  margin-bottom: 3.5rem;
}

.events-text-container ::v-deep(.VPHomeHero .text) {
 font-size: 2rem;
  line-height: 1.4;
  margin-top: 0;
  max-width: 800px;
  font-weight: normal;
}

.entries-heading {
  font-size: 2rem;
  font-weight: bold;
  margin-top: 1rem;
  margin-bottom: 1rem;
  text-align: left;
  color: var(--vp-c-brand);
}

.entries-section {
  margin: 1rem auto; 
  max-width: 1800px;
  text-align: left;
  margin-top: 0rem;
}

.vp-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  padding: 1rem;
  max-width:1000px;
  margin-bottom:2rem;
}


.vp-feature {
  aspect-ratio: 16 / 9;
  width: 100%;
  max-width:400px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  overflow: hidden;
  transition: transform 0.2s ease;
}


.vp-feature:hover {
  transform: translateY(-4px);
}

.vp-feature-link {
  display: block;
  padding: 0 0rem;
  text-decoration: none;
  color: inherit;
  width:100%;
  height:100%;
}

.vp-feature-imgsrc-container {
  position: relative;
  width: 100%;
  height: 100%;
  margin: auto;
}

.vp-feature-imgsrc {
  max-height: 100%;
  max-width:100%;
  border-radius: 0%;
  object-fit: cover;
  display: block;
}

.vp-feature-text-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 0%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0.5rem;
  color: white;
  background: rgba(0, 0, 0, 0.4); /* semi-transparent dark overlay */
}

.vp-feature-title {
  font-size: 1.4rem;
  font-weight: 600;
  color: white;
}

.vp-feature-date {
  font-size: 0.9rem;
  color: white;
}

</style>

<template>
  <div class="landing-tiles-wrapper">
    <h2
      class="landing-tiles-heading custom-title-color"
      :style="{ '--custom-title-color': props.titleColor }"
    >
      {{ props.heading }}
    </h2>

    <div class="landing-tiles">
      <div class="landing-tile" v-for="(tile, index) in props.tiles" :key="index">
        <div class="landing-tile__top">
          <h3 class="landing-tile__title">{{ tile.title }}</h3>
          <p v-if="tile.lead"><strong>{{ tile.lead }}</strong></p>
          <p>{{ tile.details }}</p>
        </div>
        <div class="landing-tile__bottom">
          <a :href="resolveLink(tile.linkUrl)" class="landing-tile__link">{{ tile.linkText }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useData, withBase } from 'vitepress'
import { resolveSrc, resolveLink } from '../utils'

const props = defineProps<{
  titleColor?: string
  tiles: {
    title: string
    lead?: string
    details: string
    linkText: string
    linkUrl: string
  }[]
  heading: string
}>()


const { frontmatter } = useData()
const tiles = frontmatter.value.tiles || []
</script>

<style scoped>
.landing-tiles-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

:deep(.custom-title-color) {
  color: var(--custom-title-color);
}

.landing-tiles-heading {
  font-size: 2.5rem;
  font-weight: 700;
  margin-top: 0rem;
  margin-bottom: 1rem;
  line-height: 1.2;
  text-align: left;
}

.landing-tiles {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  margin-top: 2rem;
}

.landing-tile {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1 1 280px;
  max-width: 360px;
  min-height: 220px;
  padding: 2rem;
  background-color: var(--vp-c-bg);
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
  border: 1px solid #e5e7eb;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.landing-tile:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
}

.landing-tile__title {
  font-size: 1.75rem;
  font-weight: 600;
  color: var(--vp-neonephos-blue);
  margin-bottom: 0.75rem;
  line-height: 1.2;
  letter-spacing: -0.5px;
}

.landing-tile__top p {
  font-size: 1rem;
  color: var(--vp-c-text-1);
  margin-bottom: 0.75rem;
}

.landing-tile__link {
  display: inline-block;
  margin-top: 1rem;
  background-color: var(--vp-neonephos-blue);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 600;
  text-decoration: none;
  font-size: 0.95rem;
  transition: background-color 0.2s ease;
}

.landing-tile__link:hover {
  background-color: #005bb5;
}
</style>

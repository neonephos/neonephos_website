<script setup lang="ts">
import { ref, computed } from 'vue'
import { withBase } from 'vitepress'
import { data as globalMembersData } from './../../data/members.data.mts'
import { data as globalProjectsData } from './../../data/projects.data.mts'
import MemberTilesMiniThemeComponent from './MemberTilesMiniThemeComponent.vue'
import ContributorTilesMiniThemeComponent from './ContributorTilesMiniThemeComponent.vue'

interface Tile {
  title?: string
  subtitle?: string
  details?: string
  linkText?: string
  linkUrl?: string
  icon?: string
  mode?: string
  members?: any
  cards?: any
}

const props = defineProps<{
  heading?: string
  subheading?: string
  mode?: string
  tiles?: Tile[]
}>()

const isExternal = (url?: string) => (url ? /^https?:\/\//.test(url) : false)

const hoveredIndex = ref<number>(-1)

// Split tiles into chunks of 3 for multi-row support
const chunkedTiles = computed(() => {
  const list = props.tiles || []
  const chunks = []
  for (let i = 0; i < list.length; i += 3) {
    chunks.push(list.slice(i, i + 3))
  }
  return chunks
})

const getCharList = (details: string | undefined, index: number) => {
  if (!details) return []
  const isUnselected = hoveredIndex.value !== -1 && hoveredIndex.value !== index
  const text = isUnselected ? details.slice(0, 60) : details
  const total = text.length

  return text.split('').map((char, i) => {
    const opacity = isUnselected
      ? Math.max(0.02, 1 - (i / (total - 1 || 1)) * 0.98)
      : 1
    return { char, opacity }
  })
}
</script>

<template>
  <div class="landing-tiles-section">
    <div class="container wrap">
      <!-- Section Header -->
      <div v-if="heading || subheading" class="tiles-header">
        <h2 v-if="heading" class="tiles-section__heading">{{ heading }}</h2>
        <p v-if="subheading" class="tiles-section__subheading">{{ subheading }}</p>
      </div>
      
      <!-- Interactive Expanding Rows -->
      <div class="tiles-rows-wrapper" @mouseleave="hoveredIndex = -1">
        <div 
          v-for="(row, rIdx) in chunkedTiles"
          :key="rIdx"
          class="tiles-grid"
        >
          <div
            v-for="(tile, cIdx) in row"
            :key="rIdx * 3 + cIdx"
            class="tile-card"
            :class="{ 
              'is-member-mode': (tile.mode || props.mode) === 'member',
              'is-contributor-mode': (tile.mode || props.mode) === 'contributor',
              'is-expanded': hoveredIndex === (rIdx * 3 + cIdx),
              'is-shrunk': hoveredIndex !== -1 && hoveredIndex !== (rIdx * 3 + cIdx)
            }"
            @mouseenter="hoveredIndex = rIdx * 3 + cIdx"
          >
            <div class="tile-content-inner">
              <div v-if="tile.icon" class="tile-icon">
                <img :src="withBase(tile.icon)" :alt="tile.title || 'Tile icon'" />
              </div>

              <h3 v-if="tile.title" class="tile-title">{{ tile.title }}</h3>
              <h4 v-if="tile.subtitle" class="tile-subtitle">{{ tile.subtitle }}</h4>
              
              <p v-if="tile.details" class="tile-details">
                <span
                  v-for="(item, charIdx) in getCharList(tile.details, rIdx * 3 + cIdx)"
                  :key="charIdx"
                  class="fading-char"
                  :style="{ opacity: item.opacity }"
                >{{ item.char }}</span>
              </p>

              <!-- Member Carousel Mode -->
              <div
                v-if="(tile.mode || props.mode) === 'member'"
                class="member-carousel-wrapper"
              >
                <MemberTilesMiniThemeComponent
                  :members="tile.members || globalMembersData"
                />
              </div>

              <!-- Contributor Carousel Mode -->
              <div
                v-if="(tile.mode || props.mode) === 'contributor'"
                class="member-carousel-wrapper"
              >
                <ContributorTilesMiniThemeComponent
                  :cards="tile.cards || globalProjectsData"
                />
              </div>

              <!-- Action Button -->
              <div v-if="tile.linkUrl && tile.linkText" class="tile-action">
                <a 
                  :href="isExternal(tile.linkUrl) ? tile.linkUrl : withBase(tile.linkUrl)"
                  class="tile-button"
                  :target="isExternal(tile.linkUrl) ? '_blank' : undefined"
                  :rel="isExternal(tile.linkUrl) ? 'noopener noreferrer' : undefined"
                >
                  {{ tile.linkText }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.landing-tiles-section {
  padding: 2.25rem 2rem 0 2rem;
  margin-bottom: -3.35rem;
  background: var(--vp-c-bg);
  width: 100%;
}

.landing-tiles-section + * {
  padding-top: 0 !important;
  margin-top: 0 !important;
}

.container.wrap {
  max-width: 960px;
  margin: 0 auto;
}

.tiles-header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.tiles-section__heading {
  font-size: 2.5rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
  line-height: 1.2;
}

.tiles-section__subheading {
  font-size: 1.25rem;
  color: var(--vp-c-text-2);
  max-width: 750px;
  margin: 0 auto;
  line-height: 1.6;
}

.tiles-rows-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.75rem; /* Reduced vertical gap between rows */
  width: 100%;
}

.tiles-grid {
  display: flex;
  align-items: stretch;
  gap: 1.25rem;
  width: 100%;
  box-sizing: border-box;
  min-height: 350px;
}

@media (max-width: 768px) {
  .tiles-grid {
    flex-direction: column;
    min-height: auto;
    gap: 1.5rem; /* Larger gap between cards on mobile */
  }
}

.tile-card {
  flex: 1;
  min-width: 0;
  /* Restricts single tiles in incomplete rows from stretching across the page */
  max-width: calc(33.333% - 0.833rem);
  height: 100%;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  padding: 1.5rem 1.25rem;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  box-shadow: none;
  
  transition: flex 0.4s cubic-bezier(0.25, 1, 0.5, 1),
              background-color 0.3s ease,
              border-color 0.3s ease,
              opacity 0.3s ease,
              max-width 0.4s cubic-bezier(0.25, 1, 0.5, 1);
}

@media (max-width: 768px) {
  .tile-card {
    max-width: 100%;
    margin-bottom: 1rem; /* Extra breathing room (~1 br) after each card on mobile */
  }
}

.tile-content-inner {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-width: 0;
}

.tile-card.is-shrunk {
  flex: 0.75;
  opacity: 0.85;
}

.tile-card.is-expanded {
  flex: 2;
  /* Allow expanded tile room to expand */
  max-width: 100%;
  opacity: 1;
  border-color: var(--vp-neonephos-blue, var(--vp-c-brand-1));
  background: var(--vp-c-bg-mute, var(--vp-c-bg-soft));
  box-shadow: none;
  z-index: 2;
}

.tile-icon {
  margin-bottom: 0.75rem;
}

.tile-icon img {
  width: 48px;
  height: 48px;
  object-fit: contain;
}

.tile-title {
  font-size: 2rem;
  font-weight: 600;
  line-height: 1.15;
  color: var(--vp-c-text-1);
  margin-bottom: 0.35rem;
  letter-spacing: -0.02em;
}

.tile-subtitle {
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--vp-neonephos-blue, var(--vp-c-brand-1));
  margin-bottom: 0.35rem;
  line-height: 1.4;
  opacity: 1;
  max-height: 100px;
  overflow: hidden;
  transition: opacity 0.3s ease, max-height 0.3s ease, margin 0.3s ease;
}

.tile-details {
  font-size: 0.95rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
  margin: 0;
  white-space: pre-wrap;
}

.fading-char {
  transition: opacity 0.3s ease;
}

.tile-card.is-shrunk .tile-subtitle {
  opacity: 0;
  max-height: 0;
  margin-bottom: 0;
}

.member-carousel-wrapper {
  opacity: 0;
  height: 0;
  overflow: hidden;
  margin-top: 0;
  margin-bottom: 0;
  transition: opacity 0.3s ease, height 0.4s ease, margin 0.3s ease;
}

.tile-card.is-expanded .member-carousel-wrapper {
  opacity: 1;
  height: 120px;
  margin-top: 0.75rem;
  margin-bottom: 0.5rem;
}

.tile-action {
  margin-top: auto;
  padding-top: 0.5rem;
}

.tile-button {
  display: inline-block;
  background-color: var(--vp-neonephos-blue, var(--vp-c-brand-1));
  color: #ffffff;
  padding: 0.45rem 1.15rem;
  border-radius: 24px;
  font-weight: 600;
  font-size: 0.9rem;
  text-decoration: none;
  transition: background-color 0.25s ease;
}

.tile-button:hover {
  background-color: #007aff;
  color: #ffffff;
}
</style>

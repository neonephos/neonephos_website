<script setup lang="ts">
import { ref } from 'vue'
import { useData } from 'vitepress'

const { frontmatter } = useData()

const props = defineProps<{
  cards: Array<{
    title: string
    classname?: string
    tags?: string[]
    details?: string
    relationships?: string[]
    logo?: string
    link?: string
    githubLink?: string
    backgroundColor?: string
    headingColor?: string
    headinBackgroundColor?: string
  }>
  relationships_logos: Record<string, string>
}>()

const tagColorMap: Record<string, string> = {
  application: "#118936",
  data: "#5725CC",
  ai: "#e2ffd1",
  service_orchestration: "#d1d6ff",
  cloud_edge_platform: "#d9f2ff",
  virtualization: "#f2d1ff",
  management: "#fff2cc",
  sustainability: "#d6f5d6",
  compliance: "#ffe6f2",
}

const iconMap: Record<string, string> = {
  application: `<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/></svg>`,
  data: `<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v6c0 1.7 4 3 9 3s9-1.3 9-3V5"/><path d="M3 11v6c0 1.7 4 3 9 3s9-1.3 9-3v-6"/></svg>`,
  ai: `<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><circle cx="12" cy="3" r="2"/><circle cx="12" cy="21" r="2"/><circle cx="21" cy="12" r="2"/><circle cx="3" cy="12" r="2"/><path d="M8 8c2 4 6 4 8 0"/></svg>`,
  service_orchestration: `<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><circle cx="12" cy="12" r="4"/><circle cx="4" cy="4" r="2"/><circle cx="20" cy="4" r="2"/><circle cx="4" cy="20" r="2"/><circle cx="20" cy="20" r="2"/><path d="M12 8V4m0 12v4m4-4h4m-12 0H4m10-6l4-4m-10 10l-4 4m10 0l4-4m-10-10L4 4"/></svg>`,
  cloud_edge_platform: `<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M7 18h10a5 5 0 0 0 0-10 7 7 0 0 0-13 3 4 4 0 0 0 3 7z"/></svg>`,
  virtualization: `<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><rect x="3" y="3" width="18" height="6" rx="1"/><rect x="3" y="15" width="18" height="6" rx="1"/><rect x="3" y="9" width="18" height="6" rx="1"/></svg>`,
  management: `<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><circle cx="12" cy="12" r="3"/><path d="M12 2v3m0 14v3m10-10h-3M5 12H2m15.5-7.5l-2.1 2.1M8.6 17.4l-2.1 2.1m0-14.2l2.1 2.1m8.8 8.8l2.1 2.1"/></svg>`,
  sustainability: `<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 2C7 7 5 12 5 17a7 7 0 0 0 14 0c0-5-2-10-7-15z"/></svg>`,
  compliance: `<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg>`
}

const hoveredRelationship = ref<string | null>(null)
const hoveredCardIndex = ref<number | null>(null)
const hoverRelatesHeader = ref<boolean>(false)

const scrollToRelatedCard = (rel: string) => {
  const card = props.cards.find(c => c.classname === rel)
  if (!card) return

  const id = card.title.toLowerCase().replace(/\s+/g, '-')
  const el = document.getElementById(id)
  if (!el) return

  el.scrollIntoView({ behavior: 'smooth', block: 'start' })

  setTimeout(() => {
    window.scrollBy({ top: -100, behavior: 'smooth' })
  }, 250)

  window.location.hash = '#' + id
}
</script>

<template>
  <div class="dynamic-card-list">
    <div
      v-for="(card, index) in props.cards"
      :key="card.title"
      class="dynamic-card"
      :id="card.title.toLowerCase().replace(/\s+/g, '-')"
      @mouseenter="hoveredCardIndex = index"
      @mouseleave="hoveredCardIndex = null"
      :style="{
        backgroundColor: card.backgroundColor || '#ffffff',
        opacity:
          hoveredRelationship || hoverRelatesHeader
            ? (
                hoveredCardIndex === index ||
                card.classname === hoveredRelationship ||
                (hoverRelatesHeader &&
                  props.cards[hoveredCardIndex]?.relationships?.includes(card.classname))
              )
              ? 1
              : 0.35
            : 1
      }"
    >
      <div
        class="dynamic-card__header"
        :style="{ backgroundColor: card.headingBackgroundColor || 'pink' }"
      >
        <img
          v-if="card.logo"
          :src="card.logo"
          class="dynamic-card__main-logo"
          alt="project logo"
        />
        <a
          class="dynamic-card__title"
          :href="'#' + card.title.toLowerCase().replace(/\s+/g, '-')"
          :style="{ color: card.headingColor || '#0f6bff' }"
        >
          {{ card.title }}
        </a>
      </div>

      <div v-if="card.tags?.length" class="dynamic-card__tags">
        <span
          v-for="tag in card.tags"
          :key="tag"
          class="dynamic-card__tag"
          :style="{
            border: '1px solid ' + tagColorMap[tag],
            color: tagColorMap[tag],
            backgroundColor: tagColorMap[tag] + '10'
          }"
        >
          <span class="dynamic-card__tag-icon" v-html="iconMap[tag]"></span>
          {{ tag }}
        </span>
      </div>

      <p class="dynamic-card__details">
        {{ card.details }}
      </p>

      <div class="dynamic-card__separator-horizontal"></div>

      <div class="dynamic-card__links">
        <div class="dynamic-card__link-item" v-if="card.link">
          <img class="dynamic-card__icon" src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-globe'><circle cx='12' cy='12' r='10'/><path d='M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20'/><path d='M2 12h20'/></svg>" />
          <a :href="card.link" target="_blank">Website</a>
        </div>

        <div
          v-if="card.link && card.githubLink"
          class="dynamic-card__separator-vertical"
        ></div>

        <div class="dynamic-card__link-item" v-if="card.githubLink">
          <img class="dynamic-card__icon" src="https://simpleicons.org/icons/github.svg" />
          <a :href="card.githubLink" target="_blank">GitHub</a>
        </div>
      </div>

      <div class="dynamic-card__separator-horizontal"></div>

      <div v-if="card.relationships?.length" class="dynamic-card__relates">
        <div
          class="dynamic-card__relates-title"
          @mouseenter="hoverRelatesHeader = true; hoveredCardIndex = index"
          @mouseleave="hoverRelatesHeader = false"
        >
          Relates to
        </div>

        <div class="dynamic-card__relates-logos">
          <img
            v-for="rel in card.relationships"
            :key="rel"
            :src="props.relationships_logos[rel]"
            class="dynamic-card__rel-logo"
            alt="relationship logo"
            @mouseenter="hoveredRelationship = rel; hoveredCardIndex = index"
            @mouseleave="hoveredRelationship = null"
            @click="scrollToRelatedCard(rel)"
          />
        </div>
      </div>
    </div>

    <div class="dynamic-card-list__spacer"></div>
  </div>
</template>

<style scoped>
.dynamic-card-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.dynamic-card-list__spacer {
  width: 100%;
  height: 2rem;
}

.dynamic-card {
  width: 345px;
  aspect-ratio: 2 / 3;
  border-radius: 14px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.08);
  border: 1px solid #e5e8ef;
  padding: 1.3rem 1.5rem;
  display: flex;
  flex-direction: column;
  transition: opacity 0.2s ease;
}

.dynamic-card__header {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 1.2rem;
  padding: 0.6rem 0.8rem;
  border-radius: 10px;
}

.dynamic-card__main-logo {
  width: 56px;
  height: 56px;
}

.dynamic-card__title {
  font-size: 1.3rem;
  font-weight: 600;
  text-decoration: none;
}

.dynamic-card__tags {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin-bottom: 1.2rem;
}

.dynamic-card__tag {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  width: fit-content;
  padding: 0.2rem 0.45rem;
  border-radius: 6px;
  font-size: 0.72rem;
  font-weight: bold;
  line-height: 1.1;
}

.dynamic-card__tag-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.dynamic-card__details {
  font-size: 1rem;
  line-height: 1.75;
  color: black;
  margin-bottom: 1rem;
}

.dynamic-card__separator-horizontal {
  width: 100%;
  height: 1px;
  background-color: #d0d0d0;
  margin: 0.8rem 0 1rem 0;
}

.dynamic-card__links {
  display: flex;
  gap: 1rem;
  align-items: center;
  /* removed margin-bottom so both separators have same visual gap */
}

.dynamic-card__link-item {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.dynamic-card__icon {
  width: 18px;
  height: 18px;
}

.dynamic-card__links a {
  color: #0f6bff;
  font-weight: 600;
  text-decoration: none;
}

.dynamic-card__separator-vertical {
  width: 1px;
  height: 18px;
  background-color: #d0d0d0;
}

.dynamic-card__relates {
  margin-top: auto;
}

.dynamic-card__relates-title {
  font-weight: 600;
  margin-bottom: 0.5rem;
  cursor: pointer;
}

.dynamic-card__relates-logos {
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
}

.dynamic-card__rel-logo {
  width: 32px;
  height: 32px;
  cursor: pointer;
}
</style>

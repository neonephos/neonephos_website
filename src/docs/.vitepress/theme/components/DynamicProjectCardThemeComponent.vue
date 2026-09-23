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
  application: "#d64545",
  data: "#ff6c00",
  ai: "#7c3aed",
  service_orchestration: "#ec4899",
  cloud_edge_platform: "#00a6b2",
  virtualization: "#20a464",
  management: "#84cc16",
  sustainability: "#f5a623",
  compliance: "#00a99d",
}

const iconMap: Record<string, string> = {
  application: `<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/></svg>`,
  data: `<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v6c0 1.7 4 3 9 3s9-1.3 9-3V5"/><path d="M3 11v6c0 1.7 4 3 9 3s9-1.3 9-3v-6"/></svg>`,
  ai: `<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><circle cx="12" cy="3" r="2"/><circle cx="12" cy="21" r="2"/><circle cx="21" cy="12" r="2"/><circle cx="3" cy="12" r="2"/><path d="M8 8c2 4 6 4 8 0"/></svg>`,
  service_orchestration: `<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><circle cx="12" cy="12" r="4"/><circle cx="4" cy="4" r="2"/><circle cx="20" cy="4" r="2"/><circle cx="4" cy="20" r="2"/><circle cx="20" cy="20" r="2"/><path d="M12 8V4m0 12v4m4-4h4m-12 0H4m10-6l4-4m-10 10l-4 4m10 0l4-4m-10-10L4 4"/></svg>`,
  cloud_edge_platform: `<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M7 18h10a5 5 0 0 0 0-10 7 7 0 0 0-13 3 4 4 0 0 0 3 7z"/></svg>`,
  virtualization: `<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><rect x="3" y="3" width="18" height="6" rx="1"/><rect x="3" y="15" width="18" height="6" rx="1"/><rect x="3" y="9" width="18" height="6" rx="1"/></svg>`,
  management: `<svg id="a" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" width="120.22962mm" height="117.57912mm" viewBox="0 0 340.80839 333.29516">  <path d="M303.04888,132.71439h-17.58783c-2.19848-6.99367-5.01453-13.71268-8.37672-20.09984l14.91274-14.91274c8.55055-8.55024,8.55055-22.41305,0-30.96328l-20.603-20.603c-8.54992-8.55024-22.41273-8.55024-30.96328,0l-15.00693,15.00756c-5.59986-2.92067-11.45131-5.42256-17.51893-7.457v-24.67885c0-12.09195-9.80213-21.8944-21.89377-21.8944h-29.13712c-12.09164,0-21.8944,9.80245-21.8944,21.8944v23.2212c-5.78634,1.68363-11.39442,3.78413-16.79074,6.26737l-18.0695-18.06919c-8.54992-8.55024-22.41273-8.55024-30.96328,0l-21.12323,21.12291c-8.54992,8.55024-8.54992,22.41305,0,30.96328l15.59289,15.59258c-4.48293,7.707-8.14727,15.94909-10.86977,24.609h-20.76988c-12.09164,0-21.8944,9.80245-21.8944,21.8944v29.87226c0,12.09195,9.80276,21.8944,21.8944,21.8944h20.90894c1.91403,6.00916,4.28191,11.81509,7.06193,17.37987l-13.3508,13.3508c-8.55055,8.55024-8.55055,22.41305,0,30.96328l20.60237,20.603c8.55055,8.55024,22.41336,8.55024,30.96328,0l12.36091-12.36091c7.6833,4.21586,15.86976,7.62578,24.44686,10.12135v15.79959c0,12.09195,9.80276,21.8944,21.8944,21.8944h29.13712c12.09164,0,21.89377-9.80245,21.89377-21.8944v-17.25692c6.62578-2.22187,12.99682-4.99651,19.06002-8.27021l12.09922,12.09985c8.55055,8.55024,22.41336,8.55024,30.96328,0l21.12323-21.12323c8.55055-8.55024,8.55055-22.41305,0-30.96328l-12.91464-12.91464c2.79077-5.57964,5.16687-11.40169,7.08595-17.42854h17.7269c12.09164,0,21.89377-9.80245,21.89377-21.8944v-29.87226c0-12.09195-9.80213-21.8944-21.89377-21.8944ZM92.01068,169.33063c0-.15044.01075-.29867.01138-.44911.2421-42.57104,34.69779-77.02768,77.26851-77.27199.15171-.00063.30088-.01138.45259-.01138,42.77995,0,77.47837,34.56062,77.72111,77.28337.00126.15044.01138.29867.01138.44911,0,42.93071-34.80209,77.73248-77.73248,77.73248-.15171,0-.30088-.01043-.45259-.01138-42.72117-.24494-77.27989-34.94242-77.27989-77.72111Z"/></svg>`,
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

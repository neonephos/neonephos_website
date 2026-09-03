<script setup lang="ts">
import { ref } from 'vue'

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
  }>
  relationships_logos: Record<string, string>
}>()

const tagColorMap: Record<string, string> = {
  application: "linear-gradient(to right, #ed7844, #f7c744)",
  data: "#ffcc00",
  ai: "#e2ffd1",
  service_orchestration: "#d1d6ff",
  cloud_edge_platform: "#d9f2ff",
  virtualization: "#f2d1ff",
  management: "#fff2cc",
  sustainability: "#d6f5d6",
  compliance: "#ffe6f2",
}

const hoveredRelationship = ref<string | null>(null)
const hoveredCardIndex = ref<number | null>(null)
const hoverRelatesHeader = ref<boolean>(false)
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
      <!-- Title + Project Logo -->
      <div class="dynamic-card__header">
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

      <!-- Tags -->
      <div v-if="card.tags?.length" class="dynamic-card__tags">
        <span
          v-for="tag in card.tags"
          :key="tag"
          class="dynamic-card__tag"
          :style="{ backgroundColor: tagColorMap[tag] || 'rgba(0,0,0,0.06)' }"
        >
          {{ tag }}
        </span>
      </div>

      <!-- Description -->
      <p class="dynamic-card__details">
        {{ card.details }}
      </p>

      <!-- Links -->
      <div class="dynamic-card__links">
        <a v-if="card.link" :href="card.link" target="_blank">Website</a>
        <a v-if="card.githubLink" :href="card.githubLink" target="_blank">GitHub</a>
      </div>

      <!-- Relates To -->
      <div
        v-if="card.relationships?.length"
        class="dynamic-card__relates"
      >
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
  width: 300px;
  aspect-ratio: 2 / 3;
  border-radius: 14px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.08);
  border: 1px solid #e5e8ef;
  padding: 1.3rem 1.5rem;
  display: flex;
  flex-direction: column;
  transition: opacity 0.2s ease;
}

/* Header with project logo + title */
.dynamic-card__header {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 1rem;
}

.dynamic-card__main-logo {
  width: 48px;
  height: 48px;
}

.dynamic-card__title {
  font-size: 1.3rem;
  font-weight: 700;
  text-decoration: none;
}

/* Tags */
.dynamic-card__tags {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  margin-bottom: 1.2rem;
}

.dynamic-card__tag {
  padding: 0.35rem 0.6rem;
  border-radius: 6px;
  font-size: 0.85rem;
}

/* Description */
.dynamic-card__details {
  font-size: 1rem;
  line-height: 1.5;
  color: black;
  margin-bottom: 1rem;
}

/* Links */
.dynamic-card__links {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.2rem;
}

.dynamic-card__links a {
  color: #0f6bff;
  font-weight: 600;
  text-decoration: none;
}

/* Relates To */
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

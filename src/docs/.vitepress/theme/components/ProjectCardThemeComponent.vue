<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import { resolveLink } from '../utils'

interface ProjectStageCard {
  stageNumber?: string
  title?: string
  description?: string
  backgroundColor?: string
  fontColor?: string
  stageNumberColor?: string
  linkUrl?: string
  link?: string
}

const { frontmatter } = useData()

const cards = computed<ProjectStageCard[]>(() => {
  return frontmatter.value.projectStageCards || []
})

const gradientStyle = computed(() => {
  if (!cards.value.length) return {}

  const colorStops = cards.value
    .map((card) => card.backgroundColor || '#ffffff')
    .join(', ')

  return {
    background: `linear-gradient(to right, ${colorStops})`
  }
})

function getCardUrl(card: ProjectStageCard): string | undefined {
  const target = card.linkUrl || card.link
  return target ? resolveLink(target) : undefined
}
</script>

<template>
  <div class="project-card-container">
    <div class="project-card-list">
      <component
        :is="(card.linkUrl || card.link) ? 'a' : 'div'"
        v-for="(card, index) in cards"
        :key="card.title || index"
        :href="getCardUrl(card)"
        class="project-card"
        :class="{ 'project-card--clickable': card.linkUrl || card.link }"
        :style="{
          backgroundColor: card.backgroundColor || '#ffffff',
          color: card.fontColor || '#1a1919'
        }"
      >
        <div class="project-card__header">
          <span
            v-if="card.stageNumber"
            class="project-card__stage-number"
            :style="{
              color: card.stageNumberColor || 'var(--vp-neonephos-blue)',
              backgroundColor: card.stageNumberColor ? `${card.stageNumberColor}15` : 'rgba(37, 99, 235, 0.1)'
            }"
          >
            Stage {{ card.stageNumber }}
          </span>

          <svg
            v-if="card.linkUrl || card.link"
            class="project-card__icon"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M7 17L17 7M17 7H7M17 7V17" />
          </svg>
        </div>

        <h3
          v-if="card.title"
          class="project-card__title"
          :style="{ color: card.fontColor || 'inherit' }"
        >
          {{ card.title }}
        </h3>

        <p v-if="card.description" class="project-card__description">
          {{ card.description }}
        </p>
      </component>
    </div>

    <div class="project-card-gradient-bar" :style="gradientStyle" />
  </div>
</template>

<style scoped>
.project-card-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  margin-top: 1.5rem;
}

.project-card-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 200px));
  gap: 1.25rem;
  width: 100%;
}

.project-card {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 1.25rem;
  border-radius: 16px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.05);
  aspect-ratio: 1 / 1.3;
  max-width: 200px;
  width: 100%;
  box-sizing: border-box;
  text-decoration: none;
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1),
              box-shadow 0.25s cubic-bezier(0.16, 1, 0.3, 1),
              border-color 0.25s ease;
}

.project-card--clickable {
  cursor: pointer;
}

.project-card--clickable:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 28px -4px rgba(0, 0, 0, 0.12);
  border-color: rgba(0, 0, 0, 0.12);
}

.project-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.project-card__stage-number {
  display: inline-flex;
  align-items: center;
  font-weight: 700;
  font-size: 0.75rem;
  line-height: 1;
  padding: 0.35rem 0.65rem;
  border-radius: 20px;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

.project-card__icon {
  opacity: 0.4;
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.project-card--clickable:hover .project-card__icon {
  opacity: 1;
  transform: translate(2px, -2px);
}

.project-card__title {
  margin: 0 0 0.5rem;
  font-size: 1.2rem;
  font-weight: 700;
  line-height: 1.25;
  letter-spacing: -0.01em;
}

.project-card__description {
  margin: 0;
  font-size: 0.875rem;
  line-height: 1.5;
  opacity: 0.8;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.project-card-gradient-bar {
  height: 4px;
  width: 100%;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>
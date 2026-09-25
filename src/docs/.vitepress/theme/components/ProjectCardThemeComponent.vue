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
        <span
          v-if="card.stageNumber"
          class="project-card__stage-number"
          :style="{ color: card.stageNumberColor || 'var(--vp-neonephos-blue)' }"
        >
          {{ card.stageNumber }}
        </span>

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
  gap: 1.25rem;
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
  display: flex;
  flex-direction: column;
  padding: 1.25rem;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  border: 1px solid #e5e8ef;
  aspect-ratio: 1 / 1.3;
  max-width: 200px;
  width: 100%;
  box-sizing: border-box;
  text-decoration: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.project-card--clickable {
  cursor: pointer;
}

.project-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
}

.project-card__stage-number {
  font-weight: 700;
  font-size: 0.9rem;
  line-height: 1;
  margin-bottom: 1.25rem;
}

.project-card__title {
  margin: 0 0 0.5rem;
  font-size: 1.15rem;
  font-weight: 600;
  line-height: 1.3;
}

.project-card__description {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.5;
  opacity: 0.9;
}

.project-card-gradient-bar {
  height: 4px;
  width: 100%;
  border-radius: 2px;
}
</style>
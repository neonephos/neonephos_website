<script setup lang="ts">
import { ref } from 'vue'
import { useData } from 'vitepress'

const { frontmatter } = useData()

// Multiple cards can stay open
const openCards = ref<Record<number, boolean>>({})

// Nested sections
const openSections = ref<Record<number, { req: boolean; ben: boolean }>>({})

function toggleCard(index: number) {
  openCards.value[index] = !openCards.value[index]

  if (!openSections.value[index]) {
    openSections.value[index] = { req: false, ben: false }
  }
}

function toggleSection(index: number, section: 'req' | 'ben') {
  if (!openSections.value[index]) {
    openSections.value[index] = { req: false, ben: false }
  }
  openSections.value[index][section] = !openSections.value[index][section]
}
</script>

<template>
  <div class="dynamic-card-list">
    <div
      v-for="(card, index) in frontmatter.cards"
      :key="card.title"
      class="dynamic-card"
      :style="{ backgroundColor: card.backgroundColor || '#ffffff' }"
    >
      <!-- Card Header -->
      <button
        class="dynamic-card__header"
        @click="toggleCard(index)"
        :style="{
          backgroundColor: card.headingBackgroundColor || '#f9fbff'
        }"
      >
        <h2 :style="{ color: card.headingColor || '#0f6bff' }">
          {{ card.title }}
        </h2>

        <svg
          class="dynamic-card__chevron"
          :class="{ open: openCards[index] }"
          width="22"
          height="22"
          viewBox="0 0 24 24"
        >
          <path
            d="M6 9l6 6 6-6"
            :stroke="card.headingColor || '#0f6bff'"
            stroke-width="2"
            fill="none"
            stroke-linecap="round"
          />
        </svg>
      </button>


      <!-- Expandable Content -->
      <transition name="smooth-expand">
        <div v-if="openCards[index]" class="dynamic-card__content">
          <p class="dynamic-card__text">
            {{ card.text }}
          </p>

          <!-- Requirements -->
          <div v-if="card.requirements?.length" class="dynamic-card__section">
            <button
              class="dynamic-card__section-header"
              @click="toggleSection(index, 'req')"
            >
              <span
                class="dynamic-card__section-title"
                :style="{ color: card.sectionTitleColor || '#0f6bff' }"
              >
                Requirements
              </span>

              <svg
                class="dynamic-card__chevron small"
                :class="{ open: openSections[index]?.req }"
                width="18"
                height="18"
                viewBox="0 0 24 24"
              >
                <path
                  d="M6 9l6 6 6-6"
                  :stroke="card.iconColor || '#0f6bff'"
                  stroke-width="2"
                  fill="none"
                  stroke-linecap="round"
                />
              </svg>
            </button>

            <transition name="smooth-expand">
              <div
                v-if="openSections[index]?.req"
                class="dynamic-card__list"
              >
                <div
                  v-for="req in card.requirements"
                  :key="req"
                  class="dynamic-card__list-item"
                >
                  {{ req }}
                </div>
              </div>
            </transition>
          </div>

          <!-- Benefits -->
          <div v-if="card.benefits?.length" class="dynamic-card__section">
            <button
              class="dynamic-card__section-header"
              @click="toggleSection(index, 'ben')"
            >
              <span
                class="dynamic-card__section-title"
                :style="{ color: card.sectionTitleColor || '#0f6bff' }"
              >
                Benefits
              </span>

              <svg
                class="dynamic-card__chevron small"
                :class="{ open: openSections[index]?.ben }"
                width="18"
                height="18"
                viewBox="0 0 24 24"
              >
                <path
                  d="M6 9l6 6 6-6"
                  :stroke="card.iconColor || '#0f6bff'"
                  stroke-width="2"
                  fill="none"
                  stroke-linecap="round"
                />
              </svg>
            </button>

            <transition name="smooth-expand">
              <div
                v-if="openSections[index]?.ben"
                class="dynamic-card__list"
              >
                <div
                  v-for="ben in card.benefits"
                  :key="ben"
                  class="dynamic-card__list-item"
                >
                  {{ ben }}
                </div>
              </div>
            </transition>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped>
.dynamic-card-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.dynamic-card {
  border-radius: 14px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.08);
  overflow: hidden;
  border: 1px solid #e5e8ef;
}

/* Header */
.dynamic-card__header {
  width: 100%;
  background: #f9fbff;
  border: none;
  padding: 1.3rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.dynamic-card__header h2 {
  margin: 0;
  font-size: 1.3rem;
  font-weight: 600;
}

/* Chevron */
.dynamic-card__chevron {
  transition: transform 0.25s ease;
}

.dynamic-card__chevron.open {
  transform: rotate(180deg);
}

.dynamic-card__chevron.small {
  width: 16px;
  height: 16px;
}

/* Content */
.dynamic-card__content {
  padding: 1.3rem 1.5rem;
  line-height: 1.6;
  color: black;
}

/* Sections */
.dynamic-card__section {
  margin-top: 1.2rem;
}

.dynamic-card__section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
}

.dynamic-card__section-title {
  font-weight: 600;
}

.dynamic-card__list {
  margin-top: 0.6rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.dynamic-card__list-item {
  padding: 0.4rem 0;
  border-bottom: 1px solid rgba(0,0,0,0.08); /* very light divider */
  color: black;
  line-height: 1.5;
}

/* Remove divider from last item */
.dynamic-card__list-item:last-child {
  border-bottom: none;
}

/* Smooth expand animation */
.smooth-expand-enter-active,
.smooth-expand-leave-active {
  transition: all 0.25s ease;
}

.smooth-expand-enter-from,
.smooth-expand-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>

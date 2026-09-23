<script setup lang="ts">
import { ref } from 'vue'
import { useData } from 'vitepress'

const { frontmatter } = useData()

const openCards = ref<Record<number, boolean>>({})

const openSections = ref<
  Record<
    number,
    {
      exp: boolean
      crit: boolean
      appr: boolean
      ben: boolean
    }
  >
>({})

function toggleCard(index: number) {
  openCards.value[index] = !openCards.value[index]

  if (!openSections.value[index]) {
    openSections.value[index] = {
      exp: false,
      crit: false,
      appr: false,
      ben: false
    }
  }
}

function toggleSection(
  index: number,
  section: 'exp' | 'crit' | 'appr' | 'ben'
) {
  if (!openSections.value[index]) {
    openSections.value[index] = {
      exp: false,
      crit: false,
      appr: false,
      ben: false
    }
  }

  openSections.value[index][section] =
    !openSections.value[index][section]
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
      <button
        class="dynamic-card__header"
        @click="toggleCard(index)"
        :style="{
          backgroundColor:
            card.headingBackgroundColor || '#f9fbff'
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

      <transition name="smooth-expand">
        <div
          v-if="openCards[index]"
          class="dynamic-card__content"
          :style="{ color: card.textColor || '#000000' }"
        >
          <p class="dynamic-card__text">
            {{ card.text }}
          </p>

          <!-- Expectations -->

          <div
            v-if="card.expectations?.length"
            class="dynamic-card__section"
          >
            <button
              class="dynamic-card__section-header"
              @click="toggleSection(index, 'exp')"
            >
              <span
                class="dynamic-card__section-title"
                :style="{
                  color:
                    card.sectionTitleColor || '#0f6bff'
                }"
              >
                Expectations
              </span>

              <svg
                class="dynamic-card__chevron small"
                :class="{
                  open: openSections[index]?.exp
                }"
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
              <ul
                v-if="openSections[index]?.exp"
                class="dynamic-card__list"
              >
                <li
                  v-for="item in card.expectations"
                  :key="item"
                  class="dynamic-card__list-item"
                  :style="{ color: card.textColor || '#000000' }"
                >
                  {{ item }}
                </li>
              </ul>
            </transition>
          </div>

          <!-- Acceptance Criteria -->

          <div
            v-if="card.acceptanceCriteria?.length"
            class="dynamic-card__section"
          >
            <button
              class="dynamic-card__section-header"
              @click="toggleSection(index, 'crit')"
            >
              <span
                class="dynamic-card__section-title"
                :style="{
                  color:
                    card.sectionTitleColor || '#0f6bff'
                }"
              >
                Acceptance Criteria
              </span>

              <svg
                class="dynamic-card__chevron small"
                :class="{
                  open: openSections[index]?.crit
                }"
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
              <ul
                v-if="openSections[index]?.crit"
                class="dynamic-card__list"
              >
                <li
                  v-for="item in card.acceptanceCriteria"
                  :key="item"
                  class="dynamic-card__list-item"
                >
                  {{ item }}
                </li>
              </ul>
            </transition>
          </div>

          <!-- Approval Process -->

          <div
            v-if="card.approvalProcess?.length"
            class="dynamic-card__section"
          >
            <button
              class="dynamic-card__section-header"
              @click="toggleSection(index, 'appr')"
            >
              <span
                class="dynamic-card__section-title"
                :style="{
                  color:
                    card.sectionTitleColor || '#0f6bff'
                }"
              >
                Approval Process
              </span>

              <svg
                class="dynamic-card__chevron small"
                :class="{
                  open: openSections[index]?.appr
                }"
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
              <ul
                v-if="openSections[index]?.appr"
                class="dynamic-card__list"
              >
                <li
                  v-for="item in card.approvalProcess"
                  :key="item"
                  class="dynamic-card__list-item"
                >
                  {{ item }}
                </li>
              </ul>
            </transition>
          </div>

          <!-- Benefits -->

          <div
            v-if="card.benefits?.length"
            class="dynamic-card__section"
          >
            <button
              class="dynamic-card__section-header"
              @click="toggleSection(index, 'ben')"
            >
              <span
                class="dynamic-card__section-title"
                :style="{
                  color:
                    card.sectionTitleColor || '#0f6bff'
                }"
              >
                Benefits
              </span>

              <svg
                class="dynamic-card__chevron small"
                :class="{
                  open: openSections[index]?.ben
                }"
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
              <ul
                v-if="openSections[index]?.ben"
                class="dynamic-card__list"
              >
                <li
                  v-for="item in card.benefits"
                  :key="item"
                  class="dynamic-card__list-item"
                >
                  {{ item }}
                </li>
              </ul>
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
  padding: 0;
  margin-left: 0;
  list-style: none;
}

.dynamic-card__list-item {
  position: relative;
  padding-left: 1rem;
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

.dynamic-card__list-item::before {
  content: "•";
  position: absolute;
  left: 0;
  color: currentColor;
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

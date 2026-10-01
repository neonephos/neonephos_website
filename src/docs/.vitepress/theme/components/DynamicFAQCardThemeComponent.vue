<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useData } from 'vitepress'
import NeoNephosDefaultTheme03 from './NeoNephosDefaultTheme03.vue'
import LandingTilesThemeComponent from './LandingTilesThemeComponent.vue'

interface FAQCard {
  title: string
  faqType?: string
  type?: string
  category?: string
  questionType?: string
  backgroundColor?: string
  headingBackgroundColor?: string
  headingColor?: string
  textColor?: string
  extendedCardColor?: string
  text: string
  requirements?: string[]
  benefits?: string[]
}

const { frontmatter } = useData()

// Available categories from frontmatter or default to ['General', 'Technical']
const questionTypes = computed<string[]>(() => {
  return frontmatter.value?.questionTypes || ['General', 'Technical']
})

const selectedType = ref<string>('General')
const openCards = ref<Record<number, boolean>>({})

// Reset open cards accordion state when switching category tabs
watch(selectedType, () => {
  openCards.value = {}
})

// Ensure selectedType matches first category if frontmatter changes
watch(questionTypes, (types) => {
  if (types.length && !types.includes(selectedType.value)) {
    selectedType.value = types[0]
  }
}, { immediate: true })

const toggleCard = (index: number) => {
  openCards.value[index] = !openCards.value[index]
}

// Strictly filter cards based on active tab
const filteredCards = computed(() => {
  const cardsList: FAQCard[] = frontmatter.value?.cards || []
  const active = selectedType.value.trim().toLowerCase()

  return cardsList.filter((card) => {
    // Read category from possible frontmatter key names
    const rawType = card.faqType || card.type || card.category || card.questionType
    
    // Untagged cards default ONLY to 'general'
    const cardCategory = rawType ? rawType.trim().toLowerCase() : 'general'

    return cardCategory === active
  })
})

// Split filtered cards across 2 columns
const leftColumn = computed(() => {
  return filteredCards.value
    .map((card, idx) => ({ card, idx }))
    .filter(({ idx }) => idx % 2 === 0)
})

const rightColumn = computed(() => {
  return filteredCards.value
    .map((card, idx) => ({ card, idx }))
    .filter(({ idx }) => idx % 2 !== 0)
})

// Helper for card hover / active background colors
const hexToRgba = (hex?: string, alpha: number = 0.5) => {
  if (!hex) return ''
  let c = hex.replace('#', '')
  if (c.length === 3) {
    c = c.split('').map(x => x + x).join('')
  }
  if (c.length !== 6) return hex
  const num = parseInt(c, 16)
  const r = (num >> 16) & 255
  const g = (num >> 8) & 255
  const b = num & 255
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

const getCardStyle = (card: FAQCard, index: number) => {
  const isOpen = !!openCards.value[index]

  if (isOpen && card.extendedCardColor) {
    return {
      backgroundColor: hexToRgba(card.extendedCardColor, 0.5),
      borderColor: card.extendedCardColor,
      borderWidth: '2px',
      borderStyle: 'solid'
    }
  }

  return {
    backgroundColor: card.backgroundColor || '#F9F9F9',
    borderColor: 'transparent',
    borderWidth: '2px',
    borderStyle: 'solid'
  }
}

const getHeaderStyle = (card: FAQCard, index: number) => {
  const isOpen = !!openCards.value[index]
  if (isOpen) return { backgroundColor: 'transparent' }
  return {
    backgroundColor: card.headingBackgroundColor || card.backgroundColor || 'transparent'
  }
}
</script>

<template>
  <div>
    <NeoNephosDefaultTheme01 :hero="frontmatter.hero">
      <template #home-hero-after>

        <!-- 2-Column FAQ Grid Wrapper -->
        <div class="project-lifecycle-hero">

          <!-- Dynamic iOS-Style Slider Control -->
          <div class="faq-slider-container" v-if="questionTypes.length">
            <div
              class="faq-slider"
              :style="{
                backgroundColor: frontmatter.sliderBackgroundColor || '#EAEAEA'
              }"
            >
              <!-- Sliding Thumb Indicator -->
              <div
                class="faq-slider-thumb"
                :style="{
                  transform: `translateX(${questionTypes.indexOf(selectedType) * 100}%)`,
                  width: `calc(${100 / questionTypes.length}% - 4px)`
                }"
              ></div>

              <!-- Filter Option Buttons -->
              <button
                v-for="type in questionTypes"
                :key="type"
                type="button"
                class="faq-slider-btn"
                :class="{ active: selectedType === type }"
                :style="{
                  color: frontmatter.sliderTextColor || '#111111'
                }"
                @click="selectedType = type"
              >
                {{ type }}
              </button>
            </div>
          </div>

          <!-- Integrated FAQ Cards Grid -->
          <div class="faq-container" v-if="filteredCards.length">
            
            <!-- Left Column -->
            <div class="faq-column">
              <div
                v-for="item in leftColumn"
                :key="item.idx"
                class="faq-card"
                :class="{ expanded: openCards[item.idx] }"
                :style="getCardStyle(item.card, item.idx)"
              >
                <button
                  type="button"
                  class="faq-card-header"
                  :style="getHeaderStyle(item.card, item.idx)"
                  :aria-expanded="!!openCards[item.idx]"
                  @click="toggleCard(item.idx)"
                >
                  <h3 :style="{ color: item.card.headingColor || 'inherit' }">
                    {{ item.card.title }}
                  </h3>

                  <span
                    class="faq-icon"
                    :class="{ 'is-open': openCards[item.idx] }"
                    :style="{
                      color: openCards[item.idx]
                        ? (item.card.textColor || item.card.headingColor || 'inherit')
                        : (item.card.headingColor || 'inherit')
                    }"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="3.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <polyline points="6 15 12 9 18 15"></polyline>
                    </svg>
                  </span>
                </button>

                <div
                  v-if="openCards[item.idx]"
                  class="faq-card-body"
                  :style="{ color: item.card.textColor || '#212121' }"
                >
                  <p class="faq-text">{{ item.card.text }}</p>

                  <div v-if="item.card.requirements?.length" class="faq-section">
                    <strong class="faq-subtitle">Requirements:</strong>
                    <ul>
                      <li v-for="(req, rIdx) in item.card.requirements" :key="rIdx">{{ req }}</li>
                    </ul>
                  </div>

                  <div v-if="item.card.benefits?.length" class="faq-section">
                    <strong class="faq-subtitle">Benefits:</strong>
                    <ul>
                      <li v-for="(ben, bIdx) in item.card.benefits" :key="bIdx">{{ ben }}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <!-- Right Column -->
            <div class="faq-column">
              <div
                v-for="item in rightColumn"
                :key="item.idx"
                class="faq-card"
                :class="{ expanded: openCards[item.idx] }"
                :style="getCardStyle(item.card, item.idx)"
              >
                <button
                  type="button"
                  class="faq-card-header"
                  :style="getHeaderStyle(item.card, item.idx)"
                  :aria-expanded="!!openCards[item.idx]"
                  @click="toggleCard(item.idx)"
                >
                  <h3 :style="{ color: item.card.headingColor || 'inherit' }">
                    {{ item.card.title }}
                  </h3>

                  <span
                    class="faq-icon"
                    :class="{ 'is-open': openCards[item.idx] }"
                    :style="{
                      color: openCards[item.idx]
                        ? (item.card.textColor || item.card.headingColor || 'inherit')
                        : (item.card.headingColor || 'inherit')
                    }"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="3.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <polyline points="6 15 12 9 18 15"></polyline>
                    </svg>
                  </span>
                </button>

                <div
                  v-if="openCards[item.idx]"
                  class="faq-card-body"
                  :style="{ color: item.card.textColor || '#212121' }"
                >
                  <p class="faq-text">{{ item.card.text }}</p>

                  <div v-if="item.card.requirements?.length" class="faq-section">
                    <strong class="faq-subtitle">Requirements:</strong>
                    <ul>
                      <li v-for="(req, rIdx) in item.card.requirements" :key="rIdx">{{ req }}</li>
                    </ul>
                  </div>

                  <div v-if="item.card.benefits?.length" class="faq-section">
                    <strong class="faq-subtitle">Benefits:</strong>
                    <ul>
                      <li v-for="(ben, bIdx) in item.card.benefits" :key="bIdx">{{ ben }}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        <!-- Tiles Section -->
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
        <br>

      </template>
    </NeoNephosDefaultTheme01>
  </div>
</template>

<style scoped>
/* Container styling to allow the 2-column grid room to expand */
.project-lifecycle-hero {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem 3rem 1.5rem;
}

/* iOS Segmented Slider Controls */
.faq-slider-container {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  width: 100%;
}

.faq-slider {
  position: relative;
  display: inline-flex;
  align-items: center;
  padding: 4px;
  border-radius: 9999px;
  user-select: none;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.08);
  min-width: 260px;
}

.faq-slider-thumb {
  position: absolute;
  top: 4px;
  bottom: 4px;
  left: 4px;
  background-color: #ffffff;
  border-radius: 9999px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1);
  z-index: 1;
}

.faq-slider-btn {
  position: relative;
  z-index: 2;
  flex: 1;
  padding: 0.55rem 1.75rem;
  font-size: 0.95rem;
  font-weight: 600;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: 9999px;
  transition: opacity 0.2s ease;
  opacity: 0.65;
  text-align: center;
  white-space: nowrap;
}

.faq-slider-btn.active {
  opacity: 1;
}

/* FAQ 2-Column Grid Layout */
.faq-container {
  display: flex;
  gap: 1.25rem;
  width: 100%;
  align-items: flex-start;
}

.faq-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  min-width: 0;
}

@media (max-width: 768px) {
  .faq-container {
    flex-direction: column;
  }
}

.faq-card {
  border-radius: 16px;
  overflow: hidden;
  transition: background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, border-radius 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.faq-card.expanded {
  border-radius: 18px;
}

.faq-card-header {
  width: 100%;
  min-height: 65px;
  padding: 1rem 1.25rem;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: none;
  cursor: pointer;
  user-select: none;
  text-align: left;
  transition: background-color 0.2s ease, padding 0.2s ease;
}

.faq-card.expanded .faq-card-header {
  min-height: auto;
  padding: 1.15rem 1.25rem 0.35rem 1.25rem;
}

.faq-card-header h3 {
  margin: 0;
  font-size: 0.98rem;
  font-weight: 500;
  line-height: 1.4;
}

.faq-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-left: 0.75rem;
  transition: transform 0.25s ease, color 0.2s ease;
  flex-shrink: 0;
}

.faq-icon.is-open {
  transform: rotate(180deg);
}

.faq-card-body {
  padding: 0.35rem 1.25rem 1.15rem 1.25rem;
  font-size: 0.95rem;
  line-height: 1.5;
}

.faq-card-body p,
.faq-card-body li,
.faq-card-body .faq-subtitle {
  color: inherit;
}

.faq-text {
  margin-top: 0;
  margin-bottom: 0.5rem;
}

.faq-section {
  margin-top: 0.5rem;
}

.faq-subtitle {
  display: block;
  margin-bottom: 0.25rem;
}

.faq-section ul {
  margin: 0;
  padding-left: 1.2rem;
}

.faq-card-body > *:last-child {
  margin-bottom: 0;
}

.lifecycle-section {
  text-align: center;
  padding: 3rem 1rem 2rem;
}

.lifecycle-heading {
  font-size: 2.4rem;
  font-weight: 700;
  margin-bottom: 1.8rem;
  color: var(--vp-neonephos-blue);
  letter-spacing: -0.5px;
}

.lifecycle-image {
  max-width: 900px;
  width: 100%;
  margin: 0 auto 2.5rem;
  display: block;
  border-radius: 6px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

.lifecycle-intro {
  max-width: 900px;
  margin: 0 auto 2rem;
  font-size: 1.15rem;
  line-height: 1.6;
  color: var(--vp-c-text-2);
}
</style>
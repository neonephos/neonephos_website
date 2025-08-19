<template>
  <div class="vp-project-features" ref="scrollContainer">
    <div
      v-for="(feature, index) in features"
      :key="index"
      class="vp-project-feature"
    >
      <a
        class="vp-project-feature-link"
        :href="feature.link"
        target="_blank"
        rel="noopener noreferrer"
        :title="feature.details"
      >
        <div class="vp-project-feature-imgsrc-container">
          <img
            class="vp-project-feature-imgsrc"
            :src="feature.imgsrc"
            :alt="feature.name"
          />
        </div>
      </a>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  features: {
    type: Array,
    required: true
  }
})

import { ref, onMounted } from 'vue'

const scrollContainer = ref(null)

onMounted(() => {
  const container = scrollContainer.value
  if (!container) return

  const scrollSpeed = 1.5

  const animate = () => {
    container.scrollLeft += scrollSpeed
    if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
      container.scrollLeft = 0
    }
    requestAnimationFrame(animate)
  }

  requestAnimationFrame(animate)
})
</script>

<style scoped>
.vp-project-features {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  white-space: nowrap;
  padding: 1rem 0;
  scroll-snap-type: x mandatory;
  scroll-behavior: auto;
}

.vp-project-feature {
  flex: 0 0 auto;
  scroll-snap-align: start;
  transition: transform 0.2s ease;
  cursor: pointer;
}

.vp-project-feature-imgsrc-container {
  width: 100px;
  height: 100px;
  background: white;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.vp-project-feature-imgsrc {
  max-width: 80%;
  max-height: 80%;
}

.vp-project-features::-webkit-scrollbar {
  display: none;
}
</style>

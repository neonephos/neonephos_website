<template>
  <div class="vp-project-features">
    <div
      v-for="(feature, index) in features"
      :key="index"
      class="vp-project-feature"
      @click="selectedFeature = feature"
    >
      <div class="vp-project-feature-link">
        <div class="vp-project-feature-imgsrc-container">
          <img class="vp-project-feature-imgsrc" :src="feature.imgsrc" :alt="feature.name" />
        </div>
        <h2 class="vp-project-feature-name">{{ feature.name }}</h2>
      </div>
    </div>
  </div>

  <!-- Modal -->
  <div v-if="selectedFeature" class="vp-modal-overlay" @click.self="selectedFeature = null">
    <div class="vp-modal-content">
      <button class="vp-modal-close" @click="selectedFeature = null">×</button>
      <div class="vp-modal-body">
        <div class="vp-modal-img-container">
          <img :src="selectedFeature.imgsrc" :alt="selectedFeature.name" class="vp-modal-img" />
        </div>
        <div class="vp-modal-text">
          <h2 class="vp-modal-name">{{ selectedFeature.name }}</h2>
          <p class="vp-modal-details">{{ selectedFeature.details }}</p>

          <div class="vp-modal-buttons">
            <template v-if="selectedFeature.link">
              <a
                :href="selectedFeature.link"
                target="_blank"
                rel="noopener"
                class="vp-modal-button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  class="vp-modal-button-icon"
                  aria-hidden="true"
                >
                  <path
                    fill="currentColor"
                    d="M4 5h16v11H4V5zm0 13h16v2H4v-2z"
                  />
                </svg>
                <span class="vp-modal-button-text">Visit Project</span>
              </a>
            </template>
            <template v-else>
              <div class="vp-modal-button-placeholder"></div>
            </template>

            <template v-if="selectedFeature.githubLink">
              <a
                :href="selectedFeature.githubLink"
                target="_blank"
                rel="noopener"
                class="vp-modal-github-button"
              >
                <svg xmlns="http://www.w3.org/2000/svg"
                  aria-label="GitHub" role="img"
                  viewBox="0 0 512 512"
                  class="vp-modal-github-icon"
                >
                  <rect width="512" height="512" rx="15%" fill="#1B1817"/>
                  <path fill="#fff" d="M335 499c14 0 12 17 12 17H165s-2-17 12-17c13 0 16-6 16-12l-1-50c-71 16-86-28-86-28-12-30-28-37-28-37-24-16 1-16 1-16 26 2 40 26 40 26 22 39 59 28 74 22 2-17 9-28 16-35-57-6-116-28-116-126 0-28 10-51 26-69-3-6-11-32 3-67 0 0 21-7 70 26 42-12 86-12 128 0 49-33 70-26 70-26 14 35 6 61 3 67 16 18 26 41 26 69 0 98-60 120-117 126 10 8 18 24 18 48l-1 70c0 6 3 12 16 12z"/>
                </svg>
                <span class="vp-modal-github-text">GitHub</span>
              </a>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selectedFeature = ref(null)

defineProps({
  features: {
    type: Array,
    required: true
  }
})
</script>

<style scoped>
.vp-project-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 1.3rem 1.6rem;
  margin: 2rem 0;
}

.vp-project-feature {
  padding: 0.5rem;
  border-radius: 8px;
  box-shadow: none;
  transition: transform 0.2s ease;
  cursor: pointer;
  text-align: center;
  background-color: white;
}

.vp-project-feature:hover {
  transform: translateY(-3px);
}

.vp-project-feature-link {
  display: block;
  padding: 0;
  text-decoration: none;
  color: inherit;
}

.vp-project-feature-imgsrc-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.vp-project-feature-imgsrc {
  width: 100px;
  height: 100px;

}

.vp-project-feature-name {
  font-size: 0.85rem;
  font-weight: 500;
  margin-top: 0.5rem;
  color: black;
}

/* Modal Styles */

.vp-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.vp-modal-content {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  max-width: 700px;
  width: 90%;
  position: relative;
}

.vp-modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.vp-modal-body {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
}

.vp-modal-img-container {
  flex-shrink: 0;
}

.vp-modal-img {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
}

.vp-modal-text {
  flex: 1;
}

.vp-modal-name {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  color: var(--vp-c-brand-1);
}

.vp-modal-details {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin: 1rem 0;
  text-align: justify;
}

.vp-modal-buttons {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  margin-top: 1rem;
}

.vp-modal-button {
  display: inline-flex;
  align-items: center;
  padding: 0.6rem 1.2rem;
  background-color: var(--vp-neonephos-blue);
  color: white;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
  border-radius: 6px;
  transition: background-color 0.3s ease;
}

.vp-modal-button:hover {
  background-color: var(--vp-c-brand-2);
  color: white;
}

.vp-modal-button-icon {
  width: 20px;
  height: 20px;
  margin-right: 8px;
}

.vp-modal-button-text {
  font-size: 0.95rem;
}

.vp-modal-button-placeholder {
  width: 120px;
  height: 36px;
}

.vp-modal-github-button {
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
  color: #ddd;
  background-color: black;
  display: inline-flex;
  align-items: center;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  transition: background-color 0.3s ease;
}

.vp-modal-github-button:hover {
  background-color: #333;
}

.vp-modal-github-icon {
  width: 20px;
  height: 20px;
  margin-right: 8px;
}

.vp-modal-github-text {
  font-size: 0.95rem;
}

@media screen and (max-width: 700px) {
  .vp-modal-img-container {
    display: none;
  }

  .vp-modal-body {
    flex-direction: column;
    gap: 1rem;
    align-items: center;
  }
}
</style>

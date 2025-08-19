<template>
  <div class="neonephos-board-wrapper">
    <div class="neonephos-board-grid">
      <div
        v-for="(feature, index) in features"
        :key="index"
        class="neonephos-board-tile"
        @click="selectedFeature = feature"
      >
        <img class="neonephos-board-img" :src="feature.imgsrc" :alt="feature.name" />
        <div class="neonephos-board-info">
          <h2 class="neonephos-board-name">{{ feature.name }}</h2>
          <h3 class="neonephos-board-role">{{ feature.role }}</h3>

          <div class="neonephos-board-social">
            <a
              v-if="feature.linkedin"
              :href="feature.linkedin"
              class="neonephos-social-icon"
              target="_blank"
              rel="noopener"
              aria-label="LinkedIn"
            >
              <svg width="28" height="28" viewBox="0 0 32 32">
                <path fill="currentColor" d="M17.303,14.365c0.012-0.015,0.023-0.031,0.031-0.048v0.048H17.303z M32,0v32H0V0H32L32,0z M9.925,12.285H5.153v14.354h4.772V12.285z M10.237,7.847c-0.03-1.41-1.035-2.482-2.668-2.482c-1.631,0-2.698,1.072-2.698,2.482c0,1.375,1.035,2.479,2.636,2.479h0.031C9.202,10.326,10.237,9.222,10.237,7.847z M27.129,18.408c0-4.408-2.355-6.459-5.494-6.459c-2.531,0-3.664,1.391-4.301,2.368v-2.032h-4.77c0.061,1.346,0,14.354,0,14.354h4.77v-8.016c0-0.434,0.031-0.855,0.157-1.164c0.346-0.854,1.132-1.746,2.448-1.746c1.729,0,2.418,1.314,2.418,3.246v7.68h4.771L27.129,18.408L27.129,18.408z"/>
              </svg>
            </a>
            <a
              v-if="feature.email"
              :href="'mailto:' + feature.email"
              class="neonephos-social-icon"
              aria-label="Email"
            >
              <svg width="28" height="28" viewBox="0 0 32 32">
                <rect x="0" y="0" width="32" height="32" fill="currentColor"/>
                <path fill="white" d="M6,8l10,7l10-7v2l-10,7l-10-7V8z M6,6v18h20V6H6z"/>
              </svg>
            </a>
          </div>
        </div>

      </div>
    </div>

    <div v-if="selectedFeature" class="neonephos-modal-overlay" @click.self="selectedFeature = null">
      <div class="neonephos-modal-content">
        <button class="neonephos-modal-close" @click="selectedFeature = null">×</button>
        <div class="neonephos-modal-body">
          <img :src="selectedFeature.imgsrc" :alt="selectedFeature.name" class="neonephos-modal-img" />
          <div class="neonephos-modal-text">
            <h2>{{ selectedFeature.name }}</h2>
            <h3>{{ selectedFeature.role }}</h3>
            <p>{{ selectedFeature.details }}</p>

            <div class="neonephos-board-social">
              <a
                v-if="selectedFeature.linkedin"
                :href="selectedFeature.linkedin"
                class="neonephos-social-icon"
                target="_blank"
                rel="noopener"
                aria-label="LinkedIn"
              >
                <svg width="28" height="28" viewBox="0 0 32 32">
                  <path fill="currentColor" d="M17.303,14.365c0.012-0.015,0.023-0.031,0.031-0.048v0.048H17.303z M32,0v32H0V0H32L32,0z M9.925,12.285H5.153v14.354h4.772V12.285z M10.237,7.847c-0.03-1.41-1.035-2.482-2.668-2.482c-1.631,0-2.698,1.072-2.698,2.482c0,1.375,1.035,2.479,2.636,2.479h0.031C9.202,10.326,10.237,9.222,10.237,7.847z M27.129,18.408c0-4.408-2.355-6.459-5.494-6.459c-2.531,0-3.664,1.391-4.301,2.368v-2.032h-4.77c0.061,1.346,0,14.354,0,14.354h4.77v-8.016c0-0.434,0.031-0.855,0.157-1.164c0.346-0.854,1.132-1.746,2.448-1.746c1.729,0,2.418,1.314,2.418,3.246v7.68h4.771L27.129,18.408L27.129,18.408z"/>
                </svg>
              </a>
              <a
                v-if="selectedFeature.email"
                :href="'mailto:' + selectedFeature.email"
                class="neonephos-social-icon"
                aria-label="Email"
              >
                <svg width="28" height="28" viewBox="0 0 32 32">
                  <rect x="0" y="0" width="32" height="32" fill="currentColor"/>
                  <path fill="white" d="M6,8l10,7l10-7v2l-10,7l-10-7V8z M6,6v18h20V6H6z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
defineProps({
  features: {
    type: Array,
    required: true
  }
})
const selectedFeature = ref(null)
</script>

<style scoped>
.neonephos-board-wrapper {
  padding: 0rem;
}

.neonephos-board-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 220px));
  justify-content: center;
  margin: 0 0;
  padding: 0 0;
  gap: 2rem;
}

.neonephos-board-tile {
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: transform 0.2s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  
}

.neonephos-board-tile:hover {
  transform: translateY(-4px);
}

.neonephos-board-img {
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  display: block;
  margin: 0;
  padding: 0;
  border: none;
}

.neonephos-board-info {
  padding: 1rem;
  text-align: center;
}

.neonephos-board-name {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0.5rem 0 0.25rem;
  color: #222;
}

.neonephos-board-role {
  font-size: 0.9rem;
  color: #666;
  margin: 0;
}

.neonephos-board-social {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 0.75rem;
}

.neonephos-social-icon {
  color: #666;
  transition: color 0.3s ease;
}

.neonephos-social-icon:hover {
  color: #0077b5;
}

.neonephos-modal-text .neonephos-board-social {
  margin-top: 1rem;
  justify-content: flex-start;
}


/* Modal Overlay */
.neonephos-modal-overlay {
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

/* Modal Content */
.neonephos-modal-content {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  max-width: 700px;
  width: 90%;
  position: relative;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  margin: 0;
}

/* Close Button */
.neonephos-modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

/* Modal Layout */
.neonephos-modal-body {
  display: flex;
  flex-direction: row;
  gap: 2rem;
  align-items: flex-start;
  margin: 0;
  padding: 0;
}

/* Modal Image */
.neonephos-modal-img {
  width: 200px;
  height: 200px;
  object-fit: cover;
  flex-shrink: 0;
  display: block;
  margin: 0;
  padding: 0;
  border: none;
}

/* Modal Text */
.neonephos-modal-text {
  flex: 1;
  text-align: left;
  margin: 0;
  padding: 0;
}

.neonephos-modal-text h2 {
  font-size: 1.5rem;
  margin: 0 0 0.25rem 0;
  padding: 0;
  font-weight: bold;
  color: #222;
  border: none;
}

.neonephos-modal-text h3 {
  font-size: 1rem;
  margin: 0 0 0.75rem 0;
  padding: 0;
  color: #666;
}

.neonephos-modal-text p {
  font-size: 0.95rem;
  color: #444;
  line-height: 1.6;
  text-align: justify;
  white-space: pre-line;
  margin: 0;
  padding: 0;
}

/* Responsive Modal */
@media screen and (max-width: 700px) {
  .neonephos-modal-body {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .neonephos-modal-img {
    width: 100%;
    max-width: 400px;
    height: auto;
    aspect-ratio: 1 / 1;
  }

  .neonephos-modal-text {
    text-align: center;
  }

  .neonephos-modal-text h2 {
    margin-top: 0;
  }

  .neonephos-modal-text p {
    text-align: justify;
  }
}



</style>

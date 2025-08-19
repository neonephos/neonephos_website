<template>
  <div class="vp-member-features">
    <div
      v-for="(feature, index) in features"
      :key="index"
      class="vp-member-feature"
    >
      <a :href="feature.link" class="vp-member-feature-link">
        <div class= "vp-member-feature-imgsrc-container">
        <img class="vp-member-feature-imgsrc" :src="feature.imgsrc" :alt="feature.name" />
        </div>
      </a>
    </div>
  </div>
</template>

<script setup>
defineProps({
  features: {
    type: Array,
    required: true
  }
})
</script>

<style scoped>
.vp-member-features {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
  margin: 2rem 0;
}

.vp-member-feature {
  width: 100px;
  height: 100px; /* Ensures square shape */
  background-color: var(--vp-c-bg-soft);
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease;
  overflow: hidden; /* Prevents overflow from inner elements */
}

.vp-member-feature:hover {
  transform: translateY(-4px);
}

.vp-member-feature-link {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  text-decoration: none;
  color: inherit;
  padding: 0; /* Remove padding to preserve square layout */
}

.vp-member-feature-imgsrc-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #F6F6F7; /* Matches light gray base */
  border-radius: 8px;
  width: 100%;
  height: 100%;
}

.vp-member-feature-imgsrc {
  width: 60%; /* Scales nicely within the square */
  height: auto;
}


</style>

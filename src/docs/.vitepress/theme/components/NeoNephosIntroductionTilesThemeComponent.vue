<script setup lang="ts">
const props = defineProps<{
  image?: string
  html: string
  align?: 'left' | 'right'
  titleColor?: string
}>()

console.log('titleColor:', props.titleColor)
</script>

<template>
  <div class="neonephos-tile-container" :class="props.align">
    <img v-if="props.image" :src="props.image" alt="NeoNephos visual" class="neonephos-tile-image" />
      <div class="neonephos-home-hero-text" v-html="props.html" />
  </div>
</template>

<style scoped>
.neonephos-tile-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem auto;
  max-width: var(--vp-normal-content-max-width);
  padding: 0rem;
  gap: 1.5rem;
}

.neonephos-tile-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* Optional alignment classes */
.left {
  align-items: flex-start;
}

.right {
  align-items: flex-end;
}

/* Mobile optimization */
@media (max-width: 700px) {
  .neonephos-tile-text {
    font-size: 1rem;
    line-height: 1.6;
  }
}
</style>

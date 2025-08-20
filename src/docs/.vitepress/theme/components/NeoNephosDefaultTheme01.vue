<script setup lang="ts">
const props= defineProps<{
  hero?: {
    name?: string
    subtitle?: string
  }
}>()
const hero = props.hero

</script>

<template>
  <section class="neonephos-home-hero">
    <div class="neonephos-home-hero-inner">
      <h1 class="neonephos-home-hero-name">{{ hero?.name }}</h1>
      <p class="neonephos-home-hero-subtitle">
        <span v-html="hero?.subtitle" />
      </p>
      <slot name="home-hero-after-title-before-end" />
      <slot name="home-hero-after" />
    </div>
  </section>
</template>

<style scoped>
.neonephos-home-hero {
  padding: 4rem 1rem;
  text-align: left;
  background: var(--neonephos-hero-bg, transparent);
}

.neonephos-home-hero-inner {
  max-width: var(--vp-normal-content-max-width);
  margin: 0 auto;
  padding-top:2rem;
}

</style>

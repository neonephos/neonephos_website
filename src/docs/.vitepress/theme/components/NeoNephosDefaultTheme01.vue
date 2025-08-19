<script setup lang="ts">
const props= defineProps<{
  hero?: {
    name?: string
    subtitle?: string
  }
}>()
const hero = props.hero
console.log(hero?.name)
</script>

<template>
  <section class="neonephos-home-hero">
    <div class="neonephos-home-hero-inner">
      <h1 class="neonephos-home-hero-name">{{ hero?.name }}</h1>
      <p class="neonephos-home-hero-text">
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

.neonephos-home-hero-name {
  font-size: 3rem;
  line-height: 1.2; /* Add this line */
  color: var(--vp-home-hero-name-color);
  margin-bottom: 3.5rem;
  font-weight: 700;
  word-break: break-word; /* Optional: prevents overflow */
}

.neonephos-home-hero-text {
  font-size: 2rem;
  line-height: 1.4;
  margin-top: 0;
  margin-bottom:2rem;
  max-width: 800px;
  font-weight: normal;
  color: var(--vp-c-text-1, #666);
}

/* Link styling inside hero text */
.neonephos-home-hero-text a {
  color: #104e8b;
  text-decoration: underline;
}

.neonephos-home-hero-text a:hover {
  color: #104e8b;
  text-decoration: none;
}
</style>

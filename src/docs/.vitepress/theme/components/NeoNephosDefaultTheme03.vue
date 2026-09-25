<script setup lang="ts">
import { useData } from 'vitepress'
import LinkButtonThemeComponent from './LinkButtonThemeComponent.vue'

const props = defineProps<{
  hero?: {
    name?: string
    subtitle?: string
  }
  description?: string
}>()

const { frontmatter } = useData()
</script>

<template>
  <section class="neonephos-home-hero">
    <div class="neonephos-home-hero-inner">
      <h1 class="neonephos-home-hero-name">{{ props.hero?.name }}</h1>
      <p class="neonephos-home-hero-subtitle">
        <span v-html="props.hero?.subtitle" />
      </p>

      <p v-if="props.description" class="hero-description">
        {{ props.description }}
      </p>

      <div v-if="frontmatter.linkButton" class="hero-actions">
        <template v-if="Array.isArray(frontmatter.linkButton)">
          <LinkButtonThemeComponent
            v-for="(btn, index) in frontmatter.linkButton"
            :key="index"
            :link-button="btn"
          />
        </template>
        <template v-else>
          <LinkButtonThemeComponent :link-button="frontmatter.linkButton" />
        </template>
      </div>

      <slot name="home-hero-after-title-before-end" />
      <slot name="home-hero-after" />
    </div>
  </section>
</template>

<style scoped>
.neonephos-home-hero {
  padding: 2rem 1rem 0.5rem;
  text-align: left;
  background: var(--neonephos-hero-bg, transparent);
}

.neonephos-home-hero-inner {
  max-width: var(--vp-normal-content-max-width);
  margin: 0 auto;
  padding-top: 1rem;
}

.neonephos-home-hero-name {
  margin-bottom: 0.5rem;
  line-height: 1.1;
}

.neonephos-home-hero-subtitle {
  margin-top: 0;
  margin-bottom: 1.25rem;
  line-height: 1.4;
  font-size: 1.5rem;
}

.hero-description {
  max-width: 900px;
  margin: 0 0 1.25rem;
  text-align: left;
  font-size: 1.15rem;
  line-height: 1.6;
  color: var(--vp-c-text-2);
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1.25rem;
  margin-bottom: 2.5rem;
  align-items: center;
}
</style>
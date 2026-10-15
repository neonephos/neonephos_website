<script setup lang="ts">
import NeoNephosDefaultTheme03 from './NeoNephosDefaultTheme03.vue'
import ProjectCardThemeComponent from './ProjectCardThemeComponent.vue'

import { useData } from 'vitepress'

const { frontmatter } = useData()

const lifecycleIntroText = `NeoNephos stewards open source building blocks for cloud and edge stacks so organizations can assemble end-to-end platforms without vendor lock-in. We focus on interoperability, portability, security, and neutral governance, with federation across providers and a common integration model to make independent platforms work together.`
</script>

<template>
  <div>
    <NeoNephosDefaultTheme03 
      :hero="frontmatter.hero" 
      :description="lifecycleIntroText"
    >
      <template #home-hero-after>

        <!-- Markdown Body Content Container -->
        <section class="markdown-content-section">
          <h2 class="lifecycle-stages-heading">Detailed Explanation</h2>
          <div class="content-container">
            <Content />
          </div>
        </section>

        <!-- Existing Project Cards Section -->
        <section class="lifecycle-section">
          <ProjectCardThemeComponent />
        </section>

      </template>
    </NeoNephosDefaultTheme03>
  </div>
</template>

<style scoped>
.markdown-content-section {
  padding: 0.5rem 0 0;
  max-width: var(--vp-layout-max-width, 1152px);
  margin: 0 auto;
}

.content-container {
  font-size: 1.1rem;
  line-height: 1.7;
  color: var(--vp-c-text-1);
}

/* Align headings and paragraphs inside <Content /> cleanly */
.content-container :deep(h2) {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--vp-neonephos-blue);
  margin-top: 2.5rem;
  margin-bottom: 1rem;
  letter-spacing: -0.5px;
}

.content-container :deep(p) {
  margin-bottom: 1.25rem;
}

.lifecycle-section {
  padding: 0.5rem 0 0;
  max-width: var(--vp-layout-max-width, 1152px);
  margin: 0 auto;
}

.lifecycle-stages-heading {
  font-size: 2rem;
  font-weight: 700;
  color: var(--vp-neonephos-blue);
  margin-top: 1rem;
  margin-bottom: 1.5rem;
  letter-spacing: -0.5px;
  text-align: left;
}
</style>
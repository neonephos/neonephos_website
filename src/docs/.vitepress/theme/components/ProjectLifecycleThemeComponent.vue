<script setup lang="ts">
import NeoNephosDefaultTheme03 from './NeoNephosDefaultTheme03.vue'
import ProjectCardThemeComponent from './ProjectCardThemeComponent.vue'

import { useData } from 'vitepress'

const { frontmatter } = useData()

const lifecycleIntroText = `Each NeoNephos project is classified into a maturity stage as defined in our
Project Lifecycle Document. Stages define benefits a project receives and
obligations it must fulfill as part of the stage requirements. When applying
to have your project integrated into NeoNephos, read up carefully below on
the benefits and obligations each stage levies upon the projects.`
</script>

<template>
  <div>
    <NeoNephosDefaultTheme03 
      :hero="frontmatter.hero" 
      :description="lifecycleIntroText"
    >
      <template #home-hero-after>

        <section class="lifecycle-section">
          <h2 class="lifecycle-stages-heading">Our Lifecycle Stages</h2>
          <ProjectCardThemeComponent />
        </section>

      </template>
    </NeoNephosDefaultTheme03>
  </div>
</template>

<style scoped>
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
<script setup lang="ts">
import NeoNephosDefaultTheme04 from './NeoNephosDefaultTheme04.vue'
import ProjectCardThemeComponent from './ProjectCardThemeComponent.vue'
import TextBlockThemeComponent from './TextBlockThemeComponent.vue'
import PieChartThemeComponent from './PieChartThemeComponent.vue'
import MemberBenefitsGridThemeComponent from './MemberBenefitsGridThemeComponent.vue'

import { useData, withBase } from 'vitepress'

const { frontmatter } = useData()

const lifecycleIntroText = `Open source foundations are proven structured development umbrellas for open source projects. Join NNF to strenghten the push towards cloud native sovereignty.`
</script>

<template>
  <div>
    <NeoNephosDefaultTheme04 
      :hero="frontmatter.hero" 
      :description="lifecycleIntroText"
    >
      <template #home-hero-after>

        <!-- Top Page-wide Text Block -->
        <TextBlockThemeComponent />

        <!-- Markdown Body Content Container with Pie Chart -->
        <section class="markdown-content-section">
          <div class="section-inner">
            <h2 class="lifecycle-stages-heading">Neutral governance generates trust.</h2>
            
            <div class="content-container">
              <PieChartThemeComponent />
            </div>
          </div>
        </section>

        <!-- Member Benefits Grid placed directly under the pie chart -->
        <MemberBenefitsGridThemeComponent />

        <!-- Bottom Text Block placed below the benefits grid -->
        <TextBlockThemeComponent contentKey="textBlockBottom" />

        <!-- Centered Propose Project Call-to-Action Button -->
        <section class="propose-cta-section" v-if="frontmatter.proposeButton !== false">
          <div class="section-inner propose-cta-container">
            <a href="https://enrollment.lfx.linuxfoundation.org/?project=neonephos-foundation&__hstc=81619592.11739e1f4ca03192f4e918409f725053.1748961872693.1753863796744.1753964512976.20&__hssc=81619592.2.1753964512976&__hsfp=2164450451" class="propose-btn">
              Join Now
            </a>
          </div>
        </section>

        <!-- Existing Project Cards Section -->
        <section class="lifecycle-section">
          <div class="section-inner">
            <ProjectCardThemeComponent />
          </div>
        </section>

      </template>
    </NeoNephosDefaultTheme04>
  </div>
</template>

<style scoped>
.markdown-content-section,
.lifecycle-section,
.propose-cta-section {
  width: 100%;
  box-sizing: border-box;
  padding: 0.5rem 0;
}

.section-inner {
  max-width: var(--vp-normal-content-max-width);
  margin: 0 auto;
  padding: 0 1rem;
  box-sizing: border-box;
  text-align: left;
}

.content-container {
  font-size: 1.1rem;
  line-height: 1.7;
  color: var(--vp-c-text-1);
}

.lifecycle-stages-heading {
  font-size: 2rem;
  font-weight: 700;
  color: var(--vp-neonephos-blue);
  margin-top: 2rem;
  margin-bottom: 1.5rem;
  letter-spacing: -0.5px;
  text-align: left;
}

/* Centered Propose Project Button Container */
.propose-cta-container {
  display: flex;
  justify-content: center;
  padding-top: 1.5rem;
  padding-bottom: 2rem;
}

.propose-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: var(--vp-neonephos-blue, #1F4FD8);
  border: 1px solid var(--vp-neonephos-blue, #1F4FD8);
  color: #ffffff;
  padding: 0.75rem 2rem;
  border-radius: 8px;
  font-size: 1.05rem;
  font-weight: 600;
  text-decoration: none;
  transition: opacity 0.2s ease, transform 0.1s ease;
  box-shadow: var(--vp-shadow-1);
}

.propose-btn:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}
</style>
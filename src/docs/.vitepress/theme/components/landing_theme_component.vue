<script setup lang="ts">
import { useData } from 'vitepress'
const { frontmatter } = useData()

import VPHome from 'vitepress/dist/client/theme-default/components/VPHome.vue'
</script>

<template>
  <div class="logo-background">
    <section class="home-hero__content">
      <div class="container wrap">
        <h1 class="home-hero__title">
          WE MAKE<br />
          CLOUD NATIVE<br />
          <span>SOVEREIGN</span>
        </h1>

        <h2 class="home-hero__description" v-html="frontmatter.hero?.tagline" />

        <div class="horizontal-rule"></div>

        <ul class="home-hero__metric_wrapper">
          <li class="show-over-800">
            <div class="wp-block-button">
              <a href="/introduction" class="wp-block-button__link wp-element-button">About NeoNephos</a>
            </div>
          </li>
          <li>{{ frontmatter.hero?.nprojects }}<span>Projects</span></li>
          <li>{{ frontmatter.hero?.nmembers }}<span>Members</span></li>
          <li>{{ frontmatter.hero?.ncontributors }}<span>Contributors</span></li>
        </ul>
      </div>
    </section>
  </div>

  <section class="home-tiles__section">
    <div class="container wrap">
      <LandingTilesThemeComponent />
    </div>
  </section>

<div>
  <section class="section-divider">
    <span class="section-divider__line"></span>
    <h2 class="section-divider__title">UPCOMING EVENTS</h2>
    <span class="section-divider__line"></span>
  </section>

  <EventsTilesThemeComponent />

    <section class="section-divider">
    <span class="section-divider__line"></span>
    <h2 class="section-divider__title">LATEST FROM NEONEPHOS</h2>
    <span class="section-divider__line"></span>
  </section>
   <BlogGalleryTeaserThemeComponent /> 

    <section class="section-divider">
    <span class="section-divider__line"></span>
    <h2 class="section-divider__title">LEARN</h2>
    <span class="section-divider__line"></span>
   </section>

   <NewToNeoNephosButtonThemeComponent /> 
</div>

</template>





<style scoped>
.home-hero__content {
  padding: 6rem 2rem;
  background: var(--vp-c-bg);
  position: relative;
}

.container.wrap {
  max-width: 960px;
  margin: 0 auto;
  text-align: left;
}

.home-hero__title {
  font-size: 38px;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 1rem;
  color: var(--vp-c-text-1);
  letter-spacing: 0.2rem;
}

@media (min-width: 412px) {
  .home-hero__title {
    font-size: 42px;
  }
}

@media (min-width: 600px) {
  .home-hero__title {
    font-size: 40px;
  }
}

@media (min-width: 1000px) {
  .home-hero__title {
    font-size: 58px;
  }
}


.home-hero__title span {
  color: var(--vp-neonephos-blue);
}

.home-hero__description {
  font-size: 14px;
  color: #444;
  margin-bottom: 2rem;
  max-width: 700px;
}

@media (min-width: 412px) {
  .home-hero__description {
    font-size: 16px;
  }
}

@media (max-width: 412px) {
  .show-over-800 {
    display: none;
  }
}

.horizontal-rule {
  width: 60px;
  height: 4px;
  background: var(--vp-neonephos-blue);
  margin: 2rem 0;
}

.home-hero__metric_wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  list-style: none;
  padding: 0;
  margin-top: 2rem;
}

.home-hero__metric_wrapper li {
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
}

.home-hero__metric_wrapper span {
  display: block;
  font-size: 0.875rem;
  color: #666;
  margin-top: 0.25rem;
}

.wp-block-button__link {
  background-color: var(--vp-neonephos-blue);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  display: inline-block;
  font-size:16px;
}

.wp-block-button__link:hover {
  background-color: #007aff;;
}

.home-tiles__section {
  padding: 4rem 2rem;
  background: var(--vp-c-bg);
}

@media screen and (min-width: 700px) {
  .logo-background {
    background: url('/nn_bg1_temp.webp') no-repeat center top;
    background-size: cover;
    background-color: #002b80;
    padding: 4rem 2rem;
    position: relative;
    z-index: 1;
    overflow: hidden;
  }

  .logo-background::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.3); /* Optional contrast overlay */
    z-index: 0;
  }

  .home-hero__title,
  .home-hero__description,
  .home-hero__metric_wrapper li,
  .home-hero__metric_wrapper span {
    color: white;
    position: relative;
    z-index: 1;
  }
}

@media screen and (min-width: 700px) {
  .logo-background .home-hero__content {
    background: transparent;
  }
}

.section-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 3rem;
  margin-bottom: 3rem;
  gap: 1rem;
}

.section-divider__line {
  flex-grow: 1;
  height: 1px;
  background-color: var(--vp-c-divider);
}

.section-divider__title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  white-space: nowrap;
  padding: 0 1rem;
}

</style>
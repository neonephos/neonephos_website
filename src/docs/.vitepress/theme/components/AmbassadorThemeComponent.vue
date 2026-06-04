<script setup lang="ts">
import NeoNephosDefaultTheme01 from './NeoNephosDefaultTheme01.vue'
import LandingTilesThemeComponent from './LandingTilesThemeComponent.vue'
import CommitteeTilesThemeComponent from './CommitteeTilesThemeComponent.vue'
import { useData, withBase} from 'vitepress'

const { frontmatter } = useData()
</script>

<template>
  <div >
    <NeoNephosDefaultTheme01 :hero="frontmatter.hero">
      <template #home-hero-after>
        <div> 

<div class="ambassador-hero">
  <div class="ambassador-hero-text">
    <h2>🚀 Become a NeoNephos Ambassador</h2>

    <p>
      NeoNephos Ambassadors promote our foundation and its projects through
      participation in events, hosting workshops, creating tutorials, or
      contributing other content.
    </p>

    <p>
      They serve as a point of contact and knowledge for people interested in
      NeoNephos and play a fundamental part in our community outreach strategy.
    </p>

    <a href="https://share.hsforms.com/1adSxGqXUQu6NzhIoik9N5w4tvhy" class="ambassador-cta">Start Your Journey Now</a>
  </div>

  <div class="ambassador-hero-image">
    <img :src="withBase('/assets/badge_ambassador_2026.svg')" alt="Ambassador Program" />
  </div>
</div>
<h2 class="ambassador-section-heading">Our Ambassadors</h2>
<CommitteeTilesThemeComponent :features="frontmatter.members" />

        </div>
        <div class="neonephos-blue-section">
          <div class="neonephos-blue-section-inner">
            <LandingTilesThemeComponent
              :key="frontmatter.title"
              :titleColor="'white'"
              :tiles="frontmatter.tiles"
              :heading="frontmatter.tilesHeading"
            />
          </div>
        </div>
      </template>
    </NeoNephosDefaultTheme01>
  </div>
</template>

<style scoped>
.events-text-container {
  padding: 2rem 1rem;
}

.ambassador-hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 1rem 2.5rem; /* reduced top whitespace */
  gap: 3rem;
}

.ambassador-hero-text {
  flex: 1;
  max-width: 550px; /* prevents overly wide text */
}

.ambassador-hero-text h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.ambassador-hero-text p {
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.ambassador-hero-image {
  flex: 0 0 260px; /* slightly smaller for balance */
}

.ambassador-hero-image img {
  width: 100%;
  height: auto;
  display: block;
}


.ambassador-cta {
  display: inline-block;
  margin-top: 1.5rem;
  padding: 0.85rem 1.8rem;
  background: linear-gradient(135deg, #0077ff, #00c2ff);
  color: white;
  font-size: 1.05rem;
  font-weight: 600;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.25s ease;
  box-shadow: 0 4px 12px rgba(0, 140, 255, 0.25);
}

.ambassador-cta:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 18px rgba(0, 140, 255, 0.35);
}

.ambassador-cta:active {
  transform: translateY(-1px);
  box-shadow: 0 3px 10px rgba(0, 140, 255, 0.25);
}

.ambassador-section-heading {
  font-size: 1.8rem;
  font-weight: 700;
  margin: 5.5rem 0 1.5rem;
  text-align: center;
  color: var(--vp-neonephos-blue) /* adjust to your brand color */
}

@media (max-width: 768px) {
  .ambassador-hero {
    flex-direction: column;
    text-align: center;
  }

  .ambassador-hero-image {
    display: none;
  }

  .ambassador-hero-text {
    max-width: 100%;
  }
}

</style>

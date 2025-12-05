<script setup lang="ts">
import { resolveSrc, resolveLink } from '../utils'
import { data as rawPosts } from '../../data/events.data'
import NeoNephosDefaultTheme01 from './NeoNephosDefaultTheme01.vue'
import EventsTilesThemeComponent from './EventsTilesThemeComponent.vue'
import { useData } from 'vitepress'

const { frontmatter } = useData();

const now = new Date();
const posts = rawPosts.filter(post => {
var temp= new Date(post.date);
temp= temp.setDate(temp.getDate()+1);
 return temp>= now;
 }
 )
console.log(rawPosts);
</script>

<template>
  <NeoNephosDefaultTheme01 :hero="frontmatter.hero">
    <template #home-hero-after-title-before-end>
      <section class="election-section">
 <section class="election-section">
  <p>
    NeoNephos Foundation seeks to hold open, fair, transparent, and efficient elections for various roles within the NeoNephos Foundation. See the timeline below for the elections and role periods.
  </p>

  <!-- Roles Timeline -->
  <div class="roles-timeline">
    <div class="role-item">
      <h3>General Member Governing Board representative(s)</h3>
      <span class="period">Oct 1 – Sep 30</span>
      <p><strong>Who votes:</strong> NeoNephos General Sponsorship class</p>
      <p><strong>How many are elected:</strong> One per five General Sponsors (min 1, max 3). <a href="https://charter.neonephos.org" target="_blank">Charter §2(c)</a></p>
    </div>

    <div class="role-item">
      <h3>Governing Board Chairperson</h3>
      <span class="period">Reviewed annually in October</span>
      <p><strong>Who votes:</strong> Governing Board representatives</p>
    </div>

    <div class="role-item">
      <h3>Governing Board Treasurer</h3>
      <span class="period">Reviewed annually in October</span>
      <p><strong>Who votes:</strong> Governing Board representatives</p>
    </div>

    <div class="role-item">
      <h3>TAC Vice Chairperson</h3>
      <span class="period">Reviewed annually in October</span>
      <p><strong>Who votes:</strong> Voting TAC representatives</p>
    </div>
  </div>

  <!-- Election Timeline -->
  <h2>Election Timeline</h2>
  <ol class="stepper">
    <li><strong>Election Notice:</strong> 2 weeks</li>
    <li><strong>Nomination Period:</strong> 1 week (closes 11:59 pm CET)</li>
    <li><strong>Review of Nominees:</strong> 1 day</li>
    <li><strong>Election Period:</strong> 1 week (closes 11:59 pm CET)</li>
    <li><strong>Results:</strong> Announced next day</li>
  </ol>


  <!-- Eligibility -->
  <h2>Eligibility</h2>
  <div class="info-grid">
    <div class="info-card">
      <div class="info-card__header">
        <span class="info-card__title">Requirements</span>
      </div>
      <ul class="clean-list">
        <li>Be willing and able to fulfill responsibilities</li>
        <li>Comply with Linux Foundation Europe and NeoNephos policies (<a href="https://linuxfoundation.eu/policies/antitrust-policy" target="_blank">Antitrust Policy</a>, <a href="https://linuxfoundation.eu/policies/code-of-conduct" target="_blank">Code of Conduct</a>)</li>
      </ul>
      <p class="subnote">Failure to meet requirements may result in removal, suspension, or ineligibility.</p>
    </div>
  </div>

  <!-- Nominations -->
  <h2>Nominations</h2>
  <div class="info-grid">
    <div class="info-card">
      <div class="info-card__header">
        <span class="info-card__title">Process</span>
      </div>
      <p>Nominations are via email. Electorate members may nominate others or self-nominate. Include name, company, background, and motivation. All nominations are confirmed before the election.</p>
    </div>
  </div>

  <!-- Elections -->
  <h2>Elections</h2>
  <div class="info-grid">
    <div class="info-card">
      <div class="info-card__header">
        <span class="info-card__title">Voting</span>
      </div>
      <p>Voting uses <a href="https://docs.linuxfoundation.org/lfx/project-control-center/v2-latest-version/collaborations/voting#voting-for-a-poll" target="_blank">LFX Voting</a>. Electors select candidates via check-box. Results are announced the day after elections close.</p>
      <p>Questions? Contact <a href="mailto:support@neonephos.org">support@neonephos.org</a>.</p>
    </div>
  </div>

</section>

 
       </section>
    </template>

    <template #home-hero-after>
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
</template>

<style scoped>
.election-section {
  border-radius: 10px;
  line-height: 1.7;
}

.election-section h1 {
  font-size: 2rem;
  color: var(--vp-neonephos-blue);
  margin-bottom: 1rem;
  border-bottom: 2px solid var(--vp-neonephos-blue);
  padding-bottom: 0.5rem;
}

.roles-timeline {
  border-left: 3px solid var(--vp-neonephos-blue);
  margin: 2rem 0;
  padding-left: 1.5rem;
}

.role-item {
  margin-bottom: 2rem;
  position: relative;
}

.role-item::before {
  content: "●";
  color: var(--vp-neonephos-blue);
  position: absolute;
  left: -1.5rem;
  font-size: 1.2rem;
}

.role-item h3 {
  margin: 0;
  color: var(--vp-neonephos-blue);
}

.role-item .period {
  display: inline-block;
  background: #eef3f9;
  color: var(--vp-neonephos-black);
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
  font-size: 0.9rem;
  margin: 0.5rem 0;
}

.stepper {
  counter-reset: step;
  list-style: none;
  padding: 0;
}

.stepper li {
  counter-increment: step;
  margin: 1rem 0;
  padding-left: 2rem;
  position: relative;
}

.stepper li::before {
  content: counter(step);
  position: absolute;
  left: 0;
  top: 0;
  background: var(--vp-neonephos-blue);
  color: white;
  border-radius: 50%;
  width: 1.5rem;
  height: 1.5rem;
  text-align: center;
  line-height: 1.5rem;
  font-weight: bold;
}
/* Shared info blocks */
.info-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin: 1rem 0 2rem;
}

.info-card {
  background: #ffffff;
  border: 1px solid rgba(0,0,0,0.06);
  border-radius: 12px;
  padding: 1rem 1.25rem;
  box-shadow: 0 6px 18px rgba(20, 31, 47, 0.06);
}

.info-card__header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.info-card__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 50%;
  background: var(--vp-neonephos-blue);
  color: #fff;
  font-size: 0.95rem;
}

.info-card__title {
  font-weight: 600;
  color: var(--vp-neonephos-black);
}

/* Clean list with subtle markers */
.clean-list {
  list-style: none;
  padding: 0;
  margin: 0 0 0.75rem;
}

.clean-list li {
  position: relative;
  padding-left: 1.5rem;
  margin: 0.4rem 0;
}

.clean-list li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0.55rem;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 2px;
  background: var(--vp-neonephos-blue);
}

.subnote {
  margin-top: 0.5rem;
  padding: 0.75rem 0.9rem;
  background: #fff7f7;
  border-left: 4px solid #d9534f;
  border-radius: 8px;
  color: #7a2c2c;
}

@media (min-width: 768px) {
  .info-grid {
    grid-template-columns: 1fr 1fr;
  }

  /* Single-card rows remain centered and balanced */
  .info-grid .info-card:only-child {
    grid-column: 1 / -1;
  }
}


</style>

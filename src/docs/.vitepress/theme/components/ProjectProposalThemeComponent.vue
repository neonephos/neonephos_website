<script setup lang="ts">
import NeoNephosDefaultTheme01 from './NeoNephosDefaultTheme01.vue'
import LandingTilesThemeComponent from './LandingTilesThemeComponent.vue'
import { useData, withBase } from 'vitepress'

const { frontmatter } = useData()
</script>

<template>
  <div class="nn-container">
    <NeoNephosDefaultTheme01 :hero="frontmatter.hero">
      <template #home-hero-after>
        <div v-html="frontmatter.hero?.text"></div>

        <div class="nn-intro">
          <p>
            Adding your project to NeoNephos is a multistage process involving several stakeholders.
          </p>
          <p>
            The project proposal process is governed by the following phases:
          </p>

          <img
            class="nn-process-image"
            :src="withBase('/assets/project_proposal_process.svg')"
            alt="Project Proposal Process"
          />

          <p>
            Only if a Project Applicant clears all phases shown above is the project successfully
            transferred to the NeoNephos Foundation.
          </p>
        </div>

        <!-- PROCESS STEPS -->
        <div class="nn-steps">

          <div class="nn-step">
            <div class="nn-step-title">Find a TAC Supporter</div>
            <p>
              Before submitting your proposal, it is strongly recommended to find a member of our TAC
              who supports it. This gives you a direct point of contact and an initial sense of
              whether your project is a good fit for our foundation.
              Explore the TAC members here:
              <a :href="withBase('/technical_advisory_council')">Technical Advisory Council</a>.
            </p>
          </div>

          <div class="nn-step">
            <div class="nn-step-title">Fill out the Project Proposal Form</div>
            <p>
              Complete the project proposal issue form located at
              <a href="https://github.com/neonephos/project" target="_blank">github.com/neonephos/projects</a>.
              Provide as much detail as possible and avoid leaving fields blank.
            </p>
          </div>

          <div class="nn-step">
            <div class="nn-step-title">
              Sign Project Contribution Agreement & Adopt Project Charter
            </div>
            <p>
              After submitting your proposal, the Linux Foundation will require your input on two
              documents:
            </p>
            <ul>
              <li><strong>Project Contribution Agreement</strong> — lists all trademarks and assets you intend to transfer.</li>
              <li><strong>Project Charter</strong> — defines how your project will operate within NeoNephos.</li>
            </ul>
            <p>
              You must reach agreement on both documents before proceeding.
            </p>
          </div>

          <div class="nn-step">
            <div class="nn-step-title">Project Presentation at the TAC</div>
            <p>
              Every aspiring project must present itself at a TAC meeting.
              To prepare, review previous proposal presentations on our
              <a href="https://www.youtube.com/watch?v=RTmsO7ImJzs&list=PLuht3iKPvwqNuOhfucjXtksJJBuIzBzWO" target="_blank">
                YouTube channel
              </a>.
            </p>
          </div>

          <div class="nn-step">
            <div class="nn-step-title">TAC & GB Vote on Project</div>
            <p>
              The TAC and Governing Board each vote on whether to include your project.
            </p>
          </div>

          <div class="nn-step">
            <div class="nn-step-title">Further Onboarding</div>
            <p>
              Congratulations! After clearing the TAC & GB voting hurdle, only administrative tasks
              remain — such as transferring GitHub ownership, domain transfers, and onboarding into
              the LFX Project Control Center. These steps are mandatory to complete the process.
              Welcome to NeoNephos!
            </p>
          </div>

        </div>

        <!-- READY BUTTON -->
        <div class="nn-ready-container">
          <a
            href="https://github.com/neonephos/projects/issues"
            target="_blank"
            class="nn-ready-link"
          >
            <button class="nn-ready-button">
              Ready to proceed?
            </button>
          </a>
        </div>


        <!-- BLUE SECTION -->
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
/* GLOBAL LINK STYLE — Caribbean Blue */
a {
  color: var(--vp-neonephos-blue);
  font-weight: 600;
  text-decoration: none;
  transition: color 0.2s ease;
}

a:hover {
  color: #0084a1;
}

/* CONTAINER */
.nn-container {
  width: 100%;
}

/* INTRO */
.nn-intro {
  margin-top: 2rem;
  font-size: 1.1rem;
  line-height: 1.7;
  color: var(--vp-c-text-1);
}

/* IMAGE */
.nn-process-image {
  margin: 2rem 0;
  max-width: 100%;
  border-radius: 8px;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.08);
}

/* STEPS */
.nn-steps {
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.nn-step {
  padding: 1.8rem 2rem;
  border-left: 5px solid var(--vp-c-brand);
  background: var(--vp-c-bg-soft);
  border-radius: 10px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.nn-step:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
}

.nn-step-title {
  font-size: 1.35rem;
  font-weight: 700;
  margin-bottom: 0.6rem;
  color: var(--vp-c-brand);
  letter-spacing: -0.3px;
}

.nn-step p {
  margin: 0.4rem 0;
  line-height: 1.65;
}

.nn-step ul {
  margin: 0.6rem 0 0.6rem 1.2rem;
  line-height: 1.6;
}

/* READY BUTTON */
.nn-ready-container {
  margin-top: 3rem;
  text-align: center;
}

.nn-ready-button {
  background: var(--vp-neonephos-blue);
  color: white;
  margin-bottom:3rem;
  padding: 0.9rem 2.2rem;
  font-size: 1.15rem;
  font-weight: 600;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: background 0.25s ease, transform 0.2s ease;
  box-shadow: 0 4px 14px rgba(0, 168, 204, 0.3);
}

.nn-ready-button:hover {
  background: #0084a1;
  transform: translateY(-2px);
}

.nn-ready-button:active {
  transform: translateY(0);
}

.nn-ready-link {
  text-decoration: none;
}


</style>

<script setup lang="ts">
import { resolveSrc, resolveLink } from '../utils'
import { data as rawPosts } from '../../data/events.data'
import NeoNephosDefaultTheme01 from './NeoNephosDefaultTheme01.vue'
import { useData } from 'vitepress'

const { frontmatter } = useData();

</script>

<template>
  <NeoNephosDefaultTheme01 :hero="frontmatter.hero">





<template #home-hero-after-title-before-end>
  <div class="brand-guidelines-layout">
    <!-- Sidebar Navigation -->
    <nav class="brand-sidebar">
      <h3 class="sidebar-title">Contents</h3>
      <ul>
        <li><a href="#trademark">Trademark Policy</a></li>
        <li><a href="#logo">Logo</a></li>
        <li><a href="#typography">Typography</a></li>
        <li><a href="#colors">Colors</a></li>
      </ul>
    </nav>

    <!-- Main Content -->
    <div class="brand-content">
      <!-- Trademark Section -->
      <section id="trademark" class="brand-section">
        <h2>Trademark Policy</h2>
        <p class="lead-text">
          Please review the <a href="https://www.linuxfoundation.org/hubfs/lfeu_policies_exhibitb_051024b.pdf?hsLang=en">Trademark Policy of Linux Foundation Europe</a> for further information regarding the usage of our assets.
        </p>
      </section>
      <br>
      <!-- Logo Section -->
      <section id="logo" class="brand-section">
        <h2>Logo</h2>
        <p>
          Our logo is our primary visual identifier. It represents NeoNephos and its principles.
          Below are all versions of our logo, including primary, secondary, and variations. This list is exhaustive, no other official logos exist.
        </p>

        <!-- Primary Logo -->
        <div class="logo-row">
          <div class="logo-text">
            <h3>Primary Logo</h3>
            <p>
              The primary logo is the main visual of NeoNephos and is the primary stand-in for NeoNephos in all media.
            </p>
          </div>
          <div class="logo-image">
            <img
              :src="resolveSrc('https://raw.githubusercontent.com/neonephos/artwork/refs/heads/main/other/neonephos-foundation/horizontal/color/neonephos-foundation-horizontal-color.svg')"
              alt="NeoNephos Primary Logo"
              class="logo-img"
            />
          </div>
        </div>

        <!-- Secondary Logo -->
        <div class="logo-row">
          <div class="logo-text">
            <h3>Icon</h3>
            <p>
              The icon may be used in situations where the primary logo does not fit, such as favicons or profile pictures. 
            </p>
          </div>
          <div class="logo-image">
            <img
              :src="resolveSrc('https://raw.githubusercontent.com/neonephos/artwork/refs/heads/main/other/neonephos-foundation/icon/color/neonephos-foundation-icon-color.svg')"
              alt="NeoNephos Icon"
              class="logo-img"
            />
          </div>
        </div>

        <!-- Variations -->
        <div class="logo-row">
          <div class="logo-text">
            <h3>Logo Variations</h3>
            <p>
              In cases where the previous logos may be stylistically unsuitable, official alternative variants exist. The variations shown here are exhaustive, no other variants exist.
            </p>
          </div>
          <div class="logo-image variations-grid">

  <img
    :src="resolveSrc('https://raw.githubusercontent.com/neonephos/artwork/refs/heads/main/other/neonephos-foundation/horizontal/color/neonephos-foundation-horizontal-color.svg')"
    alt="NeoNephos Color Logo"
    class="logo-img"
  />

  <img
    :src="resolveSrc('https://raw.githubusercontent.com/neonephos/artwork/refs/heads/main/other/neonephos-foundation/horizontal/black/neonephos-foundation-horizontal-black.svg')"
    alt="NeoNephos Black Logo"
    class="logo-img"
  />

  <img
    :src="resolveSrc('https://raw.githubusercontent.com/neonephos/artwork/refs/heads/main/other/neonephos-foundation/horizontal/alternate_color/neonephos-foundation-horizontal-alternate_color.svg')"
    alt="NeoNephos Alternate Color Logo"
    class="logo-img"
    style= "background-color: black;"
  />

  <img
    :src="resolveSrc('https://raw.githubusercontent.com/neonephos/artwork/refs/heads/main/other/neonephos-foundation/horizontal/white/neonephos-foundation-horizontal-white.svg')"
    alt="NeoNephos White Logo"
    class="logo-img"
    style= "background-color: black;"
  />


          </div>
        </div>
      </section>
    <br>
 <!-- Typography Section -->
<section id="typography" class="brand-section">
  <h2>Typography</h2>
  <p>
    This section lays out the rules for using fonts in relation with NeoNephos. As we have only recently started this process, so you may encounter other fonts in legacy media of ours.
  </p>

  <!-- Aptos -->
  <div class="logo-row">
    <div class="logo-text">
      <h3>Aptos</h3>
      <p>
        Aptos is to be used as the primary typeface in presentations of NeoNephos or its projects.
      </p>
    </div>
    <div class="logo-image">
      <div class="type-sample aptos-sample">
        abcdefghijklmnopqrstuvwxyz<br />
        ABCDEFGHIJLMNOPQRSTUVWXYZ<br />
        1234567890!$%&@
      </div>
    </div>
  </div>
</section>
    <br>
<!-- Colors Section -->
<section id="colors" class="brand-section">
  <h2>Colors</h2>
  <p>
    We currently define two primary colors, which are directly derived from our logo. They are to be used at your own descretion, for example in headings or backgrounds.
  </p>

  <div class="color-grid">
    <!-- NeoNephos Blue -->
    <div class="color-card">
      <div class="color-swatch neonephos-blue"></div>
      <div class="color-info">
        <h3>NeoNephos Blue</h3>
        <p>Primary color.</p>
        <p class="color-code">HEX: #0f6bff</p>
      </div>
    </div>

    <!-- NeoNephos Black -->
    <div class="color-card">
      <div class="color-swatch neonephos-black"></div>
      <div class="color-info">
        <h3>NeoNephos Black</h3>
        <p>Primary color, black.</p>
        <p class="color-code">HEX: #333333</p>
      </div>
    </div>
  </div>
</section>


    </div>
  </div>
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
/* Layout */
.brand-guidelines-layout {
  display: flex;
  gap: 3rem;
  align-items: flex-start;
  margin-top: 2rem;
}

/* Sidebar */
.brand-sidebar {
  flex: 0 0 240px;
  border-right: 1px solid #e5e7eb;
  padding-right: 1.5rem;
}

.sidebar-title {
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 1rem;
  color: var(--vp-c-text-1);
}

.brand-sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.brand-sidebar li {
  margin-bottom: 0.75rem;
}

.brand-sidebar a {
  text-decoration: none;
  color: var(--vp-c-text-1);
  font-weight: 500;
  transition: color 0.2s ease;
}

.brand-sidebar a:hover {
  color: var(--vp-neonephos-blue);
}

/* Main Content */
.brand-content {
  flex: 1;
  max-width: 860px;
}

.brand-section {
  margin-bottom: 3rem;
}

.brand-section h2 {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--vp-c-text-1);
}

.brand-section p {
  font-size: 1.05rem;
  line-height: 1.6;
  color: var(--vp-c-text-1);
}

/* Trademark Section */
.lead-text {
  font-size: 1.1rem;
  line-height: 1.7;
  color: var(--vp-c-text-1);
  margin-bottom: 2rem;
  background: var(--vp-c-bg-soft);
  padding: 1.5rem 1.75rem;
  border-left: 4px solid var(--vp-neonephos-blue);
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.lead-text a {
  color: var(--vp-neonephos-blue);
}

.lead-text a:hover {
  color: var(--vp-neonephos-blue);
}

/* Logo Rows (two-column layout) */
.logo-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  margin-top: 2.5rem;
  margin-bottom: 2.5rem;
}

.logo-text {
  flex: 1;
}

.logo-text h3 {
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: var(--vp-c-text-1);
}

.logo-text p {
  font-size: 1rem;
  line-height: 1.6;
  color: var(--vp-c-text-1);
}

.logo-image {
  flex: 1;
  text-align: right;
}

.logo-img {
  max-width: 260px;
  height: auto;
  margin: 0 auto;
  display: block;
  padding: 2%;
}

.logo-container {
  background-color: black;   /* black background behind each logo */
  display: inline-block;     /* shrink-wrap around the image */
  padding: 2%;              /* extend boundaries by 10% */

}



/* Variations Grid */
.variations-grid {
  display: flex;
  gap: 1.5rem;
  justify-content: flex-end;
  flex-wrap: wrap;
}

.variations-grid .logo-img {
  max-width: 180px;
}

/* Responsive */
@media (max-width: 768px) {
  .brand-guidelines-layout {
    flex-direction: column;
    gap: 2rem;
  }

  .brand-sidebar {
    display: none;
  }

  .logo-row {
    flex-direction: column;
    align-items: flex-start;
  }

  .logo-image {
    text-align: left;
    margin-top: 1rem;
  }

  .variations-grid {
    justify-content: flex-start;
  }
}


.type-sample {
  font-size: 1.4rem;
  line-height: 2rem;
  padding: 1.25rem 1.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background: #f9fafb;
  display: inline-block;
  white-space: pre-line;
}

@font-face {
  font-family: 'Aptos';
  src: url('/assets/Aptos.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
  font-display: swap; /* ensures text is visible while font loads */
}

.aptos-sample {
  font-family: 'Aptos', sans-serif;
  font-weight: 400;
  color: #111827;
}

.thiccboi-sample {
  font-family: 'Thiccboi', sans-serif;
  font-weight: 700;
  color: #0366d6;
}

/* Colors Section */
.color-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  margin-top: 2rem;
}

.color-card {
  flex: 1 1 300px;
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 1.25rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #f9fafb;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.color-swatch {
  width: 80px;
  height: 80px;
  border-radius: 6px;
  border: 1px solid #d1d5db;
}

.neonephos-blue {
  background-color: var(--vp-neonephos-blue);
}

.neonephos-black {
  background-color: var(--vp-neonephos-black);
}

.color-info h3 {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: #1f2937;
}

.color-info p {
  margin: 0.25rem 0;
  font-size: 0.95rem;
  color: #4b5563;
}

.color-code {
  font-family: monospace;
  font-weight: 600;
  color: #374151;
}

</style>

<style>
/* In dark mode, give logos a white backdrop so dark/grey marks stay legible.
   Logos that already have an inline `background-color: black` keep it via
   inline-style specificity. */
html.dark .logo-img {
  background-color: #ffffff;
  border-radius: 4px;
}
</style>

<script setup lang="ts">
import VPHome from 'vitepress/dist/client/theme-default/components/VPHome.vue'

import { onMounted } from 'vue';

onMounted(() => {
  const script = document.createElement('script');
  script.src = '//js.hsforms.net/forms/embed/v2.js';
  script.charset = 'utf-8';
  script.type = 'text/javascript';
  script.onload = () => {
    if (window.hbspt) {
      window.hbspt.forms.create({
        portalId: '8112310',
        formId: '94c7250b-b36e-452b-89f2-abf206fbb920',
        region: 'na1',
        css: '',
        cssClass: 'hubspot-contact-form',
        target: '#hubspot-contact-form'
      });
    }
  };
  document.body.appendChild(script);
});
</script>

<template>
    <div class="contact-container">
        <VPHome>
      <template #home-hero-after>
        <div class="hubspot-container">
            <p class="contact-title">Get in <strong>touch</strong>.</p>
            <div id="hubspot-contact-form"></div>
        </div>
      </template>
    </VPHome>
    </div>
</template>


<style scoped>
/* Hero section overrides */
.contact-container ::v-deep(.VPHomeHero .name),
.contact-container ::v-deep(.VPHomeHero .text) {
  padding: 0 32px;
}

.contact-container ::v-deep(.VPHomeHero .name) {
  font-size: 3rem;
  color: pink;
  margin-bottom: 3.5rem;
}

.contact-container ::v-deep(.VPHomeHero .text) {
  font-size: 1.6rem;
  line-height: 1.4;
  max-width: 800px;
  font-weight: normal;
  margin-top: 0;
}

.contact-container ::v-deep(.VPHomeHero) {
  margin-bottom: 0rem;
}

.contact-container ::v-deep(.VPHome .content) {
  margin-top: 0 !important;
}

.contact-title {
  font-size: 24px;
  line-height: 140%;
  text-align: left;
  color: var(--vp-home-hero-name-color);
}

@media (min-width: 1000px) {
  .contact-title {
    font-size: 40px;
  }
}

/* HubSpot container */
.hubspot-container {
  margin: 0 auto 40px;
  max-width: 1150px;
  padding: 0 32px; /* ✅ Added for consistent horizontal spacing */
}

/* Form wrapper */
::v-deep(.hubspot-contact-form) {
  background-color: var(--vp-c-bg);
}

.hubspot-contact-form {
  display: flex;
  justify-content: center;
  padding: 2rem 0;
}

/* Form grid layout */
::v-deep(.hubspot-contact-form form) {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
}

/* Field wrapper */
::v-deep(.hubspot-contact-form .hs-form-field) {
  width: 100%;
  box-sizing: border-box;
}

/* Inputs, selects, textareas */
::v-deep(.hubspot-contact-form input),
::v-deep(.hubspot-contact-form select),
::v-deep(.hubspot-contact-form textarea) {
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 16px;
  border: none;
  border-bottom: 2px solid var(--vp-c-text-2);
  background-color: transparent;
  color: var(--vp-c-text-2);
  box-sizing: border-box;
}

::v-deep(.hubspot-contact-form select) {
  background-color: var(--vp-c-bg);
}

::v-deep(.hubspot-contact-form input::placeholder),
::v-deep(.hubspot-contact-form textarea::placeholder) {
  color: var(--vp-c-text-2);
  opacity: 1;
}

/* Error messages */
::v-deep(.hubspot-contact-form .hs-error-msg),
::v-deep(.hubspot-contact-form .hs-error-msgs) {
  text-align: left;
  font-size: 14px;
  margin-top: 4px;
}

/* Labels */
::v-deep(.hubspot-contact-form label) {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 20px;
  font-weight: 400;
  color: var(--vp-c-text-2);
}

/* Legal consent layout */
::v-deep(.hubspot-contact-form .legal-consent-container) {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: flex-start;
  font-size: 14px;
  line-height: 1.6;
  grid-column: span 2;
}

/* Checkbox label styling */
::v-deep(.hubspot-contact-form .legal-consent-container .hs-form-booleancheckbox-display) {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 16px;
}

/* Checkbox input */
::v-deep(.hubspot-contact-form .legal-consent-container input[type="checkbox"]) {
  width: 18px;
  height: 18px;
  accent-color: var(--vp-button-brand-bg);
  cursor: pointer;
}

/* Subtext paragraph */
::v-deep(.hubspot-contact-form .legal-consent-container .hs-richtext p) {
  margin: 0;
  font-size: 14px;
  color: var(--vp-c-text-2);
}

/* Submit button container */
::v-deep(.hubspot-contact-form .hs_submit),
::v-deep(.hubspot-contact-form .actions) {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  grid-column: span 2;
  width: 100%;
}

/* Submit button styling */
::v-deep(.hubspot-contact-form .hs_submit input[type="submit"]),
::v-deep(.hubspot-contact-form .actions input[type="submit"]) {
  padding: 11px 40px;
  font-size: 16px;
  font-weight: 700;
  line-height: 18px;
  background-color: var(--vp-button-brand-bg);
  color: white;
  border: none;
  border-radius: 5px;
  box-sizing: border-box;
  cursor: pointer;
  transition: background-color 0.3s ease;
  max-width: 300px;
  width: 100%;
}

/* Hover effect */
::v-deep(.hubspot-contact-form .hs_submit input[type="submit"]:hover),
::v-deep(.hubspot-contact-form .actions input[type="submit"]:hover) {
  background-color: var(--vp-button-brand-bg);
}

/* Responsive stacking and padding */
@media (max-width: 600px) {
  ::v-deep(.hubspot-contact-form form) {
    grid-template-columns: 1fr;
  }

  ::v-deep(.hubspot-contact-form .legal-consent-container),
  ::v-deep(.hubspot-contact-form .hs_submit),
  ::v-deep(.hubspot-contact-form .actions) {
    grid-column: span 1;
    justify-self: stretch;
  }

  ::v-deep(.hubspot-contact-form .hs_submit input[type="submit"]),
  ::v-deep(.hubspot-contact-form .actions input[type="submit"]) {
    max-width: 100%;
  }
}

</style>

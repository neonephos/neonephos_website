<script setup lang="ts">
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
        formId: '0a510c23-cc1b-4f0b-a5af-f72f5c42de31',
        region: 'na1',
        css: '',
        cssClass: 'hubspot-form',
        target: '#hubspot-form'
      });
    }
  };
  document.body.appendChild(script);
});
</script>

<template>
  <div class="hubspot-container">
    <p class="newsletter-title"><strong style="color:var(--vp-neonephos-blue);">Subscribe</strong> for the latest community news.</p>
    <div id="hubspot-form"></div>
  </div>
</template>







<style scoped>

.newsletter-title{
    font-size:24px;
    line-height:140%;
    text-align: left; 
}

@media (min-width: 1000px) {
  .newsletter-title{
    font-size:40px;
  }
}

.hubspot-container{
  margin-bottom:40px;
}

::v-deep(.hubspot-form) {
  background-color: var(--vp-c-bg);
}

.hubspot-form {
  display: flex;
  justify-content: center;
  padding: 2rem 0;
}

/* Form container grid */
::v-deep(.hubspot-form form) {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
}

/* Field wrapper */
::v-deep(.hubspot-form .hs-form-field) {
  width: 100%;
  box-sizing: border-box;

}


::v-deep(.hubspot-form input),
::v-deep(.hubspot-form select),
::v-deep(.hubspot-form textarea) {
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 16px;
  border: none;
  border-bottom: 2px solid var(--vp-c-text-2);
  background-color: transparent;
  color: var(--vp-c-text-2);
  box-sizing: border-box;
}

:v-deep(.hubspot-form inputinvalid) {
  text-align: left;
  color:pink;
}

::v-deep(.hubspot-form select) {
  background-color: var(--vp-c-bg);
}

::v-deep(.hubspot-form input::placeholder),
::v-deep(.hubspot-form textarea::placeholder) {
  color: var(--vp-c-text-2);
  opacity: 1; /* Ensures full brightness */
}

::v-deep(.hubspot-form .hs-error-msg),
::v-deep(.hubspot-form .hs-error-msgs) {
  text-align: left;
  font-size: 14px;
  margin-top: 4px;
}


/* Label styling */
::v-deep(.hubspot-form label) {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 20px;
  font-weight: 400;
  color: var(--vp-c-text-2);;
}

/* Legal consent and submit button span full width */
::v-deep(.hubspot-form .legal-consent-container),
::v-deep(.hubspot-form .hs_submit) {
  grid-column: span 2;
  margin-top:20px;
}

/* Submit button styling */
::v-deep(.hubspot-form .hs_submit input[type="submit"]) {
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
  max-width:300px;
}

::v-deep(.hubspot-form .hs_submit input[type="submit"]:hover) {
  background-color: var(--vp-button-brand-bg)
}


/* Responsive stacking */
@media (max-width: 600px) {
  ::v-deep(.hubspot-form form) {
    grid-template-columns: 1fr;
  }

  ::v-deep(.hubspot-form .legal-consent-container),
  ::v-deep(.hubspot-form .hs_submit) {
    grid-column: span 1;
    justify-self: stretch;
  }
}
</style>




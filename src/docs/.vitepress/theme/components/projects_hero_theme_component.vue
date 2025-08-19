<script setup>
import VPHome from 'vitepress/dist/client/theme-default/components/VPHome.vue'
</script>

<template>
<div class="projects-container">
    <VPHome>
        <!-- Inject custom content using slots -->
        <template #home-hero-after>
        </template>
    </VPHome>
  </div>
</template>

<style scoped>

/* Use ::v-deep to reach into VPHomeHero */
.projects-container ::v-deep(.VPHomeHero .name) {
  font-size: 3rem;
  color: pink;
}

.projects-container ::v-deep(.VPHomeHero .text) {
  font-size: 1.6rem;
  line-height: normal;
  max-width:800px;
  font-weight: normal;
}
</style>
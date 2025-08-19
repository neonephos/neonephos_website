<script setup>
import DefaultTheme from 'vitepress/theme'
const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #sidebar><div /></template> <!-- Removes sidebar -->
    <template #aside><div /></template>   <!-- Removes right aside -->
    <template #layout-top></template>     <!-- Optional: keep global banner -->
  </Layout>
</template>

<style scoped>
.VPDoc {
  max-width: 960px;
  margin: 0 auto;
  padding: 2rem;
}
</style>

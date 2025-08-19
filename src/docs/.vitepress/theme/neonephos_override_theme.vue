<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import LinuxHeader from './linux_header.vue'
const { Layout } = DefaultTheme
</script>

<template>
  <Layout :sidebar="false" :aside="false">
    <!-- Optional: custom header -->
    <template #layout-top>
     <LinuxHeader />
    </template>
  </Layout>
</template>

<style scoped>
.global-banner {
  background-color: black;
  padding: 10px;
}
</style>
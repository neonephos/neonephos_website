<script setup>
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './../neonephos_override_theme.css'

// Import all your custom layout components
import { layoutMap } from '../importRegistry'

const { frontmatter } = useData()

const resolvedLayout = layoutMap[frontmatter.value.layout] || null
console.log(frontmatter)
console.log('Resolved layout:', frontmatter.value.layout)
</script>

<template>
  <DefaultTheme.Layout>
    <template #layout-top>
     <LinuxHeader />
    </template>
    <template #page>
      <component v-if="resolvedLayout" :is="resolvedLayout" />
      <Content v-else />
    </template>
  </DefaultTheme.Layout>
</template>


<style scoped>
.global-banner {
  background-color: black;
  padding: 10px;
}
</style>
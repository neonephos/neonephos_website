<script setup lang="ts">
import { useData, withBase } from 'vitepress'
import { computed } from 'vue'

const props = defineProps<{
  contentKey?: string // defaults to 'textBlock'
}>()

const { frontmatter } = useData()

const blockData = computed(() => {
  const key = props.contentKey || 'textBlock'
  const tb = frontmatter.value[key] || {}
  return {
    header: tb.header || '',
    headerColor: tb.headerColor || 'var(--vp-neonephos-blue)',
    description: tb.description || '',
    descriptionColor: tb.descriptionColor || 'var(--vp-c-text-2)',
    items: tb.items || [],
    backgroundColor: tb.backgroundColor || 'transparent'
  }
})

// Convert Markdown links [text](url) into clean HTML anchor tags with withBase applied to relative paths
const parseLinks = (text: string) => {
  if (!text) return ''
  return text.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g, 
    (match, label, url) => {
      // Apply withBase to internal absolute/relative links starting with '/'
      const formattedUrl = url.startsWith('/') ? withBase(url) : url
      const isExternal = url.startsWith('http://') || url.startsWith('https://')
      const targetAttr = isExternal ? 'target="_blank" rel="noopener"' : ''
      return `<a href="${formattedUrl}" ${targetAttr} class="text-block-link">${label}</a>`
    }
  )
}

const renderedDescription = computed(() => parseLinks(blockData.value.description))

const renderedItems = computed(() => {
  if (blockData.value.items && blockData.value.items.length > 0) {
    return blockData.value.items.map((item: string) => parseLinks(item))
  }
  return []
})
</script>

<template>
  <div 
    v-if="blockData.header || blockData.description || blockData.items.length > 0"
    class="text-block-wrapper" 
    :style="{ backgroundColor: blockData.backgroundColor || 'transparent' }"
  >
    <div class="text-block-container">
      <h2 
        v-if="blockData.header" 
        class="text-block-header" 
        :style="{ color: blockData.headerColor || 'var(--vp-neonephos-blue)' }"
      >
        {{ blockData.header }}
      </h2>

      <p 
        v-if="renderedDescription" 
        class="text-block-description" 
        :style="{ color: blockData.descriptionColor }"
        v-html="renderedDescription"
      ></p>

      <div 
        v-if="renderedItems.length > 0" 
        class="text-block-list" 
        :style="{ color: blockData.descriptionColor }"
      >
        <ul>
          <li v-for="(item, index) in renderedItems" :key="index" v-html="item"></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.text-block-wrapper {
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  padding: 2.5rem 0;
  box-sizing: border-box;
}

.text-block-container {
  max-width: var(--vp-normal-content-max-width);
  margin: 0 auto;
  padding: 0 1rem;
  box-sizing: border-box;
  text-align: left;
}

.text-block-header {
  font-size: 2rem;
  font-weight: 700;
  color: var(--vp-neonephos-blue);
  margin-top: 0;
  margin-bottom: 1.25rem;
  letter-spacing: -0.5px;
  text-align: left;
}

.text-block-description {
  font-size: 1.1rem;
  line-height: 1.7;
  margin: 0 0 1.25rem 0;
  text-align: left;
}

.text-block-list :deep(ul) {
  list-style-type: disc;
  margin: 0.5rem 0 0.5rem 1.25rem;
  padding: 0;
}

.text-block-list :deep(li) {
  font-size: 1.1rem;
  line-height: 1.7;
  margin-bottom: 0.5rem;
  text-align: left;
}

:deep(.text-block-link) {
  color: var(--vp-neonephos-blue, #1F4FD8);
  text-decoration: underline;
  text-underline-offset: 2px;
  font-weight: 500;
}

:deep(.text-block-link:hover) {
  opacity: 0.85;
}
</style>
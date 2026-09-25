<template>
  <div class="link-button-wrapper">
    <a 
      :href="resolveLink(buttonData.linkUrl)" 
      class="link-button"
      :style="buttonStyles"
    >
      {{ buttonData.title }}
    </a>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import { resolveLink } from '../utils'

interface LinkButtonData {
  title: string
  linkUrl: string
  backgroundColor?: string
  borderColor?: string
  fontColor?: string
}

const props = defineProps<{
  linkButton?: LinkButtonData
}>()

const { frontmatter } = useData()

const buttonData = computed<LinkButtonData>(() => {
  return props.linkButton || frontmatter.value.linkButton || { title: '', linkUrl: '' }
})

const buttonStyles = computed(() => {
  const bg = buttonData.value.backgroundColor || 'var(--vp-neonephos-blue)'
  const border = buttonData.value.borderColor || 'var(--vp-neonephos-blue)'
  const color = buttonData.value.fontColor || '#ffffff'

  return {
    backgroundColor: bg,
    borderColor: border,
    color: color,
  }
})
</script>

<style scoped>
.link-button-wrapper {
  display: inline-block;
}

.link-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1.25rem;
  font-size: 0.875rem;
  font-weight: 600;
  border-style: solid;
  border-width: 1px;
  border-radius: 24px; 
  text-decoration: none;
  cursor: pointer;
  transition: opacity 0.2s ease, transform 0.15s ease;
}

.link-button:hover {
  opacity: 0.85;
  transform: translateY(-1px);
}

.link-button:active {
  transform: translateY(0);
}
</style>
<script setup lang="ts">
import { useData } from 'vitepress'
import { computed } from 'vue'

const { frontmatter } = useData()

// Process frontmatter data supporting 'diagram' or fallback 'pieChart'
const chartData = computed(() => {
  if (frontmatter.value.diagram && frontmatter.value.diagram.length > 0) {
    const firstDiagram = frontmatter.value.diagram[0]
    return {
      title: firstDiagram.title || 'Data Distribution',
      description: firstDiagram.description || '',
      descriptionColor: firstDiagram.descriptionColor || 'var(--vp-c-text-2)',
      slices: (firstDiagram.elements || []).map((el: any) => ({
        label: el.name,
        value: Number(el.number) || 0,
        color: el.color || '#1F4FD8'
      }))
    }
  }

  return frontmatter.value.pieChart || {
    title: 'Data Distribution',
    description: '',
    descriptionColor: 'var(--vp-c-text-2)',
    slices: [
      { label: 'Category A', value: 40, color: '#41b883' },
      { label: 'Category B', value: 35, color: '#3178c6' },
      { label: 'Category C', value: 25, color: '#f7df1e' }
    ]
  }
})

// Convert Markdown-style links [text](url) into clean HTML anchor tags
const renderedDescription = computed(() => {
  const desc = chartData.value.description
  if (!desc) return ''
  
  return desc.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g, 
    '<a href="$2" target="_blank" rel="noopener" class="chart-desc-link">$1</a>'
  )
})

// Calculate total value safely
const totalValue = computed(() => {
  return chartData.value.slices.reduce((sum: number, slice: { value: number }) => sum + slice.value, 0)
})

// Generate conic-gradient background style
const conicGradientStyle = computed(() => {
  if (totalValue.value === 0) {
    return { background: '#e0e0e0' }
  }

  let cumulativePercent = 0
  const gradientStops = chartData.value.slices.map((slice: { value: number; color: string }) => {
    const percent = (slice.value / totalValue.value) * 100
    const start = cumulativePercent
    cumulativePercent += percent
    return `${slice.color} ${start}% ${cumulativePercent}%`
  })

  return {
    background: `conic-gradient(${gradientStops.join(', ')})`
  }
})
</script>

<template>
  <div class="pie-chart-container">
    <h3 v-if="chartData.title" class="chart-title">{{ chartData.title }}</h3>
    
    <!-- Chart and Legend Container -->
    <div class="chart-content">
      <div 
        class="pie-chart" 
        :style="conicGradientStyle"
        role="img"
        :aria-label="chartData.title"
      >
        <div class="pie-chart-hole"></div>
      </div>

      <ul class="chart-legend">
        <li v-for="(slice, index) in chartData.slices" :key="index" class="legend-item">
          <span class="color-box" :style="{ backgroundColor: slice.color }"></span>
          <span class="legend-label">{{ slice.label }}</span>
          <span class="legend-value">
            ({{ totalValue > 0 ? Math.round((slice.value / totalValue) * 100) : 0 }}%)
          </span>
        </li>
      </ul>
    </div>

    <!-- Description Rendered Below the Chart and Legend -->
    <p 
      v-if="chartData.description" 
      class="chart-description" 
      :style="{ color: chartData.descriptionColor }"
      v-html="renderedDescription"
    ></p>
  </div>
</template>

<style scoped>
.pie-chart-container {
  padding: 1.5rem 0;
  max-width: 700px;
  margin: 0 auto;
  text-align: center;
}

.chart-title {
  font-size: 1.35rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: var(--vp-c-text-1);
}

.chart-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

@media (min-width: 640px) {
  .chart-content {
    flex-direction: row;
    justify-content: center;
    gap: 3rem;
  }
}

.chart-description {
  font-size: 1rem;
  margin-top: 1.75rem;
  margin-bottom: 0.5rem;
  line-height: 1.5;
}

/* Links inside description styled with NeoNephos Blue */
.chart-description :deep(.chart-desc-link) {
  color: var(--vp-neonephos-blue, #1F4FD8);
  text-decoration: underline;
  text-underline-offset: 2px;
  font-weight: 500;
}

.chart-description :deep(.chart-desc-link:hover) {
  opacity: 0.85;
}

.pie-chart {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  position: relative;
  box-shadow: var(--vp-shadow-2);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.pie-chart-hole {
  width: 110px;
  height: 110px;
  background-color: var(--vp-c-bg);
  border-radius: 50%;
}

.chart-legend {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  text-align: left;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.95rem;
  color: var(--vp-c-text-2);
}

.color-box {
  width: 16px;
  height: 16px;
  border-radius: 4px;
  flex-shrink: 0;
}

.legend-label {
  font-weight: 500;
  color: var(--vp-c-text-1);
}

.legend-value {
  color: var(--vp-c-text-3);
  font-size: 0.85rem;
}
</style>
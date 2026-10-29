<script setup lang="ts">
import { useData } from 'vitepress'
import { computed } from 'vue'

const { frontmatter } = useData()

const benefitsCards = computed(() => {
  return frontmatter.value.memberBenefits || []
})
</script>

<template>
  <div v-if="benefitsCards.length > 0" class="member-benefits-grid-section">
    <div 
      class="benefits-grid"
      :class="{ 'has-single-card': benefitsCards.length === 1 }"
    >
      <div 
        v-for="(card, index) in benefitsCards" 
        :key="index"
        class="benefit-card"
        :class="{ 'standalone-card': benefitsCards.length === 1 || (benefitsCards.length % 2 !== 0 && index === benefitsCards.length - 1) }"
        :style="{ backgroundColor: card.backgroundColor || 'var(--vp-c-bg-soft)' }"
      >
        <!-- Heading -->
        <h3 
          v-if="card.heading" 
          class="card-heading" 
          :style="{ color: card.headingColor || 'var(--vp-neonephos-blue)' }"
        >
          {{ card.heading }}
        </h3>

        <!-- Tier Description -->
        <p 
          v-if="card.tierDescription" 
          class="tier-description" 
          :style="{ color: card.tierColor || 'var(--vp-c-text-2)' }"
        >
          {{ card.tierDescription }}
        </p>

        <!-- Pricing Description List (Vertically stacked, no bullets) -->
        <div v-if="card.pricingDescriptionList && card.pricingDescriptionList.length > 0" class="pricing-desc-list">
          <div 
            v-for="(pDesc, pIdx) in card.pricingDescriptionList" 
            :key="pIdx"
            class="pricing-desc-item"
            :style="{ color: typeof pDesc === 'object' ? (pDesc.color || 'var(--vp-c-text-1)') : 'var(--vp-c-text-1)' }"
          >
            {{ typeof pDesc === 'object' ? pDesc.text : pDesc }}
          </div>
        </div>

        <!-- Optional Pricing Table Dropdown -->
        <div v-if="card.pricingTable && card.pricingTable.length > 0" class="pricing-dropdown-container">
          <details class="pricing-details">
            <summary class="pricing-summary">Pricing Table</summary>
            <div class="table-wrapper">
              <table class="pricing-table">
                <thead>
                  <tr>
                    <th>Employee Count</th>
                    <th>Price in €</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(row, rIndex) in card.pricingTable" :key="rIndex">
                    <td>{{ row.employees }}</td>
                    <td>{{ row.price }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </details>
        </div>

        <!-- Bullet Points List (Left-aligned with standard dots) -->
        <ul v-if="card.bulletPoints && card.bulletPoints.length > 0" class="bullet-list">
          <li 
            v-for="(point, pIndex) in card.bulletPoints" 
            :key="pIndex"
            :style="{ color: typeof point === 'object' ? (point.color || 'var(--vp-c-text-1)') : 'var(--vp-c-text-1)' }"
          >
            {{ typeof point === 'object' ? point.text : point }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.member-benefits-grid-section {
  width: 100%;
  box-sizing: border-box;
  padding: 2rem 0;
}

.benefits-grid {
  max-width: var(--vp-normal-content-max-width);
  margin: 0 auto;
  padding: 0 1rem;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  justify-content: center;
  align-items: start; /* Prevents auto-stretching when height differs */
}

/* Center single card in desktop mode */
.benefits-grid.has-single-card {
  grid-template-columns: 1fr;
  max-width: 470px;
}

@media (max-width: 768px) {
  .benefits-grid {
    grid-template-columns: 1fr;
  }
}

.benefit-card {
  width: 100%;
  max-width: 470px;
  min-height: 740px;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 2.5rem;
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
  box-shadow: var(--vp-shadow-2);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: left;
}

/* When a card is alone in its row (or the only card in total), height fits content naturally */
.benefit-card.standalone-card {
  min-height: auto;
}

.card-heading {
  font-size: 1.75rem;
  font-weight: 700;
  margin-top: 0;
  margin-bottom: 1rem;
  letter-spacing: -0.5px;
}

.tier-description {
  font-size: 1.05rem;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.pricing-desc-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.pricing-desc-item {
  font-size: 1.1rem;
  font-weight: 600;
  list-style: none;
}

.pricing-dropdown-container {
  margin-bottom: 1.5rem;
}

.pricing-details {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  overflow: hidden;
}

.pricing-summary {
  padding: 0.75rem 1rem;
  font-weight: 600;
  cursor: pointer;
  user-select: none;
  color: var(--vp-neonephos-blue);
  outline: none;
}

.pricing-summary:hover {
  background: var(--vp-c-bg-soft);
}

.table-wrapper {
  padding: 0.5rem 1rem 1rem 1rem;
  overflow-x: auto;
}

.pricing-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 0.95rem;
}

.pricing-table th,
.pricing-table td {
  padding: 0.5rem 0.75rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.pricing-table th {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.bullet-list {
  margin: 0;
  padding-left: 1.5rem;
  list-style-type: disc;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  text-align: left;
}

.bullet-list li {
  font-size: 1rem;
  line-height: 1.5;
  display: list-item;
}
</style>
<template>
  <div class="neonephos-tile">
    <div class="neonephos-tile__content">
      <h3 class="neonephos-tile__title">New to NeoNephos?</h3>
      <a
        href="/introduction"
        class="neonephos-tile__button"
        title="Learn more about NeoNephos"
      >
        About NeoNephos
      </a>
    </div>
  </div>
</template>




<style scoped>
.neonephos-tile {
  width: 100%;
  background-color: var(--vp-c-bg);
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
  border: 1px solid #e5e7eb;
  padding: 2rem;
  margin-top: 2rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.neonephos-tile:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
}

.neonephos-tile__content {
  display: flex;
  justify-content: center; /* Center the group horizontally */
  align-items: center;
  gap: 1.5rem; /* Space between title and button */
  flex-wrap: wrap;
  text-align: center;
}

.neonephos-tile__title {
  font-size: 1.75rem;
  font-weight: 800;
  color: var(--vp-neonephos-blue);
  margin: 0;
  line-height: 1.2;
  letter-spacing: -0.5px;
}

.neonephos-tile__button {
  background-color: var(--vp-neonephos-blue);
  color: white;
  padding: 0.75rem 1.25rem;
  border-radius: 6px;
  font-weight: 600;
  text-decoration: none;
  font-size: 1rem;
  transition: background-color 0.2s ease;
}

.neonephos-tile__button:hover {
  background-color: #005bb5;
}

</style>

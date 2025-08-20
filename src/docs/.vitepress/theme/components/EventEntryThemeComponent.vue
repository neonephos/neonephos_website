<script setup>
import { useData } from 'vitepress'
</script>

<template>
  <div class="event-post">
    <div class="vp-doc">
      <Content />
    </div>
    <div class="back-button-wrapper">
      <a href="/events" class="back-button">← Back To Events</a>
    </div>
  </div>
</template>

<style>
.event-post {
  max-width: 720px;
  margin: 0 auto;
  margin-top:2rem;
  padding: 2rem;
}

.back-button-wrapper {
  margin-top: 2rem;
  text-align: center;
}

.back-button {
  display: inline-block;
  padding: 0.6em 1.2em;
  background-color: var(--vp-button-brand-bg);
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-weight: 500;
  transition: background-color 0.2s ease;
}

.back-button:hover {
  background-color: #005fa3;
}
</style>

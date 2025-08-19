<script setup lang="ts">
import { data as postsRaw } from '../../data/blog.data'

// Sort and slice to get the 3 latest posts
const posts = postsRaw
  .slice()
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(0, 3)

console.log(posts);
</script>

<template>
  <section class="blog-gallery-teaser">
    <div class="blog-gallery-teaser-grid">
      <a
        v-for="post in posts"
        :key="post.url"
        :href="post.url"
        class="blog-gallery-teaser-tile"
        :title="post.title"
      >
        <img
          v-if="post.banner"
          :src="post.banner"
          :alt="post.title"
          class="blog-gallery-teaser-image"
          loading="lazy"
          decoding="async"
        />
        <div class="blog-gallery-teaser-content">
          <h3 class="blog-gallery-teaser-title">{{ post.title }}</h3>
          <p class="blog-gallery-teaser-date">{{ post.date }}</p>
        </div>
      </a>
    </div>
  </section>
</template>


<style scoped>
.blog-gallery-teaser {
  padding: 2rem 0;
}

.blog-gallery-teaser-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, max-content));
  gap: 1.5rem;
  justify-content: center;
}

.blog-gallery-teaser-tile {
  width: 380px;
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--vp-c-bg);
  border-radius: 12px;
  overflow: hidden;
  text-decoration: none;
  border: 1px solid #e5e7eb; /* Match landing-tile border */
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06); /* Match landing-tile shadow */
  transition: transform 0.3s ease, box-shadow 0.3s ease; /* Match hover transition */
}

.blog-gallery-teaser-tile:hover {
  transform: translateY(-6px); /* Match landing-tile hover lift */
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1); /* Match landing-tile hover shadow */
}

.blog-gallery-teaser-image {
  width: 100%;
  height: auto;
  object-fit: cover;
  display: block;
}

.blog-gallery-teaser-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
}

.blog-gallery-teaser-title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-1);
}

.blog-gallery-teaser-date {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  margin-top: auto;
}


</style>

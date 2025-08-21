<script setup lang="ts">
import { computed } from 'vue'
import { data as posts } from '../../data/blog.data'
import VPHome from 'vitepress/dist/client/theme-default/components/VPHome.vue'

function getQueryParam(param: string): string | null {
  const params = new URLSearchParams(window.location.search)
  return params.get(param)
}

const tag = getQueryParam('tag')

const filteredPosts = computed(() => {
  if (!tag) return posts
  return posts.filter(post => post.tags?.includes(tag))
})

// Get all unique tags from posts
const allTags = computed(() => {
  const tagSet = new Set<string>()
  posts.forEach(post => {
    post.tags?.forEach(t => tagSet.add(t))
  })
  return Array.from(tagSet)
})

function reloadPage(event: MouseEvent) {
  event.preventDefault()
  const target = event.currentTarget as HTMLAnchorElement
  window.location.href = target.href
}

console.log(posts);


</script>

<template>
  <div class="blog-page-wrapper">
    <VPHome>
      <template #home-hero-after>
        <div class="blog-content">

<div class="tag-list">
  <strong>Browse by tag:</strong>
  <ul class="tag-list__items">
    <li v-for="t in allTags" :key="t" class="tag-list__item">
      <a :href="`/blog?tag=${t}`" @click="reloadPage">{{ t }}</a>
    </li>
    <li v-if="tag" class="tag-list__item reset-tag">
      <a href="/blog" @click="reloadPage">Reset Tags</a>
    </li>
  </ul>
</div>



          <section class="entries-section">
            <ul class="post-list">
              <li v-for="post in filteredPosts" :key="post.url" class="post-archive__item">
                <div class="post-archive__image-wrapper">
                  <a :href="post.url" class="post-archive__link" :title="post.title">
                    <img
                      v-if="post.banner"
                      :src="post.banner"
                      :alt="post.title"
                      class="post-archive__image"
                      loading="lazy"
                      decoding="async"
                    />
                  </a>
                </div>
                <div class="post-archive__text-wrapper">
                  <span v-if="post.category">
                    <a class="author-category has-larger-style" :title="`See ${post.category} posts`" :href="`/blog?category=${post.category}`">
                      {{ post.category }} Post
                    </a>
                  </span>
                  <span class="post-archive__title">
                    <a :href="post.url" :title="post.title">{{ post.title }}</a>
                  </span>

                  <div v-if="post.excerpt" class="post-archive__excerpt">
                    {{ post.excerpt }}
                  </div>
                  <div v-if="post.tags" class="post-tags">
                    <span v-for="tag in post.tags" :key="tag" class="tag">
                      <a :href="`/blog?tag=${tag}`" @click="reloadPage">{{ tag }}</a>

                    </span>
                  </div>

                  <span class="post-archive__item_date">
                    {{ post.date }}<span v-if="post.authors && post.authors.length" class="post-authors">
                      | <span v-for="(author, index) in post.authors" :key="author">
                        {{ author }}<span v-if="index < post.authors.length - 1">, </span>
                      </span>
                    </span>
                  </span>
                </div>
              </li>
            </ul>
          </section>
        </div>
      </template>
    </VPHome>
  </div>
</template>

<style scoped>

.reset-tag a {
  background-color: #ffecec;
  color: #c00;
  font-weight: bold;
}
.reset-tag a:hover {
  background-color: #ffd6d6;
}


.tag-list {
  margin-bottom: 1.5rem;
}

.tag-list__items {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  list-style: none;
  padding: 0;
  margin: 0.5rem 0 0;
}

.tag-list__item a {
  padding: 0.4em 0.8em;
  background-color: #f3f3f3;
  border-radius: 4px;
  text-decoration: none;
  font-size: 0.9rem;
  color: #333;
  transition: background-color 0.2s ease;
}

.tag-list__item a:hover {
  background-color: #e0e0e0;
}


.post-tags {
  margin-top: 0.5rem;
}

.tag a {
  background-color: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  padding: 0.25rem 0rem;
  border-radius: 999px;
  font-size: 0.75rem;
  text-decoration: none;
  margin-right: 0.5rem;
}

/* --- Global Layout & Tile Styling --- */
.post-list {
  list-style: none;
  padding: 0;
  margin: 2rem 0;
}

.post-archive__item {
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
  margin-bottom: 2rem;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  padding: 1rem;
  width: 100%;
}

.post-archive__image-wrapper {
  flex: 0 0 388px;
  max-width: 388px;
}

.post-archive__image {
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 4px;
  display: block;
}

.post-archive__text-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.author-category {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--vp-c-brand);
  text-decoration: none;
  margin-bottom: 0.5rem;
  display: inline-block;
}

.post-archive__title a {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  text-decoration: none;
}

.post-archive__excerpt {
  font-size: 1rem;
  color: var(--vp-c-text-1);
  margin: 0.75rem 0;
}

.post-archive__item_date {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
}

/* --- Page Layout Constraints --- */
.blog-page-wrapper ::v-deep(.VPHomeHero .name),
.blog-page-wrapper ::v-deep(.VPHomeHero .text) {
  padding: 0 32px;
}

.blog-page-wrapper ::v-deep(.VPHomeHero .name) {
  font-size: 3rem;
  color: pink;
  margin-bottom: 3.5rem;
}

.blog-page-wrapper ::v-deep(.VPHomeHero .text) {
  font-size: 2rem;
  line-height: 1.4;
  max-width: 800px;
  font-weight: normal;
  margin-top: 0;
}

.blog-page-wrapper ::v-deep(.VPHomeHero) {
  margin-bottom: 0rem;
}

.blog-page-wrapper ::v-deep(.VPHome .content) {
  margin-top: 0 !important;
}

.blog-content {
  max-width: 1150px;
  margin: 0 auto;
  padding: 0 32px;
}

.entries-heading {
  font-size: 2rem;
  font-weight: bold;
  margin-top: 3rem;
  margin-bottom: 1rem;
  text-align: center;
  color: var(--vp-c-brand);
}

.entries-section {
  margin-top: 2rem;
}

.post-archive__item:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.2s ease;
}


@media (max-width: 700px) {
  .post-archive__item {
    flex-direction: column;
    padding: 0;
    gap: 0;
    margin-bottom: 1rem; /* Optional: reduce spacing between items */
  }

  .post-archive__image-wrapper {
    flex: 0 0 0;
    width: 100vw;
    max-width: 100%;
    margin-bottom: 0rem; /* Reduced vertical space below image */
  }

  .post-archive__image {
    width: 100vw;
    height: auto;
    border-radius: 0;
  }

  .post-archive__text-wrapper {
    padding: 1rem 32px;
  }

  @media (max-width: 700px) {
  .post-archive__excerpt {
    display: none;
  }
}

}



</style>



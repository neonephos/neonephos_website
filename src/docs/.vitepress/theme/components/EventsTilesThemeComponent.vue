<script setup lang="ts">
import { ref } from 'vue'
import { data as rawPosts } from '../../data/events.data'
import { resolveSrc, resolveLink } from '../utils'


const now = new Date()
const posts = rawPosts.filter(post => {

var temp= new Date(post.date);
temp= temp.setDate(temp.getDate()+1);
 return temp>= now;
 }
 )

const currentIndex = ref(0)

function nextImage() {
  currentIndex.value = (currentIndex.value + 1) % posts.length
}

function prevImage() {
  currentIndex.value = (currentIndex.value - 1 + posts.length) % posts.length
}
</script>

<template>
  <div class="events-gallery">
    <div class="events-gallery__wrapper">
      <a :href="resolveLink(posts[currentIndex].url)" class="events-gallery__link">
        <picture>
          <source
            media="(max-width: 500px)"
            :srcset="resolveSrc(posts[currentIndex].bannerMobile)"
          />
          <img
            class="events-gallery__image"
            :src="resolveSrc(posts[currentIndex].banner)"
            alt=""
          />
        </picture>
      </a>
      <button class="events-gallery__arrow left" @click="prevImage">&#10094;</button>
      <button class="events-gallery__arrow right" @click="nextImage">&#10095;</button>
    </div>
  </div>
</template>

<style scoped>
.events-gallery {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto 4rem;
  position: relative;
}

.events-gallery__wrapper {
  position: relative;
  aspect-ratio: 20 / 7; /* Desktop default */
  overflow: hidden;
}

@media (max-width: 500px) {
  .events-gallery__wrapper {
    padding: 0 1em;
    aspect-ratio: 9 / 11; /* Mobile format */
  }
}

.events-gallery__link {
  display: block;
  position: relative;
  width: 100%;
  height: 100%;
}

.events-gallery__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.events-gallery__arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 2rem;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  z-index: 2;
  border-radius: 4px;
}

.events-gallery__arrow:hover {
  background-color: rgba(0, 0, 0, 0.7);
}

.events-gallery__arrow.left {
  left: 1rem;
}

.events-gallery__arrow.right {
  right: 1rem;
}

</style>

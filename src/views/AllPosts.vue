<template>
  <div class="wrapper">
    <div class="photo-grid" v-if="blogStore.blogsLoaded">
      <BlogCard
        v-for="blog in blogStore.blogs"
        :key="blog.title"
        :blog="blog"
      />
    </div>
  </div>
</template>

<script setup>
import { useBlogStore } from "@/stores/BlogStore";
import BlogCard from "../components/BlogCard.vue";
const blogStore = useBlogStore();
</script>

<style scoped>
.photo-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-auto-rows: 240px;
  grid-auto-flow: dense;
}
.wrapper {
  padding: 2rem;
  margin: 3rem auto 0 auto;
  max-width: 1000px;
}
</style>

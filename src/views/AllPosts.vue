<template>
  <div class="wrapper">
    <div class="photo-grid" v-if="blogStore.blogsLoaded">
      <div
        class="card"
        v-for="blog in blogStore.blogs"
        @click="handleClick(blog.title)"
        :class="blog.photoSize"
        :key="blog.id"
        :style="`background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${blog.coverPhoto}); 
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;`"
      >
        <h2 class="title">{{ blog.title }}</h2>
        <p class="subtitle">{{ blog.date }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useBlogStore } from "@/stores/BlogStore";
import { useRouter } from "vue-router";
import { toKebabCase } from "../composables/helpers"

const blogStore = useBlogStore();
const router = useRouter();

function handleClick(title) {
  router.push('/blogs/' + toKebabCase(title))
}
</script>

<style scoped>
.photo-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-auto-rows: 240px;
  grid-auto-flow: dense;
}
.card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #353535;
  font-size: 3rem;
  color: #fff;
  box-shadow: rgba(3, 8, 20, 0.1) 0px 0.15rem 0.5rem,
    rgba(2, 8, 20, 0.1) 0px 0.075rem 0.175rem;
  height: 100%;
  width: 100%;
  border-radius: 8px;
  transition: all 500ms;
  overflow: hidden;
  padding: 0.5rem;
}
.card:hover {
  box-shadow: rgba(2, 8, 20, 0.1) 0px 0.35em 1.175em,
    rgba(2, 8, 20, 0.08) 0px 0.175em 0.5em;
  transform: translateY(-3px) scale(1.02);
}
@media (min-width: 600px) {
  .card-tall {
    grid-row: span 2 / auto;
  }
  .card-wide {
    grid-column: span 2 / auto;
  }
  .card-small {
    grid-column: span 1 / auto;
  }
  .card-large {
    grid-row: span 2 / auto;
    grid-column: span 2 / auto;
  }
}

.wrapper {
  padding: 2rem;
  margin: 3rem auto 0 auto;
  max-width: 1000px;
}
.card {
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  margin: 0 auto;
  text-align: center;
}
.card .title {
  margin: 0;
  font-size: 1.75rem;
  font-weight: 800;
}
.card .subtitle {
  margin: 0;
  font-style: italic;
  font-size: 1rem;
}
</style>

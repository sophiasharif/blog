<template>
  <div class="wrapper" v-if="blogStore.blogsLoaded">
    <div class="introduction">
      <h1 id="title">{{ currentBlog.title }}</h1>
      <p id="subtitle">{{ currentBlog.subtitle }}</p>
    </div>
    <div class="photo-container">
        <img :src="currentBlog.coverPhoto" />
    </div>
    <div class="description">
      <p id="description">{{ currentBlog.description }}</p>
    </div>
    <article v-html="currentBlog.content" class="post-content"></article>
  </div>
  <div v-else>
        <LoadingSign/>
    </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { useBlogStore } from "../stores/BlogStore";
import LoadingSign from "../components/LoadingSign.vue"
import { useRoute } from "vue-router";
import {toTitleCase} from "../composables/helpers"

const blogStore = useBlogStore();
let currentBlog = ref();

const route = useRoute()
const blogTitle = toTitleCase(route.params.title)


async function getCurrentBlog() {
    if (!blogStore.blogsLoaded) {
        await blogStore.getBlogs();
    }
    currentBlog.value = blogStore.blogs.filter(blog => {
        return blog.title == blogTitle;
    })[0]
}
getCurrentBlog()

</script>

<style scoped>
.wrapper {
  max-width: 750px;
  margin: 0 auto;
  padding-top: 3rem;
}
.introduction {
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
}
.photo-container {
  display: flex;
  justify-content: center;
}
.photo-container img {
  max-width: 100%;
  max-height: 600px;
  padding: 0 40px;
  object-fit: contain;
  margin: 0 auto;
}

h1#title {
  text-decoration: underline;
  text-decoration-color: var(--accent);
  font-size: 3rem;
  margin-bottom: 0;
}
p#subtitle {
  padding-left: 1rem;
  font-size: 1.25rem;
  margin-top: 4px;
  font-style: italic;
}
.description {
  display: flex;
  justify-content: center;
  padding: 0 40px;
}
p#description {
  border-left: 3px var(--accent) solid;
  padding-left: 1rem;
  font-size: 1.25rem;
}
article {
  padding: 0 2rem;
}
@media (max-width: 550px) {
  .photo-container img {
  padding: 0;
}
.wrapper {
  padding-top: .5rem;
}
p#description {
  font-size: 1.15rem;
}
article {
  padding: 0 1.5rem;
}
}
</style>

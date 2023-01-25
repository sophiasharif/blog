<template>
  <div class="wrapper">
    <div class="introduction">
      <h1 id="title">{{ blogStore.title }}</h1>
      <p id="subtitle">{{ blogStore.subtitle }}</p>
    </div>
    <div class="photo-container">
        <img :src="blogStore.coverPhotoURL" />
    </div>
    <div class="description">
      <p id="description">{{ blogStore.description }}</p>
    </div>
    <article v-html="blogStore.content" class="post-content"></article>
  </div>
</template>

<script>
import { useBlogStore } from "../stores/BlogStore";
export default {
  data() {
    return {
      blogStore: useBlogStore(),
    };
  },
};
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
</style>

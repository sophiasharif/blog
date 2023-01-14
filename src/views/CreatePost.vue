<template>
  <h2>let's create a post shall we</h2>
  <input type="text" placeholder="Title" v-model="blogTitle" />
  <input type="text" placeholder="Subtitle" v-model="blogSubtitle" />
  <button @click="addBlog">Publish Blog</button>
</template>

<script>
import { db } from "../firebase/config";
import { collection, addDoc } from "firebase/firestore";
export default {
  data() {
    return {
        blogTitle: "",
        blogSubtitle: "",
    };
  },
  methods: {
    addBlog() {
      const col = collection(db, "blogs");
      addDoc(col, { title: this.blogTitle, subtitle: this.blogSubtitle });
    },
  },
};
</script>

<style></style>
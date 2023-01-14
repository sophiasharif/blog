<template>
  welcome to the blog
  <div class="blog" v-for="blog in blogs" :key="blog.id">
    <h1>{{ blog.title }}</h1>
    <h4>{{ blog.subtitle }}</h4>
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { db } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";
let blogs = ref([
  { title: "sophia", subtitle: "sharif", id: 1 },
  { title: "nadia", subtitle: "sharif", id: 2 },
]);
const colRef = collection(db, "blogs");
blogs = ref([]);
async function getBlogs() {
  try {
    const snap = await getDocs(colRef);
    let docs = [];
    snap.docs.forEach((doc) => {
      docs.push({ ...doc.data(), id: doc.id });
    });
    blogs.value = docs;
  } catch (e) {
    console.log("ERROR: ", e);
  }
}
getBlogs();
</script>

<style scoped>
.blog {
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  width: 60%;
  margin: 0 auto;
}
</style>

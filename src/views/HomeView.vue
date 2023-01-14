<template>
  welcome to the blog
  <div class="blog" v-for="blog in blogs" :key="blog.id">
    <h1>{{ blog.title }}</h1>
    <h4>{{ blog.subtitle }}</h4>
    <p>{{ blog.date }}</p>
    <div v-if="blog.content" v-html="blog.content"></div>
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { db } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import toDateTime from "../composables/toDateTime";

let blogs = ref([]);
const colRef = collection(db, "blogs");
blogs = ref([]);
async function getBlogs() {
  try {
    const snap = await getDocs(colRef);
    let docs = [];
    snap.docs.forEach((doc) => {
      docs.push({
        id: doc.id,
        title: doc.data().title,
        subtitle: doc.data().subtitle,
        content: doc.data().content,
        date: toDateTime(doc.data().date.seconds),
      });
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

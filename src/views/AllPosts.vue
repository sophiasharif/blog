<template>
<div class="wrapper">
  <h1>Sophia Sharif</h1>
  <div class="line"></div>
  <div class="blog" v-for="blog in blogs" :key="blog.id">
    <p>{{ blog.date }}</p>
    <h2>{{ blog.title }}</h2>
    <h4>{{ blog.subtitle }}</h4>
    <div v-if="blog.content" v-html="blog.content"></div>
    <div class="line"></div>
  </div>
</div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { db } from "../firebase/config";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import toDateTime from "../composables/toDateTime";

let blogs = ref([]);
let colRef = collection(db, "blogs");
colRef = query(colRef, orderBy("date", "desc"))
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
h1 {
  text-align: left;
  margin-bottom: 3rem;
}
.wrapper {
  padding: 2rem;
  margin: 3rem auto 0 auto;
  max-width: 600px;
}
.blog {
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  margin: 0 auto;
}
.blog p {
  color: var(--gray-light);
  font-style: italic;
  margin-bottom: .5rem;
  font-size: 1rem;
}
.blog h2 {
  margin: .5rem 0;
  font-size: 2rem;
  font-weight: 500;
}
.blog h4 {
  font-weight: 300;
  font-style: italic;
  margin-top: .5rem;
}
.line {
  height: 1px;
  background: var(--gray-light);
}
</style>

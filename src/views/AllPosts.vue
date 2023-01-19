<template>
  <div class="wrapper">
    <div class="photo-grid">
      <div
        class="card"
        v-for="blog in blogs"
        :class="blog.photoSize"
        :key="blog.id"
        :style="`background: url(${blog.coverPhoto}); 
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;`"
      >
        <!-- <p>{{ blog.date }}</p>
        <h2>{{ blog.title }}</h2>
        <h4>{{ blog.subtitle }}</h4> -->
      </div>
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
colRef = query(colRef, orderBy("date", "desc"));
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
        coverPhoto: doc.data().coverPhoto,
        photoSize: doc.data().photoSize
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
  justify-content: flex-start;
  align-items: left;
  background: #353535;
  font-size: 3rem;
  color: #fff;
  box-shadow: rgba(3, 8, 20, 0.1) 0px 0.15rem 0.5rem,
    rgba(2, 8, 20, 0.1) 0px 0.075rem 0.175rem;
  height: 100%;
  width: 100%;
  border-radius: 4px;
  transition: all 500ms;
  overflow: hidden;
}
.card:hover {
  box-shadow: rgba(2, 8, 20, 0.1) 0px 0.35em 1.175em,
    rgba(2, 8, 20, 0.08) 0px 0.175em 0.5em;
  transform: translateY(-3px) scale(1.02);
}
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
.wrapper {
  padding: 2rem;
  margin: 3rem auto 0 auto;
  max-width: 1000px;
}
.card {
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  margin: 0 auto;
}
.card p {
  color: var(--gray-light);
  font-style: italic;
  margin-bottom: 0.5rem;
  font-size: 1rem;
}
.card h2 {
  margin: 0.5rem 0;
  font-size: 1rem;
  font-weight: 500;
}
.card h4 {
  font-weight: 300;
  font-style: italic;
  margin-top: 0.5rem;
  font-size: 1rem;
}
</style>

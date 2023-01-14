<template>
  <h2>let's create a post shall we</h2>
  <input type="text" placeholder="Title" v-model="blogTitle" />
  <input type="text" placeholder="Subtitle" v-model="blogSubtitle" />
  <div id="editor">
    <p>This is some text: {{ blogContent }}</p>
    <QuillEditor
      theme="snow"
      toolbar="full"
      ref="editor"
      contentType="html"
      v-model:content="blogContent"
    />
  </div>
  <button @click="addBlog">Publish Blog</button>
</template>

<script>
import { db } from "../firebase/config";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

export default {
  components: {
    QuillEditor,
  },
  data() {
    return {
      blogTitle: "",
      blogSubtitle: "",
      blogContent: "",
    };
  },
  methods: {
    addBlog() {
      const col = collection(db, "blogs");
      addDoc(col, {
        title: this.blogTitle,
        subtitle: this.blogSubtitle,
        content: this.blogContent,
        date: Timestamp.now(),
      });
    },
  },
};
</script>

<style></style>

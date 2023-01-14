<template>
  <div>
    <div class="error-message" v-if="!error">
      <p><span class="error">Error: </span> {{ errorMessage }}</p>
    </div>
    <div class="blog-info">
      <input type="text" placeholder="Title" v-model="blogTitle" />
      <input type="text" placeholder="Subtitle" v-model="blogSubtitle" />
      <div class="upload-file">
        <label for="blog-photo">Upload Cover Photo</label>
        <input type="file" ref="blogPhoto" id="blog-photo" accept=".png, .jpg, .jpeg"> 
        <button class="preview">Preview Photo</button> 
      </div>
      <div id="editor">
        <QuillEditor
          theme="snow"
          toolbar="full"
          ref="editor"
          contentType="html"
          v-model:content="blogContent"
        />
      </div>
      <button @click="addBlog">Publish Blog</button>
    </div>
  </div>
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
      error: false,
      errorMessage: "",
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

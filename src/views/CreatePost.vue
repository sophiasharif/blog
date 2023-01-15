<template>
  <div>
    <div class="error-message" v-if="error">
      <p><span class="error">Error: </span> {{ errorMessage }}</p>
    </div>
    <div class="blog-info">
      <input type="text" placeholder="Title" v-model="blogStore.title" />
      <input type="text" placeholder="Subtitle" v-model="blogStore.subtitle" />
      <div class="upload-file">
        <label for="blog-photo">Upload Cover Photo</label>
        <input
          type="file"
          ref="blogPhoto"
          id="blog-photo"
          accept=".png, .jpg, .jpeg"
          @change="fileChange"
        />
        <button class="preview" @click="enablePreview">Preview Photo</button>
        <BlogPhotoPreview v-if="blogStore.previewEnabled" />
      </div>
      <div id="editor">
        <QuillEditor
          theme="snow"
          toolbar="full"
          ref="editor"
          contentType="html"
          v-model:content="blogStore.content"
        />
      </div>
      <button @click="addBlog">Publish Blog</button>
    </div>
  </div>
</template>

<script>
// Firebase
import { db } from "../firebase/config";
import { collection, addDoc, Timestamp } from "firebase/firestore";
// Quill
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
// Pinia
import { useBlogStore } from "../stores/BlogStore";
// Components
import BlogPhotoPreview from "../components/BlogPhotoPreview.vue";

export default {
  components: {
    QuillEditor,
    BlogPhotoPreview,
  },
  data() {
    return {
      file: null,
      blogStore: useBlogStore(),
      error: false,
      errorMessage: "",
    };
  },
  methods: {
    addBlog() {
      const col = collection(db, "blogs");
      addDoc(col, {
        title: this.blogStore.title,
        subtitle: this.blogStore.subtitle,
        content: this.blogStore.content,
        date: Timestamp.now(),
      });
    },
    fileChange() {
      this.file = this.$refs.blogPhoto.files[0];
      this.blogStore.coverPhotoName = this.file.name;
      this.blogStore.coverPhotoURL = URL.createObjectURL(this.file);
      console.log(this.blogStore.coverPhotoName);
      console.log(this.blogStore.coverPhotoURL);
    },
    enablePreview() {
      this.blogStore.previewEnabled = true;
    },
  },
};
</script>

<style></style>

<template>
  <div>
    <!-- conditional components -->
    <BlogPhotoPreview v-if="blogStore.previewEnabled" />
    <LoadingSign v-if="loading" />
    <!--  post component -->
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
import { db, storage } from "../firebase/config";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// Quill
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
// Pinia
import { useBlogStore } from "../stores/BlogStore";
// Components
import BlogPhotoPreview from "../components/BlogPhotoPreview.vue";
import LoadingSign from "../components/LoadingSign.vue";

export default {
  components: {
    QuillEditor,
    BlogPhotoPreview,
    LoadingSign,
  },
  data() {
    return {
      file: null,
      blogStore: useBlogStore(),
      error: false,
      errorMessage: "",
      loading: false,
    };
  },
  methods: {
    addBlog() {
      // check content is filled out
      if (
        this.blogStore.title.length === 0 ||
        this.blogStore.subtitle.length === 0 ||
        this.blogStore.content.length === 0
      ) {
        this.error = true;
        this.errorMessage =
          "Please make sure the blog title, subtitle, and content have been filled out!";
        setTimeout(() => {
          this.error = false;
        }, 10000);
        return;
      }
      // check cover photo is uploaded
      if (!this.file) {
        this.error = true;
        this.errorMessage = "Please add a cover photo!";
        setTimeout(() => {
          this.error = false;
        }, 5000);
        return;
      }
      this.uploadBlogInfo()
    },
    async uploadBlogInfo() {
      
      this.loading = true;
      const col = collection(db, "blogs");
      const imageRef = ref(storage, `images/${this.blogStore.coverPhotoName}`);
      
      // upload cover image to storage
      await uploadBytes(imageRef, this.file);
      
      // upload text to firestore
      const downloadURL = await getDownloadURL(imageRef)
      await addDoc(col, {
        title: this.blogStore.title,
        subtitle: this.blogStore.subtitle,
        content: this.blogStore.content,
        date: Timestamp.now(),
        coverPhoto: downloadURL
      })

      // send to home screen
      this.$router.push("/");
      
    },
    fileChange() {
      this.file = this.$refs.blogPhoto.files[0];
      this.blogStore.coverPhotoName = this.file.name;
      this.blogStore.coverPhotoURL = URL.createObjectURL(this.file);
    },
    enablePreview() {
      this.blogStore.previewEnabled = true;
    },
  },
};
</script>

<style></style>

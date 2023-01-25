<template>
  <BlogPhotoPreview v-if="blogStore.previewEnabled" />
  <LoadingSign v-if="loading" />
  <div class="wrapper">
    <h1>Create Post</h1>
    <!-- conditional components -->
    <div class="error-message" v-if="error">
      <p><span class="error">Error: </span> {{ errorMessage }}</p>
    </div>
    <!--  post component -->
    <div class="blog-info">
      <div class="col col-1">
        <input
          id="title-input"
          type="text"
          placeholder="Title"
          v-model="blogStore.title"
        />
        <input
          id="subtitle-input"
          type="text"
          placeholder="Subtitle"
          v-model="blogStore.subtitle"
        />
      </div>
      <div class="col col-2">
        <textarea
          id="description-input"
          type="text"
          placeholder="Description"
          v-model="blogStore.description"
        />
      </div>
      <div class="col col-3">
        <label for="blog-photo"><em>Upload Cover Photo</em></label>

        <div id="photo-size">
          <label for="photo-size">Photo Size:</label>
          <select name="cars" id="cars" v-model="blogStore.photoSize">
            <option value="card-small">Small</option>
            <option value="card-wide">Wide</option>
            <option value="card-tall">Tall</option>
            <option value="card-large">Large</option>
          </select>
        </div>
        <input
          type="file"
          ref="blogPhoto"
          id="blog-photo"
          accept=".png, .jpg, .jpeg"
          @change="fileChange"
        />

        <button
          class="preview"
          @click="enablePreview"
          :disabled="
            this.blogStore.coverPhotoURL.length == 0 ||
            this.blogStore.photoSize.length == 0
          "
        >
          Preview Photo
        </button>
      </div>
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
    <div class="button-wrapper">
      <button @click="addBlog" id="publish-button">Publish Blog</button>
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
        this.blogStore.description.length === 0 ||
        this.blogStore.content.length === 0
      ) {
        this.error = true;
        this.errorMessage =
          "Please make sure the blog title, subtitle, description, and content have been filled out!";
        setTimeout(() => {
          this.error = false;
        }, 10000);
        return;
      }
      if (this.blogStore.photoSize.length === 0) {
        this.error = true;
        this.errorMessage = "Please choose a size for the photo!";
        setTimeout(() => {
          this.error = false;
        }, 10000);
        return;
      }
      // check cover photo is uploaded
      if (!this.blogStore.coverPhotoURL) {
        this.error = true;
        this.errorMessage = "Please add a cover photo!";
        setTimeout(() => {
          this.error = false;
        }, 5000);
        return;
      }
      this.uploadBlogInfo();
    },
    async uploadBlogInfo() {
      this.loading = true;
      const col = collection(db, "blogs");
      const imageRef = ref(storage, `images/${this.blogStore.coverPhotoName}`);

      // upload cover image to storage, get URL
      await uploadBytes(imageRef, this.blogStore.file);
      const downloadURL = await getDownloadURL(imageRef);

      // upload doc
      await addDoc(col, {
        title: this.blogStore.title,
        subtitle: this.blogStore.subtitle,
        description: this.blogStore.description,
        content: this.blogStore.content,
        date: Timestamp.now(),
        coverPhoto: downloadURL,
        photoSize: this.blogStore.photoSize,
      });

      // reset blogStore
      this.blogStore.title = "";
      this.blogStore.subtitle = "";
      this.blogStore.description = "";
      this.blogStore.content = "";
      this.blogStore.file = null;
      this.blogStore.coverPhotoName = "";
      this.blogStore.coverPhotoURL = "";
      this.blogStore.photoSize = "";
      this.blogStore.previewEnabled = false;

      // reroute to home
      this.$router.push("/");
    },
    fileChange() {
      this.blogStore.file = this.$refs.blogPhoto.files[0];
      this.blogStore.coverPhotoName = this.blogStore.file.name;
      this.blogStore.coverPhotoURL = URL.createObjectURL(this.blogStore.file);
    },
    enablePreview() {
      this.blogStore.previewEnabled = true;
    },
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
  text-decoration: underline;
  text-decoration-color: var(--accent);
}
.wrapper {
  width: 80%;
  margin: 6rem auto 0 auto;
}
.blog-info {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  gap: 0.5rem;
  height: 120px;
  margin-bottom: 1.5rem;
}
.col {
  display: grid;
  gap: 0.5rem;
}
.col-1 {
  grid-template-rows: 3fr 2fr;
}
.col-3 {
  gap: 0.25rem;
  grid-template-rows: repeat(4, 1fr);
  justify-content: center;
}
.col-1 input,
.col-2 textarea {
  background: var(--black);
  border: 1px solid var(--white);
  color: white;
  padding-left: 1rem;
}
input,
textarea {
  font-family: Georgia, "Times New Roman", Times, serif;
}
.col-2 textarea {
  padding: 1rem;
}
#title-input {
  font-size: 1.5rem;
  font-weight: 800;
}
#subtitle-input {
  font-size: 1rem;
}
select {
  margin-left: 1rem;
}
.button-wrapper {
  display: grid;
  place-items: center;
  margin-top: 1rem;
}
#publish-button {
  border: 3px solid var(--accent);
  background: rgba(255, 165, 0, .4);
  color: var(--white);
  padding: 1rem;
  border-radius: 10px;
  font-size: 1rem;
}
.error-message p {
  border: 1px solid #e84e4f;
  background: #9c2b2e;
  padding: .75rem;
  border-radius: 8px;
}
.error-message .error {
  font-weight: 600;
}
</style>

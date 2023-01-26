import { defineStore } from "pinia";
import { db } from "../firebase/config";
import {
  collection,
  getDocs,
  query,
  orderBy,
  deleteDoc,
  doc,
  updateDoc
} from "firebase/firestore";
import { toDateTime } from "../composables/helpers";

export const useBlogStore = defineStore("blogStore", {
  state: () => ({
    title: "",
    subtitle: "",
    description: "",
    content: "",
    file: null,
    coverPhotoName: "",
    coverPhotoURL: "",
    photoSize: "",
    previewEnabled: false,
    blogs: [],
    blogsLoaded: false,
    editEnabled: false,
  }),
  actions: {
    async getBlogs() {
      let colRef = collection(db, "blogs");
      colRef = query(colRef, orderBy("date", "desc"));

      try {
        const snap = await getDocs(colRef);
        snap.docs.forEach((doc) => {
          this.blogs.push({
            id: doc.id,
            title: doc.data().title,
            subtitle: doc.data().subtitle,
            description: doc.data().description,
            content: doc.data().content,
            date: toDateTime(doc.data().date.seconds),
            coverPhoto: doc.data().coverPhoto,
            coverPhotoName: doc.data().coverPhotoName,
            photoSize: doc.data().photoSize,
          });
        });
        this.blogsLoaded = true;
      } catch (e) {
        console.log("ERROR: ", e);
      }
    },
    async deletePost(id) {
      const docRef = doc(db, "blogs", id);
      await deleteDoc(docRef);
    },
    setBlogState(blog) {
      this.title = blog.title;
      this.subtitle = blog.subtitle;
      this.description = blog.description;
      this.content = blog.content;
      this.coverPhotoURL = blog.coverPhoto;
      this.coverPhotoName = blog.coverPhotoName;
      this.photoSize = blog.photoSize;
    },
    async updateBlog(id) {
      const docRef = doc(db, "blogs", id);

      await updateDoc(docRef, {
        title: this.title,
        subtitle: this.subtitle,
        description: this.description,
        content: this.content,
        photoSize: this.photoSize,
      })
    },
    reset() {
      this.title = "";
      this.subtitle = "";
      this.description = "";
      this.content = "";
      this.file = null;
      this.coverPhotoName = "";
      this.coverPhotoURL = "";
      this.photoSize = "";
      this.previewEnabled = false;
    }
  },
});

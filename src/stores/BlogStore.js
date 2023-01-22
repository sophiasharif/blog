import { defineStore } from "pinia";
import { db } from "../firebase/config";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import toDateTime from "../composables/toDateTime";

export const useBlogStore = defineStore("blogStore", {
  state: () => ({
    title: "",
    subtitle: "",
    description: "",
    content: "",
    coverPhotoName: "",
    coverPhotoURL: "",
    photoSize: "",
    previewEnabled: false,
    blogs: []
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
              photoSize: doc.data().photoSize,
            });
          });
          console.log(this.blogs)
        } catch (e) {
          console.log("ERROR: ", e);
        }
    },
  },
});

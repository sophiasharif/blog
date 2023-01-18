import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

// firebase imports
import { auth } from "./firebase/config";
import { onAuthStateChanged } from "firebase/auth";

let app;

onAuthStateChanged(auth, () => {
  if (!app) {
    app = createApp(App).use(createPinia()).use(router).mount("#app");
  }
});

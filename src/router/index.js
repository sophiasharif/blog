import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CreatePost from "../views/CreatePost.vue";
import PostPreview from "../views/PostPreview.vue";
import AllPosts from "../views/AllPosts.vue";
import LoginView from "../views/LoginView.vue";
import ViewPost from "../views/ViewPost.vue";

// firebase imports
import { auth } from "../firebase/config";

function requireAuth(to, from, next) {
  let user = auth.currentUser;
  if (!user) {
    next({ name: "Login" });
  } else {
    next();
  }
}

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/create-post",
    name: "CreatePost",
    component: CreatePost,
    beforeEnter: requireAuth,
  },
  {
    path: "/post-preview",
    name: "PostPreview",
    component: PostPreview,
    beforeEnter: requireAuth,
  },
  {
    path: "/all-posts",
    name: "AllPosts",
    component: AllPosts,
  },
  {
    path: "/login",
    name: "Login",
    component: LoginView,
  },
  {
    path: "/blogs/:title",
    name: "ViewPost",
    component: ViewPost,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
});

export default router;

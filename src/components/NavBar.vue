<template>
  <nav>
    <div>
      <router-link to="/">Home</router-link>
      <router-link to="/all-posts">All Posts</router-link>
    </div>

    <!-- for logged in users -->
    <div v-if="user" class="admin-controls">
      <router-link to="/create-post">Create Post</router-link>
      <router-link to="/post-preview">Post Preview</router-link>
      <span id="logout" @click="logout">Log Out</span>
      <input type="checkbox" v-model="blogStore.editEnabled" v-if="$route.name == 'AllPosts'"/>
    </div>
  </nav>
</template>

<script setup>
import getUser from "../composables/getUser";
import { useRouter } from "vue-router";

// firebase imports
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";
import { useBlogStore } from "@/stores/BlogStore";

const router = useRouter();
const blogStore = useBlogStore();
const { user } = getUser();

function logout() {
  signOut(auth).then(() => {
    router.push({ name: "Home" });
  });
}
</script>

<style scoped>
nav {
  z-index: 10;
  padding: 30px;
  position: fixed;
  top: 0;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}
.admin-controls {
  display: flex;
  align-items: center;
  justify-content: center;
}
nav a, span#logout {
  font-weight: bold;
  color: #2c3e50;
  margin: 0 1rem;
}
span#logout {
  font-weight: bold;
  text-decoration: underline;
}
nav a.router-link-exact-active {
  color: #42b983;
}
button {
  background-color: var(--cream);
  border: none;
  font: inherit;
  padding: 0.7rem 1rem;
  border-radius: 1rem;
  font-size: 1rem;
}
input[type="checkbox"] {
  position: relative;
  border: none;
  -webkit-appearance: none;
  background: var(--cream);
  outline: none;
  width: 80px;
  height: 30px;
  border-radius: 20px;
  margin: 0 1rem;
  /* box shadow */
}
input[type="checkbox"]::before {
  content: "";
  position: absolute;
  width: 30px;
  height: 30px;
  border-radius: 20px;
  top: 0;
  left: 0;
  background: #303030;
  transform: scale(1.1);
  transition: 750ms ease all;
  /* box shadow */
}
input:checked[type="checkbox"]:before {
  background: var(--cream);
  left: 52px;
}
</style>

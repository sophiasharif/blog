<template>
  <nav>
    <div v-if="$route.name == 'AllPosts'">
      <router-link to="/">Home</router-link>
      <router-link to="/all-posts">All Posts</router-link>
    </div>

    <!-- for logged in users -->
    <div v-if="user">
      <router-link to="/create-post">Create Post</router-link>
      <router-link to="/post-preview">Post Preview</router-link>
      <button @click="logout">log out</button>
    </div>
  </nav>
</template>

<script setup>
import getUser from "../composables/getUser";
import { useRouter } from "vue-router";

// firebase imports
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";

const router = useRouter();
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
}
nav a {
  font-weight: bold;
  color: #2c3e50;
  margin: 0 1rem;
}
nav a.router-link-exact-active {
  color: #42b983;
}
button {
  background-color: var(--cream); 
  border: none;
  font: inherit;
  padding: .7rem 1rem;
  border-radius: 1rem;
  font-size: 1rem;
}
</style>

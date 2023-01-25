<template>
<form>
<input type="text" placeholder="Email" v-model="email" />
  <input type="text" placeholder="Password" v-model="password" />
  <div class="error" v-if="error">{{ errorMsg }}</div>
  <button @click.prevent="signIn">Sign In</button>
</form>
</template>

<script>
import { auth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";

export default {
  data() {
    return {
      email: "",
      password: "",
      error: false,
      errorMsg: "Login failed.",
      isPending: false
    };
  },
  methods: {
    signIn() {
        this.isPending = true;
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then(() => {
            this.isPending = false;
          this.$router.push({ name: "CreatePost" });
        })
        .catch((err) => {
          this.error = true;
          this.isPending = false;
        });
    },
  },
};
</script>

<style></style>

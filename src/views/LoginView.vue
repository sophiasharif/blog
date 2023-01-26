<template>
  <div class="wrapper">
    <h1>Log In</h1>
    <form>
      <input type="text" placeholder="Email" v-model="email" />
      <input type="text" placeholder="Password" v-model="password" />
      <button @click.prevent="signIn">Sign In</button>
      <div class="error" v-if="error">{{ errorMsg }}</div>
    </form>
  </div>
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
      errorMsg: "Incorrect Credentials.",
      isPending: false,
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

<style scoped>
.wrapper {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
h1 {
  text-decoration: underline;
  text-decoration-color: var(--accent);
}
div.error {
  display: grid;
  place-items: center;
  border: 1px solid #e84e4f;
  background: #9c2b2e;
  padding: 0.75rem;
  border-radius: 8px;
}
form {
  display: flex;
  flex-direction: column;
  margin-bottom: 10%;
  gap: 1rem;
}
input {
  display: block;
  height: 50px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.07);
  border-radius: 3px;
  padding: 0 10px;
  margin-top: 8px;
  font-size: 14px;
  font-weight: 300;
}
::placeholder {
  color: #e5e5e5;
}
form {
  width: 400px;
  background-color: rgba(255, 255, 255, 0.13);
  border-radius: 10px;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 40px rgba(8, 7, 16, 0.6);
  padding: 50px 35px;
}
form * {
  font-family: Georgia, "Times New Roman", Times, serif;
  color: #ffffff;
  letter-spacing: 0.5px;
  outline: none;
  border: none;
}
button {
  margin-top: 50px;
  width: 100%;
  background-color: #ffffff;
  color: #080710;
  padding: 15px 0;
  font-size: 18px;
  font-weight: 600;
  border-radius: 5px;
  cursor: pointer;
}
</style>

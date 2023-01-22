

<template>
  <NavBar/>
  <router-view/>
</template>

<script>
import NavBar from "./components/NavBar.vue";

export default {
  components: {
    NavBar,
  },
};
</script>


<style>
:root {
  --aspect-ratio: 1.6;
  --black: #17141d;
  --cream: #FFDEAD;
  --white: #EDEDF1;
  --gray-light: #CAC8D0;
  --accent: #FFA500;
}
*, *::before, *::after {
  box-sizing: border-box;
}
body {
  margin: 0;
  background: var(--black);
}
img {
  max-width: 100%;
}
#app {
  font-family: Georgia, "Times New Roman", Times, serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--white);
}
</style>
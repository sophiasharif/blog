

<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/create-post">Create Post</router-link> |
    <router-link to="/all-posts">All Posts</router-link>
  </nav>
  <router-view/>
</template>

<style>
:root {
  --black: #17141d;
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
  text-align: center;
  color: #2c3e50;
}
nav {
  z-index: 10;
  padding: 30px;
  position: fixed;
}
nav a {
  font-weight: bold;
  color: #2c3e50;
}
nav a.router-link-exact-active {
  color: #42b983;
}
</style>
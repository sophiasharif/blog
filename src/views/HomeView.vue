<template>
  <div class="wrapper">
    <HeroSection />
    <!-- <div class="container">
      <div class="info">
        <div></div>
        <div class="intro">
          <h1>Sophia Sharif</h1>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import HeroSection from "../components/HeroSection.vue";

export default {
  components: {
    HeroSection,
  },
};
</script>

<style scoped>
.wrapper {
  /* decimal value is aspect ratio of background image */
  max-width: min(calc(100vh * 1.6));
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
}

/* .content {
  height: 800px;
  background: blue;
}
.container {
  height: 100vh;
  display: grid;
  grid-template-columns: 4fr 7fr;
}
.info {
  display: grid;
  place-items: center;
  position: relative;
  bottom: 200px;
}
.intro h1 {
  font-family: Georgia, "Times New Roman", Times, serif;
  font-size: 3rem;
  margin-left: 3rem;
  margin-top: 2rem;
  color: #D19B63;
} */
</style>

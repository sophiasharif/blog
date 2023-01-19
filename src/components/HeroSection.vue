<template>
  <div class="hero">
    <img src="../assets/hero-section/phoenix.png" id="phoenix" />
    <img src="../assets/hero-section/scrap-1.png" id="scrap-1" />
    <img src="../assets/hero-section/scrap-2.png" id="scrap-2" />
    <img src="../assets/hero-section/scrap-3.png" id="scrap-3" />
    <img src="../assets/hero-section/small-bird-1.png" id="small-bird-1" />
    <img src="../assets/hero-section/small-bird-2.png" id="small-bird-2" />
    <img src="../assets/hero-section/small-bird-3.png" id="small-bird-3" />
    <h1 class="name">Sophia Sharif</h1>
    <div class="buttons">
      <button @click="$router.push({name: 'AllPosts'})">See Posts</button>
    </div>
  </div>
</template>

<style scoped>
.hero {
  background: url("../assets/hero-section/hero.jpeg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position-y: 0;
  background-position-x: center;
  position: relative;
  /* decimal value is aspect ratio of background image*/
  height: min(calc(100vw * (1 / var(--aspect-ratio))), 100vh);
  width: min(calc(100vh * var(--aspect-ratio)), 100%);
  box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;
}

/* ANIMATED IMAGES */
img {
  position: absolute;
}
#phoenix {
  animation: up-down 12s ease infinite;
  right: 30%;
  top: 12%;
  width: 28%;
}
#small-bird-1 {
  animation: up-down 8s ease infinite;
  right: 25%;
  top: 5%;
  width: 10%;
}
#small-bird-2 {
  animation: down-up 10s ease infinite;
  right: 43%;
  top: 4%;
  width: 12%;
}
#small-bird-3 {
  animation: down-up 14s ease infinite;
  right: 43%;
  top: 45%;
  width: 12%;
}
#scrap-1 {
  animation: up-down 9s ease infinite;
  left: 40%;
  top: 35%;
  width: 5%;
}
#scrap-2 {
  animation: down-up 11s ease infinite;
  left: 23%;
  top: 55%;
  width: 5%;
}
#scrap-3 {
  animation: up-down 7s ease infinite;
  left: 10%;
  top: 15%;
  width: 4%;
}
h1 {
  color: var(--cream);
  text-align: left;
  /* image will hug the viewport either vertically or horizontally --
  the calculation below keeps font size constant regardless of which is the case */
  font-size: min(4vw, calc(100vh * var(--aspect-ratio) / 25));
  position: absolute;
  width: 20%;
  left: 15%;
  top: 20%;
}
.buttons button {
  position: absolute;
  left: 15%;
  top: 46%;

  background-color: var(--cream); 
  border: none;
  font: inherit;
  border-radius: 1rem;
  font-size: 1rem;
  width: 10%;
  height: 5%;
  font-size: min(1.3vw, calc(100vh * var(--aspect-ratio) * (1.3/100)));
}

@keyframes up-down {
  0%,
  100% {
    transform: translateY(1.5vw);
  }
  50% {
    transform: translateY(0vw);
  }
}
@keyframes down-up {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(1.5vh);
  }
}
</style>

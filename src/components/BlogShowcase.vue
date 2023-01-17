<template>
  <div class="showcase-container">
    <div class="blog-showcase">
        <div class="image-container" style="grid-row: 1/13"></div>
        <div class="image-container" style="grid-row: 13/25"></div>
        <div class="image-container" style="grid-row: 1/8"></div>
        <div class="image-container" style="grid-row: 8/15"></div>
        <div class="image-container" style="grid-row: 15/25"></div>
        <div class="image-container" style="grid-row: 1/ span 10"></div>
        <div class="image-container" style="grid-row: 11 / span 7"></div>
        <div class="image-container" style="grid-row: 18 / span 7"></div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.showcase-container {
    height: 100%;
    display: grid;
    place-items: center;
    color: white;
}
.blog-showcase {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(24, 1fr);
    width: 100%;
    height: 90%;
    padding: 0 3rem;
    gap: 1rem;
}
.image-container {
    background: rgba(0, 0, 0, .5);
    border-radius: 16px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

</style>
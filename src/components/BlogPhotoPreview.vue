<template>
  <div class="modal">
    <div class="modal-content">
      <ion-icon name="close-outline" @click="closePreview"></ion-icon>
      <div class="card"
      :class="blogStore.photoSize" 
      :style="`background: url(${blogStore.coverPhotoURL}); 
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;`">
        <!-- <img :src="blogStore.coverPhotoURL"/> -->
      </div>
    </div>
  </div>
</template>

<script>
import { useBlogStore } from "../stores/BlogStore";

export default {
  data() {
    return {
      blogStore: useBlogStore(),
    };
  },
  methods: {
    closePreview() {
      this.blogStore.previewEnabled = false;
    },
  },
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
  display: grid;
  place-items: center;
  height: 100%;
  width: 100%;
}
.modal-content {
  display: grid;
  grid-template: repeat(4, 1fr) / repeat(4, 1fr);
  place-items: center;
  position: relative;
  border-radius: 12px;
  background-color: #fff;
  width: 800px;
  height: 600px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  padding: 40px;
}
ion-icon {
  position: absolute;
  top: 0;
  right: 0;
  margin: 1rem;
  cursor: pointer;
  font-size: 24px;
  color: var(--black)
}
img {
  object-fit: cover;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  max-width: revert;
}
.card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #353535;
  font-size: 3rem;
  color: #fff;
  box-shadow: rgba(3, 8, 20, 0.1) 0px 0.15rem 0.5rem,
    rgba(2, 8, 20, 0.1) 0px 0.075rem 0.175rem;
  height: 100%;
  width: 100%;
  border-radius: 8px;
  transition: all 500ms;
  overflow: hidden;
  padding: 0.5rem;
}
.card-tall {
  grid-column: 2/4;
  grid-row: 1/5;
}
.card-wide {
  grid-row: 2/4;
  grid-column: 1/5;
}
.card-small {
  grid-row: 2/4;
  grid-column: 2/4;
}
.card-large {
  grid-row: 1/5;
  grid-column: 1/5;
}
</style>

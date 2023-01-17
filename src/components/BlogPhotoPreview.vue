<template>
  <div class="modal">
    <div class="modal-content">
      <ion-icon name="close-outline" @click="closePreview"></ion-icon>
      <img :src="blogStore.coverPhotoURL" />
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
  display: flex;
  align-items: center;
  justify-content: center
  ;
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
}
img {
  max-width: 100%;
  max-height: 100%;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}
</style>

<template>
  <div class="sp-video">
    <video
      class="video-source"
      controls
      :src="src"
      style="object-fit:fill"
      webkit-playsinline="true"
      x-webkit-airplay="true"
      playsinline="true"
      x5-video-orientation="h5"
      x5-video-player-fullscreen="true"
      preload="auto"
    ></video>
  </div>
</template>
<script>
export default {
  props: {
    src: String
  }
};
</script>
<style lang="less" scoped>
.sp-video {
  height: 100%;
  width: 100%;
  video {
    height: 100%;
    width: 100%;
  }
}
</style>


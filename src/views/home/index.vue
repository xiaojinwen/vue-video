<template>
  <div class="home">
    <van-swipe
      class="horizontal-swipe"
      indicator-color="white"
      :loop="false"
      :show-indicators="false"
      :initial-swipe="1"
      @change="horizontalSwipeChange"
    >
      <van-swipe-item>1</van-swipe-item>
      <van-swipe-item>
        <video-play ref="videoPlay" :screenWidth="screenWidth" :screenHeight="screenHeight"></video-play>
      </van-swipe-item>
      <van-swipe-item>3</van-swipe-item>
    </van-swipe>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Ref } from "vue-property-decorator";
const screenWidth = document.body.clientWidth || window.innerWidth;
const screenHeight = window.innerHeight;
@Component({
  components: {
    VideoPlay: () => import("@/components/video-play/index.vue")
  }
})
export default class Home extends Vue {
  private screenWidth: number = screenWidth; // 屏幕宽度 用于计算播放进度条
  private screenHeight: number = screenHeight; // 屏幕高度 用于防止输入法弹出导致页面压缩
  private horizontalSwipeChange(index: number): void {
    console.log("index", index);
    // 暂停视频
    const videoListDom: any = this.$refs.videoPlay;
    if (index === 1) {
      videoListDom.playOrPause("play");
    } else {
      videoListDom.playOrPause("pause");
    }
  }
}
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
<style lang="scss">
</style>

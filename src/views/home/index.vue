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
        <video-play ref="videoPlay"></video-play>
      </van-swipe-item>
      <van-swipe-item>3</van-swipe-item>
    </van-swipe>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Ref } from "vue-property-decorator";

@Component({
  components: {
    VideoPlay: () => import("@/components/video-play/index.vue")
  },
  filters: {
    number(value: any) {
      const num = +value;
      if (num) {
        if (num >= 100000000) {
          return Math.round((num / 100000000) * 10) / 10 + "亿";
        } else if (num >= 10000000) {
          return Math.round((num / 10000000) * 10) / 10 + "千万";
        } else if (num >= 10000) {
          return Math.round((num / 10000) * 10) / 10 + "w";
        }
        return num;
      }
      return value;
    }
  }
})
export default class Home extends Vue {
  private horizontalSwipeChange(index: number): void {
    console.log("index", index);
    // 暂停视频
    const videoListDom: any = this.$refs.videoPlay;
    if (index === 1) {
      videoListDom.playOrPause('play');
    } else {
      videoListDom.playOrPause('pause');
    }
  }
}
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
<style lang="scss">
</style>

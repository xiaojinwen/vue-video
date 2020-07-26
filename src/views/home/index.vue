<template>
  <div class="home">
    <home-header
      class="home-header"
      :style="homeBtnGroupStyle"
      :indicators-style="homeHeaderStyle"
      :swipe-index="swipeIndex"
      :header-btn-arr="headerBtnArr"
      @header-btn-click="headerBtnClick"
    ></home-header>
    <van-swipe
      class="horizontal-swipe"
      ref="horizontalSwipe"
      indicator-color="white"
      :loop="false"
      :show-indicators="false"
      :initial-swipe="1"
      @change="horizontalSwipeChange"
    >
      <van-swipe-item>
        <video-play ref="focusVideoPlay" :screenWidth="screenWidth" :screenHeight="screenHeight"></video-play>
      </van-swipe-item>
      <van-swipe-item class="home-page">
        <video-play ref="videoPlay" :screenWidth="screenWidth" :screenHeight="screenHeight"></video-play>
      </van-swipe-item>
      <van-swipe-item>媒体页面</van-swipe-item>
    </van-swipe>
    <transition name="van-fade">
      <router-view @cancle="play('play')" />
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Ref, Emit } from "vue-property-decorator";

@Component({
  components: {
    VideoPlay: () => import("@/components/video-play/index.vue"),
    HomeHeader: () => import("@/components/home-header/index.vue")
  }
})
export default class Home extends Vue {
  @Emit() private setHeaderTranslate(index: number): void {}
  @Ref() readonly horizontalSwipe: any; // 横向滑动的swipe组件
  @Ref() readonly commentInput: any; // 评论输入框
  @Ref() readonly videoPlay: any; // videoPlay
  @Ref() readonly focusVideoPlay: any; // focusVideoPlay

  @Prop({
    type: Number,
    default: 1
  })
  private swipeIndex!: number; // swipe的位置
  @Prop({
    type: Number,
    default: 0
  })
  private screenWidth!: number; // 屏幕宽度 用于计算播放进度条
  @Prop({
    type: Number,
    default: 0
  })
  private screenHeight!: number; // 屏幕高度 用于防止输入法弹出导致页面压缩

  @Prop({
    type: Number,
    default: 0
  })
  private headerTranslateX!: number; //  顶部按钮指示点的translateX 值

  @Prop({
    type: Number,
    default: 0
  })
  private originHeaderTranslateX!: number; // 顶部按钮指示点的translateX 值

  @Prop({
    type: Array,
    default() {
      return [];
    }
  })
  private mainBtnArr!: any[]; // 首页主按钮

  @Prop() private homeHeaderStyle!: any;
  @Prop() private homeBtnGroupStyle!: any;
  private headerBtnArr: any[] = [
    {
      name: "关注",
      icon: "",
      badge: 5
    },
    {
      name: "推荐",
      icon: ""
    }
  ]; // 首页主按钮

  private horizontalSwipeChange(index: number): void {
    this.$emit("update:swipeIndex", index);
    // console.log("old this.swipeIndex", this.swipeIndex);
    // console.log("new index", index);
    if (this.headerBtnArr[index] && this.headerBtnArr[index].badge) {
      this.headerBtnArr[index].badge = 0;
    }
    // 暂停视频
    const videoListDom: any = this.videoPlay;
    const focusVideoListDom: any = this.focusVideoPlay;
    if (index === 1) {
      videoListDom && videoListDom.playOrPause("play");
      focusVideoListDom && focusVideoListDom.playOrPause("pause");
    } else if (index === 0) {
      videoListDom && videoListDom.playOrPause("pause");
      focusVideoListDom && focusVideoListDom.playOrPause("play");
    } else {
      videoListDom && videoListDom.playOrPause("pause");
      focusVideoListDom && focusVideoListDom.playOrPause("pause");
    }
    this.setHeaderTranslate(index);
  }

  private headerBtnClick(index: number | string): void {
    if (index === 0 || index === 1) {
      this.horizontalSwipe.swipeTo(index, { immediate: true });
    } else if (index === "search") {
      this.play("pause");
      this.$router.push("home/search").catch((err: Error) => console.log(err));
    }
  }

  private play(type: string = "pause") {
    const videoListDom: any =
      this.swipeIndex === 1 ? this.videoPlay : this.focusVideoPlay;
    videoListDom && videoListDom.playOrPause(type);
  }
}
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
<style lang="scss">
.home-header {
  .van-info {
    background-color: #ff940b;
  }
}
</style>

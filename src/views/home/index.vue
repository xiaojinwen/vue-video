<template>
  <div class="home">
    <div class="home-header" :style="homeBtnGroupStyle">
      <div class="header-item boundary iconfont icon-zhibo" @click.stop="headerBtnClick('live')"></div>
      <div class="header-item header-center-group">
        <div class="inner-header-center">
          <div
            class="item"
            v-for="(headerItem,index) in headerBtnArr"
            :key="index"
            :class="swipeIndex === index ? 'active':''"
            @click.stop="headerBtnClick(index)"
          >{{headerItem.name}}</div>
        </div>
      </div>
      <div class="header-item boundary iconfont icon-sousuo" @click.stop="headerBtnClick('search')"></div>
    </div>
    <van-swipe
      class="horizontal-swipe"
      ref="horizontalSwipe"
      indicator-color="white"
      :loop="false"
      :show-indicators="false"
      :initial-swipe="1"
      @change="horizontalSwipeChange"
    >
      <!-- @touchstart="mainTouchstart" -->
      <!-- @touchmove="mainTouchmove" -->
      <!-- @touchend="mainTouchend" -->
      <van-swipe-item>关注</van-swipe-item>
      <van-swipe-item class="home-page">
        <video-play ref="videoPlay" :screenWidth="screenWidth" :screenHeight="screenHeight"></video-play>
      </van-swipe-item>
      <van-swipe-item>媒体页面</van-swipe-item>
    </van-swipe>
    <div class="home-btn-group" :style="homeBtnGroupStyle">
      <div
        class="home-btn-item"
        v-for="(item,index) in mainBtnArr"
        :key="index"
        :class="{
              'iconfont': !!item.icon,
              [item.icon]: !!item.icon,
              'active': activeIndex === index,
            }"
        @click.stop="mainBtnClick(item,index)"
      >{{!item.icon && item.name || ''}}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Ref } from "vue-property-decorator";
import Direction from "@/utils/getDirection.ts";

const screenWidth = window.screen.width || document.body.clientWidth;
const screenHeight = window.innerHeight;
@Component({
  components: {
    VideoPlay: () => import("@/components/video-play/index.vue")
  }
})
export default class Home extends Vue {
  @Ref() readonly horizontalSwipe: any; // 评论输入框
  private screenWidth: number = screenWidth; // 屏幕宽度 用于计算播放进度条
  private screenHeight: number = screenHeight; // 屏幕高度 用于防止输入法弹出导致页面压缩
  private headerBtnArr: any[] = [
    {
      name: "关注",
      icon: ""
    },
    {
      name: "推荐",
      icon: ""
    }
  ]; // 首页主按钮
  private mainBtnArr: any[] = [
    {
      name: "首页",
      icon: ""
    },
    {
      name: "深圳",
      icon: ""
    },
    {
      name: "",
      icon: "icon-jiahao"
    },
    {
      name: "消息",
      icon: ""
    },
    {
      name: "我的",
      icon: ""
    }
  ]; // 首页主按钮
  private swipeIndex: number = 1; // swipe的位置
  private activeIndex: number = 0; // 按钮 active
  private translateX: any = ""; // 底部按钮的translateX 值
  private originTranslateX: any = ""; // 底部按钮的translateX 值
  private startX: number = 0; // 触摸开始位置 X
  private startY: number = 0; // 触摸开始位置 Y
  private path: any = []; // 位置
  private Direction: any; // Direction

  get homeBtnGroupStyle(): any {
    return {
      transitionDuration: this.startX ? "0ms" : "500ms",
      transform: `translateX(${this.translateX}px`
    };
  }
  private horizontalSwipeChange(index: number): void {
    this.swipeIndex = index;
    console.log("index", index);
    // 暂停视频
    const videoListDom: any = this.$refs.videoPlay;
    if (index === 1) {
      videoListDom.playOrPause("play");
    } else {
      videoListDom.playOrPause("pause");
    }
  }

  private headerBtnClick(index: number | string): void {
    if (index === 0 || index === 1) {
      this.horizontalSwipe.swipeTo(index, { immediate: true });
    }
  }

  private mainBtnClick(item: any, index: number): void {
    if (index === Math.ceil(this.mainBtnArr.length / 2) - 1) {
      return;
    }
    this.activeIndex = index;
  }

  private mainTouchstart(e: any): void {
    console.log("mainTouchstart e", e);
    this.startX = e.touches[0].clientX;
    this.startY = e.touches[0].clientY;
  }
  private mainTouchmove(e: any): void {
    if (this.swipeIndex === 0) {
      return;
    }
    // console.log("mainTouchmove e", e);
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    const disX: number = endX - this.startX;
    const disY: number = endY - this.startY;
    const absX: number = Math.abs(disX);
    const absY: number = Math.abs(disY);
    const scale = absX / absY;
    const direction = this.Direction.getDirection();
    // console.log("direction", direction);
    if (direction === 1 || direction === 2) {
      return;
    }
    // console.log("disX", disX);
    if (this.swipeIndex === 1) {
      if (disX !== this.translateX) {
        this.translateX = disX > 0 ? 0 : disX;
      }
    } else if (this.swipeIndex === 2) {
      const x = this.originTranslateX + disX;
      if (x !== this.translateX) {
        this.translateX = x > 0 ? 0 : x;
      }
    }
    // console.log("this.translateX", this.translateX);
  }
  private mainTouchend(e: any): void {
    this.startX = 0;
    this.startY = 0;
    this.path = [];
    if (this.swipeIndex === 0) {
      return;
    }
    // console.log("mainTouchend e", e);
    if (this.swipeIndex === 2) {
      this.translateX = -this.screenWidth;
    } else {
      this.translateX = 0;
    }
    this.originTranslateX = this.translateX;
    // console.log("this.translateX", this.translateX);
  }
  private created(): void {
    this.Direction = new Direction({
      touchstart: this.mainTouchstart,
      touchmove: this.mainTouchmove,
      touchend: this.mainTouchend
    });
  }
  private destoryed(): void {
    this.Direction.destoryed();
    this.Direction = null;
  }
}
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
<style lang="scss">
</style>

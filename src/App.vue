<template>
  <div id="app">
    <router-view
      :swipe-index.sync="swipeIndex"
      :screen-width="screenWidth"
      :screen-height="screenHeight"
      :main-btn-arr="mainBtnArr"
      :home-header-style="homeHeaderStyle"
      :home-btn-group-style="homeBtnGroupStyle"
    />
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
import { Component, Vue } from "vue-property-decorator";
import Direction from "@/utils/getDirection.ts";

const screenWidth = window.screen.width || document.body.clientWidth;
const screenHeight = window.innerHeight;
@Component
export default class App extends Vue {
  private screenWidth: number = screenWidth; // 屏幕宽度 用于计算播放进度条
  private screenHeight: number = screenHeight; // 屏幕高度 用于防止输入法弹出导致页面压缩
  private mainBtnArr: any[] = [
    {
      name: "首页",
      icon: "",
      url: "/home"
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
      icon: "",
      url: "/mine"
    }
  ]; // 首页主按钮
  private swipeIndex: number = 1; // swipe的位置
  private activeIndex: number = 0; // 按钮 active
  private translateX: number = 0; // 底部按钮的translateX 值
  private headerTranslateX: number = 0; // 顶部按钮指示点的translateX 值
  private originTranslateX: number = 0; // 底部按钮的translateX 值
  private originHeaderTranslateX: number = 0; // 顶部按钮指示点的translateX 值
  private startX: number = 0; // 触摸开始位置 X
  private startY: number = 0; // 触摸开始位置 Y
  private Direction: any; // Direction
  get homeBtnGroupStyle(): any {
    // console.log("this.startX", this.startX);
    return {
      transitionDuration: this.startX ? "0ms" : "500ms",
      ...(this.startX !== 0 || this.translateX !== 0
        ? {
            transform: `translateX(${this.translateX}px`
          }
        : {})
    };
  }

  get homeHeaderStyle(): any {
    return {
      transitionDuration: this.startX ? "0ms" : "500ms",
      transform: `translateX(${this.headerTranslateX}px`
    };
  }
  private mainBtnClick(item: any, index: number): void {
    if (index === Math.ceil(this.mainBtnArr.length / 2) - 1) {
      return;
    }
    this.activeIndex = index;
    item.url &&
      this.$router.push(item.url).catch((err: Error) => {
        console.log(err);
      });
  }
  private mainTouchstart(e: any): void {
    // console.log("mainTouchstart e", e);
    const startX: number = e.touches[0].clientX;
    const startY: number = e.touches[0].clientY;
    // 兼容home-header 因为使用了 transform fix布局会失效
    if (startY > 40) {
      this.startX = startX;
      this.startY = startY;
    }
  }
  private mainTouchmove(e: any): void {
    // console.log("mainTouchmove e", e);
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    const disX: number = endX - this.startX;
    const disY: number = endY - this.startY;
    const direction = this.Direction.getDirection();
    // console.log("direction", direction);
    if (this.swipeIndex !== 0 && (direction === 3 || direction === 4)) {
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
    }
    if (
      (this.swipeIndex === 0 || this.swipeIndex === 1) &&
      (direction === 3 || direction === 4)
    ) {
      let x: number = this.originHeaderTranslateX - disX / 7.6;
      if (x > 0) {
        x = 0;
      } else if (x < -50) {
        x = -50;
      }
      this.headerTranslateX = x;
    }

    // console.log("this.translateX", this.translateX);
  }
  private mainTouchend(e: any): void {
    this.startX = 0;
    this.startY = 0;
    // console.log("mainTouchend e", e);
    if (this.swipeIndex !== 0) {
      if (this.swipeIndex === 2) {
        this.translateX = -this.screenWidth;
      } else {
        this.translateX = 0;
      }
      this.originTranslateX = this.translateX;
    }

    // console.log("this.translateX", this.translateX);
    this.setHeaderTranslate();
  }

  private setHeaderTranslate(): void {
    if (this.swipeIndex === 1) {
      this.headerTranslateX = 0;
    } else if (this.swipeIndex === 0) {
      this.headerTranslateX = -50;
    }
    this.originHeaderTranslateX = this.headerTranslateX;
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

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
</style>
<style lang="scss" scoped>
#app {
  .home-btn-group {
    transition-duration: 0ms;
    transform: translateX(0px);
    z-index: 101;
    background-color: rgba($color: #000000, $alpha: 0.1);
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 40px;
    text-align: center;
    align-items: center;
    color: rgba($color: #ffffff, $alpha: 0.6);
    font-size: 16px;
    display: flex;
    font-weight: 600; // line-height: 40px;
    .home-btn-item {
      flex: 1;
      &.iconfont {
        font-size: 26px;
      }
      &.active {
        color: rgba($color: #ffffff, $alpha: 1);
      }
    }
  }
}
</style>

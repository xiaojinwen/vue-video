<template>
  <div clsee="xjw-outer-progress">
    <div
      class="xjw-progress"
      ref="progress"
      :style="getProgressBoxStyle"
      @touchstart.stop.prevent="touchstart"
      @touchmove.stop="touchmove"
      @touchend.stop="touchend"
      @click.stop="click"
    >
      <div class="xjw-inner-play-progress" :style="getProgressStyle"></div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Ref } from "vue-property-decorator";
const screenWidth = document.body.clientWidth || window.innerWidth;
@Component
export default class Progress extends Vue {
  @Ref() readonly progress!: any; // 进度条外部
  @Prop({
    type: Number,
    default: 50
  })
  private percentage!: number; // 进度使用.sync 会同时更新该值 eg: :percentage.sync

  @Prop() private isTouch?: any; // 当前是否为触摸中状态 此处不设置为Boolean类型 因为使用该值判断是否需要触摸设置进度条

  @Prop({
    type: String
  })
  private strokeWidth: any; // 进度条粗细 px

  @Prop({
    type: String
  })
  private color: any; // 颜色

  @Prop({
    type: String
  })
  private pivotColor: any; // 背景颜色

  @Prop({
    type: Boolean,
    default: false
  })
  private disabled: any; // 禁用

  // 进度条外层宽度
  private get progressBoxWidth(): number {
    return (this.progress && this.progress.clientWidth) || screenWidth;
  }

  // 进度条宽度
  private get progressWidth(): string {
    return Math.round((this.percentage / 100) * this.progressBoxWidth) + "px";
  }

  // 进度条外部盒子样式
  private get getProgressBoxStyle(): any {
    const styleObj: any = {};
    this.pivotColor && (styleObj.backgroundColor = this.pivotColor);
    return styleObj;
  }

  // 进度条盒子样式
  private get getProgressStyle(): any {
    const styleObj: any = {
      width: this.progressWidth
    };
    this.color && (styleObj.backgroundColor = this.color);
    this.strokeWidth && (styleObj.height = this.strokeWidth);
    return styleObj;
  }

  private setProgress(e: any) {
    if (e.targetTouches && e.targetTouches[0]) {
      const position =
        (e.targetTouches[0].clientX / this.progressBoxWidth) * 100;
      this.$emit("update:percentage", position);
    }
  }
  private touchstart(e: any): void {
    // e.preventDefault();
    // console.log("this.isTouch", this.isTouch);
    if (this.isTouch === void 0) {
      return;
    }
    // console.log("touchstart", e);
    this.$emit("update:isTouch", true);
    this.setProgress(e);
  }
  private touchmove(e: any): void {
    if (this.isTouch === void 0) {
      return;
    }
    // console.log("touchmove", e);
    this.setProgress(e);
  }
  private touchend(e: any): void {
    if (this.isTouch === void 0) {
      return;
    }
    // console.log("touchend", e);
    this.$emit("update:isTouch", false);
    this.$emit("progress", this.percentage);
  }
  private click(e: any): void {
    // console.log("click", e);
    const position = (e.x / this.progressBoxWidth) * 100;
    this.$emit("progress", position);
    this.$emit("update:percentage", position);
  }
}
</script>
<style lang="scss" scoped>
.xjw-outer-progress {
  position: relative;
}

// 扩大点击/触摸范围
.xjw-progress::after {
  content: "";
  position: absolute;
  top: -10px;
  bottom: -10px;
  left: 0;
  right: 0;
  //   left: -10px;
  //   right: -10px;
}
.xjw-progress {
  position: relative;
  background: #a3a3a5;
  width: 100%;
  height: 2px;
  .xjw-inner-play-progress {
    width: 0;
    height: 2px;
    background: #451dfa;
  }
}
</style>
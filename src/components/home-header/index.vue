<template>
  <div class="header" :style="boxStyle">
    <div class="header-item boundary iconfont icon-zhibo" @click.stop="headerBtnClick('live')"></div>
    <div class="header-item header-center-group">
      <div class="inner-header-center">
        <van-icon
          class="item"
          v-for="(headerItem,index) in headerBtnArr"
          :class="getheaderActiveClass(index)"
          :badge="headerItem.badge || undefined"
          :key="index"
          @click.stop="headerBtnClick(index)"
        >{{headerItem.name}}</van-icon>
        <div class="indicators" :style="indicatorsStyle"></div>
      </div>
    </div>
    <div class="header-item boundary iconfont icon-sousuo" @click.stop="headerBtnClick('search')"></div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
@Component
export default class CommentItem extends Vue {
  // "header-btn-click"
  @Emit() private headerBtnClick(index: number | string): void {
    if (index === "search") {
      this.$router.push("/search").catch((err: Error) => err);
      console.log("sss");
    }
  }
  @Prop() private boxStyle?: any; // box的style
  @Prop() private indicatorsStyle?: any; // 指示器的style
  @Prop({
    type: Array,
    default() {
      return [];
    }
  })
  private headerBtnArr: any; // 按钮数据

  @Prop({
    type: Number,
    default: 1
  })
  private swipeIndex!: number; // 位置
  private getheaderActiveClass(index: number): string {
    return this.swipeIndex === index ||
      (this.swipeIndex + 1 > this.headerBtnArr.length &&
        this.swipeIndex >= index)
      ? "active"
      : "";
  }
}
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
<style lang="scss">
.header {
  .van-info {
    background-color: #ff940b;
  }
}
</style>
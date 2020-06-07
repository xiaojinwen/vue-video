<template>
  <div class="comment-item">
    <div class="comment-left avatar" :style="{
        flex: `0 0 ${avatarWidth}px`
    }">
      <van-image
        lazy-load
        round
        :width="innerAvatarWidth"
        :height="innerAvatarWidth"
        :src="avatar || defaultAvatar"
      />
    </div>
    <div class="comment-right">
      <div class="name">{{name}}</div>
      <div class="comment-value-box">
        <span class="to-name" v-if="toName">
          回复
          <span class="inner-to-name">{{toName}}:</span>
        </span>
        <span class="comment-value">{{commentValue}}</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Ref } from "vue-property-decorator";
@Component
export default class CommentItem extends Vue {
  @Prop({
    type: String,
    default: ""
  })
  private avatar?: string;

  private defaultAvatar: string = "https://img.yzcdn.cn/vant/cat.jpeg";
  @Prop({
    type: String,
    default: ""
  })
  private name!: string;
  @Prop({
    type: String,
    default: ""
  })
  private commentValue!: string;

  @Prop({
    type: String,
    default: ""
  })
  private toName?: string;

  @Prop({
    type: Number,
    default: 50
  })
  private avatarWidth!: number;

  private get innerAvatarWidth(): number {
    return (this.avatarWidth / 5) * 4;
  }
}
</script>
<style lang="scss" scoped>
.comment-item {
  display: flex;
  text-align: left;
  font-size: 14px;
  line-height: 20px;
  padding: 8px 10px;
  .comment-left {
    flex: 0 0 50px;
    display: flex;
    justify-content: center;
  }
  .comment-right {
    flex: 1;
    // width: calc(100%-50px);
    width: 200px;
    .name {
      font-weight: 600;
      line-height: 22px;
    }
    .comment-value-box {
      .to-name {
        display: inline-block;
        .inner-to-name {
          display: inline-block;
          margin-left: 2px;
          margin-right: 2px;
        }
      }
      .comment-value {
        width: 100%;
        // display: inline-block;
        word-break: break-all;
        white-space: normal;
      }
    }
  }
}
</style>
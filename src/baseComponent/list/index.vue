<template>
  <div class="base-list">
    <div class="item top" v-if="topData">
      <div class="no icon-zhiding iconfont first-three"></div>
      <div class="icon avatar" v-if="topData.icon" :style="{flex: `0 0 ${_avatarWidth}px`}">
        <van-image
          :class="isLive?'live':''"
          lazy-load
          round
          :width="innerAvatarWidth || topData.iconWidth"
          :height="innerAvatarWidth || topData.iconHeight || topData.iconWidth"
          :src="topData.icon"
        />
      </div>
      <div class="name">
        <div class="text">{{topData.name}}</div>
        <slot class="top-name-suffix" name="topNameSuffix"></slot>
      </div>
      <div class="time">
        <slot class="top-time-prefix" name="topTimePrefix"></slot>
      </div>
    </div>
    <div class="item" v-for="(item,index) in data" :key="item.key">
      <div class="no" :class="index<=2?'first-three':''">{{index+1}}.</div>
      <div class="icon avatar" v-if="item.icon" :style="{flex: `0 0 ${_avatarWidth}px`}">
        <van-image
          :class="isLive?'live':''"
          lazy-load
          round
          :width="innerAvatarWidth || item.iconWidth"
          :height="innerAvatarWidth || item.iconHeight || item.iconWidth"
          :src="item.icon"
        />
      </div>
      <div class="name">
        <div class="text">{{item.name}}</div>
        <p-badge class="hot" v-if="item.isHot" :type="0"></p-badge>
        <slot class="name-suffix" name="nameSuffix"></slot>
      </div>
      <div class="time">
        <slot class="time-prefix" name="timePrefix"></slot>
        <div class="text">{{item.time | number}}</div>
        <slot v-if="$slots.timeSuffix" class="time-suffix" name="timeSuffix"></slot>
        <div v-else class="time-suffix">{{timeSuffix}}</div>
      </div>
    </div>
    <div class="footer" @click="footerClick">
      {{footerText || '查看完整榜单'}}
      <span class="icon iconfont icon-youjiantou"></span>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
@Component({
  components: {
    pBadge: () => import("@/components/badge/index.vue")
  }
})
export default class BaseList extends Vue {
  @Emit() private footerClick(): void {}
  @Prop({
    type: Array,
    default() {
      return [];
    }
  })
  private data!: any[];

  @Prop({ type: Object }) private topData?: any;
  @Prop({ type: Boolean, default: false }) private isLive?: boolean;
  @Prop({ type: String, default: false }) private footerText?: string;

  @Prop({
    type: Number,
    default: 50
  })
  private avatarWidth!: number;

  private get innerAvatarWidth(): number {
    return (this._avatarWidth / 5) * 4;
  }

  private get _avatarWidth(): number {
    return this.isLive ? this.avatarWidth - 2 : this.avatarWidth;
  }
}
</script>
<style lang="scss" scoped>
@import "@assets/scss/global.scss";
.base-list {
  color: #d6d5d5;
  font-size: 16px;
  line-height: 40px;
  text-align: left;
  .item {
    display: flex;
    padding: 4px 12px;
    .no {
      flex: 0 0 20px;
      font-weight: 500;
      &.first-three {
        color: yellow;
      }
    }
    .icon {
      // flex: 0 0 40px;
      flex: 0 0 50px;
      display: flex;
      justify-content: center;
      .live {
        border: 2px solid #f93818;
      }
    }
    .name {
      flex: 1;
      font-weight: 500;
      // text-overflow: ellipsis;
      // overflow: hidden;
      // white-space: nowrap;
      @include text-ellipsis;
      .text,
      .hot,
      .name-suffix {
        display: inline-block;
      }
      .hot {
        margin-left: 4px;
        line-height: 16px;
        border-radius: 10px;
      }
    }
    .time {
      flex: 0 0 120px;
      text-align: right;
      color: #eeeeee;
      .time-prefix,
      .text,
      .time-suffix {
        display: inline-block;
      }
      .time-prefix {
        margin-right: 4px;
      }
      .time-suffix {
        margin-left: 8px;
      }
    }
  }
  .footer {
    text-align: center;
    line-height: 40px;
    font-size: 16px;
    color: #e0c808;
  }
}
</style>
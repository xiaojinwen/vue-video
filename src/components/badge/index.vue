<template>
  <div class="badge">
    <div class="hot" v-if="type==0">{{text|| '热'}}</div>
    <div class="rec" v-else-if="type==1">{{text|| '荐'}}</div>
    <div class="live" v-else-if="type==2"></div>
    <div class="other" v-else>{{text}}</div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Ref } from "vue-property-decorator";
@Component
export default class BaseList extends Vue {
  @Prop({
    type: Number,
    default: 0
  })
  private type?: number; // 0:热 1:荐 2直播icon

  @Prop({
    type: String
  })
  private text?: string; // 显示文字
}
</script>
<style lang="scss" scoped>
.badge {
  //   vertical-align: top;
  .hot,
  .rec,
  .other {
    padding: 1px 2px;
    font-size: 14px;
    background-color: #f30d0d;
    color: #fff;
    border-radius: 4px;
  }
  .rec {
    background-color: green;
  }
  .other {
    background-color: yellow;
  }
  .live {
  }
  .iconfont {
    font-size: 16px;
  }
}
</style>
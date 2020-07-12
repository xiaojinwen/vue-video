<template>
  <transition name="van-fade">
    <div class="search">
      <van-field
        ref="searchInput"
        id="search-input"
        class="search-input"
        label-width="40px"
        v-model.trim="searchValue"
        center
        clearable
        :placeholder="searchPlaceholder"
        @keyup.enter="search"
      >
        <template #left-icon>
          <div class="left-icon">
            <span class="iconfont icon-saoma"></span>
          </div>
        </template>
        <template #label>
          <div class="label">
            <span class="iconfont icon-sousuo"></span>
          </div>
        </template>
        <template #button>
          <div class="bottom" @click.stop="cancle">取消</div>
        </template>
      </van-field>
      <div class="history-list">
        <div
          class="history-item"
          v-for="item in showHistory"
          :key="item.key"
          @click.stop="enterHistory(item)"
        >
          <span class="iconfont icon-lishi left-icon"></span>
          <div class="text">{{item.value}}</div>
          <span class="iconfont icon-guanbi right-icon" @click.stop="deleteHistory(item)"></span>
        </div>
        <div
          class="history-bottom"
          v-if="history.length>4"
          @click.stop="clearHistory"
        >{{showHistoryNum?"全部搜索记录":"清空全部搜索记录"}}</div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
interface HistoryItem {
  value: string;
  key: number;
}
const maxHistoryLen: number = 10; // 历史数据储存个数

import { Component, Prop, Vue, Ref, Emit } from "vue-property-decorator";
@Component
export default class Search extends Vue {
  @Emit() private cancle(): void {
    this.$router.back();
  }
  private searchValue: string = ""; // 搜索内容
  private searchPlaceholder: string = "姜贞羽动态壁纸"; // Placeholder
  private history: HistoryItem[] = [
    {
      value: "姜贞羽动态壁纸",
      key: 2
    },
    {
      value: "姜贞羽",
      key: 1
    }
  ]; // 历史记录
  private showHistoryNum: number = 3; // 历史数据展示个数 0 表示不限制展示数量

  get showHistory(): HistoryItem[] {
    if (this.showHistoryNum) {
      return this.history.slice(0, this.showHistoryNum + 1);
    }
    return this.history;
  }
  private search(): void {
    const value: string = this.searchValue.trim();
    if (!value || !value.length) {
      this.searchValue = this.searchPlaceholder;
      return;
    }
    const history = this.history;
    history.unshift({
      value,
      key: history.length ? history[0].key + 1 : Date.now()
    });
    // 超出数量删除
    if (history.length > maxHistoryLen) {
      history.splice(maxHistoryLen - 1, 1);
    }
  }
  private deleteHistory(item: HistoryItem): void {
    const findIndex = this.history.findIndex(
      (v: HistoryItem) => v.key === item.key
    );
    findIndex > -1 && this.history.splice(findIndex, 1);
  }
  // 清空历史数据 | 展示全部数据
  private clearHistory(): void {
    if (this.showHistoryNum) {
      this.showHistoryNum = 0;
    } else {
      this.history = [];
    }
  }

  private enterHistory(item: HistoryItem): void {
    const value = item.value;
    value && (this.searchValue = value);
  }
}
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
<style lang="scss">
.search {
  .van-field__control {
    margin-left: -35px;
    background-color: #333;
    color: #efefef;
    padding-left: 30px;
  }
  .van-field__label {
    z-index: 110;
    position: relative;
    color: #efefef;
  }
  .van-field__clear {
    background-color: #333;
    margin-right: 0px;
    border: transparent;
  }
  .van-field__body {
    #search-input {
      border-radius: 2px;
    }
  }
  .van-cell {
    line-height: 30px;
    &:not(:last-child)::after {
      border-bottom: none;
    }
  }
}
</style>

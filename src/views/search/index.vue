<template>
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

    <van-tabs v-model="contentActiveIndex" swipeable animated>
      <van-tab title="猜你想搜">
        <div class="conjecture">
          <div class="item" v-for="item in conjectureArr" :key="item.key">
            <div class="inner-item">
              <div class="name">{{item.name}}</div>
              <p-badge class="hot" v-if="item.isHot" :type="0"></p-badge>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="热点榜">
        <base-list
          :data="hotArr"
          :top-data="hotTopData"
          footer-text="查看完整热点榜"
          @footer-click="footerClick('hot')"
        ></base-list>
      </van-tab>
      <van-tab title="明星榜">
        <base-list :data="stars" footer-text="查看完整明星榜" @footer-click="footerClick('stars')">
          <span slot="timeSuffix" class="stars-time-suffix">影响力</span>
        </base-list>
      </van-tab>
      <van-tab title="直播榜">
        <base-list
          :data="liveData"
          :is-live="true"
          footer-text="查看完整直播榜"
          @footer-click="footerClick('live')"
        >
          <span slot="timeSuffix" class="stars-time-suffix">人气</span>
        </base-list>
      </van-tab>
      <van-tab title="更多">更多</van-tab>
    </van-tabs>
  </div>
</template>

<script lang="ts">
interface HistoryItem {
  value: string;
  key: number;
}
const maxHistoryLen: number = 10; // 历史数据储存个数

import { Component, Prop, Vue, Ref, Emit } from "vue-property-decorator";
import { mockArr } from "@/utils/index";
@Component({
  components: {
    baseList: () => import("@/baseComponent/list/index.vue"),
    pBadge: () => import("@/components/badge/index.vue")
  }
})
export default class Search extends Vue {
  @Emit() private cancle(): void {
    this.$router.back();
  }
  private searchValue: string = ""; // 搜索内容
  private searchPlaceholder: string = "姜贞羽动态壁纸"; // placeholder
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
  private showHistoryNum: number = 4; // 历史数据展示个数 0 表示不限制展示数量
  private contentActiveIndex: number = 1; // tab区域index
  private conjectureArr: any = mockArr(
    [
      { name: "王一博说和程潇不熟5555555555555555555", isHot: 1 },
      { name: "刘亦菲发文感谢医生", isHot: 0 },
      { name: "刘亦菲发文感谢医生", isHot: 0 }
    ],
    12
  ); // 猜你想搜数据

  private hotTopData: any = {
    name: "专题:南方汛情最新情况",
    time: 35544545
  };
  private hotArr: any = [
    { name: "吴亦凡杨紫发文", time: 35544545, isVeryHot: 1, key: 0 },
    { name: "于小彤被问女朋友怎么没来", time: 15654125, isVeryHot: 1, key: 1 },
    { name: "三十而已开播", time: 9654125, key: 2 },
    { name: "三十而已开播2", time: 9654125, key: 3 },
    { name: "三十而已开播3", time: 9654125, key: 4 },
    { name: "三十而已开播4", time: 9654125, key: 5 },
    { name: "三十而已开播5", time: 9654125, isRec: 1, key: 6 },
    { name: "陈立农单手转戒指", time: 65544545, isHot: 1, key: 7 }
  ];

  private stars: any[] = [
    {
      name: "GEM邓紫棋",
      time: 35544545,
      icon: "https://img.yzcdn.cn/vant/cat.jpeg",
      key: 0
    },
    {
      name: "陈赫",
      time: 15654125,
      icon: "https://img.yzcdn.cn/vant/cat.jpeg",
      key: 1
    },
    {
      name: "赵露思",
      time: 9654125,
      icon: "https://img.yzcdn.cn/vant/cat.jpeg",
      key: 2
    },
    {
      name: "Angelababy",
      time: 9654125,
      icon: "https://img.yzcdn.cn/vant/cat.jpeg",
      key: 3
    },
    {
      name: "刘宪华Henry",
      time: 9654125,
      icon: "https://img.yzcdn.cn/vant/cat.jpeg",
      key: 4
    },
    {
      name: "张庭",
      time: 9654125,
      icon: "https://img.yzcdn.cn/vant/cat.jpeg",
      key: 5
    },
    {
      name: "涂磊",
      time: 9654125,
      icon: "https://img.yzcdn.cn/vant/cat.jpeg",
      key: 6
    },
    {
      name: "王耀庆",
      time: 65544545,
      icon: "https://img.yzcdn.cn/vant/cat.jpeg",
      key: 7
    }
  ];

  private liveData: any[] = [
    {
      name: "惠子",
      time: 958875,
      icon: "https://img.yzcdn.cn/vant/cat.jpeg",
      key: 0
    },
    {
      name: "央视新闻",
      time: 888875,
      icon: "https://img.yzcdn.cn/vant/cat.jpeg",
      key: 1
    },
    {
      name: "刘小浩",
      time: 558875,
      icon: "https://img.yzcdn.cn/vant/cat.jpeg",
      key: 2
    },
    {
      name: "JJ秀妍",
      time: 4654125,
      icon: "https://img.yzcdn.cn/vant/cat.jpeg",
      key: 3
    },
    {
      name: "大英户外<<乖妹>>",
      time: 3654125,
      icon: "https://img.yzcdn.cn/vant/cat.jpeg",
      key: 4
    },
    {
      name: "佳宝",
      time: 2654125,
      icon: "https://img.yzcdn.cn/vant/cat.jpeg",
      key: 5
    },
    {
      name: "中国好声音",
      time: 1654125,
      icon: "https://img.yzcdn.cn/vant/cat.jpeg",
      key: 6
    },
    {
      name: "黄小弟",
      time: 654125,
      icon: "https://img.yzcdn.cn/vant/cat.jpeg",
      key: 7
    }
  ];

  get showHistory(): HistoryItem[] {
    if (this.showHistoryNum) {
      return this.history.slice(0, this.showHistoryNum);
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
  .van-tabs {
    .van-tabs__nav {
      background-color: rgba(0, 0, 0, 0.9);
    }
    .van-tab--active {
      color: #ffeeff;
    }
    .van-tabs__line {
      background-color: #f35305;
    }
  }
  [class*="van-hairline"]::after {
    border: none;
  }
}
</style>

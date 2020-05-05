<template>
  <div class="home">
    <van-swipe
      class="my-swipe"
      indicator-color="white"
      :loop="false"
      :show-indicators="false"
      :vertical="true"
      @change="swipeChange"
    >
      <van-swipe-item v-for="(videoItem,index) in videoList" :key="index" @click="paly">
        <div class="video-box">
          <!-- v-if="videoIndex === index" -->
          <!-- autoplay -->
          <!-- 视频 -->
          <video
            ref="video"
            class="video"
            x5-playsinline
            x-webkit-airplay="allow"
            preload="auto"
            :poster="videoItem.poster"
            x5-video-orientation="portrait"
            x5-video-player-type="h5"
            :x5-video-player-fullscreen="true"
            :webkit-playsinline="true"
            :playsinline="true"
            t7-video-player-type="inline"
            @canplay="onCanPlay"
            @ended="onEnded"
            @error="onError"
            @pause="onpause"
            @play="onPlay"
            @playing="onPlaying"
            @waiting="onWaiting"
            @timeupdate="onTimeUpdate"
          >
            <template v-for="(srcItem,srcIndex) in videoItem.soure">
              <source :src="srcItem.src" :type="srcItem.type" :key="srcIndex" />您的手机不支持该视频文件！！！
            </template>
          </video>
          <!-- <img v-else :src="videoItem.poster" :alt="videoItem.title" :title="videoItem.title" /> -->
          <!-- 右侧操作按钮 -->
          <div class="controls">
            <div class="like" @click.stop="toLike(videoItem,index)">
              <div class="like-icon" :class="videoItem.isLike?'islike':''"></div>
              <div class="like-text">{{videoItem.likeNum | number}}</div>
            </div>
            <div class="comment" @click.stop="toComment(videoItem,index)">
              <div class="comment-icon"></div>
              <div class="comment-text">{{videoItem.commentNum | number}}</div>
            </div>
            <div class="share" @click.stop="toShare(videoItem,index)">
              <div class="share-icon"></div>
              <div class="share-text">{{videoItem.shareNum | number}}</div>
            </div>
          </div>
          <div class="info">
            <div class="inner-info">
              <div class="title">
                <i>@</i>
                {{videoItem.title}}
              </div>
              <div class="desc">{{videoItem.desc}}</div>
              <!-- <van-notice-bar wrapable background="#ff000000"
              color="#ffffff" :scrollable="false">{{videoItem.desc}}</van-notice-bar>-->
              <van-notice-bar
                class="music"
                background="#ff000000"
                color="#ffffff"
                left-icon="music-o"
              >{{videoItem.music}}</van-notice-bar>
            </div>
          </div>
          <!-- 评论详情 -->

          <!-- 播放按钮 -->
          <div class="play-icon playicon-animation" v-show="!isPlaying"></div>
          <!-- 播放进度条 -->
          <div class="play-progress">
            <div class="inner-play-progress" :style="{width:videoItem.percent}"></div>
          </div>
        </div>
      </van-swipe-item>
    </van-swipe>
    <van-popup
      class="comment-deatil"
      v-model="isShowComment"
      @click-overlay="clickCommentOverlay"
      round
      closeable
      position="bottom"
      :style="{ height: '55%' }"
    >评论详情</van-popup>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Ref } from "vue-property-decorator";

@Component({
  filters: {
    number(value: any) {
      const num = +value;
      if (num) {
        if (num >= 100000000) {
          return Math.round((num / 100000000) * 10) / 10 + "亿";
        } else if (num >= 10000000) {
          return Math.round((num / 10000000) * 10) / 10 + "千万";
        } else if (num >= 10000) {
          return Math.round((num / 10000) * 10) / 10 + "w";
        }
        return num;
      }
      return value;
    }
  }
})
export default class Home extends Vue {
  private screenWidth: number = 720; // 屏幕宽度 用于计算播放进度条
  private videoIndex: number = 0; // 视频的位置
  private isPlaying: boolean = false; // 是否播放
  private isCanPlay: boolean = false; // 是否能够播放
  private isShowComment: boolean = false; // 是否显示评论详情
  private videoList: any[] = [
    {
      title: "女神带你观看美丽风景",
      desc:
        "女神带你观看美丽女神带你观看美丽女神带你观看美丽女神带你观看美丽女神带你观看美丽女神带你观看美丽女神带你观看美丽",
      music: "何为不可的原创音乐,何为不可的原创音乐,何为不可的原创音乐",
      soure: [
        {
          src:
            "https://vdse.bdstatic.com//16afebed69a8662dbf125ad0440d3ada.mp4?authorization=bce-auth-v1%2F40f207e648424f47b2e3dfbb1014b1a5%2F2020-04-30T15%3A58%3A26Z%2F-1%2Fhost%2Fd95aefe1ca9b84434f2edaf00042108ed9f133162e515f8ac51407337f2298cf",
          type: "video/mp4"
        },
        {
          src:
            "https://v6-dc-ad.ixigua.com/bea75d39536eb9deb5a324a2f6d389b5/5eb0552e/video/tos/hxsy/tos-hxsy-ve-0004/87711438d6f543f58725e05f7d6cee6b/?a=34&br=0&bt=746&cr=0&cs=0&dr=0&ds=1&er=&l=20200505004211010014041159292D00AE&lr=&qs=0&rc=M3JsZW01OXA7dDMzNDczM0ApOGU4N2Y3OmVnN2dpNmg2ZGdnaS5mbmdfYS1fLS1eLS9zc141NWNeYTI0YmE2NTNjXmE6Yw%3D%3D&vl=&vr=",
          type: "video/ogg"
        }
      ],
      poster:
        "https://vdgif.bdstatic.com//fcf3f8f68f50283f4c994eaea770c664?x-bce-process=image/resize,m_fill,w_994,h_1766/format,f_jpg/quality,Q_100",
      likeNum: "6352211",
      commentNum: "4221",
      shareNum: "1000",
      isLike: true,
      percent: 0
    },
    {
      title: "女神带你观看美丽风景",
      desc: "看看女神带你观看美丽风景",
      music:
        "何为不可的原创音乐,何为不可的原创音乐,何为不可的原创音乐,何为不可的原创音乐,何为不可的原创音乐",
      soure: [
        {
          src:
            "https://vdse.bdstatic.com//1606aedbd467828758bf43c074a637c5.mp4?authorization=bce-auth-v1%2F40f207e648424f47b2e3dfbb1014b1a5%2F2020-04-30T23%3A39%3A30Z%2F-1%2Fhost%2Fff0bc1c0362881c9da1c0d45e6ca82f09b3850efad6f3085d7ac9a75b213aa74",
          type: "video/mp4"
        }
      ],
      poster:
        "https://vdgif.bdstatic.com//c903b4fb9b67982398957e0ffed4593c?x-bce-process=image/resize,m_fill,w_994,h_1766/format,f_jpg/quality,Q_100",
      likeNum: "635221122",
      commentNum: "6221",
      shareNum: "3000",
      isLike: false,
      percent: 0
    }
  ]; // 视频数据
  // @Ref() readonly videoListDom!: any[]

  private swipeChange(index: number): void {
    console.log("index", index);
    // 暂停上个视频
    const videoListDom: any = this.$refs.video;
    if (videoListDom && videoListDom[this.videoIndex]) {
      if (this.isPlaying) {
        videoListDom[this.videoIndex].pause();
      }
      videoListDom[index].play();
    }
    // 播放下一个
    this.videoIndex = index;
  }

  private onCanPlay(): void {
    console.log("onCanPlay");
    this.isCanPlay = true;
  }
  private onEnded(): void {
    console.log("onEnded");
  }
  private onError(e: any): void {
    console.log("onError", e);
  }
  private onpause(): void {
    console.log("onpause");
    this.isPlaying = false;
  }
  private onPlay(): void {
    console.log("onPlay");
  }
  private onPlaying(): void {
    console.log("onPlaying");
    this.isPlaying = true;
  }
  // 视频因缓存暂停时
  private onWaiting(): void {
    console.log("onWaiting");
    this.isPlaying = false;
  }
  // 进度条变化
  private onTimeUpdate(): void {
    const videoListDom: any = this.$refs.video;
    if (videoListDom && videoListDom[this.videoIndex]) {
      const videoItem: any = this.videoList[this.videoIndex];
      const percent: number =
        videoListDom[this.videoIndex].currentTime /
        videoListDom[this.videoIndex].duration;
      const percentStr: string = Math.round(percent * this.screenWidth) + "px";
      if (percentStr !== videoItem.percent) {
        // videoItem.percent = percentStr;
        this.$set(videoItem, "percent", percentStr);
        console.log("percent", percent);
        console.log("percentStr", percentStr);
      }
    }
  }
  private paly(): void {
    console.log("this.$refs.video", this.$refs.video);
    console.log("this.videoIndex", this.videoIndex);
    const videoListDom: any = this.$refs.video;
    if (videoListDom && videoListDom[this.videoIndex]) {
      if (this.isPlaying) {
        videoListDom[this.videoIndex].pause();
      } else {
        videoListDom[this.videoIndex].play();
      }
    }
  }
  private toLike(videoItem: any, videoIndex: number): void {
    console.log("toLike");
    videoItem.isLike = !videoItem.isLike;
  }
  private toComment(videoItem: any, videoIndex: number): void {
    console.log("toComment");
    this.isShowComment = true;
    // 将数据取出
  }
  private toShare(videoItem: any, videoIndex: number): void {
    console.log("toShare");
  }

  private clickCommentOverlay(): void {
    console.log("clickCommentOverlay");
  }

  private created(): void {
    this.screenWidth = document.body.clientWidth;
  }
}
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
<style lang="scss" >
.home {
  .van-notice-bar {
    padding: 0;
  }
  .van-overlay {
    //  background-color: rgba(0,0,0,0);
    background-color: transparent;
  }
  .van-popup--bottom.van-popup--round {
    // border-radius: 6px 6px 0 0;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
  }
}
</style>

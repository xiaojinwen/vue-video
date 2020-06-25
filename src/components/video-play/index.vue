<template>
  <div class="video-play" :style="{
    height: screenHeight + 'px'
  }">
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
          <!-- 视频 最高缓存三个video -->
          <!-- :autoplay="videoIndex === index" -->
          <video
            v-if="index>=videoIndex-1 && index<=videoIndex+1"
            :ref="'video'+index"
            class="video"
            preload="auto"
            :poster="videoItem.poster"
            x5-video-orientation="portrait"
            x5-video-player-type="h5"
            x5-playsinline
            x-webkit-airplay="allow"
            :x5-video-player-fullscreen="true"
            webkit-playsinline
            playsinline
            t7-video-player-type="inline"
            loop
            @canplay="onCanPlay($event,index)"
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
          <img
            class="video-img"
            v-else
            :src="videoItem.poster"
            :alt="videoItem.title"
            :title="videoItem.title"
          />
          <!-- 右侧操作按钮 -->
          <div class="controls">
            <div class="like" @click.stop="toLike(videoItem,index)">
              <span class="iconfont like-icon icon-aixin" :class="videoItem.isLike?'islike':''"></span>
              <div class="like-text">{{videoItem.likeNum | number}}</div>
            </div>
            <div class="comment" @click.stop="toComment(videoItem,index)">
              <span class="iconfont comment-icon icon--pinglun"></span>
              <div class="comment-text">{{videoItem.commentNum | number}}</div>
            </div>
            <div class="share" @click.stop="toShare(videoItem,index)">
              <span class="iconfont share-icon icon-fenxiang"></span>
              <div class="share-text">{{videoItem.shareNum | number}}</div>
            </div>
          </div>
          <div v-show="!isProgressTouch" class="info">
            <div class="inner-info">
              <div class="title">
                <i>@</i>
                {{videoItem.title}}
              </div>
              <div class="desc">{{videoItem.desc}}</div>
              <van-notice-bar
                :speed="40"
                class="music"
                background="#ff000000"
                color="#ffffff"
                left-icon="music-o"
              >{{videoItem.music}}</van-notice-bar>
            </div>
          </div>
          <!-- 播放进度条 拖动时的进度状态显示 -->
          <div v-if="isProgressTouch && currentVideoDom" class="play-progress-detail">
            <div class="inner-progress-detail">
              <span
                class="position"
              >{{videoItem.percent / 100 * currentVideoDom.duration | durationFormat}}</span>
              <span class="split">/</span>
              <span class="total">{{currentVideoDom.duration | durationFormat}}</span>
            </div>
          </div>
          <!-- 播放进度条 -->
          <play-progress
            class="play-progress"
            :isTouch.sync="isProgressTouch"
            :percentage.sync="videoItem.percent"
            @progress="onProgress"
          />

          <!-- 播放按钮 -->
          <div class="play-icon playicon-animation" v-show="!isPlaying"></div>
        </div>
      </van-swipe-item>
    </van-swipe>

    <!-- 评论模块 -->
    <van-popup
      class="comment-deatil"
      v-model="isShowComment"
      round
      closeable
      position="bottom"
      :style="{ height: '55%' }"
      get-container="#app"
      @click-overlay="clickCommentOverlay"
      @close="onCommentBlur"
    >
      <div class="comment-num">{{currentVideoComment.commentNum | number}} 条评论</div>
      <div
        class="comment-list"
        v-if="currentVideoComment.list && currentVideoComment.list.length"
        :style="{
            paddingBottom: keyboardHeight + 50 +'px'
          }"
      >
        <div
          class="comment-item"
          v-for="(commentItem,commentIndex) in currentVideoComment.list"
          :key="commentItem.commentId"
        >
          <van-skeleton title avatar :row="3" :loading="commentLoading">
            <comment-item
              :avatar="commentItem.fromAvatar"
              :name="commentItem.fromName"
              :commentValue="commentItem.value"
              :toName="commentItem.toName"
              @click.native.stop="commentClick(commentItem)"
            ></comment-item>
            <div
              v-if="commentItem.totalChildrenNum && +commentItem.totalChildrenNum"
              class="comment-children"
            >
              <transition-group
                name="list"
                tag="div"
                v-bind:css="false"
                v-on:before-enter="beforeEnter"
                v-on:enter="enter"
                v-on:leave="leave"
              >
                <comment-item
                  v-for="(secondCommentItem,secondCommentIndex) in commentItem.children"
                  :key="secondCommentItem.commentId"
                  v-bind:data-index="secondCommentIndex"
                  class="second-comment-item"
                  :avatarWidth="26"
                  :avatar="secondCommentItem.fromAvatar"
                  :name="secondCommentItem.fromName"
                  :commentValue="secondCommentItem.value"
                  :toName="secondCommentItem.toName"
                  @click.native.stop="commentClick(commentItem,secondCommentItem)"
                ></comment-item>
              </transition-group>
              <div class="load-more-btn" @click.stop="loadMoreComment(commentItem,commentIndex)">
                <van-divider content-position="left">
                  <template v-if="commentItem.children.length>=commentItem.totalChildrenNum">
                    收起
                    <van-icon name="arrow-up" />
                  </template>
                  <template v-else>
                    展开{{commentItem.isShowMore && '更多' || commentItem.totalChildrenNum +'条'}}回复
                    <van-icon name="arrow-down" />
                  </template>
                </van-divider>
              </div>
            </div>
          </van-skeleton>
        </div>
      </div>
      <div class="comment-list-empty" v-else>
        <div class="text">暂无评论</div>
      </div>

      <div
        class="comment-msg"
        ref="commentMsg"
        :style="{
          marginBottom: keyboardHeight + 'px'
        }"
      >
        <van-field
          ref="commentInput"
          label-width="0px"
          v-model="commentMsg"
          center
          clearable
          label
          :placeholder="commentPlaceholder || '留下你的精彩评论吧'"
          @focus="onCommentFocus"
          @blur="onCommentBlur"
          @keyup.enter="sendClick"
        >
          <!-- native -->
          <template #button>
            <div class="comment-msg-btn">
              <div class="comment-msg-btn-item hf-box" @click.stop="hfClick">
                <span class="iconfont">@</span>
              </div>
              <div class="comment-msg-btn-item xl-box" @click.stop="xlClick">
                <span class="iconfont icon-biaoqing1"></span>
              </div>
              <div class="comment-msg-btn-item fs-box" @click.stop="sendClick">
                <span
                  class="iconfont icon-fasong"
                  :class="commentMsg && commentMsg.trim().length?'active':''"
                ></span>
              </div>
            </div>
          </template>
        </van-field>
      </div>
    </van-popup>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Ref } from "vue-property-decorator";
import { videoList, CommentObjInterface } from "./test-data";
import { getKeyboardHeight } from "@/utils/index.ts";
import { Notify } from "vant";
import { State, Getter, Action, Mutation, namespace } from "vuex-class";
import { UserInfo } from "@/store/modules/user/states";
const userModule = namespace("user");
const ua: any = navigator.userAgent.toLowerCase();
const isHuaWei = ua.indexOf("huaweibrowser") > -1;
const isMiui = ua.indexOf("miuibrowser") > -1;
@Component({
  components: {
    CommentItem: () => import("@/components/comment-item.vue"),
    playProgress: () => import("@/baseComponent/progress/index.vue")
  },
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
    },
    durationFormat(value: any) {
      function padStart(val: any) {
        return (Number.parseInt(val, 10) + "").padStart(2, "0");
      }
      if (value) {
        const duration = +value;
        const m = duration / 60;
        const s = duration % 60;
        const arr = [padStart(m), padStart(s)];
        return arr.join(":");
      }
      return value;
    }
  }
})
export default class Home extends Vue {
  // @loginnModule.State("userInfo") userInfo:UserInfo;
  @userModule.State("userInfo") userInfo: any;
  // @loginnModule.Getter getUserInfo;
  @Prop({
    type: Number
  })
  private screenWidth!: number; // 屏幕宽度 用于计算播放进度条
  @Prop({
    type: Number
  })
  private screenHeight!: number; // 屏幕高度 用于防止输入法弹出导致页面压缩
  @Ref() readonly commentInput!: any; // 评论输入框
  private videoIndex: number = 0; // 视频的位置
  private isPlaying: boolean = false; // 是否播放
  private isCanPlay: boolean = false; // 是否能够播放
  private isShowComment: boolean = false; // 是否显示评论详情
  private isProgressTouch: boolean = false; // 播放进度条是否为touch状态
  private videoList: any[] = videoList; // 视频数据

  private currentVideoComment: any = {
    commentNum: "0",
    list: []
  }; // 当前的评论数据
  private commentLoading: boolean = false;
  private currrentCommentLength: number = 0; // 当前点击操作的评论块长度
  private commentMsg: string = ""; // 评论留言
  private commentPlaceholder: string = ""; // 评论palceholder
  private keyboardHeight: number = 0; // 键盘高度
  private replyCommentObj: any; // 回复评论人的评论对象 comment下的对象
  private replySecondCommentObj: any; // 二级评论的对象 comment[index].children下的对象

  // 获取当前页面的video对象
  private get currentVideoDom(): any {
    return this.getVideoDom();
  }
  private getVideoDom(): any {
    const videoListDom: any = this.$refs[`video${this.videoIndex}`];
    console.log("videoListDom", videoListDom);
    if (videoListDom && videoListDom[0]) {
      return videoListDom[0];
    }
  }
  private beforeEnter(el: any): void {
    el.style.opacity = 1;
    el.style.height = "100%";
  }
  private enter(el: any, done: any): void {
    // const delay = el.dataset.index * 60;
    const delay = ((el.dataset.index > 10 && 10) || el.dataset.index) * 40;
    setTimeout(() => {
      // el.style.animation = "mylist-in 1s infinite";
      done();
    }, delay);
  }
  private leave(el: any, done: any): void {
    const index = this.currrentCommentLength - el.dataset.index - 1;
    const delay = ((index > 10 && 10) || index) * 40;
    setTimeout(() => {
      // el.style.animation = "mylist-out 1s infinite";
      done();
    }, delay);
  }

  private swipeChange(currentIndex: number): void {
    console.log("currentIndex", currentIndex);
    if (this.isPlaying) {
      // 暂停上个视频
      const currentVideoDom = this.currentVideoDom || this.getVideoDom();
      currentVideoDom && currentVideoDom.pause();
    }
    this.$nextTick(() => {
      // 播放下一个
      const currentVideoDom: any = this.$refs[`video${currentIndex}`];
      currentVideoDom && currentVideoDom[0] && currentVideoDom[0].play();
    });
    this.videoIndex = currentIndex;
  }

  private onCanPlay(event: any, index: number): void {
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
  // 播放时进度条变化
  private onTimeUpdate(): void {
    // 进度条触摸状态禁止
    if (this.isProgressTouch || !this.currentVideoDom) {
      return;
    }
    const videoItem: any = this.videoList[this.videoIndex];
    const currentVideoDom = this.currentVideoDom || this.getVideoDom();
    if (!currentVideoDom) {
      return;
    }
    const percent: number =
      (currentVideoDom.currentTime / currentVideoDom.duration) * 100;
    this.$set(videoItem, "percent", percent);
  }

  // 进度条被拖动或者被点击
  private onProgress(percentage: number): void {
    console.log("onProgress", percentage);
    const currentVideoDom = this.currentVideoDom || this.getVideoDom();
    if (!currentVideoDom) {
      return;
    }
    currentVideoDom.currentTime = (percentage / 100) * currentVideoDom.duration;
    !this.isPlaying && currentVideoDom.play();
  }

  public paly(): void {
    console.log("this.currentVideoDom", this.currentVideoDom);
    const currentVideoDom = this.currentVideoDom || this.getVideoDom();
    if (currentVideoDom) {
      this.isPlaying ? currentVideoDom.pause() : currentVideoDom.play();
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
    this.currentVideoComment.commentNum = videoItem.commentNum || 0;
    this.currentVideoComment.list = videoItem.comment || [];
    console.log("ua", navigator.userAgent);
  }
  private toShare(videoItem: any, videoIndex: number): void {
    console.log("toShare");
  }

  private clickCommentOverlay(): void {
    console.log("clickCommentOverlay");
  }

  // 点击加载评论
  private loadMoreComment(commentItem: any, commentIndex: number): void {
    console.log("loadMoreComment");
    this.currrentCommentLength =
      (commentItem.children && commentItem.children.length) || 0;
    if (commentItem.children.length >= commentItem.totalChildrenNum) {
      commentItem.children.splice(0);
    } else {
      // 模拟请求接口
      setTimeout(() => {
        commentItem.isShowMore = 1;
        const id = +Date.now();
        commentItem.children.push(
          ...[
            {
              value:
                "1我也是,对对对,真有趣,我也是,对对对,真有趣我也是,对对对,真有趣",
              toName: "雷神",
              fromName: "小明",
              commentId: id + 1
            },
            {
              value:
                "2我也是,对对对,真有趣,我也是,对对对,真有趣我也是,对对对,真有趣",
              toName: "雷神",
              fromName: "小明",
              commentId: id + 2
            },
            {
              value:
                "3我也是,对对对,真有趣,我也是,对对对,真有趣我也是,对对对,真有趣",
              toName: "雷神",
              fromName: "小明",
              commentId: id + 3
            }
          ]
        );
        if (commentItem.children.length > commentItem.totalChildrenNum) {
          commentItem.children.splice(
            commentItem.totalChildrenNum - 1,
            commentItem.children.length - commentItem.totalChildrenNum
          );
        }
      }, 300);
    }
  }

  public playOrPause(type: string): void {
    console.log("playOrPause", type);
    const currentVideoDom = this.currentVideoDom || this.getVideoDom();
    if (currentVideoDom) {
      if (type === "play") {
        currentVideoDom.play();
      } else if (type === "pause") {
        currentVideoDom.pause();
      }
    }
  }
  // 评论输入框聚焦
  private async onCommentFocus(e: any): Promise<any> {
    console.log("onCommentFocus");
    try {
      //  isMiui && (this.keyboardHeight = await getKeyboardHeight(void 0, e));
      isMiui && (this.keyboardHeight = 74);
      console.log("this.keyboardHeight", this.keyboardHeight);
    } catch (error) {
      console.error(error);
    }
  }

  // 评论输入框失焦
  private onCommentBlur(e: any): void {
    console.log("onCommentBlur");
    this.keyboardHeight = 0;
    if (!this.commentMsg) {
      this.$nextTick(() => {
        this.replyCommentObj = void 0;
        this.replySecondCommentObj = void 0;
        this.commentPlaceholder = "";
      });
    }
  }

  // 点击评论内容 评论某人
  private commentClick(commentItem: any, secondCommentItem: any): void {
    if (!commentItem) {
      return;
    }
    this.commentPlaceholder = `回复 ${(secondCommentItem &&
      secondCommentItem.fromName) ||
      commentItem.fromName}:`;
    this.commentInput.focus();
    // 储存点击评论信息
    console.log("commentItem", commentItem);
    this.replyCommentObj = commentItem;
    this.replySecondCommentObj = secondCommentItem;
  }
  // 点击 评论框@
  private hfClick(): void {}
  // 点击 评论框表情
  private xlClick(): void {}
  // 点击 评论框发送按钮
  private sendClick(): void {
    const value: string = (this.commentMsg && this.commentMsg.trim()) || "";
    if (!value) {
      return;
    }
    const replyCommentObj = this.replyCommentObj;
    const replySecondCommentObj = this.replySecondCommentObj;
    console.log("replyCommentObj", this.replyCommentObj);
    const { nickName, id } = this.userInfo; // 个人信息
    // 评论数据
    const commentObj: CommentObjInterface = {
      value,
      fromName: nickName || "",
      fromId: id || "",
      commentId: +Date.now(),
      ...(replyCommentObj
        ? {
            toName: replyCommentObj.fromName,
            toId: replyCommentObj.fromId,
            toCommentId: replyCommentObj.commentId || ""
          }
        : {}),
      ...(replySecondCommentObj
        ? {
            toName: replySecondCommentObj.fromName,
            toId: replySecondCommentObj.fromId,
            toCommentId: replySecondCommentObj.commentId || ""
          }
        : {})
    };
    const videoItem: any = this.videoList[this.videoIndex];
    if (replyCommentObj) {
      // 访问接口
      // 此处模拟
      if (
        !replyCommentObj.children ||
        !Array.isArray(replyCommentObj.children)
      ) {
        this.$set(replyCommentObj, "children", [commentObj]);
        // replyCommentObj.children = [commentObj];
      } else {
        // replyCommentObj.children.unshift(commentObj);
        replyCommentObj.children.push(commentObj);
      }
      (replyCommentObj.totalChildrenNum &&
        replyCommentObj.totalChildrenNum++) ||
        (replyCommentObj.totalChildrenNum = 1);
    } else {
      // 访问接口
      // 此处模拟
      if (!videoItem.comment || !Array.isArray(videoItem.comment)) {
        videoItem.comment = [commentObj];
      } else {
        videoItem.comment.push(commentObj);
      }
    }
    videoItem && videoItem.commentNum++;
    this.commentMsg = "";
  }

  private resize() {
    isMiui && (this.keyboardHeight = 74);
    window.innerHeight === this.screenHeight && (this.keyboardHeight = 0);
  }
  private created(): void {
    window.addEventListener("resize", this.resize);
  }
  private destoryed(): void {
    window.removeEventListener("resize", this.resize);
  }
}
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
<style lang="scss">
.video-play {
  .inner-info {
    .van-notice-bar {
      padding: 0;
      background-color: rgba(255, 255, 255, 0);
      color: #ffffff;
    }
  }
}
.comment-deatil {
  .van-overlay {
    //  background-color: rgba(0,0,0,0);
    background-color: transparent;
  }
  .van-popup--bottom.van-popup--round {
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
  }
  .van-popup__close-icon--top-right {
    // top: 8px;
    top: 46%;
    right: 10px;
    z-index: inherit;
    position: fixed;
  }
  .load-more-btn {
    .van-divider {
      margin: unset;
    }
  }
}
</style>

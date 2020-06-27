
export interface CommentObjInterface {
  value: string;
  fromName: string;
  fromId: string | number;
  commentId: string | number;
  toName?: string;
  toId?: string | number;
  toCommentId?: string | number;
}

// 视频数据
export const videoList: any[] = [

  {
    title: "哔哩哔哩【蛋仙】Girls-打算如何对我?【竖屏】高跟",
    desc: "【蛋仙】Girls-打算如何对我?【竖屏】高跟",
    music:
      "【蛋仙】Girls-打算如何对我",
    soure: [
      {
        src:
          "https://vdse.bdstatic.com//29e5747396f9348945779f0e9de5ce29.mp4?authorization=bce-auth-v1%2F40f207e648424f47b2e3dfbb1014b1a5%2F2020-06-20T21%3A40%3A46Z%2F-1%2Fhost%2F3173c37a774d79dfe68cff7739a304ea8db5d9f87e210f02a18652645011b6c3",
        type: "video/mp4"
      }
    ],
    poster:
      "https://vdgif.bdstatic.com//adbc863aaf78aa2e4b1ceab93bb4b182?x-bce-process=image/resize,m_fill,w_994,h_1766/format,f_jpg/quality,Q_100",
    likeNum: "635221122",
    commentNum: "0",
    shareNum: "3000",
    isLike: false,
    percent: 0,
    videoId: '44554',
    comment: []
  },

  {
    title: "【寄明月初次投稿】 【竖屏观看】",
    desc: "【寄明月初次投稿】 【竖屏观看】",
    music:
      "何为不可的原创音乐,何为不可的原创音乐,何为不可的原创音乐,何为不可的原创音乐,何为不可的原创音乐",
    soure: [
      {
        src:
          "https://vdse.bdstatic.com//a7d3ae4f86c03c44184f15b337221b60.mp4?authorization=bce-auth-v1%2F40f207e648424f47b2e3dfbb1014b1a5%2F2020-06-14T01%3A20%3A06Z%2F-1%2Fhost%2Fb18a31322a48a18fd061dd7f27e4ad40feedef66b31048683126777e256127a2",
        type: "video/mp4"
      }
    ],
    poster:
      "https://vdposter.bdstatic.com/c3365587dc0bbd28559129669b6c157f.jpeg?x-bce-process=image/resize,m_fill,w_994,h_1766/format,f_jpg/quality,Q_100",
    likeNum: "635221122",
    commentNum: "0",
    shareNum: "3000",
    isLike: false,
    percent: 0,
    videoId: '44554',
    comment: []
  },
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
    isLike: 1,
    percent: 0,
    videoId: '44555',
    comment: [
      {
        value: "笑死我了,笑死我了,笑6666666666666666666666666666666666",
        fromName: "笑傲浆糊",
        fromId: '8888',
        fromAvatar: "",
        totalChildrenNum: 4,
        isShowMore: 0, // 按钮变成展示更多回复
        commentId: "1",
        videoId: '44555',
        children: [
          {
            value: "我也是",
            fromName: "小明",
            fromId: '11233',
            commentId: "233"
          },
          {
            value:
              "我也是,对对对,真有趣,我也是,对对对,真有趣我也是,对对对,真有趣",
            toName: "雷神",
            fromName: "小明",
            fromId: '11233',
            commentId: "1334"
          }
        ]
      },
      {
        value: "小姐姐跳舞好棒",
        fromName: "郭德纲",
        fromId: '99999',
        fromAvatar: "",
        totalChildrenNum: 40,
        commentId: "2",
        videoId: '44555',
        children: [
          {
            value: "真好看",
            fromName: "留连往返",
            fromId: '2333',
            commentId: "555"
          },
          {
            value: "嗯嗯",
            toName: "留连往返",
            fromName: "小黄狗",
            fromId: '6666',
            commentId: "556"
          }
        ]
      }
    ]
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
    percent: 0,
    videoId: '44556',
    comment: [
      {
        value: "笑死我了,笑死我了,笑6666666666666666666666666666666666",
        fromName: "笑傲浆糊",
        fromId: '8888',
        fromAvatar: "",
        totalChildrenNum: 4,
        isShowMore: 0, // 按钮变成展示更多回复
        commentId: "3",
        videoId: '44556',
        children: [
          {
            value: "我也是",
            fromName: "小明",
            fromId: '11233',
          },
          {
            value:
              "我也是,对对对,真有趣,我也是,对对对,真有趣我也是,对对对,真有趣",
            toName: "雷神",
            fromName: "小明",
            fromId: '11233',
          }
        ]
      },
      {
        value: "小姐姐跳舞好棒",
        fromName: "郭德纲",
        fromAvatar: "",
        videoId: '44556',
        totalChildrenNum: 40,
        children: []
      }
    ]
  },
  {
    title: "女神带你观看美丽风景",
    desc: "【风车·韩语】K.A.R.D《Hola Hola》竖屏特别版MV公开",
    music:
      "何为不可的原创音乐,何为不可的原创音乐,何为不可的原创音乐,何为不可的原创音乐,何为不可的原创音乐",
    soure: [
      {
        src:
          "https://vdse.bdstatic.com//a24408101b18451c27c8ae461c4901db.mp4?authorization=bce-auth-v1%2F40f207e648424f47b2e3dfbb1014b1a5%2F2020-06-13T22%3A34%3A55Z%2F-1%2Fhost%2F17a2e397e3859dfdfbdc18d9c3823426468f1c9bf7387af9a2ebf4f1acc22d97",
        type: "video/mp4"
      }
    ],
    poster:
      "https://vdgif.bdstatic.com//7de8ae259b7b3e4f675aa623c5b35f94?x-bce-process=image/resize,m_fill,w_994,h_1766/format,f_jpg/quality,Q_100",
    likeNum: "635221122",
    commentNum: "6221",
    shareNum: "3000",
    isLike: false,
    percent: 0,
    videoId: '44557',
    comment: []
  },
  {
    title: "女神带你观看美丽风景",
    desc: "【风车·韩语】K.A.R.D《Hola Hola》竖屏特别版MV公开",
    music:
      "何为不可的原创音乐,何为不可的原创音乐,何为不可的原创音乐,何为不可的原创音乐,何为不可的原创音乐",
    soure: [
      {
        src:
          "https://vdse.bdstatic.com//fb486fdd7137ac6c52a356b7f63a2c26.mp4?authorization=bce-auth-v1%2F40f207e648424f47b2e3dfbb1014b1a5%2F2020-06-19T07%3A37%3A38Z%2F-1%2Fhost%2Ff15561a8c20285b3a12f67df4c8d51077014aec50030d183405426a0aa801bb8",
        type: "video/mp4"
      }
    ],
    poster:
      "https://vdposter.bdstatic.com/4db29b46d8b8134fcbdc03e3a3126a5b.jpeg?x-bce-process=image/resize,m_fill,w_994,h_1766/format,f_jpg/quality,Q_100",
    likeNum: "635221122",
    commentNum: "6221",
    shareNum: "3000",
    isLike: false,
    percent: 0,
    videoId: '44558',
    comment: []
  },
  {
    title: "200516 [IU] &#039;eight&#039; Acoustic Ver. Live Clip 竖",
    desc: "200516 [IU] &#039;eight&#039; Acoustic Ver. Live Clip 竖",
    music:
      "何为不可的原创音乐,何为不可的原创音乐,何为不可的原创音乐,何为不可的原创音乐,何为不可的原创音乐",
    soure: [
      {
        src:
          "https://vdse.bdstatic.com//09798a6b6ccfc41ab61ef3e5bc704e68.mp4?authorization=bce-auth-v1%2F40f207e648424f47b2e3dfbb1014b1a5%2F2020-05-25T03%3A03%3A20Z%2F-1%2Fhost%2Fa3065aac370de90c87bdb705590ec1784e93ddacde60a2cb27fb760f399f92ed",
        type: "video/mp4"
      }
    ],
    poster:
      "https://vdposter.bdstatic.com/10adede4593bb17ed2bbe4bb64ad43f4.jpeg?x-bce-process=image/resize,m_fill,w_994,h_1766/format,f_jpg/quality,Q_100",
    likeNum: "635221122",
    commentNum: "6221",
    shareNum: "3000",
    isLike: false,
    percent: 0,
    videoId: '44559',
    comment: []
  },
];

export const emoji: any = {
  1: "😀",
  2: "😬",
  3: "😁",
  4: "😂",
  5: "🤣",
  6: "🥳",
  7: "😃",
  8: "😄",
  9: "😅",
  10: "😆",
  11: "😇",
  12: "😉",
  13: "😊",
  14: "🙂",
  15: "🙃",
  16: "😋",
  17: "😌",
  18: "😍",
  19: "🥰",
  20: "😘",
  21: "😙",
  22: "😚",
  23: "😜",
  24: "🤪",
  25: "🤨",
  26: "🧐",
  27: "😝",
  28: "😛",
  29: "🤑",
  30: "🤓",
  31: "😎",
  32: "🤩",
  33: "🤡",
  34: "🤠",
  35: "🤗",
  36: "😏",
  37: "😶",
  38: "😗",
  39: "😐",
  40: "😑",
  41: "😒",
  42: "🙄",
  43: "🤔",
  44: "🤥",
  45: "🤭",
  46: "🤫",
  47: "🤬",
  48: "🤯",
  49: "😳",
  50: "😞",
  51: "😟",
  52: "😠",
  53: "😡",
  54: "😔",
  55: "😕",
  56: "🙁",
  57: "☹",
  58: "😣",
  59: "😖",
  60: "😫",
  61: "😩",
  62: "🥺",
  63: "😤",
  64: "😮",
  65: "😱",
  66: "😨",
  67: "😰",
  68: "😯",
  69: "😦",
  70: "😧",
  71: "😢",
  72: "😥",
  73: "🤤",
  74: "😪",
  75: "😓",
  76: "🥵",
  77: "🥶",
  78: "😭",
  79: "😵",
  80: "😲",
  81: "🤐",
  82: "🤢",
  83: "🤧",
  84: "🤮",
  85: "😷",
  86: "🤒",
  87: "🤕",
  88: "🥴",
  89: "😴",
};

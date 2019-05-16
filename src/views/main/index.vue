<template>
  <div class="main sp-scroll" v-scroll="loadmore">
    <div class="slide-block">
      <cube-slide ref="slide" :data="items">
        <cube-slide-item v-for="(item, index) in items" :key="index">
          <img :src="item">
        </cube-slide-item>
      </cube-slide>
    </div>
    <div class="article-type-block" :class="{blockfixed: scrollToType}">
      <!-- <div class="more">
        <i class="iconfont iconhome_more" @click="$router.push('/main/article-type')"></i>
      </div> -->
      <div class="article-type-box">
          <div
        class="scroll-view-item"
        v-for="(item, index) in articleTypes"
        :key="index"
        @click="chooseType(item)"
      >
        <span :class="{active: activeType == item}">{{item}}</span>
      </div>
      </div>
      
      <div class="more">
        <i class="iconfont iconhome_more" @click="$router.push('/main/article-type')"></i>
      </div>
    </div>
    <div class="article-list-block" :class="{blockpaddding: scrollToType}">
      <div v-for="item in count" :key="item" @click="goTo">
        <div class="article-list-item">
          <div class="img">
            <img src="https://images.sipinoffice.com/common/4CB354CF6EE845A3BFB26A9A82302D40.png">
          </div>
          <div class="content">
            <div
              class="content-top"
            >产品实验：...产品实验产品实验产品实验产品实验产品实验产品实验产品实验产品实验产品实验产品实验产品实验产品实验产品实验产品实验产品实验产品实验产品实验</div>
            <div class="content-bottom">
              <i class="iconfont iconcard_browse"></i>
              <span style="margin-right: 50px;">1298</span>
              <i type class="iconfont iconcard_share"></i>
              <span>345</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
        bannerHeight: 620,
      count: 10,
      scrollToType: false,
      items: [
        "https://images.sipinoffice.com/common/banner1.jpg",
        "https://images.sipinoffice.com/common/banner2.jpg"
      ],
      activeType: "纳米技术",
      articleTypes: [
        "纳米技术",
        "健康",
        "美容",
        "小家电",
        "日化",
        "公司",
        "娱乐",
        "小视频",
        "红酒",
        "养生",
        "科技",
        "NBA",
        "军事"
      ]
    };
  },
  mounted() {
    let _this = this;
    let el = this.$el;
    el.addEventListener("scroll", function() {
      _this.scrollToType = el.scrollTop > _this.bannerHeight;
    });
  },
  methods: {
      goTo() {
          this.$router.push('/article?docid=' + 1);
      },
    setScroll() {
      if (this.$el.scrollTop < this.bannerHeight) {
        let top = this.$el.scrollTop;
        let timer = setInterval(() => {
          if (top > this.bannerHeight) clearInterval(timer);
          top += 10;
          this.$el.scrollTop = top;
        }, 1);
      }
    },
    loadmore() {
      this.count += 5;
    },
    chooseType(item) {
      this.setScroll();
      this.activeType = item;
    }
  }
};
</script>
<style lang="less" scoped>
.main {
  min-height: 100%;
  .slide-block {
    height: 414px/2;
    img {
      width: 100%;
      // max-height: 414px/2;
    }
  }
  .article-type-block {
    box-shadow: 0px 0px 18px 2px rgba(0, 0, 0, 0.1);
    width: 100%;
    z-index: 10;
    background: white;
    height: 45px;
    position: relative;
    display: flex;
    .article-type-box{
        white-space: nowrap;
        flex: 1;
        overflow-x: auto;
    }
    .more {
      height: 45px;
      width: 45px;
      background: rgba(255, 255, 255, 1);
      color: RGBA(151, 160, 177, 1);
      text-align: center;
      line-height: 45px;
    }
    &.blockfixed {
      position: fixed;
      top: 0;
    }
    .scroll-view-item {
      height: 45px;
      line-height: 45px;
      text-align: center;
      display: inline-block;
      padding: 0 10px;
      // width: 100upx;
      font-size: 15px;
      &:first-child {
        padding-left: 15px;
      }
      &:last-child {
        padding-right: 15px;
      }
      > span {
        &.active {
          border-bottom: 2px solid rgba(30, 210, 154, 1);
        }
      }
    }
  }
  .article-list-block {
    &.blockpaddding {
      padding-top: 45px;
    }
    .article-list-item {
      box-sizing: border-box;
      background: white;
      height: 100px;
      padding: 15px;
      margin-bottom: 5px;
      display: flex;
      &:last-child {
        border: none;
      }
      .img {
        width: 100px;
        > img {
          width: 90px;
          height: 70px;
          border-radius: 2px;
        }
      }
      .content {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .content-top {
          font-weight: bold;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          font-size: 15px;
          line-height: 1.3;
        }
        .content-bottom {
          display: flex;
          align-items: center;
          // padding: 10upx 0;
          color: rgba(151, 160, 177, 1);
          font-size: 12px;
          .iconfont {
            font-size: 11px;
            margin-right: 5px;
            // color: rgba(151, 160, 177, 1);
          }
        }
      }
    }
  }
}
</style>

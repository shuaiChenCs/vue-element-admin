<template>
  <div class="main sp-scroll" v-scroll="loadmore">
    <div class="slide-block">
      <cube-slide ref="slide" :data="indexData.indexBannerVO">
        <cube-slide-item v-for="(item, index) in indexData.indexBannerVO" :key="index">
          <img :src="item.bannerUrl">
        </cube-slide-item>
      </cube-slide>
    </div>
    <div class="article-type-block" :class="{blockfixed: scrollToType}">
      <!-- <div class="more">
        <i class="iconfont iconhome_more" @click="$router.push('/main/article-type')"></i>
      </div>-->
      <div class="article-type-box">
        <div
          class="scroll-view-item"
          v-for="(item, index) in indexData.newsCategoryVOList"
          :key="index"
          @click="chooseType(item)"
        >
          <span :class="{active: activeType == item.categoryName}">{{item.categoryName}}</span>
        </div>
      </div>

      <div class="more">
        <i class="iconfont iconhome_more" @click="$router.push('/main/article-type')"></i>
      </div>
    </div>
    <div class="article-list-block" :class="{blockpaddding: scrollToType}">
      <div v-for="(item, index) in articleList" :key="index" @click="goTo(item)">
        <div class="article-list-item">
          <div class="img">
            <img :src="item.newsThumbnail">
          </div>
          <div class="content">
            <div class="content-top">{{item.newsTitle}}</div>
            <div class="content-bottom">
              <i class="iconfont iconcard_browse"></i>
              <span style="margin-right: 50px;">{{item.readQuantity}}</span>
              <i type class="iconfont iconcard_share"></i>
              <span>{{item.shareQuantity}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
    import eventBus from '@/lib/eventBus.js'
export default {
  data() {
    return {
      indexData: {
        indexBannerVO: [],
        newsCategoryVOList: []
      },
      formData: {
        categoryId: 0,
        current: 1,
        size: 10
      },
      bannerHeight: 207,
      count: 10,
      scrollToType: false,
      oldActiveType: '推荐',
      activeType: "推荐",
      articleList: [],
      scrollTop: 0
    };
  },
    created(){
        if(sessionStorage.token) {
            this.getIndex();
            this.getArticleList(this.formData);
        }else{
            let vm = this;
            eventBus.$once('setToken',function(){
                vm.getIndex();
                vm.getArticleList(vm.formData);
            });
        }
    },
  mounted() {
    let _this = this;
    let el = this.$el;
    el.addEventListener("scroll", function() {
      _this.scrollToType = el.scrollTop > _this.bannerHeight;
      _this.scrollTop = el.scrollTop;
    });
  },
  activated() {
    this.$el.scrollTop = this.scrollTop;
  },
  methods: {
    getArticleList(params) {
      axios.post(this.$apiConfig.getArticle, params).then(res => {
        if (res.data.code == 0) {
          if(this.oldActiveType == this.activeType) {
            this.articleList = this.articleList.concat(
              res.data.data.records || []
            );
          }else{
            this.articleList = res.data.data.records || [];
            this.oldActiveType = this.activeType;
          }
        }
      });
    },
    getIndex() {
      axios.get(this.$apiConfig.getIndex).then(res => {
        if (res.data.code == 0) {
          this.indexData = res.data.data || {};
        }
      });
    },
    goTo(item) {
      this.$router.push("/main/article-h5?docid=" + item.id);
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
      this.formData.current++;
      this.getArticleList(this.formData);
    },
    chooseType(item) {
      this.setScroll();
      this.activeType = item.categoryName;
      this.formData.categoryId = item.id;
      this.formData.current = 1;
      this.getArticleList(this.formData);
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
    .article-type-box {
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
          padding-bottom: 3px;
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

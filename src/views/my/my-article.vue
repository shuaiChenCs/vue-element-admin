<template>
  <div class="my-article sp-scroll" v-scroll="loadmore">
    <div class="article-list-block" v-if="!nodata">
      <div v-for="(item, index) in articleList" :key="index" @click="chooseItem(item)">
        <div class="article-list-item">
            <div class="check-block">
                <cube-checkbox v-model="item.isChoose" class="with-click">{{''}}</cube-checkbox>
            </div>
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
      <no-more></no-more>
    </div>
    <no-article v-if="nodata"></no-article>
    <fixed-button :title="'删除'" @clickHandler="deleteArticle"></fixed-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      nomore: false,
      nodata: false,
      formData: {
        current: 1,
        size: 10
      },
      articleList: []
    };
  },
  mounted() {
    this.getMyArticle();
  },
  methods: {
      deleteArticle() {
          let deletes = this.articleList.filter(item => item.isChoose).map(item => item.id);
          console.log(deletes)
      },
      chooseItem(item) {
          item.isChoose = !item.isChoose;
      },
      loadmore() {
          this.formData.current++;
          this.getMyArticle();
      },
    getMyArticle() {
      axios.post(this.$apiConfig.getMyArticle, this.formData).then(res => {
        let d = res.data.data.records || [];
        this.nomore = d.length == 0;
        this.articleList = this.articleList.concat(d);
        this.nodata = this.articleList.length == 0;
      });
    }
  }
};
</script>
<style lang="less" scoped>
.my-article {
    padding-bottom: 64px;
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
      .check-block{
          width: 30px;
          display: flex;
          align-items: center;
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



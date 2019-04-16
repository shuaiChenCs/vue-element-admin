<template>
  <div class="goods-add">
    <div class="block-item-title">
      <i class="iconfont iconcard_pause"></i>
      封面轮播(1≤上传张数≤6)
    </div>
    <div class="block-item">
      <div class="banner">
        <sp-upload @success="bannerSuccess" v-model="fileList" :type="'goods'" :max="6"></sp-upload>
      </div>
      <div class="input-text">
        <span>商品名称</span>
        <input type="text" placeholder="请输入商品名称">
      </div>
      <div class="input-text">
        <span>商品价格</span>
        <input type="text" placeholder="请输入商品价格">
      </div>
    </div>

    <div class="block-item-title">
      <i class="iconfont iconcard_pause"></i>
      商品详情
    </div>
    <div class="block-item">
      <div class="detail-list" v-for="(item, index) in detail" :key="index">
        <div class="img-video" v-if="item.url">
          <img :src="item.url" alt="" v-if="item.type == 'image/*'">
          <sp-video :src="item.url" v-else></sp-video>
        </div>
        <div class="detial">
          <textarea v-model="item.content" placeholder="请输入"></textarea>
        </div>
        <div class="handler">
          <i class="iconfont iconcard_edit_delete"></i>
        </div>
      </div>
    </div>
    <div class="block-item last">
      <div class="block-add">
        <div class="title">创建新详情</div>
        <div class="add">
          <div class="add-t" @click="addContent">
            
          </div>
          <div class="add-img">
            <alone-upload @success="uploadSuccess" :type="'goods'"></alone-upload>
          </div>
          <div class="add-video">
            <alone-upload @success="uploadSuccess" :accept="'video/*'" :type="'goods'"></alone-upload>
          </div>
        </div>
      </div>
    </div>
    <fixed-button :title="'保存'" @clickHandler="save"></fixed-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      fileList: [],
      detail: [],
      banner: []
    };
  },
  methods: {
    save() {

    },
    bannerSuccess(obj) {
      this.banner.push(obj.realpath);
      console.log(this.banner)
    },
    uploadSuccess(obj) {
      let detailObj = {
        url: obj.realpath,
        content: '',
        type: obj.type
      }
      this.detail.push(detailObj);
    },
    addContent() {
      let detailObj = {
        url: '',
        content: '',
        type: ''
      }
      this.detail.push(detailObj);
    }
  }
};
</script>
<style lang="less" scoped>
.goods-add {
  min-height: 100%;
  .block-item {
    &.last{
      padding-bottom: 128px/2;
    }
    padding: 0 15px 0 15px;
    background: white;
    .banner {
      border-bottom: 1px solid rgba(237, 238, 241, 1);
    }
    .input-text {
      border-bottom: 1px solid rgba(237, 238, 241, 1);
      align-items: center;
      height: 109px/2;
      display: flex;
      justify-content: space-between;
      font-size: 15px;
      span {
        width: 65px;
      }
      input {
        flex: 1;
        height: 100%;
        text-align: right;
      }
    }
    .block-add {
      background: white;
      padding-bottom: 15px;
      .title {
        font-size: 15px;
        height: 45px;
        line-height: 45px;
      }
      .add {
        padding: 40px 145px/2;
        align-items: center;
        display: flex;
        justify-content: space-around;
        background: rgba(243, 245, 247, 1);
        border-radius: 5px;
        > div {
          width: 40px;
          height: 40px;
          overflow: hidden;
          border-radius: 50%;
        }
        .add-t {
          background: url("http://img.hrsugaphre.com/sipin/images/card_edit_text.png")
            no-repeat;
          background-size: cover;
        }
        .add-img {
          background: url("http://img.hrsugaphre.com/sipin/images/card_edit_picture_1.png")
            no-repeat;
          background-size: cover;
        }
        .add-video {
          background: url("http://img.hrsugaphre.com/sipin/images/card_edit_video.png")
            no-repeat;
          background-size: cover;
        }
      }
    }
    .detail-list{
      border-bottom: 1px solid rgba(237, 238, 241, 1);
      padding: 15px 0;
      display: flex;
      .img-video{
        width: 70px;
        height: 70px;
        border-radius: 5px;
        margin-right: 10px;
        img,video{
          height: 100%;
          width: 100%;
        }
      }
      .handler{
        width: 15px;
        .iconfont{
          color:RGBA(204, 210, 219, 1);
        }
      }
      .detial{
        height: 70px;
        flex: 1;
        textarea{
          font-size: 15px;
          border: none;
          height: 100%;
          width: 100%;
        }
      }
    }
  }
}
</style>



<template>
  <div class="make-article">
    <div class="input-block">
      <input type="text" placeholder="请输入文章链接" v-model="url">
    </div>
    <div class="howtodo">
        <div class="title">
            <img src="@/assets/images/question.png" alt="">
            如何获取微信公众号文章链接地址
        </div>
        <div class="redus">
            <p>当前心脉支持转发微信公众号文章。</p>
            <p>在文章页面的右上角点击“菜单”按钮，在弹出的菜单即可找到“复制链接”的选项。</p>
        </div>
        <div class="img-block">
            <img src="@/assets/images/help.jpg" alt="">
        </div>
    </div>
    <fixed-button :title="'生成文章'" @clickHandler="makeArticle"></fixed-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      url: ""
    };
  },
  methods: {
    makeArticle() {
        if(!this.url) {
            this.$createToast({
                txt: '请输入文章链接',
                type: 'txt'
            }).show();
            return;
        }
        let params = {
            url: this.url
        }
        const toast = this.$createToast({
            txt: '生成中...',
            mask: true,
            time: 0
        });
        toast.show();
      axios.post(this.$apiConfig.makeArticle, params).then(res => {
          if(res.data.code == 0) {
              let d= res.data.data;
              setTimeout(() => {
                  toast.hide();
                  this.$router.push("/main/article-h5?docId=" + d.newsId);
              }, 1000);
          }else{
              toast.hide();
              this.$createToast({
                txt: '该链接生成文章失败',
                type: 'txt'
              }).show();
          }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.make-article {
    background: white !important;
    min-height: 100%;
    .howtodo{
        font-size: 13px;
        padding: 15px;
        .title{
            font-size: 14px;
            padding: 0 0 15px 0;
            display: flex;
            align-items: center;
            img{
                width: 15px;
                margin-right: 10px;
            }
            border-bottom: 1px solid #ccc;
        }
        .img-block{
            text-align: center;
            img{
                width: 59%;
            }
        }
        .redus{
            padding: 15px;
            p{
                padding: 5px 0;
                line-height: 1.3
            }
        }
    }
  .input-block {
      background: #F8F8F8;
      padding: 15px;
    > input {
      width: 100%;
      height: 32px;
      // line-height: 32px;
      background: white;
      border-radius: 16px;
      padding-left: 15px;
      // color:rgba(204,210,219,1);
      font-size: 13px;
    }
  }
}
</style>



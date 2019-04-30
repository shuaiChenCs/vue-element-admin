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
        <input type="text" v-model="name" placeholder="请输入商品名称">
      </div>
      <div class="input-text">
        <span>商品价格</span>
        <input type='text' v-model="price" placeholder="请输入商品价格"  onkeyup="this.value=(this.value.match(/^\d+\.?\d*/)||[''])[0]" maxlength="11" />
      </div>
      <div class="input-text">
        <span>商品分类</span>
        <input type='text' v-model="type" placeholder="请输入商品分类"  maxlength="6" />
      </div>
      <div class="tags">
        <div class="tag-item"  v-for="(type,index) in typeList" :key="index" @click="typeClick(type)">
          {{type.name}}
          <i class="iconfont iconpopup_close" @click.self.stop="delType(type.id,index)"></i>
        </div>
      </div>
    </div>

    <div class="block-item-title">
      <i class="iconfont iconcard_pause"></i>
      商品详情
    </div>
    <div class="block-item">
      <div class="detail-list" v-for="(item, index) in detail" :key="index">
        <div class="img-video" v-if="item.multimediaUrl">
          <img :src="item.multimediaUrl" alt="" v-if="item.multimediaType == '1'">
          <sp-video :src="item.multimediaUrl" v-else></sp-video>
        </div>
        <div class="detial">
          <textarea v-model="item.content" placeholder="请输入"></textarea>
        </div>
        <div class="handler">
          <i class="iconfont iconcard_edit_delete" @click="delDetail(index)"></i>
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
    <fixed-button :title="'保存'" :disabled="name.length==0 || banner.length==0" @clickHandler="save"></fixed-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      fileList: [],
      detail: [],
      banner: [],
        name:'',
        price:'',
        type:'',
        typeId:0,
        typeList:[],
        addRequest:true,
        selectTypeName:''
    };
  },
    created(){
        axios.post(this.$apiConfig.getGoodsType+"?cardId="+this.$store.state.card.id,{}).then(res=>{
            if(res.data.code==0){
                this.typeList = res.data.data.splice(1);
            }
        })
    },
  methods: {
      delType(typeId,index){
          let vm = this;
          this.$createDialog({
              type: 'confirm',
              content: '确认是否删除',
              onConfirm(e){
                axios.delete(vm.$apiConfig.delGoodsType+typeId,{}).then(res=>{
                    if(res.data.code==0){
                        vm.typeList.splice(index,1);
                    }else if(res.data.code ==3001){
                        vm.$createDialog({
                            type: 'alert',
                            showClose: true,
                            title: res.data.message,
                            onClose: () => {
                                this.$createToast({
                                    type: 'warn',
                                    time: 1000,
                                    txt: '点击关闭按钮'
                                }).show()
                            }
                        }).show()
                    }
                });
              }
          }).show()
      },
      typeClick(type){
          this.typeId=type.id;
          this.type=type.name;
          this.selectTypeName = type.name;
      },
      delDetail(index){
        this.detail.splice(index,1);
      },
    save() {
          if(this.addRequest) {
              this.addRequest=false;
              let params = {
                  name: this.name,
                  price: this.price,
                  type: this.type,
                  typeId: this.selectTypeName!=this.type?0:this.typeId,
                  bannerList: this.banner,
                  infoList: this.detail
              };
              let vm = this;
              axios.post(this.$apiConfig.addGoods, params).then((res) => {
                  vm.ddRequest=true;
                  if (res.data.code == 0) {
                      vm.$router.push('/my/goods')
                  }
              });
          }
    },
    bannerSuccess(arr) {
        this.banner = arr.map(res=>{
            return res['realpath'];
        })
    },
    uploadSuccess(obj) {
        let type ="";
        if(obj.type=='image/*'){
            type=1;
        }else if(obj.type=='video/*'){
            type=2;
        }

      let detailObj = {
        multimediaUrl: obj.realpath,
        content: '',
        multimediaType: type
      }
      this.detail.push(detailObj);
    },
    addContent() {
      let detailObj = {
          multimediaUrl: '',
          content: '',
          multimediaType: ''
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
    .tags{
      display: flex;
      margin-top:10px;
      flex-wrap: wrap;
      .tag-item {
        position: relative;
        padding: 10px 15px;
        background: #f8f8f8;
        margin-right: 10px;
        margin-bottom: 10px;
        border-radius: 20px;
        .iconpopup_close {
          position: absolute;
          top: -5px;
          right: -5px;
        }
      }
    }
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



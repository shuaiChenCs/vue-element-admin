<template>
  <div class="goods sp-scroll" v-scroll="loadmore">
    <div class="goods-header">
      <div class="top">
        <img class="head" :src="selfCard.headImg" alt>
        <div class="info">
          <span class="name">{{selfCard.cardName}}</span>
          <span class="view">商品量 {{goods.total}} 浏览量 {{goods.browse}}</span>
        </div>
        <img class="goodimg" src="@/assets/images/shop_top_bg@3x.png" alt>
      </div>
      <div class="search">
        <i class="cubeic-search"></i>
        <input type="text" @input="inputFun" placeholder="搜索">
      </div>
    </div>
    <div class="goods-type">
      <div class="h-scroll">
        <ul class="goods-ul">
          <li v-for="(item,index) in type " :class="{'active':typeId==item.id}" @click="typeClick(item.id)">{{item.name}}</li>
        </ul>
      </div>
    </div>
    <div class="goods-box">
      <div class="goods-item" v-for="(item,index) in data" :key="index">
        <div class="img">
          <img :src="item.imgUrl" @click="clickGoods(item)" alt>
        </div>
        <div class="name">{{item.name}}</div>
        <div class="handler">
          <span>￥{{item.price}}</span>
          <i class="cubeic-more" @click="set(item.id,index)"></i>
        </div>
      </div>
    </div>
    <fixed-button :title="'添加商品'" @clickHandler="addGoods"></fixed-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
        goodsName:'',
        typeId:0,
        selfCard:this.$store.state.card,
      data: [],
        goods:{},
        type:[],
      current: 1,
      size: 10
    };
  },
  created() {
    this.loadData();
      this.loadType();
  },
  methods: {
      clickGoods(item){
          this.$router.push({name:'goods-detail',params:{id:item.id}});
      },
      showDeleteAlert(id,dataIndex) {
          let vm = this;
          this.$createDialog({
              type: 'confirm',
              content: '确认是否删除',
              onConfirm(e){
                  axios.delete(vm.$apiConfig.delGoods+'/'+id,{}).then((res)=>{
                      if(res.data.code==0) {
                          vm.goods.total= vm.goods.total-1;
                          vm.data.splice(dataIndex,1);
                          vm.$createToast({
                              time: 100
                          }).show();
                      }
                  });
              }
          }).show()

      },
      inputFun(e){
          this.current=1;
          this.goodsName = e.target.value;
          this.data=[];
          this.loadData();
      },
      typeClick(id){
          this.typeId=id;
          this.current=1;
          this.data=[];
          this.loadData();
      },
    set(id,dataIndex) {
      this.$createActionSheet({
                    // title: '置顶',
                    active: 2,  //高亮
                    data: [
                        {
                            content: '置顶'
                        },
                        {
                            content: '编辑',
                        },
                        {
                            content: '删除',
                            // class: 'color:#ff0000'    //颜色红色
                        }
                    ],
                    onSelect: (item, index) => {
                        switch (index) {
                            case 0:
                                axios.post(this.$apiConfig.setGoodTop+"?id="+id,{}).then((res)=>{
                                   if(res.data.code==0){
                                       let top = this.data.splice(dataIndex,1);
                                       this.data.unshift(top[0]);
                                       this.$createToast({
                                           txt: ``,
                                           time: 100
                                       }).show();
                                   }
                                });

                                break;
                            case 1:
                                this.$router.push({name:'goods-edit',params:{id:id}});
                                break;
                            case 2:
                                this.showDeleteAlert(id,dataIndex);
                                break;
                        }

                    }
                }).show()
    },
    addGoods() {
      this.$router.push('/my/goods/add');
    },
      loadType(){
          let vm = this;
        axios.post(this.$apiConfig.getGoodsType+'?cardId='+this.selfCard.id,null).then((res)=>{
            if(res.data.code== '0'){
                vm.type = res.data.data;
            }
        });
      },
    loadData() {
      axios
        .post(this.$apiConfig.getGoodsList, {
          current: this.current,
          size: this.size,
            cardId:this.selfCard.id,
            name:this.goodsName,
            typeId:this.typeId
        })
        .then(res => {

          if (res.data.code == "0" && res.data.data.records.length>0) {
              this.goods = res.data.data;
            this.data = this.data.concat(this.goods.records);
          }else{
              this.current--;
          }
        });
    },
    loadmore() {
      this.current++;
      this.loadData();
    }
  }
};
</script>
<style lang="less" scoped>
.goods {
	padding-bottom: 64px;
  .goods-header {
    height: 284px/2;
    background: linear-gradient(
      45deg,
      rgba(11, 196, 183, 1) 0%,
      rgba(43, 217, 144, 1) 100%
    );
    color: white;
    .top {
      width: 100%;
      display: flex;
      padding: 10px 15px;
      align-items: center;
      .head {
        height: 50px;
        width: 50px;
        border-radius: 50%;
        margin-right: 10px;
      }
      .goodimg {
        height: 80px;
        width: 196px/2;
        margin-right: 25px;
      }
      .info {
        flex: 1;
        // margin-right: 50px;
        color: white;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        .name {
          font-size: 15px;
          margin-bottom: 10px;
        }
        .view {
          font-size: 12px;
        }
      }
    }
    .search {
      position: relative;
      padding: 0 15px;
      i {
        position: absolute;
        left: 28px;
        top: 10px;
        font-size: 15px;
        color: #d2d8df;
      }
      input {
        width: 100%;
        height: 32px;
        // line-height: 32px;
        background: white;
        border-radius: 16px;
        padding-left: 65px/2;
        // color:rgba(204,210,219,1);
        font-size: 13px;
      }
    }
  }
  .goods-type {
    .goods-ul{
      padding: 20px 15px;
      li{
        display: inline-block;
        margin-right: 25px;
        font-size: 13px;
        &.active{
          border-bottom: 2px solid #1ED29A;
        }
      }
    }
  }
  .goods-box {
    padding: 0 15px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .goods-item {
      border-radius: 5px;
      overflow: hidden;
      background: white;
      width: 48%;
      margin-bottom: 15px;
      img {
        width: 100%;
        height: 330px/2;
      }
      .name,
      .handler {
        font-size: 13px;
        padding: 0 10px;
        height: 30px;
        line-height: 30px;
      }
      .handler {
        display: flex;
        justify-content: space-between;
        span{
          font-size: 15px;
          color: #FF6F59;
        }
        i{
          color: #97A0B1;
        }
      }
    }
  }
}
</style>


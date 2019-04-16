<template>
  <div class="goods sp-scroll" v-scroll="loadmore">
    <div class="goods-header">
      <div class="top">
        <img class="head" src="@/assets/images/header.jpg" alt>
        <div class="info">
          <span class="name">刘鹤鸣</span>
          <span class="view">商品量 2 浏览量 3</span>
        </div>
        <img class="goodimg" src="@/assets/images/shop_top_bg@3x.png" alt>
      </div>
      <div class="search">
        <i class="cubeic-search"></i>
        <input type="text" placeholder="搜索">
      </div>
    </div>
    <div class="goods-type">
      <div class="h-scroll">
        <ul class="goods-ul">
          <li class="active">全部</li>
          <li>衣服</li>
          <li>裤子</li>
          <li>鞋子</li>
          <li>其他</li>
          <li>全部</li>
          <li>衣服</li>
          <li>裤子</li>
          <li>鞋子</li>
          <li>其他</li>
        </ul>
      </div>
    </div>
    <div class="goods-box">
      <div class="goods-item" v-for="(item,index) in data" :key="index">
        <div class="img">
          <img :src="item.imgUrl" alt>
        </div>
        <div class="name">{{item.name}}</div>
        <div class="handler">
          <span>￥{{item.price}}</span>
          <i class="cubeic-more"></i>
        </div>
      </div>
    </div>
    <fixed-button :title="'添加商品'" @clickHandler="addGoods"></fixed-button>
  </div>
</template>
<script>
const foods = [
  {
    name: "A衣服",
    // ...
    imgUrl:
      "https://img.hrsugaphre.com/userHead/33E79D50626A4DCC8BC930DFA1AB8F9D.png",
    // "image": "http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/750/h/750"
    price: 100
  },
  {
    name: "B衣服",
    // ...
    imgUrl:
      "https://img.hrsugaphre.com/userHead/33E79D50626A4DCC8BC930DFA1AB8F9D.png",
    // "image": "http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/750/h/750"
    price: 99
  },
  {
    name: "C衣服",
    // ...
    imgUrl:
      "https://img.hrsugaphre.com/userHead/33E79D50626A4DCC8BC930DFA1AB8F9D.png",
    // "image": "http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/750/h/750"
    price: 88
  },
  {
    name: "D衣服",
    // ...
    imgUrl:
      "https://img.hrsugaphre.com/userHead/33E79D50626A4DCC8BC930DFA1AB8F9D.png",
    // "image": "http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/750/h/750"
    price: 88
  },
  {
    name: "E衣服",
    // ...
    imgUrl:
      "https://img.hrsugaphre.com/userHead/33E79D50626A4DCC8BC930DFA1AB8F9D.png",
    // "image": "http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/750/h/750"
    price: 88
  },
  {
    name: "A裤子",
    imgUrl:
      "http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/114/h/114",
    price: 88
  }
];
export default {
  data() {
    return {
      data: [],
      current: 1,
      size: 10
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    addGoods() {
      console.log(111);
    },
    loadData() {
      axios
        .post(this.$apiConfig.getGoodsList, {
          current: this.current,
          size: this.size
        })
        .then(res => {
          if (res.data.code == "0") {
            this.data = this.data.concat(res.data.data.records);
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
    padding-bottom: 128px/2;
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


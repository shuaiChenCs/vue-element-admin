<template>
  <div class="sp">
    <div class="fabu" v-show="show">
      <div class="item">
        <img :src="`${this.$imageUrl}/add_goods@3x.png`" alt="">
        <div class="des" @click="addGoods">
          <p class="main">新建文章</p>
          <p>精准营销文章</p>
          <p>转发即可获取浏览数据噢</p>
        </div>
      </div>
      <div class="item">
        <img :src="`${this.$imageUrl}/add_goods@3x.png`" alt="">
        <div class="des" @click="addGoods">
          <p class="main">添加商品</p>
          <p>上传价廉好物</p>
          <p>分享您最推荐的日常小物</p>
        </div>
      </div>
      <div class="item">
        <img :src="`${this.$imageUrl}/add_moments@3x.png`" alt="">
        <div class="des" @click="addDynamic">
          <p class="main">发布动态</p>
          <p>拍摄照片</p>
          <p>用文字记录您的创业之旅</p>
        </div>
      </div>
      <div class="item">
        <i class="iconfont iconcard_edit_delete" @click="show = false"></i>
      </div> 
    </div>
    <div class="main-content" :class="{hastab: $hastab}">
      <keep-alive>
        <router-view v-if="$route.name == 'main'" />
      </keep-alive>
      <router-view v-if="$route.name != 'main'"/>
    </div>
    <div class="sp-tabbar" v-if="$hastab">
      <div class="tab-item" v-for="(item, index) in tabs" :key="index" @click="clickHandler(item.label)">
        <img :src="selectedLabelDefault == item.label ? item.activeIcon : item.icon" :class="{w8: !item.label}" alt="">
        <span v-if="item.label" :class="{active: selectedLabelDefault == item.label}">{{item.label}}</span>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      show: false,
      selectedLabelDefault: "首页",
      tabs: [
        {
          label: "首页",
          icon: `${this.$imageUrl}/tabbar_home02@2x.png`,
          activeIcon: `${this.$imageUrl}/tabbar_home01@2x.png`
        },
        {
          label: "通讯录",
          icon: `${this.$imageUrl}/tabbar_contacts02@2x.png`,
          activeIcon: `${this.$imageUrl}/tabbar_contacts01@2x.png`
        },
        {
          label: "",
          icon: `${this.$imageUrl}/tabbar_add@3x.png`,
          activeIcon: `${this.$imageUrl}/tabbar_add@3x.png`
        },
        {
            label: "看板",
            icon: `${this.$imageUrl}/tabbar_board02@2x.png`,
            activeIcon: `${this.$imageUrl}/tabbar_board01@2x.png`
        },
        {
          label: "我的",
          icon: `${this.$imageUrl}/tabbar_mine02@2x.png`,
          activeIcon: `${this.$imageUrl}/tabbar_mine01@2x.png`
        }
      ]
    };
  },
  watch: {
    '$route'(val) {
      // this.hastab = val.meta.hastab;
      // console.log(val)
    }
  },
  methods: {
      addGoods(){
          this.show=false;
          this.$router.push('/my/goods/add');
      },
      addDynamic(){
          this.show=false;
          this.$router.push('/my/dynamic/add');
      },
    clickHandler(label) {
      if(label=='') {
        this.show = true;
        return;
      }
      this.selectedLabelDefault = label;
      if(label == '首页') {
        this.$router.push('/main');
      }else if(label == '通讯录') {
        this.$router.push('/address-book');
      }else if(label == '看板') {
        this.$router.push('/board');
      }else if(label == '我的') {
        this.$router.push('/my');
      }
    },
    changeHandler(label) {
      // console.log(label)
      // if you clicked different tab, this methods can be emitted
    },
    // beforeRouteEnter(to,from ,next) {
    //   console.log(to)
    // }
  }
};
</script>
<style lang="less" scoped>
.sp {
  .fabu{
    padding-top: 80%;
    height: 100vh;
    position: fixed;
    width: 100%;
    z-index: 999999;
    background:rgba(255,255,255,.9);
    .item{
      justify-content: center;
      margin-bottom: 42px;
      display: flex;
      align-items: center;
      i{
        font-size: 30px;
      }
      img{
        height: 65px;
        width: 65px;
        margin-right: 25px;
      }
      .des{
        p{
          color: #97A0B1;
          font-size: 15px;
          &.main{
            color: #323643;
            font-weight: bold;
            font-size: 20px;
          }
        }
        height: 65px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
    }
  }
  .main-content{
    height: 100vh;
    &.hastab{
      height: calc(100vh - 48px);
      >div{
        // padding-bottom: 48px;
      }
    }
    >div{
      background: #F8F8F8;
    }
  }
  .sp-tabbar{
    height: 98px/2;
    background: white;
    z-index: 9999;
    position: fixed;
    bottom: 0;
    width: 100%;
    box-shadow: 0px 0px 18px 2px rgba(0, 0, 0, 0.1);
    display: flex;
    .tab-item{
      // padding: 5px 0;
      align-items: center;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      color:rgba(204,210,219,1);
      font-size: 10px;
      img{
        width: 25px;
        height: 25px;
        &.w8{
          width: 40px;
          height: 40px;
        }
      }
      span{
        padding-top: 2px;
        &.active{
          color: #1ED29A;
        }
      }
    }
  }
}
</style>



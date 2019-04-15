<template>
  <div class="sp">
    <div class="main-content" :class="{hastab: hastab}">
      <router-view />
    </div>
    <div class="sp-tabbar" v-if="hastab">
      <cube-tab-bar
        v-model="selectedLabelDefault"
        :data="tabs"
        @click="clickHandler"
        @change="changeHandler"
      ></cube-tab-bar>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      hastab: true,
      selectedLabelDefault: "Vip",
      tabs: [
        {
          label: "首页",
          icon: "cubeic-home"
        },
        {
          label: "通讯录",
          icon: "cubeic-like"
        },
        {
          label: "看板",
          icon: "cubeic-vip"
        },
        {
          label: "我的",
          icon: "cubeic-person"
        }
      ]
    };
  },
  watch: {
    '$route'(val) {
      this.hastab = val.meta.hastab;
    }
  },
  methods: {
    clickHandler(label) {
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
    }
  }
};
</script>
<style lang="less" scoped>
.sp {
  .main-content{
    height: 100vh;
    &.hastab{
      height: calc(100vh - 48px);
      >div{
        padding-bottom: 48px;
      }
    }
    >div{
      background: #F8F8F8;
    }
  }
  .sp-tabbar{
    background: white;
    z-index: 9999;
    position: fixed;
    bottom: 0;
    width: 100%;
    box-shadow: 0px 0px 18px 2px rgba(0, 0, 0, 0.1);
  }
}
</style>



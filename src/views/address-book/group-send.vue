<template>
  <div class="group-send">
    <div class="search" :class="{isSearch: searching}">
      <i class="cubeic-search"></i>
      <input type="text" placeholder="搜索" @focus="searching = true">
      <span v-if="searching" @click="searching = false">取消</span>
    </div>
    <div class="search-type">
      <div class="custom-item">
        <img src="https://img.hrsugaphre.com/userHead/FA0C670A2C714C1CB4B1FDA684CCEF94.png" alt>
        <span>按客户来源筛选</span>
        <i class="iconfont iconlist_more"></i>
      </div>
      <div class="custom-item">
        <img src="https://img.hrsugaphre.com/userHead/FA0C670A2C714C1CB4B1FDA684CCEF94.png" alt>
        <span>按客户活跃度筛选</span>
        <i class="iconfont iconlist_more"></i>
      </div>
    </div>
    <div class="check-box" v-if="!searching">
      <div class="block-item-title">
        <i class="iconfont iconcard_pause"></i>
        客户列表
      </div>
      <div class="check-item">
        <cube-checkbox v-model="checked">全选13人</cube-checkbox>
      </div>
    </div>
    <div class="check-box" v-for="(group,index) in listDirectiony" :key="group.name">
      <div class="block-item-title">{{group.name}}</div>
      <div class="check-item" v-for="(item,index) in group.items" :key="item.id">
        <cube-checkbox v-model="checked">
          <img :src="item.headImg" alt>
          {{item.nikeName}}
        </cube-checkbox>
      </div>
    </div>
    <!--<div class="check-box" v-for="item in 10" :key="item">-->
      <!--<div class="block-item-title">B</div>-->
      <!--<div class="check-item">-->
        <!--<cube-checkbox v-model="checked">-->
          <!--<img src="https://img.hrsugaphre.com/userHead/FA0C670A2C714C1CB4B1FDA684CCEF94.png" alt>-->
          <!--李四-->
        <!--</cube-checkbox>-->
      <!--</div>-->
    <!--</div>-->
    <fixed-button :title="'下一步'" @clickHandler="save"></fixed-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
        listDirectiony:[],
      searching: false,
      checked: false
    };
  },
    created(){
        axios.post(this.$apiConfig.getClientList,{}).then(res=>{
            if(res.data.code==0){
                this.listDirectiony = res.data.data;
            }
        })
    },
  methods: {
    save() {}
  }
};
</script>

<style lang="less" scoped>
.group-send {
  padding-bottom: 80px;
  .search {
    margin-bottom: 10px;
    transition: all 1s ease;
    z-index: 5;
    padding: 15px;
    background: white;
    height: 62px;
    display: flex;
    align-items: center;
    position: relative;
    &.isSearch {
      input {
        width: 90%;
      }
      span {
        flex: 1;
        text-align: center;
      }
    }
    input {
      width: 100%;
      height: 32px;
      background: #f7f7f7;
      border-radius: 16px;
      padding-left: 30px;
      font-size: 13px;
    }
    i {
      position: absolute;
      top: 24px;
      font-size: 15px;
      left: 25px;
      color: #d2d8df;
    }
  }
  .search-type {
    background: white;
  }
  .custom-item {
    height: 60px;
    &:last-child {
      border: none;
    }
  }
}
</style>


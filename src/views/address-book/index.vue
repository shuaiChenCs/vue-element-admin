<template>
  <div class="address-book">
    <div class="search" :class="{isSearch: searching}">
      <i class="cubeic-search"></i>
      <input type="text" placeholder="搜索" @focus="searching = true">
      <span v-if="searching" @click="searching = false">取消</span>
    </div>
    <div class="address-block" v-if="!searching">
      <cube-index-list :data="listDirectiony" :speed="2">
        <cube-index-list-group v-for="(group, index) in listDirectiony" :key="index" :group="group">
          <cube-index-list-item
                  class="sp-list-item"
                  v-for="(item, index) in group.items"
                  :key="index"
                  :item="item"
                  @select="selectItem"
          >
            <div class="custom-item">
              <img
                      :src="item.headImg"
                      alt
              >
              {{item.nikeName || item.name}}
            </div>
          </cube-index-list-item>
        </cube-index-list-group>
      </cube-index-list>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      listDirectiony: [
          {
              name: "",
              items: [
                  {
                      name: "客户留言",
                      headImg:'https://img.hrsugaphre.com/userHead/FA0C670A2C714C1CB4B1FDA684CCEF94.png',
                      value: 1
                  },
                  {
                      name: "群发消息",
                      headImg:'https://img.hrsugaphre.com/userHead/FA0C670A2C714C1CB4B1FDA684CCEF94.png',
                      value: 2
                  },
                  {
                      name: "标签",
                      headImg:'https://img.hrsugaphre.com/userHead/FA0C670A2C714C1CB4B1FDA684CCEF94.png',
                      value: 1
                  },
                  {
                      name: "人脉广场",
                      headImg:'https://img.hrsugaphre.com/userHead/FA0C670A2C714C1CB4B1FDA684CCEF94.png',
                      value: 2
                  }
              ]
          }
      ],
      searching: false
    };
  },
    created(){
     this.load();
    },
  methods: {
      load(){
          axios.get(this.$apiConfig.getClientList,{}).then(res=>{
              if(res.data.code==0){
                  this.listDirectiony.splice(1,this.listDirectiony.length);
                  this.listDirectiony = this.listDirectiony.concat(res.data.data);
              }
          })
      },
    selectItem(item) {
      if(item.name == '标签') {
        this.$router.push('/address-book/tags');
      }
      if(item.name == '客户留言') {
        this.$router.push('/address-book/message');
      }
          // this.listDirectiony.splice(1,this.listDirectiony.length);
    }
  }
};
</script>
<style lang="less" scoped>
.address-book {
  height: 100%;
  .address-block{
    // margin-top: -20px;
    height: 100%;
    padding-bottom: 48px;
  }
  .search {
    transition: all 1s ease;
    z-index: 5;
    padding: 15px;
    background: #f7f7f7;
    height: 62px;
    display: flex;
    align-items: center;
    position: relative;
    &.isSearch{
      background: white;
      input{
        width: 90%;
        background: #f7f7f7;
      }
      span{
        flex: 1;
        text-align: center;
      }
    }
    input {
      width: 100%;
      height: 32px;
      background: white;
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
  .sp-list-item {
    &:last-child {
      .custom-item {
        border: none;
      }
    }
  }
  .custom-item {
    margin-left: 15px;
    display: flex;
    height: 50px;
    border-bottom: 1Px solid rgba(237, 238, 241, 1);
    align-items: center;
    img {
      height: 30px;
      width: 30px;
      border-radius: 5px;
      margin-right: 15px;
    }
  }
}
</style>

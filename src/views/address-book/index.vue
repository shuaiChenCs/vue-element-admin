<template>
  <div class="address-book">
    <div class="search" :class="{isSearch: searching}">
      <i class="cubeic-search"></i>
      <input type="text" placeholder="搜索" v-model="name" @focus="searchFocus" @input="search">
      <span v-if="showClean" @click="clean">取消</span>
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
              <img :src="item.headImg" alt>
              <span>{{item.nikeName || item.name}}</span>
              <i v-if="item.icon" class="iconfont iconlist_more"></i>
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
        directiony: [
            {
                name: "",
                items: [
                    {
                        name: "客户留言",
                        headImg:
                            "https://img.hrsugaphre.com/userHead/FA0C670A2C714C1CB4B1FDA684CCEF94.png",
                        value: 1,
                        icon: true
                    },
                    {
                        name: "群发消息",
                        headImg:
                            "https://img.hrsugaphre.com/userHead/FA0C670A2C714C1CB4B1FDA684CCEF94.png",
                        value: 2,
                        icon: true
                    },
                    {
                        name: "标签",
                        headImg:
                            "https://img.hrsugaphre.com/userHead/FA0C670A2C714C1CB4B1FDA684CCEF94.png",
                        value: 1,
                        icon: true
                    },
                    // {
                    //   name: "人脉广场",
                    //   headImg:
                    //     "https://img.hrsugaphre.com/userHead/FA0C670A2C714C1CB4B1FDA684CCEF94.png",
                    //   value: 2,
                    //   icon: true
                    // }
                ]
            }
        ],
      listDirectiony: [],
      searching: false,
        name:'',
        showClean:false
    };
  },
  created() {
    this.load();
  },
  methods: {
      clean(){
          this.name = '';
          this.searching = false;
          this.showClean = false;
          this.load();
      },
      searchFocus(){
        this.searching = true;
          this.showClean = true;
      },
      search(){
          this.searching = true;
          this.load();
      },
      load(){
          axios.post(this.$apiConfig.getClientList,{
              nikeName:this.name
          }).then(res=>{
              if(res.data.code==0){
                  this.listDirectiony = [];
                  if(this.name.length==0) {
                      this.listDirectiony = this.listDirectiony.concat(this.directiony);
                  }
                  this.listDirectiony = this.listDirectiony.concat(res.data.data.clientAddressBookVOList);
                  this.searching=false;
              }
          });
      },
    selectItem(item) {
      if (item.name == "标签") {
        this.$router.push("/address-book/tags");
      }
      if (item.name == "客户留言") {
        this.$router.push("/address-book/message");
      }
      if (item.name == "群发消息") {
        this.$router.push("/address-book/group-send");
      }
      if (item.name == "群发消息") {
        this.$router.push("/address-book/group-send");
      }
      if(item.id) {
        this.$router.push("/address-book/person/" + item.id);
      }
      // this.listDirectiony.splice(1,this.listDirectiony.length);
    }
  }
};
</script>
<style lang="less" scoped>
.address-book {
  height: 100%;
  .address-block {
    // margin-top: -20px;
    height: 100%;
    padding-bottom: 64px;
  }
  .search {
    transition: all 1s ease;
    z-index: 5;
    padding: 15px;
    background: white;
    height: 62px;
    display: flex;
    align-items: center;
    position: relative;
    &.isSearch {
      background: white;
      input {
        width: 90%;
        background: #f7f7f7;
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
  .sp-list-item {
    &:last-child {
      .custom-item {
        border: none;
      }
    }
  }
}
</style>

<template>
  <div class="group-send">
    <div class="search" :class="{isSearch: searching}">
      <i class="cubeic-search"></i>
      <input type="text" placeholder="搜索" v-model="name" @focus="searching = true" @input="search">
      <span v-if="searching" @click="clean">取消</span>
    </div>
    <!--<div class="search-type">-->
      <!--<div class="custom-item">-->
        <!--<img src="https://img.hrsugaphre.com/userHead/FA0C670A2C714C1CB4B1FDA684CCEF94.png" alt>-->
        <!--<span>按客户来源筛选</span>-->
        <!--<i class="iconfont iconlist_more"></i>-->
      <!--</div>-->
      <!--<div class="custom-item">-->
        <!--<img src="https://img.hrsugaphre.com/userHead/FA0C670A2C714C1CB4B1FDA684CCEF94.png" alt>-->
        <!--<span>按客户活跃度筛选</span>-->
        <!--<i class="iconfont iconlist_more"></i>-->
      <!--</div>-->
    <!--</div>-->
    <div class="check-box" v-if="!searching">
      <div class="block-item-title">
        <i class="iconfont iconcard_pause"></i>
        客户列表
      </div>
      <div class="check-item">
        <cube-checkbox class="with-click" v-model="checked">全选{{listDirectiony.quantity}}人</cube-checkbox>
      </div>
    </div>
    <div class="check-box" v-for="(group,index) in listDirectiony.clientAddressBookVOList" :key="group.name">
      <div class="block-item-title">{{group.name}}</div>
      <div class="check-item" v-for="(item,index) in group.items" :key="item.id">
        <cube-checkbox v-model="item.isCheck">
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
      checked: false,
        name:''
    };
  },
    created(){
      this.load();
    },
  methods: {
      clean(){
          this.searching = false;
          this.name = '';
          this.load();
      },
      search(){
        this.load();
      },
      load(){
          axios.post(this.$apiConfig.getClientList,{
              nikeName:this.name
          }).then(res=>{
              if(res.data.code==0){
                  this.listDirectiony = res.data.data;
              }
          })
      },
    save() {
      let arr = [];
      this.listDirectiony.clientAddressBookVOList.forEach(item => {
        item.items.forEach(sub => {
          if(sub.isCheck) {
            arr.push(sub);
          }
        })
      });
      if(arr.length == 0) {
        this.$createToast({
            txt: '请最少选择一个人',
            type: 'warn'
        }).show()
      }else{
        this.$store.commit('setGroup', arr);
        this.$router.push('/group-chat');
      }
    }
  },
    watch: {
        checked(val) {
            let vm = this;
            this.listDirectiony.clientAddressBookVOList.forEach(list=>{
                list.items.forEach(res=>{
                    res.isCheck=vm.checked;
                })
            })
        }
    }
};
</script>

<style lang="less" scoped>
  .with-click {
    .cube-checkbox-label {
      a {
        position: relative;
        z-index: 1;
      }
    }
  }
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


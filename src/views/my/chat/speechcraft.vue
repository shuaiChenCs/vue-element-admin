<template>
  <div class="speechcraft">
    <div class="search">
        <i class="cubeic-search"></i>
      <input type="text" placeholder="搜索" v-model="content" @input="load">
    </div>
    <div class="speechcraft-list">
        <div class="speechcraft-item" @click.self="edit(verbal.id)"  v-for="(verbal,index) in verbalList" :key="verbal.id">
            <i class="iconfont iconcard_edit_delete" @click="del(verbal.id,index)"></i>
            {{verbal.content}}
        </div>
    </div>
    <fixed-button :title="'新增话术'" @clickHandler="save"></fixed-button>
  </div>
</template>
<script>
export default {
    data() {
        return {
            verbalList:[],
            content: ''
        }
    },
    created(){
        this.load();
    },
    methods: {
        load(){
            axios.post(this.$apiConfig.verbalList,{
                content:this.content
            }).then(res=>{
                if(res.data.code==0){
                    console.log(res.data.data);
                    this.verbalList=res.data.data;
                }
            });
        },
        del(id,index){
            let vm = this;
            this.$createDialog({
                type: 'confirm',
                content: '确认是否删除',
                onConfirm(e){
                    axios.post(vm.$apiConfig.delVerbal+id,{}).then(res=>{
                        if(res.data.code==0) {
                            vm.verbalList.splice(index,1);
                            vm.$createToast({
                                time: 100
                            }).show();
                        }
                    });
                }
            }).show()
        },
        save() {
            this.$router.push('/my/chat/add/'+0)
        },
        edit(id) {
            this.$router.push('/my/chat/add/'+id);
        }
    }
};
</script>
<style lang="less" scoped>
.speechcraft {
  .search {
    padding: 15px;
    background: white;
    height: 62px;
    display: flex;
    align-items: center;
    position: relative;
    input {
      width: 100%;
      height: 32px;
      background: rgba(243, 245, 247, 1);
      border-radius: 16px;
      padding-left: 30px;
      font-size: 13px;
    }
    i{
        position: absolute;
        top: 24px;
        font-size: 15px;
        left: 25px;
        color: #d2d8df;
    }
  }
  .speechcraft-list{
      padding: 15px;
      .speechcraft-item{
        position: relative;
          font-size: 15px;
          line-height: 1.3;
            margin-bottom: 15px;
          padding: 20px 15px 15px;
          background: white;
          border-radius: 5px;
          overflow: hidden;
            box-shadow:0px 0px 10px 1px rgba(0, 0, 0, 0.1);
            i{
              position: absolute;
              top: 0;
              right: 0;
              background: black;
              opacity: .5;
              width: 20px;
              text-align: center;
              border-bottom-left-radius: 5px;
            }
      }
  }
}
</style>

<template>
  <div class="speechcraft">
    <div class="search">
        <i class="cubeic-search"></i>
      <input type="text" placeholder="dd">
    </div>
    <div class="speechcraft-list">
        <div class="speechcraft-item" @click="edit">
            请问您想了解哪一方面呢？您可以随时给我发消息，我将快速为您解答~
        </div>
        <div class="speechcraft-item" @click="edit">
            请问您想了解哪一方面呢？您可以随时给我发消息，我将快速为您解答~
        </div>
    </div>
    <fixed-button :title="'新增话术'" @clickHandler="save"></fixed-button>
  </div>
</template>
<script>
export default {
    data() {
        return {
            content: ''
        }
    },
    methods: {
        save() {
            
        },
        edit() {
            this.$router.push('/my/chat/add');
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
          font-size: 15px;
          line-height: 1.3;
            margin-bottom: 15px;
          padding: 15px;
          background: white;
          border-radius: 5px;
            box-shadow:0px 0px 10px 1px rgba(0, 0, 0, 0.1);
      }
  }
}
</style>

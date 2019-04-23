<template>
  <div class="tag-type">
    <div class="search-type">
      <div class="custom-item" v-for="i in 10" :key="i">
        <img src="https://img.hrsugaphre.com/userHead/FA0C670A2C714C1CB4B1FDA684CCEF94.png" alt>
        <span>战三</span>
      </div>
    </div>
    <fixed-button :title="'群发消息'" @clickHandler="save"></fixed-button>
  </div>
</template>
<script>
export default {
    methods: {
        save() {}
    }
}
</script>

<style lang="less" scoped>
.tag-type {
    padding-bottom: 64px;
    .search-type{
        background: white;
    }
}
</style>

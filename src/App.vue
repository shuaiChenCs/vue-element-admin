<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
    created(){
        //登录，设置全局token
        this.$post(this.$apiConfig.login+'?openId=o-8zG5Ttt33KRa222_DGLq85GLMw').then((response) =>{
            axios.defaults.headers['Authentication'] = response.data.token;
        });
    }
};
</script>

<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>

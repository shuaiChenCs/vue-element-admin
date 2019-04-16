<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
    created(){
        //登录，设置全局token
        axios.post(this.$apiConfig.login+'?openId=o-8zG5Ttt33KRa222_DGLq85GLMw').then((res) =>{
            let response = res.data;
            axios.defaults.headers['Authentication'] = response.data.token;
            window.localStorage.token = response.data.token;
            this.$store.commit('setCard', response.data);
            this.$store.commit('setToken', response.data.token);
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

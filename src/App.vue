<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
    created(){
        let code = this.getUrlParam('code');
        //登录，设置全局token
        axios.post(this.$apiConfig.login+'?unionId=oEJ6f4lq0Wp-tQsLnEyIQLGkiloE').then((res) =>{
            let response = res.data;
            axios.defaults.headers['Authentication'] = response.data.token;
            window.localStorage.token = response.data.token;
            // this.$store.commit('setCard', response.data);
            this.$store.commit('setToken', response.data.token);
        });
        axios.post(this.$apiConfig.officialRegister+'?code='+code).then(res=>{
           console.log(1);
        });
    },
    methods:{
        getUrlParam (name) {
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return decodeURIComponent(r[2]); return null;
        }
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

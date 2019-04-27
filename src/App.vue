<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
    data(){
        return {
        }
    },
    created(){
        
        let code = this.getUrlParam('code');
        // let url = this.getCrtUrl();
        // let url = 'https://h5.sipinoffice.com';
        //登录，设置全局token
        axios.post(this.$apiConfig.officialRegister+'?code='+code).then(res=> {
            // if(res.data.code==0) {
            //     let response = res.data;
            //     axios.defaults.headers['Authentication'] = response.data.token;
            //     window.localStorage.token = response.data.token;
            //     this.$store.commit('setToken', response.data.token);
            // }
            let token = `eyJhbGciOiJIUzI1NiJ9.eyJwMSI6MzksInAyIjo0MywiZXhwIjoxNTU3MDM3NTcxLCJpYXQiOjE1NTYxNzM1NzF9.wy9tedxvPf00kXqUKQ01o6u6ZC5bVAlpVRfyBHVBiVw`;
            axios.defaults.headers['Authentication'] = token;
            window.localStorage.token =token;
            this.$store.commit('setToken', token);
            this.$store.commit('initNim', {});
        });
        //wxconfig param
        // axios.get(this.$apiConfig.wxConfig+'?url='+encodeURIComponent(url),{}).then(res=>{
        //     if(res.data.code ==0){
        //         let wxConfig = res.data.data;
        //         this.setWxConfig(wxConfig);
        //     }
        // });
    },
    methods:{
        getUrlParam (name) {
            let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
            let r = window.location.search.substr(1).match(reg);
            if (r != null) return decodeURIComponent(r[2]); return null;
        },
        getCrtUrl(){
            let temp = window.location.href;
            let end = temp.indexOf('#');
            if(end!=-1){
                return temp.substring(0,end);
            }else{
                return temp
            }
        },
        setWxConfig(wxConfig){
            wx.config({
                debug: true,// 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: `wx9bd9279a9b4ee6a9`, // 必填，公众号的唯一标识
                timestamp: wxConfig.timestamp, // 必填，生成签名的时间戳
                nonceStr: wxConfig.wxConfig, // 必填，生成签名的随机串
                signature: wxConfig.signature,// 必填，签名
                jsApiList: ['openLocation','getLocation','closeWindow','checkJsApi'] //
            });
            wx.ready(function(){

            });
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

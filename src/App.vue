<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import eventBus from '@/lib/eventBus.js'
export default {
    data(){
        return {
            toast:null
        }
    },
    created(){
        let code = this.getUrlParam('code');
        if(!code){
            window.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx9bd9279a9b4ee6a9&redirect_uri=https://h5.sipinoffice.com&response_type=code&scope=snsapi_userinfo&state=1&wechat_redirect'
        }else {
            // let url = this.getCrtUrl();
            // let url = 'https://h5.sipinoffice.com';
            //登录，设置全局token
            // window.sessionStorage.token =  'eyJhbGciOiJIUzI1NiJ9.eyJwMSI6ODQsInAyIjo4OCwiZXhwIjoxNTU4ODU0NjA5LCJpYXQiOjE1NTc5OTA2MDl9.ntrGH6uw5Cydqoc_uFvm_ZviOnblZY80eKmHJht6SG8'
            //sessionStorage.token = 'eyJhbGciOiJIUzI1NiJ9.eyJwMSI6ODMsInAyIjo4NywiZXhwIjoxNTU3NDY1NjE1LCJpYXQiOjE1NTY2MDE2MTV9.C0b7h0o_Tyw3oVnTag24a6522DE5yl4Z1_CSxctOiIs';
            this.toast = this.$createToast({
                txt: '登录中..'
            });
            this.toast.show();
            if (!sessionStorage.token) {
                axios.post(this.$apiConfig.officialRegister + '?code=' + code).then(res => {
                    if (res.data.code == 0) {
                        let response = res.data;
                        axios.defaults.headers['Authentication'] = response.data.token;
                        window.sessionStorage.token = response.data.token;
                        this.$store.commit('setToken', response.data.token);
                        this.loadUserInfo();
                        eventBus.$emit('setToken')
                    }
                });
            } else {
                this.loadUserInfo();
            }
        }
        //wxconfig param
        // axios.get(this.$apiConfig.wxConfig+'?url='+encodeURIComponent(url),{}).then(res=>{
        //     if(res.data.code ==0){
        //         let wxConfig = res.data.data;
        //         this.setWxConfig(wxConfig);
        //     }
        // });
    },
    methods:{
        loadUserInfo(){
            axios.get(this.$apiConfig.memberInfo, {}).then((member) => {
                if (member.data.code == 0) {
                    let memberInfo = member.data.data;
                    window.sessionStorage.card = JSON.stringify(memberInfo.cardVO);
                    window.sessionStorage.user = JSON.stringify(memberInfo);
                    this.$store.commit('setCard', memberInfo.cardVO);
                    this.$store.commit('setUser', memberInfo);
                }
            }).then(() => {
                this.$store.commit('initNim', {});
                this.toast.hide()
            });
        },
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

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
        }
    },
    created(){
        // this.loadWxConfig();
        this.getWxConfig(encodeURIComponent(this.getCrtUrl('#'), {}));
        // this.wxShareAll(1,2,'https://h5.sipinoffice.com',4,function(){alert(1)})
        if(!sessionStorage.token) {
            this.$router.replace('/author');
            return;
        }else{
          this.$store.commit('initNim', {});
        }
    },
    methods:{
        loadWxConfig(){
            alert(this.getCrtUrl('#'));
            axios.get(this.$apiConfig.wxConfig + '?url=' + encodeURIComponent(this.getCrtUrl('#'), {})).then(res => {
                if (res.data.code == 0) {
                    let wxConfig = res.data.data;
                    this.setWxConfig(wxConfig);
                }
            })
        },
        getCrtUrl(indexChar){
            let temp = window.location.href;
            let end = temp.indexOf(indexChar);
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
                nonceStr: wxConfig.nonceStr, // 必填，生成签名的随机串
                signature: wxConfig.signature,// 必填，签名
                jsApiList: ['updateAppMessageShareData','updateTimelineShareData','onMenuShareAppMessage','onMenuShareTimeline','onMenuShareQQ','onMenuShareQZone'] //
            });
            // wx.ready(function () {  wx.hideOptionMenu ();    })
        },
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

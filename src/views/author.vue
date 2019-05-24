<template>
    <div></div>
</template>

<script>
    export default {
        name: "author",
        created(){
            let code = this.getUrlParam('code');
            let docId = this.getUrlParam('docId');
            let token = this.getUrlParam('token');
            // let routerUrl = docId ? this.getCrtUrl('?')+'#/article' : this.getCrtUrl('?');
            let routerUrl = docId ? '/article':'/';
            let wxRedirectUrl =encodeURIComponent(this.getCrtUrl('#')+'#/author');
            if(window.sessionStorage.token){
                this.$router.push(routerUrl);
            }else{
                // token = 'eyJhbGciOiJIUzI1NiJ9.eyJwMSI6ODMsInAyIjo4NywiZXhwIjoxNTU5NDY0NDk5LCJpYXQiOjE1NTg2MDA0OTl9.HtEeRG3jTwVpxEA51zhAJVh6y-Y2GIMH5PDePE_HEOs';
                if(!code && !token){
                    window.location.replace(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx9bd9279a9b4ee6a9&redirect_uri=${wxRedirectUrl}&response_type=code&scope=snsapi_userinfo&state=1&wechat_redirect`);
                }else{
                    let toast = this.$createToast({
                        txt: ''
                    });
                    toast.show();
                    if(token){
                        window.sessionStorage.token = token;
                        axios.defaults.headers['Authentication'] = token;
                        this.$store.commit('setToken', token);
                        this.loadUserInfo(routerUrl,toast,true);
                    }else {
                        axios.post(this.$apiConfig.officialRegister + '?code=' + code).then(res => {
                            if (res.data.code == 0) {
                                let response = res.data;
                                axios.defaults.headers['Authentication'] = response.data.token;
                                window.sessionStorage.token = response.data.token;
                                this.$store.commit('setToken', response.data.token);
                                this.loadUserInfo(routerUrl, toast,false);
                            }
                        });
                    }
                }
            }
        },
        methods:{
            loadUserInfo(routerUrl,toast,replace){
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
                    this.loadWxConfig();
                    toast.hide();
                    if(replace) {
                        this.$router.replace(routerUrl)
                    }else {
                        this.$router.push(routerUrl);
                    }
                });
            },
            loadWxConfig(){
                axios.get(this.$apiConfig.wxConfig + '?url=' + encodeURIComponent(this.getCrtUrl('#'), {})).then(res => {
                    if (res.data.code == 0) {
                        let wxConfig = res.data.data;
                        this.setWxConfig(wxConfig);
                    }
                })
            },
            setWxConfig(wxConfig){
                wx.config({
                    debug: false,// 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: `wx9bd9279a9b4ee6a9`, // 必填，公众号的唯一标识
                    timestamp: wxConfig.timestamp, // 必填，生成签名的时间戳
                    nonceStr: wxConfig.nonceStr, // 必填，生成签名的随机串
                    signature: wxConfig.signature,// 必填，签名
                    jsApiList: ['updateAppMessageShareData','updateTimelineShareData','onMenuShareAppMessage','onMenuShareTimeline','onMenuShareQQ','onMenuShareQZone'] //
                });
                // wx.ready(function () {  wx.hideOptionMenu ();    })
            },
            getUrlParam (name) {
                let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
                let r = window.location.search.substr(1).match(reg);
                if (r != null) return decodeURIComponent(r[2]); return null;
            },
            getCrtUrl(indexChar){
                let temp = window.location.href;
                let end = temp.indexOf(indexChar);
                if(end!=-1){
                    return temp.substring(0,end);
                }else{
                    return temp
                }
            }
        }
    }
</script>

<style scoped>

</style>
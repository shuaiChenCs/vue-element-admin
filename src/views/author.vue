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
                // token = 'eyJhbGciOiJIUzI1NiJ9.eyJwMSI6ODQsInAyIjo4OCwiZXhwIjoxNTU5OTg0MzkyLCJpYXQiOjE1NTkxMjAzOTJ9.fPKuQG0tK1zDUo9vAsyqBG4O7LaI72fR370Y0sSSqBg';
                if(!code && !token){
                    axios.get(this.$apiConfig.wxAuthorization+'?url='+wxRedirectUrl).then(res=>{
                        if(res.data.code==0)
                            window.location.replace(res.data.data);
                    })

                }else{
                    let toast = this.$createToast({
                        txt: ''
                    });
                    toast.show();
                    token = token ||  window.sessionStorage.token;
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
                let memberInfo ={};
                axios.get(this.$apiConfig.memberInfo, {}).then((member) => {
                    if (member.data.code == 0) {
                        memberInfo = member.data.data;
                        window.sessionStorage.card = JSON.stringify(memberInfo.cardVO);
                        window.sessionStorage.user = JSON.stringify(memberInfo);
                        this.$store.commit('setCard', memberInfo.cardVO);
                        this.$store.commit('setUser', memberInfo);
                    }
                }).then(() => {
                    this.$store.commit('initNim', {});
                    // this.loadWxConfig();
                    toast.hide();
                    // if(memberInfo.cardVO.id==84) {
                     if (memberInfo.isExpire && routerUrl != '/article') {
                         replace = true;
                         routerUrl = '/pay';
                     }
                    // }
                    if(replace) {
                        this.$router.replace(routerUrl)
                    }else {
                        this.$router.push(routerUrl);
                    }
                });
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
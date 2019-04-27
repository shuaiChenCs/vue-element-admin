<template>
    <div class="invite-code">
        <div class="code-box">
            <div class="info">
                <p><i class="iconfont iconmine_code_save"></i>将邀请码保存至手机相册</p>
                <p><i class="iconfont iconmine_code_share"></i>将邀请码应用到文章/海报/视频等场景</p>
                <p><i class="iconfont iconmine_code_scan"></i>好友扫描邀请码后，可直接注册成为会员</p>
            </div>
            <div class="code">
                <img :src="src" alt="">
            </div>
        </div>
        <fixed-button :title="'刷新二维码'" @clickHandler="refresh" style="background: none"></fixed-button>
    </div>
</template>
<script>
export default {
    data(){
        return {
            src:''
        }
    },
    created(){
        this.src = this.$store.state.user.inviteQrCode;
    },
    methods: {
        refresh(){
            axios.post(this.$apiConfig.refreshCode,{}).then(res=>{
               if(res.data.code==0){
                   this.src = this.data.data;
               }
            });
        }
    }
}
</script>
<style lang="less" scoped>
.invite-code{
    position: relative;
    height: 100%;
    background:linear-gradient(150deg,rgba(121,241,164,1) 0%,rgba(14,92,173,1) 100%) !important;
    .code-box{
        position: absolute;
        width: 590px/2;
        height: 774px/2;
        top: 50px;
        left: 50%;
        margin-left: -590px/4;
        background: white;
        border-radius: 5px;
        box-shadow:0px 0px 18px 2px rgba(0, 0, 0, 0.1);
        display: flex;
        flex-direction: column;
        .info{
            border-bottom: 2Px solid rgba(237,238,241,1);;
            flex: 1;
            margin: 0 15px;
            padding: 40px 0;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            >p{
                color:rgba(50,54,67,1);
                font-size: 13px;
                i{
                    color: #CCD2DB;
                    font-size: 12px;
                    margin-right: 10px;
                }
            }
        }
        .code{
            display: flex;
            justify-content: center;
            align-items: center;
            height: 230px;
            img{
                height: 150px;
                width: 150px;
            }
        }
    }
}
</style>


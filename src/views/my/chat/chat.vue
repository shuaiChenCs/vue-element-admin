<template>
    <div class="chat">
        <div class="chat-item" @click="$router.push('/my/chat/reply')">
            <div class="left">
                <span class="top">自动回复</span>
                <span class="bootom">设置文章/名片页自动弹出的消息</span>
            </div>
            <div class="right">
                <span class="num">{{verbal.autoResponseCount}}条</span>
                <i class="iconfont iconlist_more"></i>
            </div>
        </div>
        <div class="chat-item" @click="$router.push('/my/chat/speechcraft')">
            <div class="left">
                <span class="top">自定义话术库</span>
                <span class="bootom">可快速适应精良话术回复对方</span>
            </div>
            <div class="right">
                <span class="num">{{verbal.verbalCount}}条</span>
                <i class="iconfont iconlist_more"></i>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            verbal:{
                autoResponseCount:0,
                verbalCount:0
            }
        }
    },
    created(){
        axios.get(this.$apiConfig.verbal,{}).then(res=>{
            if(res.data.code==0){
                this.verbal = res.data.data;
            }
        });
    }
}
</script>
<style lang="less" scoped>
.chat{
    height: 100%;
    .chat-item{
        height: 153px/2;
        background: white;
        display: flex;
        margin-bottom: 15px;
        align-items: center;
        padding: 0 15px;
        justify-content: space-between;
        .left{
            display: flex;
            flex-direction: column;
            .top{
                font-size: 15px;
                margin-bottom: 10px;
            }
            .bootom{
                color:rgba(151,160,177,1);
                font-size: 12px;
            }
        }
        .right{
            color:rgba(151,160,177,1);
            font-size: 12px;
            i{
                font-size: 11px;
                margin-left: 5px;
            }
        }
    }
}
</style>


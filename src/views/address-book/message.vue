<template>
    <div class="message">
        <div class="message-block">
            <div class="message-item" v-for="se in sessions" :key="se.id">
                <img src="https://img.hrsugaphre.com/userHead/FA0C670A2C714C1CB4B1FDA684CCEF94.png" alt="">
                <div class="message-info">
                    <div class="top">
                        <span class="name">Marco</span>
                        <span class="time">{{se.lastMsg.userUpdateTime | formatDate('yyyy-MM-dd hh:mm:ss')}}</span>
                    </div>
                    <div class="bottom">
                        {{se.lastMsg.text}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    mounted() {
        
    },
    computed: {
        sessions() {
        console.log(this.$store.state.sessions)
        return this.$store.state.sessions
        }
    },
}
</script>
<style lang="less" scoped>
.message{
    background: white !important;
    .message-item{
        &:last-child{
            // border-bottom: none;
        }
        padding: 0 15px;
        height: 70px;
        border-bottom: 1Px solid rgba(237, 238, 241, 1);
        display: flex;
        align-items: center;
        img{
            margin-right: 15px;
            height: 50px;
            width: 50px;
            border-radius: 50%;
        }
        .message-info{
            flex: 1;
        }
        .top{
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            .name{
                font-size: 15px;
            }
            .time{
                font-size: 11px;
                color: #97A0B1;
            }
        }
        .bottom{
            font-size: 12px;
            color: #97A0B1;
        }
    }
}
</style>



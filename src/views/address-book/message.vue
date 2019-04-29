<template>
    <div class="message">
        <div class="message-block">
            <div class="message-item" v-for="se in sessions" :key="se.id" @click="goTo(se)">
                <img :src="se.card.headImg" alt="">
                <div class="message-info">
                    <div class="top">
                        <span class="name">{{se.card.nikeName}}</span>
                        <span class="time">{{se.updateTime | formatDate('yyyy-MM-dd hh:mm:ss')}}</span>
                    </div>
                    <div class="bottom">
                        {{se.lastMsg.type == 'text' ? se.lastMsg.text : '[图片消息]' | substr}}
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
            return this.$store.state.sessions
        }
    },
    methods: {
        goTo(item) {
            this.$router.push({ path: '/chat', query: { user: item }});
        }
    }
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



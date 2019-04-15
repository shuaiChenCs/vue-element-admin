<template>
    <div class="my">
        <div class="my-header">
            <div class="card">
                <div class="card-img">
                    <img :src="card.headImg" alt="">
                </div>
                <div class="card-name">{{card.cardName}}</div>
                <div class="btn">
                    <cube-button :inline="true">进入名片</cube-button>
                    <cube-button :inline="true">名片海报</cube-button>
                </div>
            </div>
        </div>
        <div class="vip">
            <i class="cubeic-alert"></i>
            <span class="vip-text">VIP会员</span>
            <span class="time">{{card.expirationTime | formatDate}}到期</span>
        </div>
        <my-block :blockData="data1" :title="'我的资产'"></my-block>
        <my-block :blockData="data2" :title="'我的数据'"></my-block>
        <my-block :blockData="data3" :title="'其他'"></my-block>
    </div>
</template>
<script>
import myBlock from '@/components/my-block.vue';
import {formatDate} from '@/common/date.js';

export default {
    data() {
        return {
            card:{},
            data1: [
                {title: '我的邀请码', icon:'', url: ''},
                {title: '邀请好友', icon:'', url: ''},
            ],
            data2: [
                {title: '我的文章', icon:'', url: ''},
                {title: '我的视频', icon:'', url: ''},
                {title: '我的活动', icon:'', url: ''},
                {title: '我的商品', icon:'', url: '/my/goods'},
                {title: '我的名片', icon:'', url: ''},
                {title: '导入公司', icon:'', url: ''},
                {title: '发布动态', icon:'', url: ''},
            ],
            data3: [
                {title: '聊天选项', icon:'', url: ''},
                {title: '联系客服', icon:'', url: ''},
            ],
        }
    },
    filters: {
        formatDate(time) {
            var date = new Date(time);
            return formatDate(date, 'yyyy-MM-dd');
        }
    },
    created(){
        let vm = this;
        //获取会员信息
       this.$fetch(this.$apiConfig.memberInfo,{}).then((res)=>{
           let memberInfo = res.data;
           vm.card = memberInfo.cardVO;
           sessionStorage.setItem('card',JSON.stringify(vm.card));
       });
    },
    components: {
        myBlock
    }
}
</script>
<style lang="less" scoped>
.my{
    .my-header{
        padding: .9375rem /* 15/16 */;
        padding-top: 2.5rem /* 40/16 */;
        .card{
            display: flex;
            flex-direction: column;
            padding-top: 5.5rem /* 88/16 */;
            position: relative;
            height: 11.25rem /* 180/16 */;
            border-radius: .3125rem /* 5/16 */;
            background:linear-gradient(45deg,rgba(11,196,183,1) 0%,rgba(43,217,144,1) 100%); 
            .card-img{
                border: .625rem solid rgba(76,77,81, .3);
                border-radius: 50%;
                height: 6.125rem /* 98/16 */;
                width: 6.125rem /* 88/16 */;
                position: absolute;
                top: -1.5625rem /* 25/16 */;
                left: 50%;
                margin-left: -3.0625rem /* 49/16 */;
                >img{
                    height: 100%;
                    width: 100%;
                    border-radius: 50%;
                    border: 2px solid white;
                }
            }
            .card-name{
                height: 1.875rem /* 30/16 */;
                color: white;
                text-align: center;
            }
            .btn{
                display: flex;
                justify-content: space-around;
            }
        }
    }
    .vip{
        margin-bottom: .9375rem /* 15/16 */;
        height: 3.125rem /* 50/16 */;
        background: white;
        padding: 0 .9375rem /* 15/16 */;
        display: flex;
        align-items: center;
        i{
            width: 1.875rem /* 30/16 */;
        }
        .vip-text{
            width: 12.5rem /* 200/16 */;
        }
        .time{
            flex: 1;
            text-align: right;
        }
    }
}
</style>

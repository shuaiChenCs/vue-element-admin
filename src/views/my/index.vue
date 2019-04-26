<template>
    <div class="my">
        <cube-popup type="my-popup" :zIndex="10000" :position="''" :mask-closable="true" ref="cardPopup">
            <sp-card :title="'进入名片'" :url="qrCode"></sp-card>
        </cube-popup>
        <cube-popup type="my-popup" :zIndex="10000" :position="''" :mask-closable="true" ref="servicePopup">
            <sp-card :title="'联系客服'" :url="qrCode"></sp-card>
        </cube-popup>
        <div class="my-header">
            <div class="card-img">
                <img :src="selfCard.headImg" alt="">
            </div>
            <div class="card-name">{{selfCard.cardName}}</div>
            <div class="card-handler">
                <button @click="toMycard">进入名片</button>
                <button>名片海报</button>
            </div>
        </div>
        <div class="card-block">
            <div class="vip">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#iconmine_member"></use>
                </svg>
                <span class="vip-text">VIP会员</span>
                <span class="time">{{selfCard.expirationTime | formatDate}}到期</span>
            </div>
            <my-block :blockData="data1" :title="'我的资产'"></my-block>
            <my-block :blockData="data2" :title="'我的数据'"></my-block>
            <my-block :blockData="data3" :title="'其他'"></my-block>
        </div>
        <div class="yaoqingren">您的邀请人： {{recommendUser.nikeName}}</div>
    </div>
</template>
<script>
import myBlock from '@/components/my-block.vue';
import {formatDate} from '@/common/date.js';

export default {
    data() {
        return {
            recommendUser:{
                nikeName:'心脉科技'
            }, //邀请人
            selfCard:{},
            qrCode:'',
            data1: [
                {title: '邀请码', icon:require(`@/assets/images/mine_code@3x.png`), url: '/my/inviteCode'},
                {title: '邀请好友', icon:require(`@/assets/images/mine_friends@3x.png`), url: ''},
            ],
            data2: [
                {title: '我的名片', icon:require(`@/assets/images/mine_card@3x.png`), url: '', click: () => {this.toMycard()}},
                {title: '我的商品', icon:require(`@/assets/images/mine_shop@3x.png`), url: '/my/goods'},
                {title: '我的动态', icon:require(`@/assets/images/mine_moments@3x.png`), url: '/my/dynamic'},
            ],
            data3: [
                {title: '聊天选项', icon:require(`@/assets/images/mine_chat@3x.png`), url: '/my/chat'},
                {title: '联系客服', icon:require(`@/assets/images/mine_service@3x.png`), url: '', click: () => {this.toService()}},
            ],
        }
    },
    methods: {
        toService() {
            const component = this.$refs.servicePopup;
            component.show();
        },
        toMycard() {
            const component = this.$refs.cardPopup;
            component.show();
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
        axios.get(this.$apiConfig.memberInfo,{}).then((res)=>{
            let memberInfo = res.data.data;
            vm.selfCard =  memberInfo.cardVO;
            this.qrCode = memberInfo.qrCode;
            this.recommendUser = memberInfo.recommendUser;
            this.$store.commit('setCard', vm.selfCard);
            this.$store.commit('setUser', memberInfo);

       });
    },
    components: {
        myBlock
    }
}
</script>
<style lang="less">
.my{
    padding-bottom: 48px;
    .my-header{
        background:linear-gradient(45deg,rgba(11,196,183,1) 0%,rgba(43,217,144,1) 100%);
        height: 373px/2;
        padding: 40px/2;
        display: flex;
        flex-direction: column;
        .card-img{
            text-align: center;
            height: 120px/2;
            img{
                height: 120px/2;
                width: 120px/2;
                border-radius: 50%;
            }
            margin-bottom: 20px/2;
        }
        .card-name{
            text-align: center;
            color: white;
            font-size:28px/2;
            font-weight:bold;
            margin-bottom: 40px/2;
            outline: none;
        }
        .card-handler{
            button{
                color: white;
                font-size: 15px;
                &:first-child{
                    margin-right: 50px;
                }
                height: 68px/2;
                line-height: 68px/2;
                width: 200px/2;
                background: none;
                border: 1Px solid white;
                border-radius: 34px/2;
            }
            text-align: center;
        }
    }
    .card-block{
        margin-top: -10px;
        padding: 0 15px;
        background: white;
        border-radius:10px 10px 0px 0px;
        .vip{
            height: 110px/2;
            display: flex;
            align-items: center;
            border-bottom: 1Px solid rgba(237,238,241,1);
            svg{
                width: 15px;
                height: 15px;
                margin-right: 10px;
            }
            .vip-text{
                font-size: 30px/2;
                width: 100px;
            }
            .time{
                flex: 1;
                text-align: right;
            }
        }
    }
    .yaoqingren{
        color:rgba(151,160,177,1);
        font-size: 12px;
        padding: 15px;
    }
}
</style>

<template>
    <div class="reply">
        <!--<div class="title">-->
            <!--<div class="block-item-title">-->
                <!--<i class="iconfont iconcard_pause"></i>-->
                <!--文章-->
            <!--</div>-->
            <!--<p>当客户访问您的文章时，将自动按照以下顺序回复消息</p>-->
        <!--</div>-->
        <!--<sp-reply :title="title1" v-model="content"></sp-reply>-->
        <!--<sp-reply :title="title2" v-model="content"></sp-reply>-->
        <!--<sp-reply :title="title3" v-model="content"></sp-reply>-->
        <div class="title">
            <div class="block-item-title">
                <i class="iconfont iconcard_pause"></i>
                名片
            </div>
            <p>当客户访问您的名片时，将自动发送以下消息</p>
        </div>
        <div v-for="( verbal,index) in this.cardResponse" :key="verbal.id">
            <sp-reply :title="title" v-model="verbal.content"></sp-reply>
        </div>
        <fixed-button :title="'保存'" @clickHandler="save"></fixed-button>
    </div>
</template>
<script>
export default {
    data() {
        return {
            cardResponse:[],
            title: '自动回复',
            title1: '自动回复1',
            title2: '自动回复2',
            title3: '自动回复3',
            content: ''
        }
    },
    created(){
        axios.get(this.$apiConfig.reponseList,{}).then(res=>{
           if(res.data.code==0){
               this.cardResponse = res.data.data.cardAutoResponseVOList;
           }
        });
    },
    methods: {
        save() {
            let vm = this;
            axios.post(this.$apiConfig.editReponseVerbal, this.cardResponse).then(res => {
                if (res.data.code == 0) {
                    vm.$createToast({
                        time: 100
                    }).show();
                }

            });
        }
    }
}
</script>
<style lang="less" scoped>
.reply{
    padding-bottom: 64px;
    .title{
        p{
            font-size: 12px;
            color:rgba(151,160,177,1);
            padding: 0 15px 10px 30px;
        }
    }
}
</style>



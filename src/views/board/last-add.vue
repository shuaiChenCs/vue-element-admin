<template>
    <div class="sp-scroll" v-scroll="loadmore">
    <div class="last-add">
        <div class="ai-list">
            <div class="block-item-title">
                <i class="iconfont iconcard_pause"></i>
                昨日新增客户（共{{page.total}}位）
            </div>
            <div class="ai-item" v-for="(item,index) in client" :key="index">
                <div class="ai-card" @click="$router.push('/address-book/person/'+item.id)">
                    <img :src="item.headImg" alt>
                    <h1>{{item.nikeName}}</h1>
                    <p>看过你的名片，快抓住时机，主动出击</p>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            current:1,
            size:6,
            page:{},
            client:[]
        }
    },
    created(){
        this.loadClient();
    },
    methods:{
        loadmore(){
            this.current++;
            this.loadClient();
        },
        loadClient(){
            axios.get(this.$apiConfig.yesterdayNewClient+"?current="+this.current+"&size="+this.size,{}).then(res=>{
                if(res.data.code==0){
                    this.page = res.data.data;
                    this.client = this.client.concat(this.page.records);
                    // if(this.page.records.length==0){
                    //     this.current--;
                    // }
                }
            })
        }
    }
}
</script>
<style lang="less" scoped>
.last-add{
    min-height: 100%;
    .ai-list{
        .block-item-title{
            margin-bottom: 15px;
        }
        .ai-item{
            padding: 15px;
            margin-bottom: 15px;
            text-align: center;
            .ai-card{
                height:100px;
                background:rgba(255,255,255,1);
                border-radius:5px;
                text-align: center;
                img{
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    border: 1Px solid #1ED29A;
                    margin-top: -20px;
                    margin-bottom: 9px;
                }
                h1{
                    font-size: 15px;
                    font-weight: bold;
                    margin-bottom: 9px;
                }
                p{
                    color:rgba(151,160,177,1);
                    font-size: 12px;
                    margin-bottom: 15px;
                    span{
                        color: #1ED29A;
                    }
                }
            }
        }
    }
}
</style>



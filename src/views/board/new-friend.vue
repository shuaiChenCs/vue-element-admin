<template>
    <div class="new-friend">
        <div>
            <div class="block-item-title">
                <i class="iconfont iconcard_pause"></i>
                新增客户 {{page.total}}
            </div>
            <no-data v-if="page.total == 0"></no-data>
            <div class="scview-list">
                <div class="custom-item" v-for="(item,index) in client" :key="index" @click="$router.push('/address-book/person/'+item.id)">
                    <img :src="item.headImg" alt>
                    <span>{{item.nikeName}}</span>
                    <span class="time">{{item.createTime | formatDate('yyyy-MM-dd hh:mm:ss')}}</span>
                </div>
                <no-more v-if="page.total != 0 && page.total==client.length"></no-more>
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
.new-friend{
    height: 100vh;
    .scview-list{
        .custom-item {
            &:last-child {
                border: none;
            }
        }
        background: white;
    }
}
</style>



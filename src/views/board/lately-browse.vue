<template>
    <div class="sp-scroll" v-scroll="loadmore">
        <div class="share-count">
            <div>
                <div class="block-item-title">
                    <i class="iconfont iconcard_pause"></i>
                    浏览总数 {{page.total}}
                </div>
                <div class="scview-list">
                    <div class="custom-item" v-for="(item,index) in behaviorList" :key="index" @click="$router.push('/address-book/person/'+item.directoryId)">
                        <img :src="item.userHeadImg" alt>
                        <span>{{item.userName}}</span>
                        <span class="time">{{item.createTime | formatDate('yyyy-MM-dd hh:mm:ss')}}</span>
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
                size:12,
                page:{},
                behaviorList:[]
            }
        },
        created(){
            this.loadData();
        },
        methods:{
            loadmore(){
                this.current++;
                this.loadData();
            },
            loadData(){
                axios.post(this.$apiConfig.latelyBrowse,{
                    current:this.current,
                    size:this.size,
                    queryYesterday:false
                }).then(res=>{
                    if(res.data.code==0){
                        this.page = res.data.data;
                        this.behaviorList = this.behaviorList.concat(this.page.records);
                    }
                })
            }
        }
    }
</script>
<style lang="less" scoped>
    .share-count{
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



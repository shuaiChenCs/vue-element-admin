<template>
    <div class="goods sp-scroll" v-scroll="loadmore">
    <div class="scview">
        <div>
            <div class="block-item-title">
                <i class="iconfont iconcard_pause"></i>
                浏览总量 {{page.total}}
            </div>
            <div class="scview-list">
                <no-data v-if="page.total==0"></no-data>
                <div class="custom-item" v-for="(item,index) in behaviorList" :key="index" @click="$router.push('/address-book/person/'+item.directoryId)">
                    <img :src="item.userHeadImg" alt>
                    <span>{{item.userName}}</span>
                    <span class="time">{{item.createTime | formatDate}}</span>
                </div>
                <no-more v-if="page.total!=0 && page.total == behaviorList.length"></no-more>
            </div>
        </div>
    </div>
    </div>
</template>
<script>
import {formatDate} from "../../common/date";

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
    filters:{
        formatDate(time) {
            var date = new Date(time);
            return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
        }
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
                queryYesterday:true
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
.scview{
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



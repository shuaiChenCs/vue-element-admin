<template>
    <div class="goods sp-scroll" v-scroll="loadmore">
    <div class="ai">
        <div class="ai-list">
            <no-data v-if="page.total==0"></no-data>
            <div class="ai-item" v-for="(item,index) in behaviorList" :key="index">
                <div class="time">
                   {{item.createTime | formatDate}}
                </div>
                <div class="ai-card" @click="$router.push('/address-book/person/'+item.directoryId)">
                    <img :src="item.userHeadImg" alt>
                    <h1>{{item.userName}}</h1>
                    <p>{{item.operateDesc}}</p>
                    <div class="tags">
                        <div class="tag-item"  v-for="(label,labelI) in item.labelList" :key="labelI" v-if="labelI<4">{{label}}</div>
                        <div class="tag-item add" @click.self.stop="$router.push('/address-book/addTags/'+item.directoryId)">添加标签</div>
                    </div>
                </div>
            </div>
            <no-more v-if="page.total!=0 && page.total==behaviorList.length"></no-more>
        </div>
    </div>
    </div>
</template>
<script>
    import {formatDate} from '@/common/date.js';
export default {
    data(){
        return {

            current:1,
            size:6,
            page:{},
            behaviorList:[]
        }
    },
    created(){
        this.loadAi();
    },
    filters: {
        formatDate(time) {
            var date = new Date(time);
            return formatDate(date, 'yyyy-MM-dd hh:mm');
        }
    },
    methods:{
        loadmore(){
            this.current++;
            this.loadAi();
        },
        loadAi(){
            axios.post(this.$apiConfig.ai,{
                current:this.current,
                size:this.size
            }).then(res=>{
                if(res.data.code==0){
                    this.page = res.data.data;
                    this.behaviorList=this.behaviorList.concat(this.page.records);
                }
            })
        }
    }
}
</script>
<style lang="less" scoped>
.ai{
    min-height: 100%;
    padding: 15px;
    .ai-list{
        .ai-item{
            margin-bottom: 15px;
            text-align: center;
            .time{
                margin: 0 auto;
                text-align: center;
                width:263px/2;
                height:60px/2;
                background:rgba(237,238,241,1);
                border-radius:30px/2;
                line-height: 30px;
                margin-bottom: 35px;
            }
            .ai-card{
                // height:277px/2;
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
                }
                .tags{
                    display: flex;
                    justify-content: center;
                    flex-wrap: wrap;
                    .tag-item{
                        height: 24px;
                        line-height: 24px;
                        color: #1ED29A;
                        border-radius: 5px;
                        border: 1Px solid #1ED29A;
                        padding: 0 10px;
                        margin-right: 10px;
                        margin-bottom: 10px;
                        &:nth-child(4n) {
                            margin-right: 0;
                        }
                        &.add{
                            margin-right: 0;
                            color:rgba(151,160,177,1);
                            border: none;
                            background:rgba(243,245,247,1);
                        }
                    }
                }
            }
        }
    }
}
</style>



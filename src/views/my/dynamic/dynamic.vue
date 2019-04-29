<template>
    <div class="dynamic sp-scroll" v-scroll="loadmore">
        <no-data v-if="dynamicList.length==0"></no-data>
        <div class="dynamic-item" v-for="(item,index) in dynamicList" :key="item.id">
            <div class="header">
                <img :src="item.headImg" alt>
                <span>{{item.cardName}}</span>
            </div>
            <div class="sigle-content">
                {{item.content}}
            </div>
            <div class="sigle-image-video" v-for="(mul,index) in item.multimediaList" v-if="item.multimediaList.length==1">
                <img :src="mul.multimediaUrl" v-if="mul.multimediaType==1"  @click="showImagePreview(item.multimediaList,index)" alt>
                <sp-video :src="mul.multimediaUrl" v-else></sp-video>
            </div>
            <div class="goods-type" v-if="item.type==2" @click="goGoods(item.typeId)">
                <div class="goods-item">
                    <div class="img">
                        <img :src="item.goodsImg" alt>
                    </div>
                    <div class="name">{{item.goodsName}}</div>
                    <div class="handler">
                        <span>￥{{item.goodsPrice}}</span>
                    </div>
                </div>
            </div>
            <div class="multi-image" v-if="item.multimediaList.length>1">
                <div v-for="(mul,index) in item.multimediaList" :key="mul.id">
                    <img :src="mul.multimediaUrl" v-if="mul.multimediaType==1" @click="showImagePreview(item.multimediaList,index)" alt>
                </div>
            </div>
            <div class="dynamic-handler">
                <div>
                    <span class="time">{{serverDate| dateDiff(item.createTime)}}</span>
                    <span class="delete" @click="delDynamic(item.id,index)">删除</span>
                </div>
                <!-- <div class="btn">
                  <div class="btn-box">
                    <span>
                      <i class="iconfont iconmoment_like"></i>
                      赞
                    </span>
                    <span>
                      <i type class="iconfont iconmoment_message"></i>
                      评论
                    </span>
                  </div>
                  <i class="iconfont iconmoment_interact"></i>
                </div> -->
            </div>
            <div class="commet-box"  v-if="item.praiseList.length>0 || item.commentList.length>0">
                <div class="like-list"  v-if="item.praiseList.length>0">
                    <i type="" class="iconfont iconmoment_like"></i>
                    <span v-for="(praise,index) in item.praiseList">
                {{praise.cardName}} <span v-if="index<item.praiseList.length-1">,</span>
            </span>
                </div>
                <div class="commet-list"  v-if="item.commentList.length>0">
                    <div class="commet-item"  v-for="(comment,index) in item.commentList" :key="comment.id">
                        <span class="name">{{comment.cardName}}</span>
                        <span v-if="comment.beforeCardId">&nbsp;回复&nbsp;</span>
                        <span class="name" v-if="comment.beforeCardId">{{comment.beforeCardName}}</span><span class="name">：</span>
                        <span>{{comment.comment}}</span>
                    </div>
                </div>
            </div>
        </div>
        <no-more v-if="total!=0 && total==dynamicList.length"></no-more>
        <fixed-button :title="'发布动态'" @clickHandler="addDynamic"></fixed-button>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                current:1,
                size:6,
                total:0,
                count: 2,
                selfCard:this.$store.state.card,
                dynamicList:[],
                serverDate:new Date()
            }
        },
        created(){
            this.loadDynamic();

        },
        methods: {
            showImagePreview(item,index){
                let imgs = item.map(item=>{return item['multimediaUrl']});
                this.initialIndex = index
                const params = {
                    $props: {
                        imgs: imgs,
                        initialIndex: 'initialIndex', // 响应式数据的key名
                        loop: false
                    },
                    $events: {
                        change: (i) => {
                            // 必须更新 initialIndex
                            this.initialIndex = i
                        }
                    }
                }
                this.$createImagePreview({ ...params }).show();
            },
            goGoods(typeId){
                this.$router.push('/my/goods/detail/'+typeId);
            },
            delDynamic(id,index){
                let vm = this;
                this.$createDialog({
                    type: 'confirm',
                    content: '确认是否删除',
                    onConfirm(e){
                        axios.delete(vm.$apiConfig.delDynamic+''+id,{}).then((res)=>{
                            if(res.data.code==0) {
                                vm.dynamicList.splice(index,1);
                                vm.$createToast({
                                    time: 100
                                }).show();
                            }
                        });
                        if(vm.dynamicList.length<6){
                            vm.current++;
                            vm.loadDynamic();
                        }
                    }
                }).show()
            },
            loadDynamic(){
                axios.post(this.$apiConfig.getDynamic,{
                    current:this.current,
                    size:this.size,
                    cardId:this.selfCard.id
                }).then(res=>{
                    if(res.data.code == 0){
                        this.total = res.data.data.total;
                        this.dynamicList =  this.dynamicList.concat(res.data.data.records);
                        this.serverDate = this.dynamicList[0].serviceDate;
                        if(res.data.data.records.length==0){
                            this.current--;
                        }
                    }
                })
            },
            loadmore() {
                this.current++;
                this.loadDynamic();
            },
            addDynamic() {
                this.$router.push('/my/dynamic/add');
            }
        }
    }
</script>

<style lang="less">
    .dynamic {
        background: white !important;
        padding-bottom: 64px;
        .dynamic-item {
            padding: 15px;
            .header {
                display: flex;
                align-items: center;
                img {
                    height: 40px;
                    width: 40px;
                    border-radius: 50%;
                    margin-right: 15px;
                }
                span {
                    font-size: 15px;
                    font-weight: bold;
                }
            }
            .dynamic-handler {
                margin-top: 20px;
                display: flex;
                justify-content: space-between;
                .btn {
                    position: relative;
                    .btn-box {
                        display: flex;
                        position: absolute;
                        background: rgba(50, 54, 67, 0.8);
                        height: 78px/2;
                        width: 175px;
                        border-radius: 4px;
                        left: -354px/2;
                        top: -23px/2;
                        align-items: center;
                        > span {
                            &:first-child {
                                border-right: 1px solid rgba(50, 54, 67, 1);
                            }
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            color: white;
                            flex: 1;
                            text-align: center;
                            i {
                                margin-right: 5px;
                            }
                        }
                    }
                }
                .time {
                    font-size: 12px;
                    color: rgba(151, 160, 177, 1);
                    margin-right: 15px;
                }
                .delete {
                    font-size: 12px;
                    color: #1ed29a;
                }
            }
            .goods-item {
                box-shadow: 0px 0px 18px 2px rgba(0, 0, 0, 0.1);
                border-radius: 5px;
                overflow: hidden;
                background: white;
                margin: 15px 0;
                img {
                    text-align: center;
                    width:100%;
                }
                .name,
                .handler {
                    font-size: 13px;
                    padding: 0 15px;
                    height: 30px;
                    line-height: 30px;
                }
                .handler {
                    display: flex;
                    justify-content: space-between;
                    span {
                        font-size: 15px;
                        color: #ff6f59;
                    }
                }
            }
            .commet-box {
                &::after {
                    position: absolute;
                    content: "";
                    top: -6px;
                    left: 10px;
                    border-top: -10px transparent dashed;
                    border-left: 10px transparent dashed;
                    border-right:10px transparent dashed;
                    border-bottom: 10px rgba(243, 245, 247, 1) solid;
                }
                position: relative;
                margin-top: 20px;
                padding: 10px;
                background: rgba(243, 245, 247, 1);
                border-radius: 5px;
                .commet-list{
                    margin-top: 15px;
                    .commet-item{
                        padding: 3px 0;
                        .name{
                            font-size: 13px;
                            font-weight: bold;
                        }
                    }
                }
                .like-list{
                    font-size: 13px;
                    font-weight: bold;
                    i{
                        font-size: 12px;
                        color: #97A0B1;
                    }
                }
            }
            .sigle-content{
                margin-top: 15px;
                font-size: 13px;
                white-space: normal;
                word-break: break-all;
                line-height: 1.3;
            }
            .sigle-image-video{
                margin-top: 15px;
                text-align: center;
                box-shadow: 0px 0px 18px 2px rgba(0, 0, 0, 0.1);
                border-radius: 5px;
                height: 200px;
                overflow: hidden;
                img{
                    height: 100%;
                    width: 100%;
                }
            }
            .multi-image{
                margin-top: 15px;
                overflow: hidden;
                display: flex;
                flex-wrap: wrap;
                justify-content: flex-start;
                >div{
                    width: calc((100% - 20px) / 3);
                    height: 110px;
                    margin: 0 10px 10px 0;
                    border-radius: 5px;
                    overflow: hidden;
                    img{
                        height: 100%;
                        width: 100%;
                    }
                    &:nth-child(3n) {
                        margin-right: 0;
                    }
                }
            }
        }
    }
</style>


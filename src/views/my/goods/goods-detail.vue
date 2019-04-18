<template>
    <div class="product-detail">
        <div class="header">
            <div class="main-img">
                <!--<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="5000" :duration="500">-->
                <!--<swiper-item v-for="item in productDetail.bannerList" :key="item.id">-->
                <!--<image :src="item.imgUrl" mode="aspectFit" @tap="previewImg(item.imgUrl)" ></image>-->
                <!--</swiper-item>-->
                <!--</swiper>-->
                <cube-slide class="swiper" ref="slide" :data="goodsDetail.bannerList">
                    <cube-slide-item v-for="(item, index) in goodsDetail.bannerList" :key="index">
                        <img :src="item.imgUrl" @click="showBannerImagePreview(index)">
                    </cube-slide-item>
                </cube-slide>
            </div>
            <div class="name">{{goodsDetail.name}}</div>
            <div class="price">¥ {{goodsDetail.price}}</div>
        </div>
        <div class="bottom">
            <div class="title">
                <i type="" class="iconfont iconcard_pause"></i>
                <span>商品信息</span>
            </div>
            <div class="info-block" v-for="(item,index) in goodsDetail.infoList" :key="item.id">
                <div class="img-video">
                    <img  @tap="previewImg(item.multimediaUrl)" :src="item.multimediaUrl" mode="widthFix" v-if="item.multimediaType == 1"  @click="showInfoImgPreview(item.id)"></img>
                    <sp-video :src="item.multimediaUrl" controls v-if="item.multimediaType == 2"></sp-video>
                </div>
                <div class="descript">
                    {{item.content}}
                </div>
            </div>
        </div>
        <fixed-button :title="'编辑商品'" @clickHandler="editGoods"></fixed-button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                id:0,
                goodsDetail: {},
                bannerList:[],
                infoImgList:[]
            };
        },
        created(){
            this.id = this.$route.params.id;
            this.getGoodDetail(this.id);
        },
        methods: {
            showBannerImagePreview(index) {
                this.showImgPreview(this.bannerList,index);
            },
            showInfoImgPreview(id){
                let img = [];
                let index = 0;
                this.infoImgList.forEach((res,i)=>{
                    img.push(res['multimediaUrl']);
                    if(id == res['id']){
                        index = i;
                    }
                });
                this.showImgPreview(img,index);
            },
            showImgPreview(imgs,index){
                if(imgs<=0){
                    return;
                }
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
                this.$createImagePreview({ ...params }).show()
            },
            editGoods(){
                this.$router.push({name:'goods-edit',params:{id:this.id}});
            },
            previewImg(url) {
                // uni.previewImage({
                //     urls: [url]
                // });
            },
            getGoodDetail(id) {
                axios.get(this.$apiConfig.getGoodDetail+"?id="+id,{}).then((res)=>{
                    if(res.data.code==0){
                        this.goodsDetail = res.data.data;
                        this.bannerList = this.goodsDetail.bannerList.map(item=>{return item['imgUrl']});
                        let infoList = this.goodsDetail.infoList;
                        infoList.forEach(item=>{
                            if(item.multimediaType==1){
                                this.infoImgList.push(item);
                            }
                        });
                    }
                });
            }
        }
    }
</script>

<style lang="less" scoped>
    .product-detail{
        .bottom{
            background: white;
            margin-top: 20px;
            padding: 0 30px;
            padding-bottom: 80px;
            >.title{
                height: 65px/2;
                display: flex;
                color: rgba(151, 160, 177, 1);
                font-size:13px;
                align-items: center;
                .iconfont{
                    margin-right: 10px;
                    color: rgba(30, 210, 154, 1);
                    font-size: 10px;
                }
            }
            .info-block{
                margin-bottom: 20px;

                .img-video{
                    text-align: center;
                    video{
                        width: 100%;
                        /*height: 400px;*/
                    }
                    img{
                        width:100%;
                    }
                }
                .descript{
                    padding: 20px 0;
                    font-size:13px;
                    color: rgba(50,54,67,1);
                }
            }
        }
        .header{
            text-align: center;
            .main-img{
                .swiper{
                    height: 300px;
                    img{
                        height: 100%;
                        width: 100%;
                    }
                }
            }
            .name{
                background: white;
                padding: 30px;
                font-size:24px;
                color:rgba(50,54,67,1);
            }
            .price{
                background: white;
                padding-bottom: 30px;
                font-size:18px;
                color:rgba(251,77,61,1);
            }
        }
    }
</style>

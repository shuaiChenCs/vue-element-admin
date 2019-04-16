<template>
    <div class="product-detail">
        <div class="header">
            <div class="main-img">
                <swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="5000" :duration="500">
                    <swiper-item v-for="item in productDetail.bannerList" :key="item.id">
                        <image :src="item.imgUrl" mode="aspectFit" @tap="previewImg(item.imgUrl)" ></image>
                    </swiper-item>
                </swiper>
            </div>
            <view class="name">{{productDetail.name}}</view>
            <view class="price">¥ {{productDetail.price}}</view>
        </div>
        <div class="bottom">
            <div class="title">
                <uni-icon type="" class="iconfont iconcard_pause"></uni-icon>
                <text>商品信息</text>
            </div>
            <div class="info-block" v-for="item in productDetail.infoList" :key="item.id">
                <div class="img-video">
                    <image  @tap="previewImg(item.multimediaUrl)" :src="item.multimediaUrl" mode="widthFix" v-if="item.multimediaType == 1"></image>
                    <video :src="item.multimediaUrl" controls v-if="item.multimediaType == 2"></video>
                </div>
                <div class="descript">
                    {{item.content}}
                </div>
            </div>
        </div>
        <no-more></no-more>
    </div>
</template>

<script>
    // import api from '@/api/api.js';
    export default {
        data() {
            return {
                productDetail: {}
            };
        },
        onLoad(options) {
            this.getGoodDetail(options.id)
        },
        methods: {
            previewImg(url) {
                // uni.previewImage({
                //     urls: [url]
                // });
            },
            getGoodDetail(id) {
                // this.spRequest({
                //     url: api.getGoodDetail,
                //     operateCid: this.$store.state.user.id,
                //     operateCode: '2-4',
                //     operateId: id,
                //     method: 'GET',
                //     data: {
                //         id: id
                //     },
                //     success: res => {
                //         this.productDetail = res.data.data || {};
                //     }
                // });
            }
        }
    }
</script>

<style lang="less">
    .product-detail{
        .bottom{
            background: white;
            margin-top: 20px;
            padding: 0 30px;
            >.title{
                height: 65px;
                display: flex;
                color: rgba(151, 160, 177, 1);
                font-size:26px;
                align-items: center;
                .iconfont{
                    margin-right: 10px;
                    color: rgba(30, 210, 154, 1);
                    font-size: 20px;
                }
            }
            .info-block{
                margin-bottom: 20px;
                .img-video{
                    text-align: center;
                    video{
                        width: 100%;
                        height: 400px;
                    }
                    image{
                        height: 400px;
                    }
                }
                .descript{
                    padding: 20px 0;
                    font-size:26px;
                    color: rgba(50,54,67,1);
                }
            }
        }
        .header{
            text-align: center;
            .main-img{
                .swiper{
                    height: 600px;
                    image{
                        height: 100%;
                        width: 100%;
                    }
                }
            }
            .name{
                background: white;
                padding: 30px;
                font-size:48px;
                color:rgba(50,54,67,1);
            }
            .price{
                background: white;
                padding-bottom: 30px;
                font-size:36px;
                color:rgba(251,77,61,1);
            }
        }
    }
</style>

<template>
    <div class="article-detail">
        <cube-popup type="my-popup" :zIndex="10000" :position="''" :mask-closable="true" ref="articlePopup">
            <sp-card :title="'查看文章'" :url="articleQrcode"></sp-card>
        </cube-popup>
        <cube-popup type="my-popup" :zIndex="10000" class="share-pop" :position="''" :mask-closable="true" ref="cardPopup">
            <img src="@/assets/images/yindao.png" alt="" width="200">
        </cube-popup>
        <div class="article-header">
            <div class="avatar">
                <img :src="selfCard.headImg" alt="">
            </div>
            <div class="info">
                <div class="name">{{selfCard.cardName}}</div>
                <div class="view-info">文章数 {{selfCard.articleQuantity || 0}}&nbsp;&nbsp;&nbsp;视频数 {{selfCard.videoQuantity || 0}}&nbsp;&nbsp;&nbsp;浏览量 {{selfCard.pageView || 0}}</div>
            </div>
        </div>
        <div class="article-content">
            <div v-html="article.newsContent"></div>
        </div>
        <div class="show-card">
            <div class="block-item-title">
                <i class="iconfont iconcard_pause"></i>
                名片显示
            </div>
            <div class="card-info">
                <div class="item-info">
                    <span class="name">{{selfCard.cardName}}</span>
                    <span class="job">{{selfCard.position}}</span>
                    <div class="company">
                        <i class="iconfont iconcard_company"></i>
                        <span>{{selfCard.companyName}}</span>
                    </div>
                    <div class="phone">
                        <i type="" class="iconfont iconcard_phone"></i>
                        <span>{{selfCard.mobile}}</span>
                    </div>
                </div>
                <div class="item-avatar">
                    <img :src="selfCard.qrCode || ''"/>
                </div>
            </div>
        </div>
        <div class="fixed-btn">
            <button class="left" @click="showArticlePop">生成文章小程序</button>
            <button class="right" @click="showPopup">分享</button>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                selfCard:this.$store.state.user.cardVO,
                article: {
                    newsTitle:'',
                    newsThumbnail:'',
                    newsIntroduce:''
                },
                articleQrcode: ''
            }
        },
        mounted(){
            this.getWxConfig(encodeURIComponent(this.getCrtUrl('#'), {}));
            this.getArticleContent();
            // this.shareToOne();
        },
        methods:{
            showArticlePop() {
                const component = this.$refs.articlePopup;
                component.show();
            },
            shareToOne() {
                let _this = this;
                let url  = this.getCrtUrl('?')+'?docId='+this.$route.query.docId+'&cardId='+this.selfCard.id;
                wx.ready(function(res) {
                    wx.showOptionMenu({
                        menuList: ["menuItem:share:appMessage","menuItem:share:timeline", "menuItem:share:qq","menuItem:share:QZone"]
                    });
                    let share = {
                        title: _this.article.newsTitle,
                        desc: _this.article.newsIntroduce,
                        link: url,
                        imgUrl: _this.article.newsThumbnail,
                        trigger: function (res) {
                            // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
                            // alert('用户点击发送给朋友');
                            _this.axios.post(_this.$apiConfig.shareNew,{
                                newsId:_this.$route.query.docId
                            }).then(res=>{
                            })
                        },
                        success: function (res) {
                            // alert('分享成功')
                        },
                        cancel: function (res) {
                            // alert('已取消');
                        },
                        fail: function (res) {
                            // alert(JSON.stringify(res));
                        }
                    };
                    wx.onMenuShareAppMessage(share); //分享朋友
                    wx.onMenuShareTimeline(share);  //朋友圈
                    wx.onMenuShareQQ(share); //分享qq
                    wx.onMenuShareQZone(share); //分享qq空间
                });
            },
            showPopup() {
                const component = this.$refs.cardPopup;
                component.show();
            },
            getCrtUrl(indexChar){
                let temp = window.location.href;
                let end = temp.indexOf(indexChar);
                if(end!=-1){
                    return temp.substring(0,end);
                }else{
                    return temp
                }
            },
            getArticleContent() {
                let params = {
                    newsId: this.$route.query.docId
                }
                let _this = this;
                axios.post(this.$apiConfig.getArticleContent, params).then(res => {
                    if(res.data.code == 0) {
                        this.article = res.data.data || {};
                        document.title = this.article.newsTitle;
                        // this.shareToOne();
                        let url  = this.getCrtUrl('?')+'?docId='+this.$route.query.docId+'&cardId='+this.selfCard.id;
                        this.wxShareAll(this.article.newsTitle,this.article.newsIntroduce,url,this.article.newsThumbnail,function (res1) {
                            _this.axios.post(_this.$apiConfig.shareNew,params).then(res1=>{});
                        });
                    }
                });
                axios.post(this.$apiConfig.getArticleQrcode, params).then(res => {
                    if(res.data.code == 0) {
                        this.articleQrcode = res.data.data.newsQrCode || '';
                    }
                });
                
            }
        }
    }
</script>
<style lang="less">
.article-detail{
    overflow-y: auto;
    background: #F8F8F8;
    min-height: 100vh;
    padding-bottom: 74px;
    .article-header{
        padding: 25px 15px;
        height: 100px;
        background:linear-gradient(30deg,rgba(11,196,183,1) 0%,rgba(43,217,144,1) 100%);
        display: flex;
        align-items: center;
        .avatar{
            height: 50px;
            width: 60px;
            img{
                width: 50px;
                height: 50px;
                border-radius: 50%;
            }
        }
        .info{
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            color: white;
            font-size: 12px;
            .name{
                font-size: 15px;
                margin-bottom: 10px;
            }
        }
        .article-btn{
            width: 100px;
            >button{
                width: 100%;
                height: 34px;
                border: 1Px solid white;
                border-radius: 17px;
                background: transparent;
                color: white;
                font-size: 15px;
            }
        }
    }
    .article-content{
        overflow-x: hidden !important;
        padding: 15px;
        background: white;
        img, video, section{
            max-width: 100% !important;
        }
    }
    .show-card{
        .card-info{
			margin: 0 15px;
			margin-bottom: 10px;
			// width: 340px;
			height: 276px/2;
			display: flex;
			background:rgba(255,255,255,1);
			border-radius: 5px;
			box-shadow:3px 3px 4px 0px rgba(43,217,144,1);
			.item-avatar{
                width: 276px/2;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
				img{
					width: 70%;
					height: 70%;
					border-top-left-radius: 5px;
                    border-bottom-left-radius: 5px;
				}
			}
			.item-info{
				flex: 1;
				display: flex;
				flex-direction: column;
				padding: 14px 10px;
				font-family:SourceHanSansCN-Normal;
				.name{
					font-size: 20px;
					font-weight: bold;
				}
				.job, .company, .phone{
					display: flex;
					align-items: center;
					margin-top: 10px;
					font-size: 12px;
					color:rgba(151,160,177,1);
					font-weight:400;
					i{
						margin-right: 5px;
						font-size: 12px;
					}
					>span{
						white-space: nowrap;
						max-width: 200px;
						overflow: hidden;
						text-overflow: ellipsis;
					}
				}
				.company{
					margin-top: 20px;
				}
				.company, .phone{
					display: flex;
				}
			}
		}
    }
    .fixed-btn{
        box-shadow:0px 0px 10px 1px rgba(0, 0, 0, 0.1);
        height: 128px/2;
        z-index: 99;
        width: 100%;
        bottom: 0;
        position: fixed;
        padding: 10px 15px;
        background: white;
        display: flex;
        >button{
            flex: 1;
            border: none;
            height: 44px;
            border-radius: 22px;
            font-size: 15px;
            &.left{
                margin-right: 15px;
                border: 1Px solid rgba(30, 210, 154, 1);
                color: rgba(43, 217, 144, 1);
                background: white;
            }
            &.right{
                background:linear-gradient(90deg,rgba(11,196,183,1) 0%,rgba(43,217,144,1) 100%);
                color: white;
            }
        }
    }
}
</style>

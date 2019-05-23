<template>
    <div class="article-detail">
        <div class="article-header">
            <div class="avatar">
                <img :src="card.headImg || ''" alt="">
            </div>
            <div class="info">
                <div class="name">{{card.cardName || ''}}</div>
                <div class="view-info">文章数 {{card.articleQuantity || 0}}&nbsp;&nbsp;&nbsp;视频数 {{card.videoQuantity}}&nbsp;&nbsp;&nbsp;浏览量 {{card.pageView || 0}}</div>
            </div>
            <div class="article-btn">
                <button @click="goto">查看名片</button>
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
                <div class="item-avatar">
                    <img :src="card.headImg || ''" />
                </div>
                <div class="item-info">
                    <span class="name">{{card.cardName || ''}}</span>
                    <span class="job">{{card.position || ''}}</span>
                    <div class="company">
                        <i class="iconfont iconcard_company"></i>
                        <span>{{card.companyName || ''}}</span>
                    </div>
                    <div class="phone">
                        <i type="" class="iconfont iconcard_phone"></i>
                        <span>{{card.mobile || ''}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="fixed-btn" v-if="isMe">
            dsa
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                card:{},
                selfCard:this.$store.state.user.cardVO,
                isMe: true,
                article: {},
                time:1,
                docId:0,
                cardId:0
            }
        },
        mounted(){
            this.getArticleContent();
            window.addEventListener( 'popstate', e => {
                alert(123)
                this.addBehavior('5-1');
            });
        },
        destroyed(){
            alert(312)
        },
        beforeRouteLeave(to,from,next){
            if(this.getUrlParam('token')) {
                next();
            }else
                next(false);
        },
        methods:{
            shareToOne() {
                let _this = this;
                let url  = this.getCrtUrl()+'?docId='+this.getUrlParam('docId')+'&cardId='+this.card.id;
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
            goto() {
                uni.reLaunch({
					url: `/pages/index/index?id=83`
				});
            },
            getUrlParam (name) {
                let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
                let r = window.location.search.substr(1).match(reg);
                if (r != null) return decodeURIComponent(r[2]); return null;
            },
            getCrtUrl(){
                let temp = window.location.href;
                let end = temp.indexOf('?');
                if(end!=-1){
                    return temp.substring(0,end);
                }else{
                    return temp
                }
            },
            getArticleContent() {
                this.cardId = this.getUrlParam('cardId') || this.selfCard.id;
                this.docId = this.getUrlParam('docId');
                let params = {
                    newsId: this.docId,
                    cardId:this.cardId
                }
                axios.post(this.$apiConfig.getShareArticleContent, params).then(res => {
                    if(res.data.code == 0) {
                        this.article = res.data.data || {};
                        document.title = this.article.newsTitle;
                    }
                });
                axios.post(this.$apiConfig.newsOther, params).then(res=>{
                    if(res.data.code == 0){
                        let data = res.data.data;
                        this.card = data.articleMemberVO.cardVO;
                        this.shareToOne();
                    }
                });
                this.addBehavior('5');
                setInterval(function(){
                    this.time++;
                },1000);
            },
            addBehavior(code){
                axios.post(this.$apiConfig.behavior,{
                    cardId:this.cardId,
                    duration:this.time,
                    objectId:this.docId,
                    operateCode:code
                }).then(res=>{});
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
        img, video{
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
				width: 249px/2;
				img{
					width: 100%;
					height: 100%;
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
    }
}
</style>

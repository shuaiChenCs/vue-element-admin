<template>
    <div class="article-detail">
        <div class="article-header">
            <div class="avatar">
                <img src="https://images.sipinoffice.com/common/4CB354CF6EE845A3BFB26A9A82302D40.png" alt="">
            </div>
            <div class="info">
                <div class="name">刘鹤鸣</div>
                <div class="view-info">文章数 2&nbsp;&nbsp;&nbsp;视频数 3&nbsp;&nbsp;&nbsp;浏览量 14</div>
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
                    <img src="https://images.sipinoffice.com/common/4CB354CF6EE845A3BFB26A9A82302D40.png" />
                </div>
                <div class="item-info">
                    <span class="name">张三</span>
                    <span class="job">销售经理</span>
                    <div class="company">
                        <i class="iconfont iconcard_company"></i>
                        <span>暂无数据</span>
                    </div>
                    <div class="phone">
                        <i type="" class="iconfont iconcard_phone"></i>
                        <span>暂无数据</span>
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
                isMe: true,
                article: {}
            }
        },
        mounted(){
            this.getArticleContent();
        },
        methods:{
            shareToOne() {
                let _this = this;
                let url  = this.getCrtUrl()+'?docId=' + _this.getUrlParam('docId');
                wx.ready(function(res) {
                    wx.showOptionMenu();
                    wx.onMenuShareAppMessage({
                        title: _this.article.newsTitle,
                        desc: '在长大的过程中，我才慢慢发现，我身边的所有事，别人跟我说的所有事，那些所谓本来如此，注定如此的事，它们其实没有非得如此，事情是可以改变的。更重要的是，有些事既然错了，那就该做出改变。',
                        link: url,
                        imgUrl: _this.article.newsThumbnail,
                        trigger: function (res) {
                            // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
                            // alert('用户点击发送给朋友');
                        },
                        success: function (res) {
                            // alert('已分享');
                        },
                        cancel: function (res) {
                            // alert('已取消');
                        },
                        fail: function (res) {
                            // alert(JSON.stringify(res));
                        }
                    });
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
                let params = {
                    newsId: this.getUrlParam('docId')
                }
                axios.post(this.$apiConfig.getArticleContent, params).then(res => {
                    if(res.data.code == 0) {
                        this.article = res.data.data || {};
                        document.title = this.article.newsTitle;
                        this.shareToOne();
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

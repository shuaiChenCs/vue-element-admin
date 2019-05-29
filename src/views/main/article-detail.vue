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
                <img :src="card.headImg || ''" alt="">
            </div>
            <div class="info">
                <div class="name">{{card.cardName || ''}}</div>
                <div class="view-info">文章数 {{card.articleQuantity || 0}}&nbsp;&nbsp;&nbsp;视频数 {{card.videoQuantity}}&nbsp;&nbsp;&nbsp;浏览量 {{card.pageView || 0}}</div>
            </div>
            <div class="article-btn" v-if="env != 'h5'">
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
                <div class="item-info">
                    <span class="name">{{card.cardName || ''}}</span>
                    <span class="job">{{card.position || ''}}</span>
                    <div class="company" v-if="card.companyName">
                        <i class="iconfont iconcard_company"></i>
                        <span>{{card.companyName || ''}}</span>
                    </div>
                    <div class="phone" v-if="card.mobile">
                        <i type="" class="iconfont iconcard_phone"></i>
                        <span>{{card.mobile || ''}}</span>
                    </div>
                </div>
                <div class="item-avatar">
                    <img :src="card.qrCode || ''" @click="goto"/>
                    {{env == 'h5' ? '长按进入名片' : '点击进入名片'}}
                </div>
            </div>
        </div>
        <fixed-button :title="'转发'" @clickHandler="share" v-if="isMe"></fixed-button>
        <div class="save-btn-box" v-else>
            <div class="other" @click="chat">
                <i class="iconfont iconmoment_message"></i>
                咨询
            </div>
            <!--<cube-button @click="showArticlePop" v-if="env == 'h5'">查看文章小程序</cube-button>-->
            <cube-button @click="changeToMe">制作成我的</cube-button>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                articleQrcode: '',
                env: '',
                card:{},
                selfCard:this.$store.state.user.cardVO,
                article: {},
                isMe: false,
                time:1,
                docId:0,
                cardId:0,
                meCardId: 0,
                imCard: {
                    nickName: '',
                    imAccount: '',
                    headImg: ''
                }
            }
        },
        mounted(){
            if(wx){
                this.shareToOne();
            }
            uni.getEnv((res)=> {
                if(res.miniprogram == false) {
                    this.env = 'h5';
                }
                if(res.h5 == true) {
                    this.env = 'h5';
                }
            });
            this.cardId = this.getUrlParam('cardId') || this.selfCard.id;
            this.docId = this.getUrlParam('docId');
            this.getArticleContent(this.cardId, this.docId);
        },
        beforeRouteLeave(to,from,next){
            if(to.path=='/chat'){
                next();
            }
            if(this.getUrlParam('token')) {
                next();
            }else{
                next(false);
            }
        },
        methods:{
            socketInit(){
                if(this.isMe){
                    return;
                }
                let websocket = null;

                //判断当前浏览器是否支持WebSocket
                let url = this.axios.defaults.baseURL.replace('https','wss').replace('http','wss')+'/websocket/';
                let behavior = {
                    cardId:this.cardId,
                    duration:this.time,
                    objectId:this.docId,
                    operateCode:"5-1",
                    currentCid:this.$store.state.user.cardVO.id,
                    userId:this.$store.state.user.id
                };
                if('WebSocket' in window){
                    websocket = new WebSocket(url+"/{"+JSON.stringify(behavior)+"}");
                }
                else{
                    console.log('Not support websocket')
                }

                //连接发生错误的回调方法
                websocket.onerror = function(){};

                //连接关闭的回调方法
                websocket.onclose = function(){};

                //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
                window.onbeforeunload = function(){
                    websocket.close();
                }

            },
            showArticlePop() {
                const component = this.$refs.articlePopup;
                component.show();
            },
            chat() {
                let params = {
                    card: this.imCard
                }
                this.$router.push({ path: '/chat', query: { user: params }});
            },
            changeToMe() {
                let params = {
                    newsId: this.docId
                }
                let toast = this.$createToast({
                    txt: ''
                });
                toast.show();
                axios.post(this.$apiConfig.changeToMy, params).then(res => {
                    if(res.data.code == 0) {
                        toast.hide();
                            window.location.replace(`${this.getCrtUrl()}?docId=${this.docId}&cardId=${this.meCardId}#/article`);
                    }
                }).then(() => {
                    if(this.env != 'h5') {
                        uni.redirectTo({
                            url: `/pages/article-detail/article-detail?share_cardId=${this.meCardId}&share_type=article&docId=${this.docId}`
                        });
                    }
                });
            },
            share() {
                const component = this.$refs.cardPopup;
                component.show();
            },
            shareToOne() {
                let _this = this;
                let url  = this.getCrtUrl()+'?docId='+this.getUrlParam('docId')+'&cardId='+this.cardId;
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
					url: `/pages/index/index?id=` + this.card.id
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
            getArticleContent(cardId, docId) {
                let params = {
                    newsId: docId,
                    cardId: cardId
                }
                axios.post(this.$apiConfig.getShareArticleContent, params).then(res => {
                    if(res.data.code == 0) {
                        this.article = res.data.data || {};
                        document.title = this.article.newsTitle;
                    }
                });
                axios.post(this.$apiConfig.getArticleQrcode, params).then(res => {
                    if(res.data.code == 0) {
                        this.articleQrcode = res.data.data.newsQrCode || '';
                    }
                });
                axios.post(this.$apiConfig.newsOther, params).then(res=>{
                    if(res.data.code == 0){
                        let data = res.data.data;
                        this.card = data.articleMemberVO.cardVO;
                        this.meCardId = data.readMemberVO.cardVO.id;
                        this.imCard = {
                            nikeName: data.articleMemberVO.nikeName,
                            imAccount: data.articleMemberVO.imAccount,
                            headImg: data.articleMemberVO.headImg,
                            clientId: data.articleMemberVO.id
                        }
                        this.isMe = data.isMe;
                        this.shareToOne();
                        this.socketInit();
                    }
                });
                this.addBehavior('5');
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
        // overflow-x: hidden !important;
        padding: 15px;
        background: white;
        img, video, section{
            max-width: 100% !important;
        }
        iframe{
            width: 100% !important;
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
                    margin-bottom: 8px;
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

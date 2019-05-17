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
                <button>查看名片</button>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {

            }
        },
        mounted(){
            wx.ready(function(res) {
                wx.showOptionMenu();
                wx.onMenuShareAppMessage({
                    title: '互联网之子',
                    desc: '在长大的过程中，我才慢慢发现，我身边的所有事，别人跟我说的所有事，那些所谓本来如此，注定如此的事，它们其实没有非得如此，事情是可以改变的。更重要的是，有些事既然错了，那就该做出改变。',
                    link: window.location.href,
                    imgUrl: 'http://demo.open.weixin.qq.com/jssdk/images/p2166127561.jpg',
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
        methods:{
            getCrtUrl(){
                let temp = window.location.href;
                let end = temp.indexOf('#');
                if(end!=-1){
                    return temp.substring(0,end);
                }else{
                    return temp
                }
            }
        }
    }
</script>
<style lang="less" scoped>
.article-detail{
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
}
</style>

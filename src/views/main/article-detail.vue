<template>
    <div>
        123123
    </div>
</template>
<script>
    export default {
        mounted(){
            wx.ready(function(res) {
                wx.onMenuShareAppMessage({
                    title: '互联网之子',
                    desc: '在长大的过程中，我才慢慢发现，我身边的所有事，别人跟我说的所有事，那些所谓本来如此，注定如此的事，它们其实没有非得如此，事情是可以改变的。更重要的是，有些事既然错了，那就该做出改变。',
                    link: 'https://h5.sipinoffice.com/article?docid=1',
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
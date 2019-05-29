import apiConfig from '../api/apiConfig.js';

function getCrtUrl(indexChar){
    let temp = window.location.href;
    let end = temp.indexOf(indexChar);
    if(end!=-1){
        return temp.substring(0,end);
    }else{
        return temp
    }
};

const wxConfig = {
    jsApiList:['updateAppMessageShareData','updateTimelineShareData','onMenuShareAppMessage','onMenuShareTimeline','onMenuShareQQ','onMenuShareQZone']
}
export default {
    install(Vue){
        Vue.prototype.getWxConfig = function(url){
            axios.get(apiConfig.wxConfig + '?url=' + url).then(res => {
                if (res.data.code == 0) {
                    let wxConfig = res.data.data;
                    wx.config({
                        debug: false,// 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: wxConfig.appId, // 必填，公众号的唯一标识
                        timestamp: wxConfig.timestamp, // 必填，生成签名的时间戳
                        nonceStr: wxConfig.nonceStr, // 必填，生成签名的随机串
                        signature: wxConfig.signature,// 必填，签名
                        jsApiList: ['updateAppMessageShareData','updateTimelineShareData','onMenuShareAppMessage','onMenuShareTimeline','onMenuShareQQ','onMenuShareQZone'] //
                    });
                    wx.error(function (res) {
                    })
                }
            });
        },
        Vue.prototype.wxShareAll = function(title,desc,link,imgUrl,trigger) {
            wx.ready(function(res) {
                wx.showOptionMenu({
                    menuList: ["menuItem:share:appMessage","menuItem:share:timeline", "menuItem:share:qq","menuItem:share:QZone"]
                });
                let share = {
                    title:title,
                    desc:desc,
                    link: link,
                    imgUrl: imgUrl,
                    trigger: trigger,
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
        }
    }
}
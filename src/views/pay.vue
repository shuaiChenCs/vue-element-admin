<template>
  <div class="pay">
    <cube-slide
        :data="items"
        :loop="false"
        :autoPlay="false"
        :showDots="false"
        direction="vertical"
        @change="change">
    </cube-slide>
    <div class="save-btn-box vip">
		<cube-button class="vip-btn" @click="toVip">立即开通</cube-button>
	</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
        activeIndex: 0,
      items: [
        {
          url: "",
          image:
            "https://images.sipinoffice.com/miniProgram/images/vip08@3x.png"
        },
        {
          url: "",
          image:
            "https://images.sipinoffice.com/miniProgram/images/vip07@3x.png"
        },
        {
          url: "",
          image:
            "https://images.sipinoffice.com/miniProgram/images/vip02@3x.png"
        },
        {
          url: "",
          image:
            "https://images.sipinoffice.com/miniProgram/images/vip03@3x.png"
        },
        {
          url: "",
          image:
            "https://images.sipinoffice.com/miniProgram/images/vip04@3x.png"
        },
        {
          url: "",
          image:
            "https://images.sipinoffice.com/miniProgram/images/vip05@3x.png"
        },
        {
          url: "",
          image:
            "https://images.sipinoffice.com/miniProgram/images/vip06@3x.png"
        }
      ]
    };
  },
  created(){

  },
  methods: {
      toVip () {
          if (typeof WeixinJSBridge == "undefined") {
              if (document.addEventListener) {
                  document.addEventListener('WeixinJSBridgeReady',
                      this.onBridgeReady, false);
              } else if (document.attachEvent) {
                  document.attachEvent('WeixinJSBridgeReady',
                      this.onBridgeReady);
                  document.attachEvent('onWeixinJSBridgeReady',
                      this.onBridgeReady);
              }
          } else {
              this.onBridgeReady();
          }
      },
      onBridgeReady(){
          axios.post(this.$apiConfig.pay,{}).then(res=>{
              if(res.data.code==0){
                  let data = res.data.data;
                  WeixinJSBridge.invoke(
                      'getBrandWCPayRequest', {
                          "appId":data.appId,     //公众号名称，由商户传入
                          "timeStamp":data.timeStamp,         //时间戳，自1970年以来的秒数
                          "nonceStr":data.nonceStr, //随机串
                          "package":data.package,
                          "signType":data.signType,         //微信签名方式：
                          "paySign":data.paySign //微信签名
                      },
                      function(res){
                          if(res.err_msg == "get_brand_wcpay_request:ok" ){
                              this.$router.replace("/");
                              // 使用以上方式判断前端返回,微信团队郑重提示：
                              //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                          }
                      });
              }
          });
      },
      change(index) {
          this.activeIndex = index;
      }
  }
};
</script>
<style lang="less" scoped>
.pay {
    height: 100vh;
    .save-btn-box{
        &.vip{
            background: rgba(35, 35, 48, 1);
            .vip-btn{
                color: black;
                background:linear-gradient(90deg,rgba(178,120,42,1) 0%,rgba(244,214,98,1) 68%,rgba(244,222,139,1) 100%);
            }
        }
    }
}
</style>



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
  methods: {
      toVip () {
        console.log(1)
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



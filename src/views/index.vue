<template>
  <div class="sp">
    <!-- <router-view /> -->
    dasdas
    <div class="sp-tabbar">
      <cube-tab-bar
        v-model="selectedLabelDefault"
        :data="tabs"
        @click="clickHandler"
        @change="changeHandler"
      ></cube-tab-bar>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selectedLabelDefault: "Vip",
      tabs: [
        {
          label: "Home",
          icon: "cubeic-home"
        },
        {
          label: "Like",
          icon: "cubeic-like"
        },
        {
          label: "Vip",
          icon: "cubeic-vip"
        },
        {
          label: "Me",
          icon: "cubeic-person"
        }
      ]
    };
  },

  beforeRouteEnter(to, from, next) {
    console.log(to);
  },
  methods: {
    clickHandler(label) {
      // if you clicked home tab, then print 'Home'
      console.log(label);
    },
    changeHandler(label) {
      // if you clicked different tab, this methods can be emitted
    }
  }
};
</script>
<style lang="less" scoped>
.sp {
}
</style>



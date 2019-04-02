<template>
  <div id="app">
    <router-view/>
		<mt-tabbar v-model="selected" fixed>
			<mt-tab-item id="首页">
				<!-- <img slot="icon" src="../assets/100x100.png"> -->
				首页
			</mt-tab-item>
			<mt-tab-item id="通讯录">
				<!-- <img slot="icon" src="../assets/100x100.png"> -->
				通讯录
			</mt-tab-item>
			<mt-tab-item id="看板">
				<!-- <img slot="icon" src="../assets/100x100.png"> -->
				看板
			</mt-tab-item>
			<mt-tab-item id="我的">
				<!-- <img slot="icon" src="../assets/100x100.png"> -->
				我的
			</mt-tab-item>
		</mt-tabbar>
  </div>
</template>

<script>
	export default {
		data() {
			return {
				selected: ''
			}
		},
		mounted() {
			this.selected = '通讯录';
		},
		watch: {
			selected(val){
				if(val == '通讯录') {
					this.$router.push('/address-book');
				}else if(val == '我的') {
					this.$router.push('/my');
				}else if(val == '看板') {
					this.$router.push('/board');
				}else if(val == '首页') {
					this.$router.push('/main');
				}
			}
		}
	}
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
	height: 100%;
}

</style>

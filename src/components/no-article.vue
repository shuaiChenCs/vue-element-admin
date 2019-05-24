<template>
	<div class="no-article">
		<img src="@/assets/images/default.png" width="100" height="100" mode="" />
		<div>{{contentStr || '暂无数据'}}</div>
	</div>
</template>

<script>
	export default {
		props: {
			contentStr: String
		},
		data() {
			return{
				imageUrl: this.$store.state.imageUrl
			}
		},
		mounted() {
		}
	}
</script>

<style lang="less">
.no-article{
	flex-direction: column;
	display: flex;
	align-items: center;
	height: 100%;
	justify-content: center;
	width: 100%;
	font-size:15px;
	color:rgba(151,160,177,1);
}
</style>

<template>
	<div class="sp-no-data">
		<img src="@/assets/images/default.png" mode=""></img>
		<div>{{contentStr || '暂无数据'}}</div>
	</div>
</template>

<script>
	export default {
		props: {
			contentStr: String
		},
		data() {
			return {
				imageUrl: this.$store.state.imageUrl
			};
		},
		mounted() {
		}
	}
</script>

<style lang="less">
.sp-no-data{
	text-align: center;
	width: 100%;
	padding-top: 45%;
	font-size:15px;
	color:rgba(151,160,177,1);
}
</style>

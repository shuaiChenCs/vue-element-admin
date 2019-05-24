<template>
	<div class="save-btn-box">
		<cube-button :disabled="disabled" @click="clickHandler">{{title}}</cube-button>
	</div>
</template>

<script>
	export default {
		props: {
			title: String,
			disabled: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				
			};
		},
		methods: {
			clickHandler() {
				this.$emit('clickHandler');
			}
		}
	}
</script>

<style lang="less">
.save-btn-box{
	box-shadow:0px 0px 10px 1px rgba(0, 0, 0, 0.1);
	height: 128px/2;
	z-index: 99;
	width: 100%;
	bottom: 0;
	position: fixed;
	padding: 10px 15px;
	background: white;
	display: flex;
	button{
		background:#1ED29A;
		border-radius:22px;
		color: white;
		font-size: 15px;
		text-align: center;
		border: none;
		height: 44px;
		padding: 0;
		// line-height: 44px;
	}
	button:active{
		background:#1ED29A;
	}
	.other{
		padding-bottom: 2px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		width: 40px;
		margin-right: 10px;
		color: rgba(151, 160, 177, 1);
		font-size: 13px;
		text-align: center;
		i{
			font-size: 30px;
		}
	}
}
</style>

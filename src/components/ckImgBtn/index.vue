<template>
	<div class="img-btn" @click="$emit('click')">
		<span :class="`bigimg ck-imgicon ${icon}`"></span>
		<span><slot></slot></span>
	</div>
</template>

<script>
export default {
	name: 'tzImgBtn',
	props: {
		// 图标
		icon: {
			type: String,
			default: ''
		},
		title: {
			type: String,
			default: '按钮'
		}
	}
}
</script>

<style lang="scss" scoped>
	.img-btn {
		min-width: 64px;
		text-align: center;
		display: inline-block;
		cursor: pointer;
		span {
			display: inline-block;
			width: 100%;
		}
		.bigimg {
			width: 34px;
			height: 34px;
		}
	}
</style>

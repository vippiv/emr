<template>
	<el-button
		:class="`button-default ${cls}`"
		type="text"
		size="medium"
		@click="$emit('click')"
		@dblclick="$emit('dblclick')"
		>
		<i :class="`iconfont ${icon}`"></i>
		<slot></slot>
	</el-button>
	<!-- TODO 增加禁用功能 -->
</template>

<script>
export default {
	name: 'tzBtn',
	props: {
		// 图标
		icon: {
			type: String,
			default: ''
		},
		// 自定义样式
		cls: {
			type: String,
			default: ''
		}
	}
}
</script>

<style lang="scss" scoped>
	.button-default {
		padding: 0 10px;
		color: #282828;
	}
	.button-default:hover {
		color: #282828;
		opacity: 0.8;
	}
</style>

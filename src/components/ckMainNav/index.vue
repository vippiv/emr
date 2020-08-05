<template>
	<div class="main-nav-container">
		<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @open="handleVisibleChange" @select="handleSelect">
			<el-submenu v-for="(item) in navRoute" :key="item.name" :index="item.name">
				<template slot="title">{{item.meta.title}}</template>
				<el-menu-item v-for="(subItem) in item.children" :key="subItem.name" :index="subItem.name">{{subItem.meta.title}}</el-menu-item>
			</el-submenu>
		</el-menu>
	</div>
</template>

<script type="text/javascript">
	export default {
		props: {
			navRoute: {
				type: Array,
				default: () => []
			}
		},
		data () {
			return {
				activeIndex: '2'
			}
		},
		methods: {
			handleSelect (key, keyPath) {
				// 客户端主菜单点击打开的都是弹窗，所以这里也用弹窗
				this.$emit('showDia', key)
				// this.$router.push({
				// 	path: key
				// })
			},
			handleVisibleChange () {
				console.log('显示iframe')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.main-nav-container{
		background-color: #c3e5ef;
		line-height: 2;
		.route-item{
			padding: 0 5px;
			text-decoration: none;
			color: black;
		}
		/deep/ .el-submenu__title {
			height: 40px;
			line-height: 40px;
		}
	}
</style>

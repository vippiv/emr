<template>
	<div class="main-nav-container">
		<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
			<el-submenu v-for="(item) in baseRoutes" :key="item.path" :index="item.path">
				<template slot="title" v-if="!item.meta.hidden">{{item.meta.title}}</template>
				<el-menu-item v-if="!item.meta.hidden" v-for="(subItem) in item.children" :key="subItem.path" :index="subItem.path">{{subItem.meta.title}}</el-menu-item>
			</el-submenu>
		</el-menu>
	</div>
</template>

<script type="text/javascript">
	import baseRouters from '@/router/routes/base'

	export default {
		name: 'MainNav',
		data () {
			return {
				activeIndex: '2'
			}
		},
		computed: {
			baseRoutes () {
				return baseRouters
			}
		},
		methods: {
			handleSelect (key, keyPath) {
				this.$router.push({
					path: key
				})
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
		.el-menu {
			li:first-child {
				display: none;
			}
		}
	}
</style>

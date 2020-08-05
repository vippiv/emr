<template>
	<div class="header">
		<div class="logo-and-caption">
			<img :src="logo" class="logo">
			<span class="system-name">电子病历信息系统</span>
		</div>
		<div class="header-right">
			<span class="white">当前位置：</span><router-link v-for="(route, index) in routeMatched" :to="route.path" :key="index" class="bread-nav-item">{{route.meta.title}} <span v-if='index < routeMatched.length - 1'>&nbsp;/&nbsp;</span></router-link><span class="white">, &nbsp;</span>
			<el-dropdown @command="handleDropDown">
				<div class="more-btn" @command="handleDropDown">
					<span class="white" style="margin-right: 8px;">欢迎您,{{userInfo && userInfo.nickName}}</span>
					<img src="../../../assets/images/icon/more-btn.png" alt />
				</div>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item :command="2">
						<i class="el-icon-switch-button"></i>
						<span>退出</span>
					</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</div>
</div>
</template>

<script>
import { mapState } from 'vuex'
import * as urls from '@/router/routePath'
import logo from '@/assets/images/logo.png'

export default {
	name: 'Header',
	data () {
		return {
			urls,
			logo,
			routeMatched: []
		}
	},
	computed: {
		...mapState({
			userInfo: state => state.global.userInfo,
			imgDomain: state => state.global.imgDomain
		})
	},
	mounted () {},
	created () {
		const routeMatch = JSON.parse(localStorage.getItem('routeMatched'))
		if (routeMatch && routeMatch.length > 0) {
			this.routeMatched = routeMatch
		} else {
			this.routeMatched = [{
				meta: {title: "主页"},
				path: "/mainmenu"
			}]
		}
	},
	watch: {
            $route(to, from) {
				this.routeMatched = this.$route.matched
				this.saveRouteMatch()
			}
	},
	methods: {
		//  下拉选择
		handleDropDown (id) {
			// 退出
			sessionStorage.clear()
			localStorage.clear()
			this.$router.push({ path: urls.LOGIN })
		},
		saveRouteMatch() {
			const routeMatch = []
			this.routeMatched.forEach(item => {
				routeMatch.push({
					path: item.path,
					meta: {
						title: item.meta.title
					}
				})
			})
			localStorage.setItem('routeMatched', JSON.stringify(routeMatch))
		}
	}
}
</script>

<style lang="scss" scoped>
	$heardH: 42px;
	.header {
		background: #fff;
		box-shadow: 0 0px 2px rgba(0, 0, 0, 0.1) inset;
		background: linear-gradient(to top,  #3CBCD3, #44B2C6, #1D93A8);
		z-index: 10;
		padding: 0;
		width: 100%;
		height: $heardH;
		display: flex;
		min-width: 1058px;
		justify-content: space-between;
		align-items: center;
		.bread-nav-item {
			text-decoration: none;
			color: white;
		}
		.logo-and-caption {
			height: 22px;
			line-height: 22px;
			min-width: 150px;
			padding-left: 20px;
			.system-name {
				font-size: 16px;
				color: white;
				margin-left: 20px;
			}
			.logo {
				margin-top: -4px;
				height: 26px;
			}
		}
		&-right {
			height: $heardH;
			display: flex;
			flex-wrap: nowrap;
			align-items: center;
			margin-right: 20px;
			.more-btn {
				margin-left: 10px;
			}
			.more-btn img {
				width: 4px;
				height: 100%;
			}
		}
	}
</style>

<template>
	<div>
		<mainNav></mainNav>
		<p class="welcome-text">WELCOME</p>
		<p class="welcome-text">欢迎进入基础数据维护系统</p>
		<img src="../../assets/images/base-data/base-welcome.png" class='welcome'>
	</div>
</template>

<script>
	import mainNav from './components/mainNav'

	export default {
		name: 'ReportForm',
		data () {
			return {}
		},
		components: {
			mainNav
		}
	}
</script>

<style lang="scss" scoped>
	.welcome-text {
		font-size: 66px;
		text-align: center;
		color: #1D93A8;
		line-height: 1.5;
	}
	.welcome {
		max-width: 100%;
		display: block;
		margin: 0 auto;
	}
</style>

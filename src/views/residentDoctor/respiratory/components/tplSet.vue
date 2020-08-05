<template>
	<div class="tpl-set-container">
		<el-tabs v-model="activeName" @tab-click="handleClick" style="height: 100%;">
			<el-tab-pane label="子模板检索" name="first">
				<subTpl></subTpl>
			</el-tab-pane>
			<el-tab-pane label="辅助工具" name="second">
				<tools></tools>
			</el-tab-pane>
			<el-tab-pane label="模板检索" name="third">
				<tpls></tpls>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script type="text/javascript">
	import subTpl from './components/subTpl'
	import tools from './components/tools'
	import tpls from './components/tpls'

	export default {
		name: 'tplSet',
		data() {
			return {
				activeName: 'third'
			}
		},
		components: {
			subTpl,
			tools,
			tpls
		},
		methods: {
			handleClick(tab, event) {
				console.log(tab, event)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tpl-set-container {
		height: 100%;
		background-color: white;
		/deep/ .el-tabs__item{
			border: 1px solid #FCFCFC;
		}
		/deep/ .is-active {
			background-color: #44B3C6;
			color: white;
		}
		/deep/ .el-tabs__active-bar {
			background-color: transparent;
		}
		/deep/ .el-tabs__nav {
			width: 100%;
		}
		/deep/ .el-tabs__item {
			border: 1px solid #E8EAED;
			border-bottom: none;
			border-radius: 4px 4px 0 0;
			width: 33.33%;
			text-align: center;
			padding: 0;
		}
		/deep/ .el-tabs__item:first-child {
			padding-left: auto;
		}
		/deep/ .el-tabs__item:last-child {
			padding-right: auto !important;
		}
	}
</style>

<template>
	<div class="main-right-container">
		<activeXHandler></activeXHandler>
		<div class="content-box">
			<div class="left">
				<component :is="componentName"></component>
			</div>
			<div class="right">
				<tplSet></tplSet>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	import contentShow from './contentShow'
	import tplSet from './tplSet'
	import activeXHandler from './activeXHandler'

	export default {
		name: 'Main',
		props: ['componentName'],
		components: {
			contentShow,
			tplSet,
			activeXHandler
		}
	}
</script>

<style lang="scss" scoped>
	.main-right-container {
		.content-box {
			display: flex;
			.left {
				width: calc(100vw - 610px);
			}
			.right {
				width: 300px;
				margin-left: 10px;
			}
		}
	}
</style>
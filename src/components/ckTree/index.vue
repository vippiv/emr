<template>
	<extend-base-el-tree v-bind="$attrs" @node-click="handleClick" @node-contextmenu="handleRightClick">
		<span slot-scope="{node, data}">
			<slot :node="node" :data="data"></slot>
		</span>
	</extend-base-el-tree>
</template>

<script>
	import debounce from 'lodash.debounce'
	export default {
		inheritAttrs: false,
		data () {
			return {
				clickCount: 0
			}
		},
		methods: {
			handleClick () {
				const args = arguments
				this.clickCount++
				const fnEmitDblClick = debounce(() => {
					if (this.clickCount === 1) {
						this.$emit('node-click', ...args)
					}
					if (this.clickCount < 1) {
						this.$emit('node-dblclick', ...args)
					}
					this.clickCount = 0
				}, 300)
				fnEmitDblClick()
			},
			handleRightClick () {
				const args = arguments
				this.$emit('node-contextmenu', ...args)
			}
		}
	}
</script>>
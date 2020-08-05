<!-- 文本框输入组件 ckInput.vue -->
<template>
	<div class="ck-input">
		<span>{{desObj.label}}</span>
		<input
			type="text"
			class="ckinput"
			@input="handleInput"
			v-bind="$attrs"
			@change="handleChange"
		>
	</div>
</template>

<script type="text/javascript">
	export default {
		name: 'CKInput',
		inheritAttrs: false,
		props: {
			desObj: {
				type: Object,
				default: () => ({
						label: '标签名',
						value: ''
					})
			}
		},
		methods: {
			handleInput (evt) {
				console.log(evt.target.value)
				this.$emit('input', event.target.value)
			},
			handleChange (event) {
				// this.$emit('change', event.target.value)
			}
		}
	}
</script>

<style lang="scss" scoped></style>

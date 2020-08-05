<template>
	<div>
		<mainNav></mainNav>
		<div class="pd15 layout-content"><router-view></router-view></div>
	</div>
</template>

<script>
	import mainNav from '../components/mainNav'

	export default {
		name: 'personMain',
		data () {
			return {}
		},
		components: {
            mainNav
        }
	}
</script>

<style lang="scss" scoped></style>

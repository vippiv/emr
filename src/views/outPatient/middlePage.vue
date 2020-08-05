<template>
	<keep-alive>
		<div class="item-box">
			<router-link class="item" v-for="route in outPatientRoute" :key="route.name" :to="route.path">{{route.meta.title}}</router-link>
		</div>
		<router-view></router-view>
	</keep-alive>
</template>

<script>
import keepAlive from '@/mixins/keepAlive'
import outPatientRoute from '@/router/routes/outPatient'

export default {
	name: 'ResidentMiddlePage',
	mixins: [keepAlive],
	data () {
		return {
			routes: []
		}
	},
	computed: {
		outPatientRoute () {
			return outPatientRoute
		}
	},
	methods: {
		handleEnter () {
			this.$router.push({
				path: 'base/file/'
			})
		}
	}
}
</script>

<style lang="scss" scoped>
	.item-box{
		.item{
			width: 100px;
			height: 100px !important;
			padding: 0 5px;
		}
	}
</style>

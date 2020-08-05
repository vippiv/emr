<template>
	<keep-alive :include="cacheData">
		<div class="item-box">
			<div class="item enter" @click="handleEnter"><span>进入</span></div>
		</div>
		<router-view></router-view>
	</keep-alive>
</template>

<script>
import { mapState } from 'vuex'
import keepAlive from '@/mixins/keepAlive'
import { BASE_WELCOME } from '@/router/routePath'

export default {
	name: 'BaseDataMiddlePage',
	mixins: [keepAlive],
	data () {
		return {
			routes: []
		}
	},
	created() {
		this.handleEnter()
	},
	computed: {
		...mapState({
			cacheData: state => state.global.keepAlive
		})
	},
	watch: {
		$route: {
			handler (val) {
				// this.handleEnter()
			},
			deep: true
		}
	},
	methods: {
		handleEnter () {
			this.$router.push({
				path: BASE_WELCOME
			})
		}
	}
}
</script>

<style lang="scss" scoped>
	.item-box{
		padding: 15px;
		.item {
			width:361px;
			height: 171px !important;
			border: 1px solid gray;
			cursor: pointer;
			position: relative;
		}
		.enter {
			background: url('../../assets/images/base-data/enter.png') no-repeat;
			&:hover {
				background: url('../../assets/images/base-data/enter-hover.png') no-repeat;
			}
			span{
				position: absolute;
				left: 15px;
				top: 15px;
				font-size: 18px;
				color: #076979;
			}
		}
	}
</style>

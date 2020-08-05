import { mapMutations } from 'vuex'

export default {
	data () {
		return {
			cacheList: [
				// 需要缓存的组件名称(@params componentName [type string])
			]
		}
	},
	computed: {},
	beforeRouteLeave (to, from, next) {
		this.keepAlive(to.name)
		next()
	},
	methods: {
		...mapMutations(['SET_KEEP_ALIVE']),
		// 缓存列表页面
		keepAlive (name) {
			if (this.cacheList.includes(name)) {
				this.SET_KEEP_ALIVE([name])
				sessionStorage.setItem('keepAlive', [name])
			}
		}
	}
}

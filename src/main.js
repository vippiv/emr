import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import store from './store'
import router from './router/router'
import * as filters from './filters'
import './styles/index.scss'
import components from './components'
import * as urls from './router/routePath'
import 'default-passive-events'
import 'jexcel/dist/jexcel.css'

// 使用的组件
Vue.use(ElementUI) // 注册的ElementUI的所有的组件
Vue.use(components) // 注册的本地的所有的组件

// Vue.prototype.$api = api // 所有的api地址
Vue.prototype.$urls = urls // 所有的 routePath地址

Vue.config.productionTip = false
Object.keys(filters).forEach((key) => {
	Vue.filter(key, filters[key])
})

new Vue({
	store,
	router,
	render: h => h(App)
}).$mount('#app')

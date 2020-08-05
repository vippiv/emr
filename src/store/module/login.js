import fetch from '@/utils/fetch'
import api from '@/global/api'
import { Message } from 'element-ui'
import { convertPostToGet } from '@/utils/utils'

const login = {
	state: {},
	mutations: {},
	actions: {
		async A_LOGIN ({ commit, dispatch }, payload) {
			try {
				// 发送
				const url = `${api.login.login}${convertPostToGet(payload)}`
				// const urlDoctor = `${api.login.loginDoctor}${convertPostToGet(payload)}`
				// const urlNurse = `${api.login.loginNurse}${convertPostToGet(payload)}`
				const res = await fetch.get(url, payload)
				// const resDoctor = await fetch.get(urlDoctor, payload)
				// const resNurse = await fetch.get(urlNurse, payload)
				if (res.code === 1) {
					const token = 'jjdhhffjfhfj'
					const loginInfo = res.values
					const loginInfoArgs = {}
					sessionStorage.setItem('token', token)
					dispatch('A_SAVE_USER_INFO', res.values) // 存储用户信息并进入站内
					dispatch('A_GET_INIT') // 获取全站公用的数据
					dispatch('A_GET_WORK_STATIONS', {
						userid: loginInfo.UserId
					}) // 获取工作站信息
					if (loginInfo.UserId) {
						loginInfoArgs.UserId = loginInfo.UserId
					}
					if (loginInfo.UserName) {
						loginInfoArgs.UserName = loginInfo.UserName
					}
					if (loginInfo.isMarkName) {
						loginInfoArgs.isMarkName = loginInfo.isMarkName
					}
					if (loginInfo.WorkApplication) {
						loginInfoArgs.WorkApplication = loginInfo.WorkApplication
					}
					if (loginInfo.RoleValue) {
						loginInfoArgs.RoleValue = loginInfo.RoleValue
					}
					if (loginInfo.HospitalName) {
						loginInfoArgs.HospitalName = encodeURI(loginInfo.HospitalName)
					}
					if (loginInfo.DepCode) {
						loginInfoArgs.DepCode = loginInfo.DepCode
					}
					if (loginInfo.DepCodeDoc) {
						loginInfoArgs.DepCodeDoc = loginInfo.DepCodeDoc
					}
					if (loginInfo.DepName) {
						loginInfoArgs.DepName = loginInfo.DepName
					}
					if (loginInfo.HousemanId) {
						loginInfoArgs.HousemanId = loginInfo.HousemanId
					}
					if (loginInfo.HousemanName) {
						loginInfoArgs.HousemanName = loginInfo.HousemanName
					}
					// dispatch('A_SYNC_LOGIN_SESSION', loginInfoArgs)
					commit('SET_TOKEN', token)
				} else {
					Message.error(res.msg)
				}
			} catch (e) {
				console.log(e)
			}
		},
		async A_SYNC_LOGIN_SESSION ({commit, dispatch}, payload) {
			try {
				const url = `${api.login.syncLoginSession}${convertPostToGet(payload)}`
				const res = await fetch.get(url, payload)
				if (parseInt(res.code, 10) !== 1) {
					Message.error('同步登陆失败，请退出重新登录')
				}
			} catch (e) {
				console.log(e)
			}
		}
	}
}
export default login

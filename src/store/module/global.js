import fetch from '@/utils/fetch'
import api from '@/global/api'
import router from '@/router/router'
import * as urls from '@/router/routePath'
import { dataURLtoBlob, downloadLocalFile, convertPostToGet } from '@/utils/utils'

import { baseType } from '@/global/dictionary'

const keepAlive = sessionStorage.getItem('keepAlive') || []

const global = {
	state: {
		keepAlive,
		workStationID: '', // 工作站ID
		workBenchID: '', // 工作台ID
		deptID: '0101010326', // 科室ID
		// 医保/婚姻/职业/民族/病情/入院类别/患者来源/现住址/出生地/户口/籍贯
		baseDataTyped: {
			yibao: null,
			hunyin: null,
			zhiye: null,
			minzu: null,
			bingqing: null,
			ruyuanleibie: null,
			huanzhelaiyuan: null,
			xianzhuzhi: null,
			chushengdi: null,
			hukou: null,
			jiguan: null
		},
		userInfo: null, // 登录账号信息,
		userRole: null, // 用户角色
		activeXCheckbox: [1000002153, 1000002154, 1000002155, 1000002163, 1000002164, 1000002165, 1000002166], // 文档中可能用到的checkbox名称
		DateTime: {
			MaxValue: '9999/12/31 23:59:59',
			MinValue: '0001/1/1 0:00:00'
		},
		workStations: [], // 所有工作站
		routeMatch: null // 保存面包屑导航
	},
	mutations: {
		// 设置缓存组件
		SET_KEEP_ALIVE (state, payload = []) {
			state.keepAlive = payload
		},
		// 设置token
		SET_TOKEN (state, payload = '') {
			// state.uploadHeaders.Authorization = payload
		},
		SET_USER_INFO (state, payload = {}) {
			state.userInfo = payload
		},
		SET_USER_ROLE (state, payload = {}) {
			state.userRole = payload
		},
		SET_WORKSTATION_ID (state, payload) {
			state.workStationID = payload
		},
		SET_BASE_TYPE (state, payload) {
			state.baseDataTyped[payload.key] = payload.data
		},
		SAVE_WORK_STATIONS (state, payload) {
			state.workStations = payload
		},
		SAVE_WORK_BENCH_ID (state, payload) {
			state.workBenchID = payload
		},
		SAVE_DEPT_ID (state, payload) {
			state.deptID = payload
		},
		SAVE_ROUTE_MATCH (state, payload) {
			state.routeMatch = payload
		}
	},
	// 全局请求(字典项接口，公共接口等)
	actions: {
		async A_SAVE_ROUTE_MATCH ({ commit }, payload) {
			commit('SAVE_ROUTE_MATCH', payload)
		},
		// 用户信息
		async A_SAVE_USER_INFO ({ commit, dispatch }, payload) {
			try {
				// 获取用户信息
				// const { status, data } = await fetch.get(api.global.userInfo)

				// if (status === 0) {
					commit('SET_USER_INFO', payload)
					sessionStorage.setItem('userInfo', JSON.stringify(payload))

					// 进入平台
					router.push(urls.MAINMENU)

					// if (data.companyId) {
					// 	dispatch('A_GET_COMPANY_CODE', { companyId: data.companyId })
					// 	router.push(urls.BASE_SYNCMANAGE)
					// } else {
					// 	Message.warning('登陆失败')
					// }
				// }
			} catch (e) {
				console.log(e)
			}
		},
		// 获取用户角色权限
		async A_GET_USER_ROLE ({ commit, dispatch }, payload) {
			try {
				const url = `${api.global.userRole}${convertPostToGet(payload)}`
				const res = await fetch.get(url)
				if (res.code === 1) {
					commit('SET_USER_ROLE', res.values)
				}
				return res
			} catch (e) {
				console.log(e)
			}
		},
		// 获取odt文档
		async GET_DOC_FILE ({ commit, dispatch }, payload) {
			try {
				const url = `${api.global.getOdtFile}${convertPostToGet(payload)}`
				const res = await fetch.post(url)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		// 保存当前工作站ID
		async A_SAVE_STATION ({ commit }, payload) {
			commit('SET_WORKSTATION_ID', payload.stationID)
		},
		// 保存当前工作台ID
		async A_SAVE_BENCH ({ commit }, payload) {
			commit('SAVE_WORK_BENCH_ID', payload.benchID)
		},
		// 保存当前科室
		async A_SAVE_DEPT ({ commit }, payload) {
			commit('SAVE_DEPT_ID', payload.deptID)
		},
		// 初始化数据，全站公用
		async A_GET_INIT ({ state, commit, dispatch }) {
			Object.keys(state.baseDataTyped).forEach((item) => {
				dispatch('A_GET_BASE_TYPE', item)
			})
		},
		// 查询 医保/婚姻/职业/民族/病情/入院类别/患者来源/现住址/出生地/户口/籍贯数据
		async A_GET_BASE_TYPE ({ commit }, payload) {
			try {
				const args = {
					nameValue: encodeURI(baseType[payload])
				}
				const url = `${api.global.baseType}${convertPostToGet(args)}`
				const res = await fetch.get(url)
				commit('SET_BASE_TYPE', {
					key: payload,
					data: res.values
				})
			} catch (e) {
				console.log(e)
			}
		},
		// 根据上一级CODE获取下一级城市
		async A_GET_NEXT_CITY ({ commit }, payload) {
			try {
				const url = `${api.global.nextCity}${convertPostToGet(payload)}`
				const res = await fetch.get(url)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		// 获取工作站
		async A_GET_WORK_STATIONS ({ commit }, payload) {
			try {
				const url = `${api.global.workStations}${convertPostToGet(payload)}`
				const res = await fetch.get(url)
				if (res.code === 1) {
					commit('SAVE_WORK_STATIONS', res.values)
				}
				return res
			} catch (e) {
				console.log(e)
			}
		},
		// 获取工作台
		async A_GET_WORK_BENCHS ({ commit }, payload) {
			try {
				const url = `${api.global.workBenchs}${convertPostToGet(payload)}`
				const res = await fetch.get(url)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		// 获取体温单上患者信息
		async A_GET_TEMPERATURE_SHEET_DATA ({ commit }, payload) {
			try {
				const url = `${api.global.temperatureSheetData}${convertPostToGet(payload)}`
				const res = await fetch.get(url)
				return res
			} catch (e) {
				console.log(e)
			}
		}
	}
}

export default global

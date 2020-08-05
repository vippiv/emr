import fetch from '@/utils/fetch'
import api from '@/global/api'
import { convertPostToGet } from '@/utils/utils'

const systemManage = {
	// namespaced: true,
	state: {
		workStations: []
	},
	mutations: {
		M_SAVE_WORK_STATION (state, payload) {
			state.workStations = payload
		}
	},
	actions: {
		async GET_PATIENTS ({ commit, dispatch }, payload) { // 查询患者
			try {
				const url = `${api.systemManage.getPatients}${convertPostToGet(payload)}`
				const res = await fetch.get(url)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		async GET_MEDISINE_RECORD ({ commit, dispatch }, payload) { // 查询患者病历
			try {
				const url = `${api.systemManage.getMedisineRecord}${convertPostToGet(payload)}`
				const res = await fetch.get(url)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		async GET_DEPARTMENTS ({ commit, dispatch }, payload) { // 查询科室
			try {
				const url = `${api.systemManage.getDepartments}`
				const res = await fetch.get(url)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		async SAVE_MEDISINE_RECORD_SEAL ({ commit, dispatch }, payload) { // 病历封存/解封
			try {
				const url = `${api.systemManage.medisineRecordSeal}${convertPostToGet(payload)}`
				const res = await fetch.post(url, payload)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		async GET_MENU_LIST ({ commit, dispatch }, payload) { // 获取所有菜单
			try {
				const url = `${api.systemManage.getMenuList}${convertPostToGet(payload)}`
				const res = await fetch.get(url)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		async GET_WORK_STATION ({ commit, dispatch }, payload) { // 获取工作站
			try {
				const url = `${api.systemManage.getWorkStation}`
				const res = await fetch.get(url)
				if (res.code === 1) {
					commit('M_SAVE_WORK_STATION', res.values)
				}
				return res
			} catch (e) {
				console.log(e)
			}
		},
		async SAVE_NEW_MENU ({ commit, dispatch }, payload) { // 保存菜单
			try {
				const url = `${api.systemManage.saveNewMenu}${convertPostToGet(payload)}`
				const res = await fetch.post(url)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		async GET_MENU_INFO ({ commit, dispatch }, payload) { // 获取单个菜单
			try {
				const url = `${api.systemManage.getMenuInfo}${convertPostToGet(payload)}`
				const res = await fetch.get(url)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		async DEL_MENU ({ commit, dispatch }, payload) { // 获取单个菜单
			try {
				const url = `${api.systemManage.delMenu}${convertPostToGet(payload)}`
				const res = await fetch.post(url)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		async GET_ICD_CODE ({ commit, dispatch }, payload) { // 获取ICD编码
			try {
				const url = `${api.systemManage.getIcdCode}`
				const res = await fetch.get(url)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		async GET_ICD_CODE_LIST ({ commit, dispatch }, payload) { // 获取ICD编码列表
			try {
				const url = `${api.systemManage.getIcdCodeList}${convertPostToGet(payload)}`
				const res = await fetch.get(url)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		async GET_ICD_CODE_INFO ({ commit, dispatch }, payload) { // 获取ICD编码信息
			try {
				const url = `${api.systemManage.getIcdCodeInfo}${convertPostToGet(payload)}`
				const res = await fetch.get(url)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		async DEL_ICD_CODE ({ commit, dispatch }, payload) { // 删除指定ICD编码
			try {
				const url = `${api.systemManage.delICDCode}${convertPostToGet(payload)}`
				const res = await fetch.post(url)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		async SAVE_ICD_CODE ({ commit, dispatch }, payload) { // 保存新增/修改
			try {
				const url = `${api.systemManage.saveICDCode}${convertPostToGet(payload)}`
				const res = await fetch.post(url)
				return res
			} catch (e) {
				console.log(e)
			}
		}
	}
}

export default systemManage

import fetch from '@/utils/fetch'
import api from '@/global/api'
import { delData, saveData } from '@/global/syncManage'
import { convertPostToGet } from '@/utils/utils'
import qs from 'qs'

const syncManage = {
	state: {

	},
	mutations: {},
	actions: {
		// 数据组与模板
		async GET_DATAGROUP_AND_TPL ({ commit, dispatch }, payload) { // 获取数据组和模板数据
			try {
				const url = `${api.syncManage.dataGroupAndTpl}?pageSize=${payload.pageSize}&pageNos=${payload.pageNos}`
				const res = await fetch.get(url, payload)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		async GET_TemplateCatalogAPI ({ commit, dispatch }, payload) { // 获取模板目录数据
			try {
				const url = `${api.syncManage.seleTemplateCatalogAPI}?r=${payload.r}&i=${payload.i}&txtInputs=${payload.txtInputs}`
				const res = await fetch.get(url, payload)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		async GET_GetDataGroupAll ({ commit, dispatch }, payload) { // 获取数据组数据
			try {
				const url = `${api.syncManage.getDataGroupAll}`
				const res = await fetch.get(url, payload)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		async GET_DatasetTemplateSave ({ commit, dispatch }, payload) { // 保存数据
			try {
				const url = `${api.syncManage.datasetTemplateSave}`
				const res = await fetch.post(url, payload)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		async DelDatasetTemplate ({ commit, dispatch }, payload) { // 删除数据
			try {
				const url = `${api.syncManage.delDatasetTemplate}${convertPostToGet(payload)}`
				const res = await fetch.post(url)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		// 同步内容设置
		async GET_GetSyInformation ({ commit, dispatch }, payload) { // 获取数据组和模板数据
			try {
				const url = `${api.syncManage.getSyInformation}?pageSize=${payload.pageSize}&pageNos=${payload.pageNos}`
				const res = await fetch.get(url, payload)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		async GET_GetNewTemplate ({ commit, dispatch }, payload) { // 获取新建模板数据
			try {
				const url = `${api.syncManage.getNewTemplate}`
				const res = await fetch.get(url, payload)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		async GET_GetOriTemplate ({ commit, dispatch }, payload) { // 获取原始模板数据
			try {
				const url = `${api.syncManage.getOriTemplate}`
				const res = await fetch.get(url, payload)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		async GET_GetAddTemplate ({ commit, dispatch }, payload) { // 获取新建数据组
			try {
				const url = `${api.syncManage.getAddTemplate}?fileItemId=${payload.fileItemId}`
				const res = await fetch.get(url, payload)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		async GET_GetOldTemplate ({ commit, dispatch }, payload) { // 获取原始数据组
			try {
				const url = `${api.syncManage.getOldTemplate}?fileItemId=${payload.fileItemId}`
				const res = await fetch.get(url, payload)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		async POST_DelSyInformation ({ commit, dispatch }, payload) { // 删除同步内容数据
			try {
				const url = `${api.syncManage.delSyInformation}?sid=${payload.sid}`
				const res = await fetch.post(url)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		async POST_SyInformationSave ({ commit, dispatch }, payload) { // 保存同步内容数据
			try {
				const url = `${api.syncManage.syInformationSave}`
				const res = await fetch.post(url,payload)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		// 用户同步信息
		async GetSyUserPnode ({ commit, dispatch }, payload) { // 获取医生站台和站台内医生
			try {
				const url = `${api.syncManage.getSyUserPnode}`
				const res = await fetch.get(url, payload)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		async GetWorkBenchSync ({ commit, dispatch }, payload) { // 根据工作台编码获取工作台同步信息
			try {
				const url = `${api.syncManage.getWorkBenchSync}${convertPostToGet(payload)}`
				const res = await fetch.get(url, payload)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		async GetSysTuserSyncByUserId ({ commit, dispatch }, payload) { // 根据用户ID获取用户同步信息
			try {
				const url = `${api.syncManage.getSysTuserSyncByUserId}${convertPostToGet(payload)}`
				const res = await fetch.get(url, payload)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		async InsertWorkBenchSync ({ commit, dispatch }, payload) { // 工作台新增同步信息
			try {
				const url = `${api.syncManage.insertWorkBenchSync}`
				const res = await fetch.post(url, payload)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		async InsertSysTuserSync ({ commit, dispatch }, payload) { // 用户新增同步信息
			try {
				const url = `${api.syncManage.insertSysTuserSync}`
				const res = await fetch.post(url, payload)
				return res
			} catch (e) {
				console.log(e)
			}
		}

	}
}

export default syncManage

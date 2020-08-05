import fetch from '@/utils/fetch'
import api from '@/global/api'
import { convertPostToGet } from '@/utils/utils'

const personMain = {
	state: {
	},
	mutations: {},
	actions: {
		// 人员权限管理页面
		async GetPower ({ commit, dispatch }, payload) { // 获取组管理
			try {
				const url = `${api.personMain.GetPower}`
				const res = await fetch.get(url, payload)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		async GET_USERSBYGROUPHOUSEMAN ({ commit, dispatch }, payload) { // 获取组管理子级
			try {
				const url = `${api.personMain.GetUsersByGroupHouseMan}${convertPostToGet(payload)}`
				const res = await fetch.get(url)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		async GetRole ({ commit, dispatch }, payload) { // 获取基本模板树
			try {
				const url = `${api.personMain.GetRole}`
				const res = await fetch.get(url, payload)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		async GetWorkPlatform ({ commit, dispatch }, payload) { // 获取工作台
			try {
				const url = `${api.personMain.GetUserWork}`
				const res = await fetch.get(url, payload)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		async GetSpecial ({ commit, dispatch }, payload) { // 特殊职能
			try {
				const url = `${api.personMain.GetSpecial}`
				const res = await fetch.get(url, payload)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		async GET_USER_ROLE_BY_CODE ({ commit, dispatch }, payload) { // 获取指定人员权限
			try {
				const url = `${api.personMain.getUserRoleByCode}?code=${payload.code}&tag=${payload.tag}`
				const res = await fetch.get(url, payload)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		async GET_WORK_BENCH_BY_CODE ({ commit, dispatch }, payload) { // 获取指定人员权限
			try {
				const url = `${api.personMain.getWorkBenchByCode}?code=${payload.code}`
				const res = await fetch.get(url, payload)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		async GET_SPECIAL_BY_CODE ({ commit, dispatch }, payload) { // 获取指定人员特殊职能
			try {
				const url = `${api.personMain.getSpecialByCode}?code=${payload.code}`
				const res = await fetch.get(url, payload)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		async UPDATE_USER_ROLES ({ commit, dispatch }, payload) { // 新增/更新人员权限
			try {
				const url = `${api.personMain.updateUserRoles}`
				const res = await fetch.post(url,payload)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		async UPDATE_WORK_BENCH ({ commit, dispatch }, payload) { // 新增/更新工作台
			try {
				const url = `${api.personMain.updateWorkBench}`
				const res = await fetch.post(url,payload)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		async UPDATE_SPECIAL ({ commit, dispatch }, payload) { // 新增/更新特殊职能
			try {
				const url = `${api.personMain.updateSpecial}`
				const res = await fetch.post(url,payload)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		async GET_USERLIST ({ commit, dispatch }, payload) { // 获取人员签名维护左边列表
			try {
				const url = `${api.personMain.getUserList}`
				const res = await fetch.get(url, payload)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		// 三级检诊
		async GET_SINGLEINFO ({ commit, dispatch }, payload) { // 获取单组三级医师
			try {
				const url = `${api.personMain.getSingleInfo}${convertPostToGet(payload)}`
				const res = await fetch.get(url, payload)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		async SAVE_LEVELINFO ({ commit, dispatch }, payload) { // 新增或更新三级检诊保存
			try {
				const url = `${api.personMain.saveLevelInfo}${convertPostToGet(payload)}`
				const res = await fetch.post(url, payload)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		async ADD_HOSPITALIZATIONLOAD ({ commit, dispatch }, payload) { // 获取所有住院医师
			try {
				const url = `${api.personMain.addHospitalizationLoad}`
				const res = await fetch.get(url, payload)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		async ADD_ATTENDINGLOAD ({ commit, dispatch }, payload) { // 获取所有主治医师列表
			try {
				const url = `${api.personMain.addAttendingLoad}`
				const res = await fetch.get(url, payload)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		async ADD_DIRECTORLOAD ({ commit, dispatch }, payload) { // 获取所有主任医师列表
			try {
				const url = `${api.personMain.addDirectorLoad}`
				const res = await fetch.get(url, payload)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		async DELETE_LEVELINFO ({ commit, dispatch }, payload) { // 删除
			try {
				const url = `${api.personMain.deleteLevelInfo}${convertPostToGet(payload)}`
				const res = await fetch.post(url, payload)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		async GET_LEVELINFO ({ commit, dispatch }, payload) { // 获取三级检诊维护列表
			try {
				const url = `${api.personMain.getLevelInfo}${convertPostToGet(payload)}`
				const res = await fetch.get(url)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		// 人员管理
		async SAVE_USERINFO ({ commit, dispatch }, payload) { // 保存信息
			try {
				const url = `${api.personMain.saveUserInfo}`
				const res = await fetch.post(url, payload)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		async SAVE_PASSVALID ({ commit, dispatch }, payload) { // 密码是否过期操作保存
			try {
				const url = `${api.personMain.savePassvalid}`
				const res = await fetch.post(url, payload)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		async GET_CKLOCKROLE ({ commit, dispatch }, payload) { // 判断是否有锁定权限
			try {
				const url = `${api.personMain.getcklockRole}${convertPostToGet(payload)}`
				const res = await fetch.get(url)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		async GET_CKPASSWVALIDROLE ({ commit, dispatch }, payload) { // 判断是否有密码不过期权限
			try {
				const url = `${api.personMain.getckpasswvalidRole}`
				const res = await fetch.get(url, payload)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		async GET_USERINFO ({ commit, dispatch }, payload) { // 获取单个人员信息
			try {
				const url = `${api.personMain.getUserInfo}${convertPostToGet(payload)}`
				const res = await fetch.get(url)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		async GET_TITLEINFO ({ commit, dispatch }, payload) { // 获取绑定职称
			try {
				const url = `${api.personMain.getTitleInfo}`
				const res = await fetch.get(url, payload)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		async GET_DEPTINFO ({ commit, dispatch }, payload) { // 获取人员管理科室
			try {
				const url = `${api.personMain.getDeptInfo}`
				const res = await fetch.get(url, payload)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		async GET_ALLUSERINFO ({ commit, dispatch }, payload) { // 获取人员管理左边列表
			try {
				const url = `${api.personMain.getAllUserInfo}${convertPostToGet(payload)}`
				const res = await fetch.get(url)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		// 人员职称
		async SAVE_USERTITLE ({ commit, dispatch }, payload) { // 保存用户职称
			try {
				const url = `${api.personMain.saveUserTitle}`
				const res = await fetch.post(url, payload)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		async GET_SYS ({ commit, dispatch }, payload) { // 根据UseriD获取职称
			try {
				const url = `${api.personMain.getSys}${convertPostToGet(payload)}`
				const res = await fetch.get(url)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		async GET_USERDEPT ({ commit, dispatch }, payload) { // 获取人员职称左边科室列表
			try {
				const url = `${api.personMain.getUserDept}`
				const res = await fetch.get(url, payload)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		async GET_TITLE ({ commit, dispatch }, payload) { // 获取人员职称右边职称列表
			try {
				const url = `${api.personMain.getTitle}`
				const res = await fetch.get(url, payload)
				return res
			} catch (e) {
				console.log(e)
			}
		}
    }
}

export default personMain

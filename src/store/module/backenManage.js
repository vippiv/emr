import fetch from '@/utils/fetch'
import api from '@/global/api'
import { convertPostToGet } from '@/utils/utils'

const backManage = {
    state: {

    },
    mutations: {},
    actions: {
        // 模板目录维护
        async GET_GetCatalogParentLevel ({ commit, dispatch }, payload) { // 病历模板目录父级下拉
            try {
                const url = `${api.backendManage.GetCatalogParentLevel}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async GET_GetTreeParentLevel ({ commit, dispatch }, payload) { // 病历模板树父级下拉
            try {
                const url = `${api.backendManage.GetTreeParentLevel}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async GetCatalogOrTree ({ commit, dispatch }, payload) { // 获取左边节点
            try {
                const url = `${api.backendManage.getCatalogOrTree}?i=${payload.i}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async CatalogSave ({ commit, dispatch }, payload) { // 病历模板目录修改保存
            try {
                const url = `${api.backendManage.catalogSave}${convertPostToGet(payload)}`
                const res = await fetch.post(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async TreeSave ({ commit, dispatch }, payload) { // 病历模板树修改保存
            try {
                const url = `${api.backendManage.treeSave}${convertPostToGet(payload)}`
                const res = await fetch.post(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async CatalogDele ({ commit, dispatch }, payload) { // 病历模板目录删除
            try {
                const url = `${api.backendManage.catalogDele}${convertPostToGet(payload)}`
                const res = await fetch.post(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async TreeDele ({ commit, dispatch }, payload) { // 病历模板树删除
            try {
                const url = `${api.backendManage.treeDele}${convertPostToGet(payload)}`
                const res = await fetch.post(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        // 护士工作站与护士记录单维护
        async GetNurseSheetInfo ({ commit, dispatch }, payload) { // 加载获取护士工作站与护理单
            try {
                const url = `${api.backendManage.getNurseSheetInfo}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async GetcmbFathers ({ commit, dispatch }, payload) { // 获取工作台
            try {
                const url = `${api.backendManage.getcmbFathers}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async DeleteNurseSheet ({ commit, dispatch }, payload) { // 删除护理单
            try {
                const url = `${api.backendManage.deleteNurseSheet}?code=${payload.code}`
                const res = await fetch.post(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async SaveNurseSheet ({ commit, dispatch }, payload) { // 保存或修改
            try {
                const url = `${api.backendManage.saveNurseSheet}${convertPostToGet(payload)}`
                const res = await fetch.post(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        // 码表浏览
        async GetTBaseCodeList ({ commit, dispatch }, payload) { // 获取码表列表
            try {
                const url = `${api.backendManage.getTBaseCodeList}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async GetTBaseCodeInfo ({ commit, dispatch }, payload) { // 获取码表详情
            try {
                const url = `${api.backendManage.getTBaseCodeInfo}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },

        // 床位维护
        async GetDepartmentAndBedAll ({ commit, dispatch }, payload) { // 获取所有部门、床位
            try {
                const url = `${api.backendManage.getDepartmentAndBedAll}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async GetBedInfoByID ({ commit, dispatch }, payload) { // 获取单个床位信息
            try {
                const url = `${api.backendManage.getBedInfoByID}?label=${payload.label}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async GET_GetBedDepartmentAll ({ commit, dispatch }, payload) { // 获取所有科室
            try {
                const url = `${api.backendManage.GetBedDepartmentAll}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async GET_GetBedType ({ commit, dispatch }, payload) { // 获取所有病床类别
            try {
                const url = `${api.backendManage.GetBedType}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async GET_GetBedClass ({ commit, dispatch }, payload) { // 获取所有病床种类
            try {
                const url = `${api.backendManage.GetBedClass}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async GET_GetBedSex ({ commit, dispatch }, payload) { // 获取性别
            try {
                const url = `${api.backendManage.GetBedSex}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async GET_GetBedGrade ({ commit, dispatch }, payload) { // 获取收费级别
            try {
                const url = `${api.backendManage.GetBedGrade}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async GET_GetBedState ({ commit, dispatch }, payload) { // 获取状态
            try {
                const url = `${api.backendManage.GetBedState}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async DepartmentAndBedSave ({ commit, dispatch }, payload) { // 保存
            try {
                const url = `${api.backendManage.DepartmentAndBedSave}`
                const res = await fetch.post(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        // 医生工作站与科室维护
        async GetWADWorkstationAll ({ commit, dispatch }, payload) { // 获取所有工作站和工作室以及下级
            try {
                const url = `${api.backendManage.getWADWorkstationAll}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async GET_GetWadDepartmentAll ({ commit, dispatch }, payload) { // 获取工作站
            try {
                const url = `${api.backendManage.GetWadDepartmentAll}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async GET_GetWadDepartment ({ commit, dispatch }, payload) { // 获取科室
            try {
                const url = `${api.backendManage.GetWadDepartment}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async WadWorkSave ({ commit, dispatch }, payload) { // 工作站保存
            try {
                const url = `${api.backendManage.WadWorkSave}`
                const res = await fetch.post(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async WadDepaSave ({ commit, dispatch }, payload) { // 科室保存
            try {
                const url = `${api.backendManage.WadDepaSave}`
                const res = await fetch.post(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },

        /** ********************************科室维护****************/
        async GET_GetDepartmentalCategories ({ commit, dispatch }, payload) { // 获取部门类别下拉
            try {
                const url = `${api.backendManage.GetDepartmentalCategories}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async GET_GetDepartmentalAttributes ({ commit, dispatch }, payload) { // 获取部门属性下拉
            try {
                const url = `${api.backendManage.GetDepartmentalAttributes}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async GET_GetDepartmentAll ({ commit, dispatch }, payload) { // 获取所有科室信息
            try {
                const url = `${api.backendManage.GetDepartmentAll}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async DeleDepartmentByDeptid ({ commit, dispatch }, payload) { // 删除科室信息
            try {
                const url = `${api.backendManage.DeleDepartmentByDeptid}?deptid=${payload.deptid}`
                const res = await fetch.post(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async DepartmentSave ({ commit, dispatch }, payload) { // 保存科室信息
            try {
                const url = `${api.backendManage.DepartmentSave}${convertPostToGet(payload)}`
                const res = await fetch.post(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        /** ********************************矢量图维护****************/
        async GetFileList ({ commit, dispatch }, payload) { // 加载FTP图片
            try {
                const url = `${api.backendManage.getFileList}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async GetFileInfo ({ commit, dispatch }, payload) { // 获取单个图片
            try {
                const url = `${api.backendManage.getFileInfo}?code=${payload.code}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async DeleteFileInfo ({ commit, dispatch }, payload) { // 删除单个图片
            try {
                const url = `${api.backendManage.deleteFileInfo}?picPath=${payload.picPath}`
                const res = await fetch.post(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async UploadFileInfo ({ commit, dispatch }, payload) { // 上传图片
            try {
                const url = `${api.backendManage.uploadFileInfo}`
                const res = await fetch.post(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        /** ********************************体温单配置****************/
        async GetThermometerList ({ commit, dispatch }, payload) { // 获取体温单排序
            try {
                const url = `${api.backendManage.getThermometerList}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async GetThermometerEntryInfo ({ commit, dispatch }, payload) { // 获取录入排序
            try {
                const url = `${api.backendManage.getThermometerEntryInfo}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async TitemsInfoDelete ({ commit, dispatch }, payload) { // 删除
            try {
                const url = `${api.backendManage.titemsInfoDelete}?code=${payload.code}`
                const res = await fetch.post(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async GetStyles ({ commit, dispatch }, payload) { // 获取类型
            try {
                const url = `${api.backendManage.getStyles}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async TitemsInfoAdd ({ commit, dispatch }, payload) { // 新增保存
            try {
                const url = `${api.backendManage.titemsInfoAdd}${convertPostToGet(payload)}`
                const res = await fetch.post(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async SaveThermometer ({ commit, dispatch }, payload) { // 保存
            try {
                const url = `${api.backendManage.saveThermometer}`
                const res = await fetch.post(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async GetTTitemsInfo ({ commit, dispatch }, payload) { // 双击录入弹框加载数据
            try {
                const url = `${api.backendManage.getTTitemsInfo}?code=${payload.code}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async SaveTTitemsInfo ({ commit, dispatch }, payload) { // 保存双击录入弹框数据
            try {
                const url = `${api.backendManage.saveTTitemsInfo}`
                const res = await fetch.post(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
    }
}

export default backManage

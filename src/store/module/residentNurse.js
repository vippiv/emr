import fetch from '@/utils/fetch'
import api from '@/global/api'
import {
    convertPostToGet
} from '@/utils/utils'

const residentNurse = {
    namespaced: true,
    state: {
        patientInfo: null, // 保存患者的信息
        activeXTab: [], // 已打开患者病历数据
        medisineOperationItem: null, // 病历列表当前操作项
        nursTempData:null,//护理病历模板操作数据
    },
    mutations: {
        save_patient_info(state, payload) {
            state.patientInfo = payload
        },
        save_medisine_record_tab(state, payload) {
            state.activeXTab = payload
        },
        save_medisine_operation_item(state, payload) {
            state.medisineOperationItem = payload
        },
        update_medisine_operation_item(state, payload) {
            const payloadKey = Object.keys(payload)
            Object.keys(state.medisineOperationItem).forEach(key => {
                if (payloadKey.includes(key)) {
                    state.medisineOperationItem[key] = payload[key]
                }
            })
        },
        saveNurTemplateData(state,payload){
            state.nursTempData = payload
        }
    },
    actions: {
        async SAVE_MEDISION_RECORD_TAB({
            commit
        }, payload) {
            commit('save_medisine_record_tab', payload)
        },
        async SAVE_MEDISINE_OPERATION_DOC({ commit, dispatch }, payload) { // 记录病历列表 当前操作项
            commit('save_medisine_operation_item', payload)
        },
        async UPDATE_MEDISINE_OPERATION_ITEM({ commit, dispatch }, payload) { // 更新当前病历操作项
            commit('update_medisine_operation_item', payload)
        },
        async GET_SYST_VISIT1_BY_IPDEPT({
            commit,
            dispatch
        }, payload) { // 查询本科在院患者信息
            try {
                const url = `${api.residentNurse.getSYSTVISIT1ByIpDept}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async NursegetUsersByGroup({
            commit,
            dispatch
        }, payload) { // 病历列表-双击病人右边树
            try {
                const url = `${api.residentNurse.nursegetUsersByGroup}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async GetSYS_T_VISIT_1ByVisitId({
            commit,
            dispatch
        }, payload) { // 根据病人Id查询住院就诊记录病人信息
            try {
                const url = `${api.residentNurse.getSYS_T_VISIT_1ByVisitId}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                if (res.code === 1) {
                    commit('save_patient_info', res.values && res.values.length > 0 && res.values[0])
                }
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async GetSYS_T_VISIT_1ByIpDeptCountLevel({
            commit,
            dispatch
        }, payload) { // 查询本科室在院患者护理总数
            try {
                const url = `${api.residentNurse.getSYS_T_VISIT_1ByIpDeptCountLevel}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async GetSYS_T_VISIT_1ByZKCountLevel({
            commit,
            dispatch
        }, payload) { // 查询转科未提交患者护理总数
            try {
                const url = `${api.residentNurse.getSYS_T_VISIT_1ByZKCountLevel}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async GetSYS_T_VISIT_1ByCYCountLevel({
            commit,
            dispatch
        }, payload) { // 查询出院未提交患者护理总数
            try {
                const url = `${api.residentNurse.getSYS_T_VISIT_1ByCYCountLevel}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async TreeVisitFatherInfo({
            commit,
            dispatch
        }, payload) { // 获取病人列表父节点
            try {
                const url = `${api.residentNurse.treeVisitFatherInfo}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async TreeVisitInfo({
            commit,
            dispatch
        }, payload) { // 获取病人列表子节点
            try {
                const url = `${api.residentNurse.treeVisitInfo}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async GetSYS_TByZKCountLevel({
            commit,
            dispatch
        }, payload) { // 获取护理人数
            try {
                const url = `${api.residentNurse.getSYS_TByZKCountLevel}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async GetBlFatherTempl({
            commit,
            dispatch
        }, payload) { // 获取病历模板父节点
            try {
                const url = `${api.residentNurse.getBlFatherTempl}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async GetSonTemplate({
            commit,
            dispatch
        }, payload) { // 获取病历模板子节点
            try {
                const url = `${api.residentNurse.getSonTemplate}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async GetSysWorkBenchNursing({
            commit,
            dispatch
        }, payload) { // 获取护理记录单信息
            try {
                const url = `${api.residentNurse.getSysWorkBenchNursing}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async GetCommonDept({
            commit,
            dispatch
        }, payload) { // 获取科室
            try {
                const url = `${api.residentNurse.getCommonDept}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async LoadInfo({
            commit,
            dispatch
        }, payload) { // 获取科室对应的信息
            try {
                const url = `${api.residentNurse.loadInfo}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async GetTreeInfoDept({
            commit,
            dispatch
        }, payload) { // 获取科室
            try {
                const url = `${api.residentNurse.getTreeInfoDept}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async LoadTreeInfo({
            commit,
            dispatch
        }, payload) { // 加载三测列表
            try {
                const url = `${api.residentNurse.loadTreeInfo}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async SaveThreeInfo({
            commit,
            dispatch
        }, payload) { // 保存三册表信息
            try {
                const url = `${api.residentNurse.saveThreeInfo}`
                const res = await fetch.post(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async GetNursingInspection({
            commit,
            dispatch
        }, payload) { // 获取护理巡视1
            try {
                const url = `${api.residentNurse.getNursingInspection}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async Get_MASURIUM_DICT_ITEM({
            commit,
            dispatch
        }, payload) { // 获取表格时间选择值
            try {
                const url = `${api.residentNurse.get_MASURIUM_DICT_ITEM}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async SaveNursingInspection({
            commit,
            dispatch
        }, payload) { // 保存护理巡视
            try {
                const url = `${api.residentNurse.saveNursingInspection}`
                const res = await fetch.post(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },


        async CREATE_NEW_DOC_CHECK_FILE_EXIST({
            commit,
            dispatch
        }, payload) { // 检查护理病历模板文档是否存在
            try {
                const url = `${api.residentDoctor.createDocCheckFileExist}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async CREATE_NEW_DOC({
            commit,
            dispatch
        }, payload) { // 打开护理病历模板
            try {
                const url = `${api.residentDoctor.createDoc}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async GetNurseSingerName({
            commit,
            dispatch
        }, payload) { // 获取护士签名
            try {
                const url = `${api.residentNurse.getNurseSingerName}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async GetNurseSingerNameScnd({
            commit,
            dispatch
        }, payload) { // 获取护理巡视2信息
            try {
                const url = `${api.residentNurse.getNurseSingerNameScnd}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async SaveNursingInspectionScnd({
            commit,
            dispatch
        }, payload) { // 保存护理巡视信息2
            try {
                const url = `${api.residentNurse.saveNursingInspectionScnd}`
                const res = await fetch.post(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async GetNurseQMScnd({
            commit,
            dispatch
        }, payload) { // 获取护士签名2
            try {
                const url = `${api.residentNurse.getNurseQMScnd}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async SAVE_AUTHRITY_CHECK({ commit, dispatch }, payload) { // 保存前检查是否有权限保存
            try {
                const url = `${api.residentNurse.saveAuthrityCheck}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async SAVE_RYPG({ commit, dispatch }, payload) { // 保存入院评估内容
            try {
                const url = `${api.residentNurse.saveRypg}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async DOC_HAS_CHANGED({ commit, dispatch }, payload) { // 判断服务器上的文件是否有更改
            try {
                const url = `${api.residentNurse.docHasChanged}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async IS_GROUP_DIAGNOSIS({ commit, dispatch }, payload) { // 判断是否属于会诊类别
            try {
                const url = `${api.residentNurse.isGroupDiagnosis}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async SAVE_DOC_BY_STRING({ commit, dispatch }, payload) { // 以字符串的形式上传文档
            try {
                const url = `${api.writeMedisine.saveDocByString}`
                const res = await fetch.post(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async SAVE_DOC_DATA({ commit, dispatch }, payload) { // 保存文档中数据(数据元，数据组，区域)
            try {
                const url = `${api.residentNurse.saveDocData}`
                const res = await fetch.post(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        saveNurTemplateData({//住院护士（点击护理病历模板）
            commit
        }, payload) {
            commit('saveNurTemplateData', payload)
        },
        async GetFileIndexCount({ commit, dispatch }, payload) { // 获取是否可以打印标识
            try {
                const url = `${api.residentNurse.getFileIndexCount}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
    }
}
export default residentNurse
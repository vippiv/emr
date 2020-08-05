import fetch from '@/utils/fetch'
import api from '@/global/api'
import { convertPostToGet } from '@/utils/utils'

const residentDoctor = {
    namespaced: true,
    state: {
        patientInfo: null, // 患者信息
        medisineOperationItem: null // 病历列表当前操作项
    },
    mutations: {
        save_patient_info(state, payload) {
            state.patientInfo = payload
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
        save_medisine_open_time(state, payload) {
            if (state.medisineOperationItem) {
                state.medisineOperationItem.openTime = payload
            }
        }
    },
    actions: {
        async DOCTORCHILDGETDELETESYS({ commit, dispatch }, payload) { // 住院医生工作站子模板管理删除权限获取
            try {
                const url = `${api.residentDoctor.doctorChildGetDeleteSys}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async DOCTORGETDELETESYS({ commit, dispatch }, payload) { // 住院医生工作站模板管理删除权限获取
            try {
                const url = `${api.residentDoctor.doctorGetDeleteSys}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async DOCTORCHILDGETSYSWORK({ commit, dispatch }, payload) { // 住院医生工作站子模板管理修改 复制 移动 模板权限获取
            try {
                const url = `${api.residentDoctor.doctorChildGetSysWork}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async DOCTORGETSYSWORK({ commit, dispatch }, payload) { // 住院医生工作站模板管理修改 复制 移动 模板权限获取
            try {
                const url = `${api.residentDoctor.doctorGetSysWork}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async DOCTORCHILDGETSESSIONRESULT({ commit, dispatch }, payload) { // 住院医生工作站子模板管理新增模板权限获取
            try {
                const url = `${api.residentDoctor.doctorChildGetSessionResult}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async DOCTORGETSESSIONRESULT({ commit, dispatch }, payload) { // 住院医生工作站模板管理新增模板权限获取
            try {
                const url = `${api.residentDoctor.doctorGetSessionResult}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async BTNDOCTOR_RANKSAVE({ commit, dispatch }, payload) { // 住院医生工作站子模板管理排序保存
            try {
                const url = `${api.residentDoctor.btnDoctorChildRankSave}`
                const res = await fetch.post(url, payload.sa)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async GTE_DOCTORCHILDRANK({ commit, dispatch }, payload) { // 住院医生工作站子模板管理排序
            try {
                const url = `${api.residentDoctor.doctorChildRank}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async DOCTOR_CHILDDELETEITEM({ commit, dispatch }, payload) { // 住院医生工作站子模板管理模板左边树子节点的删除
            try {
                const url = `${api.residentDoctor.doctorChildDeleteItemIndexByCode}`
                const res = await fetch.post(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async GET_CHILDLISTBYID({ commit, dispatch }, payload) { // 住院医生工作站子模板管理加载列表
            try {
                const url = `${api.residentDoctor.getChildListByID}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async GET_CHILDITEMINDEXBYMRATTR({ commit, dispatch }, payload) { // 住院医生工作站子模板管理左边树结构子节点获取
            try {
                const url = `${api.residentDoctor.getChildItemIndexBymrAttr}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async DOCTORCHILD_GETTREELIST({ commit, dispatch }, payload) { // 住院医生工作站子模板管理左边树结构获取
            try {
                const url = `${api.residentDoctor.doctorChildGetTreeList}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async DOCTOR_DELETEITEM({ commit, dispatch }, payload) { // 住院医生工作站模板管理模板左边树子节点的删除
            try {
                const url = `${api.residentDoctor.doctorDeleteItemIndexByCode}`
                const res = await fetch.post(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async DOCTOR_UPINSERT({ commit, dispatch }, payload) { // 住院医生工作站模板管理模板左边树子节点的修改
            try {
                const url = `${api.residentDoctor.doctorUpdateItemIndexList}`
                const res = await fetch.post(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async DOCTOR_INSERT({ commit, dispatch }, payload) { // 住院医生工作站模板管理模板左边树子节点的添加
            try {
                const url = `${api.residentDoctor.doctorInsertItemIndexList}`
                const res = await fetch.post(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async DOCTOR_GETINFOLISTBYSELECT({ commit, dispatch }, payload) { // 住院医生工作站模板管理模板查询按钮
            try {
                const url = `${api.residentDoctor.doctorGetInfoListBySelect}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async DOCTOR_TEMPMOVEORCOPYBTN({ commit, dispatch }, payload) { // 住院医生工作站模板管理移动和复制模板
            try {
                const url = `${api.residentDoctor.doctorTempMoveOrCopyBtn}`
                const res = await fetch.post(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async DOCTOR_CANCEL_CHECKBTN({ commit, dispatch }, payload) { // 取消审核模板按钮
            try {
                const url = `${api.residentDoctor.doctorCancelCheckBtn}`
                const res = await fetch.post(url, payload.Listmrcode)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async DOCTOR_CHECKBTN({ commit, dispatch }, payload) { // 审核模板按钮
            try {
                const url = `${api.residentDoctor.doctorCheckBtn}`
                const res = await fetch.post(url, payload.Listmrcode)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async DOCTOR_BTNDELETETEMPLATE({ commit, dispatch }, payload) { // 删除模板按钮
            try {
                const url = `${api.residentDoctor.doctorBtnDeleteTemplate}`
                const res = await fetch.post(url, payload.Listmrcode)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async DOCTOR_INSERTTEMPLATESAVE({ commit, dispatch }, payload) { // 新增模板里面的保存按钮与修改模板里面的保存按钮
            try {
                const url = `${api.residentDoctor.doctorInsertTemplateSave}`
                const res = await fetch.post(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async GET_DOCTORDEPT({ commit, dispatch }, payload) { // 住院医生工作站模板管理科室获取
            try {
                const url = `${api.residentDoctor.getDoctorDept}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async GET_DOCTORBUSINESS({ commit, dispatch }, payload) { // 住院医生工作站模板管理业务域获取
            try {
                const url = `${api.residentDoctor.getDoctorBusiness}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async GET_DOCTORITEMINDEXBYMRCODE({ commit, dispatch }, payload) { // 住院医生工作站模板管理修改模板信息获取
            try {
                const url = `${api.residentDoctor.getDoctorItemIndexByMrCode}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async BTN_DOCTOR_RANKSAVE({ commit, dispatch }, payload) { // 住院医生工作站模板管理排序保存
            try {
                const url = `${api.residentDoctor.btnDoctorRankSave}`
                const res = await fetch.post(url, payload.sa)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async DOCTOR_RANK({ commit, dispatch }, payload) { // 住院医生工作站模板管理排序
            try {
                const url = `${api.residentDoctor.doctorRank}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async GET_TREEINFOLISTBYID({ commit, dispatch }, payload) { // 住院医生工作站模板管理右边列表获取
            try {
                const url = `${api.residentDoctor.getTreeInfoListByID}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async GET_ITEMINDEXBYMRATTR({ commit, dispatch }, payload) { // 住院医生工作站模板管理左边树结构子节点获取
            try {
                const url = `${api.residentDoctor.getItemIndexBymrAttr}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async DOCTOR_GETTREELIST({ commit, dispatch }, payload) { // 住院医生工作站模板管理左边树结构获取
            try {
                const url = `${api.residentDoctor.doctorGetTreeList}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async SELECTBYICD10({ commit, dispatch }, payload) { // 国际编码模糊查询
            try {
                const url = `${api.residentDoctor.selectByICD10}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async SELECTICD_D({ commit, dispatch }, payload) { // 国际编码右边数据加载
            try {
                const url = `${api.residentDoctor.selectICD_D}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async SELECTICDTYPE({ commit, dispatch }, payload) { // 国际编码左边树结构初始加载
            try {
                const url = `${api.residentDoctor.selectICDType}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async GET_DRUGBYNAMEORCONTENT({ commit, dispatch }, payload) { // 药品资料库查询按钮
            try {
                const url = `${api.residentDoctor.getDrugByNameOrContent}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async GET_DRUGBYID({ commit, dispatch }, payload) { // 药品资料库点击获取此药类信息
            try {
                const url = `${api.residentDoctor.getDrugByID}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async GET_DRUG({ commit, dispatch }, payload) { // 药品资料库左边树结构初始加载
            try {
                const url = `${api.residentDoctor.getDrug}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async SAVE_SECONDBTN({ commit, dispatch }, payload) { // 手术编码维护保存
            try {
                const url = `${api.residentDoctor.saveSecondBtn}`
                const res = await fetch.post(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async GET_SECONDRIGHTTAB({ commit, dispatch }, payload) { // 手术编码维护右边页面加载
            try {
                const url = `${api.residentDoctor.getSecondRightTab}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async GET_ICDBYOPERATION({ commit, dispatch }, payload) { // 手术编码维护左边页面加载
            try {
                const url = `${api.residentDoctor.getICDByOperation}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async SAVE_BTN({ commit, dispatch }, payload) { // ICD维护保存
            try {
                const url = `${api.residentDoctor.saveBtn}`
                const res = await fetch.post(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async GET_RIGHTTAB({ commit, dispatch }, payload) { // ICD右边页面加载
            try {
                const url = `${api.residentDoctor.getRightTab}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async GET_AllICD({ commit, dispatch }, payload) { // ICD左边页面加载
            try {
                const url = `${api.residentDoctor.getAllICD}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async GET_IMAGETREE({ commit, dispatch }, payload) { // 获取图片树
            try {
                const url = `${api.residentDoctor.getImageTree}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async GET_PAITENTINFO_LIST({ commit, dispatch }, payload) { // 获取患者列表
            try {
                const url = `${api.residentDoctor.paitentInfoList}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async GET_PAITENTINFO_DOC_TPL({ commit, dispatch }, payload) { // 查询患者信息加载模板地址
            try {
                const url = `${api.residentDoctor.getPatientDocTpl}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async GET_DOCTOR_OPERATION({ commit, dispatch }, payload) { // 获取患者病历树
            try {
                const url = `${api.residentDoctor.doctorOperation}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async GET_PATIENT_INFO({ commit, dispatch }, payload) { // 获取患者信息
            try {
                const url = `${api.residentDoctor.patientInfo}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                if (res.code === 1) {
                    commit('save_patient_info', res.values && res.values.length > 0 && res.values[0])
                }
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async SAVE_PATIENT_INFO({ commit, dispatch }, payload) { // 保存患者信息
            try {
                const url = `${api.residentDoctor.savePatientInfo}`
                const res = await fetch.post(url, JSON.stringify(payload))
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async GET_DOCTOR({ commit, dispatch }, payload) { // 获取收录医师
            try {
                const url = `${api.residentDoctor.getDoctor}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async GET_EMERGENCY_DOCTOR({ commit, dispatch }, payload) { // 获取急诊医师
            try {
                const url = `${api.residentDoctor.emergencyDoctor}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async GET_DEPARTMENTS({ commit, dispatch }, payload) { // 获取科室
            try {
                const url = `${api.residentDoctor.getDepartments}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async SAVE_DEPARTMENTS_TRANSFER({ commit, dispatch }, payload) { // 保存科室转移
            try {
                const url = `${api.residentDoctor.saveDepartmentsTransfer}${convertPostToGet(payload)}`
                const res = await fetch.post(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async DEFAULT_DOCTOR_SET({ commit, dispatch }, payload) { // 三级检诊 - 默认上级医生登记设定
            try {
                const url = `${api.residentDoctor.defaultDoctorSet}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async SAVE_THREE_LEVEL_CHECK({ commit, dispatch }, payload) { // 保存三级检诊
            try {
                const url = `${api.residentDoctor.saveThreeLeveCheck}${convertPostToGet(payload)}`
                const res = await fetch.post(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async GET_ICD_CODES({ commit, dispatch }, payload) { // 西医病情列表
            try {
                const url = `${api.residentDoctor.getICDCodes}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async GET_MODULE({ commit, dispatch }, payload) { // 模板检索 获取模板
            try {
                const url = `${api.residentDoctor.getModule}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async GET_MODULE_CHILDREN({ commit, dispatch }, payload) { // 模板检索 查询父级模板对应的子级
            try {
                const url = `${api.residentDoctor.getModuleSub}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async GET_SUB_MODULE({ commit, dispatch }, payload) { // 子模板检索，获取子模板
            try {
                const url = `${api.residentDoctor.getSubModule}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async GET_CHILD_MODULE({ commit, dispatch }, payload) { // 子模板检索，查询父级模板对应的子级
            try {
                const url = `${api.residentDoctor.getChildModule}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async SAVE_RYPG({ commit, dispatch }, payload) { // 保存入院评估内容
            try {
                const url = `${api.writeMedisine.saveRypg}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async SAVE_MEDISINE_OPERATION_DOC({ commit, dispatch }, payload) { // 记录病历列表 当前操作项
            commit('save_medisine_operation_item', payload)
        },
        async UPDATE_MEDISINE_OPERATION_ITEM({ commit, dispatch }, payload) { // 更新当前病历操作项
            commit('update_medisine_operation_item', payload)
        },
        async SAVE_MEDISINE_DOC_OPEN_TIME({ commit, dispatch }, payload) { // 记录当前病历的打开时间
            commit('save_medisine_open_time', payload)
        },
        async DOC_HAS_CHANGED({ commit, dispatch }, payload) { // 判断服务器上的文件是否有更改
            try {
                const url = `${api.writeMedisine.docHasChanged}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async IS_GROUP_DIAGNOSIS({ commit, dispatch }, payload) { // 判断是否属于会诊类别
            try {
                const url = `${api.writeMedisine.isGroupDiagnosis}${convertPostToGet(payload)}`
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
        async SAVE_AUTHRITY_CHECK({ commit, dispatch }, payload) { // 保存前检查是否有权限保存
            try {
                const url = `${api.writeMedisine.saveAuthrityCheck}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async SAVE_DOC_DATA({ commit, dispatch }, payload) { // 保存文档中数据(数据元，数据组，区域)
            try {
                const url = `${api.writeMedisine.saveDocData}`
                const res = await fetch.post(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async CHECK_CREATE_NEW({ commit, dispatch }, payload) { // 检查能否执行新建
            try {
                const url = `${api.residentDoctor.checkCreate}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async CHECK_INSERT_PIECE({ commit, dispatch }, payload) { // 检查能否执行插入
            try {
                const url = `${api.residentDoctor.checkInsert}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async CREATE_OR_INSERT_DOC({ commit, dispatch }, payload) { // 模板检索(新建，插入，新建病程)
            try {
                const url = `${api.residentDoctor.newDoc}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async CREATE_NEW_DOC_CHECK_FILE_EXIST({ commit, dispatch }, payload) { // 右键 - 新建病程 - 检查文件是否存在
            try {
                const url = `${api.residentDoctor.createDocCheckFileExist}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async CREATE_NEW_DOC({ commit, dispatch }, payload) { // 右键 - 新建病程
            try {
                const url = `${api.residentDoctor.createDoc}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async INSERT_SIGN({ commit, dispatch }, payload) { // 插入签名
            try {
                const url = `${api.residentDoctor.insertSign}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async INSERT_LEADER_SIGN({ commit, dispatch }, payload) { // 插入上级医师签名
            try {
                const url = `${api.residentDoctor.insertLeaderSign}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async GET_ALL_VECTOR_GRAPH({ commit, dispatch }, payload) { // 加载所有矢量图
            try {
                const url = `${api.residentDoctor.vectorGraphList}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async GET_VECTOR_GRAPH({ commit, dispatch }, payload) { // 加载单个矢量图
            try {
                const url = `${api.residentDoctor.vectorGraph}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async GET_PERSONAL_MODULES({ commit, dispatch }, payload) { // 存入个人模板 - 获取个人模板列表
            try {
                const url = `${api.residentDoctor.getPersonalModules}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async SAVE_TO_PERSONAL_MODULES({ commit, dispatch }, payload) { // 存入个人模板
            try {
                const url = `${api.residentDoctor.saveToPersonalModules}${convertPostToGet(payload)}`
                const res = await fetch.post(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async GET_CHILD_TEMPLATE_INFO({ commit, dispatch }, payload) { // 获取子模板信息
            try {
                const url = `${api.residentDoctor.getChildTemplateInfo}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async GET_CLINICAL_DATA_ANALYZE_ONE({ commit, dispatch }, payload) { // 临床数据 - 检验结果第一步
            try {
                const url = `${api.residentDoctor.clinicalDataAnalyzeOne}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async GET_CLINICAL_DATA_ANALYZE_TWO({ commit, dispatch }, payload) { // 临床数据 - 检验结果第二步
            try {
                const url = `${api.residentDoctor.clinicalDataAnalyzeTwo}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async GET_CLINICAL_DATA_CHECK_ONE({ commit, dispatch }, payload) { // 临床数据 - 检查结果第一步
            try {
                const url = `${api.residentDoctor.clinicalDataCheckOne}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async GET_CLINICAL_DATA_CHECK_TWO({ commit, dispatch }, payload) { // 临床数据 - 检查结果第一步
            try {
                const url = `${api.residentDoctor.clinicalDataCheckTwo}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async GET_CLINICAL_DATA_DOCTOR_ADVICE({ commit, dispatch }, payload) { // 临床数据 - 医嘱提取
            try {
                const url = `${api.residentDoctor.clinicalDataDoctorAdvice}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async GET_CLINICAL_DATA_MEDISION_RECORD({ commit, dispatch }, payload) { // 临床数据 - 病历诊断
            try {
                const url = `${api.residentDoctor.clinicalDataMedisineRecord}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async GET_CLINICAL_DATA_LIVES({ commit, dispatch }, payload) { // 临床数据 - 生命体征
            try {
                const url = `${api.residentDoctor.clinicalDataLives}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async MEDISINE_RECORD_SYNC({ commit, dispatch }, payload) { // 同步
            try {
                const url = `${api.residentDoctor.medisineRecordSync}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        // 会诊管理
        async LoadOninvitation({ commit, dispatch }, payload) { // 获取应邀会诊信息
            try {
                const url = `${api.residentDoctor.loadOninvitation}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async LoadApplyfor({ commit, dispatch }, payload) { // 获取本科会诊信息
            try {
                const url = `${api.residentDoctor.loadApplyfor}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async LocationBtn({ commit, dispatch }, payload) { // 定位查找
            try {
                const url = `${api.residentDoctor.locationBtn}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async CcceptBtn({ commit, dispatch }, payload) { // 接受会诊
            try {
                const url = `${api.residentDoctor.ccceptBtn}${convertPostToGet(payload)}`
                const res = await fetch.post(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async CommitBtn({ commit, dispatch }, payload) { // 完成会诊
            try {
                const url = `${api.residentDoctor.commitBtn}${convertPostToGet(payload)}`
                const res = await fetch.post(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async FinishBtn({ commit, dispatch }, payload) { // 结束会诊提示
            try {
                const url = `${api.residentDoctor.finishBtn}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async Postok({ commit, dispatch }, payload) { // 结束会诊
            try {
                const url = `${api.residentDoctor.postok}`
                const res = await fetch.post(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async GetUsersByGroup({ commit, dispatch }, payload) { // 获取病历列表信息
            try {
                const url = `${api.residentDoctor.getUsersByGroup}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        //病案管理
        async LoadServe({ commit, dispatch }, payload) { // 获取病历借阅服务信息
            try {
                const url = `${api.residentDoctor.loadServe}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async RetrievalBtn({ commit, dispatch }, payload) { // 已归档病案查询中检索按钮服务
            try {
                const url = `${api.residentDoctor.retrievalBtn}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async Borrow({ commit, dispatch }, payload) { // 已归档病案查询中借阅窗体中借阅按钮服务
            try {
                const url = `${api.residentDoctor.borrow}`
                const res = await fetch.post(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async SelectHistoryBtn({ commit, dispatch }, payload) { // 借阅历史记录查询按钮
            try {
                const url = `${api.residentDoctor.selectHistoryBtn}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async ReturnBtn({ commit, dispatch }, payload) { // 归还
            try {
                const url = `${api.residentDoctor.returnBtn}`
                const res = await fetch.post(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async JyetUsersByGroup({ commit, dispatch }, payload) { // 病历列表-双击右边树
            try {
                const url = `${api.residentDoctor.jyetUsersByGroup}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async SELECTDept({ commit, dispatch }, payload) { // 查询科室
            try {
                const url = `${api.residentDoctor.sELECTDept}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async SelectVISIT1({ commit, dispatch }, payload) { // 已归档病历查询
            try {
                const url = `${api.residentDoctor.selectVISIT1}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async SaveAllapplyFor({ commit, dispatch }, payload) { // 全部申请
            try {
                const url = `${api.residentDoctor.saveAllapplyFor}`
                const res = await fetch.post(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async BindDataGridCheck({ commit, dispatch }, payload) { // 获取已审批数据
            try {
                const url = `${api.residentDoctor.bindDataGridCheck}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async ApplyFor({ commit, dispatch }, payload) {
            // 单个申请
            try {
                const url = `${api.residentDoctor.applyFor}`
                const res = await fetch.post(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async SpLoad({ commit, dispatch }, payload) { // 获取借阅审批数据
            try {
                const url = `${api.residentDoctor.spLoad}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async CannotBtn({ commit, dispatch }, payload) { // 拒绝按钮服务
            try {
                const url = `${api.residentDoctor.cannotBtn}`
                const res = await fetch.post(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async ApprovalBtn({ commit, dispatch }, payload) { // 审批按钮服务
            try {
                const url = `${api.residentDoctor.approvalBtn}`
                const res = await fetch.post(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async GET_CLINICAL_DATA_ANALYZE_ONE({ commit, dispatch }, payload) { // 临床数据 - 检验结果第一步
            try {
                const url = `${api.residentDoctor.clinicalDataAnalyzeOne}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async GET_CLINICAL_DATA_ANALYZE_TWO({ commit, dispatch }, payload) { // 临床数据 - 检验结果第二步
            try {
                const url = `${api.residentDoctor.clinicalDataAnalyzeTwo}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async GET_CLINICAL_DATA_CHECK_ONE({ commit, dispatch }, payload) { // 临床数据 - 检查结果第一步
            try {
                const url = `${api.residentDoctor.clinicalDataCheckOne}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async GET_CLINICAL_DATA_CHECK_TWO({ commit, dispatch }, payload) { // 临床数据 - 检查结果第一步
            try {
                const url = `${api.residentDoctor.clinicalDataCheckTwo}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async GET_CLINICAL_DATA_DOCTOR_ADVICE({ commit, dispatch }, payload) { // 临床数据 - 医嘱提取
            try {
                const url = `${api.residentDoctor.clinicalDataDoctorAdvice}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async GET_CLINICAL_DATA_MEDISION_RECORD({ commit, dispatch }, payload) { // 临床数据 - 病历诊断
            try {
                const url = `${api.residentDoctor.clinicalDataMedisineRecord}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async GET_CLINICAL_DATA_LIVES({ commit, dispatch }, payload) { // 临床数据 - 生命体征
            try {
                const url = `${api.residentDoctor.clinicalDataLives}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async GET_DIAGNOSIS_ICDS({ commit, dispatch }, payload) { // 诊断弹窗 - 获取全部/科室/个人ICD数据
            try {
                const url = `${api.residentDoctor.diagnosisICDs}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async GET_ENABLE_DIAGNOSIS_TYPE({ commit, dispatch }, payload) { // 诊断弹窗 - 判断哪些诊断类型可用
            try {
                const url = `${api.residentDoctor.diagnosisEnableType}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async GET_DIAGNOSIS_INFO({ commit, dispatch }, payload) { // 诊断弹窗 - 获取诊断数据
            try {
                const url = `${api.residentDoctor.diagnosisInfo}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async DIAGNOSIS_SAVE_CHECK({ commit, dispatch }, payload) { // 诊断弹窗 - 诊断保存验证
            try {
                const url = `${api.residentDoctor.diagnosisSaveCheck}`
                const res = await fetch.post(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async GET_OPERATION_ICD({ commit, dispatch }, payload) { // 手术弹窗
            try {
                const url = `${api.residentDoctor.diagnosisOperation}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async GetAllBySys({ commit, dispatch }, payload) { // 获取系统预定义数据元
            try {
                const url = `${api.residentDoctor.getAllBySys}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async GetDataElementFatherNode({ commit, dispatch }, payload) { // 用户自定义数据元父节点信息
            try {
                const url = `${api.residentDoctor.getDataElementFatherNode}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async GetDataElementSonNode({ commit, dispatch }, payload) { // 用户自定义数据元子节点信息
            try {
                const url = `${api.residentDoctor.getDataElementSonNode}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async GetMySelfFatherTemplate({ commit, dispatch }, payload) { // 获取个人模板父节点
            try {
                const url = `${api.residentDoctor.getMySelfFatherTemplate}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async GetSubTemplate({ commit, dispatch }, payload) { // 获取个人模板子节点
            try {
                const url = `${api.residentDoctor.getSubTemplate}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async GetUserDataGroup({ commit, dispatch }, payload) { // 获取用户数据组
            try {
                const url = `${api.residentDoctor.getUserDataGroup}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async GetDataEleSonData({ commit, dispatch }, payload) { // 单击自定义数据元获取元素
            try {
                const url = `${api.residentDoctor.getDataEleSonData}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async TemplateDoubleClick({ commit, dispatch }, payload) { // 双击(编辑模板)打开模板
            try {
                const url = `${api.residentDoctor.templateDoubleClick}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async savePersonTemplate({ commit, dispatch }, payload) { // 存入个人模板
            try {
                const url = `${api.residentDoctor.savePersonTemplate}${convertPostToGet(payload)}`
                const res = await fetch.post(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async GetAllBymlngID({ commit, dispatch }, payload) { // 获取元素选择的值
            try {
                const url = `${api.residentDoctor.getAllBymlngID}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async SaveTempLate({ commit, dispatch }, payload) { // 保存模板
            try {
                const url = `${api.residentDoctor.saveTempLate}${convertPostToGet(payload)}`
                const res = await fetch.post(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
		},
		async MEDISINE_RECORD_LOCK({ commit, dispatch }, payload) { // 锁住病历模板
			try {
				const url = `${api.residentDoctor.medisineRecordLock}${convertPostToGet(payload)}`
				const res = await fetch.post(url, payload)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		async MEDISINE_RECORD_UNLOCK({ commit, dispatch }, payload) { // 解锁病历模板
			try {
				const url = `${api.residentDoctor.medisineRecordUnLock}${convertPostToGet(payload)}`
				const res = await fetch.post(url, payload)
				return res
			} catch (e) {
				console.log(e)
			}
		},
        async UploadFileStream({ commit, dispatch }, payload) { //  以字符串方式上传DOC文档
            try {
                const url = `${api.residentDoctor.uploadFileStream}`
                const res = await fetch.post(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async GetIsLock({ commit, dispatch }, payload) { //  获取是否可以操作
            try {
                const url = `${api.residentDoctor.getIsLock}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async SetLockDoc({ commit, dispatch }, payload) { //  锁定(打开文档用)
            try {
                const url = `${api.residentDoctor.setLockDoc}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async SetUnlockDoc({ commit, dispatch }, payload) { //  解锁(关闭文档用)
            try {
                const url = `${api.residentDoctor.setUnlockDoc}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        }
        
    }
}

export default residentDoctor

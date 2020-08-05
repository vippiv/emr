import fetch from '@/utils/fetch'
import api from '@/global/api'
import { convertPostToGet } from '@/utils/utils'

const tempManage = {
	state: {
	},
	mutations: {},
	actions: {
		// 模板管理编辑器
		async SaveTempLate({commit,dispatch}, payload) { // 保存模板
            try {
                const url = `${api.residentDoctor.saveTempLate}${convertPostToGet(payload)}`
                const res = await fetch.post(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
        async UploadFileStream({commit,dispatch}, payload) { //  以字符串方式上传DOC文档
            try {
                const url = `${api.residentDoctor.uploadFileStream}`
                const res = await fetch.post(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
        },
		async TemplateDoubleClick({commit,dispatch}, payload) { // 双击(编辑模板)打开模板
            try {
                const url = `${api.residentDoctor.templateDoubleClick}${convertPostToGet(payload)}`
                const res = await fetch.get(url, payload)
                return res
            } catch (e) {
                console.log(e)
            }
		},

		// 数据元页面
		async SAVETEMP ({ commit, dispatch }, payload) { // 保存
			try {
				const url = `${api.tempManage.save}`
				const res = await fetch.post(url,payload)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		async GETDATATEMP ({ commit, dispatch }, payload) { // 获取数据元左边树结构
			try {
				const url = `${api.tempManage.GetDataTemp}`
				const res = await fetch.get(url, payload)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		async GET_DATECELL_M ({ commit, dispatch }, payload) { // 根据编号获取指定的病历元素信息
			try {
				const url = `${api.tempManage.getDATECELL_M}${convertPostToGet(payload)}`
				const res = await fetch.get(url, payload)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		async GET_MASTRIUMDICT ({ commit, dispatch }, payload) { // 数据元可选值获取
			try {
				const url = `${api.tempManage.getMastriumdict}${convertPostToGet(payload)}`
				const res = await fetch.get(url, payload)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		async DELETE ({ commit, dispatch }, payload) { // 删除
			try {
				const url = `${api.tempManage.delete}${convertPostToGet(payload)}`
				const res = await fetch.post(url, payload)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		// 数据组管理页面
		async GET_DATAGROUP ({ commit, dispatch }, payload) { // 获取数据组左边树结构
			try {
				const url = `${api.tempManage.getDataGroup}`
				const res = await fetch.get(url, payload)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		// 基础模板管理页面
		async GETDELETESYS ({ commit, dispatch }, payload) { // 删除 模板权限获取
			try {
				const url = `${api.tempManage.getDeleteSys}${convertPostToGet(payload)}`
				const res = await fetch.get(url,payload)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		async GETSYSWORK ({ commit, dispatch }, payload) { // 修改 复制 移动 模板权限获取
			try {
				const url = `${api.tempManage.getSysWork}${convertPostToGet(payload)}`
				const res = await fetch.get(url,payload)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		async GETSESSIONRESULT ({ commit, dispatch }, payload) { // 新增模板权限获取
			try {
				const url = `${api.tempManage.getSessionResult}${convertPostToGet(payload)}`
				const res = await fetch.get(url,payload)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		async TEMPMOVEORCOPYBTN ({ commit, dispatch }, payload) { // 移动和复制模板
			try {
				const url = `${api.tempManage.tempMoveOrCopyBtn}`
				const res = await fetch.post(url,payload)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		async GET_DATAMANAGEFATHER ({ commit, dispatch }, payload) { // 获取基本模板管理页面左边树结构获取父节点
			try {
				const url = `${api.tempManage.getDataManageFather}`
				const res = await fetch.get(url, payload)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		async GET_DATAMANAGEITEM ({ commit, dispatch }, payload) { // 获取基本模板管理页面左边树结构获取子节点
			try {
				const url = `${api.tempManage.getDataManageItemIndexBymrAttr}${convertPostToGet(payload)}`
				const res = await fetch.get(url, payload)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		async GET_DATA_MANAGE_LIST ({ commit, dispatch }, payload) { // 获取基本模板管理页面列表
			try {
				// const url = `${api.tempManage.getDataManageList}?sid=${payload.sid}&tag=${payload.tag}&code=${payload.code}&cbWoman=${payload.cbWoman}&cbMan=${payload.cbMan}&cbTY=${payload.cbTY}&pageSize=${payload.pageSize}&pageNos=${payload.pageNos}`
				const url = `${api.tempManage.getDataManageList}${convertPostToGet(payload)}`
				const res = await fetch.get(url)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		async GET_FAINFOLISTBYSELECT ({ commit, dispatch }, payload) { // 模板查询
			try {
				const url = `${api.tempManage.getFaInfoListBySelect}${convertPostToGet(payload)}`
				const res = await fetch.get(url)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		async GET_RANK ({ commit, dispatch }, payload) { // 模板管理排序按钮
			try {
				const url = `${api.tempManage.raNk}${convertPostToGet(payload)}`
				const res = await fetch.get(url)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		async GET_BUSINESS ({ commit, dispatch }, payload) { // 获取业务域
			try {
				const url = `${api.tempManage.getBusiness}`
				const res = await fetch.get(url, payload)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		async BTN_RANKSAVE ({ commit, dispatch }, payload) { // 模板管理排序保存按钮
			try {
				const url = `${api.tempManage.btnRankSave}`
				const res = await fetch.post(url, payload.sa)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		async GET_DEPT ({ commit, dispatch }, payload) { // 获取科室
			try {
				const url = `${api.tempManage.getDept}${convertPostToGet(payload)}`
				const res = await fetch.get(url)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		async BTN_DELETETEMPLATE ({ commit, dispatch }, payload) { // 删除模板按钮
			try {
				const url = `${api.tempManage.btnDeleteTemplate}`
				const res = await fetch.post(url, payload.Listmrcode)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		async CHECKBTN ({ commit, dispatch }, payload) { // 审核模板按钮
			try {
				const url = `${api.tempManage.checkBtn}`
				const res = await fetch.post(url, payload.Listmrcode)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		async CANCELCHECKBTN ({ commit, dispatch }, payload) { // 点击取消审核模板按钮
			try {
				const url = `${api.tempManage.cancelCheckBtn}`
				const res = await fetch.post(url, payload.Listmrcode)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		async INSERT_TEMPLATESAVE ({ commit, dispatch }, payload) { // 新增模板里面的保存按钮与修改模板里面的保存按钮
			try {
				const url = `${api.tempManage.insertTemplateSave}`
				const res = await fetch.post(url,payload)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		async GET_INSERTITEMINDEXLIST ({ commit, dispatch }, payload) { // 左边树子节点的添加
			try {
				const url = `${api.tempManage.insertItemIndexList}`
				const res = await fetch.post(url,payload)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		async UP_DATEITEMINDEXLIST ({ commit, dispatch }, payload) { // 左边树子节点的修改
			try {
				const url = `${api.tempManage.updateItemIndexList}`
				const res = await fetch.post(url,payload)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		async DELETE_ITEMINDEXBYCODE ({ commit, dispatch }, payload) { // 左边树子节点的删除
			try {
				const url = `${api.tempManage.deleteItemIndexByCode}`
				const res = await fetch.post(url,payload)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		async GET_ITEMINDEXBYMRCODE ({ commit, dispatch }, payload) { // 修改模板信息获取
			try {
				const url = `${api.tempManage.getItemIndexByMrCode}${convertPostToGet(payload)}`
				const res = await fetch.get(url)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		async GET_AREAFLAGANDLISTNAMEBYMRCODE1 ({ commit, dispatch }, payload) { // 查看是否获取区域
			try {
				const url = `${api.tempManage.getAreaFlagAndListNameByMrCode1}${convertPostToGet(payload)}`
				const res = await fetch.get(url)
				return res
			} catch (e) {
				console.log(e)
			}
		},

		// 子模板管理页面
		async SUB_GETDELETESYS ({ commit, dispatch }, payload) { // 删除 子模板权限获取
			try {
				const url = `${api.tempManage.subGetDeleteSys}${convertPostToGet(payload)}`
				const res = await fetch.get(url,payload)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		async SUB_GETSYSWORK ({ commit, dispatch }, payload) { // 修改 复制 移动 模板权限获取
			try {
				const url = `${api.tempManage.subGetSysWork}${convertPostToGet(payload)}`
				const res = await fetch.get(url,payload)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		async SUB_GETSESSIONRESULT ({ commit, dispatch }, payload) { // 新增模板权限获取
			try {
				const url = `${api.tempManage.subGetSessionResult}${convertPostToGet(payload)}`
				const res = await fetch.get(url,payload)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		async SUB_TEMPMOVEORCOPYBTN ({ commit, dispatch }, payload) { // 复制模板
			try {
				const url = `${api.tempManage.subTempMoveOrCopyBtn}`
				const res = await fetch.post(url,payload)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		async SUB_INSERTITEMINDEXLIST ({ commit, dispatch }, payload) { // 左边树子节点的添加
			try {
				const url = `${api.tempManage.subInsertItemIndexList}`
				const res = await fetch.post(url,payload)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		async SUB_UPDATEITEMINDEXLIST ({ commit, dispatch }, payload) { // 左边树子节点的修改
			try {
				const url = `${api.tempManage.subUpdateItemIndexList}`
				const res = await fetch.post(url,payload)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		async SUB_DELETEITEMINDEXBYCODE ({ commit, dispatch }, payload) { // 左边树子节点的删除
			try {
				const url = `${api.tempManage.subDeleteItemIndexByCode}`
				const res = await fetch.post(url,payload)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		async SUB_CHECKBTN ({ commit, dispatch }, payload) { // 审核模板按钮
			try {
				const url = `${api.tempManage.subCheckBtn}`
				const res = await fetch.post(url, payload.Listmrcode)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		async SUB_CANCELCHECKBTN ({ commit, dispatch }, payload) { // 点击取消审核模板按钮
			try {
				const url = `${api.tempManage.subCancelCheckBtn}`
				const res = await fetch.post(url, payload.Listmrcode)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		async SUB_GETITEMINDEXBYMRCODE ({ commit, dispatch }, payload) { // 修改模板信息获取
			try {
				const url = `${api.tempManage.subGetItemIndexByMrCode}${convertPostToGet(payload)}`
				const res = await fetch.get(url)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		async SUB_INSERTEMPLATESAVE ({ commit, dispatch }, payload) { // 新增模板里面的保存按钮与修改模板里面的保存按钮
			try {
				const url = `${api.tempManage.subInsertTemplateSave}`
				const res = await fetch.post(url,payload)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		async GET_TDEPARTMENT ({ commit, dispatch }, payload) { // 获取业务域
			try {
				const url = `${api.tempManage.getTdepartment}`
				const res = await fetch.get(url, payload)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		async SUB_GETDEPT ({ commit, dispatch }, payload) { // 获取科室
			try {
				const url = `${api.tempManage.subGetDept}${convertPostToGet(payload)}`
				const res = await fetch.get(url)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		async PERSON_TEMPLATEDELE ({ commit, dispatch }, payload) { // 删除模板按钮
			try {
				const url = `${api.tempManage.personTemplateDele}`
				const res = await fetch.post(url, payload.Mr_Code)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		async BTN_RANKSAVE ({ commit, dispatch }, payload) { // 子模板管理排序保存按钮
			try {
				const url = `${api.tempManage.btnRankSave}`
				const res = await fetch.post(url, payload.sa)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		async GET_INFOLISTBYSELECT ({ commit, dispatch }, payload) { // 模板查询
			try {
				const url = `${api.tempManage.getInfoListBySelect}${convertPostToGet(payload)}`
				const res = await fetch.get(url)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		async RANK ({ commit, dispatch }, payload) { // 模板管理排序按钮
			try {
				const url = `${api.tempManage.rank}${convertPostToGet(payload)}`
				const res = await fetch.get(url)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		async GET_SUBMOULD ({ commit, dispatch }, payload) { // 获取子模版管理左边树结构父节点
			try {
				const url = `${api.tempManage.getSubMould}`
				const res = await fetch.get(url, payload)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		async GET_SUBITEMINDEXBYMRATTR ({ commit, dispatch }, payload) { // 获取子模版管理左边树结构子节点
			try {
				const url = `${api.tempManage.getSubItemIndexBymrAttr}${convertPostToGet(payload)}`
				const res = await fetch.get(url, payload)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		async GET_LISTBYID ({ commit, dispatch }, payload) { // 获取子模板管理右边列表
			try {
				const url = `${api.tempManage.getListByID}${convertPostToGet(payload)}`
				const res = await fetch.get(url)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		async GET_FILELIST ({ commit, dispatch }, payload) { // 获取文件解锁列表
			try {
				const url = `${api.tempManage.getFileList}${convertPostToGet(payload)}`
				const res = await fetch.get(url)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		async GET_PNODEMAXID ({ commit, dispatch }, payload) { // 获取子节点id最大值
			try {
				const url = `${api.tempManage.getPnodemaxid}`
				const res = await fetch.get(url, payload)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		async P_DATAGROUPSAVE ({ commit, dispatch }, payload) { // 新建分类保存
			try {
				const url = `${api.tempManage.datagroupSave}`
				const res = await fetch.post(url,payload)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		async DELETE_DATAGROUP ({ commit, dispatch }, payload) { // 删除
			try {
				const url = `${api.tempManage.deleDataGroup}`
				const res = await fetch.post(url,payload)
				return res
			} catch (e) {
				console.log(e)
			}
		},
		async GET_CNODEMAXID ({ commit, dispatch }, payload) { // 获取子节点id最大值
			try {
				const url = `${api.tempManage.getCnodemaxid}${convertPostToGet(payload)}`
				const res = await fetch.get(url)
				return res
			} catch (e) {
				console.log(e)
			}
		}
    }
}

export default tempManage

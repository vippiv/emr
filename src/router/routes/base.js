import * as urls from '../routePath'

// 基础数据维护
const reportFormWelcome = () => import('@/views/base/welcomePage.vue') // 基础数据维护欢迎界面

// 报表
const reportForm = () => import('@/views/base/reportForm/index.vue') // 报表
const reportForm_printset = () => import('@/views/base/reportForm/printSet/index.vue') // 报表 - 打印设置
const reportForm_search = () => import('@/views/base/reportForm/search/index.vue') // 报表查询
const reportForm_loadlog = () => import('@/views/base/reportForm/loadLog/index.vue') // 登录日志
const reportForm_medicinerecordlog = () => import('@/views/base/reportForm/medicineRecordsLog/index.vue') // 登录日志
const reportForm_patientinfoeditlog = () => import('@/views/base/reportForm/patientInfoEditLog/index.vue') // 登录日志
const reportForm_medicinerecordglance = () => import('@/views/base/reportForm/medicineRecordGlance/index.vue') // 登录日志

// 同步管理
const syncManage = () => import('@/views/base/syncManage/index.vue')
const syncManage_datatpl = () => import('@/views/base/syncManage/dataGroupTpl/index.vue') // 数据组和模板
const syncManage_contentset = () => import('@/views/base/syncManage/contentSet/index.vue') // 同步内容设置
const syncManage_userInfoSync = () => import('@/views/base/syncManage/userInfoSync/index.vue') // 用户同步信息

// 后台管理
const backendManage = () => import('@/views/base/backendManage/index.vue')
const backendManage_datatpl = () => import('@/views/base/backendManage/datatpl/index.vue')
const backendManage_nurseStationRecord = () => import('@/views/base/backendManage/nurseStationRecord/index.vue')// 护士工作站和护士记录单维护
const backendManage_codeTableBrowser = () => import('@/views/base/backendManage/codeTableBrowser/index.vue') // 码表浏览
const backendManage_bedMaint = () => import('@/views/base/backendManage/bedMaint/index.vue') // 床位维护
const backendManage_doctorDepartment = () => import('@/views/base/backendManage/doctorDepartment/index.vue') // 医生工作站与科室维护
const backendManage_departmentMaint = () => import('@/views/base/backendManage/departmentMaint/index.vue') // 科室维护
const backendManage_vectorGraph = () => import('@/views/base/backendManage/vectorGraph/index.vue') // 矢量图维护
const backendManage_temperatureList = () => import('@/views/base/backendManage/temperatureList/index.vue') // 体温单配置

// 模板管理
const tempManage = () => import('@/views/base/tempManage/index.vue')
const tempManage_manage = () => import('@/views/base/tempManage/manage/index.vue') // 模板管理
const tempManage_doctorp = () => import('@/views/base/tempManage/doctorp/index.vue') // 医师排班
const tempManage_subtemp = () => import('@/views/base/tempManage/subtemp/index.vue') // 子模板管理
const tempManage_datatemp = () => import('@/views/base/tempManage/datatemp/index.vue') // 数据元管理
const tempManage_datagroup = () => import('@/views/base/tempManage/datagroup/index.vue') // 数据组管理
const tempManage_unlock = () => import('@/views/base/tempManage/unlock/index.vue') // 病历解锁
const tempManage_headersetting = () => import('@/views/base/tempManage/headersetting/index.vue') // 页眉设置

// 人员维护
const personMain = () => import('@/views/base/personMain/index.vue')
const personMain_power = () => import('@/views/base/personMain/power/index.vue') // 人员权限维护
const personMain_title = () => import('@/views/base/personMain/title/index.vue') // 人员职称维护
const personMain_sign = () => import('@/views/base/personMain/sign/index.vue') // 人员签名维护
const personMain_run = () => import('@/views/base/personMain/run/index.vue') // 人员管理
const personMain_tertiary = () => import('@/views/base/personMain/tertiary/index.vue') // 三级检诊维护(默认)

// 系统管理
const systemManage = () => import('@/views/base/systemManage/index.vue')
const systemManage_medisinerecord = () => import('@/views/base/systemManage/medisineRecord/index.vue') // 病例封存/解封
const systemManage_menu = () => import('@/views/base/systemManage/menu/index.vue') // 菜单管理
const systemManage_icdcode = () => import('@/views/base/systemManage/ICDCode/index.vue') // ICD编码维护

// 配置
const configure = () => import('@/views/base/configure/index.vue')
const configure_baseConfigure = () => import('@/views/base/configure/baseConfigure/index.vue')

const routes = [
	{
		name: 'reportFormWelcome',
		path: `${urls.BASE_WELCOME}`,
		meta: {
			title: '基础数据维护，欢迎',
			hidden: true
		},
		component: reportFormWelcome
	},
	{
		name: 'reportForm',
		path: `${urls.BASE_REPORT_FORM}`,
		meta: {
			title: '报表'
		},
		component: reportForm,
		children: [
			{
				name: 'reportFormSearch',
				path: `${urls.BASE_REPORT_FORM_SEARCH}`,
				meta: {
					title: '报表查询'
				},
				component: reportForm_search
			},
			{
				name: 'printSet',
				path: `${urls.BASE_REPORT_PRINT_SET}`,
				meta: {
					title: '打印设置'
				},
				component: reportForm_printset
			},
			{
				name: 'reportFormLoadLog',
				path: `${urls.BASE_REPORT_FORM_LOADLOG}`,
				meta: {
					title: '登录日志信息'
				},
				component: reportForm_loadlog
			},
			{
				name: 'medicineRecordsLog',
				path: `${urls.BASE_REPORT_MEDICINE_LOG}`,
				meta: {
					title: '病历操作日志信息'
				},
				component: reportForm_medicinerecordlog
			},
			{
				name: 'parientInfoEditlog',
				path: `${urls.BASE_REPORT_PATIENT_INFO_EDIT_LOGO}`,
				meta: {
					title: '患者信息修改日志信息'
				},
				component: reportForm_patientinfoeditlog
			},
			{
				name: 'medicineRecordRandomGlance',
				path: `${urls.BASE_REPORT_MEDICINE_RECORD_GLANCE}`,
				meta: {
					title: '病历随机浏览'
				},
				component: reportForm_medicinerecordglance
			}
		]
	},
	{
		name: 'syncManage',
		path: `${urls.BASE_SYNCMANAGE}`,
		meta: {
			title: '同步管理'
		},
		component: syncManage,
		children: [
			{
				name: 'datagroupandtpl',
				path: `${urls.BASE_SYNCMANAGE_DATATPL}`,
				meta: {
					title: '数据组和模板'
				},
				component: syncManage_datatpl
			},
			{
				name: 'contentset',
				path: `${urls.BASE_SYNCMANAGE_CONTENT_SET}`,
				meta: {
					title: '同步内容设置'
				},
				component: syncManage_contentset
			},
			{
				name: 'userInfoSync',
				path: `${urls.BASE_SYNCMANAGE_Infor_SYNC}`,
				meta: {
					title: '用户同步信息'
				},
				component: syncManage_userInfoSync
			}
		]
	},
	{
		name: 'backEndManage',
		path: `${urls.BASE_BACKENDMANAGE}`,
		meta: {
			title: '后台管理'
		},
		component: backendManage,
		children: [
			{
				name: 'backenddatatpl',
				path: `${urls.BASE_BACKENDMANAGE_DATATPL}`,
				meta: {
					title: '模板目录维护'
				},
				component: backendManage_datatpl
			},
			{
				name: 'nurselist',
				path: `${urls.BASE_BACKENDMANAGE_NURSELIST}`,
				meta: {
					title: '护士工作站和护士记录单维护'
				},
				component: backendManage_nurseStationRecord
			},
			{
				name: 'codeTableBrowser',
				path: `${urls.BASE_BACKENDMANAGE_CODETABLEBROWSE}`,
				meta: {
					title: '码表浏览'
				},
				component: backendManage_codeTableBrowser
			},
			{
				name: 'bedMaint',
				path: `${urls.BASE_BACKENDMANAGE_BEDMAINT}`,
				meta: {
					title: '床位维护'
				},
				component: backendManage_bedMaint
			},
			{
				name: 'doctorDepartment',
				path: `${urls.BASE_BACKENDMANAGE_DOCTORDEPARTMENT}`,
				meta: {
					title: '医生工作站与科室维护'
				},
				component: backendManage_doctorDepartment
			},
			{
				name: 'departmentMaint',
				path: `${urls.BASE_BACKENDMANAGE_DEPARTMENTMAINT}`,
				meta: {
					title: '科室维护'
				},
				component: backendManage_departmentMaint
			},
			{
				name: 'vectorGraph',
				path: `${urls.BASE_BACKENDMANAGE_VECTORGRAPH}`,
				meta: {
					title: '矢量图维护'
				},
				component: backendManage_vectorGraph
			},
			{
				name: 'temperatureList',
				path: `${urls.BASE_BACKENDMANAGE_TEMPERATURELIST}`,
				meta: {
					title: '体温单配置'
				},
				component: backendManage_temperatureList
			}
		]
	},
	{
		name: 'tempManage',
		path: `${urls.BASE_TEMPMANAGE}`,
		meta: {
			title: '模板管理'
		},
		component: systemManage,
		children: [
			{
				name: 'manage',
				path: `${urls.BASE_TEMPMANAGE_MANAGE}`,
				meta: {
					title: '模板管理'
				},
				component: tempManage_manage
			},
			{
				name: 'doctorp',
				path: `${urls.BASE_TEMPMANAGE_DOCTORP}`,
				meta: {
					title: '医师排班'
				},
				component: tempManage_doctorp
			},
			{
				name: 'subtemp',
				path: `${urls.BASE_TEMPMANAGE_SUBTEMP}`,
				meta: {
					title: '子模版管理'
				},
				component: tempManage_subtemp
			},
			{
				name: 'datatemp',
				path: `${urls.BASE_TEMPMANAGE_DATATEMP}`,
				meta: {
					title: '数据元管理'
				},
				component: tempManage_datatemp
			},
			{
				name: 'datagroup',
				path: `${urls.BASE_TEMPMANAGE_DATAGROUP}`,
				meta: {
					title: '数据组管理'
				},
				component: tempManage_datagroup
			},
			{
				name: 'unlock',
				path: `${urls.BASE_TEMPMANAGE_UNLOCK}`,
				meta: {
					title: '病历解锁'
				},
				component: tempManage_unlock
			},
			{
				name: 'headersetting',
				path: `${urls.BASE_TEMPMANAGE_HEADERSETTING}`,
				meta: {
					title: '页眉设置'
				},
				component: tempManage_headersetting
			}
		]
	},
	{
		name: 'systemManage',
		path: `${urls.BASE_SYSTEMMANAGE}`,
		meta: {
			title: '系统管理'
		},
		component: systemManage,
		children: [
			{
				name: 'medisineRecordLock',
				path: `${urls.BASE_SYSTEMMANAGE_MESISINERECORD_OPERATION}`,
				meta: {
					title: '病历封存/解封'
				},
				component: systemManage_medisinerecord
			},
			{
				name: 'menuManage',
				path: `${urls.BASE_SYSTEMMANAGE_MENU}`,
				meta: {
					title: '菜单管理'
				},
				component: systemManage_menu
			},
			{
				name: 'ICDCode',
				path: `${urls.BASE_SYSTEMMANAGE_ICDCODE}`,
				meta: {
					title: 'ICD编码维护'
				},
				component: systemManage_icdcode
			}
		]
	},
	{
		name: 'personMain',
		path: `${urls.BASE_PERSONMAIN}`,
		meta: {
			title: '人员维护'
		},
		component: personMain,
		children: [
			{
				name: 'power',
				path: `${urls.BASE_PERSONMAIN_POWER}`,
				meta: {
					title: '人员权限维护'
				},
				component: personMain_power
			},
			{
				name: 'title',
				path: `${urls.BASE_PERSONMAIN_TITLE}`,
				meta: {
					title: '人员职称维护'
				},
				component: personMain_title
			},
			{
				name: 'sign',
				path: `${urls.BASE_PERSONMAIN_SIGN}`,
				meta: {
					title: '人员签名维护'
				},
				component: personMain_sign
			},
			{
				name: 'run',
				path: `${urls.BASE_PERSONMAIN_RUN}`,
				meta: {
					title: '人员管理'
				},
				component: personMain_run
			},
			{
				name: 'tertiary',
				path: `${urls.BASE_PERSONMAIN_TERTIARY}`,
				meta: {
					title: '三级检诊维护(默认)'
				},
				component: personMain_tertiary
			}

		]
	},
	{
		name: 'configure',
		path: `${urls.BASE_CONFIGURE}`,
		meta: {
			title: '配置'
		},
		component: configure,
		children: [{
			name: 'baseConfigure',
			path: `${urls.BASE_BASECONFIGURE}`,
			meta: {
				title: '基本配置'
			},
			component: configure_baseConfigure
		}]
	}
]

export default routes

export const BASE_URL = '/'

export const LOGIN = `${BASE_URL}login` // 登录
export const REGISTER = `${BASE_URL}register` // 注册
export const EDIT_PWD = `${BASE_URL}editPwd` // 修改密码

// 主菜单
export const MAINMENU = `${BASE_URL}mainmenu`

// 基础数据维护
export const BASE = `${BASE_URL}base`

export const BASE_WELCOME = `${BASE}/welcome`

export const BASE_SYNCMANAGE = `${BASE}/sync` // 基础数据 - 同步管理
export const BASE_SYNCMANAGE_DATATPL = `${BASE_SYNCMANAGE}/datatpl` // 基础数据 - 同步管理 - 数据组和模板
export const BASE_SYNCMANAGE_CONTENT_SET = `${BASE_SYNCMANAGE}/contentset` // 基础数据 - 同步管理 - 同步内容设置
export const BASE_SYNCMANAGE_Infor_SYNC = `${BASE_SYNCMANAGE}/inforsync` // 基础数据 - 同步管理 - 用户同步信息

export const BASE_BACKENDMANAGE = `${BASE}/backend` // 基础数据 - 后台管理
export const BASE_BACKENDMANAGE_DATATPL = `${BASE_BACKENDMANAGE}/tpl` // 基础数据 - 后台管理 - 模板目录维护
export const BASE_BACKENDMANAGE_NURSELIST = `${BASE_BACKENDMANAGE}/nurselist` // 基础数据 - 后台管理 - 护士工作站
export const BASE_BACKENDMANAGE_CODETABLEBROWSE = `${BASE_BACKENDMANAGE}/codetablebrowse` // 基础数据 - 后台管理 - 码表浏览
export const BASE_BACKENDMANAGE_BEDMAINT = `${BASE_BACKENDMANAGE}/bedmaint` // 基础数据 - 后台管理 - 床位维护
export const BASE_BACKENDMANAGE_DOCTORDEPARTMENT = `${BASE_BACKENDMANAGE}/doctorDepartment` // 基础数据 - 后台管理 - 医生工作站与科室维护
export const BASE_BACKENDMANAGE_DEPARTMENTMAINT = `${BASE_BACKENDMANAGE}/departmentmaint` // 基础数据 - 后台管理 - 科室维护
export const BASE_BACKENDMANAGE_VECTORGRAPH = `${BASE_BACKENDMANAGE}/vectorGraph` // 基础数据 - 后台管理 - 矢量图维护
export const BASE_BACKENDMANAGE_TEMPERATURELIST = `${BASE_BACKENDMANAGE}/temperatureList` // 基础数据 - 后台管理 - 体温单配置

export const BASE_REPORT_FORM = `${BASE}/reportform` // 基础数据 - 报表
export const BASE_REPORT_PRINT_SET = `${BASE_REPORT_FORM}/printset` // 基础数据 - 报表 - 打印设置
export const BASE_REPORT_FORM_SEARCH = `${BASE_REPORT_FORM}/search` // 基础数据 - 报表查询
export const BASE_REPORT_FORM_LOADLOG = `${BASE_REPORT_FORM}/loadlog` // 基础数据 - 登录日志
export const BASE_REPORT_MEDICINE_LOG = `${BASE_REPORT_FORM}/medicinerecordslog` // 基础数据 - 病历操作日志
export const BASE_REPORT_PATIENT_INFO_EDIT_LOGO = `${BASE_REPORT_FORM}/patientinfoeditlog` // 基础数据 - 患者信息修改日志
export const BASE_REPORT_MEDICINE_RECORD_GLANCE = `${BASE_REPORT_FORM}/medicinerecordglance` // 基础数据 - 病历随机浏览

export const BASE_TEMPMANAGE = `${BASE}/tempmanage` // 基础数据 - 模板管理
export const BASE_TEMPMANAGE_MANAGE = `${BASE_TEMPMANAGE}/manage` // 基础数据 - 模板管理1
export const BASE_TEMPMANAGE_DOCTORP = `${BASE_TEMPMANAGE}/doctorp` // 基础数据 - 医师排班
export const BASE_TEMPMANAGE_SUBTEMP = `${BASE_TEMPMANAGE}/subtemp` // 基础数据 - 子模板管理
export const BASE_TEMPMANAGE_DATATEMP = `${BASE_TEMPMANAGE}/datatemp` // 基础数据 - 数据元管理
export const BASE_TEMPMANAGE_DATAGROUP = `${BASE_TEMPMANAGE}/datagroup` // 基础数据 - 数据组管理
export const BASE_TEMPMANAGE_UNLOCK = `${BASE_TEMPMANAGE}/unlock` // 基础数据 - 病历解锁
export const BASE_TEMPMANAGE_HEADERSETTING = `${BASE_TEMPMANAGE}/headersetting` // 基础数据 - 页眉设置

export const BASE_PERSONMAIN = `${BASE}/personmain` // 基础数据 - 人员维护
export const BASE_PERSONMAIN_POWER = `${BASE_PERSONMAIN}/power` // 人员维护 - 人员权限管理
export const BASE_PERSONMAIN_TITLE = `${BASE_PERSONMAIN}/title` // 人员维护 - 人员职称管理
export const BASE_PERSONMAIN_SIGN = `${BASE_PERSONMAIN}/sign` // 人员维护 - 人员签名管理
export const BASE_PERSONMAIN_RUN = `${BASE_PERSONMAIN}/run` // 人员维护 - 人员管理
export const BASE_PERSONMAIN_TERTIARY = `${BASE_PERSONMAIN}/tertiary` // 人员维护 - 三级检诊维护（默认)

// 系统管理
export const BASE_SYSTEMMANAGE = `${BASE}/systemmanage` // 基础数据 - 系统管理
export const BASE_SYSTEMMANAGE_MESISINERECORD_OPERATION = `${BASE_SYSTEMMANAGE}/medisinerecordoperation` // 基础数据 - 系统管理 - 病历封存/解封
export const BASE_SYSTEMMANAGE_MENU = `${BASE_SYSTEMMANAGE}/menu` // 基础数据 - 系统管理 - 菜单管理
export const BASE_SYSTEMMANAGE_ICDCODE = `${BASE_SYSTEMMANAGE}/icdcode` // 基础数据 - 系统管理 - ICD编码维护
// 配置
export const BASE_CONFIGURE = `${BASE}/configure` // 基础数据 - 配置
export const BASE_BASECONFIGURE = `${BASE_CONFIGURE}/baseConfigure`// 基本配置

// 住院医生工作站
export const RESIDENT = `${BASE_URL}resident`
export const RESIDENT_DOCTOR = `${RESIDENT}/doctor`
// export const RESIDENT_RESPIRATORY_MEDICINE = `${RESIDENT}/respiratory` // 呼吸内科
// export const RESIDENT_CHILD_MEDICINE = `${RESIDENT}/child` // 小儿内科

// 门诊医生工作站
export const OUTPATIENT = `${BASE_URL}outpatient`

// 住院护士工作站
export const NURSE = `${BASE_URL}nurse`
export const NURSE_EMERGENCY = `${NURSE}/emergency` // 急诊内科
export const NURSE_EMERGENCY_DETAIL = `${NURSE_EMERGENCY}/detail/:id` // 急诊内科病历详情
export const NURSE_ICU = `${NURSE}/icu` // ICU

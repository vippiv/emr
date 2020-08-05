const platform = 'api/'
const platform_doctor = 'docapi/'
const platform_nurse = 'nurseapi/'
const saas_mes = '/'
const dic = '/fs/'
// const lsBaseur = 'http://192.168.31.163/api/'

const api = {
    // 全局数据
    global: {
        getOdtFile: `${platform_doctor}FileUpload/DownFileInfoByStream`, // 获取odt文件
        uploadOdtFile: `${platform_doctor}FileUpload/UploadFileInfo`, // 上传odt文件
        baseType: `${platform_doctor}PaitentInfo/GetComType`, // 查询 医保/婚姻/职业/民族/病情/入院类别/患者来源/现住址/出生地/户口/籍贯数据
        nextCity: `${platform_doctor}PaitentInfo/GetAreaInfo`, // 联动，选择下一级市、区
        workStations: `${platform_doctor}WorkStation/GetRoleWorkStationList`, // 工作站
        workBenchs: `${platform_doctor}WorkStation/GetRoleWorkStationListInfo`, // 工作台
        userRole: `${platform_doctor}Login/GetUserRole`, // 获取用户角色权限,
        temperatureSheetData: `${platform_doctor}TemperatureList/GetTemperaturelListInfo`, // 体温单数据
    },
    // 登录
    login: {
        login: `${platform}Login/GetLogin`, // 登录
        loginDoctor: `${platform_doctor}Login/GetLogin`, // 登录
        loginNurse: `${platform_nurse}Login/GetLogin`, // 登录
        syncLoginSession: `${platform}Login/GetLoginSession`, // 同步登录session
        companyCode: `${saas_mes}saasMes/printCode/getCompanyCode` // 获取companyCode
    },
    syncManage: { // 同步管理
        // 数据组与模板
        dataGroupAndTpl: `${platform}DatasetAndTemplate/GetDatasetTemplateAll`, // 获取数据组和模板数据
        seleTemplateCatalogAPI: `${platform}DatasetAndTemplate/GetTemplateCatalog`, // 获取模板目录数据
        getDataGroupAll: `${platform}DatasetAndTemplate/GetDataGrouppid`, // 获取数据组数据
        datasetTemplateSave: `${platform}DatasetAndTemplate/DatasetTemplateSave`, // 保存数据
        delDatasetTemplate: `${platform}DatasetAndTemplate/DeleteDatasetTemplate`, // 删除数据
        // 同步内容设置
        getSyInformation: `${platform}SynchronismContent/GetSyInformation`, // 获取同步内容数据
        getNewTemplate: `${platform}SynchronismContent/GetNewTemplate`, // 获取新建模板数据
        getOriTemplate: `${platform}SynchronismContent/GetOriTemplate`, // 获取原始模板数据
        getAddTemplate: `${platform}SynchronismContent/GetAddTemplate`, // 获取新建数据组
        getOldTemplate: `${platform}SynchronismContent/GetOldTemplate`, // 获取原始数据组
        delSyInformation: `${platform}SynchronismContent/DelSyInformation`, // 删除同步内容数据
        syInformationSave: `${platform}SynchronismContent/SaveSyInformationInfo`, // 保存同步内容数据
        // 用户同步信息
        getSyUserPnode: `${platform}UserSynchronization/GetSyUserPnode`, // 获取医生站台和站台内医生
        getWorkBenchSync: `${platform}UserSynchronization/GetWorkBenchSync`, // 根据工作台编码获取工作台同步信息
        getSysTuserSyncByUserId: `${platform}UserSynchronization/GetSysTuserSyncByUserId`, // 根据用户ID获取用户同步信息
        insertWorkBenchSync: `${platform}UserSynchronization/InsertWorkBenchSync`, // 工作台新增同步信息
        insertSysTuserSync: `${platform}UserSynchronization/InsertSysTuserSync` // 用户新增同步信息

    },
    /** ***************************后台管理****************************************************/
    backendManage: {
        // 模板目录维护
        getCatalogOrTree: `${platform}TemplatesDirectory/GetCatalogOrTree`, // 获取左边节点
        GetCatalogParentLevel: `${platform}TemplatesDirectory/GetCatalogParentLevel`, // 病历模板目录父级下拉
        GetTreeParentLevel: `${platform}TemplatesDirectory/GetTreeParentLevel`, // 病历模板树父级下拉
        catalogSave: `${platform}TemplatesDirectory/CatalogSave`, // 病历模板目录修改保存
        treeSave: `${platform}TemplatesDirectory/TreeSave`, // 病历模板树修改保存
        catalogDele: `${platform}TemplatesDirectory/CatalogDele`, // 病历模板目录删除
        treeDele: `${platform}TemplatesDirectory/TreeDele`, // 病历模板树删除
        // 护士工作站与护士记录单维护
        getNurseSheetInfo: `${platform}NurseSheet/GetNurseSheetInfo`, // 加载获取护士工作站与护理单
        getcmbFathers: `${platform}NurseSheet/GetcmbFathers`, // 获取工作台
        deleteNurseSheet: `${platform}NurseSheet/DeleteNurseSheet`, // 删除护理单
        saveNurseSheet: `${platform}NurseSheet/SaveNurseSheet`, // 保存或修改
        // 码表浏览
        getTBaseCodeList: `${platform}TBaseCode/GetTBaseCodeList`, // 获取码表列表
        getTBaseCodeInfo: `${platform}TBaseCode/GetTBaseCodeInfo`, // 获取码表详情
        // 床位维护
        getDepartmentAndBedAll: `${platform}BedMaintain/GetDepartmentAndBedAll`, // 获取所有部门、床位
        getBedInfoByID: `${platform}BedMaintain/GetBedInfoByID`, // 获取单个床位信息
        GetBedDepartmentAll: `${platform}BedMaintain/GetBedDepartmentAll`, // 获取所有科室
        GetBedType: `${platform}BedMaintain/GetBedType`, // 获取所有病床类别
        GetBedClass: `${platform}BedMaintain/GetBedClass`, // 获取所有病床种类
        GetBedSex: `${platform}BedMaintain/GetBedSex`, // 获取性别
        GetBedGrade: `${platform}BedMaintain/GetBedGrade`, // 获取收费级别
        GetBedState: `${platform}BedMaintain/GetBedState`, // 获取收费级别
        DepartmentAndBedSave: `${platform}BedMaintain/DepartmentAndBedSave`, // 保存
        // 医生工作站与科室维护
        getWADWorkstationAll: `${platform}WorkstationAndDepartment/GetWADWorkstationAll`, // 获取所有工作站和工作室以及下级
        GetWadDepartmentAll: `${platform}WorkstationAndDepartment/GetWadDepartmentAll`, // 获取所有工作站
        GetWadDepartment: `${platform}WorkstationAndDepartment/GetWadDepartment`, // 获取科室
        WadWorkSave: `${platform}WorkstationAndDepartment/WadWorkSave`, // 医生工作站保存
        WadDepaSave: `${platform}WorkstationAndDepartment/WadDepaSave`, // 科室保存
        // 科室维护
        GetDepartmentalCategories: `${platform}DepartmentMaintain/GetDepartmentalCategories`, // 获取部门类别下拉
        GetDepartmentalAttributes: `${platform}DepartmentMaintain/GetDepartmentalAttributes`, // 获取部门属性下拉
        GetDepartmentAll: `${platform}DepartmentMaintain/GetDepartmentAll`, // 获取所有科室信息
        DeleDepartmentByDeptid: `${platform}DepartmentMaintain/DeleDepartmentByDeptid`, // 删除科室信息
        DepartmentSave: `${platform}DepartmentMaintain/DepartmentSave`, // 保存科室信息
        // 矢量图维护
        getFileList: `${platform}Vetorgram/GetFileList`, // 加载FTP图片
        getFileInfo: `${platform}Vetorgram/GetFileInfo`, // 获取单个图片
        deleteFileInfo: `${platform}Vetorgram/DeleteFileInfo`, // 删除单个图片
        uploadFileInfo: `${platform}Vetorgram/UploadImgInfo`, // 上传
        // 体温单配置
        getThermometerList: `${platform}Thermometer/GetThermometerList`, // 获取体温单排序
        getThermometerEntryInfo: `${platform}Thermometer/GetThermometerEntryInfo`, // 获取录入排序
        titemsInfoDelete: `${platform}Thermometer/TitemsInfoDelete`, // 删除
        getStyles: `${platform}Thermometer/GetStyles`, // 获取类型
        titemsInfoAdd: `${platform}Thermometer/TitemsInfoAdd`, // 新增保存
        saveThermometer: `${platform}Thermometer/SaveThermometer`, // 保存
        getTTitemsInfo: `${platform}Thermometer/GetTTitemsInfo`, // 双击录入弹框加载数据
        saveTTitemsInfo: `${platform}Thermometer/SaveTTitemsInfo`, // 保存双击录入弹框数据
    },
    /** ***************************模板管理****************************************************/
    tempManage: {
        // 模板管理word编辑
        templateDoubleClick: `${platform_doctor}OpenTemplateStyle/TemplateDoubleClick`, // 双击(编辑模板)打开模板
        saveTempLate: `${platform_doctor}OpenTemplateStyle/SaveTempLate`, // 保存模板
        uploadFileStream: `${platform_doctor}FileUpload/UploadFileInfoByString`, // 以字符串方式上传DOC文档

        // 基础模板管理
        getDeleteSys: `${platform}TemplateManager/GetDeleteSys`, // 删除 模板权限获取
        getSysWork: `${platform}TemplateManager/GetSysWork`, // 修改 复制 移动 模板权限获取
        getSessionResult: `${platform}TemplateManager/GetSessionResult`, // 新增模板权限获取
        getFaInfoListBySelect: `${platform}TemplateManager/GetInfoListBySelect`, // 模板查询
        getDataManageList: `${platform}TemplateManager/GetTreeInfoListByID`, // 获取基本模板管理页面列表
        getDataManageFather: `${platform}TemplateManager/GetFather`, // 获取基本模板管理页面左边树结构获取父节点
        getDataManageItemIndexBymrAttr: `${platform}TemplateManager/GetItemIndexBymrAttr`, // 获取基本模板管理页面左边树结构获取子节点
        raNk: `${platform}TemplateManager/Rank`, // 模板管理排序按钮
        btnRankSave: `${platform}TemplateManager/btnRankSave`, // 模板管理排序保存按钮
        getDept: `${platform}TemplateManager/GetDept`, // 获取科室
        insertItemIndexList: `${platform}TemplateManager/InsertItemIndexList`, // 左边树子节点的添加
        updateItemIndexList: `${platform}TemplateManager/UpdateItemIndexList`, // 左边树子节点的修改
        deleteItemIndexByCode: `${platform}TemplateManager/DeleteItemIndexByCode`, // 左边树节点的删除
        btnDeleteTemplate: `${platform}TemplateManager/BtnDeleteTemplate`, // 删除模板按钮
        checkBtn: `${platform}TemplateManager/CheckBtn`, // 审核模板按钮
        cancelCheckBtn: `${platform}TemplateManager/CancelCheckBtn`, // 点击取消审核模板按钮
        insertTemplateSave: `${platform}TemplateManager/InsertTemplateSave`, // 新增模板里面的保存按钮与修改模板里面的保存按钮
        getItemIndexByMrCode: `${platform}TemplateManager/GetItemIndexByMrCode`, // 修改模板信息获取
        getAreaFlagAndListNameByMrCode1: `${platform}TemplateManager/GetAreaFlagAndListNameByMrCode1`, // 查看是否获取区域
        getBusiness: `${platform}TemplateManager/GetBusiness`, // 获取业务域
        tempMoveOrCopyBtn: `${platform}TemplateManager/TempMoveOrCopyBtn`, // 移动模板和复制模板

        // 子模版管理
        subGetDeleteSys: `${platform}TemplateManager/GetDeleteSys`, // 删除 子模板权限获取
        subGetSysWork: `${platform}TemplateManager/GetSysWork`, // 修改 复制 移动 模板权限获取
        subGetSessionResult: `${platform}TemplateManager/GetSessionResult`, // 新增模板权限获取
        subTempMoveOrCopyBtn: `${platform}TemplateManager/TempMoveOrCopyBtn`, // 复制模板
        subInsertItemIndexList: `${platform}TemplateManager/InsertItemIndexList`, // 左边树子节点的添加
        subUpdateItemIndexList: `${platform}TemplateManager/UpdateItemIndexList`, // 左边树子节点的修改
        subDeleteItemIndexByCode: `${platform}TemplateManager/DeleteItemIndexByCode`, // 左边树节点的删除
        subCheckBtn: `${platform}TemplateManager/CheckBtn`, // 审核模板按钮
        subCancelCheckBtn: `${platform}TemplateManager/CancelCheckBtn`, // 点击取消审核模板按钮
        getSubMould: `${platform}SubTemplate/GetMould`, // 获取子模版管理左边树结构父节点
        getSubItemIndexBymrAttr: `${platform}SubTemplate/GetItemIndexBymrAttr`, // 获取子模版管理左边树结构子节点
        getListByID: `${platform}SubTemplate/GetListByID`, // 获取子模版管理右边列表
        rank: `${platform}SubTemplate/Rank`, // 子模板管理排序按钮
        btnRankSave: `${platform}TemplateManager/btnRankSave`, // 子模板管理排序保存按钮
        getInfoListBySelect: `${platform}SubTemplate/GetInfoListBySelect`, // 模板查询
        personTemplateDele: `${platform}SubTemplate/PersonTemplateDele`, // 删除模板
        subGetDept: `${platform}TemplateManager/GetDept`, // 获取科室
        getTdepartment: `${platform}SubTemplate/GetTdepartment`, // 获取业务域
        subInsertTemplateSave: `${platform}TemplateManager/InsertTemplateSave`, // 新增模板里面的保存按钮与修改模板里面的保存按钮
        subGetItemIndexByMrCode: `${platform}TemplateManager/GetItemIndexByMrCode`, // 修改模板信息获取

        // 数据元管理
        GetDataTemp: `${platform}DataElement/Select`, // 获取数据元页面
        getFileList: `${platform}FileUnLock/GetFileList`, // 获取文r件解锁列表
        getDATECELL_M: `${platform}DataElement/GetDATECELL_M`, // 根据编号获取指定的病历元素信息
        getMastriumdict: `${platform}SubTemplate/GetMastriumdict`, // 数据元可选值获取
        delete: `${platform}DataElement/Delete`, // 删除
        save: `${platform}DataElement/Save`, //保存
        // 数据组管理
        getDataGroup: `${platform}DatagroupManager/GetDataGrouppid`, // 获取数据组页面
        getPnodemaxid: `${platform}DatagroupManager/GetPnodemaxid`, // 获取子节点id最大值
        datagroupSave: `${platform}DatagroupManager/SaveDataGroup`, // 新建分类保存
        getCnodemaxid: `${platform}DatagroupManager/GetCnodemaxid`, // 获取子节点id最大值
        deleDataGroup: `${platform}DatagroupManager/DeleDataGroup` // 删除
    },
    /** ***************************人员维护****************************************************/
    personMain: {
        GetPower: `${platform}UserRole/GetUsersByGroupFather`, // 获取组管理树父结构
        GetUsersByGroupHouseMan: `${platform}UserRole/GetUsersByGroupHouseMan`, // 获取组管理树子结构
        GetRole: `${platform}UserRole/GetUserRole`, // 获取组权限树结构
        GetUserWork: `${platform}UserRole/GetUserWorkPlatform`, // 获取组工作台树结构
        GetSpecial: `${platform}UserRole/GetUserSpecialFunction`, // 获取组特殊职能树结构
        getUserRoleByCode: `${platform}UserRole/GetUserRoleByCode`, // 根据人员获取权限
        getWorkBenchByCode: `${platform}UserRole/GetWorkBenchByCode`, // 根据人员获取工作台
        getSpecialByCode: `${platform}UserRole/GetSpecialByCode`, // 根据人员获取特殊职能
        updateUserRoles: `${platform}UserRole/SaveRole`, // 新增/更新人员权限
        updateWorkBench: `${platform}UserRole/SaveWorkBench`, // 新增/更新工作台
        updateSpecial: `${platform}UserRole/SaveUpdateSpecial`, // 新增/更新特殊职能
        getUserList: `${platform}UserSign/GetUserList`, // 获取人员签名维护左边列表
        // 人员管理
        getAllUserInfo: `${platform}UserInfoManage/GetAllUserInfo`, // 获取人员管理左边列表
        getDeptInfo: `${platform}UserInfoManage/GetDeptInfo`, // 获取科室
        getTitleInfo: `${platform}UserInfoManage/GetTitleInfo`, // 获取绑定职称
        getUserInfo: `${platform}UserInfoManage/GetUserInfo`, // 获取单个人员信息
        getckpasswvalidRole: `${platform}UserInfoManage/GetckpasswvalidRole`, // 判断是否有密码不过期权限
        getcklockRole: `${platform}UserInfoManage/GetcklockRole`, // 判断是否有锁定权限
        savePassvalid: `${platform}UserInfoManage/SavePassvalid`, // 密码是否过期操作
        saveUserInfo: `${platform}UserInfoManage/SaveUserInfo`, // 保存信息

        // 三级检诊
        getSingleInfo: `${platform}Level3/GetSingleInfo`, // 获取单组三级医师
        saveLevelInfo: `${platform}Level3/SaveLevelInfo`, // 新增或更新三级检诊保存
        addHospitalizationLoad: `${platform}Level3/AddHospitalizationLoad`, // 获取所有住院医师
        addAttendingLoad: `${platform}Level3/AddAttendingLoad`, // 获取所有主治医师列表
        addDirectorLoad: `${platform}Level3/AddDirectorLoad`, // 获取所有主任医师列表
        deleteLevelInfo: `${platform}Level3/DeleteLevelInfo`, // 删除
        getLevelInfo: `${platform}Level3/GetLevelInfo`, // 获取三级检诊维护列表

        // 人员职称
        getUserDept: `${platform}UserTitle/GetUserDept`, // 获取人员职称左边科室列表
        getTitle: `${platform}UserTitle/GetTitle`, // 获取人员职称右边职称列表
        getSys: `${platform}UserTitle/GetSYS_SYS_TITLEByStaffId`, // 根据UseriD获取职称
        saveUserTitle: `${platform}UserTitle/SaveUserTitle`, // 保存用户职称
    },
    /** ***************************配置****************************************************/
    configure: {
        getBasicConfiguration: `${platform}BasicConfiguration/GetBasicConfiguration`, // 获取基本配置
        saveBasicConfiguration: `${platform}BasicConfiguration/SaveBasicConfiguration`, // 保存
    },
    /** ***************************系统管理****************************************************/
    systemManage: {
        getPatients: `${platform}FileSeal/GetPatientList`, // 查询患者
        getMedisineRecord: `${platform}FileSeal/GetFileInfo`, // 查询患者病历信息
        getDepartments: `${platform}FileSeal/GetDeptList`, // 查询科室
        medisineRecordSeal: `${platform}FileSeal/SaveSealFile`, // 封存/解封
        getMenuList: `${platform}MenuManage/GetMenuList`, // 获取菜单
        getWorkStation: `${platform}MenuManage/GetWorkStation`, // 获取工作站
        saveNewMenu: `${platform}MenuManage/SaveMenuInfo`, // 保存新增菜单
        getMenuInfo: `${platform}MenuManage/GetMenuInfo`, // 获取单个菜单
        delMenu: `${platform}MenuManage/DeleteMenu`, // 删除菜单
        getIcdCode: `${platform}ICDCodeManage/GetComboxList`, // 获取ICD编码类型
        getIcdCodeList: `${platform}ICDCodeManage/GetCodeList`, // 获取ICD编码列表
        getIcdCodeInfo: `${platform}ICDCodeManage/GetCodeInfo`, // 获取ICD编码信息
        saveICDCode: `${platform}ICDCodeManage/SaveMenuInfo`, // 新增/编辑ICD编码
        delICDCode: `${platform}ICDCodeManage/DeleteICDByName` // 删除ICD编码
    },
    /** ***************************配置****************************************************/
    configure: {
        getBasicConfiguration: `${platform}BasicConfiguration/GetBasicConfiguration`, // 获取基本配置
        saveBasicConfiguration: `${platform}BasicConfiguration/SaveBasicConfiguration`, // 保存
    },
    /** ***************************系统管理****************************************************/
    systemManage: {
        getPatients: `${platform}FileSeal/GetPatientList`, // 查询患者
        getMedisineRecord: `${platform}FileSeal/GetFileInfo`, // 查询患者病历信息
        getDepartments: `${platform}FileSeal/GetDeptList`, // 查询科室
        medisineRecordSeal: `${platform}FileSeal/SaveSealFile`, // 封存/解封
        getMenuList: `${platform}MenuManage/GetMenuList`, // 获取菜单
        getWorkStation: `${platform}MenuManage/GetWorkStation`, // 获取工作站
        saveNewMenu: `${platform}MenuManage/SaveMenuInfo`, // 保存新增菜单
        getMenuInfo: `${platform}MenuManage/GetMenuInfo`, // 获取单个菜单
        delMenu: `${platform}MenuManage/DeleteMenu`, // 删除菜单
        getIcdCode: `${platform}ICDCodeManage/GetComboxList`, // 获取ICD编码类型
        getIcdCodeList: `${platform}ICDCodeManage/GetCodeList`, // 获取ICD编码列表
        getIcdCodeInfo: `${platform}ICDCodeManage/GetCodeInfo`, // 获取ICD编码信息
        saveICDCode: `${platform}ICDCodeManage/SaveMenuInfo`, // 新增/编辑ICD编码
        delICDCode: `${platform}ICDCodeManage/DeleteICDByName` // 删除ICD编码
    },
    /** ***************************住院医生工作站************************************************/
    residentDoctor: {
        getVisit: `${platform_doctor}PaitentInfoList/GetVisit`, // 获取患者信息
        getPatientDocTpl: `${platform_doctor}PaitentInfoList/GetMouseDoubleClick`, // 查询患者信息加载模板地址
        paitentInfoList: `${platform_doctor}PaitentInfoList/GetPaitentInfoList`, // 查询所有患者
        doctorOperation: `${platform_doctor}DoctorOperation/GetUsersByGroup`, // 患者病历树
        patientInfo: `${platform_doctor}PaitentInfo/GetPaitentInfo`, // 患者信息
        savePatientInfo: `${platform_doctor}PaitentInfo/SavePaitentInfo`, // 保存患者信息
        getDoctor: `${platform_doctor}PaitentInfo/GetDoctor`, // 收录医师
        emergencyDoctor: `${platform_doctor}PaitentInfo/GetEDoctor`, // 急诊医师
        getDepartments: `${platform_doctor}TransferFile/GetDeptInfo`, // 获取科室
        saveDepartmentsTransfer: `${platform_doctor}TransferFile/SaveTransferFil`, // 保存科室转移
        defaultDoctorSet: `${platform_doctor}SJJZOperation/GetDefualtDoc`, // 三级检诊 - 默认上级医生登记设定
        saveThreeLeveCheck: `${platform_doctor}SJJZOperation/SaveDefualtDoc`, // 保存三级检诊
        getICDCodes: `${platform_doctor}PaitentInfo/GetICDCode`, // 西医病情列表
        getSubModule: `${platform_doctor}ChildTemplates/GetMould`, // 子模板检索 获取子模板
        getChildModule: `${platform_doctor}ChildTemplates/GetItemIndexBymrAttr`, // 子模板检索 查询父级模板对应的子级
        getModule: `${platform_doctor}Templates/GetMould`, // 模板检索 获取模板
        getModuleSub: `${platform_doctor}Templates/GetItemIndexBymrAttr`, // 模板检索 查询父级模板对应的子级        
        checkCreate: `${platform_doctor}Templates/GetAddArea`, // 右键 - 检查能否执行新建
        checkInsert: `${platform_doctor}Templates/GetInsert`, // 右键 - 检查能否执行插入
        newDoc: `${platform_doctor}Templates/GetAddArea`, // 右键 - 新建
        createDocCheckFileExist: `${platform_doctor}Templates/Addnew`, // 右键 - 新建病程检查文档是否存在
        createDoc: `${platform_doctor}Templates/Addnew2`, // 右键 - 新建病程
        insertSign: `${platform_doctor}FileWrite/GetInsertName`, // 插入签名
        insertLeaderSign: `${platform_doctor}FileWrite/GetInsertLeaderName`, // 插入上级医师签名
        vectorGraphList: `${platform_doctor}PhotoManager/GetImageTree`, // 插入矢量图 - 加载矢量图列表
        vectorGraph: `${platform_doctor}PhotoManager/GetImageInfo`, // 插入矢量图 - 加载单个矢量图
        getPersonalModules: `${platform_doctor}FileWrite/GetSelfTemplateList`, // 存入个人模板 - 获取个人模板列表
        getImageTree: `${platform_doctor}PhotoManager/GetImageTree`, // 获取图片树
        getAllICD: `${platform_doctor}ICDSafeguard/GetAllICD`, // ICD维护左边页面加载
        getRightTab: `${platform_doctor}ICDSafeguard/GetRightTab`, // ICD维护右边页面加载
        saveBtn: `${platform_doctor}ICDSafeguard/SaveBtn`, // ICD维护保存
        getICDByOperation: `${platform_doctor}OperationSafeguard/GetICDByOperation`, // 手术编码维护左边页面加载
        getSecondRightTab: `${platform_doctor}OperationSafeguard/GetRightTab`, // 手术编码维护右边页面加载
        saveSecondBtn: `${platform_doctor}OperationSafeguard/SaveBtn`, // 手术编码维护保存
        getDrug: `${platform_doctor}Drugdatabase/GetDrug`, // 药品资料库左边树结构初始加载
        getDrugByID: `${platform_doctor}Drugdatabase/GetDrugByID`, // 药品资料库点击获取此药类信息
        getDrugByNameOrContent: `${platform_doctor}Drugdatabase/GetDrugByNameOrContent`, // 药品资料库查询按钮
        selectICDType: `${platform_doctor}ICDInternationalCode/SelectICDType`, // 国际编码左边树结构初始加载
        selectICD_D: `${platform_doctor}ICDInternationalCode/SelectICD_D`, // 国际编码右边数据加载
        selectByICD10: `${platform_doctor}ICDInternationalCode/SelectByICD10`, // 国际编码模糊查询
        doctorGetTreeList: `${platform_doctor}DoctorTemplates/GetMould`, // 住院医生工作站模板管理左边树结构获取
        getItemIndexBymrAttr: `${platform_doctor}DoctorTemplates/GetItemIndexBymrAttr`, // 住院医生工作站模板管理左边树结构子节点获取
        getTreeInfoListByID: `${platform_doctor}DoctorTemplates/GetTreeInfoListByID`, // 住院医生工作站模板管理右边列表获取
        doctorGetSessionResult: `${platform_doctor}DoctorTemplates/GetSessionResult`, // 住院医生工作站模板管理新增模板权限获取
        doctorGetSysWork: `${platform_doctor}DoctorTemplates/GetSysWork`, // 住院医生工作站模板管理修改 复制 移动 模板权限获取
        doctorGetDeleteSys: `${platform_doctor}DoctorTemplates/GetDeleteSys`, // 住院医生工作站模板管理删除权限
        saveToPersonalModules: `${platform_doctor}FileWrite/SaveSelfTemplate`, // 存入个人模板
        getChildTemplateInfo: `${platform_doctor}ChildTemplates/GetChildTemplateFileInfo`, // 获取子模板
        doctorRank: `${platform_doctor}DoctorTemplates/Rank`, // 住院医生工作站模板管理排序
        btnDoctorRankSave: `${platform_doctor}DoctorTemplates/btnRankSave`, // 住院医生工作站模板管理排序保存
        getDoctorItemIndexByMrCode: `${platform_doctor}DoctorTemplates/GetItemIndexByMrCode`, // 住院医生工作站模板管理修改模板信息获取
        getDoctorBusiness: `${platform_doctor}DoctorTemplates/GetBusiness`, // 住院医生工作站模板管理业务域获取
        getDoctorDept: `${platform_doctor}DoctorTemplates/GetDept`, // 住院医生工作站模板管理科室获取
        doctorInsertTemplateSave: `${platform_doctor}DoctorTemplates/InsertTemplateSave`, // 住院医生工作站模板管理修改保存
        doctorBtnDeleteTemplate: `${platform_doctor}DoctorTemplates/BtnDeleteTemplate`, // 住院医生工作站模板管理删除按钮
        doctorCheckBtn: `${platform_doctor}DoctorTemplates/CheckBtn`, // 住院医生工作站模板管理审核按钮
        doctorCancelCheckBtn: `${platform_doctor}DoctorTemplates/CancelCheckBtn`, // 住院医生工作站模板管理取消审核按钮
        doctorTempMoveOrCopyBtn: `${platform_doctor}DoctorTemplates/TempMoveOrCopyBtn`, // 住院医生工作站模板管理移动和复制模板
        doctorGetInfoListBySelect: `${platform_doctor}DoctorTemplates/GetInfoListBySelect`, // 住院医生工作站模板管理模板查询按钮
        doctorInsertItemIndexList: `${platform_doctor}DoctorTemplates/InsertItemIndexList`, // 住院医生工作站模板管理模板左边树子节点的添加
        doctorUpdateItemIndexList: `${platform_doctor}DoctorTemplates/UpdateItemIndexList`, // 住院医生工作站模板管理模板左边树子节点的修改
        doctorDeleteItemIndexByCode: `${platform_doctor}DoctorTemplates/DeleteItemIndexByCode`, // 住院医生工作站模板管理模板左边树子节点的删除
        doctorChildGetTreeList: `${platform_doctor}DoctorChildTemplates/GetMould`, // 住院医生工作站模板子管理左边树结构获取
        doctorChildGetDeleteSys: `${platform_doctor}DoctorTemplates/GetDeleteSys`, // 住院医生工作站子模板管理删除权限
        doctorChildGetSessionResult: `${platform_doctor}DoctorTemplates/GetSessionResult`, // 住院医生工作站子模板管理新增模板权限获取
        doctorChildGetSysWork: `${platform_doctor}DoctorTemplates/GetSysWork`, // 住院医生工作站子模板管理修改 复制 移动 模板权限获取
        getChildItemIndexBymrAttr: `${platform_doctor}DoctorChildTemplates/GetItemIndexBymrAttr`, // 住院医生工作站子模板管理左边树结构子节点获取
        getChildListByID: `${platform_doctor}DoctorChildTemplates/GetListByID`, // 住院医生工作站子模板管理加载列表
        doctorChildDeleteItemIndexByCode: `${platform_doctor}DoctorChildTemplates/DeleteItemIndexByCode`, // 住院医生工作站子模板管理模板左边树子节点的删除
        doctorChildRank: `${platform_doctor}DoctorChildTemplates/Rank`, // 住院医生工作站子模板管理排序
        btnDoctorChildRankSave: `${platform_doctor}DoctorChildTemplates/btnRankSave`, // 住院医生工作站子模板管理排序保存
        getChildTemplateInfo: `${platform_doctor}ChildTemplates/GetChildTemplateFileInfo`, // 获取子模板
        // 会诊管理
        loadOninvitation: `${platform_doctor}ConsultationOfDoctors/LoadOninvitation`, // 获取应邀会诊信息
        loadApplyfor: `${platform_doctor}ConsultationOfDoctors/LoadApplyfor`, // 获取本科申请会诊信息
        locationBtn: `${platform_doctor}ConsultationOfDoctors/LocationBtn`, // 定位查找
        ccceptBtn: `${platform_doctor}ConsultationOfDoctors/AcceptBtn`, // 接受会诊
        commitBtn: `${platform_doctor}ConsultationOfDoctors/CommitBtn`, // 完成会诊
        finishBtn: `${platform_doctor}ConsultationOfDoctors/FinishBtn`, // 获取结束会诊提示
        postok: `${platform_doctor}ConsultationOfDoctors/Ok`, // 确认是否结束会诊按钮
        getUsersByGroup: `${platform_doctor}ConsultationOfDoctors/GetUsersByGroup`, // 获取病历列表信息
        // 病案管理
        loadServe: `${platform_doctor}CaseHistoryBorrow/Load`, // 获取病历借阅服务信息
        retrievalBtn: `${platform_doctor}CaseHistoryBorrow/RetrievalBtn`, // 已归档病案查询中检索按钮服务
        borrow: `${platform_doctor}CaseHistoryBorrow/Borrow`, // 已归档病案查询中借阅窗体中借阅按钮服务
        selectHistoryBtn: `${platform_doctor}CaseHistoryBorrow/SelectHistoryBtn`, // 借阅历史记录查询按钮
        returnBtn: `${platform_doctor}CaseHistoryBorrow/ReturnBtn`, // 借阅历史记录查询按钮
        jyetUsersByGroup: `${platform_doctor}CaseHistoryBorrow/GetUsersByGroup`, // 病历列表-双击右边树
        sELECTDept: `${platform_doctor}CaseHistoryRecall/SELECTDept`, // 科室查询
        selectVISIT1: `${platform_doctor}CaseHistoryRecall/SelectVISIT1`, // 已归档病历查询
        saveAllapplyFor: `${platform_doctor}CaseHistoryRecall/SaveAllapplyFor`, // 全部申请服务按钮
        applyFor: `${platform_doctor}CaseHistoryRecall/applyFor`, // 某个条数据申请服务按钮
        bindDataGridCheck: `${platform_doctor}CaseHistoryRecall/BindDataGridCheck`, // 获取已审批数据
        spLoad: `${platform_doctor}CasehistoryApproval/Load`, // 获取借阅审批数据
        cannotBtn: `${platform_doctor}CasehistoryApproval/CannotBtn`, // 拒绝按钮服务
        approvalBtn: `${platform_doctor}CasehistoryApproval/ApprovalBtn`, // 审批按钮服务
        getChildTemplateInfo: `${platform_doctor}ChildTemplates/GetChildTemplateFileInfo`, // 获取子模板
        clinicalDataAnalyzeOne: `${platform_doctor}FileWrite/GetClinicalDataByJianyan`, // 临床数据 - 检验结果第一步
        clinicalDataAnalyzeTwo: `${platform_doctor}FileWrite/GetClinicalDataByJianyanInfo`, // 临床数据 - 检验结果第二步
        clinicalDataCheckOne: `${platform_doctor}FileWrite/GetClinicalDataByJiancha`, // 临床数据 - 检查结果第一步
        clinicalDataCheckTwo: `${platform_doctor}FileWrite/GetClinicalDataByJianchaInfo`, // 临床数据 - 检查结果第二步
        clinicalDataDoctorAdvice: `${platform_doctor}FileWrite/GetClinicalDataByYizhuInfo`, // 临床数据 - 医嘱提取
        clinicalDataMedisineRecord: `${platform_doctor}FileWrite/GetClinicalDataByBinLiZhenDuanInfo`, // 临床数据 - 病历诊断
        clinicalDataLives: `${platform_doctor}FileWrite/GetClinicalDataByShengMingTizhenInfo`, // 临床数据 - 生命体征
        medisineRecordSync: `${platform_doctor}SaveFile/GetSynchronization`, // 同步
        diagnosisICDs: `${platform_doctor}Diagnosis/GetICDInfo`, // 诊断
        diagnosisEnableType: `${platform_doctor}Diagnosis/GetRadioCheck`, // 诊断 - 判断诊断类型是否可用
        diagnosisInfo: `${platform_doctor}Diagnosis/GetDiagnosisInfo`, // 诊断 - 获取诊断数据
        diagnosisSaveCheck: `${platform_doctor}Diagnosis/CheckSave`, // 诊断 - 诊断保存验证
        diagnosisOperation: `${platform_doctor}Operation/GetOperationICD`, // 手术
        // 模板管理word编辑
        getAllBySys: `${platform_doctor}OpenTemplateStyle/GetAllBySys`, // 获取系统预定义数据元
        getDataElementFatherNode: `${platform_doctor}OpenTemplateStyle/Get_MASURIUM_DICT_1`, // 用户自定义数据元父节点信息
        getDataElementSonNode: `${platform_doctor}OpenTemplateStyle/Get_MASURIUM_DICT_2`, // 用户自定义数据元子节点信息
        getMySelfFatherTemplate: `${platform_doctor}OpenTemplateStyle/GetMySelfTemplate`, // 获取个人模板父节点
        getSubTemplate: `${platform_doctor}OpenTemplateStyle/GetSubTemplate`, // 获取个人模板子节点
        getUserDataGroup: `${platform_doctor}OpenTemplateStyle/Get_EMR_DATAGROUP`, // 获取用户数据组
        getDataEleSonData: `${platform_doctor}OpenTemplateStyle/Get_EMR_DATAGROUP`, // 单击自定义数据元获取元素
        templateDoubleClick: `${platform_doctor}OpenTemplateStyle/TemplateDoubleClick`, // 双击(编辑模板)打开模板
        savePersonTemplate: `${platform_doctor}OpenTemplateStyle/SaveSelfTemplate`, // 存入个人模板
        getAllBymlngID: `${platform_doctor}OpenTemplateStyle/GetAllBymlngID`, // 获取元素选择的值
        saveTempLate: `${platform_doctor}OpenTemplateStyle/SaveTempLate`, // 保存模板
        medisineRecordLock: `${platform_doctor}DoctorOperation/Lock`, // 锁住病历模板
        medisineRecordUnLock: `${platform_doctor}DoctorOperation/UnLock`, // 解锁病历模板
        uploadFileStream: `${platform_doctor}FileUpload/UploadFileInfoByString`, // 以字符串方式上传DOC文档
        getIsLock: `${platform_doctor}OpenTemplateStyle/IsLock`, // 获取是否可以操作
        setLockDoc: `${platform_doctor}OpenTemplateStyle/Lock`, // 锁定(打开文档用)
        setUnlockDoc: `${platform_doctor}OpenTemplateStyle/Unlock`, // 解锁(关闭文档用)


    },
    /** ***************************住院护士工作站************************************************/
    residentNurse: {
        getSYSTVISIT1ByIpDept: `${platform_nurse}HospitalNurse/GetSYS_T_VISIT_1ByIpDept`, // 查询本科在院患者信息
        nursegetUsersByGroup: `${platform_nurse}HospitalNurse/GetUsersByGroup`, // 病历列表-双击病人右边树
        getSYS_T_VISIT_1ByVisitId: `${platform_nurse}HospitalNurse/GetSYS_T_VISIT_1ByVisitId`, // 根据病人Id查询住院就诊记录病人信息
        getSYS_T_VISIT_1ByIpDeptCountLevel: `${platform_nurse}HospitalNurse/GetSYS_T_VISIT_1ByIpDeptCountLevel`, // 查询本科室在院患者护理总数
        getSYS_T_VISIT_1ByZKCountLevel: `${platform_nurse}HospitalNurse/GetSYS_T_VISIT_1ByZKCountLevel`, // 查询转科未提交患者护理总数
        getSYS_T_VISIT_1ByCYCountLevel: `${platform_nurse}HospitalNurse/GetSYS_T_VISIT_1ByCYCountLevel`, // 查询出院未提交患者护理总数
        treeVisitFatherInfo: `${platform_nurse}HospitalNurse/TreeVisitFatherInfo`, // 获取病人列表父节点
        treeVisitInfo: `${platform_nurse}HospitalNurse/TreeVisitInfo`, // 获取病人列表子节点
        getSYS_TByZKCountLevel: `${platform_nurse}HospitalNurse/GetSYS_TByZKCountLevel`, // 查询护理人数
        getBlFatherTempl: `${platform_nurse}NurseTemplate/GetMould`, // 护理病历模板-树结构父节点
        getSonTemplate: `${platform_nurse}NurseTemplate/GetSonTemplate`, // 护理病历模板-加载子节点
        getSysWorkBenchNursing: `${platform_nurse}NurseTemplate/GetSysWorkBenchNursing`, // 获取护理记录单信息
        getCommonDept: `${platform_nurse}CommonWords/GetDept`, // 获取科室
        loadInfo: `${platform_nurse}CommonWords/LoadInfo`, // 加载页面
        getTreeInfoDept: `${platform_nurse}ThreeTinfo/GetDept`, // 获取科室
        loadTreeInfo: `${platform_nurse}ThreeTinfo/Load`, // 加载三测列表
        saveThreeInfo: `${platform_nurse}ThreeTinfo/SaveTinfo`, // 保存三册表信息
        getNursingInspection: `${platform_nurse}NursingInspection/GetSYS_T_VISIT_1ByHL_SM`, // 获取护理巡视1
        get_MASURIUM_DICT_ITEM: `${platform_nurse}NursingInspection/GET_MASURIUM_DICT_ITEM`, // 获取时间选取值
        saveNursingInspection: `${platform_nurse}NursingInspection/Save`, // 保存护理巡视1
        createDocCheckFileExist: `${platform_nurse}Templates/Addnew`, // 检查护理病历模板文档是否存在
        createDoc: `${platform_nurse}Templates/Addnew2`, // 打开护理病历模板
        getNurseSingerName: `${platform_nurse}NursingInspection/GetSignByHL_SM`, //获取护士签名1
        getNurseSingerNameScnd: `${platform_nurse}NursingInspection/GetSYS_T_VISIT_1ByHL_SM2`, //获取护理巡视2信息
        saveNursingInspectionScnd: `${platform_nurse}NursingInspection/Save2`, //保存护理巡视2
        getNurseQMScnd: `${platform_nurse}NursingInspection/GetSignByHL_SM2`, //获取护士签名2
        saveAuthrityCheck: `${platform_nurse}SaveFile/GetSaveType`, // 保存前检查是否有权限保存
        saveRypg: `${platform_nurse}SaveFile/GetRYPG`, // 保存入院评估内容
        docHasChanged: `${platform_nurse}NurseFileSave/GetRoleToChange`, // 判断文件服务器上的文件是否有更改记录
        isGroupDiagnosis: `${platform_nurse}NurseFileSave/GetHzInfo`, // 判断是否属于会诊类别
        saveDocByString: `${platform_nurse}FileUpload/UploadFileInfoByString`, // 以字符串方式上传DOC文档
        saveDocData: `${platform_nurse}NurseFileSave/SaveFileInfo`, // 保存DOC文档中的数据(数据组，数据元，区域)
        getFileIndexCount: `${platform_nurse}HospitalNurse/GetFileIndexCount`, // 获取是否打印标识
    },
    /** ***************************病历书写接口************************************************/
    writeMedisine: {
        saveAuthrityCheck: `${platform_doctor}SaveFile/GetSaveType`, // 保存前检查是否有权限保存
        saveRypg: `${platform_doctor}SaveFile/GetRYPG`, // 保存入院评估内容
        docHasChanged: `${platform_doctor}SaveFile/GetRoleToChange`, // 判断文件服务器上的文件是否有更改记录
        isGroupDiagnosis: `${platform_doctor}SaveFile/GetHzInfo`, // 判断是否属于会诊类别
        saveDocByString: `${platform_doctor}FileUpload/UploadFileInfoByString`, // 以字符串方式上传DOC文档
        saveDocData: `${platform_doctor}SaveFile/SaveFileInfo`, // 保存DOC文档中的数据(数据组，数据元，区域)
    }
}

export default api
<template>
	<div class="respiratory-container">
		<ckMainNav :navRoute="navRoute" @showDia="handleShowDia"></ckMainNav>
		<el-container style="height: 100%;">
			<el-aside width="300px" style="height: 100%; border-right: 2px solid gray;">
				<h1 class="caption">病历列表</h1>
				<div class="desc">
					<span>床号：{{patientInfo && patientInfo.BED_NO}}</span>
					<span>{{patientInfo && patientInfo.PAT_NAME}}</span>
					<span>{{patientInfo && patientInfo.CODE_NAME}}</span>
					<span>{{patientInfo && patientInfo.PATIENT_AGE}}</span>
				</div>
				<el-menu
					default-active="2"
					class="el-menu-vertical-demo">
						<el-submenu v-for="item in leftTree" :key="item.id" :index="item.id">
							<template slot="title"><div :class="!item.children ? 'hiddenIcon' : ''"><span>{{item.label}}</span></div></template>
							<div v-if="item.children">
									<div v-for="(subitem, subindex) in item.children" :key="subindex">
										<el-menu-item :index="subitem.code" @dblclick.native="handleShowThisData(subitem)">{{subitem.label}}</el-menu-item>
									</div>
							</div>
						</el-submenu>
				</el-menu>
			</el-aside>
			<el-main>
				<div class="mb220" v-if="!showTree">
					<div class="action-box">
						<ckImgBtn icon="ck-imgicon-finished">病历完成</ckImgBtn>
						<ckImgBtn icon="ck-imgicon-patientinfo" @click="handleShowPatient('patientInfo')">患者信息</ckImgBtn>
						<ckImgBtn icon="ck-imgicon-test" @click="handleShowPatient()">评分测试</ckImgBtn>
						<ckImgBtn icon="ck-imgicon-transfer" @click="handleShowPatient('transfer')">移交病历</ckImgBtn>
						<ckImgBtn icon="ck-imgicon-threelevelcheck" @click="handleShowPatient('threeLevelCheck')">三级检诊</ckImgBtn>
						<ckImgBtn icon="ck-imgicon-transferclass" @click="handleShowPatient()">科室交班记录</ckImgBtn>
						<!-- <ckImgBtn icon="ck-imgicon-twoways" @click="handleShowPatient()">双向转诊</ckImgBtn> -->
						<ckImgBtn icon="ck-imgicon-clinicalreport" @click="handleShowPatient('clinicalReport')">临床报告</ckImgBtn>
						<ckImgBtn icon="ck-imgicon-position" @click="handleShowPatient('position')">定位</ckImgBtn>
						<ckImgBtn icon="ck-imgicon-reflesh" @click="handleShowPatient('reflash')">刷新</ckImgBtn>
					</div>
					<div class="simple-info">
						<div class="baseinfo">
							<span>床号：	<span class="green-blue">{{patientInfo && patientInfo.BED_NO}}</span></span>
							<span>住院号：<span class="green-blue">{{patientInfo && patientInfo.VISIT_NO}}</span></span>
							<span>姓名：	<span class="green-blue">{{patientInfo && patientInfo.PAT_NAME}}</span></span>
							<span>性别：	<span class="green-blue">{{patientInfo && patientInfo.CODE_NAME}}</span></span>
							<span>年龄：	<span class="green-blue">{{patientInfo && patientInfo.PATIENT_AGE}}</span></span>
							<span>入院日期：	<span class="green-blue">{{patientInfo && patientInfo.PAT_BIRTHDATE}}</span></span>
							<span>当前科室：	<span class="green-blue">{{patientInfo && patientInfo.DEPT_NAME_CN}}</span></span>
						</div>
						<div class="baseinfo">
							<span>病历状态：	<span class="green-blue">书写</span></span>
							<span>诊断：	<span class="green-blue">{{patientInfo && patientInfo.THREE_DAY_DIAGNOSIS_NAME}}</span></span>
							<span class="shit-yellow">三级护理：{{nursing[0]}}</span>
							<span class="shit-yellow">二级护理：{{nursing[1]}}</span>
							<span class="shit-yellow">二级护理：{{nursing[2]}}</span>
							<label for="outPatient"><input type="checkbox" id="outPatient" v-model="showDischargePat">显示出院患者</label>
							<!-- <label>
								显示模式：
								<select v-model="cmbShow">
									<option value="1">列表显示</option>
									<option value="2">卡片显示</option>
								</select>
							</label> -->
							<label>
								显示模式：
								<select v-model="tspCmbSelect">
									<option value="0">本人</option>
									<option value="1">全科</option>
									<option value="2">未接诊</option>
									<option value="3">已召回</option>
									<option value="4">已转出</option>
								</select>
							</label>
							<span>病历状态：</span>
							<label>
								<select v-model="blzt">
									<option value="9500000001">书写</option>
									<option value="9500000002">完成</option>
									<option value="9500000003">质控</option>
									<option value="9500000004">提交</option>
								</select>
							</label>
							<span>病理问题0条！</span>
						</div>
					</div>
					<el-table
					:data="tableData"
					border
					class="mb20 table-decoration"
					@row-dblclick="handleDetail"
					@row-click="handleShowThisPatient"
					highlight-current-row
					:row-class-name="actionRowClassName"
					style="width: 100%">
						<el-table-column
							width="60"
							label="状态">
							<template slot-scope="scope">
								{{scope.row.DOCTOR_PART_STATUS | filterWriteStatus}}
							</template>
						</el-table-column>
						<el-table-column
							prop="BED_NO"
							label="床号">
						</el-table-column>
						<el-table-column
							prop="DEPT_NAME_CN"
							width="120"
							label="所在科室">
						</el-table-column>
						<el-table-column
							width="120"
							label="住院就诊状态">
							<template slot-scope="scoped">
								{{scoped.row.IP_VISIT_STATUS | filterStatus}}
							</template>
						</el-table-column>
						<el-table-column
							prop="PAT_NAME"
							label="姓名">
						</el-table-column>
						<el-table-column
							width="110"
							label="出生日期">
							<template slot-scope="scoped">
								{{scoped.row.PAT_BIRTHDATE | filterBirthday}}
							</template>
						</el-table-column>
						<el-table-column
							prop="VST_CARD_NO"
							width="120"
							label="病历号">
						</el-table-column>
						<el-table-column
							prop="PAT_GENDER"
							width="120"
							label="性别">
						</el-table-column>
						<el-table-column
							prop="PATIENT_AGE"
							width="60"
							label="年龄">
						</el-table-column>
						<el-table-column
							prop="VISIT_NO"
							width="120"
							label="住院号">
						</el-table-column>
						<el-table-column
							prop="IN_TIMES"
							width="40"
							label="次">
						</el-table-column>
						<el-table-column
							prop="ADM_DATE"
							width="160"
							label="入院日期">
						</el-table-column>
						<el-table-column
							prop="DISCHARGE_DATE"
							width="160"
							label="出院日期">
						</el-table-column>
						<el-table-column
							prop="INHOSNAME"
							label="住院医生">
						</el-table-column>
						<el-table-column
							prop="MAINNAME"
							label="主治医师">
						</el-table-column>
						<el-table-column
							prop="CHIEFNAME"
							label="主任医师">
						</el-table-column>
						<el-table-column
							prop="COLLECT_DOC"
							label="收录医师">
						</el-table-column>
						<el-table-column
							prop="THREE_DAY_DIAGNOSIS_NAME"
							label="确诊诊断">
						</el-table-column>
					</el-table>
					<ckPagination
					:currentPage="pageNos"
					:total="total"
					class="fix-width"
					@_pageSizeChange="pageSizeChange"
					@_currentPageChange="currentPageChange"
					></ckPagination>
				</div>
				<div class="mb150" v-else>
					<mainRight :componentName="mainComponentName"></mainRight>
				</div>
			</el-main>
		</el-container>
		<topMenuDia :title="topMenuDiaTitle" :dialogVisible="topMenuDiaVis" :diaWidth="customDiaWidth" @closeTopMeunDia="handleCloseTopMeunDia">
			<div slot="main">
				<component
					:is="topMenuComponentName"
					:patientInfo="tempPatientInfo"
					:dialogVisible="topMenuDiaVis"
					:inDoctor="inDoctor"
					:emergencyDoctor="emergencyDoctor"
				></component>
			</div>
		</topMenuDia>
	</div>
</template>

<script>
import { mapState, createNamespacedHelpers } from 'vuex'
import moment from 'moment'
import residentDoctorTopMenu from '@/router/routes/residentDoctorTopMenu'
import residentDoctorTopMenuDic from '@/router/dictionary/residentDoctorTopMenu'
import * as api from '@/global/api'
import { deepCopy } from '@/utils/utils'
import topMenuDia from '../components/index'
import mainRight from './components/mainRight'
import handleActiveX from '@/utils/activeX'
import Evtbus from '@/utils/bus'

const { mapActions } = createNamespacedHelpers('residentDoctor')

export default {
	name: 'RespiratoryMedicine',
	data () {
		return {
			showTree: false,
			topMenuDiaTitle: '',
			topMenuDiaVis: false,
			topMenuComponentName: '',
			mainComponentName: '',
			customDiaWidth: '',
			navRoute: residentDoctorTopMenu,
			tableData: [],
			fileList: [],
			leftTree: [],
			nursing: [0, 0, 0],
			patientInfo: {},
			currentPatient: null, // 当前操作的患者
			tempPatientInfo: {},
			cmbShow: '1', // 卡片显示/列表显示
			showDischargePat: false, // 是否显示出院患者
			tspCmbSelect: '1', // 病历显示范围
			blzt: '9500000001', // 病历状态
			inDoctor: null, // 收录医师
			emergencyDoctor: null, // 急诊医师
			workbench: '',
			patientInfoDocTpl: '',
			getIndex: -1,
			pageSize: 20,
			pageNos: 1,
			total: 0
		}
	},
	computed: {
		...mapState({
			userInfo: state => state.global.userInfo,
			benchId: state => state.global.workBenchID,
			deptID: state => state.global.deptID
		}),
		uploadOdtFile () {
			return api.default.global.uploadOdtFile
		}
	},
	watch: {
		deptID (oldVal, newVal) {
			if (oldVal !== newVal) {
				this.getPatientList()
			}
		},
		tspCmbSelect (oldVal, newVal) {
			if (oldVal !== newVal) {
				this.getPatientList()
			}
		},
		blzt (oldVal, newVal) {
			if (oldVal !== newVal) {
				this.getPatientList()
			}
		},
		showDischargePat (val) {
			this.getPatientList()
		}
	},
	filters: {
		filterStatus (val) {
			switch(val) {
				case '8400000001':
					return '住院中未接诊'
				case '8400000002':
					return '住院中已接诊'
				case '8400000003':
					return '住院取消'
				case '8400000004':
					return '预约出院'
				case '8400000005':
					return '已出院'
				case '8400000006':
					return '住院预约确认'
				case '8400000007':
					return '住院预约待确认'
				case '8400000008':
					return '住院预约报到'
				case '8400000009':
					return '转出未接诊'
			}
		},
		filterWriteStatus (val) {
			switch(val) {
				case '9500000001':
					return '书写'
				case '8400000002':
					return '完成'
				case '8400000003':
					return '质控'
				case '8400000004':
					return '提交'
			}
		},
		filterBirthday (val) {
			return moment(val).format('YYYY-MM-DD')
		}
	},
	mounted () {
		Evtbus.$on('updateMedisineRecordTree', () => {
			const _this = this
			this.getDoctorOperation({
				VISIT_ID: this.currentPatient.VISIT_ID
			})
		})
	},
	provide () {
		return {
			self: this
		}
	},
	components: {
		topMenuDia,
		mainRight,
		qualityControlDetail (resolve) {
			require(['../components/qualityControlDetail'], resolve)
		},
		importantDiseasesTypeMedisineRecordWriten (resolve) {
			require(['../components/importantDiseasesTypeMedisineRecordWriten'], resolve)
		},
		chineseAndWesternMedisineRecordWriten (resolve) {
			require(['../components/chineseAndWesternMedisineRecordWriten'], resolve)
		},
		qualityControlReport (resolve) {
			require(['../components/qualityControlReport'], resolve)
		},
		medisineRecordOpenManage (resolve) {
			require(['../components/medisineRecordOpenManage'], resolve)
		},
		subImagesManage (resolve) {
			require(['../components/subImagesManage'], resolve)
		},
		subICEManage (resolve) {
			require(['../components/subICEManage'], resolve)
		},
		operationCode (resolve) {
			require(['../components/operationCode'], resolve)
		},
		drugsData (resolve) {
			require(['../components/drugsData'], resolve)
		},
		ICD_10InternationalCode (resolve) {
			require(['../components/ICD_10InternationalCode'], resolve)
		},
		subTplManage (resolve) {
			require(['../components/subTplManage'], resolve)
		},
		subTpls (resolve) {
			require(['../components/subTpls'], resolve)
		},
		diagnosis (resolve) {
			require(['../components/diagnosis'], resolve)
		},
		medicineRecordBorrow (resolve) {
			require(['../components/medicineRecordBorrow'], resolve)
		},
		medicineRecordRecall (resolve) {
			require(['../components/medicineRecordRecall'], resolve)
		},
		borrowExamine (resolve) {
			require(['../components/borrowExamine'], resolve)
		},
		timeAxis (resolve) {
			require(['../components/timeAxis'], resolve)
		},
		infectiousDiseaseReport (resolve) {
			require(['../components/infectiousDiseaseReport'], resolve)
		},
		examineRecordSearch (resolve) {
			require(['../components/examineRecordSearch'], resolve)
		},
		chronicDiseaseReport (resolve) {
			require(['../components/chronicDiseaseReport'], resolve)
		},
		agriculturalChemicalsPoisoningReport (resolve) {
			require(['../components/agriculturalChemicalsPoisoningReport'], resolve)
		},
		chronicPatientInvestigationTable (resolve) {
			require(['../components/chronicPatientInvestigationTable'], resolve)
		},
		infectiousRegistrationTable (resolve) {
			require(['../components/infectiousRegistrationTable'], resolve)
		},
		drugAdverseReactionReport (resolve) {
			require(['../components/drugAdverseReactionReport'], resolve)
		},
		definiteDiagnosis (resolve) {
			require(['../components/definiteDiagnosis'], resolve)
		},
		patientSearch (resolve) {
			require(['../components/patientSearch'], resolve)
		},
		selfPayDrugNotify (resolve) {
			require(['../components/selfPayDrugNotify'], resolve)
		},
		diagnosisProject (resolve) {
			require(['../components/diagnosisProject'], resolve)
		},
		patientInfo (resolve) {
			require(['./components/patientInfo'], resolve)
		},
		transfer (resolve) {
			require(['./components/transfer'], resolve)
		},
		threeLevelCheck (resolve) {
			require(['./components/threeLevelCheck'], resolve)
		},
		clinicalReport (resolve) {
			require(['./components/clinicalReport'], resolve)
		},
		position (resolve) {
			require(['./components/position'], resolve)
		}
	},
	created () {
		this.getPatientList()
		this.getPatientDocTpl() // 获取显示患者信息的通用模板
	},
	methods: {
		...mapActions([
			'GET_PAITENTINFO_LIST',
			'GET_PAITENTINFO_DOC_TPL',
			'GET_DOCTOR_OPERATION',
			'GET_PATIENT_INFO',
			'GET_DOCTOR',
			'GET_EMERGENCY_DOCTOR'
		]),
		getPatientList (obj) {
			let args = {
				cbShowDischargePat: this.showDischargePat ? 'true' : 'false',
				tspCmbSelect: this.tspCmbSelect,
				blzt: this.blzt,
				deptId: this.deptID,
				pageSize: this.pageSize,
				pageNos: this.pageNos,
				workbenchcode: this.benchId,
				UserId: this.userInfo.UserId,
				...obj
			}
			this.GET_PAITENTINFO_LIST(args).then((res) => {
				if (res.code === 1) {
					this.tableData = res.values.values
					this.nursing = res.values2.split(',')
					this.total = res.values.total
					this.pageNos = res.values.pageNos
					this.currentPatient = this.tableData && this.tableData.length > 0 && this.tableData[0]
					this.getDoctorOperation(this.tableData && this.tableData.length > 0 && this.tableData[0])
					this.getPatientInfo(this.tableData && this.tableData.length > 0 && this.tableData[0])
				}
			})
		},
		handleShowThisPatient (rowObj) {
			const args = {
				VISIT_ID: rowObj.VISIT_ID
			}
			this.getDoctorOperation(args)
			this.getPatientInfo(args)
		},
		getPatientDocTpl () {
			this.GET_PAITENTINFO_DOC_TPL().then((res) => {
				if (res.code === 1) {
					this.patientInfoDocTpl = res.values2
				}
			})
		},
		getDoctor () {
			this.GET_DOCTOR({
				workbench: this.benchId
			}).then((res) => {
				if (res.code === 1) {
					this.inDoctor = res.values
				}
			})
		},
		getEmergencyDoctor () {
			this.GET_EMERGENCY_DOCTOR({
				workbench: this.benchId
			}).then((res) => {
				if (res.code === 1) {
					this.emergencyDoctor = res.values
				}
			})
		},
		getDoctorOperation (obj) {
			if (!obj) return
			this.leftTree = []
			this.GET_DOCTOR_OPERATION({
				VistID: obj.VISIT_ID
			}).then((res) => {
				if (res.code === 1) {
					this.leftTree = res.values
				}
			})
		},
		getPatientInfo (obj) {
			if (!obj) return
			this.GET_PATIENT_INFO({
				visitId: obj.VISIT_ID
			}).then((res) => {
				if (res.code === 1) {
					this.patientInfo = res.values && res.values.length > 0 && res.values[0]
					this.tempPatientInfo = deepCopy(this.patientInfo)
				}
			})
		},
		handleDetail (obj) {
			const openDocNeedArgs = {
				// MenuStrip: 0,
				// Tag: 2,
				// children: null,
				// cid: 0,
				// code: "2016091216614147",
				// code2: null,
				filePath: this.patientInfoDocTpl, // 
				// id: "201911011635518094928",
				label: "基础信息", // 
				// openTime: '',
				// parentMenuId: null,
				// type: 0
				baseinfo: true // 代表患者的基础信息，以只读权限打开
			}
			// 获取左侧菜单列表
			this.getDoctorOperation(obj)
			// 获取患者详细信息
			this.getPatientInfo(obj)
			// 打开患者信息文档，这里需要对参数进行处理，保证提供打开文档必须的参数
			this.handleShowThisData(openDocNeedArgs, () => {
				this.GET_PATIENT_INFO({
					visitId: obj.VISIT_ID
				}).then((res) => {
					if (res.code === 1) {
						// 更新页面上患者信息
						handleActiveX.tools.fillPatientInfo(res.values[0]) // 替换患者信息
					}
				})
			})
		},
		handleShowThisData (obj, cb) {
			this.mainComponentName = 'contentShow'
			this.showTree = true
			this.$nextTick(() => {
				Evtbus.$emit('InsertActiveXTab', obj, cb)
			})
		},
		handleShowDia (val) {
			this.topMenuDiaTitle = residentDoctorTopMenuDic[val].cn
			this.topMenuComponentName = residentDoctorTopMenuDic[val].en
			this.customDiaWidth = residentDoctorTopMenuDic[val].diaWidth && residentDoctorTopMenuDic[val].diaWidth
			this.topMenuDiaVis = true
			Evtbus.$emit('showIframe', true)
		},
		handleShowPatient (val) {
			if (val === 'reflash') {
				this.getPatientList()
				return
			}
			if (val === 'patientInfo') {
				this.getDoctor()
				this.getEmergencyDoctor()
			}
			this.topMenuComponentName = val
			this.topMenuDiaVis = true
		},
		handleCloseTopMeunDia () {
			this.topMenuDiaTitle = ''
			this.topMenuComponentName = ''
			this.topMenuDiaVis = false
			Evtbus.$emit('showIframe', false)
		},
		submitUpload () {
			this.$refs.upload.submit()
		},
		pageSizeChange (size) {
			this.pageSize = size
			this.getPatientList()
		},
		currentPageChange (val) {
			this.pageNos = val
			this.getPatientList()
		},
		actionRowClassName ({row, rowIndex}) {
			if (parseInt(row.IP_VISIT_STATUS, 10) === 8400000005) {
				return 'out-hospital'
			}
			row.index = rowIndex
		},
		actionRowClick (row) {
			this.getIndex = row.index
		},
		selectedHighlight ({row, rowIndex}) {
			if (this.getIndex === rowIndex ) {
				return {
					"background-color": "#CAE1FF"
				}
			}
		}
	},
	destroyed () {
		Evtbus.$off('updateMedisineRecordTree')
	}
}
</script>

<style lang="scss" scoped>
	.respiratory-container{
		height: 100%;
		.caption{
			font-size: 18px;
			background: #44B3C7;
			padding-left: 5px;
			line-height: 2;
			color: white;
			text-align: center;
		}
		.desc{
			line-height: 2;
			padding-left: 5px;
			text-align: center;
			line-height: 52px;
			span{
				padding-right: 5px;
			}
		}
		.action-box, .simple-info {
			border: 1px solid #E8EAED;
			background-color: white;
			margin-bottom: 5px;
			color: #333
		}
		.action-box {
			padding: 10px 0 10px 15px;
		}
		.simple-info {
			padding: 5px 0 5px 10px;
			.baseinfo {
				line-height: 3;
				& > span {
					margin-right: 20px;
					.green-blue {
						color: #44B3C7;
					}
				}
				& > label {
					margin-right: 20px;
				}
				.shit-yellow {
					color: #f6b16f;
				}
			}
		}
		.table-decoration {
			height: calc(100vh - 325px);
			overflow-y: auto;
			border: 1px solid #E8EAED;
		}
		.fix-width {
			width: calc(100vw - 318px);
			left: auto;
			right: 0;
		}
		::-webkit-scrollbar-track-piece { //滚动条凹槽的颜色，还可以设置边框属性
			background-color:#DFDFDF;
		}
		::-webkit-scrollbar {//滚动条的宽度
			width:16px;
			height:9px;
		}
		::-webkit-scrollbar-thumb {//滚动条的设置
			background-color:#DFDFDF;
			background-clip:padding-box;
			min-height:28px;
		}
		::-webkit-scrollbar-thumb:hover {
			background-color:#DFDFDF;
		}
		/deep/ .out-hospital {
			background-color: #87ceeb;
		}
		/deep/ .el-main{
			overflow: hidden;
			padding: 5px;
		}
		/deep/ .el-table__body tr.current-row > td {
			background-color: #79dae2;
		}
		/deep/ .el-submenu__title {
			height: 46px;
			line-height: 46px;
		}
		/deep/ .hiddenIcon + .el-submenu__icon-arrow {
			display: none;
		}
	}
</style>

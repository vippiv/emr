<template>
	<div class="patientInfo-container">
		<h2 class="caption">患者信息</h2>
		<div class="resident-hospital">
			<p>入院情况</p>
			<el-form ref="inForm" label-width="80px">
				<el-row :gutter="5">
					<el-col :span="8">
						<el-form-item label="住院号">
							<el-input v-model="patientInfo.VISIT_NO" size="mini"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="姓名">
							<el-input v-model="patientInfo.PAT_NAME" size="mini"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="性别">
							<el-radio-group v-model="patientInfo.CODE_NAME">
								<el-radio :label="'男'">男</el-radio>
								<el-radio :label="'女'">女</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="5">
					<el-col :span="8">
						<el-form-item label="所属科室">
							<el-input v-model="patientInfo.DEPT_NAME_CN" size="mini"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="床号">
							<el-input v-model="patientInfo.BED_NO" size="mini"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="病区">
							<el-input v-model="patientInfo.IP_NSTATION" size="mini"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="5">
					<el-col :span="8">
						<el-form-item label="出生日期">
							<el-input v-model="patientInfo.BIRTH_DATE" size="mini"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="年龄">
							<el-input v-model="patientInfo.PATIENT_AGE" size="mini"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="收录医师">
							<el-select v-model="patientInfo.COLLECT_DOC" placeholder="请选择" size="mini">
								<el-option
								v-for="item in inDoctor"
								:key="item.USER_CODE"
								:label="item.USER_NAME"
								:value="item.USER_NAME">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="5">
					<el-col :span="8">
						<el-form-item label="入院时间">
							<el-input v-model="patientInfo.ADM_DATE" size="mini"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="入院次数">
							<el-input v-model="patientInfo.IN_TIMES" size="mini"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="急诊医师">
							<el-select v-model="patientInfo.EMERGENCY_DOC" placeholder="请选择" size="mini">
							<el-option
							v-for="item in emergencyDoctor"
							:key="item.USER_CODE"
							:label="item.USER_NAME"
							:value="item.USER_NAME">
							</el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="5">
					<el-col :span="8">
						<el-form-item label="病案号">
							<el-input v-model="patientInfo.MR_NO" size="mini"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="门诊号">
							<el-input v-model="patientInfo.OutpatientNo" size="mini"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="患者来源">
							<el-select v-model="patientInfo.SXZZLY" placeholder="请选择" size="mini">
							<el-option
							v-for="item in patientFromOption"
							:key="item.CODE"
							:label="item.NAME"
							:value="item.NAME">
							</el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="5">
					<el-col :span="8">
						<el-form-item label="医保类型">
							<el-select v-model="patientInfo.INSURANCE_TYPE" placeholder="请选择" size="mini">
							<el-option
							v-for="item in insuranceOptions"
							:key="item.CODE_ID"
							:label="item.CODE_NAME"
							:value="item.CODE_NAME">
							</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="身份证">
							<el-input v-model="patientInfo.ID_NO" size="mini"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="西医诊断">
							<el-input v-model="patientInfo.DIAGNOSIS_DESC" size="mini"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="2">
						<el-button type="text" @click="handleShowAllICD">修改诊断</el-button>
					</el-col>
				</el-row>
				<el-row :gutter="5">
					<el-col :span="8">
						<el-form-item label="入院类型">
							<el-select v-model="patientInfo.ADM_CATEGORY" placeholder="请选择" size="mini">
								<el-option
								v-for="item in inHospitalOptions"
								:key="item.CODE_ID"
								:label="item.CODE_NAME"
								:value="item.CODE_NAME">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="入院病情">
							<el-select v-model="patientInfo.ADM_ILLNESS" placeholder="请选择" size="mini">
							<el-option
							v-for="item in diseaseOptions"
							:key="item.CODE_ID"
							:label="item.CODE_NAME"
							:value="item.CODE_NAME">
							</el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</div>
		<div class="baseinfo">
			<span>病人基本信息</span>
			<el-form ref="baseForm" :model="baseForm" label-width="90px">
				<el-row :gutter="3">
					<el-col :span="6">
						<el-form-item label="婚姻状况">
							<el-select v-model="patientInfo.MARITAL_STATUS" placeholder="请选择" size="mini">
							<el-option
							v-for="item in marryOptions"
							:key="item.CODE_ID"
							:label="item.CODE_NAME"
							:value="item.CODE_NAME">
							</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="民族">
							<el-select v-model="patientInfo.NATIONAL" placeholder="请选择" size="mini">
								<el-option
									v-for="item in nationOptions"
									:key="item.CODE_ID"
									:label="item.CODE_NAME"
									:value="item.CODE_NAME">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="职业">
							<el-select v-model="patientInfo.OCCUPATION" placeholder="请选择" size="mini">
								<el-option
									v-for="item in careerOptions"
									:key="item.CODE_ID"
									:label="item.CODE_NAME"
									:value="item.CODE_NAME">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="0.5">
					<el-col :span="5">
						<el-form-item label="现在住址">
							<el-select v-model="nowAddress.provinceVal" placeholder="请选择" size="mini" @change="getNextCity('now_province')">
								<el-option
								v-for="item in livingOptions"
								:key="item.CODE"
								:label="item.NAME"
								:value="item.CODE">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="5">
						<el-form-item label="省(市,区)" class="province">
							<el-select v-model="nowAddress.cityVal" placeholder="请选择" size="mini" @change="getNextCity('now_city')">
								<el-option
									v-for="item in nowAddress.cityOptions"
									:key="item.CODE"
									:label="item.NAME"
									:value="item.CODE">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="4">
						<el-form-item label="市" class="city">
							<el-select v-model="nowAddress.areaVal" placeholder="请选择" size="mini">
								<el-option
									v-for="item in nowAddress.areaOptions"
									:key="item.CODE"
									:label="item.NAME"
									:value="item.CODE">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="4">
						<el-form-item label="县(区)" class="area">
							<el-input v-model="nowAddress.address" size="mini"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="5">
						<el-form-item label="现住址邮编">
							<el-input v-model="patientInfo.LOCAL_POST_CODE" size="mini"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="5">
					<el-col :span="6">
						<el-form-item label="单位">
							<el-input v-model="patientInfo.EMPLOYER" size="mini"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="16">
						<el-form-item label="籍贯">
							<el-col :span="8">
							<el-select v-model="belongAddress.provinceVal" placeholder="省" size="mini" @change="getNextCity('belong_province')">
								<el-option
									v-for="item in livingOptions"
									:key="item.CODE"
									:label="item.NAME"
									:value="item.CODE">
								</el-option>
							</el-select>
							</el-col>
							<el-select v-model="belongAddress.cityVal" placeholder="市" size="mini">
								<el-option
									v-for="item in belongAddress.cityOptions"
									:key="item.CODE"
									:label="item.NAME"
									:value="item.CODE">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="0.5">
					<el-col :span="5">
						<el-form-item label="出生地">
							<el-select v-model="birthAddress.provinceVal" placeholder="请选择" size="mini" @change="getNextCity('birth_province')">
							<el-option
							v-for="item in livingOptions"
							:key="item.CODE"
							:label="item.NAME"
							:value="item.CODE">
							</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="5">
						<el-form-item label="省(市,区)" class="province">
							<el-select v-model="birthAddress.cityVal" placeholder="请选择" size="mini" @change="getNextCity('birth_city')">
								<el-option
									v-for="item in birthAddress.cityOptions"
									:key="item.CODE"
									:label="item.NAME"
									:value="item.CODE">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="5">
						<el-form-item label="市" class="city">
							<el-select v-model="birthAddress.areaVal" placeholder="请选择" size="mini">
								<el-option
									v-for="item in birthAddress.areaOptions"
									:key="item.CODE"
									:label="item.NAME"
									:value="item.CODE">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="县(区)" class="area">
							<el-input v-model="birthAddress.address" size="mini"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="0.5">
					<el-col :span="5">
						<el-form-item label="户口地址">
							<el-select v-model="registerAddress.provinceVal" placeholder="请选择" size="mini" @change="getNextCity('register_province')">
							<el-option
							v-for="item in livingOptions"
							:key="item.CODE"
							:label="item.NAME"
							:value="item.CODE">
							</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="5">
						<el-form-item label="省(市,区)" class="province">
							<el-select v-model="registerAddress.cityVal" placeholder="请选择" size="mini" @change="getNextCity('register_city')">
								<el-option
									v-for="item in registerAddress.cityOptions"
									:key="item.CODE"
									:label="item.NAME"
									:value="item.CODE">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="5">
						<el-form-item label="市" class="city">
							<el-select v-model="registerAddress.areaVal" placeholder="请选择" size="mini">
								<el-option
									v-for="item in registerAddress.areaOptions"
									:key="item.CODE"
									:label="item.NAME"
									:value="item.CODE">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="4">
						<el-form-item label="县(区)" class='area'>
							<el-input v-model="registerAddress.address" size="mini"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="5">
						<el-form-item label="户口邮编">
							<el-input v-model="patientInfo.HOME_POST_CODE" size="mini"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="3">
					<el-col :span="6">
						<el-form-item label="联系人">
							<el-input v-model="patientInfo.NOK_NAME" size="mini"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="与患者关系">
							<el-select v-model="patientInfo.NOK_RELATION" size="mini" placeholder="请选择">
								<el-option
									v-for="item in relationOptions"
									:key="item.value"
									:label="item.label"
									:value="item.value">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="联系人电话">
							<el-input v-model="patientInfo.NOK_PHONE_NO" size="mini"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
						<el-form-item label="备注">
							<el-input v-model="patientInfo.REMARKS" size="mini" style='width:90%'></el-input>
						</el-form-item>
				</el-row>
				<el-row style="text-align:center">
					<el-button type="primary" size="mini" @click="savePatientInfo">保存</el-button>
					<el-button type="primary" size="mini" @click="handleClose">退出</el-button>
				</el-row>
			</el-form>
		</div>
		<el-dialog
			title="ICD编码"
			:visible.sync="ICDDialogVisible"
			:append-to-body="true"
			width="30%"
			:before-close="handleICDDiaClose">
				<el-radio-group v-model="ICDType" class="mb10">
					<el-radio :label="1">ICD拼音码</el-radio>
					<el-radio :label="2">ICD名称</el-radio>
					<el-radio :label="3">ICD编码</el-radio>
				</el-radio-group>
				<el-form :inline="true" :model="icdSearch" class="demo-form-inline">
					<el-form-item label="" class="fix-width-80">
						<el-input v-model="icdSearch.icdVal" size="mini" placeholder=""></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" size="mini" @click="handleICDSearch">查询</el-button>
					</el-form-item>
				</el-form>
				<el-table
					:data="ICDTableData"
					border
					height="300"
					style="width: 100%">
					<el-table-column
					prop="ICD10"
					label="ICD编码">
					</el-table-column>
					<el-table-column
					prop="ICD10Name"
					label="ICD名称">
					</el-table-column>
					<el-table-column
					prop="ICD10HeadPY"
					label="拼音码">
					</el-table-column>
					<el-table-column
					label="操作">
						<template slot-scope="scoped">
							<el-button type="text" @click="handleChoose(scoped.row)">选择</el-button>
						</template>
					</el-table-column>
				</el-table>
			</span>
		</el-dialog>
	</div>
</template>

<script type="text/javascript">
	import * as original from 'vuex'

	const { mapActions } = original.createNamespacedHelpers('residentDoctor')

	export default {
		name: 'PatientInfo',
		props: {
			dialogVisible: {
				type: Boolean,
				default: false
			},
			patientInfo: {
				type: Object,
				default: () => {}
			},
			inDoctor: {
				type: Array,
				default: () => []
			},
			emergencyDoctor: {
				type: Array,
				default: () => []
			}
		},
		inject: ['self'],
		data () {
			return {
				relationOptions: [],
				nowAddress: { // 现住址
					provinceVal: '',
					cityVal: '',
					cityOptions: [],
					areaVal: '',
					areaOptions: [],
					address: ''
				},
				birthAddress: { // 出生地
					provinceVal: '',
					cityVal: '',
					cityOptions: [],
					areaVal: '',
					areaOptions: [],
					address: ''
				},
				belongAddress: { // 籍贯
					provinceVal: '',
					cityVal: '',
					cityOptions: []
				},
				registerAddress: { // 户口
					provinceVal: '',
					cityVal: '',
					cityOptions: [],
					areaVal: '',
					areaOptions: [],
					address: ''
				},
				baseForm: {},
				ICDDialogVisible: false,
				ICDType: 1,
				ICDTableData: [],
				icdSearch: {
					icdVal: ''
				}
			}
		},
		created () {
			// 现住址
			this.nowAddress.provinceVal = this.patientInfo.LOCAL_ADDRESS.split('/')[0]
			this.nowAddress.cityVal = this.patientInfo.LOCAL_ADDRESS.split('/')[1]
			this.nowAddress.areaVal = this.patientInfo.LOCAL_ADDRESS.split('/')[2]
			this.nowAddress.address = this.patientInfo.LOCAL_ADDRESS.split('/')[3]
			// 出生地
			this.birthAddress.provinceVal = this.patientInfo.BIRTH_PLACE.split('/')[0]
			this.birthAddress.cityVal = this.patientInfo.BIRTH_PLACE.split('/')[1]
			this.birthAddress.areaVal = this.patientInfo.BIRTH_PLACE.split('/')[2]
			this.birthAddress.address = this.patientInfo.BIRTH_PLACE.split('/')[3]
			// 籍贯
			this.belongAddress.provinceVal = this.patientInfo.ORIGIN.split('/')[0]
			this.belongAddress.cityVal = this.patientInfo.ORIGIN.split('/')[1]
			// 户口
			this.registerAddress.provinceVal = this.patientInfo.HOME_ADDRESS.split('/')[0]
			this.registerAddress.cityVal = this.patientInfo.HOME_ADDRESS.split('/')[1]
			this.registerAddress.areaVal = this.patientInfo.HOME_ADDRESS.split('/')[2]
			this.registerAddress.address = this.patientInfo.HOME_ADDRESS.split('/')[3]
		},
		computed: {
			...original.mapState({
				patientFromOption: state => state.global.baseDataTyped.huanzhelaiyuan,
				marryOptions: state => state.global.baseDataTyped.hunyin,
				nationOptions: state => state.global.baseDataTyped.minzu,
				careerOptions: state => state.global.baseDataTyped.zhiye,
				insuranceOptions: state => state.global.baseDataTyped.yibao,
				inHospitalOptions: state => state.global.baseDataTyped.ruyuanleibie,
				diseaseOptions: state => state.global.baseDataTyped.bingqing,
				livingOptions: state => state.global.baseDataTyped.xianzhuzhi
			})
		},
		methods: {
			...mapActions([
				'SAVE_PATIENT_INFO',
				'GET_ICD_CODES'
			]),
			...original.mapActions([
				'A_GET_INIT',
				'A_GET_NEXT_CITY'
			]),
			getBaseType () {
				this.A_GET_INIT()
			},
			getNextCity (tag) {
				const args = {
					code: ''
				}
				switch (tag) {
					case 'now_province':
						args.code = this.nowAddress.provinceVal
						break
					case 'now_city':
						args.code = this.nowAddress.cityVal
						break
					case 'belong_province':
						args.code = this.belongAddress.provinceVal
						break
					case 'birth_province':
						args.code = this.birthAddress.provinceVal
						break
					case 'birth_city':
						args.code = this.birthAddress.cityVal
						break
					case 'register_province':
						args.code = this.registerAddress.provinceVal
						break
					case 'register_city':
						args.code = this.registerAddress.cityVal
						break
				}
				this.A_GET_NEXT_CITY(args).then((res) => {
					if (res.code === 1) {
						switch (tag) {
							case 'now_province':
								this.nowAddress.cityOptions = res.values
								this.nowAddress.cityVal = ''
								this.nowAddress.areaVal = ''
								this.nowAddress.address = ''
								break
							case 'now_city':
								this.nowAddress.areaOptions = res.values
								this.nowAddress.areaVal = ''
								this.nowAddress.address = ''
								break
							case 'belong_province':
								this.belongAddress.cityOptions = res.values
								this.belongAddress.cityVal = ''
								break
							case 'birth_province':
								this.birthAddress.cityOptions = res.values
								this.birthAddress.cityVal = ''
								this.birthAddress.areaVal = ''
								this.birthAddress.address = ''
								break
							case 'birth_city':
								this.birthAddress.areaOptions = res.values
								this.birthAddress.areaVal = ''
								this.birthAddress.address = ''
								break
							case 'register_province':
								this.registerAddress.cityOptions = res.values
								this.registerAddress.cityVal = ''
								this.registerAddress.areaVal = ''
								this.registerAddress.address = ''
								break
							case 'register_city':
								this.registerAddress.areaOptions = res.values
								this.registerAddress.areaVal = ''
								this.registerAddress.address = ''
								break
						}
					}
				})
			},
			actionTransferVal (val, arrSet, compareField, getField) {
				let ret = ''
				arrSet.forEach(item => {
					if (val === item[compareField]) {
						ret = item[getField]
					}
				})
				return ret
			},
			savePatientInfo () {
				const data = this.patientInfo
				const args = {
					visitId: data.VISIT_ID, // 患者主键
					icd: data.DIAGNOSTICIAN_ID, // ICD编码
					icdName: data.DIAGNOSIS_DESC, // ICD名称
					kindId: data.KINDID, // KID
					txtIntime: !data.IN_TIMES ? '1' : data.IN_TIMES, // 入院次数
					txtVisitId: data.VISIT_NO, // 住院号
					txtName: data.PAT_NAME, // 姓名
					birthdate: data.BIRTH_DATE, // 出生日期
					txtAge: data.PATIENT_AGE, // 年龄
					txtVisitNo: data.MR_NO, // 病案号
					sex: data.CODE_NAME === '男' ? '1' : '0', // 性别
					txtCardid: data.OutpatientNo, // 门诊号
					yblx: data.INSURANCE_TYPE, // 医保类型
					txtBz: data.REMARKS, // 备注
					illessText: data.ADM_ILLNESS, // 入院病情
					illessValue: this.filterAdmIllness(data.ADM_ILLNESS, this.diseaseOptions), // 入院病情ID
					rylb: data.ADM_CATEGORY, // 入院类别
					collectdocId: this.actionTransferVal(data.COLLECT_DOC, this.inDoctor, 'USER_NAME', 'USER_CODE'), // 收录医师id
					emergencydoc: this.actionTransferVal(data.EMERGENCY_DOC, this.emergencyDoctor, 'USER_NAME', 'USER_CODE'), // 急诊医师
					txtId: data.ID_NO, // 身份证
					marry: data.MARITAL_STATUS, // 婚姻
					cmbxCountry: data.NATIONAL, // 民族
					cmbxJob: data.OCCUPATION, // 职业
					nowaddress: `${this.nowAddress.provinceVal}/${this.nowAddress.cityVal}/${this.nowAddress.areaVal}`, // 现住址（格式：省/市/区）
					txtCompany: data.EMPLOYER, // 单位
					txtContacter: data.NOK_NAME, // 联系人
					txtRelation: data.NOK_RELATION, // 与患者关系
					txtContanctnum: data.NOK_PHONE_NO, // 联系人电话
					birthaddress: `${this.birthAddress.provinceVal}/${this.birthAddress.cityVal}/${this.birthAddress.areaVal}`, // 出生地（格式：省/市/区）
					txtPostno: data.HOME_POST_CODE, // 邮编
					homeaddress: `${this.registerAddress.provinceVal}/${this.registerAddress.cityVal}/${this.registerAddress.areaVal}`, // 户口地址（格式：省/市/区）
					origin: `${this.belongAddress.provinceVal}/${this.belongAddress.cityVal}`, // 籍贯（格式：省/市/区）
					txtnowpost: data.LOCAL_POST_CODE, // 现住址邮编
					hzly: this.actionTransferVal(data.SXZZLY, this.patientFromOption, 'NAME', 'CODE') // 患者来源
				}
				console.log('args', args)
				this.SAVE_PATIENT_INFO(args).then((res) => {
					if (res.code === 1) {
						this.$message.success('保存成功')
						this.handleClose()
					}
				})
			},
			filterAdmIllness (tag) {
				let AdmIllnessID = ''
				this.diseaseOptions.forEach((item) => {
					if (tag === item.CODE_NAME) {
						AdmIllnessID = item.CODE_ID
					}
				})
				return AdmIllnessID
			},
			handleClose () {
				this.self.handleCloseTopMeunDia()
			},
			handleShowAllICD () {
				this.ICDDialogVisible = true
				this.getICDCodes({
					rbPinyinCode: 1
				})
			},
			getICDCodes (args) {
				this.GET_ICD_CODES(args).then((res) => {
					if (res.code === 1) {
						this.ICDTableData = res.values
					}
				})
			},
			handleICDDiaClose () {
				this.ICDDialogVisible = false
			},
			handleICDSearch () {
				const args = {}
				if (this.ICDType === 1) {
					args.rbCode = 1
				} else if (this.ICDType === 2) {
					args.rbName = 1
				} else if (this.ICDType === 3) {
					args.rbPinyinCode = 1
				} else if (this.icdSearch.icdVal) {
					args.txtInput = this.icdSearch.icdVal
				}
				this.getICDCodes(args)
			},
			handleChoose (obj) {
				this.patientInfo.DIAGNOSTICIAN_ID = obj.ICD10
				this.patientInfo.DIAGNOSIS_DESC = obj.ICD10Name
				this.handleICDDiaClose()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.patientInfo-container {
		h2.caption {
			font-size: 16px;
			font-weight: bold;
			text-align: center;
		}
		.resident-hospital, .baseinfo {
			border: 1px solid #ececec;
			padding: 19px 3px;
			margin: 12px 0;
			position: relative;
			border-radius: 0.5em;
			p {
				position: absolute;
				top: -11px;
				left: 6px;
				background-color: #fff;
			}
			span {
				position: absolute;
				top: -11px;
				left: 6px;
				background-color: #fff;
			}
		}
		.province {
			/deep/ .el-form-item__label {
				width: 75px !important;
			}
		}
		.city {
			/deep/ .el-form-item__label {
				width: 35px !important;
			}
			/deep/ .el-form-item__content {
				margin-left: 40px !important;
			}
		}
		.area {
			/deep/ .el-form-item__label {
				width: 55px !important;
			}
			/deep/ .el-form-item__content {
				margin-left: 55px !important;
			}
		}
		/deep/ .el-form-item {
			margin-bottom: 0px;
		}
	}
	.fix-width-80 {
		width: 80%;
		/deep/ .el-form-item__content{
			width: 100%;
		}
	}
</style>

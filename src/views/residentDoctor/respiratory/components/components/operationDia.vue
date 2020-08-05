<template>
	<div class="operationDia-container">
		<el-dialog
			title="手术附加表"
			:visible.sync="operationDiaVis"
			width="55%"
			:before-close="handleCancel">
			<el-row>
				<el-col :span="11">
					{{showData}}
					<el-card shadow="never">
						<el-radio-group v-model="ICDType" class="radiobox">
							<el-radio :label="'pin'">ICD拼音码</el-radio>
							<el-radio :label="'ming'">ICD名称</el-radio>
							<el-radio :label="'bian'">ICD编码</el-radio>
						</el-radio-group>
						<el-input v-model="ICDKey" style="width:100%;margin-top:15px;" size="mini" @keydown.enter.native="infoSelect"></el-input>
					</el-card>
					<el-tabs v-model="activeName" type="card" @tab-click="handleClick" style="margin-top:10px;">
						<el-tab-pane label="全部" name="third">
							<el-table
							ref="departmentTable"
							:data="allICDData"
							border
							style="width: 100%;height:38vh;overflow-y:auto;"
							class="table-box"
							size="mini"
							highlight-current-row
							@row-click="handleDepartmentRowClick"
							>
									<el-table-column prop="ICD10" label="ICD编码"></el-table-column>
									<el-table-column prop="ICD10Name" label="ICD名称"></el-table-column>
									<el-table-column prop="ICD10HeadPY" label="ICD拼音码"></el-table-column>
								</el-table>
						</el-tab-pane>
						<el-tab-pane label="科室" name="first">
							<el-table
							ref="departmentTable"
							:data="departmentICDData"
							border
							style="width: 100%;height:38vh;overflow-y:auto;"
							class="table-box"
							size="mini"
							highlight-current-row
							@row-click="handleDepartmentRowClick"
							>
									<el-table-column prop="ICD10" label="ICD编码"></el-table-column>
									<el-table-column prop="ICD10Name" label="ICD名称"></el-table-column>
									<el-table-column prop="ICD10HeadPY" label="ICD拼音码"></el-table-column>
								</el-table>
						</el-tab-pane>
						<el-tab-pane label="个人" name="second">
							<el-table
							ref="personTable"
							:data="personalICDData"
							border
							style="width: 100%;height:38vh;overflow-y:auto;"
							class="table-box"
							size="mini"
							highlight-current-row
							@row-click="handleDepartmentRowClick"
							>
								<el-table-column prop="ICD10" label="ICD编码"></el-table-column>
								<el-table-column prop="ICD10Name" label="ICD名称"></el-table-column>
								<el-table-column prop="ICD10HeadPY" label="ICD拼音码"></el-table-column>
							</el-table>
						</el-tab-pane>
					</el-tabs>
			</el-col>
			<el-col :span="2">
				<div class="btn-box">
					<div class="text-center">
						<el-button type="primary" size="mini" class="btn" @click="handleToRight">
							<i class="el-icon-arrow-right"></i>
						</el-button>
					</div>
					<div class="text-center" style="margin-top:25px;">
						<el-button type="primary" size="mini" class="btn" @click="handleToLeft">
							<i class="el-icon-arrow-left"></i>
						</el-button>
					</div>
				</div>
			</el-col>
			<el-col :span="11">
				<div class="diagnosis-filter">
					<el-radio-group v-model="diagnosisType">
						<el-radio :label="1">手术名称</el-radio>
					</el-radio-group>
				</div>
				<el-table
						ref="monthlyPlanTable"
						class="fixthheader"
						:data="tableData"
						border
						style="width: 100%;margin-top:10px;height:38vh;overflow-y:auto;"
						size="mini"
						highlight-current-row
						@selection-change="handleSelectionChange"
					>
						<el-table-column type="selection"></el-table-column>
						<el-table-column prop="ICD10Name" label="ICD名称"></el-table-column>
						<el-table-column prop="ICD10" label="ICD编码"></el-table-column>
					</el-table>
			</el-col>
		</el-row>
		<div class="text-right">
			<el-button type="primary" @click="handleSave">确定</el-button>
			<el-button type="plain" @click="handleCancel">取消</el-button>
		</div>
	</el-dialog>
	</div>
</template>

<script type="text/javascript">
	import { mapState, createNamespacedHelpers } from 'vuex'
	import handleActiveX from '@/utils/activeX'
	import { deepCopy } from '@/utils/utils'

	const { mapActions } = createNamespacedHelpers('residentDoctor')

	export default {
		name: 'OperationDia',
		props: ['operationDiaVis'],
		data () {
			return {
				allICDData: [],
				departmentICDData: [],
				personalICDData: [],
				// 保存
				// 右边列表加载
				rightIndex: 0,
				ICDType: 'pin',
				ICDKey: '',
				activeName: 'first',
				tableData: [],
				hasDepartmentRow: null,
				hasPersonRow: null,
				tabIndex: 0,
				diagnosisType: 3,
				diagnosisCNOrEN: 1,
				juniorDiag: [],
				fixDiag: [],
				inHospitalDiag: [],
				outHospitalDiag: [],
				westDoc: [],
				cnDoc: [],
				getAllSection: '',
				clickedToRightNode: null,
				clickedToLeftNodes: null,
				diagnosisData: null,
				showData: null
			}
		},
		computed: {
			...mapState({
				deptID: state => state.global.deptID,
				patientInfo: state => state.residentDoctor.patientInfo
			})
		},
		mounted () {
			// 初始化activeX对象
			Evtbus.$on('initActiveXObject', () => {
				this.initActiveXObject()
			})
		},
		watch: {
			operationDiaVis (val) {
				if (val) {
					this.getAllICDs()
					// this.getEnableDiagnosisType()
					// this.getDiagnosisInfo()
				}
			},
			diagnosisCNOrEN (val) {
				this.tableData = []
				this.clickedToLeftNodes = []
				this.getAllICDs()
			}
		},
		mounted () {
			this.$nextTick(function () {
				// 默认设置第一行高亮
				// this.$refs.monthlyPlanTable.setCurrentRow(this.tableData[0])
				// this.$refs.departmentTable.setCurrentRow(this.depatmentData[0])
				// this.$refs.personTable.setCurrentRow(this.personData[0])
			})
		},
		methods: {
			...mapActions([
				'GET_OPERATION_ICD',
				'GET_ENABLE_DIAGNOSIS_TYPE',
				'GET_DIAGNOSIS_INFO',
				'GET_AllICD',
				'DIAGNOSIS_SAVE_CHECK',
				"GET_RIGHTTAB",
				"SAVE_BTN"
			]),
			initActiveXObject () {
				handleActiveX.init(document.getElementById('oframe' + Evtbus.objectId))
			},
			getAllICDs () {
				let LoadType = 0, sid = '10000'
				if (this.activeName === 'first') {
					LoadType = 0
				} else if (this.activeName === 'second') {
					LoadType = 1
				} else if (this.activeName === 'third') {
					LoadType = 2
				}
				if (LoadType === 0) {
					sid = this.deptID
				} else if (LoadType === 1) {
					sid = this.patientInfo.VISIT_ID
				}
				const args = {
					LoadType: LoadType
				}
				if (sid) {
					args.sid = sid
				}
				if (this.ICDType === 'pin') {
					args.ICDpy = 1
				}
				if (this.ICDType === 'ming') {
					args.ICDname = 1
				}
				if (this.ICDType === 'bian') {
					args.ICDid = 1
				}
				if (this.ICDKey) {
					args.inputTxt = this.ICDKey
				}
				this.GET_OPERATION_ICD(args).then((res) => {
					if (res.code === 1) {
						if (this.activeName === 'first') {
							this.departmentICDData = res.values
						}
						if (this.activeName === 'second') {
							this.personalICDData = res.values
						}
						if (this.activeName === 'third') {
							// this.allICDData = res.values
						}					
					}
				})
			},
			getEnableDiagnosisType () {
				this.getAllSection = handleActiveX.getCurrentSection()
				this.GET_ENABLE_DIAGNOSIS_TYPE({
					strSectionName: handleActiveX.getCurrentSection()
				}).then((res) => {
					this.juniorDiag = res.values2 // 初步
					this.fixDiag = res.values5 // 修正
					this.inHospitalDiag = res.values3 // 入院
					this.outHospitalDiag = res.values6 // 出院
					this.westDoc = res.values // 西医
					this.cnDoc = res.values4 // 中医
					if (this.juniorDiag[1] === 1) {
						this.diagnosisType = 1
					} else if (this.fixDiag[1] === 1) {
						this.diagnosisType = 2
					} else if (this.inHospitalDiag[1] === 1) {
						this.diagnosisType = 3
					} else if (this.outHospitalDiag[1] === 1) {
						this.diagnosisType = 4
					}
					if (this.westDoc[1] === 1) {
						this.diagnosisCNOrEN = 1
					} else if (this.cnDoc[1] === 1) {
						this.diagnosisCNOrEN = 2
					}
				})
			},
			// 获取右侧诊断数据
			getDiagnosisInfo () {
				this.GET_DIAGNOSIS_INFO({
					strSectionName: handleActiveX.getAllSection()
				}).then((res) => {
					if (res.code === 1) {
						this.diagnosisData = res
					}
				})
			},
			// 搜索
			infoSelect () {
				this.getAllICDs()
			},
			handleClick (tab) {
				this.getAllICDs()
			},
			handleSelectionChange(row) {
				// TODO 该功能未实现
				this.clickedToLeftNodes = row[0]
			},
			handleSave () {
				if (this.tableData.length <= 0 ) {
					this.$message.error('请先选择ICD')
					return
				}
				if (!this.clickedToLeftNodes) {
					this.$message.error('请选择一个主诊断')
					return
				}
				const listData = []
				this.tableData.forEach((item, index) => {
					listData.push(deepCopy(item))
					if (this.clickedToLeftNodes.KindID === item.KindID) {
						listData[index].isMc = 1
					}
				})
				handleActiveX.tools.insertOrUpdateOperation(this.tableData)
				this.handleCancel()
			},
			handleToRight () {
				if (!this.clickedToRightNode) {
					this.$message.error('请先选择ICD')
					return
				}
				const existNode = this.tableData.filter((item) => item.ICD10HeadPY === this.clickedToRightNode.ICD10HeadPY)
				if (existNode.length > 0) {
					this.$message.error('请勿重复选择')
					return
				}
				this.tableData.push(this.clickedToRightNode)
			},
			handleToLeft () {
				if (this.tableData.length <= 0) {
					this.$message.error('请先添加ICD')
					return
				}
				if (this.clickedToLeftNodes.length <= 0) {
					this.$message.error('清先选择ICD')
					return
				}
				const delNodes = []
				this.clickedToLeftNodes.forEach(item => {
					delNodes.push(item.ICD10HeadPY)
				})
				const leftNodes = this.tableData.filter(item => {
					if (!delNodes.includes(item.ICD10HeadPY)) return item
				})
				this.tableData = leftNodes
				this.clickedToLeftNodes = []
			},
			handleDepartmentRowClick (val) {
				this.clickedToRightNode = val
			},
			handleCancel () {
				this.$parent.operationDiaVis = false
				this.$parent.handleIframeMask(false)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.operationDia-container {
		.diagnosis-filter {
			border: 1px solid #EBEEF5;
			padding: 10px;
		}
		.fixthheader {
			/deep/ .el-table__header-wrapper {
				th:first-child {
					.cell {
						width: 80px;
						.el-checkbox {
							display: none;
						}
					}
					.cell::after {
						content: '主次'
					}
				}
			}
		}
	}
</style>

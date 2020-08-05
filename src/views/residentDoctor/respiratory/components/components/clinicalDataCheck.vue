<template>
	<div class="clinicalDataCheck-container">
		<div class="check-main">
			<div class="resultlist">
				<el-table
				:data="checkTableData"
				@row-click="handleRowClick"
				style="width: 100%">
					<el-table-column
						prop="PatientID"
						label="检查号">
					</el-table-column>
					<el-table-column
						prop="ItemName"
						label="项目名称">
					</el-table-column>
					<el-table-column
						prop="ReportTime"
						label="报告日期">
					</el-table-column>
					<el-table-column
						prop="ExecTime"
						label="检查日期">
					</el-table-column>
					<el-table-column
						prop="ApplyDoctor"
						label="申请人">
					</el-table-column>
					<el-table-column
						prop="ExecDept"
						label="送诊科室">
					</el-table-column>
					<el-table-column
						prop="ApplyNo"
						label="申请号">
					</el-table-column>
				</el-table>
			</div>
			<div class="resultdetail">
				<div class="border">
					<ul>
						<li class="detail-item" v-for="item in checkDetail">
							<div class="checkbox"><el-checkbox v-model="item.checked"></el-checkbox></div>
							<div class="checktext">{{item.text}}</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="handlerbtn-box text-right">
			<el-checkbox v-model="cutProjectName">去掉项目名称</el-checkbox>
			<el-button type="primary" size="mini" class="ml10" @click="handleInsertToDoc">导入</el-button>
			<el-button type="primary" size="mini" @click="handleBack">关闭</el-button>
		</div>
	</div>
</template>

<script type="text/javascript">
	import { mapState, createNamespacedHelpers } from 'vuex'
	import handleActiveX from '@/utils/activeX'
	import Evtbus from '@/utils/bus'

	const { mapActions } = createNamespacedHelpers('residentDoctor')

	export default {
		name: 'ClinicalDataCheck',
		data () {
			return {
				checkTableData: [],
				checkDetail: [],
				currentRowObj: null,
				cutProjectName: false
			}
		},
		computed: {
			...mapState({
				patientInfo: state => state.residentDoctor.patientInfo
			})
		},
		inject: ['self'],
		created () {
			this.getClinicalDataCheckOne()
		},
		mounted () {
			// 初始化activeX对象
			Evtbus.$on('initActiveXObject', () => {
				this.initActiveXObject()
			})
		},
		methods: {
			...mapActions([
				'GET_CLINICAL_DATA_CHECK_ONE',
				'GET_CLINICAL_DATA_CHECK_TWO'
			]),
			initActiveXObject () {
				handleActiveX.init(document.getElementById('oframe' + Evtbus.objectId))
			},
			getClinicalDataCheckOne () {
				this.GET_CLINICAL_DATA_CHECK_ONE({
					visit_Id: this.patientInfo.VISIT_ID
				}).then((res) => {
					if (res.code === 1) {
						this.checkTableData = res.values
						if (this.checkTableData && this.checkTableData.length > 0) {
							this.currentRowObj = this.checkTableData[0]
							this.getClinicalDataCheckTwo(this.currentRowObj)
						}
					}
				})
			},
			getClinicalDataCheckTwo (rowObj) {
				const args = {
					PatientID: rowObj.PatientID,
					visit_Id: this.patientInfo.VISIT_ID
				}
				if (rowObj.ApplyNo) {
					args.ApplyNo = rowObj.ApplyNo
				}
				this.GET_CLINICAL_DATA_CHECK_TWO(args).then((res) => {
					this.checkDetail = []
					if (res.code === 1) {
						if (res.values) {
							this.checkDetail.push({
								checked: false,
								text: res.values
							})
						}
						if (res.values2) {
							this.checkDetail.push({
								checked: false,
								text: res.values2
							})
						}
						if (res.values3) {
							this.checkDetail.push({
								checked: false,
								text: res.values3
							})
						}
					}
				})
			},
			handleRowClick (rowObj) {
				this.currentRowObj = rowObj
				this.getClinicalDataCheckTwo(rowObj)
			},
			handleInsertToDoc () {
				let insertContent = ''
				if (!this.cutProjectName) {
					insertContent = this.currentRowObj.ItemName + ' '
				}
				this.checkDetail.forEach(item => {
					if (item.checked) {
						insertContent += (item.text + ' ')
					}
				})
				if (handleActiveX.obj) {
					handleActiveX.setText(insertContent, 0)
				} else {
					console.log('当前操作文档为空')
				}
				this.handleBack()			
			},
			handleBack () {
				this.self.handleCancelInsert()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.clinicalDataCheck-container {
		.check-main {
			display: flex;
			.resultlist {
				width: 40%;
				border:1px solid gray;
			}
			.resultdetail {
				width: 60%;
				padding-left: 15px;
				.border {
					border:1px solid gray;
					.detail-item {
						display: flex;
						padding: 5px 0;
					}
					.detail-item {
						display: flex;
						line-height: 1.5;
						padding-left: 5px;
						.checkbox {
							margin-right: 5px;
						}
					}
				}
			}
		}
		.handlerbtn-box {
			padding: 10px 0;
		}
	}
</style>

<template>
	<div class="clinicalDataAnalyzeResult-container">
		<div class="patientinfo">
			<span class="title">详情</span>
			<div class="mt20 pl10" style="line-height: 2">申请单号：12411211</div>
			<div class="detail clearfix">
				<div class="item">
					<div class="row">
						<span class="d_title">姓名:</span>
						<span class="d_content">{{hisPatientinfo && hisPatientinfo.lblPatName}}</span>
					</div>
					<div class="row">
						<span class="d_title">病历号:</span>
						<span class="d_content">{{hisPatientinfo && hisPatientinfo.lblHospNo}}</span>
					</div>
					<div class="row">
						<span class="d_title">标本种类:</span>
						<span class="d_content">{{hisPatientinfo && hisPatientinfo.lblSample}}</span>
					</div>
					<div class="row">
						<span class="d_title">病区:</span>
						<span class="d_content">{{hisPatientinfo && hisPatientinfo.lblWard}}</span>
					</div>
					<div class="row">
						<span class="d_title">检验日期:</span>
						<span class="d_content">{{hisPatientinfo && hisPatientinfo.lblExecTime}}</span>
					</div>
				</div>
				<div class="item">
					<div class="row">
						<span class="d_title">性别:</span>
						<span class="d_content">{{hisPatientinfo && hisPatientinfo.lblSex}}</span>
					</div>
					<div class="row">
						<span class="d_title">科别:</span>
						<span class="d_content">{{hisPatientinfo && hisPatientinfo.lblExecDept}}</span>
					</div>
					<div class="row">
						<span class="d_title">送检日期:</span>
						<span class="d_content">{{hisPatientinfo && hisPatientinfo.lblReceiveTime}}</span>
					</div>
					<div class="row">
						<span class="d_title">送检医师:</span>
						<span class="d_content">{{hisPatientinfo && hisPatientinfo.lblToDocName}}</span>
					</div>
					<div class="row">
						<span class="d_title">报告日期:</span>
						<span class="d_content">{{hisPatientinfo && hisPatientinfo.lblReportTime}}</span>
					</div>
				</div>
				<div class="item">
					<div class="row">
						<span class="d_title">年龄:</span>
						<span class="d_content">{{hisPatientinfo && hisPatientinfo.lblAge}}</span>
					</div>
					<div class="row">
						<span class="d_title">床号:</span>
						<span class="d_content">{{hisPatientinfo && hisPatientinfo.lblBedNo}}</span>
					</div>
					<div class="row">
						<span class="d_title">采样日期:</span>
						<span class="d_content">{{hisPatientinfo && hisPatientinfo.lblSampleTime}}</span>
					</div>
					<div class="row">
						<span class="d_title">检验医师:</span>
						<span class="d_content">{{hisPatientinfo && hisPatientinfo.lblExecDocName}}</span>
					</div>
					<div class="row">
						<span class="d_title">核对者:</span>
						<span class="d_content">{{hisPatientinfo && hisPatientinfo.lblVerifierName}}</span>
					</div>
				</div>
				<div class="item">
					<div class="row">
						<span class="d_title">培养结果:</span>
						<span class="d_content">{{hisPatientinfo && hisPatientinfo.lbPyjgz}}</span>
					</div>
				</div>
			</div>
		</div>
		<div class="report-box">
			<div class="reportlist">
				<el-table
				:data="reportTableData"
				@row-click="handleRowClick"
				style="width: 100%">
					<el-table-column
						prop="ExamName"
						label="报告类型">
					</el-table-column>
					<el-table-column
						prop="ReportTime"
						label="报告日期">
					</el-table-column>
				</el-table>
			</div>
			<div class="reportitem">
				<div class="border">
					<el-table
					border
					ref="multipleTable"
					:data="reportDetailTableData"
					@selection-change="handleSelectionChange"
					style="width: 100%">
						<el-table-column
							type="selection"
							label="选择">
						</el-table-column>
						<el-table-column
							prop="ItemName"
							label="项目名称">
						</el-table-column>
						<el-table-column
							prop="name"
							label="抗生素名称">
						</el-table-column>
						<el-table-column
							label="结果">
							<template slot-scope="scoped">
								<span :class="String(scoped.row.newResult).indexOf('↑') > -1 || String(scoped.row.newResult).indexOf('↓') > -1 ? 'red' : ''">{{scoped.row.newResult}}</span>
							</template>
						</el-table-column>
						<el-table-column
							prop="REFERENCERANGE"
							label="参考值">
						</el-table-column>
						<el-table-column
							prop="UNIT"
							label="单位">
						</el-table-column>
					</el-table>
				</div>
			</div>
		</div>
		<div class="handlerbtn-box text-right">
			<el-checkbox v-model="cutTypeName">去掉类型名称</el-checkbox>
			<el-checkbox v-model="contentNormal">正常</el-checkbox>
			<el-checkbox v-model="chooseAll">全选</el-checkbox>
			<!-- TODO 存在多个报告类型时，需要缓存每次选择的结果，供插入文档，由于没有数据，暂时不实现 -->
			<!-- <el-button type="primary" size="mini" class="ml10">清空缓存</el-button> -->
			<!-- <el-button type="primary" size="mini">缓存</el-button> -->
			<el-button type="primary" size="mini" @click="handleInsertToDoc" class="ml10">导入</el-button>
			<el-button type="primary" size="mini" @click="handleBack">返回</el-button>
		</div>
	</div>
</template>

<script type="text/javascript">
	import { mapState, createNamespacedHelpers } from 'vuex'
	import handleActiveX from '@/utils/activeX'
	import Evtbus from '@/utils/bus'

	const { mapActions } = createNamespacedHelpers('residentDoctor')

	export default {
		name: 'ClinicalDataAnalyzeResult',
		data() {
			return {
				reportTableData: [],
				reportDetailTableData: [],
				multipleSelection: [],
				hisPatientinfo: null,
				cutTypeName: false,
				contentNormal: false,
				chooseAll: false
			}
		},
		computed: {
			...mapState({
				patientInfo: state => state.residentDoctor.patientInfo
			})
		},
		inject: ['self'],
		created () {
			this.getClinicalDataAnalyzeOne()
		},
		mounted () {
			// 初始化activeX对象
			// handleActiveX.init(document.all.oframe)
			Evtbus.$on('initActiveXObject', () => {
				this.initActiveXObject()
			})
		},
		watch: {
			chooseAll (val) {
				if(val) {
					this.$refs.multipleTable.toggleAllSelection()
				} else {
					this.$refs.multipleTable.clearSelection()
				}
			}
		},
		methods: {
			...mapActions([
				'GET_CLINICAL_DATA_ANALYZE_ONE',
				'GET_CLINICAL_DATA_ANALYZE_TWO'
			]),
			initActiveXObject () {
				handleActiveX.init(document.getElementById('oframe' + Evtbus.objectId))
			},
			getClinicalDataAnalyzeOne () {
				this.GET_CLINICAL_DATA_ANALYZE_ONE({
					visitid: this.patientInfo.VISIT_ID
					// visitid: '0032_2013030407263964000'
				}).then((res) => {
					if (res.code === 1) {
						const hisPatientinfo = res.values && res.values[0]
						if (hisPatientinfo && hisPatientinfo.ApplyNo) {
							this.reportTableData = res.values
							this.currentRowObj = hisPatientinfo
							this.getClinicalDataAnalyzeTwo(hisPatientinfo.ApplyNo)
						}
						
					}
				})
			},
			getClinicalDataAnalyzeTwo (ApplyNo) {
				this.GET_CLINICAL_DATA_ANALYZE_TWO({
					ApplyNo: ApplyNo
				}).then((res) => {
					if (res.code === 1) {
						const toggleSelection = []
						this.hisPatientinfo = res.values2
						this.reportDetailTableData = res.values
						this.reportDetailTableData.forEach((item, index) => {
							let range = item.REFERENCERANGE && item.REFERENCERANGE.split('-')
							if (range.length > 0) {
								if (item.RESULT < range[0]) {
									item.newResult = item.RESULT + '↓'
									toggleSelection.push(index)
								} else if (item.RESULT > range[1]) {
									item.newResult = item.RESULT + '↑'
									toggleSelection.push(index)
								} else {
									item.newResult = item.RESULT
								}
							}
						})
						this.handleToggleSelection(toggleSelection)
					}
				})
			},
			handleSelectionChange(val) {
				this.multipleSelection = val
			},
			handleRowClick (rowObj) {
				this.currentRowObj = rowObj
				this.getClinicalDataAnalyzeTwo(rowObj.ApplyNo)
			},
			handleToggleSelection (toggleArr) {
				toggleArr.forEach(item => {
					this.$refs.multipleTable.setCurrentRow(this.reportDetailTableData[item])
				})
			},
			handleInsertToDoc () {
				let insertContent = ''
				if (!this.cutTypeName) {
					insertContent = this.currentRowObj.ExamName + ' ' + this.currentRowObj.ReportTime + ' '
				}
				this.multipleSelection.forEach(item => {
					insertContent += (item.ItemName + ' ' + item.RESULT + ' ' + item.UNIT + ' ')
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
	.clinicalDataAnalyzeResult-container{
		padding-top: 8px;
		.patientinfo {
			border:1px solid gray;
			border-radius: 2px;
			position: relative;
			min-height: 20px;
			.title {
				position: absolute;
				background-color: white;
				padding: 0 2px;
				left: 10px;
				top: -10px;
			}
			.detail {
				height: 150px;
				.item {
					width: 25%;
					float: left;
					.row {
						line-height: 2;
						padding-left: 10px;
						height: 30px;
						overflow: hidden;
						.d_title {
							display: inline-block;
							width: 70px;
							border:1px solid transparent;
						}
						.d_content {

						}
					}
				}
			}
		}
		.report-box {
			margin-top: 15px;
			display: flex;
			.reportlist {
				width: 30%;
				max-height: 300px;
				overflow-y: auto;
				border:1px solid gray;
			}
			.reportitem {
				width: 70%;
				max-height: 300px;
				overflow-y: auto;
				padding-left: 15px;
				.border {
					border:1px solid gray;
					.red {
						color: red;
					}
				}
			}
		}
		.handlerbtn-box {
			padding: 10px 0;
		}
	}
</style>

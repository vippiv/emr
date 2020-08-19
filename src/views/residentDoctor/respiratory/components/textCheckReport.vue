<template>
	<div class="text-check-report-container">
		<el-table
			:data="tableData"
			size="mini"
			border
			class="mb10"
			@row-click="handleRowClick"
			style="width: 100%">
			<el-table-column
			prop="ApplyNo"
			label="检查号"
			width="180">
			</el-table-column>
			<el-table-column
			prop="ItemName"
			label="项目名称"
			width="180">
			</el-table-column>
			<el-table-column
			prop="ReportDoctorName"
			label="报告人">
			</el-table-column>
			<el-table-column
			prop="ExecTime"
			label="检查日期">
			</el-table-column>
			<el-table-column
			prop="ExecDept"
			label="执行科室">
			</el-table-column>
			<el-table-column
			prop="ApplyDoctor"
			label="申请人">
			</el-table-column>
			<el-table-column
			prop="ApplyTime"
			label="申请日期">
			</el-table-column>
			<el-table-column
			prop="ApplyDeptName"
			label="申请部门">
			</el-table-column>
            <el-table-column
			prop="Status"
			label="状态">
			</el-table-column>
            <el-table-column
			prop="PatientID"
			label="pacs号">
			</el-table-column>
		</el-table>
        <table border="1" class="report-detail">
            <tr>
                <td style="width: 100px">检查部位</td>
                <td>{{lblBW}}</td>
            </tr>
            <tr>
                <td>检查所见</td>
                <td>{{lblJCSJ}}</td>
            </tr>
            <tr>
                <td>检查结论</td>
                <td>{{lblJCJL}}</td>
            </tr>
            <tr>
                <td>典型病例</td>
                <td>{{lblDXBL}}</td>
            </tr>
            <tr>
                <td>病人随访</td>
                <td>{{lblBRSF}}</td>
            </tr>
            <tr>
                <td>阳性病例</td>
                <td>{{lblYXBL}}</td>
            </tr>
        </table>
	</div>
</template>

<script type="text/javascript">
	import * as originAction from 'vuex'
	const { mapActions } = originAction.createNamespacedHelpers('residentDoctor')
	export default {
		name: 'TextCheckReport',
		data () {
			return {
                recordHistory: false,
                activeName: 'first',
				tableData: [],
				lblBW: '',
				lblJCSJ: '',
				lblJCJL: '',
				lblDXBL: '',
				lblBRSF: '',
				lblYXBL: ''
			}
		},
		computed: {
			...originAction.mapState({
				patientInfo: state => state.residentDoctor.patientInfo
			})
		},
		created () {
			this.actionGetTextCheckReport()
		},
		methods: {
			...mapActions([
				'GET_TEXT_CHECK_REPORT',
				'GET_TEXT_CHECK_REPORT_DETAIL'
			]),
			handleRowClick(obj) {
				this.actionGetTextCheckReportDetail(obj)
			},
			actionGetTextCheckReport () {
				this.GET_TEXT_CHECK_REPORT({
					visitid: this.patientInfo.VISIT_ID
				}).then((res) => {
					if (res.code === 1) {
						this.tableData = res.values
					}
				})
			},
			actionGetTextCheckReportDetail (obj) {
				this.GET_TEXT_CHECK_REPORT_DETAIL({
					visitId: this.patientInfo.VISIT_ID,
					ApplyNo: obj.ApplyNo,
					PatientID: obj.PatientID
				}).then((res) => {
					if (res.code === 1) {
						const data = res.values
						this.lblBW = data.lblBW
						this.lblJCSJ = data.lblJCSJ
						this.lblJCJL = data.lblJCJL
						this.lblDXBL = data.lblDXBL
						this.lblBRSF = data.lblBRSF
						this.lblYXBL = data.lblYXBL
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.text-check-report-container {
		height: 100%;
		background-color: white;
		padding: 10px 10px 0 10px;
        .report-detail {
			width: 100%;
			line-height: 2;
			tr {
				td:first-child {
					padding-left: 10px;
				}
				td {
					border-color: #eee;
				}
			}
		}
	}
</style>

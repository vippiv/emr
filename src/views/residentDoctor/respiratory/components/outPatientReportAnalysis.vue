<template>
	<div class="out-patient-report-analysis-container">
        <div class="mb10"><el-checkbox v-model="recordHistory">显示此患者历次检验记录</el-checkbox></div>
		<el-table
			:data="tableData"
			size="mini"
			border
            @row-click="handleRowClick"
            class="mb10"
			style="width: 100%">
			<el-table-column
			prop="ApplyNo"
			label="检验医嘱号"
			width="180">
			</el-table-column>
			<el-table-column
			prop="SlaveName"
			label="样本类型"
			width="180">
			</el-table-column>
			<el-table-column
			prop="ExamName"
			label="项目名称">
			</el-table-column>
			<el-table-column
			prop="ExecDept"
			label="执行科室">
			</el-table-column>
			<el-table-column
			prop="ExecTime"
			label="检验时间">
			</el-table-column>
			<el-table-column
			prop="ApplyTime"
			label="申请时间">
			</el-table-column>
			<el-table-column
			prop="ToDocName"
			label="申请人">
			</el-table-column>
			<el-table-column
			prop="ApplyDeptName"
			label="申请科室">
			</el-table-column>
		</el-table>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="检验结果" name="first">
                <div class="check-result">
                    <div class="left">
                        <el-table
                            :data="detailTableData"
                            size="mini"
                            border
                            @row-click="handleDetailRowClick"
                            style="width: 100%">
                            <el-table-column
                            prop="ItemName"
                            label="项目名称">
                            </el-table-column>
                            <el-table-column
                            prop="ItemCode"
                            label="项目代码">
                            </el-table-column>
                            <el-table-column
                            prop="RESULT"
                            label="结果">
                            </el-table-column>
                            <el-table-column
                            prop="UNIT"
                            label="单位">
                            </el-table-column>
                            <el-table-column
                            prop="REFERENCERANGE"
                            label="参考范围">
                            </el-table-column>
                        </el-table>
                    </div>
                    <div class="right">
                        <el-table
                            :data="itemTableData"
                            size="mini"
                            border
                            style="width: 100%">
                            <el-table-column
                            prop="ResultTime"
                            label="日期">
                            </el-table-column>
                            <el-table-column
                            prop="RESULT"
                            label="值">
                            </el-table-column>
                            <el-table-column
                            prop="UNIT"
                            label="单位">
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="细菌结果" name="second">
                <el-table
                    :data="bacteriaTableData"
                    size="mini"
                    border
                    style="width: 100%">
                    <el-table-column
                    prop="micro_data_id_name"
                    label="微生物名称"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="ItemName"
                    label="抗生素"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="RESULT"
                    label="MIC">
                    </el-table-column>
                     <el-table-column
                    prop="RESULT2"
                    label="敏感度">
                    </el-table-column>
                     <el-table-column
                    prop=""
                    label="菌量">
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>
	</div>
</template>

<script type="text/javascript">
    import * as originAction from 'vuex'
    const { mapActions } = originAction.createNamespacedHelpers('residentDoctor')
    
	export default {
		name: 'OutPatientReportAnalysis',
		data () {
			return {
                recordHistory: false,
                activeName: 'first',
                tableData: [],
                detailTableData: [],
                bacteriaTableData: [],
                itemTableData: []
			}
        },
        computed: {
			...originAction.mapState({
				patientInfo: state => state.residentDoctor.patientInfo
			})
        },
        created () {
            this.actionGetAnalysisReports()
        },
		methods: {
            ...mapActions([
                'OUTPATIENT_GET_ANALYSIS_REPORTS',
                'OUTPATIENT_GET_ANALYSIS_REPORT_DETAIL',
                'OUTPATIENT_GET_ANALYSIS_ITEM_DETAIL'
            ]),
			handleSearch() {},
            handleQuit() {},
            handleRowClick (obj) {
                this.actionGetAnalysisReportDetail(obj)
            },
            handleDetailRowClick (obj) {
                this.actionGetAnalysisItemDetail(obj)
            },
            actionGetAnalysisReports () {
                this.OUTPATIENT_GET_ANALYSIS_REPORTS({
                    visitId: this.patientInfo.VISIT_ID
                }).then((res) => {
                    if (res.code === 1) {
                        this.tableData = res.values
                    }
                })
            },
            actionGetAnalysisReportDetail (obj) {
                this.OUTPATIENT_GET_ANALYSIS_REPORT_DETAIL({
                    applyNo: obj.ApplyNo
                }).then((res) => {
                    if (res.tag === 1) {
                        this.bacteriaTableData = res.values
                    } else if (res.tag === 0) {
                        this.detailTableData = res.values
                    }
                })
            },
            actionGetAnalysisItemDetail (obj) {
                this.OUTPATIENT_GET_ANALYSIS_ITEM_DETAIL({
                    OutpatientNo: obj.OutpatientNo,
                    itemCode: obj.ItemCode
                }).then((res) => {
                    if (res.code === 1) {
                        this.itemTableData = res.values
                    }
                })
            },
		}
	}
</script>

<style lang="scss" scoped>
	.out-patient-report-analysis-container {
        height: 100%;
        background-color: white;
        padding: 10px 10px 0 10px;
        .check-result {
            display: flex;
            .left {
                width: 75%;
            }
            .right {
                width: 30%;
                padding-left: 10px;
            }
        }
        /deep/ .is-active {
            background-color: transparent !important;
            color: #409eff !important;
        }
	}
</style>

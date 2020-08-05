<template>
	<div class="clinicalDataDoctorAdvice-container">
		<el-table
		:data="doctorAdviceTableData"
		border
		style="width: 100%">
			<el-table-column
				prop="date"
				label="选择">
			</el-table-column>
			<el-table-column
				prop="name"
				label="类别">
			</el-table-column>
			<el-table-column
				prop="name"
				label="开始时间">
			</el-table-column>
			<el-table-column
				prop="name"
				label="医嘱内容">
			</el-table-column>
			<el-table-column
				prop="name"
				label="用法">
			</el-table-column>
			<el-table-column
				prop="name"
				label="频次">
			</el-table-column>
			<el-table-column
				prop="name"
				label="规格">
			</el-table-column>
			<el-table-column
				prop="name"
				label="剂量">
			</el-table-column>
			<el-table-column
				prop="name"
				label="包装数量">
			</el-table-column>
			<el-table-column
				prop="name"
				label="单位">
			</el-table-column>
			<el-table-column
				prop="name"
				label="停止时间">
			</el-table-column>
			<el-table-column
				width="180"
				prop="name"
				label="是否出院带药">
			</el-table-column>
		</el-table>
		<div class="handlerbtn-box text-right">
			<el-form inline label-width="80px" class="inline-block">
				<el-form-item label="医嘱类型">
					<el-select v-model="doctorAdviceType" placeholder="请选择" size="mini">
						<el-option label="全部" value="'0'"></el-option>
						<el-option label="长期" value="'1'"></el-option>
						<el-option label="临时" value="'2'"></el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<el-button type="primary" size="mini" class="ml10">导出院带药</el-button>
			<el-button type="primary" size="mini" @click="handleInsertToDoc">导入</el-button>
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
		name: 'ClinicalDataDoctorAdvice',
		data () {
			return {
				doctorAdviceType: 0,
				doctorAdviceTableData: []
			}
		},
		computed: {
			...mapState({
				patientInfo: state => state.residentDoctor.patientInfo
			})
		},
		inject: ['self'],
		created () {
			// this.getClinicalDataDoctorAdvice()
		},
		mounted () {
			// 初始化activeX对象
			Evtbus.$on('initActiveXObject', () => {
				this.initActiveXObject()
			})
		},
		methods: {
			...mapActions([
				'GET_CLINICAL_DATA_DOCTOR_ADVICE'
			]),
			initActiveXObject () {
				handleActiveX.init(document.getElementById('oframe' + Evtbus.objectId))
			},
			getClinicalDataDoctorAdvice () {
				this.GET_CLINICAL_DATA_DOCTOR_ADVICE({
					visit_Id: this.patientInfo.VISIT_ID,
					cmbCqls: 0
				}).then((res) => {
					if (res.code === 1) {
						this.checkTableData = res.values
						if (this.checkTableData && this.checkTableData.length > 0) {
							this.currentRowObj = this.checkTableData[0]
						}
					}
				})
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
	.clinicalDataDoctorAdvice-container {
		.handlerbtn-box {
			padding: 10px 0;
		}
	}
</style>

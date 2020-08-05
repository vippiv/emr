<template>
	<div class="clinicalDataMedisineRecord-container">
		<el-table
		:data="medisineRecordTableData"
		border
		style="width: 100%">
			<el-table-column
				prop="date"
				label="选择">
			</el-table-column>
			<el-table-column
				prop="name"
				label="诊断类型">
			</el-table-column>
			<el-table-column
				prop="name"
				label="序号">
			</el-table-column>
			<el-table-column
				prop="name"
				label="子号">
			</el-table-column>
			<el-table-column
				prop="name"
				label="诊断名称">
			</el-table-column>
			<el-table-column
				prop="name"
				label="诊断时间">
			</el-table-column>
		</el-table>
		<div class="handlerbtn-box text-right">
			<el-button type="primary" size="mini" @click="handleInsertToDoc">回写</el-button>
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
		name: 'ClinicalDataMedisineRecord',
		data () {
			return {
				medisineRecordTableData: null
			}
		},
		computed: {
			...mapState({
				patientInfo: state => state.residentDoctor.patientInfo
			})
		},
		inject: ['self'],
		created () {
			// this.getClinicalDataMedisineRecord()
		},
		mounted () {
			// 初始化activeX对象
			Evtbus.$on('initActiveXObject', () => {
				this.initActiveXObject()
			})
		},
		methods: {
			...mapActions([
				'GET_CLINICAL_DATA_MEDISION_RECORD'
			]),
			initActiveXObject () {
				handleActiveX.init(document.getElementById('oframe' + Evtbus.objectId))
			},
			getClinicalDataMedisineRecord () {
				this.GET_CLINICAL_DATA_MEDISION_RECORD({
					visit_Id: this.patientInfo.VISIT_ID,
					inTimes: 0
				}).then((res) => {
					if (res.code === 1) {
						this.medisineRecordTableData = res.values
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
	.clinicalDataMedisineRecord-container {
		.handlerbtn-box {
			padding: 10px 0;
		}
	}
</style>

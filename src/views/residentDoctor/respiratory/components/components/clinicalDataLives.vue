<template>
	<div class="clinicalDataLives-container">
		<el-table
		:data="livesTableData"
		border
		style="width: 100%">
			<el-table-column
				prop="date"
				label="选择">
			</el-table-column>
			<el-table-column
				prop="name"
				label="日期">
			</el-table-column>
			<el-table-column
				prop="name"
				label="时间点">
			</el-table-column>
			<el-table-column
				prop="name"
				label="名称">
			</el-table-column>
			<el-table-column
				prop="name"
				label="值">
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
				livesTableData: null
			}
		},
		computed: {
			...mapState({
				patientInfo: state => state.residentDoctor.patientInfo
			})
		},
		inject: ['self'],
		created () {
			// this.getClinicalDataLives()
		},
		mounted () {
			// 初始化activeX对象
			Evtbus.$on('initActiveXObject', () => {
				this.initActiveXObject()
			})
		},
		methods: {
			...mapActions([
				'GET_CLINICAL_DATA_LIVES'
			]),
			initActiveXObject () {
				handleActiveX.init(document.getElementById('oframe' + Evtbus.objectId))
			},
			getClinicalDataLives () {
				this.GET_CLINICAL_DATA_LIVES({
					visit_Id: this.patientInfo.VISIT_ID,
					inTimes: 0
				}).then((res) => {
					if (res.code === 1) {
						this.livesTableData = res.values
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
	.clinicalDataLives-container {
		.handlerbtn-box {
			padding: 10px 0;
		}
	}
</style>

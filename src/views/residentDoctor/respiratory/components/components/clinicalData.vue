<template>
	<div class="clinicalData-container">
		<el-dialog
			title="临床数据提取"
			:visible.sync="clinicalDataDiaVis"
			width="55%"
			:before-close="handleCancelInsert">
			<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
				<el-tab-pane label="检验结果" name="first">
					<clinicalDataAnalyze></clinicalDataAnalyze>
				</el-tab-pane>
				<el-tab-pane label="检查结果" name="second">
					<clinicalDataCheck></clinicalDataCheck>
				</el-tab-pane>
				<el-tab-pane label="医嘱提取" name="third">
					<clinicalDataDoctorAdvice></clinicalDataDoctorAdvice>
				</el-tab-pane>
				<el-tab-pane label="病历诊断" name="fourth">
					<clinicalDataMedisineRecord></clinicalDataMedisineRecord>
				</el-tab-pane>
				<el-tab-pane label="生命体征" name="fifth">
					<clinicalDataLives></clinicalDataLives>
				</el-tab-pane>
				<el-tab-pane label="病例摘要" name="sixth">
					病例摘要
				</el-tab-pane>
			</el-tabs>
		</el-dialog>
	</div>
</template>

<script type="text/javascript">
	import { createNamespacedHelpers } from 'vuex'
	import clinicalDataAnalyze from './clinicalDataAnalyze'
	import clinicalDataCheck from './clinicalDataCheck'
	import clinicalDataDoctorAdvice from './clinicalDataDoctorAdvice'
	import clinicalDataMedisineRecord from './clinicalDataMedisineRecord'
	import clinicalDataLives from './clinicalDataLives'

	const { mapActions } = createNamespacedHelpers('residentDoctor')
	export default {
		name: 'ClinicalData',
		props: ['clinicalDataDiaVis'],
		data () {
			return {
				activeName: 'first'
			}
		},
		components: {
			clinicalDataAnalyze,
			clinicalDataCheck,
			clinicalDataDoctorAdvice,
			clinicalDataMedisineRecord,
			clinicalDataLives
		},
		watch: {
			clinicalDataDiaVis (val) {}
		},
		provide () {
			return {
				self: this
			}
		},
		methods: {
			...mapActions([]),
			handleEmitInsert () {
				if (!this.tplForm.name) {
					this.$message.error('模板名称不能为空')
					return
				}
				if (!this.currentNode) {
					this.$message.error('请选择模板')
					return
				}
				// TODO 这里参数需要处理
				this.SAVE_TO_PERSONAL_MODULES({
					fileCode: '',
					mrCodeNew: '',
					personName: this.tplForm.name,
					fatherID: this.currentNode.id
				}).then((res) => {
					if (res.code === 1) {
						this.$message.success('保存成功')
						this.handleCancelInsert()
					}
				})
			},
			handleCancelInsert () {
				this.$parent.clinicalDataDiaVis = false
				this.$parent.handleIframeMask(false)
			},
			handleClick(tab, event) {
				console.log(tab, event);
			}
		}
	}
</script>

<style lang="scss" scoped></style>

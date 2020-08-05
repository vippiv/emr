<template>
	<div class="threelevelcheck-container">
		<h2 class="caption">医生等级设置</h2>
		<div class="resident-hospital">
			<el-form ref="form" label-width="80px">
				<el-row :gutter="10">
					<el-col :span="12">
						<el-form-item label="住院号:">{{patientInfo.VISIT_NO}}</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="住院医生:">{{patientInfo.INHOS_DOC}}</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="10">
					<el-col :span="12">
						<el-form-item label="主治医师:">
							<el-input v-model="indicationsDoctor" size="mini"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="主任医师:">
                            <el-input v-model="directorDoctor" size="mini"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row class="fix-margin text-right">
                    <el-button type="primary" size="mini" @click="handleDefaultDoctorSet">默认上级医生登记设定</el-button>
                    <el-button type="primary" size="mini" @click="handleClearIndicationsDoctor">清除上级医师</el-button>
                    <el-button type="primary" size="mini" @click="handleClearDirectorDoctor">清除主任医师</el-button>
                    <el-button type="primary" size="mini" @click="handleSave">确认</el-button>
                    <el-button type="primary" size="mini" @click="handleClose">取消</el-button>
                </el-row>
			</el-form>
		</div>
	</div>
</template>

<script type="text/javascript">
	import { createNamespacedHelpers } from 'vuex'

	const { mapActions } = createNamespacedHelpers('residentDoctor')

	export default {
		name: 'threeLevelCheck',
		props: {
			patientInfo: {
				type: Object,
				default: () => {}
			}
		},
		inject: ['self'],
		created () {
			this.assignmentVal()
		},
		data () {
			return {
				directorDoctor: '', // 主任医师
				indicationsDoctor: '' // 主治医师
			}
		},
		methods: {
			...mapActions([
				'DEFAULT_DOCTOR_SET',
				'SAVE_THREE_LEVEL_CHECK'
			]),
			assignmentVal () {
				// this.directorDoctor = this.patientInfo.ADM_DATE
				// this.indicationsDoctor = this.patientInfo.ID_NO
			},
			handleClearDirectorDoctor () {
				this.directorDoctor = ''
			},
			handleClearIndicationsDoctor () {
				this.indicationsDoctor = ''
			},
			handleDefaultDoctorSet () {
				this.DEFAULT_DOCTOR_SET({
					currentDoctorID: this.patientInfo.INHOS_DOC
				}).then((res) => {
					if (res.code === 1) {
						this.directorDoctor = res.values[0].Super // 主任医师
						this.indicationsDoctor = res.values[0].Parent // 主治医师
					}
				})
			},
			handleSave () {
				this.SAVE_THREE_LEVEL_CHECK({
					visitId: this.patientInfo.VISIT_ID,
					mainStaffId: this.indicationsDoctor,
					chiefStaffId: this.directorDoctor,
					currentDoctorID: this.patientInfo.INHOS_DOC
				}).then((res) => {
					if (res.code === 1) {
						this.$message.success('保存成功')
						this.handleClose()
					}
				})
			},
			handleClose () {
				this.self.handleCloseTopMeunDia()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.threelevelcheck-container {
        .gen {
            margin: 19px 0;
        }
		h2.caption {
			font-size: 16px;
			font-weight: bold;
			text-align: center;
		}
	}
</style>

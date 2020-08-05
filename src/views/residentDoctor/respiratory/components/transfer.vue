<template>
	<!-- TODO 需要连HIS，暂放 -->
	<div class="transfer-container">
		<h2 class="caption">移交病历</h2>
		<div class="resident-hospital">
			<p>病人信息</p>
			<el-form ref="form" :model="form" label-width="80px">
				<el-row :gutter="5">
					<el-col :span="8">
						<el-form-item label="住院号:">{{patientInfo.VISIT_NO}}</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="姓名:">{{patientInfo.PAT_NAME}}</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="性别:">{{patientInfo.CODE_NAME}}</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="5">
					<el-col :span="8">
						<el-form-item label="所属科室:">{{patientInfo.DEPT_NAME_CN}}</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="主治医生:">
							<span></span>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="床号:">{{patientInfo.BED_NO}}</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="5">
					<el-col :span="8">
						<el-form-item label="出生日期:">{{patientInfo.PAT_BIRTHDATE}}</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="年龄:">{{patientInfo.PATIENT_AGE}}</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="入院时间:">{{patientInfo.ADM_DATE}}</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</div>
        <div class="gen">
            <el-row :gutter="6">
                <el-radio-group v-model="form.targetVal" @change="handleSwitchTarget">
                    <el-radio label="0">科外转移</el-radio>
                    <el-radio label="1">科内转移</el-radio>
                </el-radio-group>
            </el-row>
        </div>
		<div class="baseinfo">
			<span>病历移交目标科室</span>
		<el-form ref="form" :model="form" label-width="90px">
			<el-row>
                <el-form-item label="目标科室">
                    <el-select v-model="form.target" placeholder="请选择">
                        <el-option
                        v-for="item in departMentOptions"
                        :key="item.DEPT_ID"
                        :label="item.DEPT_NAME_CN"
                        :value="item.DEPT_ID">
                        </el-option>
                    </el-select>
                </el-form-item>
			</el-row>
			<el-row style="text-align:center">
				<el-button type="primary" size="mini" @click="handleSaveDepartmentTransfer">确定</el-button>
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
		name: 'transfer',
		props: {
			patientInfo: {
				type: Object,
				default: () => {}
			}
		},
		inject: ['self'],
		data () {
			return {
				departMentOptions: [],
				currentDepartment: null,
				form: {
					target: '',
					targetVal: '0'
				}
			}
		},
		created () {
			this.getDepartments()
		},
		methods: {
			...mapActions([
				'GET_DEPARTMENTS',
				'SAVE_DEPARTMENTS_TRANSFER'
			]),
			getDepartments () {
				this.GET_DEPARTMENTS().then((res) => {
					if (res.code === 1) {
						this.departMentOptions = res.values
						this.getCurrentDepartment()
					}
				})
			},
			getCurrentDepartment () {
				this.departMentOptions.forEach((item) => {
					if (item.DEPT_NAME_CN.indexOf(this.patientInfo.DEPT_NAME_CN) > -1) {
						this.currentDepartment = item
					}
				})
			},
			handleSwitchTarget () {
				const targetVal = parseInt(this.form.targetVal, 10)
				if (targetVal === 1) {
					this.getDepartments()
				} else if (targetVal === 2) {
					this.departMentOptions = this.currentDepartment
				}
			},
			handleSaveDepartmentTransfer () {
				if (!this.form.target) {
					this.$message.error('请选择目标科室')
					return
				}
				this.SAVE_DEPARTMENTS_TRANSFER({
					rbType: this.form.targetVal,
					visitId: this.patientInfo.VISIT_ID,
					selectValue: this.form.target
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
	.transfer-container {
        .gen {
            padding: 16px 56px;
        }
		h2.caption {
			font-size: 16px;
			font-weight: bold;
			text-align: center;
		}
		.resident-hospital, .baseinfo {
			border: 1px solid #ececec;
			padding: 19px 3px;
			margin: 12px 0;
			position: relative;
			border-radius: 0.5em;
			p {
				position: absolute;
				top: -11px;
				left: 6px;
				background-color: #fff;
			}
			span {
				position: absolute;
				top: -11px;
				left: 6px;
				background-color: #fff;
			}
		}
	}
</style>

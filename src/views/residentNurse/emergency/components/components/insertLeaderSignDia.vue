<template>
	<el-dialog
	title="上级医生签名输入"
	:visible.sync="insertLeaderSignDiaVis"
	width="30%"
	:before-close="handleCancelInsert">
		<div class="insertLeaderSignDia-container">
			<el-form ref="insertForm" :model="insertForm" :rules="insertRules" label-width="120px">
				<el-form-item label="上级医生工号：" prop="name">
					<el-input v-model="insertForm.name" size="mini"></el-input>
				</el-form-item>
				<el-form-item label="上级医生密码：" prop="pw">
					<el-input v-model="insertForm.pw" size="mini"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleEmitInsert('insertForm')" size="mini">插入</el-button>
					<el-button @click="handleCancelInsert" size="mini">取消</el-button>
				</el-form-item>
			</el-form>
		</div>
	</el-dialog>
</template>

<script type="text/javascript">
	export default {
		name: 'InsertLeaderSignDia',
		props: ['insertLeaderSignDiaVis'],
		data () {
			return {
				insertForm: {
					name: '',
					pw: ''
				},
				insertRules: {
					name: [
						{ required: true, message: '上级医生工号', trigger: 'blur' }
					],
					pw: [
						{ required: true, message: '上级医生密码', trigger: 'blur' }
					]
				}
			}
		},
		methods: {
			handleEmitInsert (formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.$emit('actionInsertLeaderSign', this.insertForm)
					} else {
						return false
					}
				})
			},
			handleCancelInsert () {
				this.$parent.insertLeaderSignDiaVis = false
				this.$parent.handleIframeMask(false)
			}
		}
	}
</script>

<style lang="scss" scoped></style>

<template>
	<div class="print-set-dialog-container">
		<el-dialog
		title="新增打印设置"
		:visible.sync="dialogVisible"
		width="30%"
		:close-on-click-modal="false"
		:before-close="handleClose">
			<el-form ref="form" :model="form" label-width="100px">
				<el-form-item label="编码">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
				<el-form-item label="名称">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
				<el-form-item label="说明">
					<el-input type="textarea" v-model="form.name"></el-input>
				</el-form-item>
				<el-row>
					<el-col :span="12">
						<el-form-item label="宽">
							<el-input v-model="form.name"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="高">
							<el-input v-model="form.name"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-form-item label="打印机名称">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
				<el-row>
					<el-col :span="12">
						<el-form-item label="上边距">
							<el-input v-model="form.name"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="左边距">
							<el-input v-model="form.name"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-form-item label="打印方向">
					<el-radio-group v-model="form.resource">
						<el-radio label="0">默认</el-radio>
						<el-radio label="1">竖打</el-radio>
						<el-radio label="2">横打</el-radio>
					</el-radio-group>
				</el-form-item>
			</el-form>
		<span slot="footer" class="dialog-footer">
			<el-button @click="handleClose">取 消</el-button>
			<el-button type="primary" @click="handleSubmit">确 定</el-button>
		</span>
		</el-dialog>
	</div>
</template>

<script type="text/javascript">
	export default {
		name: 'printSetDialog',
		props: {
			dialogVisible: {
				type: Boolean,
				default: false
			}
		},
		data () {
			return {
				form: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				}
			}
		},
		methods: {
			handleClose (done) {
				this.$confirm('确认关闭？')
				.then((_) => {
					this.$emit('closePrintSetDia')
				})
				.catch((_) => {})
			},
			handleSubmit () {
				console.log('submit!')
			}
		}
	}
</script>

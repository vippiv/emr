<template>
	<div class="saveToPersonal-container">
		<el-dialog
			title="存入个人模板"
			:visible.sync="saveToPersonalDiaVis"
			width="25%"
			:before-close="handleCancelInsert">
				<el-form ref="tplForm" :model="tplForm" label-width="130px">
					<el-form-item label="存入个人模板名称:">
						<el-input v-model="tplForm.name" size="mini"></el-input>
					</el-form-item>
					<h2>请选择要移动的列表名称</h2>
					<div class="tree-box">
						<el-tree :data="modulesData" node-key="id" highlight-current default-expand-all @node-click="handleNodeClick"></el-tree>
					</div>
					<div class="text-right">
						<el-button type="primary" size="mini" @click="handleEmitInsert">确定</el-button>
						<el-button size="mini" @click="handleCancelInsert">取消</el-button>
					</div>
				</el-form>
			</el-dialog>
	</div>
</template>

<script type="text/javascript">
	import { mapState, createNamespacedHelpers } from 'vuex'
	import handleActiveX from '@/utils/activeX'
	import Evtbus from '@/utils/bus'
	const { mapActions } = createNamespacedHelpers('residentDoctor')

	export default {
		name: 'SaveToPersonal',
		props: ['saveToPersonalDiaVis'],
		data () {
			return {
				tplForm: {
					name: ''
				},
				defaultProps: {
					children: 'children',
					label: 'label'
				},
				modulesData: [],
				currentNode: null
			}
		},
		computed: {
			...mapState({
				medisineOperationItem: state => state.residentDoctor.medisineOperationItem
			})
		},
		watch: {
			saveToPersonalDiaVis (val) {
				if (val) {
					this.actionGetPersonalModules()
				}
			}
		},
		methods: {
			...mapActions([
				'GET_PERSONAL_MODULES',
				'SAVE_TO_PERSONAL_MODULES',
				'SAVE_DOC_BY_STRING'
			]),
			actionGetPersonalModules () {
				this.GET_PERSONAL_MODULES().then((res) => {
					if (res.code === 1) {
						this.modulesData = res.values
					}
				})
			},
			handleEmitInsert () {
				if (this.medisineOperationItem.title === '基础数据') {
					this.$message.error('基础数据不能存为个人模板')
					return
				}
				if (!this.tplForm.name) {
					this.$message.error('模板名称不能为空')
					return
				}
				if (!this.currentNode) {
					this.$message.error('请选择模板')
					return
				}
				this.actionUploadTpl()
			},
			handleCancelInsert () {
				// 通知模板更新数据
				Evtbus.$emit('updateTpls')
				this.$parent.saveToPersonalDiaVis = false
				this.$parent.handleIframeMask(false)
			},
			handleNodeClick (obj) {
				this.currentNode = obj
			},
			actionUploadTpl () {
				const args = {
					deptID: 'MC',
					list_code: this.medisineOperationItem.code2,
					filetype: 0,
					isUpdate: 0,
					mr_code: '',
					visitId: '',
					filepath: '',
					streamStr: handleActiveX.saveToString()
				}
				this.SAVE_DOC_BY_STRING(args).then((res) => {
					if (res.code === 1) {
						this.actionSaveTpl(res.values)
					}
				})
			},
			actionSaveTpl (fileCode) {
				// 这里参数可能来自两个地方，一个是左侧病历列表树，另一个是模板树
				this.SAVE_TO_PERSONAL_MODULES({
					tfileCode: this.medisineOperationItem.code,
					fileCode: fileCode,
					mrCodeNew: this.currentNode.id,
					personName: this.tplForm.name,
					listcode: this.medisineOperationItem.code2
				}).then((res) => {
					if (res.code === 1) {
						this.$message.success('保存成功')
						this.handleCancelInsert()
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.saveToPersonal-container {
		.tree-box {
			border: 1px solid #44B3C7;
			margin: 15px 0;
		}
		/deep/ .el-tree {
			height: 500px;
			overflow-y: auto;
		}
		/deep/ .el-tree--highlight-current {
			.el-tree-node.is-current {
				& > .el-tree-node__content {
					background-color: #0078d7;
					color: white;
				}
			}
		}
	}
</style>
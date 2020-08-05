<template>
	<div class="menu-container">
		<h1 class="caption">菜单管理</h1>
		<el-button type="primary" size="mini" @click="handleAddMenu">新建</el-button>
		<el-table
			:data="tableData"
			class="mb20"
			style="width: 100%">
			<el-table-column
				prop="DocCode"
				label="菜单编码">
			</el-table-column>
			<el-table-column
				prop="menuText"
				label="菜单名称">
			</el-table-column>
			<el-table-column
				prop="parentMenuId"
				label="菜单父编码">
			</el-table-column>
			<el-table-column
				prop="visible"
				label="是否显示">
			</el-table-column>
			<el-table-column
				prop="altKey"
				label="快捷键">
			</el-table-column>
			<el-table-column
				prop="toolTipText"
				label="光标显示">
			</el-table-column>
			<el-table-column
				prop="dllFileName"
				label="DLL文件名">
			</el-table-column>
			<el-table-column
				prop="typeName"
				label="类名">
			</el-table-column>
			<el-table-column
				prop="windowState"
				label="显示方式">
			</el-table-column>
			<el-table-column
				prop="startPosition"
				label="显示位置">
			</el-table-column>
			<el-table-column
				prop="formModal"
				label="窗体模式">
			</el-table-column>
			<el-table-column
				prop="ListOrder"
				label="排序编号">
			</el-table-column>
			<el-table-column
				prop="WORKBENCH_CODE"
				label="工作台编号">
			</el-table-column>
			<el-table-column
				prop="address"
				label="操作">
				<template slot-scope="scope">
					<el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
					<el-button type="text" @click="handleDel(scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-dialog
			title="新增"
			:visible.sync="dialogVisible"
			width="30%"
			:before-close="handleClose">
			<el-form ref="form" :model="form" label-width="100px">
				<el-form-item label="工作台" prop="skincmbWorkBench">
					<el-select v-model="form.skincmbWorkBench" size="mini" placeholder="请选择工作台">
						<el-option v-for="item in workStations" :key="item.WORKBENCH_CODE" :value="item.WORKBENCH_CODE" :label="item.WORKBENCH_NAME"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="菜单编码" prop="txtDocCodes">
					<el-input v-model="form.txtDocCodes" size="mini"></el-input>
				</el-form-item>
				<el-form-item label="菜单名称" prop="txtmenuTexts">
					<el-input v-model="form.txtmenuTexts" size="mini"></el-input>
				</el-form-item>
				<el-form-item label="菜单父编码" prop="txtparentMenuIds">
					<el-input v-model="form.txtparentMenuIds" size="mini"></el-input>
				</el-form-item>
				<el-form-item label="是否显示" prop="skinrdoYes">
					<el-radio-group v-model="form.skinrdoYes" size="mini">
						<el-radio label="Y">是</el-radio>
						<el-radio label="N">否</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="快捷键" prop="txtaltKey">
					<el-input v-model="form.txtaltKey" size="mini"></el-input>
				</el-form-item>
				<el-form-item label="光标显示" prop="txttoolTipTexts">
					<el-input v-model="form.txttoolTipTexts" size="mini"></el-input>
				</el-form-item>
				<el-form-item label="DLL文件名" prop="txtdllFileNames">
					<el-input v-model="form.txtdllFileNames" size="mini"></el-input>
				</el-form-item>
				<el-form-item label="类名" prop="txttypeNames">
					<el-input v-model="form.txttypeNames" size="mini"></el-input>
				</el-form-item>
				<el-form-item label="显示方式" prop="skincmbWindowState">
					<el-select v-model="form.skincmbWindowState" size="mini" placeholder="请选择显示方式">
						<el-option label="最小化显示" value="Normal"></el-option>
						<el-option label="最大化显示" value="Maximized"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="显示位置" prop="skincmbStartPosition">
					<el-select v-model="form.skincmbStartPosition" size="mini" placeholder="请选择显示位置">
						<el-option label="默认边界" value="WindowDefaultLocation"></el-option>
						<el-option label="居中" value="CenterScreen"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="窗体模式" size="mini" prop="txtformModals">
					<el-input v-model="form.txtformModals"></el-input>
				</el-form-item>
				<el-form-item label="排列序号" size="mini" prop="txtListOrders">
					<el-input v-model="form.txtListOrders"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="handleClose">取 消</el-button>
				<el-button type="primary" @click="handleSave">确 定</el-button>
			</span>
		</el-dialog>
		<ckPagination
			:currentPage="pageNos"
			:total="total"
			@_pageSizeChange="pageSizeChange"
			@_currentPageChange="currentPageChange"
			></ckPagination>
	</div>
</template>

<script type="text/javascript">
	import { mapActions, mapState } from 'vuex'

	export default {
		name: 'MenuManage',
		data () {
			return {
				dialogVisible: false,
				pageSize: 10,
				pageNos: 1,
				total: 0,
				tableData: [],
				form: {
					menuId: '',
					skincmbWorkBench: '',
					txtDocCodes: '',
					txtmenuTexts: '',
					txtparentMenuIds: '',
					skinrdoYes: '',
					txtaltKey: '',
					txttoolTipTexts: '',
					txtdllFileNames: '',
					txttypeNames: '',
					skincmbWindowState: '',
					skincmbStartPosition: '',
					txtformModals: '',
					txtListOrders: ''
				}
			}
		},
		created () {
			this.getAllMenu()
			this.getWorkStation()
		},
		computed: {
			...mapState({
				workStations: state => state.systemManage.workStations
			})
		},
		methods: {
			...mapActions([
				'GET_MENU_LIST',
				'GET_WORK_STATION',
				'SAVE_NEW_MENU',
				'GET_MENU_INFO',
				'DEL_MENU'
			]),
			getAllMenu () {
				this.GET_MENU_LIST({
					pageSize: this.pageSize,
					pageNos: this.pageNos
				}).then((res) => {
					if (res.code === 1) {
						this.tableData = res.values.values
						this.total = res.values.total
					}
				})
			},
			getWorkStation () {
				this.GET_WORK_STATION()
			},
			getMenuInfo (obj) {
				this.GET_MENU_INFO({
					MenuID: obj.MenuID
				}).then((res) => {
					if (res.code === 1) {
						const data = res.values[0]
						this.form.menuId = data.MenuID
						this.form.txtDocCodes = data.DocCode
						this.form.txtmenuTexts = data.menuText
						this.form.txtparentMenuIds = data.parentMenuId
						this.form.skinrdoYes = data.visible
						this.form.txtaltKey = data.altKey
						this.form.txttoolTipTexts = data.toolTipText
						this.form.txtdllFileNames = data.dllFileName
						this.form.txttypeNames = data.typeName
						this.form.skincmbWindowState = data.windowState
						this.form.skincmbStartPosition = data.startPosition
						this.form.txtformModals = data.formModal
						this.form.txtListOrders = data.ListOrder
						this.form.skincmbWorkBench = data.WORKBENCH_CODE
					}
				})
			},
			onSubmit () {
				console.log('submit!')
			},
			handleAddMenu () {
				this.dialogVisible = true
			},
			handleEdit (obj) {
				this.dialogVisible = true
				this.getMenuInfo(obj)
			},
			handleDel (obj) {
				this.DEL_MENU({
					MenuID: obj.MenuID
				}).then((res) => {
					if (res.code === 1) {
						this.$message.success('删除成功')
						this.getAllMenu()
					}
				})
			},
			handleClose () {
				this.form.menuId = ''
				this.$refs.form.resetFields()
				this.dialogVisible = false
			},
			handleSave () {
				const args = {
					menuId: this.form.menuId,
					txtDocCodes: this.form.txtDocCodes,
					txtmenuTexts: this.form.txtmenuTexts,
					txtparentMenuIds: this.form.txtparentMenuIds,
					skinrdoYes: this.form.skinrdoYes,
					txtaltKey: this.form.txtaltKey,
					txttoolTipTexts: this.form.txttoolTipTexts,
					txtdllFileNames: this.form.txtdllFileNames,
					txttypeNames: this.form.txttypeNames,
					skincmbWindowState: this.form.skincmbWindowState,
					skincmbStartPosition: this.form.skincmbStartPosition,
					txtformModals: this.form.txtformModals,
					txtListOrders: this.form.txtListOrders,
					skincmbWorkBench: this.form.skincmbWorkBench
				}
				this.SAVE_NEW_MENU(args).then((res) => {
					if (res.code === 1) {
						this.$message.success('保存成功')
						this.handleClose()
						this.getAllMenu()
					}
				})
			},
			pageSizeChange (size) {
				this.pageSize = size
				this.getAllMenu()
			},
			currentPageChange (val) {
				this.pageNos = val
				this.getAllMenu()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.menu-container{
		.caption{
			line-height: 2;
			font-size: 18px;
			font-weight: bold;
		}
	}
</style>

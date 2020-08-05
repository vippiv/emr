<template>
	<div class="icd-code-container">
		<h1 class="caption">ICD编码维护</h1>
		<el-form :inline="true">
			<el-form-item label="编码类型：" label-width="100px">
				<el-select v-model="ICDCodeVal" size="mini" placeholder="请选择">
					<el-option
					v-for="item in ICDCodeOptions"
					:key="item.BigKindCode"
					:label="item.BigKindName"
					:value="item.BigKindCode">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="编码类别：">
				<el-radio-group v-model="codeType">
					<el-radio label="rbPinyinCode" value="codeType">ICD拼音码</el-radio>
					<el-radio label="rbCode" value="codeType">ICD名称</el-radio>
					<el-radio label="rbName" value="codeType">ICD编码</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="编码关键字：">
				<el-input v-model="txtInput" size="mini"></el-input>
			</el-form-item>
			<el-form-item label="">
				<el-button type="primary" size="mini" @click="getIcdCodeList">查询</el-button>
			</el-form-item>
			<el-form-item label="">
				<el-button type="primary" size="mini" @click="handleAdd">新增</el-button>
			</el-form-item>
		</el-form>
		<el-table
			:data="tableData"
			class="mb20"
			style="width: 100%">
			<el-table-column
				prop="ICD10"
				label="ICD编码"
			>
			</el-table-column>
			<el-table-column
				prop="ICD10Name"
				label="ICD名称"
			>
			</el-table-column>
			<el-table-column
				prop="ICD10HeadPY"
				label="拼音码">
			</el-table-column>
			<el-table-column
				prop="Write"
				label="是否允许修改">
			</el-table-column>
			<el-table-column
				label="操作">
				<template slot-scope="scope">
					<el-button type="text" size="mini" @click="handleEdit(scope.row)">编辑</el-button>
					<el-button type="text" size="mini" @click="handleDel(scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-dialog
			title="新增"
			:visible.sync="dialogVisible"
			width="30%"
			:before-close="handleClose">
			<el-form ref="form" :model="form" label-width="100px">
				<el-form-item label="ID" prop="txtKindIDs">
					<el-input v-model="form.txtKindIDs" size="mini"></el-input>
				</el-form-item>
				<el-form-item label="ICD编码" prop="txtICDs">
					<el-input v-model="form.txtICDs" size="mini"></el-input>
				</el-form-item>
				<el-form-item label="ICD名称" prop="txtICDNames">
					<el-input v-model="form.txtICDNames" size="mini"></el-input>
				</el-form-item>
				<el-form-item label="ICD拼音码" prop="txtICDPYs">
					<el-input v-model="form.txtICDPYs" size="mini"></el-input>
				</el-form-item>
				<el-form-item label="编码类型" prop="skincmbCodeType">
					<el-select v-model="form.skincmbCodeType" size="mini" placeholder="请选择">
						<el-option
						v-for="item in ICDCodeOptions"
						:key="item.BigKindCode"
						:label="item.BigKindName"
						:value="item.BigKindCode">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="" prop="type">
					<el-checkbox-group v-model="form.type">
						<el-checkbox label="skincbCRB" value="type">传染病</el-checkbox>
						<el-checkbox label="skincbMXB" value="type">慢性病</el-checkbox>
						<el-checkbox label="skincbWrite" value="type">是否允许修改</el-checkbox>
					</el-checkbox-group>
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
	import { mapActions } from 'vuex'

	export default {
		name: 'ICDCode',
		data () {
			return {
				ICDCodeVal: '',
				ICDCodeOptions: [],
				codeType: [],
				txtInput: '',
				pageSize: 10,
				pageNos: 1,
				total: 0,
				value: '',
				tableData: [],
				form: {
					txtKindIDs: '',
					txtICDs: '',
					txtICDNames: '',
					txtICDPYs: '',
					skincmbCodeType: '',
					type: []
				},
				dialogVisible: false,
				// pageSize: 10,
				// pageNos: 1,
				isAdd: false
			}
		},
		created () {
			this.getIcdCode()
		},
		methods: {
			...mapActions([
				'GET_ICD_CODE',
				'GET_ICD_CODE_LIST',
				'GET_ICD_CODE_INFO',
				'DEL_ICD_CODE',
				'SAVE_ICD_CODE'
			]),
			getIcdCode () {
				this.GET_ICD_CODE().then((res) => {
					if (res.code === 1) {
						this.ICDCodeOptions = res.values
						if (this.ICDCodeOptions && this.ICDCodeOptions.length > 0) {
							this.ICDCodeVal = this.ICDCodeOptions[0].BigKindCode
							this.getIcdCodeList()
						}
					}
				})
			},
			getIcdCodeInfo (obj) {
				this.GET_ICD_CODE_INFO({
					KindID: obj.KindID
				}).then((res) => {
					if (res.code === 1) {
						this.dialogVisible = true
						const data = res.values[0]
						this.form.txtKindIDs = data.KindID
						this.form.txtICDs = data.ICD10
						this.form.txtICDNames = data.ICD10Name
						this.form.txtICDPYs = data.ICD10HeadPY
						this.form.skincmbCodeType = data.BigKindCode
						data.CRB_TYPE ? this.form.type.push('skincbCRB') : ''
						data.MXB_TYPE ? this.form.type.push('skincbMXB') : ''
						data.Write ? this.form.type.push('skincbWrite') : ''
					}
				})
			},
			getIcdCodeList () {
				// this.pageNos = 1
				const args = {
					cmbKindCode: this.ICDCodeVal,
					pageSize: this.pageSize,
					pageNos: this.pageNos
				}
				if (this.txtInput) {
					args.txtInput = this.txtInput
				}
				if (this.codeType === 'rbCode') {
					args.rbName= 1
				}
				if (this.codeType === 'rbName') {
					args.rbCode= 1 
				} else {
					args.rbCode= 0 
				}
				if (this.codeType === 'rbPinyinCode') {
					args.rbPinyinCode = 1
				}
				this.GET_ICD_CODE_LIST(args).then((res) => {
					if (res.code === 1) {
						this.total = res.values.total
						this.tableData = res.values.values
					}
				})
			},
			handleAdd () {
				this.isAdd = true
				this.dialogVisible = true
			},
			handleEdit (obj) {
				this.isAdd = false
				this.getIcdCodeInfo(obj)
			},
			handleDel (obj) {
				this.DEL_ICD_CODE({
					txtICDNames: obj.ICD10Name
				}).then((res) => {
					if (res.code === 1) {
						this.$message.success('删除成功')
						this.getIcdCodeList()
					}
				})
			},
			handleClose () {
				this.$refs.form.resetFields()
				this.dialogVisible = false
			},
			handleSave () {
				const args = {
					txtICDs: this.form.txtICDs,
					txtICDNames: this.form.txtICDNames,
					txtICDPYs: this.form.txtICDPYs,
					txtKindIDs: this.form.txtKindIDs,
					skincmbCodeType: this.form.skincmbCodeType,
					skincbCRB: this.form.type.indexOf('skincbCRB') > -1 ? '1' : '0',
					skincbMXB: this.form.type.indexOf('skincbMXB') > -1 ? '1' : '0',
					skincbWrite: this.form.type.indexOf('skincbWrite') > -1 ? '1' : '0',
					isWrite: this.isAdd ? 0 : 1// 0 代表新增 1代表修改
				}
				this.SAVE_ICD_CODE(args).then((res) => {
					if (res.code === 1) {
						this.$message.success('保存成功')
						this.handleClose()
						this.getIcdCodeList()
					}
				})
			},
			pageSizeChange (size) {
				this.pageSize = size
				this.getIcdCodeList()
			},
			currentPageChange (val) {
				this.pageNos = val
				this.getIcdCodeList()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.icd-code-container{
		.caption{
			line-height: 2;
			font-size: 18px;
			font-weight: bold;
		}
	}
</style>


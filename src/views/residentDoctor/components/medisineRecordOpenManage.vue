<!-- 病历开放申请管理 -->
<template>
	<div class="medisine-record-open-manage-container">
		<div class="handle-area">
			<ckBtn icon="ck-icon-search" @click="handleClicFn">查询</ckBtn>
			<ckBtn icon="ck-icon-print-preview" @click="handleClicFn">打印预览</ckBtn>
			<ckBtn icon="ck-icon-print" @click="handleClicFn">打印</ckBtn>
			<ckBtn icon="ck-icon-export" @click="handleClicFn">导出</ckBtn>
		</div>
		<el-form :inline="true" class="demo-form-inline">
			<el-form-item label="科室名称">
				<el-input v-model="departmentName" placeholder=""></el-input>
			</el-form-item>
			<el-form-item label="申请时间">
				<el-date-picker
					v-model="signDate"
					type="daterange"
					range-separator="-"
					@change="handleUpdateTable"
					start-placeholder="开始日期"
					end-placeholder="结束日期">
				</el-date-picker>
			</el-form-item>
			<br>
			<el-form-item label="住院号">
				<el-input v-model="departmentName" placeholder=""></el-input>
			</el-form-item>
			<el-form-item label="病人ID">
				<el-input v-model="departmentName" placeholder=""></el-input>
			</el-form-item>
			<el-form-item label="病人姓名">
				<el-input v-model="departmentName" placeholder=""></el-input>
			</el-form-item>
			<el-form-item label="申请人姓名">
				<el-input v-model="departmentName" placeholder=""></el-input>
			</el-form-item>
			<el-form-item label="">
				<el-radio-group v-model="examineVal">
					<el-radio label="1">未审批</el-radio>
					<el-radio label="2">已审批</el-radio>
				</el-radio-group>
			</el-form-item>
		</el-form>
		<div id="spreadsheet" ref="spreadsheet"></div>
	</div>
</template>

<script type="text/javascript">
	import jexcel from 'jexcel'

	const data = [
		['Jazz', 'Honda', '2019-02-12', 'Jazz', 'Jazz', '$ 2.000,00', '#777700', 'Jazz', 'Jazz', 'Jazz', 'Honda', '2019-02-12', 'Jazz', 'Jazz', '$ 2.000,00'],
		['Civic', 'Audi', '2018-07-11', 'Jazz', 'Jazz', '$ 4.000,01', '#007777', 'Jazz', 'Jazz', 'Jazz', 'Honda', '2019-02-12', 'Jazz', 'Jazz', '$ 2.000,00']
	]
	const options = {
		data,
		allowToolbar: true,
		columns: [
			{ type: 'text', title: '申请日期', width: '100px' },
			{ type: 'text', title: '申请科室', width: '100px' },
			{ type: 'text', title: '病人ID号', width: '100px' },
			{ type: 'text', title: '住院号', width: '100px' },
			{ type: 'text', title: '姓名', width: '100px' },
			{ type: 'text', title: '文书类别', width: '100px' },
			{ type: 'text', title: '文书名称', width: '100px' },
			{ type: 'text', title: '申请权限等级', width: '100px' },
			{ type: 'text', title: '申请期限', width: '100px' },
			{ type: 'text', title: '申请人', width: '100px' },
			{ type: 'text', title: '状态', width: '100px' },
			{ type: 'text', title: '批准人', width: '100px' },
			{ type: 'text', title: '批准时间', width: '100px' },
			{ type: 'text', title: '申请事由', width: '100px' },
			{ type: 'text', title: '申请人ID', width: '100px' }
		]
	}
	export default {
		name: 'medisineRecordOpenManage',
		data () {
			return {
				departmentName: '',
				signDate: '',
				examineVal: '1'
			}
		},
		mounted () {
			this.renderExcel()
		},
		methods: {
			renderExcel () {
				const spreadsheet = jexcel(document.getElementById('spreadsheet'), options)
				Object.assign(this, { spreadsheet })
			},
			handleClicFn () {
				console.log('data', data)
			},
			handleChooseDepartment () {},
			handleUpdateTable () {}
		}
	}
</script>

<style lang="scss" scoped>
	.medisine-record-open-manage-container {
		.handle-area {
			margin-bottom: 15px;
		}
		/deep/ .jexcel {
			td {
				white-space: break-spaces;
			}
		}
	}
</style>

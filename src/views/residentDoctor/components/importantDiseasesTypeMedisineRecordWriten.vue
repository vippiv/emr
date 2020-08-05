<!-- 优势病种临床路径中医病历书写情况 组件 -->
<template>
	<div class="important-diseasesType-medisineRecordWriten-container">
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
			<el-form-item>
				<el-button type="primary" @click="handleChooseDepartment">...</el-button>
			</el-form-item>
			<el-form-item label="病历签名时间">
				<el-date-picker
					v-model="signDate"
					type="daterange"
					range-separator="-"
					@change="handleUpdateTable"
					start-placeholder="开始日期"
					end-placeholder="结束日期">
				</el-date-picker>
			</el-form-item>
		</el-form>
		<div id="spreadsheet" ref="spreadsheet"></div>
	</div>
</template>

<script type="text/javascript">
	import jexcel from 'jexcel'

	const data = [
		['Jazz', 'Honda', '2019-02-12', 'Jazz', 'Jazz', '$ 2.000,00', '#777700', 'Jazz', 'Jazz', 'Jazz'],
		['Civic', 'Audi', '2018-07-11', 'Jazz', 'Jazz', '$ 4.000,01', '#007777', 'Jazz', 'Jazz', 'Jazz']
	]
	const options = {
		data,
		allowToolbar: true,
		columns: [
			{ type: 'text', title: '科室名称', width: '100px' },
			{ type: 'text', title: '病种名称', width: '100px' },
			{ type: 'text', title: 'ICD码', width: '100px' },
			{ type: 'text', title: 'ICD名称', width: '100px' },
			{ type: 'text', title: '患者姓名', width: '100px' },
			{ type: 'text', title: '住院号', width: '100px' },
			{ type: 'text', title: '床号', width: '100px' },
			{ type: 'text', title: '住院医生', width: '100px' },
			{ type: 'text', title: '是否书写中医病历', width: '100px' },
			{ type: 'dropdown', title: '医疗小组', width: '100px',source:[ "Alfa Romeo", "Audi", "Bmw" ] }
		]
	}
	export default {
		name: 'importantDiseasesTypeMedisineRecordWriten',
		data () {
			return {
				departmentName: '',
				signDate: ''
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
	.important-diseasesType-medisineRecordWriten-container {
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

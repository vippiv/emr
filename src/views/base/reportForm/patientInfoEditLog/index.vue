<template>
	<div class="patient-info-edit-log-container">
		<h1 class="caption">患者信息修改日志</h1>
		<el-form :inline="true">
			<el-form-item label="操作人ID: ">
				<el-input v-model="loaderId" placeholder="请输入"></el-input>
			</el-form-item>
			<el-form-item label="操作人: ">
				<el-input v-model="loaderName" placeholder="请输入"></el-input>
			</el-form-item>
			<el-form-item label="住院号: ">
				<el-input v-model="loaderName" placeholder="请输入"></el-input>
			</el-form-item>
			<el-form-item label="病人姓名: ">
				<el-input v-model="loaderName" placeholder="请输入"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="handleSearch">查询</el-button>
			</el-form-item>
		</el-form>
		<el-table
			:data="tableData"
			style="width: 100%">
			<el-table-column
				prop="date"
				label="住院号"
				width="180">
			</el-table-column>
			<el-table-column
				prop="name"
				label="病人姓名"
				width="180">
			</el-table-column>
			<el-table-column
				prop="address"
				label="操作人">
			</el-table-column>
			<el-table-column
				prop="address"
				label="操作时间">
			</el-table-column>
			<el-table-column
				prop="address"
				label="操作内容">
			</el-table-column>
			<el-table-column
				prop="address"
				label="操作电脑">
			</el-table-column>
		</el-table>
	</div>
</template>

<script type="text/javascript">
	export default {
		name: 'PatientInfoEditLog',
		data () {
			return {
				loaderId: '',
				loaderName: '',
				tableData: [
					{
						date: '2016-05-04',
						name: '王小虎',
						address: '上海市普陀区金沙江路 1517 弄'
					}
				]
			}
		},
		methods: {
			handleSearch () {}
		}
	}
</script>

<style lang="scss" scoped>
	.patient-info-edit-log-container{
		.caption{
			line-height: 2;
			font-size: 18px;
			font-weight: bold;
		}
	}
</style>

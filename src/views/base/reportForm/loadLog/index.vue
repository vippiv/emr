<template>
	<div class="reportform-loadlog">
		<h1 class="caption">登录日志信息</h1>
		<el-form :inline="true">
			<el-form-item label="登录人ID: ">
				<el-input v-model="loaderId" placeholder="请输入"></el-input>
			</el-form-item>
			<el-form-item label="登录人姓名: ">
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
				label="登录人姓名"
				width="180">
			</el-table-column>
			<el-table-column
				prop="name"
				label="登录人ID"
				width="180">
			</el-table-column>
			<el-table-column
				prop="address"
				label="科室">
			</el-table-column>
			<el-table-column
				prop="address"
				label="登录人IP">
			</el-table-column>
			<el-table-column
				prop="address"
				label="登录时间">
			</el-table-column>
			<el-table-column
				prop="address"
				label="登录次数">
			</el-table-column>
			<el-table-column
				prop="address"
				label="退出时间">
			</el-table-column>
		</el-table>
	</div>
</template>

<script type="text/javascript">
	import { mapActions } from 'vuex'

	export default {
		name: 'ReportFormLoadlog',
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
		created () {
			// this.getData()
		},
		methods: {
			...mapActions([
				'GET_DATAGROUP_AND_TPL'
			]),
			getData () {
				this.GET_DATAGROUP_AND_TPL({
					name: this.loaderName,
					page: 1
				}).then((res) => {
					console.log(res)
					if (res.status === 0) {
						// TODO
					}
				})
			},
			handleSearch () {}
		}
	}
	</script>
<style lang="scss" scoped>
.reportform-loadlog{
		.caption{
			line-height: 2;
			font-size: 18px;
			font-weight: bold;
		}
	}
</style>

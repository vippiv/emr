<!-- 自定病历控制明细 组件 -->
<template>
	<div class="quality-controlDetail-container">
		<el-form :inline="true" class="demo-form-inline">
			<el-form-item label="科室名称">
				<el-input v-model="departmentName" placeholder=""></el-input>
			</el-form-item>
			<el-form-item>
			<el-button type="primary" @click="handleChooseDepartment">...</el-button>
			</el-form-item>
		</el-form>
		<el-table
			:data="tableData"
			style="width: 100%">
			<el-table-column
			prop="date"
			label="序号">
			</el-table-column>
			<el-table-column
			prop="name"
			label="姓名">
			</el-table-column>
			<el-table-column
			prop="address"
			label="监控项目名称">
			</el-table-column>
			<el-table-column
			prop="address"
			label="开始时间">
			</el-table-column>
			<el-table-column
			prop="address"
			label="完成时间">
			</el-table-column>
			<el-table-column
			prop="address"
			label="结束时间">
			</el-table-column>
			<el-table-column
			prop="address"
			label="剩余时间">
			</el-table-column>
			<el-table-column
			prop="address"
			label="住院医师">
			</el-table-column>
			<el-table-column
			prop="address"
			label="医生组">
			</el-table-column>
		</el-table>
		<el-dialog
			title="科室及医疗组"
			:visible.sync="departmentdiaVis"
			:close-on-click-modal="false"
			width="40%"
			:append-to-body="true"
			:before-close="handleClose">
			<el-form :inline="true" class="demo-form-inline">
				<el-form-item label="">
					<el-radio-group v-model="type">
						<el-radio label="1">名称(&M)</el-radio>
						<el-radio label="2">编码(&C)</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="">
				<el-input v-model="searchVal" placeholder=""></el-input>
				</el-form-item>
				<el-form-item>
				<el-button type="primary" @click="handleOnSearch">确定</el-button>
				</el-form-item>
			</el-form>
			<div class="filter-data-area">
				<div>
					<el-table
					:data="tableData"
					height="300"
					style="width: 100%">
						<el-table-column
						prop="date"
						label="名称"
						>
						</el-table-column>
						<el-table-column
						prop="name"
						label="编码"
						>
						</el-table-column>
						<el-table-column
						prop="address"
						label="SPEC_CODE">
						</el-table-column>
					</el-table>
				</div>
				<div>
					<el-table
					:data="tableData"
					height="300"
					style="width: 100%">
						<el-table-column
						prop="date"
						label="选择"
						>
						</el-table-column>
						<el-table-column
						prop="name"
						label="医师组"
						>
						</el-table-column>
					</el-table>
				</div>
			</div>
			<el-form :inline="true" class="demo-form-inline">
				<el-form-item label="">
					<el-radio-group v-model="type">
						<el-radio label="1">精确查询</el-radio>
						<el-radio label="2">模糊查询</el-radio>
					</el-radio-group>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script type="text/javascript">
	export default {
		name: 'qualityControlDetail',
		data () {
			return {
				departmentdiaVis: false,
				departmentName: '',
				type: '1',
				searchVal: '',
				tableData: [{
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1517 弄'
				}, {
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1519 弄'
				}, {
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1516 弄'
				}]
			}
		},
		methods: {
			handleChooseDepartment () {
				this.departmentdiaVis = true
			},
			handleClose () {
				this.departmentdiaVis = false
			},
			handleOnSearch () {}
		}
	}
</script>

<style lang="scss" scoped>
	.filter-data-area {
		display: flex;
		& > div {
			border: 1px solid #919191;
		}
		& > div:first-child {
			width: 60%
		}
		& > div:last-child {
			width: 40%
		}
	}
</style>

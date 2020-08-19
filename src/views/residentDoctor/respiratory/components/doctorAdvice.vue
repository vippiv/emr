<template>
	<div class="doctor-advice-container">
		<el-form :inline="true" :model="formInline" class="demo-form-inline-search">
			<div>
				<el-form-item label="医嘱类型">
					<el-select v-model="formInline.adviceType" placeholder="" size="mini">
						<el-option label="区域一" value="shanghai"></el-option>
						<el-option label="区域二" value="beijing"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="长期/临时">
					<el-select v-model="formInline.timeType" placeholder="" size="mini">
						<el-option label="区域一" value="shanghai"></el-option>
						<el-option label="区域二" value="beijing"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="">
					<el-checkbox v-model="formInline.stand" size="mini">开立</el-checkbox>
				</el-form-item>
				<el-form-item label="">
					<el-date-picker
						size="mini"
						v-model="formInline.standTime"
						type="daterange"
						range-separator="至"
						start-placeholder="开始日期"
						end-placeholder="结束日期">
					</el-date-picker>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleSearch" size="mini">查询</el-button>
				</el-form-item>
			</div>
			<div>
				<el-form-item label="项目名称" style="width: 510px">
					<el-input v-model="formInline.projectName" placeholder="请输入内容" size="mini" style="width: 420px"></el-input>
				</el-form-item>
				<el-form-item label="">
					<el-checkbox v-model="formInline.stop" size="mini">停止</el-checkbox>
				</el-form-item>
				<el-form-item label="">
					<el-date-picker
						size="mini"
						v-model="formInline.stopTime"
						type="daterange"
						range-separator="至"
						start-placeholder="开始日期"
						end-placeholder="结束日期">
					</el-date-picker>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleQuit" size="mini">退出</el-button>
				</el-form-item>
			</div>
		</el-form>
		<el-table
			:data="tableData"
			size="mini"
			border
			style="width: 100%">
			<el-table-column
			prop="date"
			label="开立时间"
			width="180">
			</el-table-column>
			<el-table-column
			prop="name"
			label="医嘱内容"
			width="180">
			</el-table-column>
			<el-table-column
			prop="address"
			label="长/临">
			</el-table-column>
			<el-table-column
			prop="address"
			label="用法">
			</el-table-column>
			<el-table-column
			prop="address"
			label="开立医生">
			</el-table-column>
			<el-table-column
			prop="address"
			label="停止时间">
			</el-table-column>
			<el-table-column
			prop="address"
			label="停止医生">
			</el-table-column>
			<el-table-column
			prop="address"
			label="开始时间">
			</el-table-column>
			<el-table-column
			prop="address"
			label="审核时间">
			</el-table-column>
		</el-table>
	</div>
</template>

<script type="text/javascript">
	export default {
		name: 'DoctorAdvice',
		data () {
			return {
				formInline: {
					user: '',
					region: ''
				},
				tableData: []
			}
		},
		methods: {
			handleSearch() {},
			handleQuit() {}
		}
	}
</script>

<style lang="scss" scoped>
	.doctor-advice-container {
		height: 100%;
		background-color: white;
		padding: 10px 10px 0 10px;
		.demo-form-inline-search {
			padding: 10px;
			margin-bottom: 10px;
			border:1px solid #EEE;
		}
		/deep/ .el-form-item {
			margin-bottom: 0px;
		}
	}
</style>

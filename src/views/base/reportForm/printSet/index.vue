<template>
	<div class="print-set-container">
		<h1 class="caption">打印设置</h1>
		<el-button type="text" @click="handleAddPrintSet">新增打印设置</el-button>
		<el-table
			:data="tableData"
			style="width: 100%">
			<el-table-column
				prop="date"
				label="编码"
				width="180">
			</el-table-column>
			<el-table-column
				prop="name"
				label="名称"
				width="180">
			</el-table-column>
			<el-table-column
				prop="address"
				label="说明">
			</el-table-column>
			<el-table-column
				prop="address"
				label="宽">
			</el-table-column>
			<el-table-column
				prop="address"
				label="高">
			</el-table-column>
			<el-table-column
				prop="address"
				label="打印机名称">
			</el-table-column>
			<el-table-column
				prop="address"
				label="上边距">
			</el-table-column>
			<el-table-column
				prop="address"
				label="左边距">
			</el-table-column>
			<el-table-column
				prop="address"
				label="打印方向">
			</el-table-column>
		</el-table>
		<printSetDia :dialogVisible="addSetDiaVis" @closePrintSetDia="handleClosePrintSetDia"></printSetDia>
	</div>
</template>

<script type="text/javascript">
	import printSetDia from './components/printSetDia'

	export default {
		name: 'Printset',
		data () {
			return {
				addSetDiaVis: false,
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
		components: {
			printSetDia
		},
		methods: {
			handleAddPrintSet () {
				this.addSetDiaVis = true
			},
			handleClosePrintSetDia () {
				this.addSetDiaVis = false
			}
		}
	}
</script>

<style lang="scss" scoped>
	.print-set-container{
		.caption{
			line-height: 2;
			font-size: 18px;
			font-weight: bold;
		}
	}
</style>

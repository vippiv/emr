<template>
	<div class="nursing-patrol">
		<div id="printTest">
			<el-row>
				<el-col :span="14" style="text-align:right;font-size:18px;letter-spacing:12px;">
					<h1>护理巡视及患者睡眠记录单(1)</h1>
				</el-col>
				<el-col :span="8" style="text-align:center;font-size:16px;">
					<span>日期：{{topDate}}</span>
				</el-col>
			</el-row>
			<div class="table-wrapper">
				<table v-if="tableData.length>0?true:false" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" class="gridtable" border style="border-color:#ebeef5;" cellspacing="0" cellpadding="0">
					<thead>
						<tr>
							<th width='110' v-for="item in headerData" :key="item.value">{{item.label}}</th>
						</tr>
					</thead>
					<tbody class="table-body" ref="table">
						<tr v-for="item in tableData" :key="item.id">
							<td class="tb-w">{{ item.BedNo}}</td>
							<td class="tb-w">{{ item.PAT_NAME}}</td>
							<td class="tb-w">
								<el-input v-if="inputselectStatus" type="text" v-model="item.TP" size="mini" clearable></el-input>
							</td>
							<td class="tb-w">
								<el-input v-if="inputselectStatus" type="text" v-model="item.DB" size="mini" clearable></el-input>
							</td>
							<td class="tb-w">
								<el-select v-if="inputselectStatus" v-model="item.Seven" placeholder size="mini" clearable>
									<el-option v-for="item in optionsSelect" :key="item.idx" :label="item.ItemText" :value="item.ItemText"></el-option>
								</el-select>
							</td>
							<td class="tb-w">
								<el-select v-if="inputselectStatus" v-model="item.SevenHalf" placeholder size="mini" clearable>
									<el-option v-for="item in optionsSelect" :key="item.idx" :label="item.ItemText" :value="item.ItemText"></el-option>
								</el-select>
							</td>
							<td class="tb-w">
								<el-select v-if="inputselectStatus" v-model="item.Eight" placeholder size="mini" clearable>
									<el-option v-for="item in optionsSelect" :key="item.idx" :label="item.ItemText" :value="item.ItemText"></el-option>
								</el-select>
							</td>
							<td class="tb-w">
								<el-select v-if="inputselectStatus" v-model="item.EightHalf" placeholder size="mini" clearable>
									<el-option v-for="item in optionsSelect" :key="item.idx" :label="item.ItemText" :value="item.ItemText"></el-option>
								</el-select>
							</td>
							<td class="tb-w">
								<el-select v-if="inputselectStatus" v-model="item.Nine" placeholder size="mini" clearable>
									<el-option v-for="item in optionsSelect" :key="item.idx" :label="item.ItemText" :value="item.ItemText"></el-option>
								</el-select>
							</td>
							<td class="tb-w">
								<el-select v-if="inputselectStatus" v-model="item.NineHalf" placeholder size="mini" clearable>
									<el-option v-for="item in optionsSelect" :key="item.idx" :label="item.ItemText" :value="item.ItemText"></el-option>
								</el-select>
							</td>
							<td class="tb-w">
								<el-select v-if="inputselectStatus" v-model="item.Ten" placeholder size="mini" clearable>
									<el-option v-for="item in optionsSelect" :key="item.idx" :label="item.ItemText" :value="item.ItemText"></el-option>
								</el-select>
							</td>
							<td class="tb-w">
								<el-select v-if="inputselectStatus" v-model="item.TenHalf" placeholder size="mini" clearable>
									<el-option v-for="item in optionsSelect" :key="item.idx" :label="item.ItemText" :value="item.ItemText"></el-option>
								</el-select>
							</td>
							<td class="tb-w">
								<el-select v-if="inputselectStatus" v-model="item.Eleven" placeholder size="mini" clearable>
									<el-option v-for="item in optionsSelect" :key="item.idx" :label="item.ItemText" :value="item.ItemText"></el-option>
								</el-select>
							</td>
							<td class="tb-w">
								<el-select v-if="inputselectStatus" v-model="item.ElevenHalf" placeholder size="mini" clearable>
									<el-option v-for="item in optionsSelect" :key="item.idx" :label="item.ItemText" :value="item.ItemText"></el-option>
								</el-select>
							</td>
							<td class="tb-w">
								<el-select v-if="inputselectStatus" v-model="item.Twelve" placeholder size="mini" clearable>
									<el-option v-for="item in optionsSelect" :key="item.idx" :label="item.ItemText" :value="item.ItemText"></el-option>
								</el-select>
							</td>
							<td class="tb-w">
								<el-select v-if="inputselectStatus" v-model="item.TwelveHalf" placeholder size="mini" clearable>
									<el-option v-for="item in optionsSelect" :key="item.idx" :label="item.ItemText" :value="item.ItemText"></el-option>
								</el-select>
							</td>
							<td class="tb-w">
								<el-select v-if="inputselectStatus" v-model="item.Thirteen" placeholder size="mini" clearable>
									<el-option v-for="item in optionsSelect" :key="item.idx" :label="item.ItemText" :value="item.ItemText"></el-option>
								</el-select>
							</td>
							<td class="tb-w">
								<el-select v-if="inputselectStatus" v-model="item.ThirteenHalf" placeholder size="mini" clearable>
									<el-option v-for="item in optionsSelect" :key="item.idx" :label="item.ItemText" :value="item.ItemText"></el-option>
								</el-select>
							</td>
							<td class="tb-w">
								<el-select v-if="inputselectStatus" v-model="item.Fourteen" placeholder size="mini" clearable>
									<el-option v-for="item in optionsSelect" :key="item.idx" :label="item.ItemText" :value="item.ItemText"></el-option>
								</el-select>
							</td>
							<td class="tb-w">
								<el-select v-if="inputselectStatus" v-model="item.FiveteenHalf" placeholder size="mini" clearable>
									<el-option v-for="item in optionsSelect" :key="item.idx" :label="item.ItemText" :value="item.ItemText"></el-option>
								</el-select>
							</td>
							<td class="tb-w">
								<el-select v-if="inputselectStatus" v-model="item.Fiveteen" placeholder size="mini" clearable>
									<el-option v-for="item in optionsSelect" :key="item.idx" :label="item.ItemText" :value="item.ItemText"></el-option>
								</el-select>
							</td>
							<td class="tb-w">
								<el-select v-if="inputselectStatus" v-model="item.FiveteenHalf" placeholder size="mini" clearable>
									<el-option v-for="item in optionsSelect" :key="item.idx" :label="item.ItemText" :value="item.ItemText"></el-option>
								</el-select>
							</td>
							<td class="tb-w">
								<el-select v-if="inputselectStatus" v-model="item.Sixteen" placeholder size="mini" clearable>
									<el-option v-for="item in optionsSelect" :key="item.idx" :label="item.ItemText" :value="item.ItemText"></el-option>
								</el-select>
							</td>
							<td class="tb-w">
								<el-select v-if="inputselectStatus" v-model="item.SixteenHalf" placeholder size="mini" clearable>
									<el-option v-for="item in optionsSelect" :key="item.idx" :label="item.ItemText" :value="item.ItemText"></el-option>
								</el-select>
							</td>
							<td class="tb-w">
								<el-select v-if="inputselectStatus" v-model="item.Seventeen" placeholder size="mini" clearable>
									<el-option v-for="item in optionsSelect" :key="item.idx" :label="item.ItemText" :value="item.ItemText"></el-option>
								</el-select>
							</td>
							<td class="tb-w">
								<el-select v-if="inputselectStatus" v-model="item.SeventeenHalf" placeholder size="mini" clearable>
									<el-option v-for="item in optionsSelect" :key="item.idx" :label="item.ItemText" :value="item.ItemText"></el-option>
								</el-select>
							</td>
						</tr>
						<tr>
							<td class="tb-w" colspan="4">护士签名</td>
							<td class="tb-w td-hover" @dblclick="handleTableCell(item)" v-for="item in nursingSingerData" :key="item.Time">
								<el-input size="mini" v-model="item.UserName" clearable @clear="handleCellClear(item)"></el-input>
							</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div style="margin-bottom:90px;margin-top:10px;" class="noprint">
				备注:1、睡眠记录:患者睡眠全天用红\"O\"表示;患者未睡划护理巡视对应的符号.2、护理巡视:全天统一用蓝笔,1\"√\"-无特殊情况;2\"△\"-发现病人病情变化或其他" +
				"情况(详见护理记录单)
			</div>
		</div>

		<ckPagination style="margin:40px auto;" :currentPage="pageNos" :total="total" :pageSize="pageSize" @_pageSizeChange="pageSizeChange" @_currentPageChange="currentPageChange"></ckPagination>
		<div style="position:absolute;bottom:50px;">
			<el-button type="primary" size="mini" @click="handleNursing('save')">保存</el-button>
			<el-button type="primary" size="mini" @click="printview()">打印预览</el-button>
		</div>
		<el-dialog
			title="打印预览"
			:visible.sync="printDialogVisible"
			append-to-body
			height="100%"
			width="1300px">
			<div id="printConte">
				<div class="page-header">
					<h1 style="display: inline-block;">护理巡视及患者睡眠记录单(1)</h1>
					<span style="display: inline-block;">日期：{{topDate}}</span>
				</div>
				<table border="1" class="mb10" style="text-align: center; break-after: always;">
					<thead>
						<tr>
							<th width='110' v-for="item in headerData" :key="item.value">{{item.label}}</th>
						</tr>
					</thead>
					<tbody class="table-body">
						<tr v-for="item in tableData.slice(0, 15)" :key="item.id">
							<td class="tb-w">{{ item.BedNo}}</td>
							<td class="tb-w width-220">{{ item.PAT_NAME}}</td>
							<td class="tb-w">{{item.TP}}</td>
							<td class="tb-w">{{item.DB}}</td>
							<td class="tb-w">{{item.Seven}}</td>
							<td class="tb-w">{{item.SevenHalf}}</td>
							<td class="tb-w">{{item.Eight}}</td>
							<td class="tb-w">{{item.EightHalf}}</td>
							<td class="tb-w">{{item.Nine}}</td>
							<td class="tb-w">{{item.NineHalf}}</td>
							<td class="tb-w">{{item.Ten}}</td>
							<td class="tb-w">{{item.TenHalf}}</td>
							<td class="tb-w">{{item.Eleven}}</td>
							<td class="tb-w">{{item.ElevenHalf}}</td>
							<td class="tb-w">{{item.Twelve}}</td>
							<td class="tb-w">{{item.TwelveHalf}}</td>
							<td class="tb-w">{{item.Thirteen}}</td>
							<td class="tb-w">{{item.ThirteenHalf}}</td>
							<td class="tb-w">{{item.Fourteen}}</td>
							<td class="tb-w">{{item.FiveteenHalf}}</td>
							<td class="tb-w">{{item.Fiveteen}}</td>
							<td class="tb-w">{{item.FiveteenHalf}}</td>
							<td class="tb-w">{{item.Sixteen}}</td>
							<td class="tb-w">{{item.SixteenHalf}}</td>
							<td class="tb-w">{{item.Seventeen}}</td>
							<td class="tb-w">{{item.SeventeenHalf}}</td>
						</tr>
						<tr>
							<td class="tb-w" colspan="4">护士签名</td>
							<td class="tb-w td-hover" v-for="item in nursingSingerData" :key="item.Time">{{item.UserName}}</td>
						</tr>
					</tbody>
				</table>
				<div class="page-header">
					<h1 style="display: inline-block;">护理巡视及患者睡眠记录单(1)</h1>
					<span style="display: inline-block;">日期：{{topDate}}</span>
				</div>
				<table border="1" style="text-align: center;">
					<thead>
						<tr>
							<th width='110' v-for="item in headerData" :key="item.value">{{item.label}}</th>
						</tr>
					</thead>
					<tbody class="table-body">
						<tr v-for="item in tableData.slice(16)" :key="item.id">
							<td class="tb-w">{{ item.BedNo}}</td>
							<td class="tb-w width-220">{{ item.PAT_NAME}}</td>
							<td class="tb-w">{{item.TP}}</td>
							<td class="tb-w">{{item.DB}}</td>
							<td class="tb-w">{{item.Seven}}</td>
							<td class="tb-w">{{item.SevenHalf}}</td>
							<td class="tb-w">{{item.Eight}}</td>
							<td class="tb-w">{{item.EightHalf}}</td>
							<td class="tb-w">{{item.Nine}}</td>
							<td class="tb-w">{{item.NineHalf}}</td>
							<td class="tb-w">{{item.Ten}}</td>
							<td class="tb-w">{{item.TenHalf}}</td>
							<td class="tb-w">{{item.Eleven}}</td>
							<td class="tb-w">{{item.ElevenHalf}}</td>
							<td class="tb-w">{{item.Twelve}}</td>
							<td class="tb-w">{{item.TwelveHalf}}</td>
							<td class="tb-w">{{item.Thirteen}}</td>
							<td class="tb-w">{{item.ThirteenHalf}}</td>
							<td class="tb-w">{{item.Fourteen}}</td>
							<td class="tb-w">{{item.FiveteenHalf}}</td>
							<td class="tb-w">{{item.Fiveteen}}</td>
							<td class="tb-w">{{item.FiveteenHalf}}</td>
							<td class="tb-w">{{item.Sixteen}}</td>
							<td class="tb-w">{{item.SixteenHalf}}</td>
							<td class="tb-w">{{item.Seventeen}}</td>
							<td class="tb-w">{{item.SeventeenHalf}}</td>
						</tr>
						<tr>
							<td class="tb-w" colspan="4">护士签名</td>
							<td class="tb-w td-hover" v-for="item in nursingSingerData" :key="item.Time">{{item.UserName}}</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div style="text-align: right; padding: 10px 0;">
				<el-button type="primary" size="mini" v-print="printObj">打印</el-button>
				<!-- <el-button type="primary" size="mini" @click="handlePrint">打印</el-button> -->
			</div>
		</el-dialog>
	</div>
</template>
<script>
	import {
		mapState
	} from 'vuex'
	import moment from 'moment'
	import {
		createNamespacedHelpers
	} from 'vuex'
	const {
		mapActions
	} = createNamespacedHelpers('residentNurse')
	export default {
		name: 'nursingPatrol',
		data() {
			return {
				printObj: {
					id: "printConte",
					popTitle: 'good print',
					extraCss: 'https://www.baidu.com/,https://www.baidu.com/',
					extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>'
				},
				inputselectStatus: false,
				loading: true,
				pageSize: 20,
				pageNos: 1,
				total: 0,
				optionsSelect: [],
				topDate: moment(new Date()).format('YYYY-MM-DD'),
				tableData: [],
				headerData: [{
						value: '1',
						label: '床号'
					}, {
						value: '2',
						label: '姓名'
					}, {
						value: '3',
						label: 'T、P'
					}, {
						value: '4',
						label: '大便'
					}, {
						value: '5',
						label: '7:00'
					}, {
						value: '6',
						label: '7:30'
					}, {
						value: '7',
						label: '8:00'
					}, {
						value: '8',
						label: '8:30'
					}, {
						value: '9',
						label: '9:00'
					}, {
						value: '10',
						label: '9:30'
					},
					{
						value: '11',
						label: '10:00'
					}, {
						value: '12',
						label: '10:30'
					}, {
						value: '13',
						label: '11:00'
					}, {
						value: '14',
						label: '11:30'
					}, {
						value: '15',
						label: '12:00'
					}, {
						value: '16',
						label: '12:30'
					},
					{
						value: '17',
						label: '13:00'
					}, {
						value: '18',
						label: '13:30'
					}, {
						value: '19',
						label: '14:00'
					}, {
						value: '20',
						label: '14:30'
					}, {
						value: '21',
						label: '15:00'
					}, {
						value: '22',
						label: '15:30'
					}, {
						value: '23',
						label: '16:00'
					}, {
						value: '24',
						label: '16:30'
					},
					{
						value: '25',
						label: '17:00'
					}, {
						value: '26',
						label: '17:30'
					},
				],
				nursingSingerData: [],
				timer: null,
				printDialogVisible: false
			}
		},
		computed: {
			...mapState({
				loginUserId: state => state.global.userInfo,
				dptId: state => state.global.deptID
			})
		},
		created() {
			this.getNursingInspection()
			this.get_MASURIUM_DICT_ITEM()
			this.getNurseSingerName()
		},
		mounted() {
			this.timer = setTimeout(() => {
				this.inputselectStatus = true
			}, 1000)


		},
		methods: {
			...mapActions([
				'GetNursingInspection',
				'Get_MASURIUM_DICT_ITEM',
				'SaveNursingInspection',
				'GetNurseSingerName'
			]),
			handlePrint () {
				window.print()
			},
			getNurseSingerName() { //获取护士签名
				let data = {
					deptId: this.dptId,
					dttime: this.topDate
				}
				this.GetNurseSingerName(data).then(res => {
					if (res.code == 1) {
						this.nursingSingerData = res.values
					}
				})
			},
			handleTableCell(val) {
				this.nursingSingerData.forEach(item => {
					if (item.Time == val.Time) {
						item.UserName = this.loginUserId.UserName
						item.UserID = this.loginUserId.UserId
					}
				})
			},
			get_MASURIUM_DICT_ITEM() {
				this.Get_MASURIUM_DICT_ITEM().then(res => {
					if (res.code == 1) {
						this.optionsSelect = res.values
					}
				})
			},
			getNursingInspection() { //获取护理巡视表格信息
				let data = {
					deptid: this.dptId,
					dttime: this.topDate,
					pageSize: this.pageSize,
					pageNos: this.pageNos
				}
				this.GetNursingInspection(data).then(res => {
					if (res.code == 1) {
						this.loading = false
						let result = res.values
						this.total = result.total
						this.tableData = result.values
					}
				})
			},
			pageSizeChange(size) {
				this.pageSize = size
				this.getNursingInspection()
			},
			currentPageChange(val) {
				this.pageNos = val
				this.getNursingInspection()
			},
			arraySpanMethod({
				row,
				column,
				rowIndex,
				columnIndex
			}) {
				if (rowIndex === 0) {
					if (columnIndex === 0) {
						// return [1, 4]
					}
				}
			},
			handleNursing(val) {
				if (val == 'save') {
					//保存
					this.tableData.forEach(item => {
						item.DeptCode = this.dptId
					})
					let data = {
						eMR_HL_SMs: this.tableData,
						EMR_HL_SMseven: this.nursingSingerData,
					}
					this.SaveNursingInspection(data).then(res => {
						if (res.code == 1) {
							this.$message.success(res.msg)
							this.getNursingInspection()
							this.getNurseSingerName()
						}
					})
				}
			},
			handleCellClear(val) {
				this.nursingSingerData.forEach(item => {
					if (item.Time == val.Time) {
						item.UserName = ''
						item.UserID = ''
					}
				})
			},
			printview() {
				console.log(111)
				this.printDialogVisible = true
			},
		},
		beforeDestroy() {
			clearTimeout(this.timer)
		}
	}
</script>
<style lang="scss" scoped>
	@page {
		size: A4 landscape; /*  */
	}

	@media print {
		.noprint {
			display: none;
		}
		#printConte {
			.width-220 {
				width: 180px;
			}
		}
	}

	/deep/.el-select__caret.el-input__icon.el-icon-arrow-up {
		display: none !important;
	}

	.nursing-patrol {
		background-color: white;

		.el-select {
			border: none !important;
		}

		.el-select /deep/ .el-input {
			border: none !important;
			border-color: #fff;
		}

		.el-select /deep/ input {
			border: none !important;
		}

		.el-select /deep/ .el-select__caret {
			display: none !important;
		}

		.el-select /deep/ .el-icon-circle-close {
			display: block !important;
		}

		/deep/.el-select__caret.el-input__icon.el-icon-arrow-up {
			display: none !important;
		}

		/deep/.el-input--mini .el-input__inner {
			border: none;
			border-radius: 0px;
			cursor: pointer;
		}

		.table-wrapper {
			overflow: auto;
			height: calc(100vh - 320px);

			.gridtable {
				border-collapse: collapse;
				width: 100%;
				overflow: auto;
				table-layout: fixed;
				word-break: break-all;
				word-wrap: break-word;

				// .table-body {
				//     height: 300px;
				// }

				thead>tr {
					background: #eef1f6;
				}

				th,
				td {
					border: 1px solid #dfe6ec;
					font-size: 14px;
					font-weight: normal;
					text-align: center;
					padding: 6px 0px;
				}

				tbody>tr {
					&:hover {
						background: #eef1f6;
					}

					.td-hover:hover {
						cursor: pointer;
					}
				}
			}
		}


	}
</style>
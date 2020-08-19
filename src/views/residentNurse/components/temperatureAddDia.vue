<template>
	<div class="temperatureAdd-container">
		<el-dialog title="体温单录入" :visible.sync="temperatureDiaVis" top="2vh" width="1300px" @close='handleCancel'>
			<!-- <div>{{args}}dd</div> -->
			<el-container>
				<el-aside width="200px" class="fix-border">
					<el-tree :data="measureHistory" @node-click="handleNodeClick">
						<span class="custom-tree-node" slot-scope="{ node, data }">
							<span>
								<ckBtn :icon="data.Tag === 1 ? (node.expanded ? 'ck-icon-minus' : 'ck-icon-plus') : 'ck-icon-file2'"></ckBtn>{{ node.label }}
							</span>
						</span>
					</el-tree>
				</el-aside>
				<el-main>
					<div class="mb10">
						<el-form :inline="true" class="demo-form-inline">
							<el-form-item label="住院号">
								<el-input v-model="bedNo" placeholder="住院号" size='mini' disabled></el-input>
							</el-form-item>
							<el-form-item label="病人姓名">
								<el-input v-model="patientName" placeholder="病人姓名" size='mini' disabled></el-input>
							</el-form-item>
							<el-form-item label="测量日期">
								<el-button size="mini" style="vertical-align: 1px;" @click="handleSwitchDate('prev')">&lt;&lt;</el-button>
								<el-date-picker
									v-model="measureDate"
									type="date"
									size='mini'
									placeholder="测量日期">
								</el-date-picker>
								<el-button size="mini" style="vertical-align: 1px;" @click="handleSwitchDate('next')">&gt;&gt;</el-button>
							</el-form-item>
						</el-form>
						<el-table
							:data="tableData"
							border
							highlight-current-row
							size="mini"
							height="200"
							:cell-class-name="tableCellClassName"
							@cell-click='handleCellDblClick'
							@row-click="handleRowClick"
							style="width: 100%">
							<el-table-column
								prop="ORDERTIME"
								label="时间">
							</el-table-column>
							<el-table-column
								label="体温口表">
								<ckEditableCell slot-scope="{row}"
									v-model="row.MOUTH">
									<span slot="content">{{row.MOUTH}}</span>
								</ckEditableCell>
							</el-table-column>
							<el-table-column
								label="体温腋表">
								<ckEditableCell slot-scope="{row}"
									v-model="row.ARMPIT">
									<span slot="content">{{row.ARMPIT}}</span>
								</ckEditableCell>
							</el-table-column>
							<el-table-column
								label="脉搏">
								<ckEditableCell slot-scope="{row}"
									v-model="row.PULSE">
									<span slot="content">{{row.PULSE}}</span>
								</ckEditableCell>
							</el-table-column>
							<el-table-column
								label="起博心跳">
								<ckEditableCell slot-scope="{row}"
									v-model="row.HEARTBEAT">
									<span slot="content">{{row.HEARTBEAT}}</span>
								</ckEditableCell>
							</el-table-column>
							<el-table-column
								label="呼吸">
								<ckEditableCell slot-scope="{row}"
									v-model="row.BREATHING">
									<span slot="content">{{row.BREATHING}}</span>
								</ckEditableCell>
							</el-table-column>
							<el-table-column
								label="高热降温">
								<ckEditableCell slot-scope="{row}"
									v-model="row.FEVER">
									<span slot="content">{{row.FEVER}}</span>
								</ckEditableCell>
							</el-table-column>
							<el-table-column
								label="体温不升">
								<template slot-scope="scoped">
									<el-checkbox v-model="scoped.row.ISRISE"></el-checkbox>
								</template>
							</el-table-column>
							<el-table-column
								label="备注">
								<ckEditableCell slot-scope="{row}"
									v-model="row.REMARKS">
									<span slot="content">{{row.REMARKS}}</span>
								</ckEditableCell>
							</el-table-column>
							<el-table-column
								prop="TEMPERATURE"
								label="体温未测">
							</el-table-column>
						</el-table>
					</div>
					<div class="fix-border nurseinfo mb10">
						<el-form :inline="true" :model="nurseinfo" class="demo-form-inline">
							<div class="fix-line-height">
								<el-form-item label="住院日数">
									<el-input v-model="timeSet.txtHospitalDays" placeholder="住院日数" size="mini"></el-input>
								</el-form-item>
								<el-form-item label="皮试1">
									<el-select v-model="nurseinfo.SKINTEST1" size="mini" placeholder="请选择">
										<el-option
											v-for="item in skinTextOneOption"
											:key="item.Text"
											:label="item.Text"
											:value="item.Text">
										</el-option>
									</el-select>
								</el-form-item>
								<el-form-item label="皮试2">
									<el-select v-model="nurseinfo.SKINTEST2" size="mini" placeholder="请选择">
										<el-option
											v-for="item in skinTextOneOption"
											:key="item.Text"
											:label="item.Text"
											:value="item.Text">
										</el-option>
									</el-select>
								</el-form-item>
							</div>
							<div class="fix-line-height">
								<el-form-item label="体重(KG)">
									<el-input v-model="nurseinfo.WEIGHT" placeholder="体重(KG)" size="mini"></el-input>
								</el-form-item>
								<el-form-item label="血氧饱和度">
									<el-input v-model="nurseinfo.SATURATION2" placeholder="血氧饱和度" size="mini"></el-input>
								</el-form-item>
								<el-form-item label="血氧饱和度(%)">
									<el-input v-model="nurseinfo.SATURATION" placeholder="血氧饱和度(%)" size="mini"></el-input>
								</el-form-item>
							</div>
							<div class="fix-line-height">
								<el-form-item label="末梢血糖(mmol/L)">
									<el-input v-model="nurseinfo.HEIGHT" placeholder="末梢血糖(mmol/L)" size="mini"></el-input>
								</el-form-item>
								<el-form-item label="呼吸(次/分)2">
									<el-input v-model="nurseinfo.hx2" placeholder="呼吸(次/分)2" size="mini"></el-input>
								</el-form-item>
								<el-form-item label="血压(mmHg)">
									<el-input v-model="nurseinfo.BLOODPRESSURE" placeholder="血压(mmHg)" size="mini"></el-input>
								</el-form-item>
							</div>
							<div class="fix-line-height">
								<el-form-item label="入量(ml)">
									<el-input v-model="nurseinfo.IN_METE" placeholder="入量(ml)" size="mini"></el-input>
								</el-form-item>
								<el-form-item label="负压引流(ml)">
									<el-input v-model="nurseinfo.PRESSURE" placeholder="负压引流(ml)" size="mini"></el-input>
								</el-form-item>
								<el-form-item label="呼吸(次/分)">
									<el-input v-model="nurseinfo.hx" placeholder="呼吸(次/分)" size="mini"></el-input>
								</el-form-item>
							</div>
							<div class="fix-line-height">
								<el-form-item label="稍等">
									<el-input v-model="nurseinfo.CS" placeholder="稍等" size="mini"></el-input>
								</el-form-item>
								<el-form-item label="血压(mmHg)2">
									<el-input v-model="nurseinfo.BLOODPRESSURE2" placeholder="血压(mmHg)2" size="mini"></el-input>
								</el-form-item>
								<el-form-item label="大便(次/日)">
									<el-select v-model="nurseinfo.FAECES" size="mini" placeholder="请选择">
										<el-option
											v-for="item in faeceOption"
											:key="item.Text"
											:label="item.Text"
											:value="item.Text">
										</el-option>
									</el-select>
								</el-form-item>
							</div>
						</el-form>
					</div>
					<div>
						<el-form :inline="true" :model="timeSet" class="form-inline-time-set">
							<div class="fix-line-height">
								<el-form-item label="手术时间">
									<el-checkbox v-model="timeSet.dtpOperationDateCheck" class="mr5"></el-checkbox>
									<el-date-picker
									v-model="timeSet.dtpOperationDate"
									type="datetime"
									size="mini"
									placeholder="选择日期时间">
									</el-date-picker>
								</el-form-item>
								<el-form-item label="回室时间">
									<el-checkbox v-model="timeSet.dtpBackRoomDateCheck" class="mr5"></el-checkbox>
									<el-date-picker
									v-model="timeSet.dtpBackRoomDate"
									type="datetime"
									size="mini"
									placeholder="选择日期时间">
									</el-date-picker>
								</el-form-item>
							</div>
							<div class="fix-line-height">
								<el-form-item label="转入时间">
									<el-checkbox v-model="timeSet.dtpIntoDateCheck" class="mr5"></el-checkbox>
									<el-date-picker
									v-model="timeSet.dtpIntoDate"
									type="datetime"
									size="mini"
									placeholder="选择日期时间">
									</el-date-picker>
								</el-form-item>
								<el-form-item label="分娩时间">
									<el-checkbox v-model="timeSet.dtpChildbirthDateCheck" class="mr5"></el-checkbox>
									<el-date-picker
									v-model="timeSet.dtpChildbirthDate"
									type="datetime"
									size="mini"
									placeholder="选择日期时间">
									</el-date-picker>
								</el-form-item>
							</div>
							<div class="fix-line-height">
								<el-form-item label="死亡时间">
									<el-checkbox v-model="timeSet.dtpDeathDateCheck" class="mr5"></el-checkbox>
									<el-date-picker
									v-model="timeSet.dtpDeathDate"
									type="datetime"
									size="mini"
									placeholder="选择日期时间">
									</el-date-picker>
								</el-form-item>
								<el-form-item label="入院时间">
									<el-checkbox v-model="timeSet.dtpkIntodateCheck" class="mr5"></el-checkbox>
									<el-date-picker
									v-model="timeSet.dtpIntoDate"
									type="datetime"
									size="mini"
									placeholder="选择日期时间">
									</el-date-picker>
								</el-form-item>
							</div>
							<div class="fix-line-height">
								<el-form-item label="出院时间">
									<el-checkbox v-model="timeSet.dtpkOutDateCheck" class="mr5"></el-checkbox>
									<el-date-picker
									v-model="timeSet.dtpkOutDate"
									type="datetime"
									size="mini"
									placeholder="选择日期时间">
									</el-date-picker>
								</el-form-item>
							</div>
						</el-form>
					</div>
				</el-main>
			</el-container>
			<div slot="footer" class="dialog-footer" style="text-align:right;">
				<el-button type="primary" @click="handleSave" size="mini">保存</el-button>
				<el-button @click="handleDel('cell')" size="mini">删除</el-button>
				<el-button @click="handleDel('row')" size="mini">删除当天</el-button>
				<el-button @click="handleInsertDay" size="mini">补充时间</el-button>
				<el-button @click="handleDel('clear')" size="mini">清空</el-button>
				<el-button @click="handleCancel" size="mini">退出</el-button>
			</div>
		</el-dialog>
		<el-dialog
			title="补充时间点"
			append-to-body=""
			:visible.sync="insertTimedialogVisible"
			width="30%">
			<el-form :inline="true" class="demo-form-inline">
				<el-form-item label="请输入要插入的时间点">
					<el-input v-model="insertTimeVal" size="mini"></el-input>
				</el-form-item>
				<p>输入数组范围：[1, 24]</p>
			</el-form>
		<span slot="footer" class="dialog-footer">
			<el-button @click="insertTimedialogVisible = false" size="mini">取 消</el-button>
			<el-button type="primary" @click="handleInsertTimer" size="mini">确 定</el-button>
		</span>
		</el-dialog>
	</div>
</template>

<script type="text/javascript">
	import Evtbus from '@/utils/bus'
	import { createNamespacedHelpers } from 'vuex'
	import moment from 'moment'
	const { mapActions } = createNamespacedHelpers('residentNurse')

	export default {
		name: 'TemperatureAdd',
		props: {
			temperatureDiaVis: {
				type: Boolean,
				default: false
			},
			visitID: {
				type: String,
				default: ''
			},
			bedNo: {
				type: String,
				default: ''
			},
			patientName: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				measureDate: moment(new Date()).format('YYYY/MM/DD') + ' 00:00:00',
				tableData: [],
				nurseinfo: {
					days: '',
					ps1: '',
					ps2: ''
				},
				measureHistory: [{
					label: '已录入数据',
					children: [],
					Tag: 1
				}],
				currentCell: null,
				skinTextOneOption: [],
				skinTextTwoOption: [],
				skinValOne: '',
				skinValTwo: '',
				faeceOption: [],
				faeceVal: '',
				timeSet: {
					time: "0001-01-01T00:00:00",
					VisitID: null,
					info: null,
					dtpBackRoomDate: "2020-08-13T10:50:16.0437256+08:00",
					dtpBackRoomDateCheck: false,
					dtpIntoDate: "2020-08-13T10:50:16.0437256+08:00",
					dtpIntoDateCheck: false,
					dtpkOutDate: "2020-08-13T09:44:43",
					dtpkOutDateCheck: true,
					dtpDeathDate: "2020-08-13T10:50:16.0437256+08:00",
					dtpDeathDateCheck: false,
					dtpOperationDate: "2020-08-13T10:50:16.0437256+08:00",
					dtpOperationDateCheck: false,
					dtpkIntodate: "2017-11-07T11:00:00",
					dtpkIntodateCheck: true,
					dtpChildbirthDate: "2020-08-13T10:50:16.0437256+08:00",
					dtpChildbirthDateCheck: false,
					txtHospitalDays: "1001"
				},
				insertTimedialogVisible: false,
				insertTimeVal: '',
				args: ''
			}
		},
		created () {
			this.initData()
		},
		methods: {
			...mapActions([
				'GET_TEMPERATURE_BY_DAY',
				'GET_MEASURE_TEMPERATURE_HISTORY',
				'DEL_MEASURE_DATA_BY_DAY',
				'DEL_MEASURE_DATA_BY_CELL',
				'GET_NURSE_INFO',
				'GET_SKIN_TEXT_ONE',
				'GET_SKIN_TEXT_TWO',
				'GET_FAECE',
				'GET_TEMPERATURE_TIME_SET',
				'SAVE_TEMPERTAURE_DATA'
			]),
			initData () {
				this.actionGetTemperatureByDay()
				this.actionGetMeasureTempertureHistory()
				this.actionGetNurseInfo()
				this.actionGetSkinText()
				this.actionGetFaece()
				this.actionGetTemperatureTimeSet()
			},
			tableCellClassName({row, column, rowIndex, columnIndex}){//注意这里是解构
				//利用单元格的 className 的回调方法，给行列索引赋值
				row.index = rowIndex
				column.index = columnIndex
			},
			handleCellDblClick(row, column, cell, event) {
				console.log(row)
				this.currentCell = cell
				this.currentCellRowIndex = row.ORDERTIME
				this.currentCellColumnIndex = column.index
			},
			handleRowClick (row, column, event) {},
			handleSwitchDate(sym) {
				if (sym ==='prev') {
					this.measureDate = moment(new Date(new Date(this.measureDate).getTime() - 24 * 60 * 60 * 1000)).format('YYYY/MM/DD') + ' 00:00:00'
				} else if (sym === 'next') {
					this.measureDate = moment(new Date(new Date(this.measureDate).getTime() + 24 * 60 * 60 * 1000)).format('YYYY/MM/DD') + ' 00:00:00'
				}
				this.actionGetTemperatureByDay()
			},
			handleNodeClick(obj) {
				if (obj.label === '已录入数据') {
					return
				}
				this.measureDate = obj.label
				this.initData()
			},
			handleCancel() {
				// 取消
				this.$parent.temperatureDiaVis = false
			},
			handleDel (sym) {
				if (sym === 'cell') {
					// 删除单元格内的数据
					if (!this.currentCell.innerText.trim()) {
						this.$message.error('当前单元格无需要删除的内容')
						return
					}
					this.actionDelMeasureDataByCell()
				} else if (sym === 'row') {
					// 删除某天的数据
					this.actionDelMeasureDataByDay()
				} else if (sym === 'clear') {
					// 清空所有数据 
					this.tableData.forEach(item => {
						item.MOUTH = null
						item.ARMPIT = null
						item.ANUS = null
						item.PULSE = null
						item.HEARTBEAT = null
						item.BREATHING = null
						item.FEVER = null
						item.REMARKS = null
						item.TEMPERATURE = null
					})
				}
			},
			handleInsertDay () {
				this.insertTimedialogVisible = true
			},
			handleInsertTimer () {
				// 判断输入的是否是1-24之间的数字
				const reg = /^\d{1,2}$/
				if (!reg.test(this.insertTimeVal) || parseInt(this.insertTimeVal, 10) < 1 || parseInt(this.insertTimeVal, 10) > 24) {
					this.$message.error('请输入1-24之间的数字')
					this.insertTimeVal = ''
					return
				}
				const len = this.tableData.length
				let insertPos = -1
				// 判断在哪个范围内插入
				for(let i = 0; i < len; i++) {
					if (parseInt(this.insertTimeVal, 10) > parseInt(this.tableData[i].ORDERTIME, 10) && parseInt(this.insertTimeVal, 10) < parseInt(this.tableData[i + 1].ORDERTIME, 10)) {
						insertPos = i
						break
					}
				}
				this.tableData.splice(insertPos+1, 0, {
					"ORDERTIME": this.insertTimeVal,
					"MOUTH": null,
					"ARMPIT": null,
					"ANUS": null,
					"PULSE": null,
					"HEARTBEAT": null,
					"BREATHING": null,
					"FEVER": null,
					"ISRISE": "0",
					"REMARKS": null,
					"TEMPERATURE": null
				})
				this.insertTimedialogVisible = false
			},
			handleSave () {
				const args = {
					stInfo: {
						time: this.measureDate,
						VisitID: this.visitID,
						info: this.tableData,
						dtpBackRoomDate: this.timeSet.dtpBackRoomDate,
						dtpBackRoomDateCheck: this.timeSet.dtpBackRoomDateCheck,
						dtpIntoDate: this.timeSet.dtpIntoDate,
						dtpIntoDateCheck: this.timeSet.dtpIntoDateCheck,
						dtpkOutDate: this.timeSet.dtpkOutDate,
						dtpkOutDateCheck: this.timeSet.dtpkOutDateCheck,
						dtpDeathDate: this.timeSet.dtpDeathDate,
						dtpDeathDateCheck: this.timeSet.dtpDeathDateCheck,
						dtpOperationDate: this.timeSet.dtpOperationDate,
						dtpOperationDateCheck: this.timeSet.dtpOperationDateCheck,
						dtpkIntodate: this.timeSet.dtpkIntodate,
						dtpkIntodateCheck: this.timeSet.dtpkIntodateCheck,
						dtpChildbirthDate: this.timeSet.dtpChildbirthDate,
						dtpChildbirthDateCheck: this.timeSet.dtpChildbirthDateCheck,
						txtHospitalDays: this.timeSet.txtHospitalDays
					},
					ntf: {
						SKINTEST1: this.nurseinfo.SKINTEST1,
						SKINTEST2: this.nurseinfo.SKINTEST2,
						WEIGHT: this.nurseinfo.WEIGHT,
						SATURATION2: this.nurseinfo.SATURATION2,
						SATURATION: this.nurseinfo.SATURATION,
						HEIGHT: this.nurseinfo.HEIGHT,
						hx2: this.nurseinfo.hx2,
						BLOODPRESSURE: this.nurseinfo.BLOODPRESSURE,
						IN_METE: this.nurseinfo.IN_METE,
						PRESSURE: this.nurseinfo.PRESSURE,
						hx: this.nurseinfo.hx,
						CS: this.nurseinfo.CS,
						BLOODPRESSURE2: this.nurseinfo.BLOODPRESSURE2,
						FAECES: this.nurseinfo.FAECES
					}
				}
				this.args = args
				// TODO 保存数据
				this.SAVE_TEMPERTAURE_DATA(args).then(res => {
					if (res.code === 1) {
						this.$message.success('保存成功')
					}
				})
			},
			actionGetTemperatureByDay() {
				this.GET_TEMPERATURE_BY_DAY({
					VisitID: this.visitID,
					Time: this.measureDate
				}).then((res) => {
					this.tableData = res.values
					this.tableData.forEach(item => {
						item.ISRISE = parseInt(item.ISRISE, 10) === 0 ? false : true
					})
				})
			},
			actionGetMeasureTempertureHistory () {
				this.GET_MEASURE_TEMPERATURE_HISTORY({
					VisitID: this.visitID
				}).then(res => {
					this.measureHistory[0].children = res
				})
			},
			actionDelMeasureDataByDay() {
				this.$confirm('确定删除此天的数据？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.DEL_MEASURE_DATA_BY_DAY({
						time: this.measureDate,
						VisitID: this.visitID
					}).then(res => {
						if (res.code === 1) {
							this.$message.success('删除成功')
							this.actionGetTemperatureByDay()
							this.actionGetMeasureTempertureHistory()
						}
					})
				})
			},
			actionDelMeasureDataByCell() {
				this.$confirm('确定删除此单元格的数据？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.DEL_MEASURE_DATA_BY_CELL({
						time: this.measureDate,
						VisitID: this.visitID,
						CheckValue: this.currentCell.innerText.trim(),
						INDEXID_NURSE: this.currentCellColumnIndex + 2,
						rowno: this.currentCellRowIndex
					}).then(res => {
						if (res.code === 1) {
							this.$message.success('删除成功')
							this.actionGetTemperatureByDay()
						}
					})
				})
			},
			actionGetNurseInfo () {
				this.GET_NURSE_INFO({
					VisitID: this.visitID,
					time: this.measureDate
				}).then(res => {
					this.nurseinfo = res.values
				})
			},
			actionGetSkinText () {
				this.GET_SKIN_TEXT_ONE().then(res => {
					this.skinTextOneOption = res.values
				})
				this.GET_SKIN_TEXT_TWO().then(res => {
					this.skinTextTwoOption = res.values
				})
			},
			actionGetFaece () {
				this.GET_FAECE().then(res => {
					this.faeceOption = res.values
				})
			},
			actionGetTemperatureTimeSet () {
				this.GET_TEMPERATURE_TIME_SET({
					VisitID: this.visitID,
					time: this.measureDate
				}).then(res => {
					this.timeSet = res.values[0]
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.temperatureAdd-container{
		.fix-border{
			border:1px solid #EEE
		}
		.fix-pd10{
			padding: 10px;
		}
		.form-inline-time-set {
			padding: 10px;
		}
		/deep/ .nurseinfo .el-form-item{
			padding: 10px;
			margin-bottom: 5px;
		}
		/deep/ .fix-line-height {
			.el-form-item__label {
				line-height: 25px;
			}
			.el-form-item__content {
				line-height: 25px;
			}
		}
		/deep/ .el-tree-node__expand-icon {
			display: none !important;
		}
	}
</style>
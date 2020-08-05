<template>
	<div class="medisine-record-container">
		<h1 class="caption">病例封存/解封</h1>
		<el-form :inline="true">
			<el-form-item label="住院号: ">
				<el-input v-model="txtVisitIds" size="mini" placeholder="请输入"></el-input>
			</el-form-item>
			<el-form-item label="姓名: ">
				<el-input v-model="txtNames" size="mini" placeholder="请输入"></el-input>
			</el-form-item>
			<el-form-item label="科室: ">
				<el-select v-model="skincmbDept" size="mini" placeholder="请选择">
					<el-option
						v-for="item in skincmbDeptOptions"
						:key="item.DEPT_ID"
						:label="item.DEPT_NAME_CN"
						:value="item.DEPT_ID">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" size="mini" @click="handleSearch">查询</el-button>
			</el-form-item>
			<el-row>
				<!-- <el-col :span="14">
					<el-form-item label="描述: ">
						<el-input v-model="desc" placeholder="请输入"></el-input>
					</el-form-item>
				</el-col> -->
				<!-- <el-col :span="10">
					<el-form-item>
						<el-button type="primary" @click="handleSearch">查询</el-button>
					</el-form-item>
				</el-col> -->
			</el-row>
		</el-form>
		<el-table
			:data="tableData"
			class="mb20"
			:height="tableHeight"
			style="width: 100%;">
			<el-table-column
				prop="VISIT_ID"
				label="住院号"
				width="180">
			</el-table-column>
			<el-table-column
				prop="PAT_NAME"
				label="姓名"
				width="180">
			</el-table-column>
			<el-table-column
				prop="GENDER"
				label="性别">
			</el-table-column>
			<el-table-column
				prop="PATIENT_AGE"
				label="年龄">
			</el-table-column>
			<el-table-column
				prop="DEPT_NAME_CN"
				label="科室">
			</el-table-column>
			<el-table-column
				prop="IN_TIMES"
				label="次">
			</el-table-column>
			<el-table-column
				prop="ADM_DATE"
				label="入院时间">
			</el-table-column>
			<el-table-column
				prop="DISCHARGE_DATE"
				label="出院时间">
			</el-table-column>
			<el-table-column
				label="操作">
				<template slot-scope="scope">
					<el-button type="text" @click="handleDetail(scope.row)">详情</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-table
			:data="medisineRecordtableData"
			:height="tableHeight"
			style="width: 100%">
			<el-table-column
				prop="FILE_CODE"
				label="文件编码"
				width="180">
			</el-table-column>
			<el-table-column
				prop="VISIT_ID"
				label="住院号"
				width="180">
			</el-table-column>
			<el-table-column
				prop="PAT_NAME"
				label="姓名">
			</el-table-column>
			<el-table-column
				prop="FILE_NAME"
				label="病历名称">
			</el-table-column>
			<el-table-column
				prop="CREATE_DATE_TIME"
				label="创建时间">
			</el-table-column>
			<el-table-column
				prop="CREATOR_ID"
				label="创建人">
			</el-table-column>
			<el-table-column
				prop="INHOSNAME"
				label="住院医生">
			</el-table-column>
			<el-table-column
				prop="MAINNAME"
				label="主治医生">
			</el-table-column>
			<el-table-column
				prop="CHIEFNAME"
				label="主任医生">
			</el-table-column>
			<!-- 封存和解封是针对病历的 -->
			<el-table-column
				label="操作">
				<template slot-scope="scope">
					<el-button type="text" v-if="scope.row.ARCHIVE_MR === 1" @click="handleSealedAction(scope.row, 'unseal')">解封</el-button>
					<el-button type="text" v-if="scope.row.ARCHIVE_MR === 0" @click="handleSealedAction(scope.row, 'seal')">封存</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-dialog
			:title="sealTitle"
			:visible.sync="dialogVisible"
			width="30%"
			:before-close="handleClose">
				<el-input
					type="textarea"
					:rows="2"
					placeholder="请输入内容"
					v-model="reason">
				</el-input>
			<span slot="footer" class="dialog-footer">
			<el-button @click="handleClose">取 消</el-button>
			<el-button type="primary" @click="handleSave">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script type="text/javascript">
	import { mapActions } from 'vuex'

	export default {
		name: 'MedisineRecord',
		data () {
			return {
				skincmbDeptOptions: [],
				skincmbDept: '', // 科室
				txtVisitIds: '', // 住院号
				txtNames: '', // 姓名
				archive: '0', // 0：解封；1：封存
				desc: '', // 描述
				pageSize: 10,
				pageNos: 1,
				tableHeight: '',
				tableData: [],
				medisineRecordtableData: [],
				dialogVisible: false,
				sealTitle: '封存',
				args: null,
				reason: ''
			}
		},
		created () {
			// 控制两个表格的高度
			this.tableHeight = `${(document.documentElement.clientHeight - 300) / 2}px`
			this.getDeparments()
		},
		methods: {
			...mapActions([
				'GET_PATIENTS',
				'GET_MEDISINE_RECORD',
				'GET_DEPARTMENTS',
				'SAVE_MEDISINE_RECORD_SEAL'
			]),
			handleSearch () {
				this.GET_PATIENTS({
					skincmbDept: this.skincmbDept,
					txtVisitIds: this.txtVisitIds,
					txtNames: this.txtNames,
					pageSize: this.pageSize,
					pageNos: this.pageNos
				}).then((res) => {
					if (res.code === 1) {
						this.tableData = res.values.values
					}
				})
			},
			getDeparments () {
				this.GET_DEPARTMENTS().then((res) => {
					console.log(res)
					if (res.code === 1) {
						this.skincmbDeptOptions = res.values
					}
				})
			},
			handleSealedAction (obj, tag) {
				console.log(obj, tag)
				const args = {
					visitId: obj.VISIT_ID,
					txtNodess: '',
					inTimes: obj.In_Times,
					archive: 0
				}
				if (tag === 'seal') {
					args.archive = 1
					this.sealTitle = '封存'
				} else {
					this.sealTitle = '解封'
				}
				this.dialogVisible = true
				this.args = args
			},
			handleClose () {
				this.dialogVisible = false
			},
			handleSave () {
				if (!this.reason) {
					this.$message.error('请输入理由')
					return
				}
				this.args.txtNodess = this.reason
				this.SAVE_MEDISINE_RECORD_SEAL(this.args).then((res) => {
					if (res.code === 1) {
						this.$message.success(`${this.sealTitle}成功`)
						this.dialogVisible = false
					}
				})
			},
			handleDetail (obj) {
				console.log(obj)
				this.GET_MEDISINE_RECORD({
					VisitId: obj.VISIT_ID,
					inTimes: obj.IN_TIMES,
					pageSize: 10,
					pageNos: 1
				}).then((res) => {
					console.log(res)
					if (res.code === 1) {
						this.medisineRecordtableData = res.values.values
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.medisine-record-container{
		.caption{
			line-height: 2;
			font-size: 18px;
			font-weight: bold;
		}
	}
</style>

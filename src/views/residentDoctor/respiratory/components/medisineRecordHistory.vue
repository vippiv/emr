<template>
	<el-dialog
	title="历次病历查询"
	:visible.sync="medisineRecordHistoryDiaVis"
	fullscreen
	:before-close="handleCancel">
		<div class="medisineRecordHistory-container">
			<el-row class="mb10">
				<el-col :span="24" class="fix-border fix-pd10">
					<el-radio-group v-model="departmentVal">
						<el-radio :label="1">住院</el-radio>
						<el-radio :label="2">门诊</el-radio>
					</el-radio-group>
					<el-button type="plain" size="mini" class="fix-margin-left">复制新建病历</el-button>
				</el-col>
			</el-row>
			<el-table
				:data="tableData"
				class="mb10"
				size="mini"
				height="100px"
				border
				style="width: 100%">
				<el-table-column
					prop="PAT_NAME"
					label="病人姓名">
				</el-table-column>
				<el-table-column
					prop="IN_TIMES"
					label="住院次">
				</el-table-column>
				<el-table-column
					prop="ADM_DATE"
					label="入院日期">
				</el-table-column>
				<el-table-column
					prop="THREE_DAY_DIAGNOSIS_NAME"
					label="主要诊断">
				</el-table-column>
			</el-table>
			<el-container class="fix-border" style="height: calc(100vh - 250px)">
				<el-aside width="300px">
					<el-menu
						default-active="2"
						class="el-menu-vertical-demo">
							<el-submenu v-for="item in medisineRecordTree" :key="item.id" :index="item.id">
								<template slot="title"><div :class="!item.children ? 'hiddenIcon' : ''"><span>{{item.label}}</span></div></template>
								<div v-if="item.children">
										<div v-for="(subitem, subindex) in item.children" :key="subindex">
											<el-menu-item :index="subitem.code" @dblclick.native="handleShowThisData(subitem)">{{subitem.label}}</el-menu-item>
										</div>
								</div>
							</el-submenu>
					</el-menu>
				</el-aside>
				<el-main>
					<contentShow></contentShow>
				</el-main>
			</el-container>
		</div>
	</el-dialog>
</template>

<script type="text/javascript">
	import { createNamespacedHelpers } from 'vuex'
	import contentShow from './contentShow'
	import Evtbus from '@/utils/bus'
	const { mapActions } = createNamespacedHelpers('residentDoctor')
	export default {
		name: 'MedisineRecordHistory',
		props: {
			medisineRecordHistoryDiaVis: {
				type: Boolean,
				default: false
			},
			medisineRecordTree: {
				type: Array,
				default: () => []
			},
			patientId: {
				type: String,
				default: ''
			}
		},
		data () {
			return {
				departmentVal: 1,
				objectHeight: 0,
				tableData: []
			}
		},
		components: {
			contentShow
		},
		watch: {
			medisineRecordHistoryDiaVis (val) {
				if (val) {
					this.objectHeight = (document.documentElement.clientHeight - 250) + 'px'
					this.actionGetMedisineRecordHistory()
				}
			}
		},
		methods: {
			...mapActions([
				'MEDISINE_RECORD_HISTORY_LIST'
			]),
			handleShowThisData (obj, cb) {
				this.$nextTick(() => {
					Evtbus.$emit('InsertActiveXTab', obj, cb)
				})
			},
			handleCancel () {
				// this.$emit('actionShowDateChoose', false, 'cancel')
				this.$parent.medisineRecordHistoryDiaVis = false
			},
			actionGetMedisineRecordHistory () {
				this.MEDISINE_RECORD_HISTORY_LIST({
					visitId: this.patientId,
					pageSize: 10,
					pageNos: 1
				}).then((res) => {
					this.tableData = res.values.values
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.medisineRecordHistory-container {
		.fix-border {
			border:1px solid #eee;
		}
		.fix-pd10 {
			padding: 10px;
		}
		.fix-margin-left {
			margin-left: 15px;
		}
	}
</style>

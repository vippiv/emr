<template>
	<el-dialog
	title="病程时间"
	:visible.sync="dateChooseDiaVis"
	width="30%"
	:before-close="handleCancelInsert">
		<div class="dateChooseDia-container">
			<el-form ref="insertForm" :model="insertForm" :rules="insertRules" label-width="120px">
				<el-form-item label="病程时间：">
					<el-date-picker
						v-model="insertForm.dateChoose"
						type="datetime"
						size="mini"
						placeholder="选择日期时间">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="时间上下限：">
					<span class="date-range" v-if="actionTag === 'insert'">{{insertForm.dateMin}}</span>
					<span class="date-range noborder" v-if="actionTag === 'insert'">-</span>
					<span class="date-range">{{insertForm.dateMax}}</span>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleEmitInsert('insertForm')" size="mini">确定</el-button>
					<el-button @click="handleCancelInsert" size="mini">取消</el-button>
				</el-form-item>
			</el-form>
		</div>
	</el-dialog>
</template>

<script type="text/javascript">
	import moment from 'moment'

	export default {
		name: 'DateChooseDia',
		props: {
			dateChooseDiaVis: {
				type: Boolean,
				default: false
			},
			dateRange: {
				type: Object,
				default: () => {}
			}
		},
		data () {
			return {
				insertForm: {
					dateChoose: new Date(),
					dateMax: '',
					dateMin: '',
					actionTag: 'create'
				}
			}
		},
		watch: {
			dateChooseDiaVis (val) {
				if (val) {
					this.insertForm.dateMax = ''
					this.insertForm.dateMin = ''
					this.insertForm.dateMax = this.dateRange.dateMax
					if (this.dateRange && this.dateRange.dateMax && this.dateRange.dateMin) {
						this.actionTag = 'insert'
						this.insertForm.dateMin = this.dateRange.dateMin
					} else {
						this.actionTag = 'create'
						this.insertForm.dateMax = this.dateRange.dateMax
						if (new Date(this.dateRange.dateMax).getTime() > new Date(this.insertForm.dateChoose).getTime()) {
							this.insertForm.dateChoose = this.dateRange.dateMax
						}
					}
				}
			}
		},
		methods: {
			handleEmitInsert () {
				if (this.actionTag === 'create') {
					if (new Date(this.dateRange.dateMax.replace(/-/g, '/')).getTime() > new Date(this.insertForm.dateChoose).getTime()) {
						this.$message.error(`病程时间不能小于${moment(this.dateRange.dateMax).format('YYYY-MM-DD HH:mm')}`)
						return
					}
				} else if (this.actionTag === 'insert') {
					if (new Date(this.dateRange.dateMax.replace(/-/g, '/')).getTime() < new Date(this.insertForm.dateChoose).getTime() || new Date(this.insertForm.dateChoose).getTime() < new Date(this.dateRange.dateMin.replace(/-/g, '/')).getTime()) {
						this.$message.error(`病程时间必须在${moment(this.dateRange.dateMin).format('YYYY-MM-DD HH:mm')}和${moment(this.dateRange.dateMax).format('YYYY-MM-DD HH:mm')}之间`)
						return
					}
				}
				this.$emit('actionShowDateChoose', false, this.insertForm)
			},
			handleCancelInsert () {
				this.$emit('actionShowDateChoose', false, 'cancel')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.dateChooseDia-container {
		.date-range {
			border: 1px solid #dcdfe6;
			color: #c0c4cc;
			padding: 5px 10px;
			border-radius: 4px;
			font-size: 12px;
		}
		.noborder {
			border-color: transparent;
		}
	}
</style>

<template>
	<div class="clinicalreport-container">
		<h2 class="caption">定位</h2>
		<div class="resident-hospital">
			<el-form ref="form" label-width="80px">
				<el-row>
					<el-col :span="10">
                        <el-form-item label="床位">
						    <el-input v-model="bedNo" size="mini"></el-input>
					    </el-form-item>
					</el-col>
				</el-row>
                <el-row>
					<el-col :span="10">
                        <el-form-item label="住院号">
						    <el-input v-model="visitNo" size="mini"></el-input>
					    </el-form-item>
					</el-col>
				</el-row>
                <el-row>
					<el-col :span="10">
                        <el-form-item label="病人姓名">
						    <el-input v-model="patientName" size="mini"></el-input>
					    </el-form-item>
					</el-col>
				</el-row>
                <el-row>
                    <div class="block">
                        <el-form-item label="入院日期">
                        <el-date-picker
                        	size="mini"
                            v-model="inDate"
                            type="datetimerange"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :default-time="['12:00:00']">
                        </el-date-picker>
                        </el-form-item>
                    </div>
                </el-row>
                <el-row class="gen text-right">
                    <el-button type="primary" size="mini" @click="handleSearch">查找</el-button>
                    <el-button type="primary" size="mini" @click="handleClose">取消</el-button>
                </el-row>
			</el-form>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default {
		name: 'clinicalReport',
		inject: ['self'],
		data () {
			return {
				bedNo: '',
				visitNo: '',
				patientName: '',
				inDate: []
			}
		},
		methods: {
			handleSearch () {
				const args = {}
				if (this.bedNo) {
					args.txtBedNo = this.bedNo
				}
				if (this.visitNo) {
					args.txtVisitId = this.visitNo
				}
				if (this.patientName) {
					args.txtPatName = encodeURI(this.patientName)
				}
				if (this.inDate && this.inDate[0]) {
					args.dtpStartData = this.inDate[0]
				}
				if (this.inDate && this.inDate[1]) {
					args.dtpEndData = this.inDate[1]
				}
				this.self.getPatientList(args)
				this.handleClose()
			},
			handleClose () {
				this.self.handleCloseTopMeunDia()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.clinicalreport-container {
        .gen {
            margin: 19px 0;
        }
		h2.caption {
			font-size: 16px;
			font-weight: bold;
			text-align: center;
		}
	}
</style>

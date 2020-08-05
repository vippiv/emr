<template>
	<div class="clinicalreport-container">
		<h2 class="caption">临床报告</h2>
		<div class="resident-hospital">
			<el-form ref="form" :model="form" label-width="80px">
                <el-row class="gen">
                    <el-button type="primary">查询</el-button>
                    <el-button type="primary">退出</el-button>
                </el-row>
				<el-row :gutter="6">
					<el-col :span="10">
                            <el-radio-group v-model="form.resource">
								<el-radio label="1">检验</el-radio>
								<el-radio label="2">检查</el-radio>
								<el-radio disabled label="3">全</el-radio>
							</el-radio-group>
					</el-col>
					<el-col :span="14">
							<span> 注意: 如需查询微生物检验报告,请单独选择查询。</span>
					</el-col>
				</el-row>
			</el-form>
		</div>
        <div class="main">
            <el-row>
            <el-col :span="8">
            <el-input size="mini">
                <el-button slot="append">选择</el-button>
            </el-input>
            </el-col>
            </el-row>
        </div>
	</div>
</template>

<script type="text/javascript">
	export default {
		name: 'clinicalReport',
		data () {
			return {
				value: '',
				form: {
					name: '',
					resource: []
				}
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
        .main {
            border: 1px solid rgb(14, 12, 12);
            height: 356px;
            margin-top: 16px;
        }
	}
</style>

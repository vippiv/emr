<template>
	<div class="insertVectorGraph-container">
		<el-dialog
			title="矢量图列表"
			:visible.sync="insertVectorGraphDiaVis"
			width="40%"
			:before-close="handleCancelInsert">
				<el-container>
					<el-aside width="250px">
						<div class="vector-graph-box">
							<ul>
								<li v-for="item in vectorGraphs" :key="item.id" @click="handleGetVectorGraph(item)">{{item.label}}</li>
							</ul>
						</div>
					</el-aside>
					<el-main>
						<img :src="vectorGraphUrl" class="vector-graph">
					</el-main>
					<el-footer class="text-right">
						<el-button type="primary" size="mini" @click="handleEmitInsert('insertForm')">插入</el-button>
						<el-button size="mini" @click="handleCancelInsert">取消</el-button>
					</el-footer>
				</el-container>
			</el-dialog>
	</div>
</template>

<script type="text/javascript">
	import { createNamespacedHelpers } from 'vuex'

	const { mapActions } = createNamespacedHelpers('residentDoctor')

	export default {
		name: 'InsertVectorGraph',
		data () {
			return {
				vectorGraphs: null,
				vectorGraphUrl: ''
			}
		},
		props: ['insertVectorGraphDiaVis'],
		watch: {
			insertVectorGraphDiaVis (val) {
				if (val) {
					this.getAllVectorGraph()
				}
			}
		},
		methods: {
			...mapActions([
				'GET_ALL_VECTOR_GRAPH',
				'GET_VECTOR_GRAPH'
			]),
			getAllVectorGraph () {
				this.GET_ALL_VECTOR_GRAPH().then((res) => {
					if (res.code === 1) {
						this.vectorGraphs = res.values
					}
				})
			},
			handleGetVectorGraph (obj) {
				console.log(obj)
				this.GET_VECTOR_GRAPH({
					code: obj.code,
					imageID: obj.id
				}).then((res) => {
					if (res.code === 1) {
						console.log(res)
						this.vectorGraphUrl = res.msg
					}
				})
			},
			handleEmitInsert (formName) {
				if (!this.vectorGraphUrl) {
					this.$message.warning('请选择矢量图')
					return
				}
				this.$emit('actionInsertVectorGraph', this.vectorGraphUrl)
			},
			handleCancelInsert () {
				this.$parent.insertVectorGraphDiaVis = false
				this.$parent.handleIframeMask(false)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.insertVectorGraph-container {
		.vector-graph-box {
			border: 1px solid #eee;
			height: 500px;
			overflow-y: auto;
			li {
				padding-left: 10px;
				line-height: 2;
				cursor: pointer;
			}
		}
		.vector-graph {
			max-width: 100%;
		}
	}
</style>
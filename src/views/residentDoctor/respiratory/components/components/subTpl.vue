<template>
	<div class="sub-tpl-container">
		<el-form :inline="true" :model="formInline" class="demo-form-inline">
			<el-form-item label="">
				<el-input v-model="formInline.kyw" size="mini" placeholder="请输入模板名称"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" size="mini" @click="handleSearch">查询</el-button>
				<el-button type="primary" size="mini" @click="getSubModule">刷新</el-button>
			</el-form-item>
		</el-form>
		<el-tree v-if="!formInline.kyw" :data="subTplTreeData" @node-click="handleNodeClick" @node-contextmenu="handleRightClickSub">
			<span class="custom-tree-node" slot-scope="{ node, data }">
				<span>
					<ckBtn :icon="data.Tag === 1 ? (node.expanded ? 'ck-icon-minus' : 'ck-icon-plus') : 'ck-icon-file2'"></ckBtn>{{ node.label }}
				</span>
			</span>
		</el-tree>
		<ul class="search-tpl" v-else>
			<li v-for="tpl in searchTpls" :key="tpl.code" @dblclick="handleSimulateDblclick(tpl)" @contextmenu="handleSimulateRightClick($event, tpl)"><ckBtn icon='ck-icon-file2'></ckBtn> {{tpl.label}}</li>
		</ul>
		<div v-show="subMenuVisible" class="sub-context-menu" @mouseleave="subMenuVisible=!subMenuVisible">
			<ul id="subMenu">
				<li tabindex="-1" class="menu__item" @click="() => handleInsertContent()">
					<el-link type="primary" :underline="false">插入</el-link>
				</li>
			</ul>
		</div>
	</div>
</template>

<script type="text/javascript">
	import * as originAction from 'vuex'
	import handleActiveX from '@/utils/activeX'
	import Evtbus from '@/utils/bus'

	const { mapActions } = originAction.createNamespacedHelpers('residentDoctor')

	export default {
		name: 'SubTpl',
		data () {
			return {
				formInline: {
					kyw: ''
				},
				subTplTreeData: [],
				subMenuVisible: false,
				nodeData: null,
				searchTpls: []
			}
		},
		created () {
			this.getSubModule()
		},
		computed: {
			...originAction.mapState({
				workBenchID: state => state.global.workBenchID
			})
		},
		mounted () {
			// 初始化activeX对象
			Evtbus.$on('initActiveXObject', () => {
				this.initActiveXObject()
			})
			Evtbus.$on('updateTpls', () => {
				this.getSubModule()
			})
		},
		methods: {
			...originAction.mapActions([
				'GET_DOC_FILE'
			]),
			...mapActions([
				'GET_SUB_MODULE',
				'GET_CHILD_MODULE',
				'GET_CHILD_TEMPLATE_INFO'
			]),
			initActiveXObject () {
				setTimeout(() => {
					handleActiveX.init(document.getElementById('oframe' + Evtbus.objectId))
				}, 200)
			},
			handleInsertContent () {
				this.actionGetChildTplInfo()
			},
			handleRightClickSub (evt, obj, Node, element) {
				this.nodeData = Node
				this.subMenuVisible = true
				let subMenu = document.querySelector("#subMenu")
				subMenu.style.cssText = "left: " + (evt.clientX - 10) + 'px' + "; top: " + (evt.clientY - 25) + 'px;'
			},
			getSubModule () {
				this.GET_SUB_MODULE({
					WORKBENCH_CODE: this.workBenchID
				}).then((res) => {
					if (res.code === 1) {
						this.subTplTreeData = res.values
						this.subTplTreeData.forEach(item => {
							item.children = [{
								id: 0,
								label: ''
							}]
						})
					}
				})
			},
			handleNodeClick (node) {
				// Tag === 0 表示该节点是模板，无子节点
				if (node.Tag === 0) {
					return
				}
				let dept_id = ''
				if (!node.filePath) {
					dept_id = node.id
				} else {
					dept_id = node.code
				}
				this.GET_CHILD_MODULE({
					DEPT_ID: dept_id,
					UserID: 'admin'
				}).then((res) => {
					if (res.code === 1) {
						node.children = res.values
					}
				})
			},
			handleSearch () {
				if (!this.formInline.kyw) {
					this.$message.error('请输入查询内容')
					return
				}
				this.GET_MODULE_CHILDREN({
					DEPT_ID: this.deptID,
					DEPT_Name: encodeURI(this.userInfo.UserName),
					UserID: this.userInfo.UserId,
					searchValue: encodeURI(this.formInline.kyw)
				}).then((res) => {
					if (res.code === 1) {
						this.searchTpls = res.values
					}
				})
			},
			actionGetChildTplInfo () {
				this.GET_CHILD_TEMPLATE_INFO({
					Mr_code: this.nodeData.data.code
				}).then((res) => {
					if (res.code === 1) {
						this.actionGetDocFile()
					}
				})
			},
			actionGetDocFile () {
				const filePathArr = this.nodeData.data.filePath.split('/')
				const filePathArrLen = filePathArr.length
				const file = [filePathArr.slice(0, filePathArrLen-1).join('/'), filePathArr[filePathArrLen-1]]
				this.GET_DOC_FILE({
					fileName: file[1],
					areaName: file[0]
				}).then((res) => {
					if (res.code === 1) {
						console.log(res.values)
						handleActiveX.obj.MergeDocumentsWithString(true, true, res.values)
						handleActiveX.obj.executeMethod("SwBackspace")
					} else {
						this.$message.warning(res.values)
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.sub-tpl-container {
		height: calc(100vh - 290px);
		overflow-y: auto;
		.sub-context-menu {
			background-color: white;
			#subMenu {
				position: fixed;
				cursor: pointer;
				background-color: #eee;
			}
			.menu__item {
				width: 100%;
				display: block;
				line-height: 20px;
				text-align: left;
				margin: 10px 0;
				padding: 0 10px;
			}
		}
		.demo-form-inline {
			display: flex;
			/deep/ .el-form-item{
				width: 50%;
			}
		}
		/deep/ .ck-icon-folder {
			color: rgb(255, 178, 51) !important;
		}
		/deep/ .ck-icon-file {
			color: rgb(0, 161, 224)
		}
		/deep/ .el-tree-node__expand-icon {
			display: none !important;
		}
	}
</style>

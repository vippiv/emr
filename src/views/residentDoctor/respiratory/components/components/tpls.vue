<template>
	<div class="tpls-container">
		<div v-text="args" style="word-break: break-all;"></div>
		<el-form :inline="true" :model="formInline" class="demo-form-inline">
			<el-form-item label="">
				<el-input v-model="formInline.kyw" size="mini" placeholder="请输入模板名称"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" size="mini" @click="handleSearch">查询</el-button>
				<el-button type="primary" size="mini" @click="getModule">刷新</el-button>
			</el-form-item>
		</el-form>
		<el-trees v-if="!formInline.kyw" id="el-tree" :data="subTplTreeData" @node-click="handleModuleNodeClick" @node-contextmenu="handleRightClick" @node-dblclick="hdlDblclick">
			<span class="custom-tree-node" slot-scope="{ node, data }">
				<span>
					<ckBtn :icon="data.Tag === 1 ? (node.expanded ? 'ck-icon-minus' : 'ck-icon-plus') : 'ck-icon-file2'"></ckBtn>{{ node.label }}
				</span>
			</span>
		</el-trees>
		<ul class="search-tpl" v-else>
			<li v-for="tpl in searchTpls" :key="tpl.code" @dblclick="handleSimulateDblclick(tpl)" @contextmenu="handleSimulateRightClick($event, tpl)"><ckBtn icon='ck-icon-file2'></ckBtn> {{tpl.label}}</li>
		</ul>
		<div v-show="menuVisible" class="context-menu" @mouseleave="menuVisible=!menuVisible">
			<ul id="menu">
				<li v-if="onlyProcess" tabindex="-1" class="menu__item" @click="() => handleCreatEle()">
					<img class="icon" :src="createIcon"> <el-link type="primary" :underline="false">新建</el-link>
				</li>
				<li v-if="onlyProcess" tabindex="-1" class="menu__item" @click="() =>handleInsertInit()">
					<img class="icon" :src="insertIcon"> <el-link type="primary" :underline="false">插入</el-link>
				</li>
				<li tabindex="-1" class="menu__item" @click="() =>handleCreateNew()">
					<img class="icon" :src="newIcon"> <el-link type="primary" :underline="false">新建病程</el-link>
				</li>
			</ul>
		</div>
		<dateChooseDia
			:dateChooseDiaVis="dateChooseDiaVis"
			:dateRange="dateRange"
			@actionShowDateChoose="actionShowDateChoose"
		></dateChooseDia>
	</div>
</template>

<script type="text/javascript">
	import Vue from 'vue'
	import { Tree } from 'element-ui'
	import * as originAction from 'vuex'
	import contextMenu from "@/mixins/contextMenu"
	import handleActiveX from '@/utils/activeX'
	import Evtbus from '@/utils/bus'
	import dateChooseDia from './dateChooseDia'
	import moment from 'moment'
	import insertIcon from '@/assets/images/icon/insert.png'
	import createIcon from '@/assets/images/icon/create.png'
	import newIcon from '@/assets/images/icon/new.png'
	Tree.name = 'extend-base-el-tree'
	Vue.use(Tree)

	const { mapActions } = originAction.createNamespacedHelpers('residentDoctor')

	export default {
		name: 'Tpls',
		data () {
			return {
				formInline: {
					kyw: ''
				},
				subTplTreeData: [],
				nodeData: {},
                menuVisible: false,
                dateChooseDiaVis: false,
                args: null,
                dateRange: {
					dateMax: '',
					dateMin: ''
				},
				cursorRegion: null,
				onlyProcess: true,
				searchTpls: [],
				insertIcon,
				createIcon,
				newIcon
			}
		},
		computed: {
			...originAction.mapState({
				deptID: state => state.global.deptID,
				workBenchID: state => state.global.workBenchID,
				patientInfo: state => state.residentDoctor.patientInfo,
				userInfo: state => state.global.userInfo
			})
		},
		watch: {
			'formInline.kyw' (val) {
				if (!val) {
					this.searchTpls = []
				}
			}
		},
		mixins: [contextMenu],
		components: {
			dateChooseDia
		},
		created () {
			this.getModule()
		},
		mounted () {
			// 初始化activeX对象
			Evtbus.$on('initActiveXObject', () => {
				this.initActiveXObject()
			})
			Evtbus.$on('updateTpls', () => {
				this.getModule()
			})
		},
		methods: {
			...mapActions([
				'GET_MODULE',
				'GET_MODULE_CHILDREN',
				'CREATE_OR_INSERT_DOC',
				'CREATE_NEW_DOC_CHECK_FILE_EXIST',
				'CREATE_NEW_DOC',
				'CHECK_CREATE_NEW',
				'CHECK_INSERT_PIECE'
			]),
			...originAction.mapActions([
				'GET_DOC_FILE'
			]),
			initActiveXObject () {
				setTimeout(() => {
					handleActiveX.init(document.getElementById('oframe' + Evtbus.objectId))
				}, 200)
			},
			handleRightClick (evt, obj, Node, element) {
				console.log(evt, obj, Node, element)
				if (parseInt(obj.Tag, 10) === 1) { // 文件夹，不允许右键，单击，加载子节点
					return
				}
				if (parseInt(obj.MenuStrip, 10) !== 1) { // 区域病程，只能右击，不能双击
					return
				}
				if (obj.MenuStrip !== undefined && (parseInt(obj.MenuStrip, 10) === 0 || parseInt(obj.MenuStrip, 10) === 1)) {
					this.onlyProcess = true
					this.nodeData = Node // 这里的Node数据可能不全，有从其他地方模拟而来
					this.menuVisible = true
					let menu = document.querySelector("#menu")
					menu.style.cssText = "left: " + (evt.clientX - 0) + 'px' + "; top: " + (evt.clientY - 0) + 'px;'
					if (parseInt(obj.MenuStrip, 10) === 0) {
						this.onlyProcess = false
					}
				}
			},
			handleSimulateRightClick (evt, node) {
				console.log('右击', evt, node)
				evt.preventDefault()
				this.handleRightClick(evt, node, {
					data: node
				})
			},
			hdlDblclick (node) {
				if (parseInt(node.MenuStrip, 10) === 1) { // 区域病程，不能双击
					return
				}
				this.nodeData = {data: node} // 由于右键会把node进行封装，这里也转封装一次
				this.handleCreateNew()
			},
			handleCreatEle (ret) { // 新建文档
				if (!ret) { // 显示时间选择框
					this.CHECK_CREATE_NEW({
						RegionNames: handleActiveX.getAllRegion(),
						visit_Id: this.patientInfo.VISIT_ID,
						Mr_Code: this.nodeData.data.code
					}).then((res) => {
						if (res.code === 1) {
							this.actionShowDateChoose(true, 'create') // 弹出时间选择框
						} else {
							this.$message.error(res.msg)
						}
					})
				}
				if (ret) {
					let actionSymbol = 'create'
					// 这里会拿到用户选择的时间，这个时间要插入到控件里去
					// 如果ret的三个值都存在代表插入，否则是新建
					if (ret.dateChoose && ret.dateMax && ret.dateMin) {
						actionSymbol = 'insert'
					}
					this.actionCreateOrInsertDoc({
						Mr_Code: this.nodeData.data.code,
						visit_Id: this.patientInfo.VISIT_ID,
						RegionNames: handleActiveX.getAllRegion(),
					}, actionSymbol, ret.dateChoose)
				}
				// 隐藏右键菜单
				this.actionCloseContextMenu()
			},
			handleInsertInit () { // 插入，用于判断是否要弹出时间选择弹窗
				this.CHECK_INSERT_PIECE({
					RegionNames: handleActiveX.getAllRegion(),
					visit_Id: this.patientInfo.VISIT_ID,
					Mr_Code: this.nodeData.data.code
					// childname // 妇产科需要传入该字段
				}).then((res) => {
					if (res.code === 1) {
						const insertSymbol = handleActiveX.tools.calcShowDateChooseDia()
						if (insertSymbol.bounce) {
							// 直接插入
							this.actionCreateOrInsertDoc({
								Mr_Code: this.nodeData.data.code,
								visit_Id: this.patientInfo.VISIT_ID,
								RegionNames: handleActiveX.getAllRegion()
							}, 'insert', insertSymbol.insertDate)
						} else {
							// 给出弹窗
							this.dateRange.dateMax = moment(insertSymbol.dateMax).format('YYYY-MM-DD HH:mm')
							this.dateRange.dateMin = moment(insertSymbol.dateMin).format('YYYY-MM-DD HH:mm')
							this.cursorRegion = insertSymbol.cursorRegion
							this.dateChooseDiaVis = true
							Evtbus.$emit('showIframe', this.dateChooseDiaVis)
						}
					} else {
						this.$message.error(res.msg)
					}
				})
			},
			handleCreateNew () { // 新建病程
				this.actionCreateNewDoc({
					mrCode: this.nodeData.data.code,
					visit_Id: this.patientInfo.VISIT_ID
				})
				this.actionCloseContextMenu()
			},
			// 请求患者信息及需要插入的文档，然后执行插入操作
			actionCreateOrInsertDoc (args, tag, dateChoose) {
				this.CREATE_OR_INSERT_DOC(args).then((res) => {
					if (res.code === 1) {
						const data = res.values
						// 插入到当前文档中
						const baseObj = {
							sNameInsert: res.values3
						}
						this.actionGetOdtFile({
							fileName: `${this.nodeData.data.code}.odt`,
							areaName: res.values6
						}).then((res) => {
							handleActiveX.tools.insertContentIntoDoc(baseObj, tag, dateChoose, res.values, this.cursorRegion, this.patientInfo)
						})
					} else {
						this.$message.error(res.msg)
					}
				})
			},
			actionCreateNewDoc (args) {
				new Promise((resolve) => {
					this.CREATE_NEW_DOC_CHECK_FILE_EXIST(args).then((res) => {
							resolve(res)
					})
				}).then((res) => {
					if (res.code === 1) {
						args.listCode = this.nodeData.data.code2
						this.CREATE_NEW_DOC(args).then((res) => {
							if (res.code === 1) {
								Evtbus.$emit('InsertActiveXTab', this.nodeData.data, () => {
									// TODO 如果这里用this.patientInfo会导致报错，原因是字段不一致，但其他地方只能通过this.patientInfo替换患者信息，所以必须要改查找患者信息接口返回字段
									handleActiveX.tools.fillPatientInfo(res.values) // 替换患者信息
									if (parseInt(this.nodeData.data.MenuStrip, 10) === 1) {
										handleActiveX.tools.insertRegion(this.nodeData.data.code2) // 插入一个新region
									}
								})
							} else {
								this.$message.error(res.msg)
							}
						})
					} else {
						this.$message.error(res.msg)
					}
				})
			},
			async actionGetOdtFile (args) {
				return await this.GET_DOC_FILE({
					fileName: args.fileName,
					areaName: args.areaName
				})
			},
			actionCloseContextMenu () {
				this.menuVisible = false
				let menu = document.querySelector("#menu")
				menu.style.cssText = "left: -100000px"
				menu.style.left = "-100000px"
			},
			actionShowDateChoose (val, ret) {
				if (ret === 'cancel') { // 用户在时间选择框处直接取消
					this.dateChooseDiaVis = val
					Evtbus.$emit('showIframe', this.dateChooseDiaVis)
					return
				}
				// 新建 ---> 这里要获取到当前文档region的最大时间，作为新建region时间的下限，实现的逻辑是获取到了最大时间
				if (ret === 'create') {
					this.dateRange.dateMax = ''
					this.dateRange.dateMin = ''
					const dateMax = handleActiveX.tools.getDocDateRange()
					this.dateRange.dateMax = dateMax
					this.dateChooseDiaVis = val
					Evtbus.$emit('showIframe', this.dateChooseDiaVis)
				}
				if (ret !== 'create' && ret !== 'insert' && !!ret) {
					// 隐藏时间选择弹窗
					this.dateChooseDiaVis = val
					Evtbus.$emit('showIframe', this.dateChooseDiaVis)
					// ret可能返回只带一个时间的值，也可能返回带两个时间的值，前者代表新建，后者代表插入
					this.handleCreatEle(ret)
				}
			},
			getModule () {
				this.GET_MODULE({
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
			handleModuleNodeClick (node, data) {
				// Tag === 0 表示该节点是模板，无子节点
				if (node.Tag === 0) {
					// Evtbus.$emit('InsertActiveXTab', node)
					return
				}
				let dept_id = ''
				if (!node.filePath) {
					dept_id = node.id
				} else {
					dept_id = node.code
				}
				this.GET_MODULE_CHILDREN({
					DEPT_ID: dept_id,
					DEPT_Name: encodeURI(node.label),
					UserID: this.userInfo.UserId
				}).then((res) => {
					if (res.code === 1) {
						node.children = res.values
					}
				})
			},
			handleSimulateDblclick (node) {
				this.handleModuleNodeClick(node)
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
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tpls-container {
		height: calc(100vh - 230px);
		overflow-y: auto;
		.context-menu {
			background-color: white;
			#menu {
				position: fixed;
				cursor: pointer;
				background-color: white;
				border: 1px solid #EEE;
				border-radius: 5px;
				box-shadow: 0px 0px 20px #CCC;
			}
			.menu__item {
				width: 100%;
				display: block;
				line-height: 20px;
				text-align: left;
				margin: 10px 0;
				padding: 0 10px;
				.icon {
					margin-right: 15px;
				}
			}
		}
		.custom-tree-node > span {
			user-select: none;
		}
		.demo-form-inline {
			display: flex;
			/deep/ .el-form-item{
				width: 50%;
			}
		}
		.search-tpl {
			li {
				line-height: 2;
			}
		}
		/deep/ .el-tree-node__expand-icon {
			display: none !important;
		}
	}
</style>

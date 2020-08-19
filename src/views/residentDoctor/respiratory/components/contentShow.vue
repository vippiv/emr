<template>
	<div class="odt-show-container">
		<el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab" @tab-click="handleClick">
			<el-tab-pane
				v-for="(item) in editableTabs"
				:key="item.name"
				:label="item.title"
				:name="item.name"
				:title="item.title"
				>
				 <object v-if="item.filePath" classid="clsid:43C3EF10-8FE6-45CD-A65B-1792FD3FB9DE" codebase="NsoOffice.dll" :id="'oframe' + item.tabIndex" width="100%" :height="objectHeight"></object>
				 <div v-else class="others" :style="styleObj">
				 	<component 
						:is="componentName"
						:temperatureSheetData="temperatureSheet.sheetData"
						@actionGetTemperatureData="handleGetNewTemperatureData"
					></component>
				 </div>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script type="text/javascript">
	import * as originAction from 'vuex'
	import handleActiveX from '@/utils/activeX'
	import { deepCopy } from '@/utils/utils'
	import Evtbus from '@/utils/bus'
	import handleTemperatureSheetData from '@/utils/temperatureSheet'
	import moment from 'moment'
	import doctorAdvice from './doctorAdvice'
	import reportAnalysis from './reportAnalysis'
	import outPatientReportAnalysis from './outPatientReportAnalysis'
	import textCheckReport from './textCheckReport'

	const { mapActions } = originAction.createNamespacedHelpers('residentDoctor')

	export default {
		name: 'ContentShow',
		data () {
			return {
				fileName: '',
				stream: '',
				editableTabsValue: '0',
				editableTabs: [
					// title: target.label, // 标签名
					// name: newTabName, // 当前标签的数字标识
					// content: 'New Tab content', // 文档流
					// filePath: target.filePath // 加载文档的路径
				],
				tabIndex: 0,
				timer: null,
				componentName: null,
				objectHeight: 0,
				styleObj: {
					height: '730px'
				},
				temperatureSheet: {
					sheetData: null
				},
			}
		},
		computed: {
			...originAction.mapState({
				deptID: state => state.global.deptID,
				patientInfo: state => state.residentDoctor.patientInfo,
				medisineOperationItem: state => state.residentDoctor.medisineOperationItem
			})
		},
		components: {
			doctorAdvice,
			reportAnalysis,
			textCheckReport,
			outPatientReportAnalysis
		},
		inject: ['self'],
		created () {
			this.objectHeight = (document.documentElement.clientHeight - 150) + 'px'
			this.styleObj.height = this.objectHeight
		},
		mounted () {
			this.initTabEvt()
		},
		methods: {
			...originAction.mapActions([
				'GET_DOC_FILE',
				'A_GET_TEMPERATURE_SHEET_DATA'
			]),
			...mapActions([
				'SAVE_MEDISINE_OPERATION_DOC',
				'MEDISINE_RECORD_LOCK',
				'MEDISINE_RECORD_UNLOCK'
			]),
			async getOdtFile (filePath) {
				let file = ''
				if (filePath.includes('Template')) {
					const filePathArr = filePath.split('/')
					const filePathArrLen = filePathArr.length
					file = [filePathArr.slice(0, filePathArrLen-1).join('/'), filePathArr[filePathArrLen-1]]
				} else {
					file = filePath.split('//')
				}
				let fileName = ''
				let areaName = ''
				if (file && file.length > 0) {
					fileName = file[1]
					areaName = file[0]
				}
				const res = await this.GET_DOC_FILE({
					fileName,
					areaName
				})
				return res
			},
			initTabEvt () {
				const _this = this
				function loadOdt (obj, cb) {
					_this.getOdtFile(obj.filePath).then((res) => {
						// 根据后台code状态决定是否要打开新标签页
						if (res.code === 1) {
							_this.addTab(obj) // 往this.editableTabs中push一条记录
							_this.editableTabs[_this.editableTabs.length - 1].content = res.values
							_this.handleOpenDoc(_this.editableTabs.length - 1, cb)
						} else {
							_this.$message.warning(res.values)
						}
					})
				}
				Evtbus.$on('InsertActiveXTab', (obj, cb) => {
					let tabIndex = null, needTabIndex = -1
					this.editableTabs.forEach((item, index) => {
						if (item.title === obj.label || (item.filePath === obj.filePath && obj.filePath)) {
							tabIndex = item.tabIndex
							needTabIndex = index
						}
					})
					// 文档已经打开的情况，如果不是当前文档，则要跳转到当前文档，然后定位到对应区域,根据capion_Date_Time字段，从文档中找对应region
					if (tabIndex) {
						this.actionControlActiveXHandler(obj)
						this.editableTabsValue = tabIndex + '' // 定位到正确文档
						// 切换正确的this.editableTabs对象
						this.handleClick(this.editableTabs[needTabIndex])
						// 定位到正确区域
						this.actionLoctionRegion(obj.regionNum)
						return
					}
					if (obj.filePath && obj.filePath.includes('.odt')) { // 加载odt文档
						const _this = this
						if (cb) {
							cb = function() {
								cb()
								_this.actionLoctionRegion(obj.regionNum)
							}
						} else {
							cb = function() {
								_this.actionLoctionRegion(obj.regionNum)
							}
						}
						loadOdt(obj, cb)
						Evtbus.$emit('showDocHandleBtn', true)
					} else if (obj.label.indexOf('体温单') > -1) { // 加载其他文档
						this.actionGetTemperatureSheetData('2020/07/28')
						this.componentName = 'ckThermometer'
						Evtbus.$emit('showDocHandleBtn', false)
						this.addTab(obj)
					} else if (obj.label.indexOf('住院医嘱') > -1) {
						this.componentName = 'doctorAdvice'
						Evtbus.$emit('showDocHandleBtn', false)
						this.addTab(obj)
					} else if (obj.label.indexOf('门诊报告分析') > -1) {
						this.componentName = 'outPatientReportAnalysis'
						Evtbus.$emit('showDocHandleBtn', false)
						this.addTab(obj)
					} else if (obj.label.indexOf('报告分析') > -1) {
						this.componentName = 'reportAnalysis'
						Evtbus.$emit('showDocHandleBtn', false)
						this.addTab(obj)
					} else if (obj.label.indexOf('普通文本检查报告') > -1) {
						this.componentName = 'textCheckReport'
						Evtbus.$emit('showDocHandleBtn', false)
						this.addTab(obj)
					}
				})
				// 保存成功后把标题中的'*'号替换掉
				Evtbus.$on('replaceTabStar', (obj) => {
					let activeTab = -1
					// 这里要先关闭检查文档修改的轮训，等标题更改好后再开启
					clearTimeout(this.timer)
					this.timer = null
					this.editableTabs.forEach((item, index) => {
						if (parseInt(item.name, 10) === parseInt(Evtbus.objectId, 10)) {
							if (item.title[0] && item.title[0] === '*') {
								item.title = item.title.replace('*', '')
							}
							if (item.label[0] && item.label[0] === '*') {
								item.label = item.label.replace('*', '')
							}
							if (obj && obj.saveTime) {
								item.title += obj.saveTime
							}
						}
					})
					// 把文档状态改成未修改
					handleActiveX.tools.setDocModified(false)
					// 将当前文档所有的区域记录脏标记置位为0
					handleActiveX.clearRegionModifyFlag()
					// 再次启动轮训
					this.actionDocMidifyListener()
				})
				// 记录文档书写模式
				Evtbus.$on('updateDocWriteMode', (mode) => {
					// 存在Object对象才往下执行
					if (!document.getElementById('oframe' + this.editableTabsValue)) {
						return
					}
					// 把书写模式存到对象上
					this.editableTabs.forEach((item, index) => {
						if (parseInt(this.editableTabsValue, 10) === parseInt(item.name, 10)) {
							item['writeMode'] = mode
						}
					})
				})
				Evtbus.$on('OutActiveXTab', () => {
					this.editableTabs = []
				})
			},
			// 根据regionNum查找region并定位过去, 不能通过时间定位，存在同样的时间
			actionLoctionRegion (regionNum) {
				if (!regionNum) {
					return
				}
				const allRegions = handleActiveX.getAllRegion().split(',') // 返回新式控件的名称
				let regionName = null
				if (allRegions.length > 1) {
					allRegions.forEach(item => {
						// 传入时间的值和控件文本的值相当时，该控件所在区域就是我们所要定位的区域
						const lastNum = item && item.split('-')[item.split('-').length - 1]
						if (regionNum === lastNum) {
							regionName = item
						} 
					})
				}
				// 光标跳转到指定区域
				if (regionName) {
					const pos = handleActiveX.obj.GetRegionBegin(regionName)
					handleActiveX.obj.JumpToOnePostion(pos)
				}
			},
			addTab(target) {
				let newTabName = ++this.tabIndex + ''
				target.openTime = new Date().getTime()
				this.editableTabs.push({
					title: target.label, // 文件标题
					name: newTabName, // 文件索引
					content: 'New Tab content', // 存放文件字符串
					filePath: target.filePath, // 文件路径
					openTime: target.openTime, // 文件打开时间
					...target
				})
				this.editableTabsValue = newTabName
				this.editableTabs[this.editableTabs.length - 1].tabIndex = this.editableTabsValue
				this.SAVE_MEDISINE_OPERATION_DOC(deepCopy(target)) // 把当前可操作对象存储到store中，当前可操作的选项卡不一定有Object
				if (target.filePath) {
					// this.getOdtFile(target.filePath)
				}
			},
			removeTab(targetName) { // targetName === paneName
				// 不存在odt文档的情况
				if (!document.getElementById('oframe' + targetName)) {
					this.actionRemoveTab(targetName)
					return
				}
				// 用点击标签对应的Object初始化handleActiveX，用于检测文档是否有更改
				handleActiveX.init(document.getElementById('oframe' + targetName))
				const ret = handleActiveX.tools.docHasChanged()
				// 用当前活动标签的Object对象初始化handleActiveX，便于后续操作
				handleActiveX.init(document.getElementById('oframe' + this.editableTabsValue))
				if (ret) {
					Evtbus.$emit('showIframe', true)
					this.$confirm('当前文档已被更改且未保存，是否关闭?').then(() => {
						this.actionRemoveTab(targetName)
					}).catch(() => {
						// 不关闭，隐藏iframe
						Evtbus.$emit('showIframe', false)
					})
					return
				}
				this.actionRemoveTab(targetName)
			},
			actionRemoveTab (targetName) {
				let tabs = this.editableTabs
				let activeName = this.editableTabsValue
				let currentActiveIndex = -1 // 当前正在关闭的tab索引
				let nextActiveIndex = -1 // 下一个活动tab索引
				// 如果关闭的对象就是当前活动对象，要重新设置当前活动对象
				if (activeName === targetName) {
					tabs.forEach((tab, index) => {
						if (tab.name === targetName) {
							currentActiveIndex = index
							let nextTab = tabs[index + 1] || tabs[index - 1]
							if (nextTab) {
								activeName = nextTab.name
							}
							if (tabs[index + 1]) {
								nextActiveIndex = index + 1
							} else if (tabs[index - 1]) {
								nextActiveIndex = index - 1
							}
						}
					})
				}
				this.editableTabsValue = activeName
				this.editableTabs = tabs.filter(tab => tab.name !== targetName) // 这里的name其实就是索引
				clearTimeout(this.timer)
				this.timer = null
				Evtbus.$emit('showIframe', false)
				// 解锁文档
				if (this.medisineOperationItem && this.medisineOperationItem.filePath && this.medisineOperationItem.filePath.split('//').length > 1) {
					this.MEDISINE_RECORD_UNLOCK({
						fileCode: this.medisineOperationItem.filePath.split('//')[1].split('.')[0]
					})
				}
				// 设置Evtbus.objectId，检测是否存在对应的Object，存在就赋值，不存在就清空
				if (this.editableTabs.length > 0) {
					if (document.getElementById('oframe' + this.editableTabsValue)) {
						Evtbus.objectId = this.editableTabsValue
						// 再次更改操作对象
						this.SAVE_MEDISINE_OPERATION_DOC(deepCopy(this.editableTabs[nextActiveIndex]))
					} else {
						Evtbus.objectId = ''
					}
				} else {
					Evtbus.objectId = ''
				}
			},
			// 根据文档类型，确定可操作的按钮类型
			actionControlActiveXHandler (obj) {
				if (obj.filePath && obj.filePath.includes('.odt')) {
					Evtbus.$emit('showDocHandleBtn', true)
					Evtbus.$emit('updateWriteMode', obj['writeMode'] || 'writing')
				} else if (obj.title.indexOf('体温单') > -1) {
					Evtbus.$emit('showDocHandleBtn', false)
				}
			},
			actionDocMidifyListener () {
				if (!handleActiveX.obj) {
					return
				}
				clearTimeout(this.timer)
				this.timer = null
				const index = this.actionGetCurrentTab()
				this.timer = setTimeout(() => {
					let isModify = handleActiveX.tools.docHasChanged()
					if (isModify) {
						 // 当文档保存后这里会导致标题中再次出现*号
						if (!this.editableTabs[index]['baseinfo']) { // 只有基础信息文档才有该属性
							if (this.editableTabs[index].title && this.editableTabs[index].title.substring(0, 1) !== '*') {
								this.editableTabs[index].title = '*' + this.editableTabs[index].title
							}
						}
					}
					this.actionDocMidifyListener()
				}, 500)
			},
			actionGetCurrentTab () {
				let currentIndex = 0
				this.editableTabs.forEach((item, index) => {
					if (Evtbus.objectId === item.name) {
						currentIndex = index
					}
				})
				return currentIndex
			},
			actionGetTemperatureSheetData (arg) {
				// 加载体温单数据，并对数据进行处理
				this.A_GET_TEMPERATURE_SHEET_DATA({
					vistID: this.patientInfo.VISIT_ID,
					DeptCode: this.deptID,
					dIn_dt: arg
					// dIn_dt: moment(new Date()).format('YYYY-MM-DD')
				}).then((res) => {
					if (res.code === 1) {
						this.temperatureSheet.sheetData = res.values
						this.temperatureSheet.sheetData.perfectData = handleTemperatureSheetData.dealTw(this.temperatureSheet.sheetData)
						this.temperatureSheet.sheetData.axiosData = handleTemperatureSheetData.dealAxiosData(this.temperatureSheet.sheetData)
					} else {
						this.temperatureSheet.sheetData = null
						this.$message.error('暂无数据')
					}
				})
			},
			handleOpenDoc (index, cb) {
				try {
					setTimeout(() => {
						// 保存当前活动的object
						Evtbus.objectId = this.editableTabs[index].name
						// 触发activeXHandler.vue页面的handleActiveX初始化时间
						Evtbus.$emit('initActiveXObject')
						// 更换当前操作对象，选项卡点击操作时需要更换
						this.SAVE_MEDISINE_OPERATION_DOC(deepCopy(this.editableTabs[index]))
						handleActiveX.init(document.getElementById('oframe' + this.editableTabs[index].name))
						// 初始化activeX对象
						if (this.editableTabs[index]['baseinfo']) {
							handleActiveX.openDocWidthString(this.editableTabs[index].content, 0) // 以只读方式打开
						} else {
							handleActiveX.openDocWidthString(this.editableTabs[index].content, 2) // 以读写方式打开
						}
						handleActiveX.setUiColorStyle(3)
						// 锁住文档，防止其他人修改，只有非模板文件才需要锁住
						if (this.medisineOperationItem && this.medisineOperationItem.filePath && this.medisineOperationItem.filePath.split('//').length > 1) {
							this.MEDISINE_RECORD_LOCK({
								fileCode: this.medisineOperationItem.filePath.split('//')[1].split('.')[0]
							})
						}
						// 设置监听，只要文件有修改就增加修改标志
						this.actionDocMidifyListener()
						cb && cb()
					}, 500)
				} catch(e) {
					console.log(e)
				}
			},
			handleClick (tab) {
				let currentIndex = -1, obj = null
				this.editableTabs.forEach((item, index) => {
					if (tab.name === item.name) {
						currentIndex = index
					}
				})
				if (currentIndex > -1) {
					obj = this.editableTabs[currentIndex]
				}
				if (document.getElementById('oframe' + this.editableTabsValue)) {
					// 先暂停监听文件修改
					clearTimeout(this.timer)
					this.timer = null
					// 切换当前Object对象
					handleActiveX.init(document.getElementById('oframe' + this.editableTabsValue))
					Evtbus.objectId = this.editableTabsValue
					Evtbus.$emit('initActiveXObject')
					// 更换当前操作对象
					this.SAVE_MEDISINE_OPERATION_DOC(deepCopy(obj))
					// 恢复文档更改监听
					this.actionDocMidifyListener()
				} else if (obj.label.indexOf('体温单') > -1) { // 加载其他文档
					this.actionGetTemperatureSheetData('2020/07/28')
					this.componentName = 'ckThermometer'
					Evtbus.$emit('showDocHandleBtn', false)
				} else if (obj.label.indexOf('住院医嘱') > -1) {
					this.componentName = 'doctorAdvice'
					Evtbus.$emit('showDocHandleBtn', false)
				} else if (obj.label.indexOf('报告分析') > -1) {
					this.componentName = 'reportAnalysis'
					Evtbus.$emit('showDocHandleBtn', false)
				} else if (obj.label.indexOf('普通文本检查报告') > -1) {
					this.componentName = 'textCheckReport'
					Evtbus.$emit('showDocHandleBtn', false)
				}
				// 控制顶部操作按钮显示种类
				this.actionControlActiveXHandler(obj)
			},
			handleGetNewTemperatureData (date) {
				this.actionGetTemperatureSheetData(moment(new Date(date)).format('YYYY/MM/DD'))
			}
		},
		destroyed () {
			// 移除页面object对象，防止内存溢出
			const obj = document.getElementsByTagName('object')
			Array.prototype.slice.call(obj).forEach(item => {
				var parentEle = item.parentElement
				parentEle.removeChild(item)
			})
			// 移除事件监听，防止重复执行
			Evtbus.$off('InsertActiveXTab')
			Evtbus.$off('OutActiveXTab')
			Evtbus.$off('replaceTabStar')
			Evtbus.$off('updateDocWriteMode')
		}
	}
</script>

<style lang="scss" scoped>
	.odt-show-container {
		position: relative;
		overflow: hidden;
		.fix-width-34 {
			width: 34px;
			height: 34px;
			display: block;
			margin: 0 auto;
		}
		.others {
			overflow-x: hidden;
			overflow-y: auto;
		}
		/deep/ .el-dropdown {
			padding: 0 10px;
			z-index: 1;
		}
		/deep/ .el-tabs__item:hover {
			color: #44B3C6;
		}
		/deep/ .is-active:hover {
			color: white;
		}
		/deep/ .is-active {
			border-radius: 4px 4px 0 0;
			background-color: #44B3C6;
    		color: white;
		}
		/deep/ .el-tabs__content {
			margin-top: -15px;
		}
	}
</style>

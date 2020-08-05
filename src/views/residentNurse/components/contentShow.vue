<template>
	<div class="odt-show-container">
		<el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab" @tab-click="handleClick">
			<el-tab-pane
				v-for="(item, index) in editableTabs"
				:key="item.name"
				:label="item.title"
				:name="item.name"
				:title="item.title"
				>
				 <object v-if="item.filePath" classid="clsid:43C3EF10-8FE6-45CD-A65B-1792FD3FB9DE" codebase="NsoOffice.dll" :id="'oframe' + item.tabIndex" width="100%" height="700"></object>
				 <div v-else class="others">
				 	<component :is="componentName"></component>
				 </div>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script type="text/javascript">
	import * as originAction from 'vuex'
	import handleActiveX from '@/utils/activeX'
	import Evtbus from '@/utils/bus'
	import { deepCopy } from '@/utils/utils'

	const { mapActions } = originAction.createNamespacedHelpers('residentNurse')

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
				componentName: null
			}
		},
		computed: {
			...originAction.mapState({
				patientInfo: state => state.residentNurse.patientInfo
			})
		},
		inject: ['self'],
		mounted () {
			this.initTabEvt()
		},
		watch: {
			editableTabsValue (newVal, oldVal) {
				const obj = document.getElementById('oframe' + oldVal)
				if (!obj) {
					return
				}
				let currentIndex = -1
				this.editableTabs.forEach((item, index) => {
					if (oldVal === item.name) {
						currentIndex = index
					}
				})
				if (currentIndex > -1) {
					// 设置成书写模式，然后再存储，防止文档信息丢失
					handleActiveX.setDocMode('writing')
					this.editableTabs[currentIndex].content = obj.SaveToString()
				}
			}
		},
		methods: {
			...originAction.mapActions([
				'GET_DOC_FILE'
			]),
			...mapActions([
				// 'SAVE_MEDISINE_DOC_OPEN_TIME',
				'SAVE_MEDISION_RECORD_TAB',
				'SAVE_MEDISINE_OPERATION_DOC'
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
							_this.addTab(obj)
							_this.editableTabs[_this.editableTabs.length - 1].content = res.values
							_this.handleOpenDoc(_this.editableTabs.length - 1, cb)
						} else {
							_this.$message.warning('文件不存在')
						}
					})
				}
				Evtbus.$on('InsertActiveXTab', (obj, cb) => {
					let tabIndex = null
					this.editableTabs.forEach((item, index) => {
						if (item.title === obj.label || item.filePath === obj.filePath) {
							tabIndex = item.tabIndex
						}
					})
					if (tabIndex) {
						this.actionControlActiveXHandler(obj)
						this.editableTabsValue = tabIndex + ''
						return
					}
					if (obj.filePath && obj.filePath.includes('.odt')) {
						loadOdt(obj, cb)
						Evtbus.$emit('showDocHandleBtn', true)
					} else if (obj.label.indexOf('体温单') > -1) {
						this.componentName = 'ckThermometer'
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
				Evtbus.$on('OutActiveXTab', (obj) => {
					this.editableTabs = []
					// this.SAVE_MEDISION_RECORD_TAB(deepCopy(this.editableTabs))
				})
			},
			addTab(target) {
				let newTabName = ++this.tabIndex + ''
				target.openTime = new Date().getTime()
				this.editableTabs.push({
					title: target.label,
					name: newTabName,
					content: 'New Tab content',
					filePath: target.filePath,
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
			removeTab(targetName) {
				// 不存在odt文档的情况
				if (!document.getElementById('oframe' + targetName)) {
					this.actionRemoveTab(targetName)
					return
				}
				// 检测即将被关闭的文档有没有更改（需要关闭的文档不一定是当前文档），更改了有没有保存
				handleActiveX.init(document.getElementById('oframe' + targetName))
				const ret = handleActiveX.tools.docHasChanged()
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
				if (activeName === targetName) {
					tabs.forEach((tab, index) => {
						if (tab.name === targetName) {
							let nextTab = tabs[index + 1] || tabs[index - 1]
							if (nextTab) {
								activeName = nextTab.name
							}
						}
					})
				}
				this.editableTabsValue = activeName
				this.editableTabs = tabs.filter(tab => tab.name !== targetName)
				clearTimeout(this.timer)
				this.timer = null
				Evtbus.$emit('showIframe', false)
				if (this.editableTabs.length > 0) {
					if (document.getElementById('oframe' + this.editableTabsValue)) {
						Evtbus.objectId = this.editableTabsValue
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
						if (this.editableTabs[index].title && this.editableTabs[index].title.substring(0, 1) !== '*') {
							this.editableTabs[index].title = '*' + this.editableTabs[index].title
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
			handleOpenDoc (index, cb) {
				// this.SAVE_MEDISINE_DOC_OPEN_TIME(new Date())
				try {
					setTimeout(() => {
						// 保存当前活动的object
						Evtbus.objectId = this.editableTabs[index].name
						Evtbus.$emit('initActiveXObject')
						// 更换当前操作对象
						this.SAVE_MEDISINE_OPERATION_DOC(deepCopy(this.editableTabs[index]))
						handleActiveX.init(document.getElementById('oframe' + this.editableTabs[index].name))
						// 初始化activeX对象
						handleActiveX.openDocWidthString(this.editableTabs[index].content, 2)
						handleActiveX.setUiColorStyle(0)
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
				if (document.getElementById('oframe' + this.editableTabs[tab.index].name)) {
					this.handleOpenDoc(tab.index)	
				} else {
					// 保存当前活动的object
					Evtbus.objectId = this.editableTabs[tab.index].name
					// 清空handleActiveX对象
					handleActiveX.init(null)
				}
				// 控制顶部操作按钮显示种类
				this.actionControlActiveXHandler(obj)
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
		}
	}
</script>

<style lang="scss" scoped>
	.odt-show-container {
		padding: 0 5px;
		position: relative;
		.fix-width-34 {
			width: 34px;
			height: 34px;
			display: block;
			margin: 0 auto;
		}
		/deep/ .el-dropdown {
			padding: 0 10px;
			z-index: 1;
		}
		/deep/ .el-tabs__item {
			// overflow: hidden;
    		// text-overflow: ellipsis;
		}
		
	}
	/deep/.el-card__body {
        padding: 10px 10px;
    }

    /deep/.el-tabs__nav .is-top {
        line-height: 30px;
        height: 30px;
    }

    /deep/.el-tabs__nav-prev,
    /deep/.el-tabs__nav-next {
        line-height: 2.8;
        height: 30px;
    }
</style>

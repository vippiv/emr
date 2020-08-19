<template>
	<div class="odt-show-container">
		<el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab" @tab-click="handleClick">
			<el-tab-pane v-for="(item) in editableTabs" :key="item.name" :label="item.title" :name="item.name" :title="item.title">
				<object v-if="item.filePath" classid="clsid:43C3EF10-8FE6-45CD-A65B-1792FD3FB9DE" codebase="NsoOffice.dll" :id="'oframe' + item.tabIndex" width="100%" :height="objectHeight"></object>
				<div v-else class="others">
					<component
						:is="componentName"
						:temperatureSheetData="temperatureSheet.sheetData"
						:needAddbtn="true"
						@actionGetTemperatureData="handleGetNewTemperatureData"
						@addData="handleAddTemperature"
					></component>
				</div>
                <div style="text-align:center;background:white;">
                    <el-button type="primary" size="mini" @click="handlePreviousPage">上一页</el-button>
                    <el-button type="primary" size="mini" @click="handleNextPage">下一页</el-button>
                </div>
			</el-tab-pane>
		</el-tabs>
		<temperatureAddDia
			:temperatureDiaVis="temperatureDiaVis"
			:visitID="patientInfo.VISIT_ID"
			:bedNo="patientInfo.VISIT_NO"
			:patientName="patientInfo.PAT_NAME"
		></temperatureAddDia>
	</div>
</template>

<script type="text/javascript">
    import * as originAction from 'vuex'
    import handleActiveX from '@/utils/activeX'
    import Evtbus from '@/utils/bus'
    import handleTemperatureSheetData from '@/utils/temperatureSheet'
    import moment from 'moment'
    import temperatureAddDia from './temperatureAddDia'
    import {
        deepCopy
    } from '@/utils/utils'

    const {
        mapActions
    } = originAction.createNamespacedHelpers('residentNurse')

    export default {
        name: 'ContentShow',
        data() {
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
                temperatureSheet: {
                    sheetData: null
                },
                styleObj: {
                    height: '730px'
                },
                objectHeight: 0,
                temperatureDiaVis: false,
                currentPageInfo: null,
                pageNumCount: 1,
            }
        },
        computed: {
            ...originAction.mapState({
                patientInfo: state => state.residentNurse.patientInfo,
                deptID: state => state.global.deptID,
            })
        },
        components: {
            temperatureAddDia
        },
        inject: ['self'],
        created() {
            this.objectHeight = (document.documentElement.clientHeight - 234) + 'px'
            this.styleObj.height = this.objectHeight
        },
        mounted() {
            this.initTabEvt()
        },
        // watch: {
        // 	editableTabsValue(newVal, oldVal) {
        // 		const obj = document.getElementById('oframe' + oldVal)
        // 		if (!obj) {
        // 			return
        // 		}
        // 		let currentIndex = -1
        // 		this.editableTabs.forEach((item, index) => {
        // 			if (oldVal === item.name) {
        // 				currentIndex = index
        // 			}
        // 		})
        // 		if (currentIndex > -1) {
        // 			// 设置成书写模式，然后再存储，防止文档信息丢失
        // 			handleActiveX.setDocMode('writing')
        // 			this.editableTabs[currentIndex].content = obj.SaveToString()
        // 		}
        // 	}
        // },
        methods: {
            ...originAction.mapActions([
                'GET_DOC_FILE',
                'A_GET_TEMPERATURE_SHEET_DATA'
            ]),
            ...mapActions([
                // 'SAVE_MEDISINE_DOC_OPEN_TIME',
                'SAVE_MEDISION_RECORD_TAB',
                'SAVE_MEDISINE_OPERATION_DOC',
                'GetPageRowsInfo'
            ]),
            handlePreviousPage() { //上一页
                let currentPageNum = handleActiveX.getCurrentCursorPage() //当前光标所在页码
                console.log('pagenum', currentPageNum)
                console.log('patientInfo', this.patientInfo)
                console.log('currentPageInfo', this.currentPageInfo)
                if (currentPageNum == 1) {
                    this.$message.warning('当前页已属于首页!')
                    // return
                }
                this.pageNumCount--
                handleActiveX.setFooterTextEx(`第${this.pageNumCount}页`, 2, '', '') //设置页码



                const data = {
                    VisitID: this.patientInfo.VISIT_ID, //患者ID
                    PageNum: currentPageNum, //页码
                    SheetName: this.currentPageInfo.SaveSheet, //表名称
                    deptID: this.deptID, //部门
                    date: moment(new Date()).format('YYYY-MM-DD'), //日期
                }
                console.log('data', JSON.stringify(data))
                this.GetPageRowsInfo(data).then(res => {
                    console.log('22222222222222', res.values)
                    if (res.code == 1 && res.values.length != 0) {
                        this.handleSetTableData(res.values, res.values2)
                    }
                })
            },
            handleSetTableData(data, trow) { //填充表格数据
                const tablename = handleActiveX.getAllTableNameByCurrentDoc().split(',')[0] //所有表格名称
                // console.log('tablename', tablename)
                const tablerows = handleActiveX.getTableRowCount(tablename) //表格所有行数
                // console.log('tablerows', tablerows)
                const tablecols = handleActiveX.getTableColCount(tablename) //表格所有列数
                // console.log('tablecols', tablecols)
                const pagenumber = handleActiveX.getCurrentCursorPage() //页码
                console.log('页码', pagenumber)

                let cellcontentArr = new Array()
                let cellcontentArssr = []
                for (let m = 0; m < data.length; m++) {
                    for (let key in data[m]) {
                        cellcontentArr.push(data[m][key])
                        cellcontentArssr.push('a')
                    }
                }
                console.log('单元格内容', cellcontentArr)

                const capitalArr = new Array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z')
                var rows = tablerows
                var col = tablecols
                var tableRowColData = new Array()
                var cellNameArr = new Array()
                for (var i = 3; i <= (trow + 2); i++) {
                    var a = [];
                    for (var j = 0; j < col; j++) {
                        var tabCol = capitalArr[j] + i;
                        // console.log(tabCol)
                        cellNameArr.push(tabCol)
                    }
                }
                console.log('数组', cellNameArr, cellcontentArr)
                cellNameArr.forEach(cell => {
                    handleActiveX.obj.PutCellContent(tablename, cell, '')
                })
                // handleActiveX.putCellContentByArray(tablename, cellNameArr, new Array())
                // handleActiveX.deleteTable(tablename)
                // handleActiveX.insertPageTable(tablename,rows,col)
                handleActiveX.putCellContentByArray(tablename, cellNameArr, cellcontentArr)

            },
            handleNextPage() { //下一页
                this.pageNumCount++
                handleActiveX.setFooterTextEx(`第${this.pageNumCount}页`, 2, '', '') //设置页码
            },
            async getOdtFile(filePath) {
                let file = ''
                if (filePath.includes('Template')) {
                    const filePathArr = filePath.split('/')
                    const filePathArrLen = filePathArr.length
                    file = [filePathArr.slice(0, filePathArrLen - 1).join('/'), filePathArr[filePathArrLen - 1]]
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
            initTabEvt() {
                const _this = this

                function loadOdt(obj, cb) {
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
                    console.log('obj', obj)
                    let tabIndex = null,
                        needTabIndex = -1
                    this.editableTabs.forEach((item, index) => {
                        if (item.title === obj.label || item.filePath === obj.filePath) {
                            tabIndex = item.tabIndex
                            needTabIndex = index
                        }
                    })
                    if (tabIndex) {
                        this.actionControlActiveXHandler(obj)
                        this.editableTabsValue = tabIndex + ''
                        // 切换正确的this.editableTabs对象
                        this.handleClick(this.editableTabs[needTabIndex])
                        // 定位到正确区域
                        this.actionLoctionRegion(obj.regionNum)
                        return
                    }
                    if (obj.filePath && obj.filePath.includes('.odt')) {
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
                    } else if (obj.label && obj.label.indexOf('体温单') > -1) {
                        this.actionGetTemperatureSheetData('2020/07/28')
                        this.componentName = 'ckThermometer'
                        Evtbus.$emit('showDocHandleBtn', false)
                        this.addTab(obj)
                        this.temperatureDiaVis = true
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
            handleDocSinger() { //表格签名
                handleActiveX.addGlobalDocumentListener() //开启全局监听
                handleActiveX.setGlobalDocumentListener(true, true, false, false) //设置在开启全局监听时，哪些对象会产生相应的事件
                const currentReaNames = handleActiveX.getAllSection().trim().split(',') //获取当前文档区域名称
                // console.log('000000000000000000', currentReaNames)
                // handleActiveX.removeAllStructsListeners()
                for (let i = 0; i < currentReaNames.length; i++) {
                    if (currentReaNames[i] != '') {
                        handleActiveX.addListenerforOneStruct(currentReaNames[i], parseInt(Math.pow(2, 7)), () => {
                            // console.log('11111111')
                        })
                    }
                }

                // const cellname = handleActiveX.getTableCellNameByCurrentCursor //获取光标所在单元格名称
                // console.log('单元格名称', cellname)
                // //判断时间字段有无值
                // const tablename = handleActiveX.getAllTableNameByCurrentDoc().split(',')[0] //所有表格名称
                // // console.log('tablename', tablename)
                // const tablerows = handleActiveX.getTableRowCount(tablename) //表格所有行数
                // // console.log('tablerows', tablerows)
                // const tablecols = handleActiveX.getTableColCount(tablename) //表格所有列数
                // // console.log('tablecols', tablecols)
                // const pagenumber = handleActiveX.getCurrentCursorPage() //页码
                // console.log('页码', pagenumber)
                // const capitalArr = new Array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z')
                // var rows = tablerows
                // var col = tablecols
                // var tableRowColData = new Array()
                // var rownumbers = ''
                // for (var i = 3; i <= rows; i++) {
                //     var a = [];
                //     for (var j = 0; j <script col; j++) {
                //         var tabCol = capitalArr[j] + i;
                //         var val = handleActiveX.getCellContent(tablename, tabCol).trim();
                //         if (val == '') {
                //             a.push(null)
                //         } else {
                //             a.push(val)
                //         }

                //     }
                //     a.unshift(i - 2)
                //     a.unshift(pagenumber)
                //     tableRowColData.push(a);
                // }
                //监听双击事件
                //1、删除当前点击的单元格保护且插入签名
                //2、添加单元格保护


            },
            actionGetTemperatureSheetData(arg) {
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
            // 根据regionNum查找region并定位过去, 不能通过时间定位，存在同样的时间
            actionLoctionRegion(regionNum) {
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
                this.$emit('getnursTreeData', target)
                this.currentPageInfo = target
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
            actionRemoveTab(targetName) {
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
            actionControlActiveXHandler(obj) {
                if (obj.filePath && obj.filePath.includes('.odt')) {
                    Evtbus.$emit('showDocHandleBtn', true)
                } else if (obj.label && obj.label.indexOf('体温单') > -1) {
                    Evtbus.$emit('showDocHandleBtn', false)
                }
            },
            actionDocMidifyListener() {
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
            actionGetCurrentTab() {
                let currentIndex = 0
                this.editableTabs.forEach((item, index) => {
                    if (Evtbus.objectId === item.name) {
                        currentIndex = index
                    }
                })
                return currentIndex
            },
            handleOpenDoc(index, cb) {
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
                        handleActiveX.setUiColorStyle(3)
                        setTimeout(() => {
                            this.handleDocSinger()
                        }, 1000);
						// 设置监听，只要文件有修改就增加修改标志
						this.actionDocMidifyListener()
						cb && cb()
					}, 500)
				} catch (e) {
					console.log(e)
				}
			},
			handleClick(tab) {
				let currentIndex = -1,
					obj = null
				this.editableTabs.forEach((item, index) => {
					if (tab.name === item.name) {
						currentIndex = index
					}
				})
				if (currentIndex > -1) {
					obj = this.editableTabs[currentIndex]
				}
				if (document.getElementById('oframe' + this.editableTabsValue)) {
					// this.handleOpenDoc(tab.index)
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
				}
				// 控制顶部操作按钮显示种类
				this.actionControlActiveXHandler(obj)
				console.log('obj',obj)
				this.$emit('getnursTreeData',obj)
			},
			handleGetNewTemperatureData(date) {
				console.log('date', moment(new Date(date)).format('YYYY/MM/DD'))
				this.actionGetTemperatureSheetData(moment(new Date(date)).format('YYYY/MM/DD'))
			},
			handleAddTemperature () {
				this.temperatureDiaVis = true
			}
		},
		destroyed() {
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
        padding: 0 5px 0 0;
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

    /deep/ .el-tabs__content {
        margin-top: -15px;
    }
</style>
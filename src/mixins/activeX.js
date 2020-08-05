// <div style="border:1px solid gray;">
// 	<h2>office activeX demo</h2>
// 	<el-button @click="handleCloseDoc" type="text">关闭当前文档</el-button>
// 	<el-button @click="handleOpenDoc" type="text">打开</el-button>
// 	<el-button @click="handleHasOpenDoc" type="text">是否有文档打开</el-button>
// 	<el-button @click="handlePrintDoc" type="text">打印</el-button>
// 	<el-button @click="handleSetHeaderText" type="text">设置页眉</el-button>
// 	<el-button @click="handleGetCurrentPageStyle" type="text">获取当前页的样式</el-button>
// 	<el-button @click="handleCursorJumpToHeader" type="text">光标跳转到开头</el-button>
// 	<el-button @click="handleGetCursorLocation" type="text">获取光标位置</el-button>
// 	<el-button @click="handleShowMenuItem" type="text">显示指定菜单</el-button>
// 	<el-button @click="handleHideMenuItem" type="text">隐藏指定菜单</el-button>
// 	<el-button @click="handleSetStatusBarVisible" type="text">显示状态栏</el-button>
// 	<el-button @click="handleHasUnderLine" type="text">是否有下划线</el-button>
// 	<el-button @click="handleTextBold" type="text">是否加粗</el-button>
// 	<el-button @click="handleGetPageCount" type="text">文档页数</el-button>
// 	<el-button @click="handleGetFileSavePath" type="text">文档保存路径</el-button>
// 	<el-button @click="handleSetText" type="text">插入文本</el-button>
// 	<el-button @click="handleSetDocMode('design')" type="text">文档设计模式</el-button>
// 	<el-button @click="handleSetDocMode('edit')" type="text">文档编辑模式</el-button>
// 	<el-button @click="handleSetDocMode('browseClean')" type="text">文档浏览模式(清洁)</el-button>
// 	<el-button @click="handleSetDocMode('browseUnClean')" type="text">文档浏览模式(非清洁)</el-button>
// 	<el-button @click="handleSetDocMode('secrecy')" type="text">文档浏览模式(保密)</el-button>
// 	<el-button @click="handleSetDocMode('write')" type="text">文档浏览模式(书写)</el-button>
// 	<el-button @click="handleBrowseWebMode(true)" type="text">浏览方式(web)</el-button>
// 	<el-button @click="handleBrowseWebMode(false)" type="text">浏览方式(非web)</el-button>
// 	<el-button @click="handleHasModify" type="text">文档是否有更改</el-button>
// 	<el-button @click="handleGetSelectText" type="text">获取选中的文本</el-button>
// 	<el-button @click="handleSelectDoc" type="text">选取整个文档</el-button>
// 	<el-button @click="handleProtectDoc(true)" type="text">保护文档</el-button>
// 	<el-button @click="handleProtectDoc(false)" type="text">取消保护</el-button>
// 	<el-button @click="handleInsertRegion('one')" type="text">插入区域</el-button>
// 	<el-button @click="handleGetAllRegion" type="text">获取所有区域</el-button>
// 	<el-button @click="handleInsertSection" type="text">插入数据组</el-button>
// 	<el-button @click="handleGetAllSection" type="text">获取所有的数据组</el-button>
// 	<el-button @click="handleInsertNewControl" type="text">插入数据元</el-button>
// 	<el-button @click="handleGetNewControl" type="text">获取数据元</el-button>
// 	<el-button @click="handleInsertSign" type="text">插入签名</el-button>
// </div>

export default {
	methods: {
		handleOpenDoc () {
			try {
				handleActiveX.openDocWidthStream(this.stream, 2)
			} catch(e) {
				console.log(e)
			}
		},
		handleCloseDoc () {
			handleActiveX.closeDoc(document.all.oframe)
		},
		handleHasOpenDoc () {
			handleActiveX.hasOpenDoc()
		},
		handlePrintDoc () {
			handleActiveX.printDoc()
		},
		handleSetHeaderText () {
			handleActiveX.setHeaderText('自定义页眉', () => {
				alert('设置成功')
			})
		},
		handleGetCurrentPageStyle () {
			handleActiveX.getCurrentPageStyle()
		},
		handleCursorJumpToHeader () {
			handleActiveX.cursorJumpToHeader()
		},
		handleGetCursorLocation () {
			handleActiveX.getCursorLocation()
		},
		handleShowMenuItem () {
			handleActiveX.showMenuItem('newDoc')
		},
		handleHideMenuItem () {
			handleActiveX.hideMenuItem('newDoc')
		},
		handleSetStatusBarVisible () {
			handleActiveX.setStatusBarVisible(true)
		},
		handleHasUnderLine () {
			handleActiveX.textUnderLine()
		},
		handleTextBold () {
			handleActiveX.textBold()
		},
		handleGetPageCount () {
			handleActiveX.getPageCount()
		},
		handleGetFileSavePath () {
			handleActiveX.getFileSavePath()
		},
		handleSetText() {
			handleActiveX.setText('插入文本', 0)
		},
		handleSetDocMode (mode) {
			handleActiveX.setDocMode(mode)
		},
		handleBrowseWebMode (bool) {
			handleActiveX.browseWebMode(bool)
		},
		handleHasModify () {
			const hasModify = handleActiveX.docIsModify()
			alert(hasModify)
		},
		handleGetSelectText () {
			const selectText = handleActiveX.getSelectText()
			alert(selectText)
		},
		handleSelectDoc () {
			handleActiveX.selectAllDoc()
		},
		handleProtectDoc (bool) {
			handleActiveX.protectDoc(bool)
		},
		handleInsertRegion (regionName) {
			handleActiveX.insertRegion(regionName)
		},
		handleGetAllRegion () {
			handleActiveX.getAllRegion()
		},
		handleInsertSection () {
			handleActiveX.insertSection('sectionOne', 'section content')
		},
		handleGetAllSection () {
			handleActiveX.getAllSection()
		},
		handleInsertNewControl () {
			handleActiveX.insertNewControl('newC', 'new control content', 3)
		},
		handleGetNewControl () {
			handleActiveX.getAllNewControl()
		},
		handleInsertSign () {
			handleActiveX.insertSign('D:/workspace/EMR_VueUI/src/assets/images/user/cloud.png')
		}
	}
}
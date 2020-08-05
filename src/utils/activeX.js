import moment from 'moment'

const DateTime = {
	MaxValue: '9999/12/31 23:59:59',
	MinValue: '0001/1/1 0:00:00'
}

function FillZhenduan(listUpdate, strArray, i, id) {
	console.log(listUpdate, strArray, i, id)
	if (listUpdate.length > 0) {
		if (strArray[i].trim() == "S-07-005" || strArray[i].trim() == "S-07-006") {
			this.rawObj.SetSectionProp(strArray[i].trim(), "EditProtect", "false")
			this.rawObj.SetSectionProp(strArray[i].trim(), "DelFlag", "false")
			this.rawObj.DeleteSection(strArray[i].trim());
			//插入节点
			this.rawObj.InsertSectionAtCurrentCursor(strArray[i].trim(), "")
			this.rawObj.SetSectionProp(strArray[i].trim(), "HelpTip", "出院诊断")
		} else {
			//将此节点里面清空
			this.rawObj.DeleteSectionContent(strArray[i])
		}
	}
	this.rawObj.SetSectionProp(strArray[i].trim(), "EditProtect", "false")
	this.rawObj.SelectOneStructContent(strArray[i].trim()) //先获取外面数据组字体
	const font = this.rawObj.TextAsianName

	const fontsize = this.rawObj.TextSize
	// 使光标跳转到指定数据组中
	this.rawObj.CursorJumpOutOfOneStruct(strArray[i], 3)
	let editProtect = true
	for (let index = 0; index < listUpdate.length; index++) {
		//根据时间生成的随机数
		const randomNum = moment(new Date()).format('YYYY-MM-DD HH:mm:ss').replace(/-/g, '').replace(/:/g, "").replace(" ", '')
		const Id = id + listUpdate[index].CRB_TYPE + listUpdate[index].MXB_TYPE + "-" + listUpdate[index].JBLB + "-" + randomNum + "-" + listUpdate[index].SSDJ + "-" + listUpdate[index].KindId
		//插入节点
		this.rawObj.InsertSectionAtCurrentCursor(Id, listUpdate[index].ICD10Name ? listUpdate[index].ICD10Name.trim() : '')
		//设置上方标题
		this.rawObj.SetSectionProp(Id, "HelpTip", listUpdate[index].ICD10 ? listUpdate[index].ICD10 : '')

		//设置里面数据组字体
		this.rawObj.SelectOneStructContent(Id)
		this.rawObj.TextAsianName = font
		this.rawObj.TextSize = fontsize
		this.rawObj.TextColor = -1
		this.rawObj.CursorJumpOutOfOneStruct(Id, 1)

		if (index != listUpdate.length - 1) {
			if (id != "S94001-" && id != "S07005-" && id != "S07006-") {
				//换行
				this.rawObj.ExecuteMethod("InsertPara")
			} else {
				//换行
				this.rawObj.SetText(",", 0)
			}
		}

		if (String(listUpdate[index].KindId).length > 8 && String(listUpdate[index].KindId).substring(0, 8) == "WJICD203") {
			editProtect = false
			this.rawObj.SetSectionProp(Id, "EditProtect", "false")
		} else {
			this.rawObj.SetSectionProp(Id, "EditProtect", "true")
		}
	}
	this.rawObj.SetSectionProp(strArray[i].trim(), "EditProtect", String(editProtect))
}

/**
 * [handleActiveX 请在钩子函数mounted中初始化 handleActiveX.init(document.all.oframe)]
 * @type {Object}
 */
const handleActiveX = {
	obj: null,
	init(obj) {
		this.obj = obj
		this.tools.hax = this
		this.tools.rawObj = obj
		return this
	},
	// 插入表格
	insertTable(obj) {
		this.obj.InsertTable("Table", 3, 2)
	},
	//获取单元格内容
	getCellContent(tname,cname) {
		this.obj.GetCellContent(tname,cname)
	},
	// 关闭当前文档
	closeDoc(obj) {
		this.obj.Close()
	},
	/**
	 * 将文档保存为字符串
	 * @return {[type]} [description]
	 */
	saveToString() {
		return this.obj.SaveToString()
	},
	/**
	 * 将文档保存为字符串
	 * @return {[type]} [description]
	 */
	getAllSectAndNewCtrlContentByCurrentDoc(aSctContType, aCtrlContType, nPostionFlag, nReserved) {
		this.obj.GetAllSectAndNewCtrlContentByCurrentDoc(aSctContType, aCtrlContType, nPostionFlag, nReserved)
	},
	/**
	 * 设置是否可以从外部(比如IE，记事本，VS等等)拷贝到odt文档
	 * @return {[type]} [description]
	 */
	enableCopyFromExternal(value) {
		this.obj.EnableCopyFromExternal(value)
	},
	// 是否有文档打开
	hasOpenDoc(obj) {
		const hasOpen = this.obj.HasFileOpened()
		alert(hasOpen)
	},
	// 打开文档(以流的方式打开)
	openDocWidthString(stream, type) {
		if (!stream) {
			alert('无文档流')
			return
		}
		type = type || 1
		// 打开文档
		try {
			this.obj.OpenDocumentWithString(stream, type)
			this.setDocMode('design')
		} catch (e) {
			console.log(e)
		}
	},
	/**
	 * 设置文档主题颜色 可选值 0 - 8
	 * @param {[type]} style [description]
	 */
	setUiColorStyle(style) {
		try {
			this.obj.SetUIColorStyle(style)
		} catch (e) {
			console.log(e)
		}
	},
	// 设置菜单栏显示隐藏
	setMenuBarVisible(bool) {
		bool = bool || true
		this.obj.SetMenuBarVisible(true)
	},
	setStatusBarVisible(bool) {
		bool = bool || true
		this.obj.SetStatusBarVisible(true)
	},
	/**
	 * 打印（除了这个函数，打印相关的还有很多其他函数）
	 * @param  {[type]} bool [description]
	 * @return {[type]}      [description]
	 */
	printDoc(bool) {
		bool = bool || true
		this.obj.PrintDoc(bool)
	},
	/**
	 * 续打
	 * @return {[type]} [description]
	 */
	printDocByLine(bAutoSetPrinter, bFirstPageHeadFooter, nCopyNum, aBeginPage, aBeginRow, aEndPage, aEndRow) {
		if (!bAutoSetPrinter && !bFirstPageHeadFooter && !nCopyNum && !aBeginPage && !aBeginRow && !aEndPage && !aEndRow) {
			return
		}
		this.obj.PrintDocByLine(bAutoSetPrinter, bFirstPageHeadFooter, nCopyNum, aBeginPage, aBeginRow, aEndPage, aEndRow)
	},
	/**
	 * 打印预览
	 * @param  {[type]} viewLine [description]
	 * @return {[type]}          [description]
	 */
	printPreview(viewLine) {
		viewLine = viewLine === undefined ? 1 : viewLine
		this.obj.PrintPreview(viewLine)
	},
	/**
	 * 打印预览
	 * @param  {[type]} viewLine [description]
	 * @return {[type]}          [description]
	 */
	previewDocBySelect2(value) {
		this.obj.PreviewDocBySelect2(value)
	},
	// 设置页眉，还有个设置页脚的函数
	setHeaderText(text, cb) {
		text = text || '设置页眉'
		const isSuccess = this.obj.SetHeaderText('设置页眉')
		cb && cb(isSuccess)
	},
	// 未得到结果
	getCurrentPageStyle() {
		const style = this.obj.GetCurrentPageStyle()
		alert(style)
	},
	// 光标跳到当前页的页眉开始位置，无效
	cursorJumpToHeader() {
		this.obj.JumpToHeader()
	},
	// 获取光标位置
	getCursorLocation() {
		const position = this.obj.GetCursorLoction()
		alert(position)
	},
	// 显示指定菜单项
	showMenuItem(item) {
		item = item || "Open"
		this.obj.ShowMenuItem(item)
	},
	// 隐藏指定菜单项，要求文档关闭重新打开一次
	hideMenuItem(item) {
		item = item || "Open"
		this.obj.HideMenuItem(item)
	},
	// 选中或光标位置是否有下划线，读写属性
	textUnderLine() {
		alert(this.obj.TextUnderLine)
	},
	// 选中或光标位置是否加粗，读写属性
	textBold() {
		alert(this.obj.TextBold)
	},
	// 获得当前文档的页数
	getPageCount() {
		alert(this.obj.GetPageCount())
	},
	// 获取文档的保存路径
	getFileSavePath() {
		alert(this.obj.GetFilePath())
	},
	/**
	 * 在文档中插入文本
	 * @param {[type]} text [插入的文本]
	 * @param {[type]} pos  [0 光标位置， 1 文档头， 2 文档尾]
	 */
	setText(text, pos) {
		text = text || 'hello'
		pos = pos || 0
		this.obj.SetText(text, pos)
	},
	/**
	 * 设置文档模式，有四种模式，书写，清洁，非清洁，保密
	 * @param {[type]} mode [description]
	 */
	setDocMode(mode) {
		switch (mode) {
			case 'design':
				this.obj.DesignTemplet(false, false)
				break
			case 'edit':
				this.obj.EditTemplet()
				break
			case 'cleaning':
				this.obj.BrowseTemplet(1, 0)
				break
			case 'unCleaning':
				this.obj.BrowseTemplet(2, 0)
				break
			case 'secretary':
				this.obj.BrowseTemplet(3, 0)
				break
			case 'writing':
				this.obj.BrowseTemplet(0, 0)
				break
			default:
				break
		}
	},
	/**
	 * 是否以web模式浏览
	 * @return {[type]} [description]
	 */
	browseWebMode(bool) {
		if (bool === undefined) {
			bool = true
		}
		this.obj.BrowseWebMode(bool)
	},
	/**
	 * 判断当前文档是否被修改
	 * @return {[type]} [description]
	 */
	docIsModify() {
		return this.obj.IsDocModified()
	},
	/**
	 * 获取选中的文本
	 * @return {[type]} [description]
	 */
	getSelectText() {
		return this.obj.GetSelectText()
	},
	/**
	 * 将光标选中区域设置为保护区域
	 * @return {[type]} [description]
	 */
	insertProtectArea(name) {
		return this.obj.InsertProtectArea(name)
	},
	/**
	 * 获取当前光标处ProtectArea名称
	 * @return {[type]} [description]
	 */
	getCurrentProtectAreaName() {
		return this.obj.GetCurrentProtectAreaName()
	},
	/**
	 * 获取 ProtectArea区域文本
	 * @return {[type]} [description]
	 */
	getProtectAreaText(name) {
		return this.obj.GetProtectAreaText(name)
	},
	/**
	 * 删除一个ProtectArea
	 * @return {[type]} [description]
	 */
	deleteProtectArea(name) {
		this.obj.DeleteProtectArea(name)
	},
	/**
	 * 在光标当前位置插入文本内容
	 * @return {[type]} [description]
	 */
	insertTextAtCurrentCursor(text) {
		this.obj.InsertTextAtCurrentCursor(text)
	},
	/**
	 * 选择文档
	 * @return {[type]} [description]
	 */
	selectAllDoc() {
		this.obj.SelectAllDoc()
	},
	/**
	 * 保护/取消保护文档
	 * @return {[type]} [description]
	 */
	protectDoc(bool) {
		this.obj.ProtectDoc(bool)
	},
	/**
	 * 插入区域
	 * @return {[type]} [description]
	 */
	insertRegion(regionName) {
		if (!regionName) {
			alert('请设置区域名称')
		}
		const isSuccess = this.obj.InsertRegionAtCurrentCursor(regionName)
		alert(isSuccess)
	},
	/**
	 * 获取当前文档所有区域列表
	 * @return {[type]} [description]
	 */
	getAllRegion() {
		const allRegion = this.obj.GetAllRegionNamesByCurrentDoc() // 数据的顺序是按照最后一个数字来的, 如：0403-normal-1
		return allRegion
	},
	/**
	 * 获取区域的内容
	 * @param {[type]} name [description]
	 */
	getRegionText(name) {
		return this.obj.GetRegionText(name)
	},
	/**
	 * 获得当前光标所在的region的名称
	 * @return {[type]} [description]
	 */
	getCurrentRegion() {
		return this.obj.GetCurrentRegionName()
	},
	/**
	 * [返回选中区域Region名称列表]
	 * @return {[type]} [description]
	 */
	getRegionNamesBySelect() {
		return this.obj.GetRegionNamesBySelectArea()
	},
	/**
	 * 删除区域
	 * @param  {[type]} name [区域名称]
	 * @param  {[type]} type [标志位 1 删除区域 2 删除区域内容 3 删除区域和内容]
	 * @return {[type]}      [description]
	 */
	delRegion(name, type) {
		this.obj.DeleteRegion(name, type)
	},
	/**
	 * 请问所有region的脏标记，否则检测文档状态依然会是'已更改'
	 * @return {[type]} [description]
	 */
	clearRegionModifyFlag() {
		this.obj.CleanAllRegionsModifyFlag()
	},
	/**
	 * 插入数据组
	 * @param  {[type]} setcionName    [description]
	 * @param  {[type]} sectionContent [description]
	 * @return {[type]}                [description]
	 */
	insertSection(setcionName, sectionContent) {
		const section = this.obj.InsertSectionAtCurrentCursor(setcionName, sectionContent)
	},
	/**
	 * 插入下拉框
	 * @param  {[type]} setcionName    [description]
	 * @param  {[type]} sectionContent [description]
	 * @return {[type]}                [description]
	 */
	setCompoundBoxCodeAndValue(name, code, value, type) {
		const section = this.obj.SetCompoundBoxCodeAndValue(name, code, value, type)
	},
	/**
	 * 设置指定名称日期框的截止日期时间
	 * @param  {[type]} setcionName    [description]
	 * @param  {[type]} sectionContent [description]
	 * @return {[type]}                [description]
	 */
	setEndDateTime(name, value) {
		const section = this.obj.SetEndDateTime(name, value)
	},
	/**
	 * 设置指定指定名称日期框的默认显示格式
	 * @param  {[type]} setcionName    [description]
	 * @param  {[type]} sectionContent [description]
	 * @return {[type]}                [description]
	 */
	setDateTimeFormat(name, value) {
		const section = this.obj.SetDateTimeFormat(name, type)
	},
	/**
	 * 设置Numbox的取值上限
	 * @param  {[type]} setcionName    [description]
	 * @param  {[type]} sectionContent [description]
	 * @return {[type]}                [description]
	 */
	setNumboxMaxValue(name, value) {
		const section = this.obj.SetNumboxMaxValue(name, type)
	},
	/**
	 * 设置Numbox的取值下限
	 * @param  {[type]} setcionName    [description]
	 * @param  {[type]} sectionContent [description]
	 * @return {[type]}                [description]
	 */
	setNumboxMinValue(name, value) {
		const section = this.obj.SetNumboxMinValue(name, type)
	},
	/**
	 * 设置Numbox的精度
	 * @param  {[type]} setcionName    [description]
	 * @param  {[type]} sectionContent [description]
	 * @return {[type]}                [description]
	 */
	setNumboxPrecision(name, value) {
		const section = this.obj.SetNumboxPrecision(name, type)
	},
	/**
	 * 设置Numbox的单位
	 * @param  {[type]} setcionName    [description]
	 * @param  {[type]} sectionContent [description]
	 * @return {[type]}                [description]
	 */
	SetNumboxUnit(name, value) {
		const section = this.obj.SetNumboxUnit(name, type)
	},
	/**
	 * 获取所有的数据组
	 * @return {[type]} [description]
	 */
	getAllSection() {
		const allSection = this.obj.GetAllSectionNamesByCurrentDoc()
		return allSection
	},
	/**
	 * 获取光标所有的数据组
	 * @return {[type]} [description]
	 */
	getCurrentSection() {
		const currentSection = this.obj.GetCurrentSectionName()
		return currentSection
	},
	/**
	 * 获取文档中所有的Section个数
	 * @return {[type]} [description]
	 */
	getAllSectionCount() {
		const count = this.obj.GetAllSectionCount()
		return count
	},
	/**
	 * 获取整个文档区域的脏标记符合某个状态的名称集合
	 * @param  {[type]} nOnlyFirstRegions [是否最外层区域 1, 0]
	 * @param  {[type]} nModifyFlag       [脏标记的值 1, 0]
	 * @return {[type]}                   [符合条件的所有区域名称 ，用分号隔开(“”)]
	 */
	getRegionModify(nOnlyFirstRegions, nModifyFlag) {
		return this.obj.GetAllRegionsByModifyFlag(nOnlyFirstRegions, nModifyFlag)
	},
	/**
	 * [获取 sectoin 区域文本]
	 * @return {[type]} [description]
	 */
	getSectionText(name) {
		return this.obj.GetSectionText(name)
	},
	/**
	 * [根据Section 名称获得其内容,以HTML 格式返回]
	 * @return {[type]} [description]
	 */
	getSectionContent(name) {
		return this.obj.GetSectionContentBySectionName(name)
	},
	/**
	 * 获取指定数据组的某个属性
	 * @param  {[type]} name [description]
	 * @param  {[type]} prop [description]
	 * @return {[type]}      [description]
	 */
	getSectionProp(name, prop) {
		return this.obj.GetSectionProp(name, prop)
	},
	/**
	 * 重新命名指定 section
	 * @param  {[type]} name [description]
	 * @param  {[type]} prop [description]
	 * @return {[type]}      [description]
	 */
	setSectionName(name, value) {
		return this.obj.SetSectionName(name, value)
	},
	/**
	 * 设置指定数据组的某个属性
	 * @param  {[type]} name [description]
	 * @param  {[type]} prop [description]
	 * @return {[type]}      [description]
	 */
	setSectionProp(name, prop, value) {
		return this.obj.SetSectionProp(name, prop, value)
	},
	/**
	 * 插入数据元(新控件)
	 * @return {[type]} [description]
	 */
	insertNewControl(name, text, type) {
		const newControl = this.obj.InsertNewControlAtCurrentCursor(name, text, type)
	},
	/**
	 * 设置NewControl 属性
	 * @param {[type]} name  [description]
	 * @param {[type]} props [description]
	 * @param {[type]} value [description]
	 */
	setControlProp(name, props, value) {
		this.obj.SetNewControlProp(name, props, value)
	},
	/**
	 * 结束撤销动作
	 * @param {[type]} name  [description]
	 * @param {[type]} props [description]
	 * @param {[type]} value [description]
	 */
	endUndo() {
		this.obj.EndUndo()
	},
	/**
	 * 设置指定多选下拉控件的分隔符
	 * @param {[type]} name  [description]
	 * @param {[type]} props [description]
	 * @param {[type]} value [description]
	 */
	setMultiDropdownControlSeparator(name, value) {
		this.obj.SetMultiDropdownControlSeparator(name, value)
	},
	/**
	 * 设置TextBox可输入的最大长度
	 * @param {[type]} name  [description]
	 * @param {[type]} props [description]
	 * @param {[type]} value [description]
	 */
	setTextBoxMaxLen(name, value) {
		this.obj.SetTextBoxMaxLen(name, value)
	},
	/**
	 * 获取当前页面所有数据元
	 * @return {[type]} [description]
	 */
	getAllNewControl(type) {
		const allNewControl = this.obj.GetAllControlNameByCurrentDoc()
		return allNewControl
	},
	/**
	 * 设置文档的所有数据元的背景色是否一直显示
	 * @return {[type]} [description]
	 */
	setAllNewCtrlBGColor(bool) {
		this.obj.SetAllNewCtrlBGColor(bool)
	},
	/**
	 * 设置文档的所有数据元的背景色显示类型
	 * @return {[type]} [description]
	 */
	setAllNewCtrlBGColor2(bool, boolt) {
		this.obj.SetAllNewCtrlBGColor2(bool, boolt)
	},
	/**
	 * [获取新式控件区域文本]
	 * @param {[type]} name [description]
	 */
	getNewControlText(name) {
		return this.obj.GetNewControlText(name)
	},
	/**
	 * 设置新式控件的值
	 * @param {[type]} name [description]
	 * @param {[type]} text [description]
	 */
	setNewControlText(name, text) {
		this.obj.SetNewControlText(name, text)
	},
	/**
	 * 获取指定数据元的指定属性
	 * @param  {[type]} name [description]
	 * @param  {[type]} prop [description]
	 * @return {[type]}      [description]
	 */
	getNewControlProp(name, prop) {
		return this.obj.GetNewControlProp(name, prop)
	},
	/**
	 * 插入签名
	 * @param  {[type]} file [文件路径]
	 * @return {[type]}      [description]
	 */
	insertSign(file) {
		this.obj.AddSignaturePic(file)
	},
	/**
	 * 获取数据元中checkbox选中状态
	 * @param  {[type]} name [description]
	 * @return {[type]}      [description]
	 */
	getCheckboxStatus(name) {
		return this.obj.GetCheckboxStatus(name)
	},
	/**
	 * 以XML格式依次返回文档 Section 和新式控件的层次关系
	 * @param  {[type]} aSctContType  [description]
	 * @param  {[type]} aCtrlContType [description]
	 * @return {[type]}               [description]
	 */
	getStructXml(aSctContType, aCtrlContType) {
		return this.obj.GetStructsXmlInfoByParament(aSctContType, aCtrlContType, "", "IncludeRegion", "")
	},
	/**
	 * 获取指定名称日期框的值
	 * @param  {[type]} name [description]
	 * @return {[type]}      [description]
	 */
	getDateTimeBoxValue(name) {
		return this.obj.GetDateTimeBoxValue(name)
	},
	/**
	 * 获取各种控件的名称，
	 * 1 = Combox，2 = ListBox，3 = TextBox，4 = CheckBox，5 = NumberBox，6 = MultiListBox，7 = MultiComBox，8 = DateTimeBox，9 = RadioButton，10=MultiCheckbox
	 * @param  {[type]} type [description]
	 * @return {[type]}      [description]
	 */
	getNewControlsByType(type) {
		return this.obj.GetNewControlNameByType(type)
	},
	/**
	 * 获取指定区域里面存在的结构名称列表
	 * @param  {[type]} region [区域名称]
	 * @param  {[type]} type   [类别 1---->Region  2---->数据组  3---->数据元  4---->表格]
	 * @return {[type]}        [description]
	 */
	getStructNamesInRegion(region, type) {
		return this.obj.GetStructNamesByOneRegion(region, type)
	},
	/**
	 * 以合并的方式插入文档流
	 * @param  {[type]} bDifferentHeader      [description]
	 * @param  {[type]} bFirstDifferentHeader [description]
	 * @param  {[type]} base64String          [description]
	 * @return {[type]}                       [description]
	 */
	mergeDocWithString(bDifferentHeader, bFirstDifferentHeader, base64String) {
		return this.obj.MergeDocumentsWithString(bDifferentHeader, bFirstDifferentHeader, base64String)
	},
	/**
	 * 执行方法
	 * @param  {[type]} methodName [description]
	 * @return {[type]}            [description]
	 */
	executeMethod(methodName) {
		this.obj.ExecuteMethod(methodName)
	},
	/**
	 * 其他工具
	 * @type {Object}
	 */
	tools: {
		hax: null, // 指向handleActiveX
		rawObj: null,
		/**
		 * 检测name是否在checkboxList中
		 * @param  {[type]} checkboxList [description]
		 * @param  {[type]} name         [description]
		 * @return {[type]}              [description]
		 */
		inCheckboxList(checkboxList, name) {
			let ret = false
			checkboxList.forEach(item => {
				if (name.indexOf(item) > -1) {
					ret = true
				}
			})
			return ret
		},
		/**
		 * 判断文档是否有更改，用于关闭标签是判断
		 * @return {[type]} [description]
		 */
		docHasChanged() {
			//如果是区域的
			if (this.rawObj.GetAllRegionNamesByCurrentDoc()) {
				if (this.rawObj.GetAllRegionsByModifyFlag(0, 1)) {
					return true
				} else {
					return false
				}
			} else {
				if (this.rawObj.IsDocModified()) {
					return true
				} else {
					return false
				}
			}
		},
		/**
		 * 设置文档修改状态
		 * @param {[type]} bool [description]
		 */
		setDocModified(bool) {
			this.rawObj.SetDocModified2(bool)
		},
		/**
		 * 插入患者信息，查找所有数据元，根据需要替换
		 * @param  {[type]} patientInfo [description]
		 * @return {[type]}             [description]
		 */
		fillPatientInfo(patientInfo) {
			const newControl = this.rawObj.GetNewControlNameByType('3')
			newControl.split(',').forEach(item => {
				const subItem = item.substring(0, 10)
				const text = this.rawObj.GetNewControlText(item)
				switch (subItem) {
					case '1000000996': // 姓名
						this.rawObj.SetNewControlText(item, patientInfo && patientInfo.PAT_NAME)
						break
					case '1000001054': // 医院名称
						this.rawObj.SetNewControlText(item, '****第一人民医院')
						break
					case '1000000998': // 科室名称
						this.rawObj.SetNewControlText(item, patientInfo && patientInfo.DEPT_NAME_CN)
						break
					case '1000001018': // 床号
						this.rawObj.SetNewControlText(item, patientInfo && patientInfo.BED_NO)
						break
					case '1000000997': // 住院号
						this.rawObj.SetNewControlText(item, patientInfo && patientInfo.VISIT_NO)
						break
					case '1000001004':
					case '1000001202': // 性别
						this.rawObj.SetNewControlText(item, patientInfo && patientInfo.CODE_NAME)
						break
					case '1000001005': // 年龄
						this.rawObj.SetNewControlText(item, patientInfo && patientInfo.PATIENT_AGE)
						break
					case '1000001010': // 婚姻情况
						this.rawObj.SetNewControlText(item, patientInfo && patientInfo.MARITAL_STATUS)
						break
					case '1000001003': // 职业
						this.rawObj.SetNewControlText(item, patientInfo && patientInfo.OCCUPATION)
						break
					case '1000001011': // 籍贯
						this.rawObj.SetNewControlText(item, patientInfo && patientInfo.ORIGIN)
						break
					case '1000001015':
					case '1000001014': // 病历号
						this.rawObj.SetNewControlText(item, patientInfo && patientInfo.VST_CARD_NO)
						break
					case '1000001009': // 住址
						this.rawObj.SetNewControlText(item, patientInfo && patientInfo.LOCAL_ADDRESS)
						break
					case '1000001002': // 单位
						this.rawObj.SetNewControlText(item, patientInfo && patientInfo.EMPLOYER)
						break
					case '1000001492': // 出生地
						this.rawObj.SetNewControlText(item, patientInfo && patientInfo.BIRTH_PLACE)
						break
					case '1000001016': // 入院次数
						this.rawObj.SetNewControlText(item, patientInfo && patientInfo.IN_TIMES)
						return
					case '1000001178': // 出院日期
						this.rawObj.SetNewControlText(item, patientInfo && patientInfo.DISCHARGE_DATE)
						break
					case '1000001951': // 出生日期
						this.rawObj.SetNewControlText(item, patientInfo && patientInfo.BIRTH_DATE)
						break
					case '1000001179': // 入院日期
						this.rawObj.SetNewControlText(item, patientInfo && patientInfo.ADM_DATE)
						break
					case '1000001019': // 入院时间
						this.rawObj.SetNewControlText(item, patientInfo && patientInfo.ADM_DATE)
						break
					case '1000001024': // 联系人
						this.rawObj.SetNewControlText(item, patientInfo && patientInfo.NOK_NAME)
						break
					case '1000001025': // 联系人关系
						this.rawObj.SetNewControlText(item, patientInfo && patientInfo.NOK_RELATION)
						break
					case '1000001026': // 联系人电话
						this.rawObj.SetNewControlText(item, patientInfo && patientInfo.NOK_PHONE_NO)
						break
					case '1000001027': // 联系人地址
						this.rawObj.SetNewControlText(item, patientInfo && patientInfo.NOK_ADDRESS)
						break
					case '1000001008': // 民族数据
						this.rawObj.SetNewControlText(item, patientInfo && patientInfo.NATIONAL)
						break
					default:
						break
				}
			})
			const dateTimeBox = this.rawObj.GetNewControlNameByType('8')
			let d = '', t = ''
			dateTimeBox.split(',').forEach(item => {
				switch (item) {
					case '10000019512016825161508991111':
						if (patientInfo.BIRTH_DATE) {
							d = patientInfo.BIRTH_DATE.split(' ')[0].split('/').join('-')
							t = patientInfo.BIRTH_DATE.split(' ')[1]
							this.rawObj.SetDateTimeBoxValue(item, `Date=${d}  Time=${t}`)
						}
						break
					case '1000001128201112894447296':
					case '1000001128201112810268752':
					case '1000001128201112895216937':
					case '1000001128201112895114171':
					case '100000112820111221853393':
					case '1000001127201561115939550':
					case '1000002007201611281341273':
					case '1000001262201471141754328':
					case '10000011782015811134239415':
					case '100000112820111212114945281':
					case '1000001179201581113423498':
						d = moment(new Date()).format('YYYY-MM-DD')
						t = moment(new Date()).format('HH:mm')
						this.rawObj.SetDateTimeBoxValue(item, `Date=${d}  Time=${t}`)
						break
					default:
						break
				}
			})
		},
		/**
		 * 新建病程后插入region
		 * @return {[type]} [description]
		 */
		insertRegion(listCode) {
			this.rawObj.JumpToFirstPage()
			this.rawObj.ExecuteMethod("InsertPara") // 换行
			this.rawObj.ExecuteMethod("SwBackspace") // 退格
			const sName = listCode + "-normal-" + 1
			const sNameDateInsert = "1000001128-" + sName
			this.rawObj.SetParaAlignment(this.rawObj.GetCurrentRowIndex(), 1) // 设置选中区域或者当前光标位置区域或者某一个行号位置的对齐方式
			this.rawObj.InsertNewControlAtCurrentCursor(sNameDateInsert, "系统时间", 8)
			this.rawObj.SetDateTimeBoxValue(sNameDateInsert, `Date=${moment(new Date()).format('YYYY-MM-DD')} Time=${moment(new Date()).format('HH:mm')}`)
			this.rawObj.SelectOneStructContent(sNameDateInsert) // 光标选中某一个结构的所有内容,但是不包括边框
			this.rawObj.TextAsianName = "楷体GB_2312"
			this.rawObj.TextSize = 12
			this.delInvalidDateTime()
			// 设置不允许删除不允许修改不删除边框允许打印，保存为XML
			this.rawObj.SetNewControlProp(sNameDateInsert, "DelFlag", "TRUE")
			this.rawObj.SetNewControlProp(sNameDateInsert, "EditProtect", "FALSE")
			this.rawObj.SetNewControlProp(sNameDateInsert, "Edge", "FALSE")
			this.rawObj.SetNewControlProp(sNameDateInsert, "IsNotRecordInXML", "FALSE")
			this.rawObj.SetNewControlProp(sNameDateInsert, "Printable", "TRUE")
			this.rawObj.SetNewControlProp(sNameDateInsert, "bEditInReadOnly", "TRUE")
			this.rawObj.JumpToOnePostion(this.rawObj.GetNewControlEnd(sNameDateInsert) + 1)
			this.rawObj.ExecuteMethod("SelectAll")
			// 在指定区域的后面插入一个区域，并且指定插入区域的名称
			const ss = this.rawObj.InsertRegionAtCurrentCursor(sName)
			this.rawObj.SetRegionProp(sName, "bEditProtect", "FALSE")
			this.rawObj.SetRegionProp(sName, "bDeleteProtect", "TRUE")
			this.rawObj.SetRegionProp(sName, "bVisible", "TRUE")
			this.rawObj.SetRegionProp(sName, "bEditInReadOnly", "TRUE")
			this.rawObj.SetRegionBorderVisible(true)
			this.rawObj.JumpToOnePostion(this.rawObj.GetRegionEnd(sName) + 2)
			this.rawObj.SetDocModified2(false)
			this.rawObj.ProtectDoc(true)
		},
		/**
		 * 计算是否需要显示时间选择弹窗，仅针对于插入操作
		 * 1、光标区域前无区域，不需要弹窗，直接插入
		 * 2、光标区域前有区域，但当前区域时间减一天和上一个区域时间相等，不需要弹窗，直接插入
		 * 3、光标区域前有区域，但当前区域时间减一天和上一个区域时间不相等，需要弹窗，时间范围为光标区域时间和上一区域时间
		 * @return {[type]} [description]
		 */
		calcShowDateChooseDia() {
			const regionNames = this.rawObj.GetAllRegionNamesByCurrentDoc()
			const listRegion = [] // 当前页面所有区域列表
			const bounceInfo = {
				false: false, // false表示需要弹窗
				dateMax: '',
				dateMin: '',
				insertDate: ''
			}
			if (regionNames) {
				let arrRegion = regionNames.split(',')
				arrRegion.pop()
				const len = arrRegion.length
				if (len > 0) {
					for (let i = 0; i < len; i++) {
						listRegion.push(arrRegion[i])
					}
				}
				const cursorRegion = this.rawObj.GetCurrentRegionName() // 获取光标所在区域
				if (!cursorRegion) {
					return
				}
				// 获取光标所在region的时间
				const cursorRegionTime = this.rawObj.GetDateTimeBoxValue("1000001128-" + cursorRegion).replace(/-/g, '/')
				// 计算前一天的时间
				const yesterday = new Date(cursorRegionTime).getTime() - (24 * 60 * 60 * 1000)
				// 光标调到上一个区域
				this.rawObj.CursorJumpOutOfOneRegion(cursorRegion, false)
				// 获取上个区域id
				const beforeRegionId = this.rawObj.GetCurrentRegionName()
				if (beforeRegionId) {
					// 存在上个区域
					const beforeRegionTime = this.rawObj.GetDateTimeBoxValue("1000001128-" + beforeRegionId).replace(/-/g, '/')
					if (new Date(beforeRegionTime).getTime() === yesterday) {
						// 直接插入
						bounceInfo.bounce = true
						bounceInfo.insertDate = new Date(yesterday)
					} else { // 弹出时间选择框
						// 光标需要调回原区域，否则插入错误
						this.rawObj.CursorJumpOutOfOneRegion(this.rawObj.GetCurrentRegionName(), true)
						bounceInfo.bounce = false
						bounceInfo.dateMax = new Date(cursorRegionTime)
						bounceInfo.dateMin = new Date(beforeRegionTime)
						bounceInfo.cursorRegion = cursorRegion
					}
				} else {
					// 调到下一个区域，否则会因为找不到当前区域而无法插入
					this.rawObj.JumpToOnePostion(this.rawObj.GetRegionBegin(cursorRegion))
					// 不存在上个区域
					bounceInfo.bounce = true
					bounceInfo.insertDate = new Date(yesterday)
				}
			}
			return bounceInfo
		},
		/**
		 * 点击新建/插入逻辑
		 * @return {[type]} [description]
		 */
		insertContentIntoDoc(baseObj, tag, dateChoose, content, cursorRegion, patientInfo) {
			// 获取当前文档的区域数量
			const regionNames = this.rawObj.GetAllRegionNamesByCurrentDoc()
			const listRegion = []
			if (regionNames) {
				// 获取区域集合
				let arrRegion = regionNames.split(',')
				arrRegion.pop() // 把最后一个逗号剔除掉
				if (arrRegion.length > 0 && arrRegion[0]) {
					for (let i = 0; i < arrRegion.length; i++) {
						// const ds = this.rawObj.GetRegionProp(arrRegion[i], "bEditInReadOnly")
						// console.log('ds', ds, arrRegion[i])
						// if (ds === "FALSE") {
						// 	alert("已打开病程为只读方式，不能进行编辑！", "医疗操作提示")
						// 	this.rawObj.ProtectDoc(true)
						// 	return
						// }
						listRegion.push(arrRegion[i])
					}
					listRegion.reverse()
					if (tag === 'insert') { // 插入逻辑
						//-normal- 表示顺序插入，-insert-表示插入在某个区域之前插入
						// baseObj.sNameInsert += "-insert-" + (parseInt(temp, 10) + 1)
						baseObj.sNameInsert = baseObj.sNameInsert.replace('normal', 'insert')
						if (!this.rawObj.GetCurrentRegionName()) { //  IE自身特性可能存在闪烁情况，如果光标找不到则跳转到实现存储的区域位置
							this.rawObj.JumpToOnePostion(this.rawObj.GetRegionBegin(cursorRegion))
						}
						// 获取光标所在region的时间
						const time = new Date(this.rawObj.GetDateTimeBoxValue("1000001128-" + this.rawObj.GetCurrentRegionName()))
						// 计算前一天的时间
						const currentTime = new Date(time.getTime() - (24 * 60 * 60 * 1000))
						// 找到当前region在listRegion中的位置
						const indexReg = listRegion.indexOf(this.rawObj.GetCurrentRegionName())
						// 只有光标所在区域的region在listRegion，则执行插入
						if (listRegion.includes(this.rawObj.GetCurrentRegionName())) {
							// 插入到两个区域之间的情况
							listRegion.splice(indexReg, 0, baseObj.sNameInsert) // 向listRegion插入值
						}
						// 在当前光标位置插入区域 
						this.rawObj.InsertRegionBeforeNamedRegion(baseObj.sNameInsert, this.rawObj.GetCurrentRegionName())
						this.rawObj.SetRegionProp(baseObj.sNameInsert, "bEditProtect", "FALSE")
						this.rawObj.SetRegionProp(baseObj.sNameInsert, "bDeleteProtect ", "TRUE")
						this.rawObj.SetRegionProp(baseObj.sNameInsert, "bVisible", "TRUE")
						this.rawObj.SetRegionProp(baseObj.sNameInsert, "bEditInReadOnly", "TRUE")
						// 把文档内容插进去
						this.rawObj.MergeDocumentsWithString(true, true, content)
						this.rawObj.JumpToOnePostion(this.rawObj.GetRegionBegin(this.rawObj.GetCurrentRegionName()))
						// this.rawObj.executeMethod("SwBackspace")
						const sNameDateInsert = "1000001128-" + baseObj.sNameInsert
						this.rawObj.InsertNewControlAtCurrentCursor(sNameDateInsert, "系统时间", 8)
						this.rawObj.SetDateTimeBoxValue(sNameDateInsert, `Date=${moment(dateChoose).format('YYYY-MM-DD')} Time=${moment(dateChoose).format('HH:mm')}`)
						this.rawObj.SelectOneStructContent(sNameDateInsert)
						this.rawObj.TextAsianName = "楷体GB_2312"
						this.rawObj.TextSize = 12
						//设置不允许删除不允许修改不删除边框允许打印，保存为XML
						this.rawObj.SetNewControlProp(sNameDateInsert, "DelFlag", "TRUE")
						this.rawObj.SetNewControlProp(sNameDateInsert, "EditProtect", "FALSE")
						this.rawObj.SetNewControlProp(sNameDateInsert, "Edge", "FALSE")
						this.rawObj.SetNewControlProp(sNameDateInsert, "IsNotRecordInXML", "FALSE")
						this.rawObj.SetNewControlProp(sNameDateInsert, "Printable", "TRUE")
						this.delInvalidDateTime()

					} else if (tag === 'create') { // 新建逻辑
						const sNameOld = this.GetMaxInsertDate(arrRegion) // 双击进来一定进去最后一个病程(这边通过时间来确定到最后一个病程)
						// 在指定区域的后面插入一个区域，并且指定插入区域的名称
						this.rawObj.InsertRegionAfterNamedRegion(baseObj.sNameInsert, sNameOld)
						listRegion.push(baseObj.sNameInsert)
						this.rawObj.SetRegionProp(baseObj.sNameInsert, "bEditProtect", "FALSE")
						this.rawObj.SetRegionProp(baseObj.sNameInsert, "bDeleteProtect ", "TRUE")
						this.rawObj.SetRegionProp(baseObj.sNameInsert, "bVisible", "TRUE")
						this.rawObj.SetRegionProp(baseObj.sNameInsert, "bEditInReadOnly", "TRUE")
						this.rawObj.executeMethod("InsertPara")
						this.rawObj.MergeDocumentsWithString(true, true, content) // 把数据流合并到文档里
						this.rawObj.executeMethod("SwBackspace")
						this.rawObj.JumpToOnePostion(this.rawObj.GetRegionBegin(this.rawObj.GetCurrentRegionName()) + 1)
						const sNameDateInsert = "1000001128-" + baseObj.sNameInsert
						this.rawObj.InsertNewControlAtCurrentCursor(sNameDateInsert, "系统时间", 8)
						this.rawObj.SetDateTimeBoxValue(sNameDateInsert, `Date=${moment(dateChoose).format('YYYY-MM-DD')} Time=${moment(dateChoose).format('HH:mm')}`)
						this.rawObj.SelectOneStructContent(sNameDateInsert)
						this.rawObj.TextAsianName = "楷体GB_2312"
						this.rawObj.TextSize = 12
						//设置不允许删除不允许修改不删除边框允许打印，保存为XML
						this.rawObj.SetNewControlProp(sNameDateInsert, "DelFlag", "TRUE")
						this.rawObj.SetNewControlProp(sNameDateInsert, "EditProtect", "FALSE")
						this.rawObj.SetNewControlProp(sNameDateInsert, "Edge", "FALSE")
						this.rawObj.SetNewControlProp(sNameDateInsert, "IsNotRecordInXML", "FALSE")
						this.rawObj.SetNewControlProp(sNameDateInsert, "Printable", "TRUE")
						this.rawObj.JumpToOnePostion(this.rawObj.GetNewControlBegin(sNameDateInsert))
						this.rawObj.ExecuteMethod("SwBackspace")
						this.delInvalidDateTime()
					}
					this.hax.tools.fillPatientInfo(patientInfo)
				}
			} else {
				// 当前光标位置插入区域
				this.rawObj.InsertRegionAtCurrentCursor(baseObj.sNameInsert)
				listRegion.push(baseObj.sNameInsert)
			}
		},
		/**
		 * 获取页面的最大时间，用于新建
		 * @return {[type]} [description]
		 */
		getDocDateRange() {
			const dateRet = this.GetMaxInsertDate()
			const dateTime = this.rawObj.GetDateTimeBoxValue('1000001128-' + dateRet)
			return dateTime
		},
		/**
		 * 找页面上时间最大的那个region，新建的region在后面
		 */
		GetMaxInsertDate() {
			const dateTimeBoxArr = this.rawObj.GetNewControlNameByType('8').split(',')
			let sNameOld = ''
			let minDate = new Date('1990/1/1').getTime()
			if (dateTimeBoxArr.length > 0) {
				for (let i = 0; i < dateTimeBoxArr.length; i++) {
					// IE无法转换'2020-06-19'这种格式的日期
					if (dateTimeBoxArr[i].includes('1000001128')) {
						let SS = this.rawObj.GetDateTimeBoxValue(dateTimeBoxArr[i]).replace(/-/g, '/')
						if (SS) {
							const date = new Date(SS).getTime()
							if (date > minDate) {
								minDate = date
								sNameOld = dateTimeBoxArr[i]
							}
						} else {
							console.log("病程时间格式有误，不符合操作规定，详情请联系管理员！")
						}
					}
				}
			}
			return sNameOld.replace('1000001128-', '')
		},
		/**
		 * 手动插入一个系统时间的DateTimeBox控件并重命名后，要把原有的那个删掉
		 * @return {[type]} [description]
		 */
		delInvalidDateTime() {
			const newControlNames = this.rawObj.GetAllControlNameByCurrentDoc()
			if (newControlNames) {
				const newControlArr = newControlNames.split(',')
				newControlArr.forEach(item => {
					switch (item.substring(0, 10)) {
						case "1000001128":
							if (item.indexOf("-") == -1) {
								this.rawObj.SetNewControlProp(item, "DelFlag", "FALSE")
								this.rawObj.DeleteNewControl(item)
								this.rawObj.ExecuteMethod("SwBackspace")
							}
							break
						default:
							break
					}
				})
			}
		},
		/**
		 * 同步内容管理，根据接口获取的内容，更新当前文档
		 * @return {[type]} [description]
		 */
		syncContent(visit_Id, listCode, listXY, listZY, dvPatOpreation, opreationDate) {
			if (this.rawObj.GetAllSectionCount() > 0) {
				// 获取当前文档的所有节点名
				let strSectionName = this.rawObj.GetAllSectionNamesByCurrentDoc()
				// 将所有的节点名截取存到数组中
				const strArray = strSectionName.split(',')
				if (visit_Id) {
					let groupZD = "" //诊断
					// region 同步诊断信息  strArray 所有section节点
					for (let idx = 0; idx < strArray.length; idx++) {
						if (strArray[idx].trim()) {
							this.rawObj.SelectOneStructContent(strArray[idx].trim()) // 先获取外面数据组字体
							const font = this.rawObj.TextAsianName
							const fontsize = this.rawObj.TextSize
							switch (strArray[idx].trim()) {
								case "S-07-005": // 出院诊断(西医)
									this.rawObj.SetSectionProp(strArray[idx].trim(), "EditProtect", "false")
									// 清空出院西医诊断里面内容
									this.rawObj.DeleteSectionContent(strArray[idx])
									// 使光标跳转到指定数据组中
									this.rawObj.CursorJumpOutOfOneStruct(strArray[idx], 3)
									for (index in listXY) {
										//插入节点
										this.rawObj.InsertSectionAtCurrentCursor(listXY[index].KindId, listXY[index].ICD10Name)
										//设置上方标题
										this.rawObj.SetSectionProp(listXY[index].KindId, "HelpTip", listXY[index].ICD10)
										//设置里面数据组字体
										this.rawObj.SelectOneStructContent(listXY[index].KindId)
										this.rawObj.TextAsianName = font
										this.rawObj.TextColor = -1
										this.rawObj.TextSize = fontsize
										this.rawObj.JumpToOnePostion(this.rawObj.GetSectionEnd(listXY[index].KindId) + 1)
										if (index !== Object.keys(listXY).length - 1) {
											this.rawObj.InsertTextAtCurrentCursor("，")
										}
									}
									this.rawObj.SetSectionProp(strArray[idx].trim(), "EditProtect", "true")
									break
								case "S-07-006": // 出院诊断（中医）
									this.rawObj.SetSectionProp(strArray[idx].trim(), "EditProtect", "false")
									// 清空出院中医诊断里面内容
									this.rawObj.DeleteSectionContent(strArray[idx])
									// 使光标跳转到指定数据组中
									this.rawObj.JumpToOnePostion(axNsoControl.GetSectionBegin(strArray[idx]) + 1)
									for (index in listZY) {
										// 插入节点
										this.rawObj.InsertSectionAtCurrentCursor(listZY[index].KindId, listZY[index].ICD10Name)
										// 设置上方标题
										this.rawObj.SetSectionProp(listZY[index].KindId, "HelpTip", listZY[index].ICD10)
										// 设置里面数据组字体
										this.rawObj.SelectOneStructContent(listXY[index].KindId)
										this.rawObj.TextAsianName = font
										this.rawObj.TextColor = -1
										this.rawObj.TextSize = fontsize
										this.rawObj.JumpToOnePostion(this.rawObj.GetSectionEnd(listZY[index].KindId) + 1)
										if (index !== Object.keys(listZY).length - 1) {
											this.rawObj.InsertTextAtCurrentCursor("，")
										}
									}
									this.rawObj.SetSectionProp(strArray[idx].Trim(), "EditProtect", "true")
									break
								case "S-94": // 出院记录（手术名称）
									this.rawObj.SetSectionProp(strArray[idx].Trim(), "EditProtect", "false")
									this.rawObj.DeleteSectionContent(strArray[idx])
									//使光标跳转到指定数据组中
									this.rawObj.JumpToOnePostion(this.rawObj.GetSectionBegin(strArray[idx]) + 1)
									// 生成1000-10000的随机数
									const number = parseInt(Math.random() * (10000 - 1000 + 1) + 1000, 10)
									const id = "S94001" + "-" + number
									if (!dvPatOpreation[0]) {
										this.rawObj.ExecuteMethod("InsertPara")
									} else {
										this.rawObj.InsertTextAtCurrentCursor("，")
									}
									// 插入节点
									const str = this.rawObj.InsertSectionAtCurrentCursor(id, dvPatOpreation[2])
									// 设置上方标题
									this.rawObj.SetSectionProp(id, "HelpTip", dvPatOpreation[1])
									// 设置里面数据组字体
									this.rawObj.SelectOneStructContent(id)
									this.rawObj.TextAsianName = "楷体_GB2312"
									this.rawObj.TextColor = -1
									this.rawObj.TextSize = fontsize
									this.rawObj.JumpToOnePostion(this.rawObj.GetSectionEnd(id) + 1)
									this.rawObj.TextAsianName = "楷体_GB2312"
									this.rawObj.TextColor = -1
									this.rawObj.TextSize = 12
									// 再插入手术时间
									const dtss = ""
									if (opreationDate) {
										dtss = moment(opreationDate).format("YYYY-MM-DD")
									}
									if (dtss) {
										const lstrName = this.rawObj.GetAllControlNameByCurrentDoc()
										if (lstrName) {
											const lstrID = lstrName.split(',')
											for (let i = 0; i < lstrID.length; i++) {
												if (lstrID[i].trim()) {
													switch (lstrID[i].trim().substring(0, 10)) {
														case "1000001559":
															this.rawObj.SetNewControlText(lstrID[i], dtss)
															break
													}
												}
											}
										}
									}
									this.rawObj.SetSectionProp(strArray[idx].Trim(), "EditProtect", "true")
									break
							}
						}
					}
				}
			}
		},
		/**
		 * 更新或者插入诊断信息
		 */
		insertOrUpdateDiagnosis(data) {
			//获取当前文档的所有节点名
			const strSectionName = this.rawObj.GetAllSectionNamesByCurrentDoc()
			//将所有的节点名截取存到数组中
			const strArray = strSectionName.split(',')
			strArray.pop()
			if (data.values.length == 0 && data.values2.length == 0 && data.values3.length == 0 && data.values4.length == 0 && data.values5.length == 0 && data.values6.length == 0 && data.values7.length == 0 && data.values8.length == 0) {
				// 当当前gridview没有内容时保存删除诊断节点中的内容
			} else {
				// 插入诊断内容
				for (let i = 0; i < strArray.length; i++) {
					if (strArray[i].trim()) {
						switch (strArray[i].trim()) {
							// region 初步西医诊断
							case "S-07-001":
								FillZhenduan.call(this, data.values, strArray, i, "S07001-")
								break
							// region 初步中医诊断
							case "S-07-002":
								FillZhenduan.call(this, data.values4, strArray, i, "S07002-")
								break
							// region 修正西医诊断
							case "S-07-003":
								FillZhenduan.call(this, data.values2, strArray, i, "S07003-")
								break;
							// region 修正中医诊断
							case "S-07-004":
								FillZhenduan.call(this, data.values5, strArray, i, "S07004-")
								break
							// region 出院西医诊断
							case "S-07-005":
								FillZhenduan.call(this, data.values3, strArray, i, "S07005-")
								break
							// region 出院中医诊断
							case "S-07-006":
								FillZhenduan.call(this, data.values6, strArray, i, "S07006-")
								break;
							// region 入院西医诊断
							case "S-07-007":
								FillZhenduan.call(this, data.values7, strArray, i, "S07007-")
								break;
							// region 入院中医诊断
							case "S-07-008":
								FillZhenduan.call(this, data.values8, strArray, i, "S07008-")
								break;
						}
					}
				}
			}
		},
		/**
		 * 更新或者插入手术信息
		 */
		insertOrUpdateOperation(data) {
			// 获取当前文档的所有节点名
			const strSectionName = this.rawObj.GetAllSectionNamesByCurrentDoc()
			// 将所有的节点名截取存到数组中
			const strArray = strSectionName.split(',')
			this.rawObj.SetSectionProp("S-94", "EditProtect", "false")
			for (let i = 0; i < strArray.length; i++) {
				if (strArray[i].trim()) {
					switch (strArray[i].trim()) {
						case "S-94": //手术名称
							FillZhenduan.call(this, data, strArray, i, "S94001-")
							break;

					}
				}
			}
		}
	}
}

export default handleActiveX
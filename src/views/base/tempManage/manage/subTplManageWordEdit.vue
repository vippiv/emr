<template>
    <div class="subTplmanage-wordEdit">
        <el-dialog title="模板管理" :visible.sync="dialogSortVisible" width="100%" fullscreen :before-close="handleClose" append-to-body :close-on-click-modal="false">
            <div style="display:flex; height: calc(100vh - 100px); overflow: hidden;">
                <div class="leftTree" style="flex:0 0 300px;">
                    <el-row style="margin-bottom:27px;margin-top:18px">
                        <el-col :span="6" style="line-height:2;">模板名称：</el-col>
                        <el-col :span="18">
                            <el-input v-model="tplName" size="mini"></el-input>
                        </el-col>
                    </el-row>
                    <el-card shadow="never" class="self-card">
                        <el-tabs v-model="outActiveName" type="card" @tab-click="handleClick">
                            <el-tab-pane label="数据元" name="dataElement">
                                <el-tabs v-model="innerActiveName" type="card" @tab-click="handleInnerClick">
                                    <el-tab-pane label="用户自定义" name="userDefined">
                                        <el-row style="margin:10px 0px;">
                                            <el-col :span="18">
                                                <el-input v-model="userDefineVal" size="mini"></el-input>
                                            </el-col>
                                            <el-col :span="6">
                                                <el-button @click="handleUserDefineFilter" type="primary" size="mini" style="float:right;">查询</el-button>
                                            </el-col>
                                        </el-row>
                                        <el-tree ref="userTree" :filter-node-method="filterNode" :data="treeUserdata" highlight-current :props="defaultProps" @node-click="handleNodeClick" @dblclick.native="handleDbNodeClick" style="height:calc(100vh - 580px);overflow-y:auto;border:1px solid #e6e6e6;"></el-tree>
                                        <div style="text-align:center;margin:10px 0px;">
                                            <el-button @click="handleInsertItem" type="primary" size="mini">插入</el-button>
                                        </div>
                                        <el-tree ref="usertreeBottom" :data="treeSonData" highlight-current :props="defaultProps" @node-click="handleInsertUser" style="height:200px;overflow-y:auto;border:1px solid #e6e6e6;"></el-tree>
                                    </el-tab-pane>
                                    <el-tab-pane label="系统自定义" name="SystemDefined">
                                        <el-tree ref="systermTree" :data="treedataarr" highlight-current :props="defaultProps" @node-click="handleSystemNodeClick" @dblclick.native="handleSystemDbNodeClick" style="height:calc(100vh - 330px);overflow-y:auto;"></el-tree>
                                        <div style="text-align:center;margin:10px 0px;">
                                            <el-button type="primary" size="mini" @click="handleSystermInsert">插入</el-button>
                                        </div>
                                    </el-tab-pane>
                                </el-tabs>
                            </el-tab-pane>
                            <el-tab-pane label="数据组" name="dataGroup">
                                <h2>用户自定义病历数据组:</h2>
                                <el-row style="margin:10px 0px;">
                                    <el-col :span="18">
                                        <el-input v-model="userDataGroupVal" size="mini"></el-input>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-button @click="handleUserDefineFilter" type="primary" size="mini" style="float:right;">查询</el-button>
                                    </el-col>
                                </el-row>
                                <el-tree ref="dataGroupTree" style="overflow-y:auto;height:calc(100vh - 350px);" :filter-node-method="filterNode" :data="treedataGroup" highlight-current :props="defaultProps" @node-click="handleGroupNodeClick" @dblclick.native="handleGroupNodeDbClick"></el-tree>
                                <div style="text-align:center;margin-top:10px;">
                                    <el-button type="primary" size="mini" @click="handleDataGroupInsert">插入</el-button>
                                </div>
                            </el-tab-pane>
                        </el-tabs>
                    </el-card>
                </div>
                <div style="flex:1;margin-left:10px;">
                    <div class="word-content">
                        <!-- word编辑器组件元素 -->
                        <activeXHandlerTempl :tplName='tplName' v-bind="$attrs" @getObjectHandle="handleGetObjectHandle"></activeXHandlerTempl>
                    </div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import {
        createNamespacedHelpers,
        mapState
    } from 'vuex'
    const {
        mapActions
    } = createNamespacedHelpers('residentDoctor')
    import activeXHandlerTempl from './activeXHandlerTempl'
    import handleActiveX from '@/utils/activeX'
    import moment from 'moment'
    export default {
        name: 'subTplManageWordEdit',
        components: {
            activeXHandlerTempl
        },
        props: {
            dialogSortVisible: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                userDefineVal: '',
                userDataGroupVal: '',
                tplName: '', //模板名称
                outActiveName: 'dataElement',
                innerActiveName: 'userDefined',
                treeUserdata: [], //用户自定义数据
                treedata: [],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                treedataarr: [], //系统自定义
                treedataGroup: [], //数据组
                treeSonData: [],
                instance: null,
                dataElementInsert: {}, //用户定义
                systemDefineData: {}, //系统自定义
                dataGroupObj: {} //数据组
            }
        },
        created() {
            this.getDataElementFatherNode()
            this.getAllBySys()
            this.getUserDataGroup()
        },
        mounted() {
            this.tplName = this.$attrs.currentTableData.MR_NAME //模板名称
        },
        methods: {
            ...mapActions(['GetAllBySys', 'GetDataElementFatherNode', 'GetDataElementSonNode', 'GetUserDataGroup', 'GetDataEleSonData', 'GetAllBymlngID']),
            handleUserDefineFilter() {
                if (this.outActiveName == 'dataElement') { //数据元-用户自定义
                    this.$refs.userTree.filter(this.userDefineVal);
                } else if (this.outActiveName == 'dataGroup') { //数据组
                    this.$refs.dataGroupTree.filter(this.userDataGroupVal)
                }

            },
            handleInsertUser(data) {

            },
            handleGetObjectHandle(obj) {
                this.instance = obj
            },
            filterNode(value, data) { //tree过滤
                if (!value) return true;
                return data.label.indexOf(value) !== -1;
            },
            handleClose(done) {
                this.$emit('closeSubTplWord', false)
            },
            getUserDataGroup() {
                this.GetUserDataGroup().then(res => {
                    if (res.code == 1) {
                        this.treedataGroup = res.values
                    }
                })
            },
            getDataElementFatherNode() { //用户自定义数据元父节点信息
                this.GetDataElementFatherNode().then(res => {
                    if (res.code == 1) {
                        this.treeUserdata = res.values
                    }

                })
            },
            getDataElementSonNode(node) { //用户自定义数据元子节点信息
                let data = {
                    id: node.id
                }
                this.GetDataElementSonNode(data).then(res => {
                    if (res.code == 1) {
                        node.children = res.values
                    }
                })
            },
            getAllBySys() { //获取系统预定义数据元
                this.GetAllBySys().then(res => {
                    if (res.code == 1) {
                        this.treedataarr = res.values
                    }
                })
            },
            handleNodeClick(data) { //用户自定义树点击
                this.dataElementInsert = data
                this.getDataElementSonNode(data)
                let param = {
                    id: data.id
                }
                this.GetDataEleSonData(param).then(res => { //单击自定义数据元获取元素
                    if (res.code == 1) {
                        this.treeSonData = res.values
                    }
                })
            },
            handleSystermInsert() { //系统自定义插入
                let data = this.$refs.systermTree.getCurrentNode() || {}
                if (Object.keys(data).length == 0) {
                    this.$message.warning('请选择要插入的元素!')
                    return
                }
                this.insertNewControlCommon(this.systemDefineData)
            },
            handleInsertItem() { //数据元插入按钮
                let data = this.$refs.userTree.getCurrentNode() || {}
                if (Object.keys(data).length == 0) {
                    this.$message.warning('请选择要插入的元素！')
                    return
                }
                if (data.Tag == 1) {
                    this.$message.warning('请双击末节点，否则不能插入元素！')
                    return
                }
                this.insertNewControlCommon(this.dataElementInsert)
            },
            handleDbNodeClick() { //用户自定义树双击
                let data = this.$refs.userTree.getCurrentNode()
                if (data.Tag == 1) {
                    this.$message.warning('请双击末节点，否则不能插入元素！')
                    return
                }
                this.insertNewControlCommon(data)

            },
            handleSystemNodeClick(data) { //系统自定义树点击
                this.systemDefineData = data
            },
            handleSystemDbNodeClick() { //系统自定义树双击
                let data = this.$refs.systermTree.getCurrentNode()
                this.insertNewControlCommon(data)
            },
            insertNewControlCommon(data) { //插入数据元
                let param = {
                    mlngID: data.id
                }
                this.GetAllBymlngID(param).then(res => {
                    console.log(JSON.stringify(res.values[0]))
                    if (res.code == 1) {
                        let resultval = res.values[0]
                        let name = data.id + new Date().getTime()
                        let text = data.label
                        let cid = data.cid
                        let nType = 1;
                        if (this.instance) {
                            if (resultval["MASURIUM_TYPE"] == null || resultval["MASURIUM_TYPE"] == "") //类型
                            {} else {
                                nType = resultval["MASURIUM_TYPE"]
                            }
                            if (nType != 5) { //不为NumberBox
                                this.instance.insertNewControl(name, text, nType)
                            }
                            console.log('type', nType)
                            if (nType == 5) { //NumberBox 数字框,不能将名称直接填入
                                let maxvalue = resultval.MAX_VALUE; //最大值
                                let minvalue = resultval.MIN_VALUE; //最小值
                                let digits = resultval.DECIMAL_DIGITS; //小数位数
                                let strUnit = "";
                                if (resultval["UNIT"] == null || resultval["UNIT"] == '') //单位
                                {
                                    strUnit = "";
                                } else {
                                    strUnit = resultval["UNIT"];
                                }
                                this.instance.insertNewControl(name, minvalue, nType)
                                this.instance.setNumboxMaxValue(name, maxvalue); //设置Numbox的取值上限
                                this.instance.setNumboxMinValue(name, minvalue); //设置Numbox的取值下限
                                this.instance.setNumboxPrecision(name, digits); //设置Numbox的精度
                                this.instance.SetNumboxUnit(name, strUnit); //设置Numbox的单位
                            }
                            //'给控件的属性赋值
                            if (resultval["TOP_TITLE"] != null) //上方标题
                            {
                                this.instance.setControlProp(name, "HelpTip", resultval["TOP_TITLE"]);
                            }
                            if (resultval["MOST_LENGTH"] != null) //最大长度
                            {
                                this.instance.setTextBoxMaxLen(name, resultval["MOST_LENGTH"] == "" ? 0 : resultval["MOST_LENGTH"]);
                            }
                            if (resultval["LEFT_FRAME_CHAR"] != null) //左边框字符
                            {
                                this.instance.setControlProp(name, "EdgeStyle", resultval["LEFT_FRAME_CHAR"]);
                            }
                            if (resultval["RIGHT_FRAME_CHAR"] != null) //右边框字符
                            {
                                this.instance.setControlProp(name, "EdgeStyle2", resultval["RIGHT_FRAME_CHAR"]);
                            }
                            this.instance.setControlProp(name, "DelFlag", resultval["IF_DEL"] == "1" ? "TRUE" : "FALSE"); //是否允许删除:郁闷，false 为允许，true为不允许
                            this.instance.setControlProp(name, "EditProtect", resultval["IF_MOD"] == "1" ? "TRUE" : "FALSE"); //是否允许修改:郁闷，false 为允许，true为不允许
                            this.instance.setControlProp(name, "Edge", resultval["SHOW_FRAME"] == "0" ? "FALSE" : "TRUE"); //是否显示边框:正常
                            this.instance.setControlProp(name, "MustFillContent", resultval["IF_MUST"] == "0" ? "FALSE" : "TRUE"); //是否必须录入:正常
                            this.instance.setControlProp(name, "ViewSecret", resultval["IF_SECRCY_SCAN"] == "0" ? "FALSE" : "TRUE"); //是否保密浏览:正常
                            console.log('11111111',resultval["IF_SECRCY_SCAN"])
                            this.instance.setControlProp(name, "PlaceHolder", resultval["PLACEHOLDER"] == ""||resultval["PLACEHOLDER"] == null ? "" : resultval["PLACEHOLDER"]); //占位符:正常
                            this.instance.setControlProp(name, "IsCtrlHidden", resultval["IF_HIDE"] == "0" ? "FALSE" : "TRUE"); //是否隐藏显示:正常
                            console.log(resultval["IF_CREATE_XML"])
                            this.instance.setControlProp(name, "IsNotRecordInXML", resultval["IF_CREATE_XML"] == "0" ? "TRUE" : "FALSE"); //是否生产xml
                            if (nType == 6) //DateTimeBox
                            {
                                this.instance.setMultiDropdownControlSeparator(name, resultval["UNIT"]);
                            }
                            let lstrReserve = resultval["MASURIUM_ID"] //将该元素的ID作为保留值
                            if (nType == 8) { //DateTimeBox
                                let dataval = text
                                this.instance.insertNewControl(name, '', nType)
                                let maxDate = resultval.MOST_DATE //最大日期
                                if (maxDate != null || maxDate != '') {
                                    this.instance.setEndDateTime(name, "Date=" + moment(maxDate).format('YYYY-MM-DD'))
                                }
                                let minDate = resultval.LEAST_DATE //最小日期
                                if (minDate != null || minDate != '') {
                                    this.instance.setEndDateTime(name, "Date=" + moment(minDate).format('YYYY-MM-DD'))
                                }
                                let strFDate = 2 //设置指定指定名称日期框的显示格式
                                if (resultval.DATE_FORMAT != null || resultval.DATE_FORMAT != "") { //日期格式
                                    strFDate = resultval.DATE_FORMAT
                                }
                                this.instance.setDateTimeFormat(name, strFDate); //设置指定指定名称日期

                            }
                            if (nType == 1 || nType == 2 || nType == 6 || nType == 7) { //判断下拉框
                                console.log(this.treeSonData)
                                for (let index = 0; index < this.treeSonData.length; index++) {
                                    lstrReserve = lstrReserve + " " + this.treeSonData[index].label
                                    this.instance.setCompoundBoxCodeAndValue(
                                        name,
                                        this.treeSonData[index].label, '', nType < 3 ? nType : nType - 3
                                    ); //设置指定名称控件的Code和Value值
                                }

                            }
                            this.instance.setControlProp(name, "Reserve", lstrReserve); //设置NewControl 属性
                            this.instance.endUndo(); //记录属性设置的步骤，以便于一步撤销，类似于数据库的事务处理，StartUndo、EndUndo必须成对使用，否则可能导致Office崩溃
                            //cmd设置元素属性.Enabled = True

                        } else {
                            this.$message.error('找不到对象')
                        }
                    }
                })

            },
            insertDataGroupCommon(data) { //插入数据组
                let name = data.id + new Date().getTime()
                let text = data.label
                if (this.instance) {
                    if (this.instance.getAllSectionCount() > 0) {
                        //获取当前文档的所有节点名
                        const strSectionName = this.instance.getAllSection();
                        //将所有的节点名截取存到数组中
                        const strArray = strSectionName.split(',');
                        for (let i = 0; i < strArray.length; i++) {
                            if (typeof strArray[i].trim() != "undefined" || strArray[i].trim() != null || strArray[i].trim() != "") {
                                if (strArray[i].trim() == name) {
                                    this.$message.warning('不可插入相同节点！')
                                    return;
                                }
                            }
                        }
                    }
                    this.instance.insertSection(name, "");
                    //给控件的属性赋值dmin
                    this.instance.setSectionProp(name, "DelFlag", "FALSE"); //允许删除
                    this.instance.setSectionProp(name, "EditProtect", "FALSE"); //允许修改
                    this.instance.setSectionProp(name, "Edge", "TRUE"); //显示边框

                    const strleft = this.instance.getSectionProp(name, "EdgeStyle"); //获取左边框
                    const stright = this.instance.getSectionProp(name, "EdgeStyle2"); //获取右边框

                    this.instance.setSectionProp(name, "EdgeStyle", strleft); //显示左边框
                    this.instance.setSectionProp(name, "EdgeStyle2", stright); //显示右边框

                    this.instance.setSectionProp(name, "IsNotRecordInXML", "FALSE"); //不生成到XML文件中
                    this.instance.setSectionProp(name, "IsCtrlHidden", "FALSE"); //隐藏显示
                    this.instance.setSectionProp(name, "HelpTip", text.trim());

                    this.instance.setSectionProp(name, "PlaceHolder", ""); //占位符默认为空

                    this.instance.setSectionProp(name, "自定义属性", ""); //自定义属性默认为空

                    this.instance.setSectionName(name, name.trim());
                } else {
                    this.$message.error('找不到对象')
                }

            },
            handleGroupNodeClick(data) { //数组树点击
                this.dataGroupObj = data
            },
            handleGroupNodeDbClick() { //数组树双击
                let data = this.$refs.dataGroupTree.getCurrentNode()
                console.log(data)
                console.log(data.children)
                if (data.children != null) {
                    this.$message.warning('请双击末节点，否则不能插入元素！')
                    return
                }
                this.insertDataGroupCommon(data)

            },
            handleDataGroupInsert() { //数剧组插入
                let data = this.$refs.dataGroupTree.getCurrentNode() || {}
                console.log(this.$refs.dataGroupTree.getCurrentNode())
                if (Object.keys(data).length == 0) {
                    this.$message.warning('请选择要插入的元素!')
                    return
                }
                if (data.children != null) {
                    this.$message.warning('请双击末节点，否则不能插入元素！')
                    return
                }
                this.insertDataGroupCommon(data)
            },
            handleClick(tab, event) {
                // tabs切换事件
                this.outActiveName = tab.paneName
                if (tab.paneName == 'dataElement') { //数据元

                } else { //数据组
                    // this.getUserDataGroup()
                }
            },
            handleInnerClick(tab, event) { // tabs里层切换事件
                if (tab.paneName == 'userDefined') { //用户自定义
                    // this.getDataElementFatherNode()
                } else { //系统自定义

                }
            }
        }
    }
</script>
<style lang="scss" scoped>
    .subTplmanage-wordEdit {
        height: 100%;

        .leftTree {
            border: 1px solid #e6e6e6;
            height: 100%;
        }

        .word-content {
            height: 60vh;
            // border: 1px solid red;
        }

    }

    .self-card /deep/.el-card__body {
        padding: 10px 10px;
    }

    .self-card /deep/.el-tabs__nav .is-top {
        line-height: 30px;
        height: 30px;
    }

    .self-card /deep/.el-tabs__nav-prev,
    .self-card /deep/.el-tabs__nav-next {
        line-height: 2.8;
        height: 30px;
    }

    /deep/.el-tree--highlight-current {
        .el-tree-node.is-current {
            &>.el-tree-node__content {
                background-color: #44B3C7;
                color: white;
            }
        }
    }
</style>
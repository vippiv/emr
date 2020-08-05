<template>
    <!-- word编辑器 -->
    <div class="activeXHandlerTempl">
        <div class="btnimg-box">
            <div class="handler-item" @click="handleSaveDoc" v-if="btnState">
                <img :src="imgBtnSet.saveBtn" class="img-btn">
                <el-dropdown>
                    <el-button type="text">保存模板</el-button>
                    <el-dropdown-menu slot="dropdown"></el-dropdown-menu>
                </el-dropdown>
            </div>
            <div class="handler-item" @click="handleSavexml">
                <img :src="imgBtnSet.saveBtn" class="img-btn">
                <el-dropdown>
                    <el-button type="text">存为XML</el-button>
                    <el-dropdown-menu slot="dropdown"></el-dropdown-menu>
                </el-dropdown>
            </div>
            <div class="handler-item">
                <img :src="imgBtnSet.printBtn" class="img-btn">
                <el-dropdown @visible-change="handleVisibleChange" @command="handleInsertCommand">
                    <el-button type="text">打印<i class="el-icon-arrow-down el-icon--right"></i></el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="print">打印</el-dropdown-item>
                        <el-dropdown-item command="continuePrint">按行续打</el-dropdown-item>
                        <el-dropdown-item command="choosePrint">选择续打</el-dropdown-item>
                        <el-dropdown-item command="printPreview">打印预览</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
            <div class="handler-item" v-if="btnState">
                <img :src="imgBtnSet.insertBtn" class="img-btn">
                <el-dropdown @visible-change="handleVisibleChange" @command="handleInsertCommand">
                    <el-button type="text">插入<i class="el-icon-arrow-down el-icon--right"></i></el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="ventorImg">插入矢量图</el-dropdown-item>
                        <el-dropdown-item command="table">插入表格</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
            <div class="handler-item" @click="handleProtection">
                <img :src="imgBtnSet.delBtn" class="img-btn">
                <el-dropdown>
                    <el-button type="text">区域保护</el-button>
                    <el-dropdown-menu slot="dropdown"></el-dropdown-menu>
                </el-dropdown>
            </div>
            <div class="handler-item" @click="handleDelRegion">
                <img :src="imgBtnSet.delBtn" class="img-btn">
                <el-dropdown>
                    <el-button type="text">删除区域</el-button>
                    <el-dropdown-menu slot="dropdown"></el-dropdown-menu>
                </el-dropdown>
            </div>
            <div class="handler-item" @click="handleSaveAsPersonal">
                <img :src="imgBtnSet.saveTplBtn" class="img-btn">
                <el-dropdown>
                    <el-button type="text">存入个人模板</el-button>
                    <el-dropdown-menu slot="dropdown"></el-dropdown-menu>
                </el-dropdown>
            </div>
            <div class="handler-item" @click="handleShowDataBg(handleShow=!handleShow)">
                <img :src="imgBtnSet.saveTplBtn" class="img-btn">
                <el-dropdown>
                    <el-button type="text">{{bgColor+'显示数据元背景色'}}</el-button>
                    <el-dropdown-menu slot="dropdown"></el-dropdown-menu>
                </el-dropdown>
            </div>
            <div class="handler-item">
                <img :src="imgBtnSet.writeBtn" class="img-btn">
                <el-dropdown @visible-change="handleVisibleChange" @command="handleInsertCommand">
                    <el-button type="text">浏览模式<i class="el-icon-arrow-down el-icon--right"></i></el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="writeMode">书写模式</el-dropdown-item>
                        <el-dropdown-item command="unCleaningMode">非清洁浏览</el-dropdown-item>
                        <el-dropdown-item command="cleaningMode">清洁浏览</el-dropdown-item>
                        <el-dropdown-item command="secretMode">保密浏览</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
            <div class="handler-item" @click="handleDiagnosis" v-if="isUse">
                <img :src="imgBtnSet.diagnosisBtn" class="img-btn">
                <el-dropdown>
                    <el-button type="text">诊断</el-button>
                    <el-dropdown-menu slot="dropdown"></el-dropdown-menu>
                </el-dropdown>
            </div>
            <div class="handler-item" @click="handleCopy">
                <img :src="imgBtnSet.diagnosisBtn" class="img-btn">
                <el-dropdown>
                    <el-button type="text">粘贴</el-button>
                    <el-dropdown-menu slot="dropdown"></el-dropdown-menu>
                </el-dropdown>
            </div>
            <div class="handler-item" @click="handleBackMain">
                <img :src="imgBtnSet.backBtn" class="img-btn">
                <el-button type="text">返回</el-button>
            </div>
        </div>
        <div style="display:flex;">
            <div style="border:1px solid #eee;flex:1;">
                <object classid="clsid:43C3EF10-8FE6-45CD-A65B-1792FD3FB9DE" id="diaObj" codebase="NsoOffice.dll" width="100%" :height="objectHeight"></object>
            </div>
            <!-- <div style="border:1px solid #eee;flex:0 0 290px;margin-left:10px;">右边</div> -->
        </div>
        <!-- <el-row>
            <el-col :span="20" style="border:1px solid #eee;height:1000px;">内容</el-col>
            <el-col :span="4" style="border:1px solid #eee">右边</el-col>
        </el-row> -->
        <iframe class="cover-object1" v-show="iframeShow"></iframe>
        <!-- 存入个人模板 -->
        <subTplSavePersonTpl :show='show' v-if="show" @closeperson='handleCosePerson' v-bind="$attrs"></subTplSavePersonTpl>
        <!-- 诊断 -->
        <subTplManageDagnosisD :show='diseaseDiagnosisDiaVis' v-if="diseaseDiagnosisDiaVis" @closedailogs='handleclosedailogs'></subTplManageDagnosisD>
        <!-- 打印参数设置 -->
        <subTplManagePrintDailog :show="isprintshow" v-if="isprintshow" @closeprindailog='handlecloseprint' @handleprinting='handleprinting'></subTplManagePrintDailog>
        <!-- 插入失量图 -->
        <insertVectorGraph :insertVectorGraphDiaVis="insertVectorGraphDiaVis" @actionInsertVectorGraph="actionInsertVectorGraph"></insertVectorGraph>
    </div>
</template>

<script>
    import * as originAction from 'vuex'
    const {
        mapActions
    } = originAction.createNamespacedHelpers('residentDoctor')
    import handleActiveX from '@/utils/activeX'
    import saveBtn from '@/assets/images/imgbtn/save.png'
    import insertBtn from '@/assets/images/imgbtn/insert.png'
    import printBtn from '@/assets/images/imgbtn/print.png'
    import saveTplBtn from '@/assets/images/imgbtn/savetpl.png'
    import applyDataBtn from '@/assets/images/imgbtn/applydata.png'
    import importBtn from '@/assets/images/imgbtn/import.png'
    import delBtn from '@/assets/images/imgbtn/del.png'
    import writeBtn from '@/assets/images/imgbtn/write.png'
    import syncBtn from '@/assets/images/imgbtn/sync.png'
    import diagnosisBtn from '@/assets/images/imgbtn/diagnosis.png'
    import operationBtn from '@/assets/images/imgbtn/operation.png'
    import backBtn from '@/assets/images/imgbtn/back.png'
    import updateBtn from '@/assets/images/imgbtn/update.png'
    import subTplSavePersonTpl from '@/views/residentDoctor/components/subTplSavePersonTpl'
    import subTplManageDagnosisD from '@/views/residentDoctor/components/subTplManageDagnosisD'
    import subTplManagePrintDailog from '@/views/residentDoctor/components/subTplManagePrintDailog'
    import insertVectorGraph from '@/views/residentDoctor/respiratory/components/components/insertVectorGraph'
    export default {
        name: 'activeXHandlerTempl',
        components: {
            subTplSavePersonTpl,
            subTplManageDagnosisD,
            subTplManagePrintDailog,
            insertVectorGraph
        },
        data() {
            return {
                insertVectorGraphDiaVis: false,
                btnState: false,
                isprintshow: false,
                isUse: false,
                handleShow: true,
                bgColor: '',
                iframeShow: false,
                iframe: null,
                diseaseDiagnosisDiaVis: false,
                show: false,
                imgBtnSet: {
                    saveBtn,
                    insertBtn,
                    printBtn,
                    saveTplBtn,
                    applyDataBtn,
                    importBtn,
                    delBtn,
                    writeBtn,
                    syncBtn,
                    diagnosisBtn,
                    operationBtn,
                    backBtn,
                    updateBtn,
                    objectHeight: 0,
                    instance: null // handleActiveX对象实例
                },
                printObj: {}
            }
        },
        created() {
            this.objectHeight = (document.documentElement.clientHeight - 190) + 'px'
        },
        // watch: {
        //     isModify: {
        //         handler(val) {
        //             if (val && this.$attrs.isHandleDocCode == 1) { //锁定
        //                 setLockDoc(this.$attrs.currentTableData.MR_CODE)
        //             }
        //         },
        //         immediate: true
        //     }
        // },
        computed: {
            ...originAction.mapState({
                departmentId: state => state.global.deptID
            })
        },
        mounted() {
            if (this.$attrs.wordcode == 2) { //设置按钮显示隐藏
                this.btnState = true
            } else {
                this.btnState = false
            }

            function ActiveXFactory(obj) {
                this.init(obj)
            }
            ActiveXFactory.prototype = Object.create(handleActiveX)
            const diaObj = document.getElementById('diaObj')
            this.instance = new ActiveXFactory(diaObj)
            this.$emit('getObjectHandle', this.instance)
            this.initTabEvt()
            this.iframe = document.getElementsByClassName('cover-object1')[0]
        },
        methods: {
            ...originAction.mapActions([
                'GET_DOC_FILE',
                'SetLockDoc',
                'SetUnlockDoc'
            ]),
            ...mapActions(['SaveTempLate', 'UploadFileStream']),
            actionInsertVectorGraph() {

            },
            setLockDoc(param) { //锁定文档
                let data = {
                    Mr_Code: param
                }
                this.SetLockDoc(data).then(res => {
                    console.log(res)
                })
            },
            handleprinting() {
                this.handleIframeMask(false)
                this.instance.printDocByLine(true, this.printObj.printnumber, this.printObj.printnumber, this.printObj.startpagenumber, this.printObj.startlinenumber, this.printObj.endpagenumber, this.printObj.endlinenumber)
            },
            handlecloseprint(val) {
                this.isprintshow = false
                this.printObj = val
                this.handleIframeMask(false)
            },
            async getOdtFile(filePath) {
                let fileName = filePath.fileName
                let areaName = filePath.areaName
                let templateType = filePath.templateType
                const res = await this.GET_DOC_FILE({
                    fileName,
                    areaName,
                    templateType
                })
                return res
            },
            initTabEvt() {
                let fileObj = {
                    fileName: this.$attrs.currentTableData.MR_CODE + '.odt', //文件名
                    areaName: this.$attrs.currentTableData.MR_PATH, //路径
                    templateType: 1
                }
                this.getOdtFile(fileObj).then((res) => {
                    // 根据后台code状态决定是否要打开新标签页
                    if (res.code === 1) {
                        this.handleOpenDoc(res.values)
                    } else {
                        this.$message.warning(res.values)
                    }
                })
            },
            handleOpenDoc(index) {
                try {
                    setTimeout(() => {
                        this.instance.openDocWidthString(index, 2) // 以读写方式打开
                    }, 500)
                } catch (e) {
                    console.log(e)
                }
            },
            handleclosedailogs(val) {
                this.diseaseDiagnosisDiaVis = val
            },
            handleCosePerson(val) {
                this.show = val
                this.handleIframeMask(false)
            },
            handleSaveDoc() { //保存模板
                if (this.instance) {
                    let param = {
                        streamStr: this.instance.saveToString(), //类型的文件流
                        deptID: this.$attrs.currentTableData.DEPT_ID, //科室ID
                        mr_code: this.$attrs.currentTableData.MR_CODE, //:模板代码
                        list_code: this.$attrs.currentTableData.LIST_CODE, //模板分类ID
                        visitId: '', //病历书写文件上传，文件夹名称为病人ID 
                        filetype: this.$attrs.templateType, //0-科室（或个人）模板，1：分类模板，2-病人病历
                        filepath: this.$attrs.currentTableData.MR_PATH, //类型的文件流
                        isUpdate: 1, //0（新增），1（更新）
                        updateFileName: this.$attrs.currentTableData.MR_CODE //更新原文件名
                    }
                    console.log('param', param)
                    this.UploadFileStream(param).then(res => {
                        console.log(res.code)
                        if (res.code == 1) {
                            this.savetempApi()
                        }

                    })

                } else {
                    this.$message.error('找不到instance对象')
                }
            },
            savetempApi() {
                let data = {
                    mr_Code: this.$attrs.currentTableData.MR_CODE,
                    MR_Name: encodeURI(this.$attrs.tplName.trim())
                }
                console.log(JSON.stringify(data))
                this.SaveTempLate(data).then(res => {
                    console.log(res)
                    if (res.code == 1) {
                        this.$message.success(res.msg)
                        this.setUnlockDoc(this.$attrs.currentTableData.MR_CODE)
                    } else {
                        this.$message.error(res.msg)
                    }
                })
            },
            setUnlockDoc(param) { //解锁文档
                let data = {
                    Mr_Code: param
                }
                this.SetUnlockDoc(data).then(res => {

                })
            },
            handleSavexml() { //存为XML
                let content = this.instance.getStructXml("AllUserProp_CS2C", "AllUserProp_CS2C", "", "IncludeRegion", "");
                console.log('text', content)
                var xmlDoc = null;
                if (window.ActiveXObject) {
                    xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
                    xmlDoc.Run("\"" + filename + "\"", 1, false);
                    xmlDoc.async = "false"
                    xmlDoc.load(content);
                }

                // let fso = new ActiveXObject("scripting.FileSystemObject");
                // let path = "D:\\temp\\";

                // if (!fso.FolderExists(path)) { // 若当前路径不存在，则创建此路径。
                //     fso.CreateFolder(path);
                // }
                // path += "test.xml"; // 创建文档的路径。
                // let tf = fso.CreateTextFile(path, true); // 创建新文件。
                // tf.WriteLine(content)
                // tf.Close();

                this.export_raw('123', content)
            },
            fake_click(obj) {
                var ev = document.createEvent("MouseEvents");
                ev.initMouseEvent(
                    "click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null
                );
                obj.dispatchEvent(ev);
            },
            export_raw(name, data) {
                var urlObject = window.URL || window.webkitURL || window;

                var export_blob = new Blob([data]);

                var save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a")
                save_link.href = urlObject.createObjectURL(export_blob);
                save_link.download = name;
                this.fake_click(save_link);
            },
            // 设置iframe，object层级过高无法设置
            handleVisibleChange(val) {
                this.iframeShow = val
                if (!val) {
                    return
                }
                this.iframe = document.getElementsByClassName('cover-object1')[0]
                const elDropdownMenu = document.getElementsByClassName('el-dropdown-menu')
                let ele = null
                setTimeout(() => {
                    for (let i = 0; i < elDropdownMenu.length; i++) {
                        if (elDropdownMenu[i].getAttribute('x-placement')) {
                            ele = elDropdownMenu[i]
                            this.iframe.style.left = `${ele.offsetLeft}px`
                            this.iframe.style.top = `${ele.offsetTop}px`
                            this.iframe.style.width = `${ele.offsetWidth}px`
                            this.iframe.style.height = `${ele.offsetHeight}px`
                            console.log(this.iframe.style.left)
                        }
                    }
                }, 200)
            },
            // 设置iframe全屏，否则弹窗mask无法覆盖object
            handleIframeMask(val) {
                setTimeout(() => {
                    this.iframeShow = val
                    this.iframe = document.getElementsByClassName('cover-object1')[0]
                    this.iframe.style.left = `0px`
                    this.iframe.style.top = `0px`
                    this.iframe.style.width = `100vw`
                    this.iframe.style.height = `100vh`
                }, 200)
            },
            handleInsertCommand(command) {
                switch (command) {
                    case 'table':
                        this.instance.insertTable("Table", 3, 2)
                        break
                    case 'ventorImg':
                        this.handleIframeMask(true)
                        this.insertVectorGraphDiaVis = true
                        break
                    case 'print':
                        this.instance.printDoc()
                        break
                    case 'continuePrint':
                        // TODO 这里的参数需要配置
                        this.isprintshow = true
                        this.handleIframeMask(true)
                        // this.instance.printDocByLine(true, this.printObj.this.printObj.printnumber, this.printObj.printnumber, this.printObj.startpagenumber, this.printObj.startlinenumber, this.printObj.endpagenumber, this.printObj.endlinenumber)
                        break
                    case 'choosePrint': //选择续打
                        var r = confirm("续打时要包含页眉信息?");
                        if (r == true) {
                            this.instance.previewDocBySelect2(true)
                        } else {
                            this.instance.previewDocBySelect2(false)
                        }
                        break
                    case 'printPreview':
                        var r = confirm("要在预览的文档中显示行号吗?");
                        if (r == true) {
                            this.instance.printPreview()
                        } else {
                            this.instance.printPreview(0)
                        }
                        break
                    case 'writeMode':
                        this.writingMode = 'writing'
                        this.handleIframeMask(false)
                        this.instance.setDocMode('writing')
                        Evtbus.$emit('updateDocWriteMode', this.writingMode)
                        break
                    case 'unCleaningMode':
                        this.writingMode = 'unCleaning'
                        this.handleIframeMask(false)
                        this.instance.setDocMode('unCleaning')
                        Evtbus.$emit('updateDocWriteMode', this.writingMode)
                        break
                    case 'cleaningMode':
                        this.writingMode = 'cleaning'
                        this.handleIframeMask(false)
                        this.instance.setDocMode('cleaning')
                        Evtbus.$emit('updateDocWriteMode', this.writingMode)
                        break
                    case 'secretMode':
                        this.writingMode = 'secretary'
                        this.handleIframeMask(false)
                        this.instance.setDocMode('secretary')
                        Evtbus.$emit('updateDocWriteMode', this.writingMode)
                        break
                    default:
                        break
                }

            },
            handleProtection() { //区域保护
                let a = ''
                if (this.instance) {
                    if (this.instance.getSelectText() != "") {
                        a = this.instance.insertProtectArea("a");
                    }
                    if (a == "") {
                        if (this.instance.getCurrentProtectAreaName() != "") //判断当前光标处是不是已经被保护的
                        {
                            let sProtectArea = this.instance.getProtectAreaText(this.instance.getCurrentProtectAreaName()); //获取保护区域文本
                            this.instance.deleteProtectArea(this.instance.getCurrentProtectAreaName()); //删除此保护区域，没找到取消保护的方法
                            this.instance.insertTextAtCurrentCursor(sProtectArea);
                        }
                    }
                } else {
                    this.$message.error('找不到instance对象')
                }


            },
            handleDelRegion() { //删除区域
                const region = this.instance.getCurrentRegion()
                if (!region) {
                    this.$message.error('请先选择要删除的区域')
                    return
                }
                this.iframeShow = true
                this.iframe = document.getElementsByClassName('cover-object1')[0]
                setTimeout(() => {
                    this.iframe.style.left = `0px`
                    this.iframe.style.top = `0px`
                    this.iframe.style.width = `100vw`
                    this.iframe.style.height = `100vh`
                }, 200)
                this.$confirm('确定要删除该区域吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(() => {
                    this.instance.delRegion(region, 3)
                    this.iframeShow = false
                }).catch(() => {
                    this.iframeShow = false
                })
            },
            handleSaveAsPersonal() { //存入个人模板
                this.handleIframeMask(true)
                this.show = true
            },
            handleShowDataBg() { //显示数据元背景颜色
                this.bgColor = this.handleShow ? '' : '不'
                const ctrlNames = this.instance.getAllNewControl().split(',');

                if (this.bgColor == '不') {
                    // this.bgColor = '不'
                    this.instance.setAllNewCtrlBGColor2(true, false);

                    for (let i = 0; i < ctrlNames.length; i++) {
                        this.instance.setControlProp(ctrlNames[i], "Edge", "FALSE");

                    }
                } else {
                    // this.bgColor = '';
                    this.instance.setAllNewCtrlBGColor(false);

                    for (let i = 0; i < ctrlNames.length; i++) {
                        this.instance.setControlProp(ctrlNames[i], "Edge", "FALSE");
                    }
                }
            },
            handleDiagnosis() { //诊断
                this.diseaseDiagnosisDiaVis = true
            },
            handleCopy() { //粘贴
                this.instance.protectDoc(false);
                this.instance.enableCopyFromExternal(true);
                this.instance.setText(clipboardData.getData('Text'), 0);
            },
            handleBackMain() { //返回
                this.getDocIsModifed()
            },
            getDocIsModifed() {
                if (!!window.ActiveXObject || "ActiveXObject" in window) { //IE浏览器
                    let isModify = this.instance.tools.docHasChanged()
                    if (isModify) {
                        // 当文档保存后这里会导致标题中再次出现*号
                        this.handleIframeMask(true)
                        this.$confirm('该文档已经被修改过且未被保存，真的要关闭吗?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.$parent.handleClose()
                            this.handleIframeMask(false)
                        }).catch(() => {
                            this.handleIframeMask(false)
                        })
                    } else {
                        this.$parent.handleClose()
                    }
                } else { //非ie
                    this.$parent.handleClose()
                }
                // var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
                // var isIE = userAgent.indexOf("compatible") > -1 &&
                //     userAgent.indexOf("MSIE") > -1; //判断是否IE浏览器
                // console.log('浏览器', isIE)
                // console.log('userAgent', userAgent)

            },

        },
        destroy() {
            this.instance = null
        }
    }
</script>
<style lang="scss" scoped>
    .activeXHandlerTempl {
        .btnimg-box {
            border: 1px solid #EBEEF5;
            margin-bottom: 5px;
            padding-left: 5px;

            .handler-item {
                display: inline-block;
                margin-right: 15px;
            }

            .img-btn {
                width: 25px;
                margin-right: 5px;
            }

            /deep/ .el-dropdown {
                padding-top: 5px;
                padding-bottom: 5px;
            }
        }

        .cover-object1 {
            position: fixed;
            width: 0;
            height: 0;
            left: 0px;
            top: 0px;
            z-index: 11;
        }


    }
</style>
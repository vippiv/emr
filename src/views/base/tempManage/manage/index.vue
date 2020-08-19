<template>
    <div class="temp-manage-manage">
        <!-- 修改栏 -->
        <el-container style="height: 100%;">
            <!-- 树形结构 -->
            <el-aside width="236px" style="height: 100%; border: 1px solid #ccc;background-color:white;">
                <el-row :gutter="16" class="gen1">
                    <el-col :span="16">
                        <el-input size="mini" placeholder="输入关键字进行查询" v-model="doctorName"></el-input>
                    </el-col>
                    <el-col :span="4">
                        <el-button type="primary" size="mini" @click="handleSearch">查询</el-button>
                    </el-col>
                </el-row>
                <el-row class="tpls-container">
                    <el-tree :data="treeData" :props="defaultProps" :filter-node-method="filterNode" @node-click="handleNodeClick" @node-contextmenu="handleRightClick" highlight-current node-key="id" ref="tempTree"></el-tree>
                    <!-- 右击菜单 -->
                    <div v-show="menuVisible" class="context-menu" @mouseleave="menuVisible=!menuVisible">
                        <ul id="menu">
                            <li tabindex="-1" class="menu__item" @click="() => handleCreatEle(nodeData)">
                                <img class="icon" :src="createIcon">
                                <el-link type="primary" :underline="false">添加</el-link>
                            </li>
                            <li v-show="linkVisible" tabindex="-1" class="menu__item" @click="() =>handleEditEle(nodeData)">
                                <img class="icon" :src="insertIcon">
                                <el-link type="primary" :underline="false">修改</el-link>
                            </li>
                            <li v-show="linkVisible" tabindex="-1" class="menu__item" @click="() =>handleCreateNew(nodeData)">
                                <img class="icon" :src="deleteIcon">
                                <el-link type="primary" :underline="false">删除</el-link>
                            </li>
                        </ul>
                    </div>
                </el-row>
            </el-aside>
            <!-- 模板展示列表 -->
            <el-main>
                <div class="gen">
                    <!-- <ckImgBtn icon="ck-imgicon-sort">排序</ckImgBtn> -->
                    <ckImgBtn class="imgBtn-item" icon="ck-imgicon-add" @click="handleAddClicFn">新增模板</ckImgBtn>
                    <ckImgBtn class="imgBtn-item" icon="ck-imgicon-delete" @click="handleDeleteClicFn">删除模板</ckImgBtn>
                    <ckImgBtn class="imgBtn-item" icon="ck-imgicon-write" v-if="isUse">编辑模板</ckImgBtn>
                    <ckImgBtn class="imgBtn-item" icon="ck-imgicon-audit" @click="handleCheckClicFn" :disabled="isdisabledFn">审核模板</ckImgBtn>
                    <ckImgBtn class="imgBtn-item" icon="ck-imgicon-cancelAudit" @click="handleCancelClicFn">取消审核</ckImgBtn>
                    <ckImgBtn class="imgBtn-item" icon="ck-imgicon-remove" @click="handleCopyClicFn" v-if="isUse">移动模板</ckImgBtn>
                    <ckImgBtn class="imgBtn-item" icon="ck-imgicon-copy" @click="handleMoveClicFn">复制模板</ckImgBtn>
                </div>
                <el-header style=" font-size: 12px">
                    <el-form :inline="true" class="demo-form-inline" style="margin-top: 9px;">
                        <el-form-item label="模板名称：">
                            <el-input v-model="tplName" size="mini"></el-input>
                        </el-form-item>
                        <el-form-item label>
                            <el-checkbox-group v-model="tplTypeChecked" @change="checkChange" :min="1">
                                <el-checkbox label="ty">通用模板</el-checkbox>
                                <el-checkbox label="man">男性模板</el-checkbox>
                                <el-checkbox label="woman">女性模板</el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="infoSelect()" plain type="primary" size="small">模糊查询</el-button>
                            <el-button @click="handleClicFn()" plain type="primary" size="small">模板排序</el-button>
                            <el-button @click="toggleSelection(tableData)" plain type="primary" size="small">全选</el-button>
                        </el-form-item>
                    </el-form>
                </el-header>
                <el-table ref="multipleTable" class="mb220" :data="tableData" tooltip-effect="dark" border style="width: 100%" height="calc(100vh - 304px)" @selection-change="handleSelectionChange" @row-dblclick="handleOpenWordEdit">
                    <el-table-column fixed type="selection" width="55"></el-table-column>
                    <el-table-column prop="MR_NAME" label="模板名称" align="center"></el-table-column>
                    <el-table-column prop="LIST_NAME" label="所属分类" align="center"></el-table-column>
                    <el-table-column prop="ITEM_FLAG_NAME" label="签审状态" align="center"></el-table-column>
                    <el-table-column prop="SINGLE_Value" label="是否多份" align="center"></el-table-column>
                    <el-table-column prop="SEX_Value" label="适应性别" align="center"></el-table-column>
                    <el-table-column prop="MUST_Value" label="是否必须" align="center"></el-table-column>
                    <el-table-column label="修改时间" align="center">
                        <template slot-scope="scope">{{scope.row.LAST_MODIFY_DATE_TIME | momentFilter}}</template>
                    </el-table-column>
                    <el-table-column prop="MR_PATH" label="模板路径" align="center"></el-table-column>
                    <el-table-column align="center" label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" size="mini" @click="handleEdit(scope.row)">修改</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-main>
            <ckPagination :currentPage="pageNos" :total="total" class="fix-width" @_pageSizeChange="pageSizeChange" @_currentPageChange="currentPageChange"></ckPagination>
        </el-container>
        <!-- 排序弹窗 -->
        <el-dialog title="模板排序" :visible.sync="dialogVisible" width="489px" height="500px" :before-close="handlePClose" :close-on-click-modal="false">
            <el-row>
                <el-col :span="9">
                    <div class="main">
                        <ul class="ul">
                            <li :class="[item.flag?'bgclass':'']" @click="handleitem(item)" v-for="item in syData" :key="item.MR_CODE">{{item.MR_NAME}}</li>
                        </ul>
                    </div>
                </el-col>
                <el-col :span="3" :offset="9" class="gen2">
                    <el-button type="primary" @click="moveup" size="mini">向上</el-button>
                    <el-row>
                        <el-button type="primary" @click="movedown" size="mini">向下</el-button>
                    </el-row>
                    <el-row>
                        <el-button type="primary" @click="saveTemp" size="mini">保存</el-button>
                    </el-row>
                </el-col>
            </el-row>
        </el-dialog>
        <!-- 新增/修改模板弹窗 -->
        <el-dialog title="模板属性" :visible.sync="dialogAddVisible" width="550px" center :before-close="handleClose" :close-on-click-modal="false">
            <el-form ref="form" :model="form" :rules="rules" label-width="90px" label-position="left" size="small">
                <el-form-item label="模板名称" prop="mname">
                    <el-input size="mini" v-model="form.mname"></el-input>
                </el-form-item>
                <el-form-item label="所属业务域">
                    <el-select v-model="value" size="mini" style="width:100%" @change="selectChange()">
                        <el-option v-for="item in options" :key="item.LIST_CODE" :label="item.LIST_NAME" :value="item.LIST_CODE"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="存储表" prop="sheet" v-if="isbook">
                    <el-input size="mini" v-model="form.sheet"></el-input>
                </el-form-item>
                <div class="tempManage" style="text-align:center">
                    <p>模板类别</p>
                    <el-form-item prop="radioTpl">
                        <el-radio-group v-model="form.radioTpl" style="padding-right:66px; margin-bottom:-24px">
                            <el-radio :label="2">通用模板</el-radio>
                            <el-radio :label="1">男性模板</el-radio>
                            <el-radio :label="0">女性模板</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </div>
                <div class="gen3">
                    <el-form-item label="备注" prop="desc">
                        <el-row style="padding-top:7px">
                            <el-input :rows="4" placeholder="请输入内容" type="textarea" v-model="form.desc"></el-input>
                        </el-row>
                    </el-form-item>
                    <el-form-item prop="resource">
                        <el-row>
                            <el-col :span="8" :offset="16">
                                <el-radio-group v-model="form.resource">
                                    <el-radio label="1">中医</el-radio>
                                    <el-radio label="0">西医</el-radio>
                                </el-radio-group>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item>
                        <el-row :gutter="6">
                            <el-col :span="8">
                                <el-form-item prop="checkedSingle">
                                    <el-checkbox v-model="form.checkedSingle">是否多份</el-checkbox>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item prop="checkedArea">
                                    <el-checkbox v-model="form.checkedArea">是否区域打开</el-checkbox>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item prop="checked">
                                    <el-checkbox v-model="form.checked">是否医务科签字</el-checkbox>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form-item>
                </div>
                <el-form size="small">
                    <fieldset style="border:1px solid #dcdfe6;border-radius:5px;padding:0px 10px;">
                        <legend>模板、科室</legend>
                        <el-form-item>
                            <el-radio-group v-model="form.tplChecked">
                                <el-radio label="MA" disabled>标准模板</el-radio>
                                <el-radio label="MB" disabled>专科模板</el-radio>
                                <el-radio label="MC" disabled>个人模板</el-radio>
                                <el-radio label="MZ" disabled>门诊模板</el-radio>
                                <el-radio label="MS" disabled>科室</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-row style="text-align:right">
                            <el-form-item prop="selected">
                                <el-select v-model="form.selected" size="mini">
                                    <el-option v-for="item in kstions" :key="item.DEPT_ID" :label="item.SHORT_CODE" :value="item.DEPT_ID"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-row>
                    </fieldset>
                </el-form>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleAdd('form')" size="mini">保存</el-button>
                <el-button type="primary" @click="closeAdd()" size="mini">退出</el-button>
            </span>
        </el-dialog>
        <!-- 左边节点新增修改弹窗 -->
        <el-dialog title="类别" :visible.sync="dialogFormVisible" custom-class="customClass" :before-close="tempDialoClose" :close-on-click-modal="false">
            <el-form :model="leftNodeform">
                <el-form-item label="上级名称:" :label-width="formLabelWidth">
                    <el-input :disabled="inputVisible" v-model="leftNodeform.upName" autocomplete="off" size="mini" style="width:76%"></el-input>
                </el-form-item>
                <el-form-item label="名称:" :label-width="formLabelWidth">
                    <el-input v-model="leftNodeform.tempName" autocomplete="off" size="mini" style="width:76%"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" style="text-align:center">
                <el-button @click="dialogFormVisible = false" size="mini">取 消</el-button>
                <el-button type="primary" @click="addTempForm" size="mini">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 移动复制的窗口 -->
        <el-dialog :title="copyTitle" :visible.sync="dialogMoveVisible" width="417px" height="652px" :before-close="moveDialoClose" :close-on-click-modal="false">
            <p>请选择要操作列表名</p>
            <el-form :model="moveNodeform" style="height: 500px; border: 1px solid #ccc; overflow-y: auto;">
                <el-form-item label>
                    <el-tree :data="treeMovedata" :props="defaultProps" @node-click="handleMoveNodeClick" highlight-current ref="tempCopyTree"></el-tree>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" style="text-align:center">
                <el-button @click="dialogMoveVisible = false" size="mini">取 消</el-button>
                <el-button type="primary" @click="moveTempForm" size="mini">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 编辑打开word -->
        <subTplManageWordEdit :wordcode="wordcode" :dialogSortVisible="wordshow" v-if="wordshow" :currentTableData="currentTableData" @closeSubTplWord='handlecloseSubTplWord'></subTplManageWordEdit>
    </div>
</template>

<script type="text/javascript">
    import * as urls from '@/router/routePath'
    import {
        mapState
    } from 'vuex'
    import {
        mapActions
    } from 'vuex'
    import moment from 'moment'
    import subTplManageWordEdit from './subTplManageWordEdit'
    import insertIcon from '@/assets/images/icon/insert.png'
    import createIcon from '@/assets/images/icon/create.png'
    import deleteIcon from '@/assets/images/icon/delete.png'

    export default {
        name: 'tempManageManage',
        components: {
            subTplManageWordEdit
        },
        data() {
            return {
                insertIcon,
                createIcon,
                deleteIcon,
                currentTableData: null,
                wordcode: '',
                wordshow: false, //控制word编辑组件显示/隐藏
                currentNodekey: '',
                urls,
                usersId: '',
                isUse: false,
                // 移动模板
                copyTitle: '',
                isCopy: true,
                // 复制模板
                obj: {},
                treeMovedata: [],
                dialogMoveVisible: false,
                moveNodeform: {},
                isAdd: false,
                // 左边树节点添加
                leftNodeform: {
                    upName: '',
                    tempName: ''
                },
                objNode: {},
                inputVisible: true,
                formLabelWidth: '80px',
                dialogFormVisible: false,
                linkVisible: false,
                menuVisible: false,
                nodeData: {},

                // 删除
                syData: [],
                searchCheckedNode: [],
                searchCheckedNodeIndex: -1,
                doctorName: '',
                oldDoctorName: '',
                tplName: '', // 模板名称
                checkedTempTree: [],
                // 分页
                hasName: '',
                hasInfo: false,
                pageSize: 20,
                pageNos: 1,
                total: 0,
                // 新增弹窗
                koko: '',
                placeholder: '',
                options: [],
                kstions: [],
                dialogAddVisible: false,
                value: '',
                isbook: false,
                form: {
                    sheet: '',
                    mname: '',
                    checkedSingle: false,
                    checked: false,
                    checkedArea: false,
                    assion: '',
                    selected: '',
                    tplChecked: ['MA', 'MB', 'MC', 'MZ', 'MS'],
                    desc: '',
                    radioTpl: 2,
                    name: '',
                    resource: ''
                },
                rules: {
                    mname: [{
                        required: true,
                        message: '请输入模板名称',
                        trigger: 'blur'
                    }, ]
                },
                // 审核
                isdisabledFn: false,
                // 修改弹窗
                tpck: '',
                fenlei: '',
                xiuCode: '',
                xiuDate: '',

                // 排序弹窗
                dialogVisible: false,
                treeData: [],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                tableData: [],
                multipleSelection: [],
                tplTypeChecked: ['ty', 'woman', 'man'],
                currentTreeNode: null,
                // 向上功能
                issyData: [],
                dataIndex: 0,
                currenttwdData: null
            }
        },
        filters: {
            momentFilter: function(value) {
                if (!value) return ''
                return moment(value).format('YYYY-MM-DD HH:mm')
            }
        },
        created() {
            this.get_GetSyInformation()
        },
        // watch: {
        //     currentNodekey(val) {
        //         if (val) {
        //             console.log(this.currentNodekey)
        //             this.$refs.tempTree.setCurrentKey([this.currentNodekey])
        //         }
        //     }
        // },
        computed: {
            ...mapState({
                loginUserId: state => state.global.userInfo,
                workStationID: state => state.global.workStationID,
                workBenchID: state => state.global.workBenchID
            })
        },
        methods: {
            ...mapActions([
                'GETDELETESYS',
                'GETSYSWORK',
                'GETSESSIONRESULT',
                'GET_DATAMANAGEITEM',
                'GET_DATAMANAGEFATHER',
                'GET_DATA_MANAGE_LIST',
                'GET_FAINFOLISTBYSELECT',
                'GET_RANK',
                'GET_BUSINESS',
                'BTN_RANKSAVE',
                'GET_INSERTITEMINDEXLIST',
                'GET_DEPT',
                'BTN_DELETETEMPLATE',
                'CHECKBTN',
                'CANCELCHECKBTN',
                'INSERT_TEMPLATESAVE',
                'GET_ITEMINDEXBYMRCODE',
                'GET_AREAFLAGANDLISTNAMEBYMRCODE1',
                'UP_DATEITEMINDEXLIST',
                'DELETE_ITEMINDEXBYCODE',
                'TEMPMOVEORCOPYBTN',
                'TemplateDoubleClick'
            ]),
            // 关编辑器
            handlecloseSubTplWord(val) {
                this.wordshow = val
                this.handleNodeClick(this.currentTreeNode)
                this.currentTreeNode = this.currentTreeNode
            },
            // 模板切换
            checkChange() {
                if (this.hasInfo) {
                    this.hasInfoSelect()
                } else {
                    this.get_GetInformation()
                }
            },

            // 移动模板
            handleCopyClicFn() {
                this.isCopy = true
                this.copyTitle = '移动模板'
                if (this.multipleSelection.length == 0) {
                    this.$message.error('请先至少选择一个模板进行操作')
                    return
                }
                let param = {
                    message: encodeURI('移动'),
                    Mr_Deptid: this.multipleSelection[0].DEPT_ID,
                    CreatorID: this.multipleSelection[0].CREATOR_ID,
                    UserId: this.loginUserId.UserId,
                    workbenchID: this.workStationID
                }
                // 权限
                this.GETSYSWORK(param).then(res => {
                    if (res.code == 4) {
                        this.dialogMoveVisible = true
                        this.get_GetMoveSyInformation()
                    } else if (res.code == -1) {
                        this.$message.error(res.msg)
                        this.$router.push({
                            path: urls.LOGIN
                        })
                    } else {
                        this.$message.error(res.msg)
                        return
                    }
                })
            },
            // 复制模板
            get_GetMoveSyInformation() {
                this.GET_DATAMANAGEFATHER({
                    WORKBENCH_CODE: this.workBenchID
                }).then(res => {
                    this.treeMovedata = res.values
                })
            },
            handleMoveNodeClick(node) {
                this.currentMoveNode = node
                let dept_id = ''
                if (!node.filePath) {
                    dept_id = node.id
                } else {
                    dept_id = node.id
                }
                this.GET_DATAMANAGEITEM({
                    DEPT_ID: dept_id,
                    UserID: node.code,
                    tag: node.Tag
                }).then(res => {
                    if (res.code === 1) {
                        node.children = res.values
                    }
                })
            },
            handleMoveClicFn() {
                this.isCopy = false
                if (this.multipleSelection.length == 0) {
                    this.$message.error('请先至少选择一个模板进行操作')
                    return
                }
                let param = {
                    message: encodeURI('复制'),
                    Mr_Deptid: this.multipleSelection[0].DEPT_ID,
                    CreatorID: this.multipleSelection[0].CREATOR_ID,
                    UserId: this.loginUserId.UserId,
                    workbenchID: this.workStationID
                }
                // 权限
                this.GETSYSWORK(param).then(res => {
                    if (res.code == 4) {
                        this.copyTitle = '复制模板'
                        this.dialogMoveVisible = true
                        this.get_GetMoveSyInformation()
                    } else if (res.code == -1) {
                        this.$message.error(res.msg)
                        this.$router.push({
                            path: urls.LOGIN
                        })
                    } else {
                        this.$message.error(res.msg)
                        return
                    }
                })
            },
            moveTempForm() {
                const params = []
                this.dialogMoveVisible = false
                if (!this.currentMoveNode) {
                    this.$message('请选择列表')
                    return
                }
                if (this.currentMoveNode.id == 'MC') {
                    this.selfId = this.currentMoveNode.code
                    this.selfPath = 'MC'
                } else {
                    this.selfId = this.loginUserId.UserId
                    this.selfPath = this.currentMoveNode.code
                }
                this.multipleSelection.forEach((item, index) => {
                    this.obj = {
                        isMarkMoveOrCopy: this.isCopy ? 'Move' : '',
                        MR_CODE: item.MR_CODE,
                        MR_ATTR: this.currentMoveNode.id,
                        DEPT_ID: this.selfPath,
                        CREATOR_ID: this.selfId,
                        EMR_TYPE: 0,
                        MR_PATH: 'Template/' + this.selfPath + '/' + item.LIST_CODE
                    }
                    params.push(this.obj)
                })
                this.TEMPMOVEORCOPYBTN(params).then(res => {
                    if (res.code == 1) {
                        this.$message.success(res.msg)
                    }
                    this.moveDialoClose()
                })
                if (this.currentMoveNode.Tag == this.currentTreeNode.Tag && this.currentMoveNode.label == this.currentTreeNode.label) {
                    this.handleNodeClick(this.currentMoveNode)
                    this.currentTreeNode = this.currentMoveNode
                    this.get_GetInformation()
                }
                // this.$refs.tempTree.setCurrentKey(this.currentMoveNode.id)
            },
            moveDialoClose() {
                this.dialogMoveVisible = false
                this.currentMoveNode = null
            },
            // 左边树节点添加
            handleRightClick(evt, obj, Node, element) {
                this.leftNodeform.upName = ''
                this.leftNodeform.tempName = ''
                this.nodeData = Node
                this.objNode = obj
                this.menuVisible = true
                if (obj.Tag == 1) {
                    this.linkVisible = false
                } else {
                    this.linkVisible = true
                }
                let menu = document.querySelector('#menu')
                menu.style.cssText =
                    'left: ' +
                    (evt.clientX - 10) +
                    'px' +
                    '; top: ' +
                    (evt.clientY - 25) +
                    'px;'
            },
            handleCreatEle() {
                (this.isAdd = false), (this.dialogFormVisible = true)
                this.leftNodeform.upName = this.nodeData.label
                this.actionCloseContextMenu()
            },
            handleEditEle() {
                (this.isAdd = true), (this.dialogFormVisible = true)
                this.leftNodeform.upName = this.nodeData.parent.data.label
                this.leftNodeform.tempName = this.nodeData.label
                this.actionCloseContextMenu()
            },
            handleCreateNew() {
                this.actionCloseContextMenu()
                let params = {
                    MR_CODE: this.objNode.id
                }
                this.DELETE_ITEMINDEXBYCODE(params).then(res => {
                    if (res.code == 2) {
                        this.$message.success(res.msg)
                        this.get_GetSyInformation()
                    } else {
                        this.$message.error(res.msg)
                    }
                })
            },
            actionCloseContextMenu() {
                this.menuVisible = false
                let menu = document.querySelector("#menu")
                menu.style.cssText = "left: -100000px"
                menu.style.left = "-100000px"
            },
            // 添加请求
            addTempForm() {
                let params = {
                    LIST_CODE: '0',
                    MR_CODE: this.isAdd ? this.objNode.id : '',
                    MR_NAME: this.leftNodeform.tempName.trim(),
                    MR_ATTR: this.isAdd ? this.nodeData.parent.data.id : this.objNode.id,
                    DEPT_ID: this.objNode.code == 'MC' ?
                        this.objNode.code : this.nodeData.parent.data.code,
                    CREATOR_ID: this.loginUserId.UserId,
                    CREATE_DATE_TIME: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                    LAST_MODIFY_DATE_TIME: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                    VISIBLED: 1,
                    INPUT_CODE: this.leftNodeform.tempName.trim(),
                    INPUTWB_CODE: this.leftNodeform.tempName.trim(),
                    IF_FLAG: 1,
                    EMR_TYPE: 0,
                    ITEM_FLAG: 9
                }
                if (this.isAdd == false) {
                    this.GET_INSERTITEMINDEXLIST(params).then(res => {
                        if (res.code == 1) {
                            this.$message.success(res.msg)
                        }
                        this.get_GetSyInformation()
                    })
                } else {
                    this.UP_DATEITEMINDEXLIST(params).then(res => {
                        if (res.code == 1) {
                            this.$message.success(res.msg)
                        }
                        this.get_GetSyInformation()
                    })
                }
                this.tempDialoClose()
            },
            tempDialoClose() {
                this.leftNodeform.tempName = ''
                this.dialogFormVisible = false
            },
            // 右边列表获取
            handleNodeClick(node) {
                console.log(node)
                this.currentTreeNode = node
                this.get_GetInformation()
                let dept_id = ''
                if (!node.filePath) {
                    dept_id = node.id
                } else {
                    dept_id = node.id
                }
                this.GET_DATAMANAGEITEM({
                    DEPT_ID: dept_id,
                    UserID: node.code,
                    tag: node.Tag
                }).then(res => {
                    if (res.code === 1) {
                        node.children = res.values
                    }
                })
            },
            get_GetInformation() {
                const params = {
                    sid: this.currentTreeNode.id,
                    code: this.currentTreeNode.code,
                    tag: this.currentTreeNode.Tag,
                    cbWoman: this.tplTypeChecked.indexOf('woman') > -1 ? '1' : '0',
                    cbMan: this.tplTypeChecked.indexOf('man') > -1 ? '1' : '0',
                    cbTY: this.tplTypeChecked.indexOf('ty') > -1 ? '1' : '0',
                    pageSize: this.pageSize,
                    pageNos: this.pageNos
                }
                this.GET_DATA_MANAGE_LIST(params).then(res => {
                    if (res.code == 1) {
                        this.total = res.values.total
                        this.tableData = res.values.values
                    } else {
                        this.total = 0
                        this.tableData = []
                    }
                    this.hasInfo = false
                })
            },
            // 左边树获取
            get_GetSyInformation() {
                this.usersId = this.loginUserId.UserId
                this.GET_DATAMANAGEFATHER({
                    WORKBENCH_CODE: this.workBenchID
                }).then(res => {
                    this.treeData = res.values
                    this.currentNodekey = this.treeData[0].id;
                    // 设置默认选中第一行
                    this.$nextTick(function() {
                        this.$refs.tempTree.setCurrentKey(this.currentNodekey)
                        const openNode = this.$refs.tempTree.getCurrentNode(this.currentNodekey)
                        this.handleNodeClick(openNode)
                    })
                })
            },
            // 获取业务域和科室
            get_listInformation() {
                // 获取业务域
                this.GET_BUSINESS().then(res => {
                    this.options = res.values
                    if (this.fenlei == '0') {
                        this.value = this.options[0].LIST_CODE
                    }
                })
                if (
                    this.currentTreeNode.id == 'MA' ||
                    this.currentTreeNode.code == 'MA'
                ) {
                    this.form.tplChecked = 'MA'
                    this.tpck = 'MA'
                } else if (
                    this.currentTreeNode.id == 'MB' ||
                    this.currentTreeNode.code == 'MB'
                ) {
                    this.form.tplChecked = 'MB'
                    this.tpck = 'MB'
                } else if (
                    this.currentTreeNode.id == 'MZ' ||
                    this.currentTreeNode.code == 'MZ'
                ) {
                    this.form.tplChecked = 'MZ'
                    this.tpck = 'MZ'
                } else if (
                    this.currentTreeNode.id == 'MC' ||
                    this.currentTreeNode.code == 'MC'
                ) {
                    this.form.tplChecked = 'MC'
                    this.tpck = 'MC'
                } else {
                    this.form.tplChecked = 'MS'
                    this.tpck = 'MS'
                    // 获取科室
                    let params = {
                        deptId: this.currentTreeNode.Tag == 1 ?
                            this.currentTreeNode.id : this.currentTreeNode.code
                    }
                    this.GET_DEPT(params).then(res => {
                        this.kstions = res.values
                        this.form.selected = this.kstions[0].DEPT_ID
                    })
                }
            },
            // 业务域值变化事件
            selectChange() {
                if (this.value == '0705') {
                    this.isbook = true
                } else {
                    this.isbook = false
                    if (this.fenlei == '0') {
                        this.form.sheet = ''
                    }
                }
            },

            // 修改弹窗
            handleEdit(obj) {
                // this.getPower()
                console.log(obj)
                let param = {
                    message: encodeURI('修改'),
                    Mr_Deptid: obj.DEPT_ID,
                    CreatorID: obj.CREATOR_ID,
                    UserId: this.loginUserId.UserId,
                    workbenchID: this.workStationID
                }
                // 权限
                this.GETSYSWORK(param).then(res => {
                    console.log(res)
                    if (res.code == 4) {
                        this.fenlei = '1'
                        this.dialogAddVisible = true
                        this.get_listInformation()
                        let params = {
                            code: obj.MR_CODE
                        }
                        this.GET_ITEMINDEXBYMRCODE(params).then(res => {
                            this.$nextTick(function() {
                                if (this.value == '0705') {
                                    this.isbook = true
                                } else {
                                    this.isbook = false
                                }
                            })
                            this.form.sheet = res.values[0].SaveSheet
                            this.form.mname = res.values[0].MR_NAME
                            this.value = res.values[0].LIST_CODE
                            this.form.radioTpl = res.values[0].SEX_FITER
                            this.form.desc = res.values[0].CONTENT_CODE
                            this.form.resource = res.values[0].MEDICINE_TYPE
                            res.values[0].IS_SINGLE == 0 ?
                                this.form.checkedSingle :
                                (this.form.checkedSingle = true)
                            res.values[0].MUST_FITER == 0 ?
                                this.form.checked :
                                (this.form.checked = true)
                            this.form.tplChecked = this.tpck
                            this.form.selected = this.form.selected
                            res.values[0].AREA_FLAG == 0 ?
                                this.form.checkedArea :
                                (this.form.checkedArea = true)
                            this.xiuCode = res.values[0].MR_CODE
                            this.xiuDate = res.values[0].CREATE_DATE_TIME
                        })
                    } else if (res.code == -1) {
                        this.$message.error(res.msg)
                        this.$router.push({
                            path: urls.LOGIN
                        })
                    } else {
                        this.$message.error(res.msg)
                        return
                    }
                })
            },
            // 新增弹窗
            handleAddClicFn() {
                this.fenlei = '0'
                if (
                    !this.currentTreeNode
                ) {
                    this.dialogAddVisible = false
                    this.$message('请选择节点')
                    return
                }
                let params = {
                    deptId: this.currentTreeNode.code,
                    workbenchID: this.workStationID,
                    userid: this.loginUserId.UserId
                }
                // 权限
                this.GETSESSIONRESULT(params).then(res => {
                    if (res.code == 2) {
                        if (this.currentTreeNode.code !== this.usersId) {
                            this.dialogAddVisible = false
                            this.$message.error('请在用户本人下添加')
                            return
                        }
                        this.openDialog()
                    } else if (res.code == 3) {
                        if ((this.currentTreeNode.id == 'MC') && (this.currentTreeNode.code !== this.usersId)) {
                            this.dialogAddVisible = false
                            this.$message.error('请在用户本人下添加')
                            return
                        }
                        if ((this.currentTreeNode.code == 'MC') && (this.currentTreeNode.code2 !== this.usersId)) {
                            this.dialogAddVisible = false
                            this.$message.error('请在用户本人下添加')
                            return
                        }
                        this.openDialog()
                    } else if (res.code == 1) {
                        if (this.currentTreeNode.id == 'MA' || this.currentTreeNode.id == 'MB' ||
                            this.currentTreeNode.id == 'MC' || this.currentTreeNode.id == 'MZ' ||
                            this.currentTreeNode.code == 'MA' || this.currentTreeNode.code == 'MB' ||
                            this.currentTreeNode.code == 'MC' || this.currentTreeNode.code == 'MZ') {
                            this.$message.error(res.msg)
                            return
                        }
                        this.openDialog()
                    } else if (res.code == -1) {
                        this.$message.error(res.msg)
                        this.$router.push({
                            path: urls.LOGIN
                        })
                    }
                })
            },
            // 关新增弹窗
            closeAdd() {
                this.isbook = false
                this.value = ''
                this.$refs.form.resetFields()
                this.dialogAddVisible = false
            },
            // 开新增弹窗
            openDialog() {
                this.value = ''
                this.dialogAddVisible = true
                this.form.mname = ''
                this.form.desc = ''
                this.get_listInformation()
            },
            // 保存
            handleAdd(formName) {
                this.$refs[formName].validate((valid) => {
                    if (!valid) {
                        return
                    } else {
                        if (this.form.tplChecked == 'MC') {
                            this.form.assion = 0
                        } else if (this.form.tplChecked == 'MS') {
                            this.form.assion = 1
                        } else {
                            this.form.assion = 2
                        }
                        if (this.form.tplChecked == 'MS') {
                            this.koko = this.form.selected
                        } else {
                            this.koko = this.form.tplChecked
                        }
                        if (this.fenlei == '0') {
                            this.xiuCode = ''
                            this.xiuDate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
                        } else if (this.fenlei == '1') {
                            this.xiuCode == this.xiuCode
                            this.xiuDate == this.xiuDate
                        }
                        if (this.isbook == false) {
                            this.form.sheet = ''
                        }
                        let params = {
                            SaveSheet: this.form.sheet.trim(),
                            LIST_CODE: this.value,
                            MR_CODE: this.xiuCode,
                            MR_NAME: this.form.mname.trim(),
                            MONITOR_CODE: '',
                            MR_ATTR: this.currentTreeNode.id,
                            DEPT_ID: this.koko,
                            CREATOR_ID: this.loginUserId.UserId,
                            CREATE_DATE_TIME: this.xiuDate,
                            LAST_MODIFY_DATE_TIME: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                            CONTENT_CODE: this.form.desc,
                            PERMISSION: this.form.assion,
                            VISIBLED: 1,
                            INPUT_CODE: this.form.mname.trim(),
                            MBXML: '',
                            SHOW_ORDER: '',
                            IS_SINGLE: this.form.checkedSingle ? 1 : 0,
                            SEX_FITER: this.form.radioTpl,
                            MUST_FITER: this.form.checked ? 1 : 0,
                            HOSPITAL_CODE: '',
                            MBCONTENT: '',
                            MR_PATH: 'Template/' + this.koko + '/' + this.value,
                            EMR_TYPE: 0,
                            ITEM_FLAG: 0,
                            MEDICINE_TYPE: this.form.resource,
                            AREA_FLAG: this.form.checkedArea ? 1 : 0
                        }
                        console.log(params)
                        console.log(this.koko)
                        this.INSERT_TEMPLATESAVE(params).then(res => {
                            if (res.code == 1) {
                                this.$message.success(res.msg)
                            }
                            this.get_GetInformation()
                            this.handleClose()
                        })
                    }
                })
            },
            // 取消审核
            handleCancelClicFn() {
                if (this.multipleSelection.length == 0) {
                    this.$message('请先至少选择一个模板进行取消审核')
                } else {
                    const Listmrcode = []
                    this.multipleSelection.forEach((item, index) => {
                        let obj = {
                            ITEM_FLAG: 0,
                            LAST_SIGN_PERSON_ID: this.loginUserId.UserId,
                            LAST_SIGN_DATE: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                            Mr_Code: item.MR_CODE,
                            WorkApplication: this.workStationID
                        }
                        Listmrcode.push(obj)
                    })
                    this.CANCELCHECKBTN({
                        Listmrcode
                    }).then(res => {
                        this.get_GetInformation()
                    })
                }
            },
            // 审核模板按钮
            handleCheckClicFn() {
                if (this.multipleSelection.length == 0) {
                    this.$message('请先至少选择一个模板进行审核')
                } else {
                    const Listmrcode = []
                    this.multipleSelection.forEach((item, index) => {
                        let obj = {
                            ITEM_FLAG: 3,
                            LAST_SIGN_PERSON_ID: this.loginUserId.UserId,
                            LAST_SIGN_DATE: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                            Mr_Code: item.MR_CODE,
                            WorkApplication: this.workStationID
                        }
                        Listmrcode.push(obj)
                    })
                    this.CHECKBTN({
                        Listmrcode
                    }).then(res => {
                        this.get_GetInformation()
                    })
                }
            },
            // 删除模板按钮
            handleDeleteClicFn() {
                if (this.multipleSelection.length == 0) {
                    this.$message('请先至少选择一个模板进行删除')
                } else {
                    let param = {
                        message: encodeURI('删除'),
                        deptId: this.multipleSelection[0].DEPT_ID,
                        creatorId: this.multipleSelection[0].CREATOR_ID,
                        UserId: this.loginUserId.UserId,
                        workbenchID: this.workStationID
                    }
                    this.GETDELETESYS(param).then(res => {
                        if (res.code == 4) {
                            this.$confirm('您确定要删除当前选中的数据?', '提示', {
                                    confirmButtonText: '确定',
                                    cancelButtonText: '取消',
                                    type: 'warning'
                                })
                                .then(() => {
                                    const Listmrcode = []
                                    const param = []
                                    this.multipleSelection.forEach((item, index) => {
                                        let param = item.MR_CODE
                                        Listmrcode.push(param)
                                        param = Listmrcode
                                    })
                                    this.BTN_DELETETEMPLATE({
                                        Listmrcode
                                    }).then(res => {
                                        this.$message.success('删除成功')
                                        this.get_GetInformation()
                                    })
                                })
                                .catch(() => {
                                    this.$message({
                                        type: 'info',
                                        message: '已取消删除'
                                    })
                                })
                        } else if (res.code == -1) {
                            this.$message.error(res.msg)
                            this.$router.push({
                                path: urls.LOGIN
                            })
                        } else {
                            this.$message.error(res.msg)
                            return
                        }
                    })
                }
            },
            // 排序弹窗
            handleClicFn() {
                if (!this.tableData.length == 0) {
                    this.dialogVisible = true
                    const params = {
                        sid: this.currentTreeNode.id,
                        code: this.currentTreeNode.code,
                        tag: this.currentTreeNode.Tag,
                        cbWoman: this.tplTypeChecked.indexOf('woman') > -1 ? '1' : '0',
                        cbMan: this.tplTypeChecked.indexOf('man') > -1 ? '1' : '0',
                        cbTY: this.tplTypeChecked.indexOf('ty') > -1 ? '1' : '0'
                    }
                    this.GET_RANK(params).then(res => {
                        this.syData = res.values
                    })
                }
            },
            // 向上移动
            moveup() {
                // 向上移动
                if (this.issyData.length == 0) {
                    this.$message({
                        type: 'warning',
                        message: '请选择要移动的列！'
                    })
                    return null
                }
                const index = this.dataIndex
                const tempOption = this.syData[index - 1]
                if (this.dataIndex == 0) {
                    this.$message({
                        type: 'warning',
                        message: '已置顶'
                    })
                    return null
                }
                this.$set(this.syData, index - 1, this.syData[index])
                this.$set(this.syData, index, tempOption)
                this.dataIndex--
            },
            handleitem(val) {
                // 填充数据
                this.currenttwdData = val
                this.issyData.push(val)
                this.dataIndex = this.getArrayIndex(this.syData, val)
                // 点击每个li
                const newSysData = []
                this.syData.forEach(el => {
                    el.flag = false
                    newSysData.push(el)
                })
                newSysData.forEach(element => {
                    if (element == val) {
                        element.flag = true
                    }
                })
                this.syData = newSysData
            },
            getArrayIndex(arr, obj) {
                // 获取数组元素的下标
                let i = arr.length
                while (i--) {
                    if (arr[i] === obj) {
                        return i
                    }
                }
                return -1
            },
            // 向下移动
            movedown() {
                // 向下移动
                if (this.issyData.length == 0) {
                    this.$message({
                        type: 'warning',
                        message: '请选择要移动的列！'
                    })
                    return null
                }
                const index = this.dataIndex
                const tempOption = this.syData[index + 1]
                if (this.dataIndex - this.syData.length == -1) {
                    this.$message({
                        type: 'warning',
                        message: '已置底'
                    })
                    return null
                }
                this.$set(this.syData, index + 1, this.syData[index])
                this.$set(this.syData, index, tempOption)
                this.dataIndex++
            },
            // 排序保存按钮
            saveTemp() {
                const sa = []
                const param = []
                this.syData.forEach((item, index) => {
                    let param = {
                        SHOW_ORDER: index,
                        MR_CODE: item.MR_CODE
                    }
                    sa.push(param)
                    param = sa
                })
                this.BTN_RANKSAVE({
                    sa
                }).then(res => {
                    this.$message.success('保存成功')
                    this.dialogVisible = false
                    this.issyData = []
                    this.get_GetInformation()
                })
            },
            handlePClose(done) {
                done((this.issyData = []))
            },
            // 全选功能/取消全选
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row)
                    })
                } else {
                    this.$refs.multipleTable.clearSelection()
                }
            },
            handleSelectionChange(val) {
                console.log(val)
                this.multipleSelection = val
                if (
                    this.multipleSelection.length !== 0 &&
                    this.multipleSelection[0].ITEM_FLAG == 3
                ) {
                    this.isdisabledFn = true
                } else {
                    this.isdisabledFn = false
                }
            },
            toggleAllSelection(rows) {
                if (this.$refs.multipleTable.selection.length === this.tableData.length) {
                    return
                }
                this.$refs.multipleTable.toggleAllSelection()
            },

            pageSizeChange(size) {
                this.pageSize = size
                if (this.hasInfo) {
                    this.hasInfoSelect()
                } else {
                    this.get_GetInformation()
                }
            },
            currentPageChange(val) {
                this.pageNos = val
                if (this.hasInfo) {
                    this.hasInfoSelect()
                } else {
                    this.get_GetInformation()
                }
            },
            handleClose() {
                this.isbook = false
                this.form.mname = ''
                this.value = ''
                this.$refs.form.resetFields()
                this.dialogAddVisible = false
            },
            // 模板查询
            infoSelect() {
                if (!this.tplName) {
                    this.$message({
                        type: 'warning',
                        message: '请输入模板名称或者模板拼音码或者模板五笔码!'
                    })
                    return
                }
                const params = {
                    plateName: encodeURI(this.tplName.trim()),
                    cbWoman: this.tplTypeChecked.indexOf('woman') > -1 ? '1' : '0',
                    cbMan: this.tplTypeChecked.indexOf('man') > -1 ? '1' : '0',
                    cbTY: this.tplTypeChecked.indexOf('ty') > -1 ? '1' : '0',
                    pageSize: this.pageSize,
                    pageNos: this.pageNos
                }
                // 存查询的名称
                this.hasName = params.plateName
                this.GET_FAINFOLISTBYSELECT(params).then(res => {
                    this.hasInfo = true
                    this.total = res.values.total
                    this.tableData = res.values.values
                })
            },
            // 分页查询
            hasInfoSelect() {
                const params = {
                    plateName: this.hasName,
                    cbWoman: this.tplTypeChecked.indexOf('woman') > -1 ? '1' : '0',
                    cbMan: this.tplTypeChecked.indexOf('man') > -1 ? '1' : '0',
                    cbTY: this.tplTypeChecked.indexOf('ty') > -1 ? '1' : '0',
                    pageSize: this.pageSize,
                    pageNos: this.pageNos
                }
                this.GET_FAINFOLISTBYSELECT(params).then(res => {
                    this.hasInfo = true
                    this.total = res.values.total
                    this.tableData = res.values.values
                })
            },
            // 左边模板树查询功能
            filterNode(value, data) {
                if (!value) return true
                return data.label.indexOf(value) !== -1
            },
            handleSearch() {
                this.$refs.tempTree.filter(this.doctorName)
            },
            // 双击打开word编辑器
            handleOpenWordEdit(row, column, event) {
                console.log(row)
                let data = {
                    DeptID: row.DEPT_ID, //模板属性
                    workbenchcode: this.workStationID, //工作台id
                    userID: this.loginUserId.UserId, //登录人ID
                    itemFlag: row.ITEM_FLAG
                }
                // console.log(JSON.stringify(data))
                this.TemplateDoubleClick(data).then(res => {
                    console.log(res)
                    this.wordcode = res.code
                    let msgtip = res.msg
                    if (res.code == 2) {
                        this.currentTableData = row
                        this.wordshow = true
                    } else {
                        this.$alert(msgtip, {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.currentTableData = row
                                this.wordshow = true
                                console.log(row)
                            }
                        })
                    }

                })
            }
        }
    }
</script>
<style lang="scss" scoped>
    .el-table {
        cursor: pointer;
    }

    .fix-width {
        width: calc(100% - 236px);
        flex: 1;
        left: auto;
        right: 0;
        border: none;
    }

    .temp-manage-manage {
        height: 100%;
    }

    /deep/ .el-header {
        border: 1px solid #E8EAED;
        background-color: white;
        margin: 6px 0px;
        color: #333;
        padding: 0px 0 10px 15px;
    }

    .gen3 .el-form-item {
        margin-bottom: 0px;
    }

    /deep/textarea {
        resize: none;
    }

    // 左边树节点
    /deep/ .customClass {
        width: 428px;
        height: 269px;
    }

    .tpls-container {
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
    }

    .gen2 .el-row {
        padding: 10px 0;
    }

    .main {
        cursor: pointer;
        border: 1px solid #ccc;
        height: 500px;
        width: 299px;
        overflow-y: auto;
    }

    .gen1 {
        margin: 9px 0;
        padding: 9px;
    }

    .gen {
        border: 1px solid #E8EAED;
        background-color: white;
        // // margin-bottom: 15px;
        color: #333;
        padding: 10px 0 4px 7px;

        .imgBtn-item {
            display: inline-flex;
            justify-content: space-evenly;
            line-height: 2.7;
        }
    }

    /deep/.img-btn>span {
        min-width: 34px !important;

        &:nth-child(1) {
            margin-right: 8px;
        }

        &:nth-child(2) {
            margin-right: 10px;
        }
    }

    /deep/ .el-aside {
        overflow-x: auto;
        // height: 100%;
        overflow: auto;
        margin: -15px 0 0 -15px;
        height: calc(100% + 25px) !important
    }

    /deep/ .el-main {
        overflow: hidden;
        padding: 0 10px;
    }

    .tempManage {
        border: 1px solid #ececec;
        // padding: 19px 3px;
        // margin: 12px 0;
        position: relative;
        border-radius: 0.5em;

        p {
            position: absolute;
            top: -11px;
            left: 6px;
            background-color: #fff;
        }
    }

    .bgclass {
        background-color: #44b3c7;
        color: white;
    }

    /deep/.el-tree--highlight-current {
        .el-tree-node.is-current {
            &>.el-tree-node__content {
                background-color: #44b3c7;
                color: white;
            }
        }
    }
</style>
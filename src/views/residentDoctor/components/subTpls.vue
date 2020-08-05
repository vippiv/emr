<!-- 子模板 -->
<template>
    <div class="sub-tpl-manage-container">
        <div class="imgBtnBox">
            <ckImgBtn class="imgBtn-item" icon="ck-imgicon-add" @click="handleAdd">新增模板</ckImgBtn>
            <ckImgBtn class="imgBtn-item" icon="ck-imgicon-delete" @click="handleDele">删除模板</ckImgBtn>
            <ckImgBtn class="imgBtn-item" icon="ck-imgicon-write" @click="handleClickEidt" style="display:none;">编辑模板</ckImgBtn>
            <ckImgBtn class="imgBtn-item" icon="ck-imgicon-audit" @click="handleCheckClicFn" :disabled="isdisabledFn">审核模板</ckImgBtn>
            <ckImgBtn class="imgBtn-item" icon="ck-imgicon-cancelAudit" @click="handleCancelClicFn">取消审核</ckImgBtn>
            <ckImgBtn class="imgBtn-item" icon="ck-imgicon-remove" @click="handleCopyClicFn" v-if="isUse">移动模板</ckImgBtn>
            <ckImgBtn class="imgBtn-item" icon="ck-imgicon-copy" @click="handleClickCopy">复制模板</ckImgBtn>
        </div>
        <el-form size="small" :model="form">
            <el-row>
                <el-col :span="4">
                    <el-form-item>
                        <el-col :span="18">
                            <el-input v-model="form.searchval" size="mini"></el-input>
                        </el-col>
                        <el-col :span="6" style="text-align:right;">
                            <el-button type="primary" @click="handleSearch" size="mini">查询</el-button>
                        </el-col>
                    </el-form-item>
                </el-col>
                <el-col :span="19" :offset="1" v-if="beforeStatus">
                    <el-form-item>
                        模板名称：
                        <el-input style="width:180px;" v-model="form.selectName" size="mini"></el-input>
                        <el-checkbox-group v-model="form.checkList" @change="checkChange" :min="1" style="display:inline-block;margin:0 15px;">
                            <el-checkbox label="ty">通用模板</el-checkbox>
                            <el-checkbox label="man">男性模板</el-checkbox>
                            <el-checkbox label="woman">女性模板</el-checkbox>
                        </el-checkbox-group>
                        <el-button type="primary" @click="handleTempQ" size="mini">模板查询</el-button>
                        <el-button type="primary" @click="handleTempSort" size="mini">模板排序</el-button>
                        <el-button type="primary" @click="handleAllSelection" size="mini">全选</el-button>
                    </el-form-item>
                </el-col>
                <el-col :span="19" :offset="1" v-if="afterStatus">
                    <el-form-item>
                        <div class="self-form-item">
                            模板名称：
                            <el-input style="width:100px;margin-right:10px;" v-model="form.tempname"></el-input>
                            <el-button type="primary">保存模板</el-button>
                            <el-button type="primary">存为XML</el-button>
                            <el-dropdown style="margin:0px 10px;">
                                <el-button type="primary">
                                    打印
                                    <i class="el-icon-arrow-down el-icon--right"></i>
                                </el-button>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item>打印</el-dropdown-item>
                                    <el-dropdown-item>按行续打</el-dropdown-item>
                                    <el-dropdown-item>选择续打</el-dropdown-item>
                                    <el-dropdown-item>打印预览</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                            <el-dropdown style="margin-right:10px;">
                                <el-button type="primary">
                                    插入
                                    <i class="el-icon-arrow-down el-icon--right"></i>
                                </el-button>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item>插入数据元</el-dropdown-item>
                                    <el-dropdown-item>数据元属性</el-dropdown-item>
                                    <el-dropdown-item>插入数据组</el-dropdown-item>
                                    <el-dropdown-item>数据组属性</el-dropdown-item>
                                    <el-dropdown-item>插入表格</el-dropdown-item>
                                    <el-dropdown-item>插入矢量图</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                            <el-button type="primary">开启智能输入</el-button>
                            <el-button type="primary">区域保护</el-button>
                            <el-button type="primary">删除区域</el-button>
                            <el-button type="primary">存入个人模板</el-button>
                            <el-button type="primary">不显示数据元背景色</el-button>
                            <el-dropdown style="margin:0px 10px;">
                                <el-button type="primary">
                                    浏览模式
                                    <i class="el-icon-arrow-down el-icon--right"></i>
                                </el-button>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item>书写模式</el-dropdown-item>
                                    <el-dropdown-item>清洁模式</el-dropdown-item>
                                    <el-dropdown-item>非清洁模式</el-dropdown-item>
                                    <el-dropdown-item>保密模式</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                            <el-button type="primary">诊断</el-button>
                            <el-button type="primary">粘贴</el-button>
                            <el-button type="primary" @click="backprevstep">返回</el-button>
                        </div>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <el-row>
            <el-col :span="4" class="tpls-container">
                <el-tree class="ypboxL" :data="treeData" ref="tempTree" node-key="id" :props="defaultProps" :filter-node-method="filterNode" @node-click="handleModuleNodeClick" @node-contextmenu="handleRightClick" highlight-current>
                </el-tree>
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
                            <img class="icon" :src="newIcon">
                            <el-link type="primary" :underline="false">删除</el-link>
                        </li>
                    </ul>
                </div>
            </el-col>
            <el-col :span="19" :offset="1" v-if="beforeStatus">
                <el-table height="calc(100vh - 450px)" ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" size="mini" border @row-dblclick="handleOpenWordEdit">
                    <el-table-column type="selection" width="55" align="center"></el-table-column>
                    <el-table-column prop="MR_NAME" label="模板名称" align="center"></el-table-column>
                    <el-table-column prop="LIST_NAME" label="所属分类" align="center"></el-table-column>
                    <el-table-column prop="ITEM_FLAG_NAME" label="签审状态" align="center"></el-table-column>
                    <el-table-column prop="SINGLE_Value" label="是否多份" align="center"></el-table-column>
                    <el-table-column prop="SEX_Value" label="适应性别" align="center"></el-table-column>
                    <el-table-column prop="MUST_Value" label="是否必须" align="center"></el-table-column>
                    <el-table-column label="修改时间" align="center">
                        <template slot-scope="scope">
                            {{scope.row.Last_Modify_Date_Time | momentFilter}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="MR_PATH" label="模板路径" align="center"></el-table-column>
                    <el-table-column align="center" label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" size="mini" @click="handleUpdate(scope.row)">修改</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div style="text-align:right;margin-top:10px;">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="paginationInfo.currentPage" :page-sizes="paginationInfo.pageSizes" :page-size="paginationInfo.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="paginationInfo.total"></el-pagination>
                </div>
            </el-col>
            <el-col :span="19" :offset="1" v-if="afterStatus">
                <el-row>
                    <el-col :span="5">
                        <el-card shadow="never" class="self-card">
                            <el-tabs v-model="outActiveName" type="card" @tab-click="handleClick">
                                <el-tab-pane label="数据元" name="dataElement">
                                    <el-tabs v-model="innerActiveName" type="card" @tab-click="handleClick">
                                        <el-tab-pane label="用户自定义" name="userDefined">
                                            <el-row style="margin:10px 0px;">
                                                <el-col :span="18">
                                                    <el-input size="mini"></el-input>
                                                </el-col>
                                                <el-col :span="6">
                                                    <el-button type="primary" size="mini" style="float:right;">查询</el-button>
                                                </el-col>
                                            </el-row>
                                            <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
                                            <div style="text-align:center;margin:10px 0px;">
                                                <el-button type="primary" size="mini">插入</el-button>
                                            </div>
                                            <div class="insert-panel"></div>
                                        </el-tab-pane>
                                        <el-tab-pane label="系统自定义" name="SystemDefined">
                                            <ul class="ul">
                                                <li :class="[item.flag?'bgclass':'']" @click="handleitem(item)" v-for="item of syData" :key="item.value">{{item.text}}</li>
                                            </ul>
                                            <div style="text-align:center;margin:10px 0px;">
                                                <el-button type="primary" size="mini">插入</el-button>
                                            </div>
                                        </el-tab-pane>
                                    </el-tabs>
                                </el-tab-pane>
                                <el-tab-pane label="数据组" name="dataGroup">
                                    <h2>用户自定义病历数据组:</h2>
                                    <el-row style="margin:10px 0px;">
                                        <el-col :span="18">
                                            <el-input size="mini"></el-input>
                                        </el-col>
                                        <el-col :span="6">
                                            <el-button type="primary" size="mini" style="float:right;">查询</el-button>
                                        </el-col>
                                    </el-row>
                                    <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
                                    <div style="text-align:center;margin-top:10px;">
                                        <el-button type="primary" size="mini">插入</el-button>
                                    </div>
                                </el-tab-pane>
                            </el-tabs>
                        </el-card>
                    </el-col>
                    <el-col :span="15">
                        <div class="word-content"></div>
                    </el-col>
                    <el-col :span="4">
                        <div class="word-relation"></div>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <!-- 编辑打开word -->
        <subTplManageSonWordEdit :templateType='templateType' :wordcode="wordcode" @handleRefresh='handleRefresh' :dialogSortVisible="wordshow" v-if="wordshow" :currentTableData="currentTableData" @closeSubTplWord='handlecloseSubTplWord'></subTplManageSonWordEdit>
        <!-- 新增、修改弹窗 -->
        <subTplManageDailog :subType="subType" :currentTreeNode="currentTreeNode" :dialogFormVisible="show" :dailogType="dailogType" @closeSubManage="handleCloseDailog" :editRes="editRes" :tpck="tpck" v-if="show"></subTplManageDailog>
        <!-- 模板排序弹窗 -->
        <subTplManageSortDailog :subType="subType" :dialogSortVisible="sortShow" @closeSubSortManage="handleCloseSortDailog" :tableData="tableData" :currentTreeNode="currentTreeNode" :form="form" v-if="sortShow"></subTplManageSortDailog>
        <!-- 复制模板弹窗 -->
        <subTplManageCopyDailog :subType="subType" :copyType="copyType" :subTreeData="subTreeData" :dialogCopyVisible="copyShow" :multipleSelection="multipleSelection" @actionUpdateTree="handleUpdateTree" @closeSubCopyManage="handleCloseCopyDailog" :title="Fames" v-if="copyShow"></subTplManageCopyDailog>
        <!-- 右击菜单弹窗 -->
        <subRightClickDailog :subType="subType" :nodeData="nodeData" :objNode="objNode" :rightClickType="rightClickType" :dialogRightClickVisible="RightShow" @closeSubRightClickManage="handleCloseRightClickDailog" :title="rightNames" v-if="RightShow"></subRightClickDailog>
    </div>
</template>

<script type="text/javascript">
    import * as urls from '@/router/routePath'
    import {
        mapState
    } from 'vuex'
    import {
        createNamespacedHelpers
    } from 'vuex'
    import moment from 'moment'
    import subTplManageDailog from '@/views/residentDoctor/components/subTplManageDailog'
    import subTplManageSortDailog from '@/views/residentDoctor/components/subTplManageSortDailog'
    import subTplManageCopyDailog from '@/views/residentDoctor/components/subTplManageCopyDailog'
    import subRightClickDailog from '@/views/residentDoctor/components/subRightClickDailog'
    import subTplManageSonWordEdit from '@/views/residentDoctor/components/subTplManageSonWordEdit'
    import insertIcon from '@/assets/images/icon/insert.png'
    import createIcon from '@/assets/images/icon/create.png'
    import newIcon from '@/assets/images/icon/new.png'
    const {
        mapActions
    } = createNamespacedHelpers('residentDoctor')

    export default {
        name: 'subTpls',
        components: {
            subTplManageDailog,
            subTplManageSortDailog,
            subTplManageCopyDailog,
            subRightClickDailog,
            subTplManageSonWordEdit
        },
        data() {
            return {
                templateType: 3,
                currentNodekey: '',
                insertIcon,
                createIcon,
                newIcon,
                wordshow: false,
                wordcode: '',
                currentTableData: {},
                urls,
                usersId: '',
                isUse: false,
                subType: 1,
                // 左边树节点菜单
                nodeData: {},
                objNode: {},
                linkVisible: false,
                rightNames: '',
                menuVisible: false,
                tpck: '',
                editRes: {},
                Fames: '',
                currentTreeNode: null,
                // 审核
                isdisabledFn: false,
                outActiveName: 'dataElement',
                innerActiveName: 'userDefined',
                afterStatus: false,
                beforeStatus: true,
                copyShow: false,
                RightShow: false,
                dailogType: 1,
                copyType: 0,
                rightClickType: 0,
                show: false,
                sortShow: false,
                form: {
                    searchval: '',
                    checkList: ["ty", "woman", "man"],
                    selectName: '', // 模板名称
                    tempname: ''
                },
                // 分页
                paginationInfo: {
                    currentPage: 1,
                    total: 0,
                    pageSizes: [20, 30, 40],
                    pageSize: 20
                },
                tableData: [],
                treeData: [],
                subTreeData: [],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                multipleSelection: [],
                syData: [{
                        text: '病人信息',
                        value: 1
                    },
                    {
                        text: '姓名',
                        value: 2
                    },
                    {
                        text: '住院号',
                        value: 3
                    },
                    {
                        text: '性别',
                        value: 4
                    },
                    {
                        text: '民族',
                        value: 5
                    }
                ]
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
        computed: {
            ...mapState({
                loginUserId: state => state.global.userInfo,
                workStationID: state => state.global.workStationID,
                workBenchID: state => state.global.workBenchID,
                deptID: state => state.global.deptID
            })
        },
        methods: {
            ...mapActions([
                'DOCTORCHILDGETDELETESYS',
                'DOCTORCHILDGETSYSWORK',
                'DOCTORCHILDGETSESSIONRESULT',
                'DOCTORCHILD_GETTREELIST',
                'GET_CHILDITEMINDEXBYMRATTR',
                'GET_CHILDLISTBYID',
                'GET_DOCTORITEMINDEXBYMRCODE',
                'DOCTOR_BTNDELETETEMPLATE',
                'DOCTOR_CHECKBTN',
                'DOCTOR_CANCEL_CHECKBTN',
                'DOCTOR_GETINFOLISTBYSELECT',
                'DOCTOR_CHILDDELETEITEM',
                'TemplateDoubleClick'
            ]),
            handleRefresh() {
                this.get_GetInformation(this.currentTreeNode)
                this.currentTreeNode = this.currentTreeNode
            },
            handlecloseSubTplWord(val) {
                this.wordshow = val
            },
            handleOpenWordEdit(row, column, event) { //双击打开word编辑器
                let data = {
                    DeptID: row.DEPT_ID, //模板属性
                    workbenchcode: this.workStationID, //工作台id
                    userID: this.loginUserId.UserId, //登录人ID
                    itemFlag: row.ITEM_FLAG
                }
                this.TemplateDoubleClick(data).then(res => {
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
                            }
                        });
                    }


                })

            },
            // 左边树节点添加
            handleRightClick(evt, obj, Node, element) {
                this.nodeData = Node
                this.objNode = obj
                this.menuVisible = true
                if (obj.Tag == 1) {
                    this.linkVisible = false
                } else {
                    this.linkVisible = true
                }
                let menu = document.querySelector("#menu")
                menu.style.cssText = "left: " + (evt.clientX - 10) + 'px' + "; top: " + (evt.clientY - 25) + 'px;'
            },
            handleCreatEle() {
                this.rightClickType = 0,
                    this.rightNames = '添加'
                this.RightShow = true
                this.actionCloseContextMenu()
            },
            handleEditEle() {
                this.rightClickType = 1,
                    this.rightNames = '修改'
                this.RightShow = true
                this.actionCloseContextMenu()
            },
            handleCreateNew() {
                this.actionCloseContextMenu()
                let params = {
                    MR_CODE: this.objNode.id
                }
                this.DOCTOR_CHILDDELETEITEM(params).then(res => {
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
                menu.style.left = "-1000000px"
            },
            // 模板切换
            checkChange() {
                if (this.currentTreeNode) {
                    this.get_GetInformation(this.currentTreeNode)
                    this.currentTreeNode = this.currentTreeNode
                }
            },
            // 右边列表获取
            get_GetInformation() {
                const params = {
                    sid: this.currentTreeNode.id,
                    code: this.currentTreeNode.code,
                    tag: this.currentTreeNode.Tag,
                    cbWoman: this.form.checkList.indexOf('woman') > -1 ? '1' : '0',
                    cbMan: this.form.checkList.indexOf('man') > -1 ? '1' : '0',
                    cbTY: this.form.checkList.indexOf('ty') > -1 ? '1' : '0',
                    pageSize: this.paginationInfo.pageSize,
                    pageNos: this.paginationInfo.currentPage
                }
                this.GET_CHILDLISTBYID(params).then((res) => {
                    if (res.code == 1) {
                        this.paginationInfo.total = res.values.total
                        this.tableData = res.values.values
                    } else {
                        this.paginationInfo.total = 0
                        this.tableData = []
                    }
                })
            },
            // 左边树获取
            get_GetSyInformation() {
                this.usersId = this.loginUserId.UserId
                this.DOCTORCHILD_GETTREELIST({
                    DeptID: this.deptID
                }).then((res) => {
                    this.treeData = res.values
                    this.subTreeData = res.values
                    this.currentNodekey = this.treeData[0].id;
                    // 设置默认选中第一行
                    this.$nextTick(function() {
                        this.$refs.tempTree.setCurrentKey(this.currentNodekey)
                        const openNode = this.$refs.tempTree.getCurrentNode(this.currentNodekey)
                        this.handleModuleNodeClick(openNode)
                    })
                })
            },
            // 子节点的加载
            handleModuleNodeClick(node) {
                console.log(node)
                this.currentTreeNode = node
                this.get_GetInformation()
                let dept_id = ''
                if (!node.filePath) {
                    dept_id = node.id
                } else {
                    dept_id = node.id
                }
                this.GET_CHILDITEMINDEXBYMRATTR({
                    DEPT_ID: dept_id,
                    UserID: this.loginUserId.UserId,
                    tag: node.Tag
                }).then((res) => {
                    if (res.code === 1) {
                        node.children = res.values
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
                    this.DOCTOR_CANCEL_CHECKBTN({
                        Listmrcode
                    }).then((res) => {
                        this.get_GetInformation()
                    })
                }
            },
            // 移动模板
            handleCopyClicFn() {
                this.copyType = 0
                if (this.multipleSelection.length == 0) {
                    this.$message('请先至少选择一个模板进行操作')
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
                this.DOCTORCHILDGETSYSWORK(param).then(res => {
                    if (res.code == 5) {
                        this.copyShow = true
                        this.Fames = '移动模板'
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
            // 审核模板
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
                    this.DOCTOR_CHECKBTN({
                        Listmrcode
                    }).then((res) => {
                        this.get_GetInformation()
                    })
                }
            },
            handleClick(tab, event) {
                // tabs切换事件
            },
            handleitem(val) {
                // 点击每个li
                const newSysData = []
                this.syData.forEach((el) => {
                    el.flag = false
                    newSysData.push(el)
                })
                newSysData.forEach((element) => {
                    if (element == val) {
                        element.flag = true
                    }
                })
                this.syData = newSysData
            },
            handleTempSort() {
                // 模板排序
                if (this.tableData.length == 0) {
                    this.$message('请选择节点')
                    return
                }
                this.sortShow = true
            },
            handleTempQ() {
                // 模板查询
                if (this.form.selectName == '') {
                    this.$message({
                        type: 'warning',
                        message: '请输入模板名称!'
                    })
                    return null
                }
                const params = {
                    plateName: encodeURI(this.form.selectName.trim()),
                    cbWoman: this.form.checkList.indexOf('woman') > -1 ? '1' : '0',
                    cbMan: this.form.checkList.indexOf('man') > -1 ? '1' : '0',
                    cbTY: this.form.checkList.indexOf('ty') > -1 ? '1' : '0',
                    pageSize: this.paginationInfo.pageSize,
                    pageNos: this.paginationInfo.currentPage
                }
                this.DOCTOR_GETINFOLISTBYSELECT(params).then((res) => {
                    this.paginationInfo.total = res.values.total
                    this.tableData = res.values.values
                })
            },
            handleAllSelection() {
                // 全选
                this.$refs.multipleTable.toggleAllSelection()
            },
            handleClickSort() {
                // 排序
                this.sortShow = true
            },
            handleAdd() {
                // 新增
                this.dailogType = 1
                if (!this.currentTreeNode) {
                    this.$message('请选择节点')
                    return
                }
                let params = {
                    deptId: this.currentTreeNode.code,
                    workbenchID: this.workStationID,
                    userid: this.loginUserId.UserId
                }
                // 权限
                this.DOCTORCHILDGETSESSIONRESULT(params).then(res => {
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
                            this.currentTreeNode.id == 'MC' || this.currentTreeNode.code == 'MA' ||
                            this.currentTreeNode.code == 'MB' || this.currentTreeNode.code == 'MC') {
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
            // 打开新增模板
            openDialog() {
                this.show = true
                if (this.currentTreeNode.code == "MA") {
                    this.tpck = "MA"
                } else if (this.currentTreeNode.code == "MB") {
                    this.tpck = "MB"
                } else if (this.currentTreeNode.code == "MC" || this.currentTreeNode.id == "MC") {
                    this.tpck = "MC"
                } else {
                    this.tpck = "MS"
                }
            },
            handleUpdate(obj) {
                // 修改模板
                console.log(obj)
                let param = {
                    message: encodeURI('修改'),
                    Mr_Deptid: obj.DEPT_ID,
                    CreatorID: obj.CREATOR_ID,
                    UserId: this.loginUserId.UserId,
                    workbenchID: this.workStationID
                }
                // 权限
                this.DOCTORCHILDGETSYSWORK(param).then(res => {
                    if (res.code == 5) {
                        this.dailogType = 2
                        if (this.currentTreeNode.code == "MA") {
                            this.tpck = "MA"
                        } else if (this.currentTreeNode.code == "MB") {
                            this.tpck = "MB"
                        } else if (this.currentTreeNode.code == "MC" || this.currentTreeNode.id == "MC") {
                            this.tpck = "MC"
                        } else {
                            this.tpck = "MS"
                        }
                        let params = {
                            code: obj.MR_CODE
                        }
                        this.GET_DOCTORITEMINDEXBYMRCODE(params).then((res) => {
                            this.editRes = res.values[0]
                            this.show = true
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
            handleDele() {
                // 删除模板
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
                    this.DOCTORCHILDGETDELETESYS(param).then(res => {
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
                                        let param =
                                            item.MR_CODE
                                        Listmrcode.push(param)
                                        param = Listmrcode
                                    })
                                    this.DOCTOR_BTNDELETETEMPLATE({
                                        Listmrcode
                                    }).then((res) => {
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
            handleClickEidt() {
                // 编辑模板
                this.afterStatus = true
                this.beforeStatus = false
            },
            handleSelectionChange(val) {
                this.multipleSelection = val
            },
            handleCloseRightClickDailog() {
                this.RightShow = false
                this.get_GetSyInformation()
            },
            handleCloseDailog() {
                // 关闭弹窗
                this.show = false
                this.get_GetInformation()
            },
            handleClickFn() {},
            handleCloseSortDailog() {
                this.sortShow = false
                this.get_GetInformation()
            },
            handleCloseCopyDailog() {
                this.copyShow = false
            },
            handleUpdateTree(ndd) {
                if (!ndd) {
                    return
                }
                if (ndd.Tag == this.currentTreeNode.Tag && ndd.label == this.currentTreeNode.label) {
                    this.handleModuleNodeClick(ndd)
                    this.currentTreeNode = ndd
                    this.get_GetInformation()
                }
            },
            handleClickCopy() {
                // 复制模板
                this.copyType = 1
                if (this.multipleSelection.length == 0) {
                    this.$message('请先至少选择一个模板进行操作')
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
                this.DOCTORCHILDGETSYSWORK(param).then(res => {
                    if (res.code == 5) {
                        this.copyShow = true
                        this.Fames = '复制模板'
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
            // ---------------------------------------------------左边模板树查询功能
            filterNode(value, data) {
                if (!value) return true
                return data.label.indexOf(value) !== -1
            },
            handleSearch() {
                this.$refs.tempTree.filter(this.form.searchval)
            },
            backprevstep() {
                // 返回
                this.afterStatus = false
                this.beforeStatus = true
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`)
                this.paginationInfo.pageSize = val
                this.get_GetInformation()
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`)
                this.paginationInfo.currentPage = val
                this.get_GetInformation()
            },
        }
    }
</script>

<style lang="scss" scoped>
    .el-table {
        cursor: pointer;
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

    .imgBtnBox {
        margin-bottom: 15px;
        
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

    .ypboxL {
        height: calc(100vh - 450px);
        border: 1px solid #ebeef5;
        overflow-y: auto;
    }

    .self-form-item {
        white-space: nowrap;
        overflow-x: scroll;
        padding-bottom: 10px;
    }

    .insert-panel {
        border: 1px solid #ebeef5;
        height: 15vh;
    }

    .ul {
        border: 1px solid #e6e6e6;
        // height: 75vh;
        overflow-y: auto;
    }

    .ul>li {
        height: 30px;
        border-bottom: 1px solid #e6e6e6;
        line-height: 30px;
        padding-left: 15px;
    }

    .bgclass {
        background-color: #44B3C7;
        color: white;
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

    .word-content,
    .word-relation {
        height: 60vh;
        border: 1px solid #e6e6e6;
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
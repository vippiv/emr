<template>
    <div class="sync-manage-datatpl">
        <!-- <h1 class="ck-subnav-caption">数据组与模板</h1> -->
        <div class="top-btn">
            <!-- <el-button type="primary" size="mini">刷新</el-button> -->
            <el-button @click="newadd" type="primary" size="small">新增</el-button>
        </div>
        <el-table height="calc(100% - 73px)" :data="tableData" border style="width: 100%;" size="mini" @row-dblclick="handleMaintable" v-loading="loading" highlight-current-row>
            <el-table-column type="index" width="50" label="序号" align="center"></el-table-column>
            <el-table-column prop="FILEITEMID" label="模板ID" align="center"></el-table-column>
            <el-table-column prop="FILEITEMNAME" label="模板" align="center"></el-table-column>
            <el-table-column prop="DICTID" label="数据组ID" align="center"></el-table-column>
            <el-table-column prop="DICTNAME" label="数据组" align="center"></el-table-column>
            <el-table-column fixed="right" label="操作" width="200" align="center">
                <template slot-scope="scope">
                    <el-button @click="handledelete(scope.row)" type="primary" size="mini">删除</el-button>
                    <el-button @click="handleedit(scope.row)" type="primary" size="mini">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div style="position:absolute;bottom:0px;right:15px;left:15px;">
            <div class="pagination-pannel">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="paginationInfo.currentPage" :page-sizes="paginationInfo.pageSizes" :page-size="paginationInfo.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="paginationInfo.total"></el-pagination>
            </div>
        </div>

        <el-dialog class="dialog-box" title="数据组与模板" :visible.sync="dialogFormVisible" width="450px" :close-on-click-modal="false">
            <el-form class="form-dailog" :model="form" label-width="80px">
                <el-row>
                    <el-col :span="19">
                        <el-form-item label="模板">
                            <el-input v-model="form.FILEITEMNAME" autocomplete="off" size="small" :disabled="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-button @click="mbquery" class="mb-btn" type="primary" size="small" :disabled="isbtn">查询</el-button>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="19">
                        <el-form-item label="数据组">
                            <el-input v-model="form.DICTNAME" autocomplete="off" size="small" :disabled="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-button @click="sjzquery" class="mb-btn" type="primary" size="small" :disabled="isbtn">查询</el-button>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false" size="small">取 消</el-button>
                <el-button type="primary" @click="saveData" size="small" :disabled="isdailogbtn">确 定</el-button>
            </div>
            <!-- 模板目录 -->
            <el-dialog width="450px" title="模板目录查询" :visible.sync="mbmlVisible" append-to-body :close-on-click-modal="false" @close='handlecloseMBML'>
                <el-row style="line-height:2.3;margin-bottom:15px;">
                    <el-col :span="12">
                        <el-radio-group v-model="radiotop">
                            <el-radio :label="0">名称(&M)</el-radio>
                            <el-radio :label="1">编码(&C)</el-radio>
                        </el-radio-group>
                    </el-col>
                    <el-col :span="11" :offset="1">
                        <el-input v-model="mbmlinput" autocomplete="off" size="small" @keyup.enter.native="onSubmit">
                            <template slot="append">
                                <el-button type="primary" @click="onSubmit">查询</el-button>
                            </template>
                        </el-input>
                    </el-col>
                </el-row>
                <el-table :data="tablesonData" border style="width: 100%" size="mini" height="300" @row-dblclick="handleml" highlight-current-row>
                    <el-table-column prop="LIST_NAME" label="模板名称" align="center"></el-table-column>
                    <el-table-column prop="LIST_CODE" label="模板编码" align="center"></el-table-column>
                </el-table>
                <el-row style="margin-top:15px;">
                    <el-col :span="24">
                        <el-radio-group v-model="radiobottom">
                            <el-radio :label="1">精确查询</el-radio>
                            <el-radio :label="0">模糊查询</el-radio>
                        </el-radio-group>
                    </el-col>
                </el-row>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="mbmlVisible = false" size="small">取 消</el-button>
                    <el-button type="primary" @click="mbmlVisible = false" size="small" :disabled="true">确定</el-button>
                </div>
            </el-dialog>
            <!-- 数据组查询 -->
            <el-dialog width="400px" title="数据组查询" :visible.sync="sjzVisible" append-to-body :close-on-click-modal="false" @close='handleclosedatagroup'>
                <el-form class="form-dailog" :model="form" label-width="100px" size="small">
                    <el-row>
                        <el-col :span="19">
                            <el-form-item label="数据组名称">
                                <el-input v-model="dataGroputInput" autocomplete="off" size="small"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-button @click="handleDataGroup" style="margin-left:20px;float:right;" type="primary" size="small">查询</el-button>
                        </el-col>
                    </el-row>
                </el-form>
                <div style="height:30vh;overflow-y:auto;">
                    <el-tree ref="tree" :data="treedata" :props="defaultProps" :filter-node-method="filterNode" @node-click="handleNodeClick" @dblclick.native="setData"></el-tree>
                </div>

                <div slot="footer" class="dialog-footer">
                    <el-button @click="sjzVisible = false" size="small">取 消</el-button>
                    <el-button type="primary" @click="sjzVisible = false" size="small" :disabled="true">确定</el-button>
                </div>
            </el-dialog>
        </el-dialog>
    </div>
</template>

<script type="text/javascript">
    import {
        mapActions
    } from 'vuex'

    export default {
        name: 'SyncManageDataTpl',
        data() {
            return {
                dataGroputInput: '',
                inputTemplData: {
                    // 模板
                    FILEITEMID: '',
                    FILEITEMNAME: ''
                },
                inputSjzData: {
                    // 数据组
                    DICTID: '',
                    DICTNAME: ''
                },
                btnType: 0,
                loading: true,
                tableData: [],
                tablesonData: [],
                treedata: [],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                tableHeight: 0,
                isbtn: false,
                dialogFormVisible: false,
                mbmlVisible: false,
                sjzVisible: false,
                isdailogbtn: false,
                mbmlinput: '',
                radiotop: 0,
                radiobottom: 0, //模糊查询
                form: {
                    FILEITEMNAME: '',
                    DICTNAME: ''
                },
                rowId: '',
                paginationInfo: {
                    // 分页
                    currentPage: 1,
                    total: 0,
                    pageSizes: [20, 30, 40],
                    pageSize: 20
                },
                time: null,
                currentTreeData: {}
            }
        },
        created() {
            this.getData()
        },
        mounted() {
            this.$nextTick(() => {
                // this.tableHeight = document.documentElement.clientHeight - '254'
            })
        },
        methods: {
            ...mapActions([
                'GET_DATAGROUP_AND_TPL',
                'GET_TemplateCatalogAPI',
                'GET_GetDataGroupAll',
                'GET_DatasetTemplateSave',
                'DelDatasetTemplate'
            ]),
            handlecloseMBML() { //模板目录关闭弹窗前的操作
                this.mbmlinput = ''
                this.radiotop = 0
                this.radiobottom = 0 //模糊查询
            },
            handleclosedatagroup() { //数据组弹窗关闭前的操作
                this.dataGroputInput = ''
            },
            handleDataGroup() { //数据组查询-input查询
                this.$refs.tree.filter(this.dataGroputInput);
            },
            filterNode(value, data) {
                if (!value) return true;
                return data.label.indexOf(value) !== -1;
            },
            newadd() {
                // 新增
                this.form.FILEITEMNAME = ''
                this.form.DICTNAME = ''
                this.isbtn = false
                this.isdailogbtn = false
                this.dialogFormVisible = true
                this.btnType = 0
            },
            handleedit(val) {
                // 编辑
                this.btnType = 1
                this.isbtn = false
                this.isdailogbtn = false
                // console.log(val)
                this.inputTemplData.FILEITEMID = val.FILEITEMID // 模板ID
                this.inputTemplData.FILEITEMNAME = val.FILEITEMNAME // 模板名称
                this.inputSjzData.DICTID = val.DICTID // 数据组ID
                this.inputSjzData.DICTNAME = val.DICTNAME // 数据组
                this.form.FILEITEMNAME = val.FILEITEMNAME // 模板
                this.form.DICTNAME = val.DICTNAME // 数据组
                this.rowId = val.ID
                this.dialogFormVisible = true
            },
            handledelete(val) {
                // 删除
                const param = {
                    keyID: val.ID
                }
                this.$confirm('您确定要删除当前选中的数据?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    })
                    .then(() => {
                        this.DelDatasetTemplate(param).then((res) => {
                            if (res.code == 1) {
                                this.$message.success(res.msg)
                                this.getData()
                            }
                        })
                    })
                    .catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        })
                    })
            },
            mbquery() {
                // 模板目录查询
                this.getMbData()
                this.mbmlVisible = true
            },
            sjzquery() {
                // 数据组查询
                this.getTreeData()
                this.sjzVisible = true
            },
            setData() {
                // 双击填充数据
                clearTimeout(this.time) // 首先清除计时器
                this.form.DICTNAME = this.currentTreeData.label
                this.inputSjzData.DICTID = this.currentTreeData.id // 数据组ID
                this.inputSjzData.DICTNAME = this.currentTreeData.label // 数据组
                this.sjzVisible = false
            },
            handleNodeClick(data) {
                clearTimeout(this.time) // 首先清除计时器
                this.time = setTimeout(() => {
                    console.log(data)
                    this.currentTreeData = data
                })
            },
            handleMaintable(row, column, event) {
                console.log(row)
                // 主表双击
                this.isbtn = true
                this.isdailogbtn = true
                this.form.FILEITEMNAME = row.FILEITEMNAME // 模板
                this.form.DICTNAME = row.DICTNAME // 数据组
                this.dialogFormVisible = true
            },
            handleml(row, column, event) {
                // 双击模板目录
                console.log(row)
                this.form.FILEITEMNAME = row.LIST_NAME // 模板
                this.inputTemplData.FILEITEMID = row.LIST_CODE // 模板ID
                this.inputTemplData.FILEITEMNAME = row.LIST_NAME // 模板名称
                this.mbmlVisible = false
            },
            getData() {
                const params = {
                    pageSize: this.paginationInfo.pageSize,
                    pageNos: this.paginationInfo.currentPage
                }
                console.log(params)
                this.GET_DATAGROUP_AND_TPL(params).then((res) => {
                    const result = res.values
                    if (res.code == 1) {
                        this.loading = false
                        this.paginationInfo.total = result.total
                        this.tableData = result.values
                    }
                })
            },
            getMbData() {
                // 获取模板目录数据
                const parmas = {
                    r: this.radiotop,
                    i: this.radiobottom,
                    txtInputs: this.mbmlinput
                }
                console.log(parmas)
                this.GET_TemplateCatalogAPI(parmas).then((res) => {
                    console.log(res)
                    if (res.code == 1) {
                        this.tablesonData = res.values
                    }
                })
            },
            onSubmit() {
                this.getMbData()
            },
            getTreeData() {
                // 获取数据组数据
                this.GET_GetDataGroupAll().then((res) => {
                    // console.log(res)
                    if (res.code == 1) {
                        this.treedata = res.values
                    }
                })
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`)
                this.paginationInfo.pageSize = val
                this.getData()
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`)
                this.paginationInfo.currentPage = val
                this.getData()
            },
            saveData() {
                // 保存数据
                console.log(this.form)
                if (this.form.FILEITEMNAME == '' || this.form.DICTNAME == '') {
                    this.$message({
                        message: '请填写完整信息!',
                        type: 'warning'
                    })
                    return null
                }
                let id = ''
                if (this.btnType == 0) {
                    id = 0
                } else {
                    id = this.rowId
                }
                const data = {
                    ID: id,
                    FILEITEMID: this.inputTemplData.FILEITEMID,
                    FILEITEMNAME: this.inputTemplData.FILEITEMNAME,
                    DICTID: this.inputSjzData.DICTID,
                    DICTNAME: this.inputSjzData.DICTNAME,
                    FLAG: 0
                }
                console.log(data)
                this.GET_DatasetTemplateSave(data).then((res) => {
                    console.log(res)
                    if (res.code == 1) {
                        this.$message.success(res.msg)
                        this.dialogFormVisible = false
                        this.getData()
                    }
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
    .sync-manage-datatpl {
        height: 100%;

        .top-btn {
            margin-bottom: 5px;
            background: white;
            height: 55px;
            line-height: 4;
            padding-left: 15px;
        }

        .mb-btn {
            margin-left: 20px;
            margin-top: 4px;
        }

        .pagination-pannel {
            text-align: right;
            margin-top: 10px;
            background: white;
            height: 45px;
            display: flex;
            align-items: center;
            justify-content: flex-end;
        }
    }

    * {
        touch-action: none;
    }
</style>
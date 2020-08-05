<template>
    <div class="sync-manage-datatpl">
        <!-- <h1 class="ck-subnav-caption">用户同步信息</h1> -->
        <el-row>
            <el-col :span="24" class="top-btn">
                <el-button @click="saveData" type="primary" size="small">保存数据</el-button>
            </el-col>
        </el-row>
        <!-- <el-row>
            <el-col :span="5" class="title">
                <span>{{titletext}}</span>
            </el-col>
        </el-row> -->
        <el-row :gutter="18">
            <el-col :span="4">
                <div class="title">{{titletext}}</div>
                <el-tree style="height:calc(100vh - 260px);overfow:hidden;;overflow-y:auto;" :data="treeData" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
            </el-col>
            <el-col :span="20">
                <el-table height="calc(100vh - 280px)" ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" border size="small" @row-dblclick="handleMaintable" v-loading="loading" :row-key="getRowKeys">
                    <el-table-column type="selection" width="55" :reserve-selection="true"></el-table-column>
                    <el-table-column prop="NOTES" label="注释" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="OLDITEMNAME" label="原始模板" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="OLDDICTNAME" label="原始数据" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="NEWITEMNAME" label="新建模板" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="NEWITEMNAME" label="新建数据组" show-overflow-tooltip></el-table-column>
                </el-table>
                <!-- 分页 -->
                <div class="pagination-pannel">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="paginationInfo.currentPage" :page-sizes="paginationInfo.pageSizes" :page-size="paginationInfo.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="paginationInfo.total"></el-pagination>
                </div>
            </el-col>
        </el-row>
        <!-- 弹窗 -->
        <el-dialog title="用户同步信息" :visible.sync="dialogTableVisible" width="40%">
            <el-form ref="form" :model="form" label-width="100px" size="small">
                <el-row type="flex" justify="center">
                    <el-col :span="11">
                        <el-form-item label="新建模板">
                            <el-input v-model="form.newtempalte" :disabled="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" :offset="2">
                        <el-form-item label="原始模板">
                            <el-input v-model="form.oldtemplate" :disabled="true"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item label="新建数据组">
                            <div class="ulbox">
                                <div>{{form.newsjz}}</div>
                            </div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" :offset="2">
                        <el-form-item label="原始数据组">
                            <div class="ulbox">
                                <div>{{form.oldsjz}}</div>
                            </div>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="注释">
                            <el-input v-model="form.notes" :disabled="true"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item label="关系" prop="relations">
                            <el-input v-model="form.relations" :disabled="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" :offset="2">
                        <el-form-item prop="textrelations">
                            <el-input v-model="form.textrelations" type="textarea" :disabled="true" :rows="6"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </el-dialog>
    </div>
</template>

<script type="text/javascript">
    import {
        mapActions
    } from 'vuex'

    export default {
        name: 'userInfoSync',
        data() {
            return {
                loading: true,
                tableData: [],
                workAndDoctorID: [],
                multipleSelection: [],
                dialogTableVisible: false,
                titletext: '',
                treeData: [],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                form: {
                    newtempalte: '',
                    oldtemplate: '',
                    notes: '',
                    relations: '',
                    textrelations: '',
                    newsjz: '',
                    oldsjz: ''
                },
                paginationInfo: {
                    // 分页
                    currentPage: 1,
                    total: 0,
                    pageSizes: [20, 30, 40],
                    pageSize: 20
                },
                currentGetData: null,
                btnType: 0
            }
        },
        created() {
            this.get_GetSyInformation()
            this.getSyUserPnode()
        },
        mounted() {},
        methods: {
            ...mapActions([
                'GET_GetSyInformation',
                'GetSyUserPnode',
                'GetWorkBenchSync',
                'GetSysTuserSyncByUserId',
                'InsertWorkBenchSync',
                'InsertSysTuserSync'
            ]),
            saveData() {
                // 保存数据
                let param = null
                const saveEntity = []
                if (this.multipleSelection.length == 0) {
                    this.$message.warning('请至少选中一条记录保存!')
                    return null
                }
                this.multipleSelection.forEach(element => {
                    if (this.btnType == 0) {
                        param = {
                            ID: 0,
                            SYNCHRONIZEID: element.ID,
                            SYNCHRONIZENAME: element.NOTES,
                            WORKBENCHID: this.currentGetData.id,
                            WORKBENCHNAME: this.currentGetData.label
                        }
                    } else {
                        param = {
                            ID: 0,
                            SYNCHRONIZEID: element.ID,
                            SYNCHRONIZENAME: element.NOTES,
                            USERID: this.currentGetData.USER_CODE,
                            USERNAME: this.currentGetData.label
                        }
                    }
                    saveEntity.push(param)
                })
                if (this.btnType == 0) {
                    // 工作台
                    this.InsertWorkBenchSync(saveEntity).then(res => {
                        if (res.code == 1) {
                            this.$message.success(res.msg)
                        }
                    })
                } else {
                    // 用户
                    this.InsertSysTuserSync(saveEntity).then(res => {
                        if (res.code == 1) {
                            this.$message.success(res.msg)
                        }
                    })
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val
            },
            handleNodeClick(val) {
                this.currentGetData = val
                if (val.children) {
                    // 根据工作站台Id
                    this.getWorkBenchSync(val.id)
                    this.btnType = 0
                } else {
                    // 根据用户信息
                    this.getSysTuserSyncByUserId(val.USER_CODE)
                    this.btnType = 1
                }
                this.titletext = val.label
            },
            get_GetSyInformation() {
                const params = {
                    pageSize: this.paginationInfo.pageSize,
                    pageNos: this.paginationInfo.currentPage
                }
                this.GET_GetSyInformation(params).then(res => {
                    if (res.code == 1) {
                        this.loading = false
                        this.paginationInfo.total = res.values.total
                        this.tableData = res.values.values
                        if (this.workAndDoctorID != '') {
                            this.setSelectedData()
                        }
                    }
                })
            },
            handleSizeChange(val) {
                this.paginationInfo.pageSize = val
                this.get_GetSyInformation()
            },
            handleCurrentChange(val) {
                this.paginationInfo.currentPage = val
                this.get_GetSyInformation()
            },
            getSyUserPnode() {
                // 获取医生站台和站台内医生
                this.GetSyUserPnode().then(res => {
                    if (res.code == 1) {
                        this.treeData = res.values
                    }
                })
            },
            handleMaintable(row, column, event) {
                // 双击表格
                this.form.newtempalte = row.NEWITEMNAME
                this.form.oldtemplate = row.OLDITEMNAME
                this.form.relations = row.NEWDICTNAME
                this.form.textrelations = row.OLDDICTNAME
                this.form.newsjz = row.NEWDICTNAME
                this.form.oldsjz = row.OLDITEMNAME
                this.form.notes = row.NOTES
                this.dialogTableVisible = true
            },
            getWorkBenchSync(val) {
                // 根据工作台编码获取工作台同步信息
                const param = {
                    WORKBENCHID: val
                }
                this.GetWorkBenchSync(param).then(res => {
                    if (res.code == 1) {
                        this.workAndDoctorID = res.values
                        this.setSelectedData()
                    }
                })
            },
            setSelectedData() {
                // 设置选中数据
                this.$refs.multipleTable.clearSelection() // 清空上次选中的数据
                this.workAndDoctorID.forEach((ele, key) => {
                    this.tableData.forEach((element, index) => {
                        if (ele.SYNCHRONIZEID == element.ID) {
                            this.$refs.multipleTable.toggleRowSelection(this.tableData[index])
                        }
                    })
                })
            },
            getSysTuserSyncByUserId(val) {
                // 根据用户ID获取用户同步信息
                const param = {
                    userId: val
                }
                this.GetSysTuserSyncByUserId(param).then(res => {
                    if (res.code == 1) {
                        this.workAndDoctorID = res.values
                        this.setSelectedData()
                    }
                })
            },
            getRowKeys(row) {
                return row.ID
            }
        }
    }
</script>
<style lang="scss" scoped>
    .sync-manage-datatpl {
        height: 100%;
    }

    .top-btn {
        margin-bottom: 5px;
        background: white;
        height: 55px;
        line-height: 4;
        padding-left: 15px;
    }

    .title {
        text-align: center;
        height: 40px;
        line-height: 40px;
        // background: white;
    }

    .ulbox {
        height: 60px;
        border: 1px solid #828790;
        height: 230px;
        overflow-y: auto;
    }

    /deep/ .el-checkbox__input.is-checked .el-checkbox__inner {
        background-color: #ff8c00;
        border-color: #ff8c00;
    }

    /deep/ .el-checkbox__input .el-checkbox__inner:hover {
        border-color: #ff8c00;
    }

    /deep/ .el-checkbox__input.is-checked .el-checkbox__inner,
    /deep/.el-checkbox__input.is-indeterminate .el-checkbox__inner {
        background-color: #ff8c00;
        border-color: #ff8c00;
    }

    /deep/ .el-checkbox__input.is-focus .el-checkbox__inner {
        border-color: #ff8c00;
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
</style>
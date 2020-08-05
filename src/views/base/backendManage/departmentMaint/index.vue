<template>
    <div class="department-maint">
        <!-- <h1 class="ck-subnav-caption">科室维护</h1> -->
        <div class="top-btn">
            <el-button @click="handleadd" type="primary" size="small" style="margin-bottom:15px;">新增</el-button>
        </div>
        <el-table :data="tableData" border style="width: 100%" @row-dblclick="handletable" size="mini" height="calc(100vh - 230px)" v-loading="loading" highlight-current-row>
            <el-table-column fixed prop="DEPT_ID" label="部门编号" align="center"></el-table-column>
            <el-table-column prop="DEPT_NAME_CN" label="部门中文名车" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="DEPT_TYPE" label="部门类别" align="center"></el-table-column>
            <el-table-column prop="DEPT_GROUP" label="部门分组" align="center"></el-table-column>
            <el-table-column prop="DEPT_ATTR" label="部门属性" align="center"></el-table-column>
            <el-table-column prop="LIMIT_DOC_GROUP" label="限制医生组" align="center"></el-table-column>
            <el-table-column prop="FLAG" label="科内转诊标志" align="center"></el-table-column>
            <el-table-column fixed="right" label="操作" align="center">
                <template v-slot="scope">
                    <el-button @click="handledel(scope.row)" type="primary" size="mini">删除</el-button>
                    <el-button @click="handleedit(scope.row)" type="primary" size="mini">修改</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div style="position:absolute;bottom:0px;right:15px;left:15px;">
            <div class="pagination-pannel">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="paginationInfo.currentPage" :page-sizes="paginationInfo.pageSizes" :page-size="paginationInfo.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="paginationInfo.total"></el-pagination>
            </div>
        </div>
        <!-- 弹窗 -->
        <departmentMaintDailog :show.sync="show" v-if="show" :currentdata="currentRow" :btntype="btntype" @handleRefresh="handleRefresh"></departmentMaintDailog>
    </div>
</template>
<script>
    import {
        mapActions
    } from 'vuex'
    import departmentMaintDailog from '@/views/base/backendManage/departmentMaint/departmentMaintDailog'

    export default {
        name: 'departmentMaint',
        components: {
            departmentMaintDailog
        },
        data() {
            return {
                loading: true,
                btntype: 0, // 按钮操作类型
                show: false,
                tableData: [],
                currentRow: {},
                paginationInfo: {
                    // 分页
                    currentPage: 1,
                    total: 0,
                    pageSizes: [20, 30, 40],
                    pageSize: 20
                }
            }
        },
        created() {
            this.getDepartmentAll()
        },
        methods: {
            ...mapActions(['GET_GetDepartmentAll', 'DeleDepartmentByDeptid']),
            handleRefresh() {
                // 刷新
                this.getDepartmentAll()
            },
            handletable(row, column, event) {
                // 双击表格
                console.log(row)
                this.btntype = 3
                this.currentRow = row
                this.show = true
            },
            getDepartmentAll() {
                // 获取所有科室信息
                const params = {
                    pageSize: this.paginationInfo.pageSize,
                    pageNos: this.paginationInfo.currentPage
                }
                this.GET_GetDepartmentAll(params).then((res) => {
                    if (res.code == 1) {
                        this.loading = false
                        this.paginationInfo.total = res.values.total
                        this.loading = false
                        this.tableData = res.values.values
                    }
                })
            },
            handleadd() {
                // 新增
                this.btntype = 1
                this.show = true
            },
            handleedit(val) {
                // 修改
                this.currentRow = val
                this.btntype = 2
                this.show = true
            },
            handledel(val) {
                console.log(val)
                const parma = {
                    deptid: val.DEPT_ID
                }
                this.$confirm('您确定要删除?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    })
                    .then(() => {
                        this.DeleDepartmentByDeptid(parma).then((res) => {
                            if (res.code == 1) {
                                this.$message.success(res.msg)
                                this.getDepartmentAll()
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
            handleSizeChange(val) {
                this.paginationInfo.pageSize = val
                this.getDepartmentAll()
            },
            handleCurrentChange(val) {
                this.paginationInfo.currentPage = val
                this.getDepartmentAll()
            }
        }
    }
</script>
<style lang="scss" scoped>
    .department-maint {
        height: 100%;
        .top-btn {
            margin-bottom: 5px;
            background: white;
            height: 55px;
            line-height: 4;
            padding-left: 15px;
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
</style>
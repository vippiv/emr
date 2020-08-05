<template>
    <div class="sync-manage-datatpl">
        <!-- <h1 class="ck-subnav-caption">码表浏览</h1> -->
        <el-row :gutter="10">
            <el-col :span="4">
                <el-tree ref="tree" class="tree-pannel" :data="treeData" :props="defaultProps" @node-click="handleNodeClick" highlight-current node-key="id"></el-tree>
            </el-col>
            <el-col :span="20">
                <el-table :data="tableData" border height="calc(100vh - 185px)" style="width: 100%;" size="small" v-loading="loading">
                    <el-table-column type="index" width="80" label="序号" align="center"></el-table-column>
                    <el-table-column prop="CODE_NAME" label="名称" align="center"></el-table-column>
                    <el-table-column prop="SHORT_CODE" label="输入码" align="center"></el-table-column>
                    <el-table-column prop="CODE_DESC" label="描述" align="center"></el-table-column>
                    <el-table-column prop="DEFUNCT_IND" label="状态" align="center"></el-table-column>
                </el-table>
                <!-- 分页 -->
                <div class="pagination-pannel">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="paginationInfo.currentPage" :page-sizes="paginationInfo.pageSizes" :page-size="paginationInfo.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="paginationInfo.total"></el-pagination>
                </div>
            </el-col>
        </el-row>
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
                treeData: [],
                loading: true,
                gCode: '',
                paginationInfo: {
                    // 分页
                    currentPage: 1,
                    total: 0,
                    pageSizes: [20, 30, 40],
                    pageSize: 20
                },
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                tableData: []
            }
        },
        created() {
            this.getTBaseCodeList()
        },
        methods: {
            ...mapActions(['GetTBaseCodeList', 'GetTBaseCodeInfo']),
            getTBaseCodeList() {
                // 获取码表列表
                this.GetTBaseCodeList().then((res) => {
                    if (res.code == 1) {
                        this.treeData = res.values
                        this.gCode = this.treeData[0].id
                        this.$nextTick(() => {
                            this.$refs.tree.setCurrentKey(this.treeData[0].id)
                        })

                        this.getTBaseCodeInfo(this.treeData[0].id)
                    }
                })
            },
            handleNodeClick(data) {
                console.log(data)
                this.getTBaseCodeInfo(data.id)
            },
            getTBaseCodeInfo(val) {
                // 获取码表详情
                const param = {
                    code: val,
                    pageSize: this.paginationInfo.pageSize,
                    pageNos: this.paginationInfo.currentPage
                }
                this.GetTBaseCodeInfo(param).then((res) => {
                    if (res.code == 1) {
                        this.loading = false
                        this.paginationInfo.total = res.values.total
                        this.tableData = res.values.values
                    }
                })
            },
            handleSizeChange(val) {
                // 改变当前页数据条数
                this.paginationInfo.pageSize = val
                this.getTBaseCodeInfo(this.gCode)
            },
            handleCurrentChange(val) {
                // 改变当前页
                this.paginationInfo.currentPage = val
                this.getTBaseCodeInfo(this.gCode)
            }
        }
    }
</script>
<style lang="scss" scoped>
    .sync-manage-datatpl {
        height: 100%;
        .tree-pannel {
            border: 1px solid #c0c0c0;
            overflow-y: auto;
            // height: 65vh;
            height: calc(100vh - 130px);
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

    /deep/.el-tree-node.is-current>.el-tree-node__content {
        background-color: #44b3c7;
        color: white;
    }
</style>
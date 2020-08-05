<template>
    <div class="temp-manage-unlock">
        <template>
            <el-table :data="tableData" height="250" border style="width: 100%">
                <el-table-column prop="date" label="文件编码">
                </el-table-column>
                <el-table-column prop="name" label="文件名">
                </el-table-column>
                <el-table-column prop="address" label="创建者">
                </el-table-column>
                <el-table-column prop="address" label="病人姓名">
                </el-table-column>
                <el-table-column prop="address" label="病人床号">
                </el-table-column>
                <el-table-column prop="address" label="科室">
                </el-table-column>
                <el-table-column prop="address" label="最后修改时间">
                </el-table-column>
                <el-table-column prop="address" label="解锁">
                </el-table-column>
            </el-table>
            <div style="text-align:right;margin-top:10px;">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="paginationInfo.currentPage" :page-sizes="paginationInfo.pageSizes" :page-size="paginationInfo.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="paginationInfo.total">
                </el-pagination>
            </div>
        </template>
    </div>
</template>

<script type="text/javascript">
    import {
        mapActions
    } from 'vuex'

    export default {
        name: 'tempManageUnlock',
        data() {
            return {
                tableData: [],
                // 分页
                paginationInfo: {
                    currentPage: 1,
                    total: 0,
                    pageSizes: [20, 30, 40],
                    pageSize: 20
                }
            }
        },
        created() {
            this.get_GetInformation()
        },
        methods: {
            ...mapActions(['GET_FILELIST']),
            get_GetInformation() {
                const params = {
                    pageSize: this.paginationInfo.pageSize,
                    pageNos: this.paginationInfo.currentPage
                }
                this.GET_FILELIST(params).then((res) => {
                    this.paginationInfo.total = res.values.total
                    this.tableData = res.values.values
                })
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
            }
        }
    }
</script>
<style lang="scss" scoped>
</style>
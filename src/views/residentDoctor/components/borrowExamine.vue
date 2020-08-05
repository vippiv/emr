<!-- 借阅审批 -->
<template>
    <div class="borrow-examine-container">
        <div>
            <el-button type="primary" size="mini" @click="handleAllRow">全选</el-button>
            <el-button type="primary" size="mini" @click="handleRefuse">拒绝</el-button>
            <el-button type="primary" size="mini" @click="handleApproval">审批</el-button>
        </div>
        <h2 style="margin:15px 0px;">病案借阅申请列表：</h2>
        <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" border height="600" size="mini" highlight-current-row>
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="APPLY_DATE" label="申请日期" align="center"></el-table-column>
            <el-table-column prop="VISIT_ID" label="病人ID" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="BORROW_DEPT" label="所属科室" align="center"></el-table-column>
            <el-table-column prop="PAT_NAME" label="姓名" align="center"></el-table-column>
            <el-table-column prop="GENDER" label="性别" align="center"></el-table-column>
            <el-table-column prop="BORROW_DOCTOR_NAME" label="申请医师" align="center"></el-table-column>
            <el-table-column prop="AIM" label="借阅目的" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="STOP_DATE" label="借阅期限" align="center"></el-table-column>
            <el-table-column prop="TIME_LIMIT_UNIT" label="期限单位" align="center"></el-table-column>
            <el-table-column prop="PATIENT_AGE" label="年龄" align="center"></el-table-column>
            <el-table-column prop="IN_TIMES" label="住院次" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="ADM_DATE" label="入院日" align="center"></el-table-column>
            <el-table-column prop="DISCHARGE_DATE" label="出院日" align="center"></el-table-column>
            <el-table-column prop="DEPT_NAME_CN" label="出院科室" align="center"></el-table-column>
        </el-table>
        <el-row style="margin-top:15px;">
            <el-col :span="3">
                审批人：
                <span>管理员</span>
            </el-col>
            <el-col :span="4">
                审批日期：
                <span>{{nows}}</span>
            </el-col>
            <el-col :span="17">
                <!-- 分页 -->
                <div style="text-align:right;">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="paginationInfo.currentPage" :page-sizes="paginationInfo.pageSizes" :page-size="paginationInfo.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="paginationInfo.total"></el-pagination>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script type="text/javascript">
    import moment from 'moment'
    import {
        createNamespacedHelpers,
        mapState
    } from 'vuex'
    const {
        mapActions
    } = createNamespacedHelpers('residentDoctor')
    export default {
        name: 'borrowExamine',
        data() {
            return {
                paginationInfo: {
                    // 分页
                    currentPage: 1,
                    total: 0,
                    pageSizes: [20, 30, 40],
                    pageSize: 20
                },
                tableData: [],
                multipleSelection: []
            }
        },
        computed: {
            nows() {
                return moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
            },
            ...mapState({
                userInfo: state => state.global.userInfo
            })
        },
        created() {
            this.spLoad()
        },
        methods: {
            ...mapActions(['SpLoad', 'CannotBtn', 'ApprovalBtn']),
            spLoad() {
                // 获取借阅审批数据
                let data = {
                    pageSize: this.paginationInfo.pageSize,
                    pageNos: this.paginationInfo.currentPage
                }
                this.SpLoad(data).then(res => {
                    if (res.code == 1) {
                        let result = res.values
                        this.paginationInfo.total = result.total
                        this.paginationInfo.currentPage = result.pageNos
                        this.tableData = result.values
                    }
                })
            },
            handleAllRow() {
                // 全选
                this.$refs.multipleTable.toggleAllSelection()
            },
            handleRefuse() {
                // 拒绝
                if (this.multipleSelection.length == 0) {
                    this.$message.warning('请选择要拒绝的数据!')
                    return
                }
                let data = []
                this.multipleSelection.forEach(item => {
                    let obj = {
                        ID: item.VISIT_ID,
                        InTimes: item.IN_TIMES,
                        BORROW_DOCTOR_id: item.BORROW_DOCTOR_id,
                        DENY_FLag: item.DENY_FLag,
                        BORROW_FLag: item.BORROW_FLag,
                        Approvelid: item.Approvelid
                    }
                    data.push(obj)
                })
                let lstObjP = data
                this.CannotBtn(lstObjP).then(res => {
                    if (res.code == 1) {
                        this.spLoad()
                        this.$message.success(res.msg)
                    }
                })
            },
            handleApproval() {
                console.log(this.userInfo)
                // 审批
                if (this.multipleSelection.length == 0) {
                    this.$message.warning('请选择要审批的数据!')
                    return
                }
                let data = []
                this.multipleSelection.forEach(item => {
                    let obj = {
                        Userid: this.userInfo.UserId,
                        ID: item.VISIT_ID,
                        InTimes: item.IN_TIMES,
                        BORROW_DOCTOR_id: item.BORROW_DOCTOR_id,
                        DENY_FLag: item.DENY_FLag,
                        BORROW_FLag: item.BORROW_FLag,
                        Approvelid: item.Approvelid
                    }
                    data.push(obj)
                })
                let lstObjP = data
                this.ApprovalBtn(lstObjP).then(res => {
                    if (res.code == 1) {
                        this.spLoad()
                        this.$message.success(res.msg)
                    }
                })
            },
            handleSelectionChange(val) {
                this.multipleSelection = val
            },
            handleSizeChange(val) {
                this.paginationInfo.pageSize = val
                this.spLoad()
            },
            handleCurrentChange(val) {
                this.paginationInfo.currentPage = val
                this.spLoad()
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>
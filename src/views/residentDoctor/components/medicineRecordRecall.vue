<!-- 召回 -->
<template>
    <div class="medicine-record-recall-container">
        <el-card shadow="never">
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane label="已归档病历申请召回" name="first">
                    <div>
                        <el-button @click="handleQuery" type="primary" size="mini">查询</el-button>
                        <el-button @click="handleAllApply" type="primary" size="mini">全部申请</el-button>
                    </div>
                    <el-form :model="form" :inline="true" size="mini" style="margin-top:15px;">
                        <el-form-item label="科室">
                            <el-input v-model="form.department" style="width:150px;" disabled></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="choosedepartment">选择</el-button>
                        </el-form-item>
                        <el-form-item label="住院号">
                            <el-input v-model="form.hospitalNo" style="width:150px;"></el-input>
                        </el-form-item>
                        <el-form-item label="病人姓名">
                            <el-input v-model="form.name" style="width:150px;"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-checkbox v-model="form.checked" style="margin-right:10px;">出院日期</el-checkbox>
                            <el-date-picker v-model="form.startDate" type="date" placeholder="选择日期" style="width:150px;" value-format="yyyy-MM-dd"></el-date-picker>
                            <span style="margin:0 8px;">-</span>
                            <el-date-picker v-model="form.endDate" type="date" placeholder="选择日期" style="width:150px;" value-format="yyyy-MM-dd"></el-date-picker>
                        </el-form-item>
                    </el-form>
                    <el-table :data="zhtableData" border style="width: 100%" highlight-current-row size="mini" height="540" @row-dblclick="handleDBtable">
                        <el-table-column prop="VISIT_NO" label="住院号" align="center"></el-table-column>
                        <el-table-column prop="In_Times" label="住院次" align="center"></el-table-column>
                        <el-table-column prop="PAT_NAME" label="姓名" align="center"></el-table-column>
                        <el-table-column prop="CODE_NAME" label="性别" align="center"></el-table-column>
                        <el-table-column prop="PATIENT_AGE" label="年龄" align="center"></el-table-column>
                        <el-table-column prop="PAT_BIRTHDATE" label="出生日期" align="center"></el-table-column>
                        <el-table-column prop="ADM_DATE" label="入院日期" align="center"></el-table-column>
                        <el-table-column prop="dept" label="住院科室" align="center"></el-table-column>
                        <el-table-column prop="DISCHARGE_DATE" label="出院日期" align="center"></el-table-column>
                        <el-table-column prop="INHOS_DOC" label="住院医生" align="center"></el-table-column>
                        <el-table-column prop="MAIN_DOC" label="主治医生" align="center"></el-table-column>
                        <el-table-column prop="CHIEF_DOC" label="主任医师" align="center"></el-table-column>
                    </el-table>
                    <!-- 分页 -->
                    <div style="text-align:right;margin-top:10px;">
                        <el-pagination @size-change="handleSizeChange($event,'0')" @current-change="handleCurrentChange($event,'0')" :current-page="paginationInfo.currentPage" :page-sizes="paginationInfo.pageSizes" :page-size="paginationInfo.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="paginationInfo.total"></el-pagination>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="已审批" name="second">
                    <div>
                        <el-button @click="handleYSPquery" type="primary" size="mini">查询</el-button>
                    </div>
                    <el-form :model="spform" :inline="true" size="mini" style="margin-top:15px;">
                        <el-form-item label="申请科室">
                            <el-input v-model="spform.department" style="width:150px;" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="住院号">
                            <el-input v-model="spform.hospitalNo" style="width:150px;"></el-input>
                        </el-form-item>
                        <el-form-item label="病人姓名">
                            <el-input v-model="spform.name" style="width:150px;"></el-input>
                        </el-form-item>
                    </el-form>
                    <el-table :data="sptableData" border style="width: 100%" highlight-current-row size="mini" height="589" @row-dblclick="handleDBtable">
                        <el-table-column prop="VISIT_ID" label="住院号" align="center"></el-table-column>
                        <el-table-column prop="IN_TIMES" label="住院次" align="center"></el-table-column>
                        <el-table-column prop="PAT_NAME" label="姓名" align="center"></el-table-column>
                        <el-table-column prop="BED_NO" label="床号" align="center"></el-table-column>
                        <el-table-column prop="CODE_NAME" label="性别" align="center"></el-table-column>
                        <el-table-column prop="Status" label="状态" align="center"></el-table-column>
                        <el-table-column prop="APPROVE_USER_NAME" label="审批人" align="center"></el-table-column>
                        <el-table-column prop="APPLY_USER_NAME" label="申请人" align="center"></el-table-column>
                        <el-table-column prop="APPLY_TIME_LIMIT" label="申请期限" align="center"></el-table-column>
                        <el-table-column prop="APPLY_REASON" label="申请事由" align="center"></el-table-column>
                    </el-table>
                    <!-- 分页 -->
                    <div style="text-align:right;margin-top:10px;">
                        <el-pagination @size-change="handleSizeChange($event,'1')" @current-change="handleCurrentChange($event,'1')" :current-page="paginationInfo.currentPage" :page-sizes="paginationInfo.pageSizes" :page-size="paginationInfo.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="paginationInfo.total"></el-pagination>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </el-card>
        <!-- 病案申请弹窗 -->
        <el-dialog title="病案召回申请" :visible.sync="dbvisible" width="400px" append-to-body :close-on-click-modal="false">
            <el-form :model="formDialog" size="mini" label-width="80px">
                <el-form-item label="申请期限">
                    <el-date-picker v-model="formDialog.limitDate" type="date" placeholder="选择日期" style="width:100%;" value-format="yyyy-MM-dd"></el-date-picker>
                </el-form-item>
                <el-form-item label="申请原因">
                    <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="formDialog.textarea"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dbvisible = false" size="mini">取 消</el-button>
                <el-button type="primary" @click="handleSender" size="mini">发送</el-button>
            </div>
        </el-dialog>
        <!-- 选择弹窗 -->
        <medicineRecordBorrowDailog :dialogdptvisible="dialogdptvisible" v-if="ishow" @closeDailog="handleclose"></medicineRecordBorrowDailog>
    </div>
</template>

<script type="text/javascript">
    import medicineRecordBorrowDailog from '@/views/residentDoctor/components/medicineRecordBorrowDailog'
    import {
        createNamespacedHelpers,
        mapState
    } from 'vuex'
    const {
        mapActions
    } = createNamespacedHelpers('residentDoctor')
    export default {
        name: 'medicineRecordRecall',
        components: {
            medicineRecordBorrowDailog
        },
        data() {
            return {
                dialogdptvisible: false,
                ishow: false,
                zhtableData: [],
                sptableData: [],
                spform: {
                    department: '',
                    hospitalNo: '',
                    name: ''
                },
                form: {
                    department: '',
                    hospitalNo: '',
                    name: '',
                    startDate: '',
                    endDate: ''
                },
                dbvisible: false,
                formDialog: {
                    limitDate: '',
                    textarea: ''
                },
                activeName: 'first',
                paginationInfo: {
                    // 分页
                    currentPage: 1,
                    total: 0,
                    pageSizes: [20, 30, 40],
                    pageSize: 20
                },
                dptval: '',
                applyType: 1, //全部申请
                currentVal: null
            }
        },
        created() {
            this.selectVISIT1()
        },
        mounted() {
            this.formDialog.limitDate = this.timeDefaultShow
        },
        computed: {
            timeDefaultShow() {
                var date = new Date()
                var s1 =
                    date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
                return s1
            },
            ...mapState({
                userInfo: state => state.global.userInfo
            })
        },
        methods: {
            ...mapActions([
                'SelectVISIT1',
                'SaveAllapplyFor',
                'BindDataGridCheck',
                'ApplyFor'
            ]),
            handleClick(tab, event) {
                if (tab.paneName == 'first') {
                    this.selectVISIT1()
                } else {
                    this.bindDataGridCheck()
                }
            },
            handleYSPquery() {
                //已审批查询
                this.bindDataGridCheck()
            },
            bindDataGridCheck() {
                //获取已审批数据
                let data = {
                    deptId: this.spform.department,
                    txtCheckVisit: this.spform.hospitalNo,
                    txtPatName: this.spform.name,
                    pageSize: this.paginationInfo.pageSize,
                    pageNos: this.paginationInfo.currentPage
                }
                this.BindDataGridCheck(data).then(res => {
                    if (res.code == 1) {
                        let result = res.values.values
                        this.sptableData = result.rows
                        this.paginationInfo.total = result.total
                    }
                })
            },
            handleQuery() {
                //召回查询
                this.selectVISIT1()
            },
            handleSender() {
                if (this.formDialog.textarea == '') {
                    this.$message.warning('必须填写申请原因！')
                    return
                }
                if (this.applyType == 1) {
                    //全部申请
                    let list = []
                    this.zhtableData.forEach(item => {
                        let obj = {
                            APPLY_USER_ID: this.userInfo.UserId, //登录人id
                            APPLY_USER_NAME: this.userInfo.UserName, //登录人姓名
                            APPLY_DEPT_CODE: this.userInfo.DepCode, //登录人科室
                            visitId: item.VISIT_ID,
                            inTime: item.In_Times,
                            dtpTimes: this.formDialog.limitDate,
                            txtCauses: this.formDialog.textarea
                        }
                        list.push(obj)
                    })
                    let data = list
                    // console.log(JSON.stringify(data))
                    this.SaveAllapplyFor(data).then(res => {
                        if (res.code == 1) {
                            this.dbvisible = false
                            this.selectVISIT1()
                            this.$message.success(res.msg)
                        }
                    })
                } else {
                    //单击申请
                    let data = {
                        APPLY_USER_ID: this.userInfo.UserId, //登录人id
                        APPLY_USER_NAME: this.userInfo.UserName, //登录人姓名
                        APPLY_DEPT_CODE: this.userInfo.DepCode, //登录人科室
                        visitId: this.currentVal.VISIT_ID,
                        inTime: this.currentVal.In_Times,
                        dtpTimes: this.formDialog.limitDate,
                        txtCauses: this.formDialog.textarea
                    }
                    this.ApplyFor(data).then(res => {
                        if ((res.code = 1)) {
                            this.dbvisible = false
                            this.$message.success(res.msg)
                            this.selectVISIT1()
                        }
                    })
                }
            },
            handleAllApply() {
                //全部申请
                this.applyType = 1
                this.$confirm('您是否确定申请此病案信息', '操作提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    })
                    .then(() => {
                        this.dbvisible = true
                    })
                    .catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消申请'
                        })
                    })
            },
            selectVISIT1() {
                let data = {
                    deptId: this.dptval,
                    visitId: this.form.hospitalNo,
                    patName: this.form.name,
                    qian: this.form.startDate,
                    hou: this.form.endDate,
                    pageSize: this.paginationInfo.pageSize,
                    pageNos: this.paginationInfo.currentPage
                }
                // console.log(JSON.stringify(data))
                this.SelectVISIT1(data).then(res => {
                    if (res.code == 1) {
                        let result = res.values
                        this.zhtableData = result.values
                        this.paginationInfo.total = result.total
                    }
                })
            },
            handleclose(val) {
                if (val) {
                    this.form.department = val.DEPT_NAME_CN
                    this.dptval = val.DEPT_ID
                }
                this.ishow = false
                this.dialogdptvisible = false
            },
            choosedepartment() {
                // 科室弹窗
                this.ishow = true
                this.dialogdptvisible = true
            },
            handleDBtable(row, column, event) {
                // 双击表格
                this.currentVal = row
                this.applyType = 2
                this.$confirm('您是否确定申请此病案信息', '操作提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    })
                    .then(() => {
                        this.dbvisible = true
                    })
                    .catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消申请'
                        })
                    })
            },
            handleSizeChange(val, index) {
                this.paginationInfo.pageSize = val
                if (index == 0) {
                    this.selectVISIT1()
                } else if (index == 1) {
                    this.bindDataGridCheck()
                }
            },
            handleCurrentChange(val, index) {
                this.paginationInfo.currentPage = val
                if (index == 0) {
                    this.selectVISIT1()
                } else if (index == 1) {
                    this.bindDataGridCheck()
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    /deep/.el-card__body {
        padding: 10px 10px;
    }

    /deep/.el-tabs__nav .is-top {
        line-height: 30px;
        height: 30px;
    }

    /deep/.el-tabs__nav-prev,
    /deep/.el-tabs__nav-next {
        line-height: 2.8;
        height: 30px;
    }
</style>
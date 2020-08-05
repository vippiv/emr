<!-- 会诊 -->
<template>
    <div class="diagnosis-container">
        <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini" v-if="isForm">
            <el-form-item label="床位">
                <el-input v-model="formInline.bed" placeholder="审批人"></el-input>
            </el-form-item>
            <el-form-item label="住院号">
                <el-input v-model="formInline.hospitalNo" placeholder="审批人"></el-input>
            </el-form-item>
            <el-form-item label="病人姓名">
                <el-input v-model="formInline.name" placeholder="审批人"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="query">查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-button @click="handleRefresh" type="primary">刷新</el-button>
                <el-button type="primary" :disabled="isaccept" @click="handleacpt">接受会诊</el-button>
                <el-button type="primary" :disabled="iscomplete" @click="handlecompt">完成会诊</el-button>
                <el-button type="primary" :disabled="isend" @click="handleend">结束会诊</el-button>
            </el-form-item>
        </el-form>
        <el-card shadow="never" v-if="beforeState">
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane label="应邀会诊信息" name="first">
                    <el-table ref="yyref" :data="yytableData" border style="width: 100%;height:60vh;" size="mini" height="600" highlight-current-row @row-click="handleYytable" @row-dblclick="handleDbTable">
                        <el-table-column prop="CONSULT_INVITE_TIME" label="邀请时间" align="center"></el-table-column>
                        <el-table-column prop="CONSULT_CLASS" label="等级" align="center"></el-table-column>
                        <el-table-column prop="CONSULT_DEADLINE" label="会诊期限" :show-overflow-tooltip="true" align="center"></el-table-column>
                        <el-table-column prop="ApplyDeptName" label="申请科室" :show-overflow-tooltip="true" align="center"></el-table-column>
                        <el-table-column prop="ApplyDoctorName" label="申请医师" align="center"></el-table-column>
                        <el-table-column prop="VISIT_NO" label="住院号" align="center"></el-table-column>
                        <el-table-column prop="VISIT_ID" label="病人ID号" align="center" :show-overflow-tooltip="true"></el-table-column>
                        <el-table-column prop="PAT_NAME" label="姓名" align="center"></el-table-column>
                        <el-table-column prop="BED_NO" label="床号" align="center"></el-table-column>
                        <el-table-column prop="CONSULT_STATUS" label="状态" align="center"></el-table-column>
                        <el-table-column prop="SubDeptName" label="会诊科室" align="center"></el-table-column>
                        <el-table-column prop="CONSULT_DOCTOR_NAME" label="会诊医师" align="center"></el-table-column>
                        <el-table-column prop="CONSULT_DATE_TIME" label="会诊完成时间" align="center" width="160"></el-table-column>
                        <el-table-column prop="CONFIRM_DATE_TIME" label="接受确认时间" align="center" width="160"></el-table-column>
                    </el-table>
                    <ckPagination :currentPage="pageNos" :total="total" class="fix-width" @_pageSizeChange="pageSizeChange" @_currentPageChange="currentPageChange"></ckPagination>
                </el-tab-pane>
                <el-tab-pane label="本科申请会诊信息" name="second">
                    <el-row :gutter="10">
                        <el-col :span="24">
                            <el-table ref="bkref" :data="tableData" border style="width: 100%;height:60vh;" size="mini" height="600" @row-click="handlehzInfo" highlight-current-row>
                                <el-table-column prop="CONSULT_ID" label="会诊ID" align="center" :show-overflow-tooltip="true"></el-table-column>
                                <el-table-column prop="CONSULT_INVITE_TIME" label="申请日期" :show-overflow-tooltip="true" align="center"></el-table-column>
                                <el-table-column prop="CONSULT_CLASS" label="等级" align="center"></el-table-column>
                                <el-table-column prop="CONSULT_DEADLINE" label="会诊期限" :show-overflow-tooltip="true" align="center"></el-table-column>
                                <el-table-column prop="DOCTOR_NAME" label="申请医师" align="center"></el-table-column>
                                <el-table-column prop="VISIT_NO" label="住院号" align="center"></el-table-column>
                                <el-table-column prop="VISIT_ID" label="病人ID号" :show-overflow-tooltip="true" align="center"></el-table-column>
                                <el-table-column prop="PAT_NAME" label="姓名" align="center"></el-table-column>
                                <el-table-column prop="BED_NO" label="床号" align="center"></el-table-column>

                                <el-table-column prop="CONSULT_STATUS" label="状态" align="center">
                                    <template v-slot="scope">{{scope.row.CONSULT_STATUS|filterStatus}}</template>
                                </el-table-column>
                                <el-table-column prop="DEPT_NAME" label="邀请科室" align="center"></el-table-column>
                                <el-table-column prop="CONFIRM_DATE_TIME" label="接受时间" align="center" width="160"></el-table-column>
                                <el-table-column prop="CONSULT_DOCTOR_NAME" label="会诊医师" align="center"></el-table-column>
                                <!-- <el-table-column prop="BED_NO" label="会诊日期" align="center"></el-table-column> -->
                            </el-table>
                            <!-- 分页 -->
                            <div style="text-align:right;margin-top:10px;">
                                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="paginationInfo.currentPage" :page-sizes="paginationInfo.pageSizes" :page-size="paginationInfo.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="paginationInfo.total"></el-pagination>
                            </div>
                        </el-col>
                        <!-- <el-col :span="9">
              <el-table :data="toitemData" height="600" border style="width: 100%;" size="mini">
                <el-table-column prop="date" label="状态" align="center"></el-table-column>
                <el-table-column prop="name" label="邀请科室" align="center"></el-table-column>
                <el-table-column prop="address" label="接受时间" align="center"></el-table-column>
                <el-table-column prop="date" label="会诊医师" align="center"></el-table-column>
                <el-table-column prop="name" label="会诊日期" align="center"></el-table-column>
              </el-table>
            </el-col>-->
                    </el-row>
                </el-tab-pane>
            </el-tabs>
        </el-card>
        <!-- 单击邀请会诊表格切换的的页面 -->
        <el-card shadow="never" v-if="afterState">
            <el-row :gutter="10">
                <el-col :span="4">
                    <div class="left-menu">
                        <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
                            <el-submenu v-for="item in treeData" :key="item.id" :index="item.id">
                                <template slot="title">
                                    <span>{{item.label}}</span>
                                </template>
                                <div v-if="item.children">
                                    <div v-for="(subitem, subindex) in item.children" :key="subindex">
                                        <el-menu-item :index="subitem.id" @click="handleShowThisData(subitem)">{{subitem.label}}</el-menu-item>
                                    </div>
                                </div>
                            </el-submenu>
                        </el-menu>
                    </div>
                </el-col>
                <el-col :span="20">
                    <div>
                        <el-button type="primary" size="small">保存</el-button>
                        <el-button type="primary" size="small">打印</el-button>
                        <el-button type="primary" size="small">插入签名</el-button>
                        <el-button type="primary" size="small" @click="backprevstep">返回</el-button>
                    </div>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script type="text/javascript">
    import {
        createNamespacedHelpers,
        mapState
    } from 'vuex'
    const {
        mapActions
    } = createNamespacedHelpers('residentDoctor')
    export default {
        name: 'diagnosis',
        data() {
            return {
                isForm: true,
                isaccept: false, // 接受会诊
                iscomplete: false, // 完成会诊
                isend: true, // 结束会诊
                beforeState: true,
                afterState: false,
                activeName: 'first',
                yytableData: [],
                tableData: [],
                toitemData: [],
                pageSize: 20,
                pageNos: 1,
                total: 0,
                paginationInfo: {
                    // 分页
                    currentPage: 1,
                    total: 0,
                    pageSizes: [20, 30, 40],
                    pageSize: 20
                },
                formInline: {
                    bed: '',
                    hospitalNo: '',
                    name: ''
                },
                bedno: '',
                visitId: '',
                patName: '',
                queryperson: [],
                yycurrent: null, //点击应邀行数据
                bkcurrent: null, //点击本科行数据
                treeData: [] //点击跳进页面的树形数据
            }
        },
        filters: {
            filterStatus(val) {
                let text = ''
                if (val == '0') {
                    text = '草稿'
                } else if (val == '0') {
                    text = '接受会诊申请'
                } else if (val == '9') {
                    text = '会诊完成'
                }
                return text
            }
        },
        created() {
            this.loadOninvitation()
        },
        computed: {
            ...mapState({
                departmentID: state => state.global.deptID
            })
        },
        methods: {
            ...mapActions([
                'LoadOninvitation',
                'LoadApplyfor',
                'LocationBtn',
                'CcceptBtn',
                'CommitBtn',
                'FinishBtn',
                'Postok',
                'GetUsersByGroup'
            ]),
            handleShowThisData() {},
            handleRefresh() {
                //刷新
                this.bedno = ''
                this.visitId = ''
                this.patName = ''
                if (this.activeName == 'first') {
                    this.loadOninvitation()
                } else {
                    this.loadApplyfor()
                }
            },
            query() {
                //查询
                this.bedno = this.formInline.bed
                this.visitId = this.formInline.hospitalNo
                this.patName = this.formInline.name
                if (this.activeName == 'first') {
                    this.loadOninvitation()
                } else {
                    this.loadApplyfor()
                }
            },
            loadOninvitation() {
                console.log(this.departmentID)
                let data = {
                    code: this.departmentID,
                    BedNos: this.bedno,
                    VisitIds: this.visitId,
                    PatNames: this.patName,
                    pageSize: this.pageSize,
                    pageNos: this.pageNos
                }
                console.log(JSON.stringify(data))
                this.LoadOninvitation(data).then(res => {
                    if (res.code == 1) {
                        let result = res.values
                        this.total = result.total
                        this.pageNos = result.pageNos
                        this.yytableData = result.values
                        this.yycurrent = this.yytableData[0]
                        this.$refs.yyref.setCurrentRow(this.yytableData[0])
                    }
                })
            },
            loadApplyfor() {
                let data = {
                    code: this.departmentID,
                    BedNos: this.bedno,
                    VisitIds: this.visitId,
                    PatNames: this.patName,
                    pageSize: this.paginationInfo.pageSize,
                    pageNos: this.paginationInfo.currentPage
                }
                console.log(JSON.stringify(data))
                this.LoadApplyfor(data).then(res => {
                    if (res.code == 1) {
                        let result = res.values
                        this.paginationInfo.total = result.total
                        this.paginationInfo.currentPage = result.pageNos
                        this.tableData = result.values
                        this.bkcurrent = this.tableData[0]
                        this.$refs.bkref.setCurrentRow(this.tableData[0])
                    }
                })
            },
            handleClick(tab, event) {
                console.log(tab, event)
                this.bedno = ''
                this.visitId = ''
                this.patName = ''
                if (tab.paneName == 'second') {
                    this.isaccept = true
                    this.iscomplete = true
                    this.isend = false
                    this.loadApplyfor()
                } else {
                    this.isaccept = false
                    this.iscomplete = false
                    this.loadOninvitation()
                }
            },
            handleYytable(row, column, event) {
                this.yycurrent = row
            },
            handleDbTable(row, column, event) {
                if (row.CONSULT_STATUS != 1 && row.CONSULT_DOCTOR_ID != 'admin') {
                    this.$message.warning('只有接受会诊并且您是接受此会诊的医生才可查看信息！')
                    return;
                }
                this.isForm = false
                let data = {
                    VistID: row.VISIT_ID
                }
                this.GetUsersByGroup(data).then(res => {
                    if (res.code == 1) {
                        this.treeData = res.values
                    }
                })
                this.获取病历列表信息
                // 双击应邀会诊信息表
                this.beforeState = false
                this.afterState = true
            },
            backprevstep() {
                // 返回
                this.isForm = true
                this.beforeState = true
                this.afterState = false
            },
            handlehzInfo(row, column, event) {
                // 申请会诊左边表格单击
                this.bkcurrent = row
            },
            handleacpt() {
                // 接受会诊
                if (this.yycurrent == null) {
                    this.$message.warning('请选择数据!')
                    return
                }
                let data = {
                    con: this.yycurrent
                }
                this.CcceptBtn(data).then(res => {
                    console.log(res)
                    if (res.code == 1) {
                        this.$message.success(res.msg)
                    } else {
                        this.$message.warning(res.msg)
                    }
                })
            },
            handlecompt() {
                // 完成会诊
                if (this.yycurrent == null) {
                    this.$message.warning('请选择数据!')
                    return
                }
                let data = {
                    con: this.yycurrent
                }
                this.CommitBtn(data).then(res => {
                    if (res.code == 1) {
                        this.$message.success(res.msg)
                    } else {
                        this.$message.warning(res.msg)
                    }
                })
            },
            handleend() {
                // 结束会诊
                if (this.bkcurrent == null) {
                    this.$message.warning('请选择数据!')
                    return
                }
                let data = {
                    consultId: this.bkcurrent.CONSULT_ID
                }
                this.FinishBtn(data).then(res => {
                    console.log(res)
                    if (res.code == 1) {
                        console.log(res.values)
                        this.$confirm(`${res.values}您是否确定结束会诊?`, '操作提示', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type: 'warning'
                            })
                            .then(() => {
                                let data = {
                                    Visit_Id: this.bkcurrent.VISIT_ID
                                }
                                console.log(JSON.stringify(data))
                                this.Postok(data).then(res => {
                                    if (res.code == 1) {
                                        this.$message.success(res.msg)
                                    } else {
                                        this.$message.warning(res.msg)
                                    }
                                })
                            })
                            .catch(() => {
                                this.$message({
                                    type: 'info',
                                    message: '已取消结束会诊！'
                                })
                            })
                    }
                })
            },
            pageSizeChange(size) {
                this.pageSize = size
                this.loadOninvitation()
            },
            currentPageChange(val) {
                this.pageNos = val
                this.loadOninvitation()
            },
            handleSizeChange(val) {
                this.paginationInfo.pageSize = val
                this.LoadApplyfor()
            },
            handleCurrentChange(val) {
                this.paginationInfo.currentPage = val
                this.LoadApplyfor()
            }
        }
    }
</script>

<style lang="scss" scoped>
    .left-menu {
        height: 60vh;
        border: 1px solid #ebeef5;
        overflow-y: auto;
    }

    .demo-form-inline {
        // margin-top: 15px;
    }

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
<!-- 病人查询 -->
<template>
    <div class="patientSearch-container">
        <div class="imgBtnBox">
            <ckImgBtn class="imgBtn-item" icon="ck-imgicon-search" @click="handleClicFn">查询</ckImgBtn>
        </div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="病人ID:">
                <el-input size="mini" v-model="formInline.patientId" style="width:79%"></el-input>
            </el-form-item>
            <el-form-item label="病人姓名:">
                <el-input size="mini" v-model="formInline.patientName" style="width:79%"></el-input>
            </el-form-item>
        </el-form>
        <div class="content">
            <el-table border :data="tableData" style="width: 100%" height="calc(100vh - 450px)">
                <el-table-column prop="DOCTOR_PART_STATUS" align="center" label="状态">
                </el-table-column>
                <el-table-column prop="VISIT_ID" width="100" align="center" :show-overflow-tooltip="true" label="病人ID">
                </el-table-column>
                <el-table-column prop="PAT_NAME" align="center" label="病人姓名">
                </el-table-column>
                <el-table-column prop="PAT_GENDER" align="center" label="姓别">
                </el-table-column>
                <el-table-column prop="PATIENT_AGE" align="center" label="年龄">
                </el-table-column>
                <el-table-column prop="IP_VISIT_STATUS" width="105" align="center" label="病人状态">
                </el-table-column>
                <el-table-column prop="DEPT_NAME_CN" width="160" align="center" label="所在科室">
                </el-table-column>
                <el-table-column prop="INHOSNAME" align="center" label="住院医生">
                </el-table-column>
            </el-table>
            <ckPagination :currentPage="pageNos" :total="total" class="fix-width" @_pageSizeChange="pageSizeChange" @_currentPageChange="currentPageChange"></ckPagination>
        </div>
    </div>
</template>

<script type="text/javascript">
    import {
        createNamespacedHelpers
    } from 'vuex'
    const {
        mapActions
    } = createNamespacedHelpers('residentDoctor')
    import {
        mapState
    } from 'vuex'
    export default {
        name: 'patientSearch',
        data() {
            return {
                nameInput: '',
                idInput: '',
                // 分页
                hasInfo: false,
                hasName: '',
                hasId: '',
                pageSize: 20,
                pageNos: 1,
                total: 0,
                tableData: [],
                formInline: {
                    patientId: '',
                    patientName: ''
                }
            }
        },
        methods: {
            ...mapActions([
                'GETVISIT',
            ]),
            handleClicFn() {
                // 值都为空不查
                if (this.formInline.patientId == '' && this.formInline.patientName == '') {
                    this.$alert('请输入病人id或姓名', '操作提示', {
                        confirmButtonText: '确定',
                        type: 'warning',
                        callback: action => {}
                    })
                } else {
                    this.hasInfo = true
                    this.getInformation()
                }
            },
            // 查询所有患者
            getInformation() {
                let params = {
                    VisitID: this.formInline.patientId,
                    VisitName: encodeURI(this.formInline.patientName.trim()),
                    pageSize: this.pageSize,
                    pageNos: this.pageNos,
                }
                // 存查询的内容
                this.hasName = params.VisitName
                this.hasId = params.VisitID
                this.GETVISIT(params).then((res) => {
                    console.log(res)
                    if (res.code == 1) {
                        this.tableData = res.values.values
                        this.total = res.values.total
                    }
                })
            },
            // 分页查询
            hasInfoSelect() {
                let params = {
                    VisitID: this.hasId,
                    VisitName: this.hasName,
                    pageSize: this.pageSize,
                    pageNos: this.pageNos,
                }
                // 存查询的内容
                this.hasName = params.VisitName
                this.hasId = params.VisitID
                this.GETVISIT(params).then((res) => {
                    console.log(res)
                    if (res.code == 1) {
                        this.tableData = res.values.values
                        this.total = res.values.total
                    }
                })
            },
            pageSizeChange(size) {
                if (this.total == 0) {
                    return
                }
                this.pageSize = size
                if (this.hasInfo) {
                    this.hasInfoSelect()
                } else {
                    this.getInformation()
                }
            },
            currentPageChange(val) {
                if (this.total == 0) {
                    return
                }
                this.pageNos = val
                if (this.hasInfo) {
                    this.hasInfoSelect()
                } else {
                    this.getInformation()
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
    .patientSearch-container {
        height: 100%;
    }

    .demo-form-inline {
        margin: 10px 0;
    }

    .imgBtnBox {
        margin-bottom: -9px;
        margin-top: -15px;

        .imgBtn-item {
            display: inline-flex;
            justify-content: space-evenly;
            line-height: 2.7;
        }
    }

    /deep/.img-btn>span {
        min-width: 34px !important;
        min-height: 34px !important;

        &:nth-child(1) {
            margin-right: 3px;
        }

        &:nth-child(2) {
            margin-right: 10px;
        }
    }

    .fix-width {
        flex: 1;
        left: auto;
        right: 0;
        border: none;
        overflow-y: hidden;
    }

    .content {
        height: calc(100vh - 399px);
        overflow-y: auto;
        overflow: hidden;
    }
</style>
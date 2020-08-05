<template>
    <div class="person-main-tertiary">
        <el-row class="gen1" type="flex" justify="space-between">
            <el-col :span="6" style="padding-top:10px;">
                <ckImgBtn class="imgBtn-item" icon="ck-imgicon-add" @click="handleClicFn">添加新三级</ckImgBtn>
            </el-col>
            <el-col :span="18" style="text-align:right; line-height: 4;padding-right:5px;">
                按姓名、工号、拼音码检索:
                <el-input size="mini" v-model="tplName" style="width:210px;margin-right:6px;"></el-input>
                <el-button size="mini" @click="handleSearch" class="searchButton">搜索</el-button>
            </el-col>
        </el-row>
        <el-main>
            <el-table border highlight-current-row :data="tableData" @row-click="tableCurrent" style="width: 100%" height="calc(100vh - 242px)">
                <!-- <el-table-column type="index" width="50">
                    <template scope="scope"><span>{{scope.$index+(pageNos - 1) * pageSize + 1}} </span></template>
                </el-table-column> -->
                <el-table-column prop="Director" label="主任医师" align="center">
                </el-table-column>
                <el-table-column prop="Attending" label="主治医师" align="center">
                </el-table-column>
                <el-table-column prop="Hospitalization" label="住院医师" align="center">
                </el-table-column>
                <el-table-column align="center" label="操作" width="120">
                    <template slot-scope="scope">
                        <el-button type="text" size="mini" @click="handleEdit(scope.row)">修改</el-button>
                        <el-button type="text" size="mini" @click="handleDel(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <ckPagination :currentPage="pageNos" :pageSize="pageSize" :total="total" class="fix-width" @_pageSizeChange="pageSizeChange" @_currentPageChange="currentPageChange">
            </ckPagination>
        </el-main>
        <!-- 弹窗 -->
        <el-dialog :title="title" :visible.sync="dialogFormVisible" :before-close="handleClose">
            <el-form :inline="true" ref="formInline" :rules="rules" :model="formInline" class="demo-form-inline">
                <el-form-item label="主任医师:" prop="opSelect">
                    <el-select v-model="formInline.opSelect" size="mini">
                        <el-option v-for="item in options" :key="item.USER_ID" :label="item.USER_NAME" :value="item.USER_ID"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="主治医师:" prop="keySelect">
                    <el-select v-model="formInline.keySelect" size="mini">
                        <el-option v-for="item in xppos" :key="item.USER_ID" :label="item.USER_NAME" :value="item.USER_ID"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="住院医师:" prop="labSelect">
                    <el-select v-model="formInline.labSelect" size="mini">
                        <el-option v-for="item in zzpos" :key="item.USER_ID" :label="item.USER_NAME" :value="item.USER_ID"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="handleClose" size="mini">取 消</el-button>
                <el-button type="primary" @click="saveForm('formInline')" size="mini">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script type="text/javascript">
    import {
        mapActions
    } from 'vuex'

    export default {
        name: 'personMaintertiary',
        data() {
            return {
                pageSize: 20,
                pageNos: 1,
                total: 0,
                old_Id: '',
                isAdd: false,
                currentN: null,
                tplName: "",
                title: '',
                zzpos: [],
                xppos: [],
                options: [],
                formInline: {
                    opSelect: '',
                    keySelect: '',
                    labSelect: ''
                },
                rules: {
                    opSelect: [{
                        required: true,
                        message: '请选择主任医师',
                        trigger: 'change'
                    }],
                    keySelect: [{
                        required: true,
                        message: '请选择主治医师',
                        trigger: 'change'
                    }],
                    labSelect: [{
                        required: true,
                        message: '请选择住院医师',
                        trigger: 'change'
                    }]
                },
                dialogFormVisible: false,
                tableData: []
            }
        },
        created() {
            this.get_GetInformation('')
        },
        methods: {
            ...mapActions(
                ['GET_LEVELINFO',
                    'DELETE_LEVELINFO',
                    'ADD_DIRECTORLOAD', 'ADD_ATTENDINGLOAD',
                    'ADD_HOSPITALIZATIONLOAD',
                    'SAVE_LEVELINFO',
                    'GET_SINGLEINFO'
                ]),

            tableCurrent(node) {
                this.currentN = node
            },
            handleClose() {
                this.$refs['formInline'].resetFields()
                this.dialogFormVisible = false
            },
            // 修改
            handleEdit(obj) {
                this.old_Id = obj.REQUEST_DOCTOR_ID + '-' + obj.Hospitalization_INPUT
                this.dialogFormVisible = true
                this.title = '修改三级检诊'
                this.isAdd = true
                let params = {
                    code: obj.REQUEST_DOCTOR_ID
                }
                this.GET_SINGLEINFO(params).then(res => {
                    this.formInline.opSelect = res.values[0].SUPER_DOCTOR_ID + '-' + res.values[0].Director_INPUT
                    this.formInline.keySelect = res.values[0].PARENT_DOCTOR_ID + '-' + res.values[0].Attending_INPUT
                    this.formInline.labSelect = res.values[0].REQUEST_DOCTOR_ID + '-' + res.values[0].Hospitalization_INPUT
                })
                // 获取所有主任医师列表
                this.ADD_DIRECTORLOAD().then(res => {
                    this.options = res.values
                })
                // 获取所有主治医师列表
                this.ADD_ATTENDINGLOAD().then(res => {
                    this.xppos = res.values
                })
                // 获取所有住院医师
                this.ADD_HOSPITALIZATIONLOAD().then(res => {
                    this.zzpos = res.values
                })
            },
            // 删除
            handleDel(obj) {
                let params = {
                    REQUEST_DOCTOR_ID: obj.REQUEST_DOCTOR_ID
                }
                this.$confirm('确定删除?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    })
                    .then(() => {
                        this.DELETE_LEVELINFO(params).then(res => {
                            if (res.code == 1) this.$message.success(res.msg)
                            this.get_GetInformation('')
                        })
                    })
                    .catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        })
                    })
            },
            handleSearch() {
                this.get_GetInformation(this.tplName)
            },
            get_GetInformation(tpname) {
                let params = {
                    pageSize: this.pageSize,
                    pageNos: this.pageNos,
                    Code: encodeURI(tpname.trim())
                }
                this.GET_LEVELINFO(params).then((res) => {
                    if (res.code === 1) {
                        this.total = res.values.total
                        this.tableData = res.values.values
                    } else {
                        this.$message({
                            type: "warning",
                            message: '加载失败'
                        })
                    }
                })
            },
            pageSizeChange(size) {
                console.log(size)
                this.pageSize = size
                this.get_GetInformation('')
            },
            currentPageChange(val) {
                console.log(val)
                this.pageNos = val
                this.get_GetInformation('')
            },
            // 添加三级检诊
            handleClicFn() {
                this.dialogFormVisible = true
                this.title = '添加三级检诊'
                this.isAdd = false
                // 获取所有主任医师列表
                this.ADD_DIRECTORLOAD().then(res => {
                    this.options = res.values
                })
                // 获取所有主治医师列表
                this.ADD_ATTENDINGLOAD().then(res => {
                    this.xppos = res.values
                })
                // 获取所有住院医师
                this.ADD_HOSPITALIZATIONLOAD().then(res => {
                    this.zzpos = res.values
                })
            },
            // 保存
            saveForm(formInline) {
                this.$refs[formInline].validate((valid) => {
                    if (!valid) {
                        return
                    } else {
                        const sysgroup = {
                            Old_Hospitalization_ID: this.isAdd ? this.old_Id : '',
                            REQUEST_DOCTOR_ID: this.formInline.labSelect,
                            PARENT_DOCTOR: this.formInline.keySelect,
                            SUPER_DOCTOR_ID: this.formInline.opSelect,
                            LAST_DATE: new Date(),
                            type: this.isAdd ? 1 : 0 // 0 代表添加 1代表修改,
                        }
                        this.SAVE_LEVELINFO(sysgroup).then((res) => {
                            if (res.code === 1) {
                                this.$message.success(res.msg)
                                this.get_GetInformation('')
                            }
                            if (res.code === 0) {
                                this.$message.error(res.msg)
                            }
                            this.handleClose()
                        })
                    }
                })
            }
        }

    }
</script>
<style lang="scss" scoped>
    .searchButton {
        width: 85px;
        height: 31px;
        background: #ff8c00;
        border-radius: 5px;
        font-size: 14px;
        color: #ffffff;
    }
    .person-main-tertiary {
        height: 100%;

        .el-main {
            overflow: hidden;
            padding: 0px;
            /deep/.el-table {
            overflow-y: auto;
                
            }
        }
    }

    .gen1 {
        border: 1px solid #E8EAED;
        background-color: white;
        color: #333;
        padding: 0 0 0 7px;
        margin-bottom: 5px;

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

    /deep/ .el-table__body tr:hover>td {
        background-color: #44B3C7;
    }

    /deep/ .el-table__body tr.current-row>td {
        background-color: #44B3C7;
    }
</style>
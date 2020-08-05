<template>
    <div class="person-main-run">
        <el-row class="gen">
            <ckImgBtn class="imgBtn-item" icon="ck-imgicon-add" @click="handleAddClicFn">新增</ckImgBtn>
            <ckImgBtn class="imgBtn-item" icon="ck-imgicon-modify" @click="handleEditClicFn">修改</ckImgBtn>
            <ckImgBtn class="imgBtn-item" icon="ck-imgicon-save" @click="handleSaveClicFn('form')">保存</ckImgBtn>
        </el-row>
        <el-row class="basics">
            <el-col :span="12" class="gen2">
                <!-- 下拉选择框 -->
                <el-row class="gen1">
                    <el-col :span="12" style="padding-left:10px">
                        科室:
                        <el-select v-model="departmentVal" placeholder="请选择" size="mini" @change="seclectChange">
                            <el-option v-for="item in options" :key="item.id" :label="item.label" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-row>
                <!-- 表格 -->
                <el-row>
                    <el-table :data="tableData" border @row-click="tableCurrent" highlight-current-row style="width: 100%;" height="calc(100vh - 263px)">
                        <el-table-column prop="STAFF_ID" label="工号" align="center">
                        </el-table-column>
                        <el-table-column prop="USER_NAME" label="姓名" align="center">
                        </el-table-column>
                        <el-table-column prop="USER_CODE" label="登陆名" align="center">
                        </el-table-column>
                        <el-table-column prop="DEPT_NAME_CN" label="科室" align="center">
                        </el-table-column>
                    </el-table>
                    <ckPagination :currentPage="pageNos" :total="total" class="fix-width" @_pageSizeChange="pageSizeChange" @_currentPageChange="currentPageChange"></ckPagination>
                </el-row>

            </el-col>
            <!-- 右边表单 -->
            <el-col :span="11" class="gen3">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="基本信息" name="first">
                        <div>
                            <el-form ref="form" :model="form" :rules="rules" :disabled="disabled" label-width="109px">
                                <el-row>
                                    <el-col :span="10">
                                        <el-form-item label="登录名:" prop="name">
                                            <el-input :disabled="gongShow" v-model="form.name" size="mini"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="10">
                                        <el-form-item label="工号:" prop="staffId">
                                            <el-input :disabled="gongShow" v-model="form.staffId" size="mini"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="10">
                                        <el-form-item label="姓名:" prop="userName">
                                            <el-input v-model="form.userName" size="mini"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="10">
                                        <el-form-item label="手机号码:" prop="phone">
                                            <el-input v-model="form.phone" size="mini"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-form-item label="主属科室:" prop="region">
                                        <el-select v-model="form.region" size="mini" style="width:66%">
                                            <el-option v-for="item in xptions" :key="item.id" :label="item.label" :value="item.id"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-row>
                                <el-row>
                                    <el-form-item label="私有密码(本人使用)" size="mini" prop="pass" style="white-space: nowrap; padding-left:9px">
                                        <el-input v-model="form.pass" show-password style="width:44%; padding-left:23px;"></el-input>
                                    </el-form-item>
                                </el-row>
                                <el-row>
                                    <el-form-item label="共有密码(实习生用)" size="mini" prop="commonpass" style="white-space: nowrap; padding-left:9px">
                                        <el-input v-model="form.commonpass" show-password style="width:44%; padding-left:23px;"></el-input>
                                    </el-form-item>
                                </el-row>
                                <el-row>
                                    <el-form-item label="技术职称:" prop="tkselect">
                                        <el-select v-model="form.tkselect" placeholder="-请选择-" size="mini" style="width:66%">
                                            <el-option v-for="item in zptions" :key="item.id" :label="item.label" :value="item.id"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-row>
                                <el-row>
                                    <el-form-item prop="radioDoc">
                                        <el-radio-group v-model="form.radioDoc" style="padding-right:66px">
                                            <el-radio :label="'east'">中医</el-radio>
                                            <el-radio :label="'west'">西医</el-radio>
                                        </el-radio-group>
                                        <el-checkbox v-model="form.checked" style="padding-left:66px">锁定</el-checkbox>
                                        <el-checkbox v-model="form.checkedIs" style="padding-left:66px">是否重置密码有效期</el-checkbox>
                                    </el-form-item>
                                </el-row>
                                <el-form-item label="所属科室名称" prop="desc" v-if="isUse">
                                    <el-input type="textarea" autosize v-model="form.desc"></el-input>
                                    <el-button type="primary" plain>+</el-button>
                                    <el-button type="primary" plain>-</el-button>
                                </el-form-item>
                            </el-form>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="其它信息设置" name="second">
                        <el-row class="gen4">
                            <el-checkbox v-model="checkedSerct">密码永不过期</el-checkbox>
                        </el-row>
                        <el-row class="gen4">
                            <el-button type="primary" @click="savePass" size="mini">保存</el-button>
                        </el-row>
                    </el-tab-pane>
                </el-tabs>
            </el-col>
        </el-row>

    </div>
</template>

<script type="text/javascript">
    import {
        mapState
    } from 'vuex'
    import {
        mapActions
    } from 'vuex'

    export default {
        name: 'personMainRun',
        data() {
            const checkName = (rule, value, callback) => {
                const regExp = /^[A-Za-z0-9]+$/
                if (!regExp.test(value)) {
                    callback(new Error('登录名只能为数字或字母！'))
                } else {
                    callback()
                }
            }
            const checkPass = (rule, value, callback) => {
                if (this.form.pass == this.form.commonpass) {
                    callback(new Error('私有密码和共有密码不能相同'))
                } else {
                    callback()
                }
            }
            return {
                isUse: false,
                // 保存
                gongShow: true,
                // 分页
                pageSize: 20,
                pageNos: 1,
                total: 0,
                // tab栏
                currentN: null,
                radioFour: '是',
                radioThree: '否',
                input: '',
                radioTwo: '否',
                radio: '单选列表',
                options: [],
                xptions: [],
                zptions: [],
                form: {
                    radioDoc: '',
                    commonpass: '',
                    pass: '',
                    name: '',
                    userName: '',
                    phone: '',
                    staffId: '',
                    checked: false,
                    checkedIs: false,
                    tkselect: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                rules: {
                    name: [{
                            required: true,
                            message: '请输入登录名',
                            trigger: 'blur'
                        },
                        {
                            min: 3,
                            message: '长度不小于3位',
                            trigger: 'blur'
                        },
                        {
                            required: true,
                            trigger: 'blur',
                            validator: checkName
                        }
                    ],
                    staffId: [{
                            required: true,
                            message: '请输入登录名',
                            trigger: 'blur'
                        },
                        {
                            min: 3,
                            message: '长度不小于3位',
                            trigger: 'blur'
                        },
                        {
                            required: true,
                            trigger: 'blur',
                            validator: checkName
                        }
                    ],
                    userName: [{
                        required: true,
                        message: '请输入姓名',
                        trigger: 'blur'
                    }],
                    pass: [{
                            required: true,
                            message: '请输入私有密码',
                            trigger: 'blur'
                        },
                        {
                            required: true,
                            trigger: 'blur',
                            validator: checkPass
                        }
                    ],
                    commonpass: [{
                        required: true,
                        message: '请输入共有密码',
                        trigger: 'blur'
                    }],
                    region: [{
                        required: true,
                        message: '请选择主属科室',
                        trigger: 'change'
                    }],
                },
                checkedSerct: false,
                activeName: 'first',
                tableData: [],
                departmentVal: '',
                currentVal: '',
                disabled: true,
                isAdd: false,
                ID: ''
            }
        },
        watch: {
            'form.name': function(val, oldval) {
                if (val !== oldval) {
                    this.form.staffId = val
                }
            },
            "form.staffId": function(val, oldval) {
                if (val !== oldval) {
                    this.form.name = val
                }
            },
        },
        created() {
            this.get_GetRoomInformation()
            this.getsyInformation()
            this.get_GetInformation()
        },
        computed: {
            ...mapState({
                loginUserId: state => state.global.userInfo,
            })
        },
        methods: {
            ...mapActions(['GET_ALLUSERINFO', 'GET_DEPTINFO', 'GET_TITLEINFO', 'GET_USERINFO', 'GET_CKPASSWVALIDROLE', 'GET_CKLOCKROLE', 'SAVE_PASSVALID', 'SAVE_USERINFO']),

            get_GetRoomInformation() {
                let param = {
                    userid: this.loginUserId.UserId
                }
                this.GET_CKLOCKROLE(param).then((res) => {
                    if (res.code == 1) {
                        this.checked = true
                    } else {
                        this.checked = false
                    }
                })
                // 获取科室
                this.GET_DEPTINFO().then((res) => {
                    if (res.code === 1) {
                        let obj = {
                            "id": "01010000",
                            "label": "全部"
                        }
                        this.options = res.values
                        this.xptions = res.values
                        this.options.splice(0, 0, obj)
                        this.departmentVal = this.options[0].id
                    } else {
                        this.$message({
                            type: 'warning',
                            message: '加载失败'
                        })
                    }
                })
                // 获取职称
                this.GET_TITLEINFO().then((res) => {
                    if (res.code === 1) {
                        this.zptions = res.values
                    } else {
                        this.$message({
                            type: "warning",
                            message: '加载失败'
                        })
                    }
                })
            },
            seclectChange(val) {
                this.currentVal = val
                if (val == '01010000') {
                    this.currentVal = ''
                }
                this.get_GetInformation()
            },
            // 根据科室获取人员列表
            get_GetInformation() {
                const params = {
                    pageSize: this.pageSize,
                    pageNos: this.pageNos,
                    DeptID: this.currentVal
                }
                this.GET_ALLUSERINFO(params).then((res) => {
                    if (res.code === 1) {
                        this.total = res.values.total
                        this.tableData = res.values.values
                    } else {
                        this.$message({
                            type: 'warning',
                            message: '加载失败'
                        })
                    }
                })
                // 获取科室
                this.GET_DEPTINFO().then((res) => {
                    if (res.code === 1) {
                        this.xptions = res.values
                    } else {
                        this.$message({
                            type: 'warning',
                            message: '加载失败'
                        })
                    }
                })
            },
            // 右边信息表获取
            tableCurrent(node) {
                this.currentN = node
                this.disabled = true
                this.$refs.form.resetFields()
                let params = {
                    code: this.currentN.STAFF_ID
                }
                this.GET_USERINFO(params).then((res) => {
                    let obj = res.values[0]
                    this.form.name = obj.USER_CODE
                    this.form.staffId = obj.STAFF_ID
                    this.form.userName = obj.USER_NAME
                    this.form.phone = obj.CELL_PHONE
                    this.form.region = obj.DEPT_ID
                    this.form.pass = obj.USER_PASS
                    this.form.commonpass = obj.USER_PASS2
                    this.form.tkselect = obj.TITLE_CODE
                    obj.USER_LOCKED == 1 ? this.form.checked = true : this.form.checked = false
                    if (obj.DOC_TYPE == 1) {
                        this.form.radioDoc = 'west'
                    } else if (obj.DOC_TYPE == 2) {
                        this.form.radioDoc = 'east'
                    } else {
                        this.form.radioDoc = ''
                    }
                    this.gongShow = true
                    this.isAdd = false
                })
            },
            // 修改
            handleEditClicFn() {
                if (this.currentN == null) {
                    this.$message.error('请选择人员')
                    this.isAdd = true
                    this.disabled = true
                    this.$refs.form.resetFields()
                } else {
                    this.isAdd = false
                    this.disabled = false
                }
            },
            handleAddClicFn() {
                this.isAdd = true
                this.gongShow = false
                this.disabled = false
                this.$refs.form.resetFields()
                this.currentN = null
            },
            // 保存新增
            handleSaveClicFn(formName) {
                this.$refs[formName].validate((valid) => {
                    if (!valid) {
                        return
                    } else {
                        const sysuser = {
                            type: this.isAdd ? 0 : 1, // 0 代表添加 1代表修改
                            USER_CODE: this.form.name.trim(),
                            STAFF_ID: this.form.staffId.trim(),
                            CELL_PHONE: this.form.phone.trim(),
                            USER_NAME: this.form.userName.trim(),
                            USER_PASS: this.form.pass.trim(),
                            USER_PASS2: this.form.commonpass.trim(),
                            DOC_TYPE: this.form.radioDoc == 'west' ? 1 : 2,
                            USER_LOCKED: this.form.checked ? 1 : 0,
                            USER_TYPE: this.form.tkselect ? '是' : '',
                            TitleCode: this.form.tkselect,
                            CkXG: this.form.checkedIs ? 0 : 1,
                            MainDeptID: this.form.region,
                            DeptLists: ''
                        }
                        this.SAVE_USERINFO(sysuser).then((res) => {
                            if (res.code === 1) {
                                this.$message.success('保存成功')
                                this.get_GetInformation()
                                this.$refs[formName].resetFields();
                            } else {
                                this.$message.error(res.msg)
                            }
                        })

                    }
                })
            },
            // 获取密码不过期权限
            getsyInformation() {
                this.GET_CKPASSWVALIDROLE().then((res) => {
                    if (res.code == 2) {
                        this.checkedSerct = true
                    } else {
                        this.checkedSerct = false
                    }
                })
            },
            // 密码是否过期操作保存
            savePass() {
                this.ID = (this.checkedSerct ? 0 : 1)
                let params = {
                    ID: this.ID
                }

                this.SAVE_PASSVALID(params).then((res) => {
                    this.$message.success(res.msg)
                    this.getsyInformation()
                })

            },
            handleClick() {},
            pageSizeChange(size) {
                this.pageSize = size
                this.get_GetInformation()
            },
            currentPageChange(val) {
                this.pageNos = val
                this.get_GetInformation()
            },
        }
    }
</script>
<style lang="scss" scoped>
    .person-main-run {
        height: 100%;
        box-sizing: border-box;

        .basics {
            height: calc(100vh - 214px);
            margin: 4px 0 0 0;
            overflow-x: auto;
            min-width: 948px;
        }
    }

    .fix-width {
        width: 100%;
        flex: 1;
        left: auto;
        right: 0;
        overflow-x: auto;
        margin: 0 0 0 0;
    }

    /deep/ .el-table__body tr:hover>td {
        background-color: #44B3C7;
        cursor: pointer;
    }

    .gen {
        border: 1px solid #E8EAED;
        background-color: white;
        color: #333;
        padding: 10px 0 4px 7px;
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

    .gen1 {
        margin: 9px 0;
    }

    .gen2 {
        // height: 100%;
        // height:calc(100vh - 263px);
        border: 1px solid #99a9bf;
        overflow-y: auto;
        background-color: white;
        padding: 0 0 0 0;
    }

    .gen3 {
        height: 100%;
        border: 1px solid #99a9bf;
        background-color: white;
        overflow-y: auto;
        float: right;
    }

    /deep/.el-col-11 {
        width: 47.83333%;
        min-width: 456px;
    }

    /deep/.el-col-12 {
        min-width: 492px;
        box-sizing: border-box;
    }

    .gen4 {
        margin: 11px;
    }

    /deep/ .el-tabs--top .el-tabs__item.is-top:nth-child(2) {
        padding-left: 9px;
    }
</style>
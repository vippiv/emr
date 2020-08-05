<template>
    <div class="department-dailog">
        <el-dialog width="35%" title="科室维护" :visible.sync="dialogFormVisible" @close="$emit('update:show', false)">
            <el-form class="formbox" ref="form" :rules="rules" :model="form" label-width="100px" size="small">
                <el-row :gutter="16">
                    <el-col :span="12">
                        <el-form-item label="部门编号" prop="dptNo">
                            <el-input v-model="form.dptNo" :disabled="isno"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="部门名称" prop="dptName">
                            <el-input v-model="form.dptName" :disabled="isname"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="16">
                    <el-col :span="12">
                        <el-form-item label="部门类别" prop="dptClass">
                            <el-select v-model="form.dptClass" clearable placeholder="请选择" style="width:100%" :disabled="isfdptc">
                                <el-option v-for="item in deparmentClassOptions" :key="item.CODE_ID" :label="item.CODE_NAME" :value="item.CODE_ID"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="部门属性" prop="dptType">
                            <el-select v-model="form.dptType" clearable placeholder="请选择" style="width:100%" :disabled="isfdptt">
                                <el-option v-for="item in deparmentTypeOptions" :key="item.CODE_ID" :label="item.CODE_NAME" :value="item.CODE_ID"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="16">
                    <el-col :span="12">
                        <el-form-item label="限制医生组">
                            <el-radio-group v-model="form.limtDoc" :disabled="islimtDoc">
                                <el-radio :label="1">是</el-radio>
                                <el-radio :label="0">否</el-radio>
                            </el-radio-group>
                            <!-- <el-input v-model="form.limtDoc" :disabled="islimtDoc"></el-input> -->
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="科内转诊" prop="knzz">
                            <el-input v-model="form.knzz" :disabled="isknzz"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false" size="small">取 消</el-button>
                <el-button type="primary" @click="submitForm('form')" size="small" :disabled="isbtn">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import {
        mapActions
    } from 'vuex'

    export default {
        name: 'departmentMaintDailog',
        props: {
            show: {
                type: Boolean,
                default: false
            },
            btntype: {
                type: Number,
                default: 0
            },
            currentdata: {
                type: Object,
                default: () => ({})
            }
        },
        data() {
            return {
                dialogFormVisible: this.show,
                form: {
                    dptNo: '', // 部门编号
                    dptName: '', // 部门名称
                    dptClass: '', // 部门类别
                    dptType: '', // 部门属性
                    limtDoc: '', // 限制医生组
                    knzz: '' // 科内转诊
                },
                isbtn: false,
                isno: false,
                isname: false,
                isfdptc: false,
                isfdptt: false,
                islimtDoc: false,
                isknzz: false,
                deparmentClassOptions: [],
                deparmentTypeOptions: [],
                rules: {
                    dptNo: [{
                        required: true,
                        message: '请输入部门编号',
                        trigger: 'blur'
                    }],
                    dptName: [{
                        required: true,
                        message: '请输入编码名称',
                        trigger: 'blur'
                    }],
                    dptClass: [{
                        required: true,
                        message: '请输入编码类别',
                        trigger: 'blur'
                    }],
                    dptType: [{
                        required: true,
                        message: '请输入部门属性',
                        trigger: 'blur'
                    }]
                }
            }
        },
        created() {
            if (this.btntype == 3) {
                this.isbtn = true
                this.isno = true
                this.isname = true
                this.isfdptc = true
                this.isfdptt = true
                this.islimtDoc = true
                this.isknzz = true
            } else if (this.btntype == 3) {
                this.isno = true
            } else {
                this.isbtn = false
                this.isno = false
                this.isname = false
                this.isfdptc = false
                this.isfdptt = false
                this.islimtDoc = false
                this.isknzz = false
            }
            this.getDepartmentalCategories()
            this.getDepartmentalAttributes()
            console.log(this.currentdata)
        },
        mounted() {
            console.log(this.btntype)
            if (this.btntype == 2 || this.btntype == 3) {
                // 修改或浏览
                this.form.dptNo = this.currentdata.DEPT_ID
                this.form.dptName = this.currentdata.DEPT_NAME_CN
                this.form.dptClass = this.currentdata.DEPT_TYPE
                this.form.dptType = this.currentdata.DEPT_ATTR
                this.form.limtDoc = Number(this.currentdata.LIMIT_DOC_GROUP)
                this.form.knzz = this.currentdata.FLAG
            }
        },
        methods: {
            ...mapActions([
                'GET_GetDepartmentalCategories',
                'GET_GetDepartmentalAttributes',
                'DepartmentSave'
            ]),
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        const paramOj = {
                            DEPT_ID: this.form.dptNo,
                            DEPT_NAME_CN: this.form.dptName,
                            DEPT_TYPE: this.form.dptClass,
                            DEPT_GROUP: this.form.dptType,
                            LIMIT_DOC_GROUP: this.form.limtDoc,
                            FLAG: this.form.knzz,
                            type: this.btntype == 1 ? 0 : 1
                        }
                        console.log(JSON.stringify(paramOj))
                        this.DepartmentSave(paramOj).then((res) => {
                            console.log(res)
                            if (res.code == 1) {
                                this.$message.success(res.msg)
                                this.$refs[formName].resetFields() // 确定之后清空表单控件
                                this.dialogFormVisible = false
                                this.$emit('update:show', false)
                                this.$emit('handleRefresh') // 触发父组件表格刷新事件
                            }
                        })
                    } else {
                        console.log('error submit!!')
                        return false
                    }
                })
            },
            getDepartmentalCategories() {
                // 获取部门类别下拉
                this.GET_GetDepartmentalCategories().then((res) => {
                    if (res.code == 1) {
                        this.deparmentClassOptions = res.values
                    }
                })
            },
            getDepartmentalAttributes() {
                // 获取部门属性下拉
                this.GET_GetDepartmentalAttributes().then((res) => {
                    if (res.code == 1) {
                        this.deparmentTypeOptions = res.values
                    }
                })
            }
        }
    }
</script>
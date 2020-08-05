<template>
    <div class="bed-maint" style="background:white;">
        <!-- <h1 class="ck-subnav-caption">医生工作站与科室维护</h1> -->
        <el-row :gutter="16">
            <el-col :span="8">
                <el-tree ref="tree" class="tree-pannel" :data="treeData" :props="defaultProps" @node-click="handleNodeClick" highlight-current node-key="id" default-expand-all></el-tree>
            </el-col>
            <el-col :span="16">
                <fieldset class="field-st">
                    <div class="btn">
                        <el-button type="primary" size="small" @click="handleadd" :disabled="isbtn">新增</el-button>
                        <el-button type="primary" size="small" @click="save">保存</el-button>
                    </div>
                    <el-radio-group v-model="radio" class="radiobox">
                        <el-radio :label="0">医生工作站</el-radio>
                        <el-radio :label="1">工作站科室</el-radio>
                    </el-radio-group>
                    <el-form class="formbox" ref="form1" :model="form" label-width="100px" size="small">
                        <el-form-item label="编码">
                            <el-input v-model="form.code" style="width:400px;" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="名称">
                            <el-input v-model="form.name" style="width:400px;" :disabled="isname"></el-input>
                        </el-form-item>
                        <el-form-item label="医生工作站">
                            <el-select v-model="form.dococtorplace" @change="handleWorkChange" clearable placeholder="请选择" style="width:400px;" :disabled="isdococtorplace">
                                <el-option v-for="item in workplaceptions" :key="item.WORKBENCH_CODE" :label="item.WORKBENCH_NAME" :value="item.WORKBENCH_CODE"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="部门">
                            <el-select v-model="form.department" @change="handlechagenew" clearable placeholder="请选择" style="width:400px;" :disabled="isDepartment">
                                <el-option v-for="item in departmentoptions" :key="item.DEPT_ID" :label="item.DEPT_NAME_CN" :value="item.DEPT_ID"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </fieldset>
            </el-col>
        </el-row>
    </div>
</template>

<script type="text/javascript">
    import {
        mapActions
    } from 'vuex'

    export default {
        name: 'doctorDepartment',
        data() {
            return {
                radio: '',
                radioother: 1, //科室
                isname: false,
                isdococtorplace: false,
                isDepartment: false,
                isbtn: true,
                treeData: [],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                form: {
                    code: '',
                    department: '',
                    name: '',
                    dococtorplace: ''
                },
                departmentoptions: [],
                workplaceptions: [],
                btnType: 1, //编辑
                djCurrent: null
            }
        },
        watch: {
            radio(val, oldval) {
                console.log(val)
                if (val !== oldval && this.radio !== '') {
                    this.isbtn = false
                }
                if (val == 0) {
                    this.radioother = 0 //工作站
                } else {
                    this.radioother = 1 //科室
                    this.isname = true
                }
            }
        },
        created() {
            this.getWADWorkstationAll()
            this.getWadDepartmentAll()
            this.getWadDepartment()
        },
        methods: {
            ...mapActions([
                'GET_GetWadDepartmentAll',
                'GET_GetWadDepartment',
                'GetWADWorkstationAll',
                'WadWorkSave',
                'WadDepaSave'
            ]),
            handleadd() {
                if (this.radioother == 0) {
                    //工作站
                    this.isname = false
                    this.isdococtorplace = true
                    this.isDepartment = false
                } else {
                    //部门
                    this.isname = true
                    this.isdococtorplace = false
                    this.isDepartment = false
                }
                this.btnType = 0 //新增

                // 新增
                for (const key in this.form) {
                    // 清空表单控件
                    this.form[key] = ''
                    this.djCurrent = null
                }
            },
            save() {
                console.log(this.radioother)
                if (this.radioother == 0) {
                    //工作站
                    this.wadWorkSave()
                } else {
                    //科室
                    this.wadDepaSave()
                }
            },
            wadWorkSave() {
                //工作站保存
                const data = {
                    DEP_CODE: this.form.department, //部门id
                    DEP_CODE_DOC: this.form.department,
                    FORM_NAME: this.form.name,
                    WORKBENCH_CODE: this.btnType == 0 ? '' : this.form.code,
                    WORKBENCH_NAME: this.btnType == 0 ? this.form.name : this.djCurrent.label, //名称
                    UORI: this.btnType //UORI为0是新增,否则修改
                }
                console.log(JSON.stringify(data))
                this.WadWorkSave(data).then(res => {
                    if (res.code == '1') {
                        this.$message.success(res.msg)
                        this.getWADWorkstationAll()
                        this.getWadDepartmentAll()
                        this.getWadDepartment()
                    }
                })
            },
            wadDepaSave() {
                //科室保存
                const data = {
                    MR_DEPT_ID: this.btnType == 0 ? this.form.department : this.form.code,
                    WORKBENCH_CODE: this.btnType == 0 ? this.form.dococtorplace : this.form.dococtorplace,
                    WORKBENCH_CODE_N: this.form.dococtorplace,
                    UORI: this.btnType //UORI为0是新增,否则修改
                }
                console.log(JSON.stringify(data))
                this.WadDepaSave(data).then(res => {
                    if (res.code == '1') {
                        this.$message.success(res.msg)
                        this.getWADWorkstationAll()
                        this.getWadDepartmentAll()
                        this.getWadDepartment()
                    }
                })
            },
            handleNodeClick(data) {
                this.btnType = 1 //修改
                console.log(data)
                this.djCurrent = data
                this.radio = ''
                this.isbtn = true
                this.isname = true
                if (data.children) {
                    // 点击一级目录
                    this.radioother = 0 //工作站
                    this.isdococtorplace = true
                    this.isDepartment = false
                    this.form.code = data.id
                    this.form.name = data.label
                    this.form.dococtorplace = data.WORKBENCH_CODE
                    this.form.department = data.DEP_CODE
                } else {
                    this.radioother = 1 //科室
                    this.isDepartment = true
                    this.isdococtorplace = false
                    this.form.code = data.id
                    this.form.name = data.label
                    this.form.dococtorplace = data.WORKBENCH_CODE
                    this.form.department = ''
                }
            },
            getWADWorkstationAll() {
                this.GetWADWorkstationAll().then(res => {
                    if (res.code == 1) {
                        this.treeData = res.values
                        this.isname = true
                        const newTreeData = this.treeData.filter(item => {
                            return item.children.length > 0
                        })
                        this.$nextTick(() => {
                            if (newTreeData.length > 0) {
                                this.$refs.tree.setCurrentKey(newTreeData[0].children[0].id)
                                this.form.code = newTreeData[0].children[0].id
                                this.form.name = newTreeData[0].children[0].label
                                this.form.dococtorplace =
                                    newTreeData[0].children[0].WORKBENCH_CODE
                                this.form.department = ''
                                this.isdococtorplace = false
                                this.isDepartment = true
                            }
                        })
                    }
                })
            },
            getWadDepartmentAll() {
                // 获取工作站
                this.GET_GetWadDepartmentAll().then(res => {
                    // console.log(res);
                    if (res.code == 1) {
                        this.workplaceptions = res.values
                    }
                })
            },
            getWadDepartment() {
                // 获取科室
                this.GET_GetWadDepartment().then(res => {
                    if (res.code == 1) {
                        this.departmentoptions = res.values
                    }
                })
            },
            handleWorkChange(val) {},
            handlechagenew(val) {}
        }
    }
</script>
<style lang="scss" scoped>
    .bed-maint {
        height: 100%;
        .btn {
            margin: 10px 0px 30px 10px;
        }

        .formbox {
            margin-left: 120px;
        }

        .field-st {
            background: white;
            height: calc(100vh - 135px);
            border-radius: 8px 8px;
            border: 1px solid #c0c0c0;
        }

        .radiobox {
            margin: 0px 0px 60px 220px;
        }

        .tree-pannel {
            border: 1px solid #c0c0c0;
            overflow-y: auto;
            height: calc(100vh - 135px);
        }

    }
</style>
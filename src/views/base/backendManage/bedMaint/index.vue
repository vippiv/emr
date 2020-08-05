<template>
    <div class="bed-maint" style="background:white;">
        <!-- <h1 class="ck-subnav-caption">床位维护</h1> -->
        <el-row :gutter="16">
            <el-col :span="8">
                <el-tree class="tree-pannel" :data="treeData" :props="defaultProps" @node-click="handleNodeClick" highlight-current default-expand-all></el-tree>
            </el-col>
            <el-col :span="16">
                <fieldset class="field-st">
                    <div class="btn">
                        <el-button type="primary" size="small" @click="handleadd">新增</el-button>
                        <el-button type="primary" size="small" @click="save">保存</el-button>
                    </div>
                    <el-form class="formbox" ref="form1" :model="form" label-width="100px" size="small">
                        <el-form-item label="床号" prop="bedNo">
                            <el-input v-model="form.bedNo" style="width:400px;" :disabled="isbed"></el-input>
                        </el-form-item>
                        <el-form-item label="科室" prop="department">
                            <el-select v-model="form.department" @change="handlechagenew" clearable placeholder="请选择" style="width:400px;">
                                <el-option v-for="item in departmentoptions" :key="item.DEPT_ID + Math.random()" :label="item.DEPT_NAME_CN" :value="item.DEPT_ID"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="病床类别" prop="bedlb">
                            <el-select v-model="form.bedlb" @change="handlechagenew" clearable placeholder="请选择" style="width:400px;">
                                <el-option v-for="item in bedtypeoptions" :key="item.CODE_ID + Math.random()" :label="item.CODE_NAME" :value="item.CODE_ID"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="病床种类" prop="bedzl">
                            <el-select v-model="form.bedzl" @change="handlechagenew" clearable placeholder="请选择" style="width:400px;">
                                <el-option v-for="item in bedclassoptions" :key="item.CODE_ID + Math.random()" :label="item.CODE_NAME" :value="item.CODE_ID"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="病床性别" prop="bedsex">
                            <el-select v-model="form.bedsex" @change="handlechagenew" clearable placeholder="请选择" style="width:400px;">
                                <el-option v-for="item in sexoptions" :key="item.CODE_ID + Math.random()" :label="item.CODE_NAME" :value="item.CODE_ID"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="收费级别" prop="freejb">
                            <el-select v-model="form.freejb" @change="handlechagenew" clearable placeholder="请选择" style="width:400px;">
                                <el-option v-for="item in gradeoptions" :key="item.CODE_ID + Math.random()" :label="item.CODE_NAME" :value="item.CODE_ID"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="状态" prop="status">
                            <el-select v-model="form.status" @change="handlechagenew" clearable placeholder="请选择" style="width:400px;">
                                <el-option v-for="item in stateoptions" :key="item.CODE_ID + Math.random()" :label="item.CODE_NAME" :value="item.CODE_ID"></el-option>
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
        name: 'bedMaint',
        data() {
            return {
                isbed: false,
                treeData: [],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                form: {
                    bedNo: '',
                    department: '',
                    bedlb: '',
                    bedzl: '',
                    bedsex: '',
                    freejb: '',
                    status: ''
                },
                departmentoptions: [],
                bedtypeoptions: [],
                bedclassoptions: [],
                sexoptions: [],
                gradeoptions: [],
                stateoptions: [],
                btnType: 0 // 新增按钮
            }
        },
        created() {
            this.getDepartmentAndBedAll()
            this.getBedDepartmentAll()
            this.getBedType()
            this.getbedclass()
            this.getBedSex()
            this.getBedGrade()
            this.getBedState()
        },
        methods: {
            ...mapActions([
                'GET_GetBedDepartmentAll',
                'GET_GetBedType',
                'GET_GetBedClass',
                'GET_GetBedSex',
                'GET_GetBedGrade',
                'GET_GetBedState',
                'DepartmentAndBedSave',
                'GetDepartmentAndBedAll',
                'GetBedInfoByID'
            ]),
            handleadd() {
                // 新增
                this.btnType = 0
                this.form.bedNo = ''
                for (const key in this.form) {
                    if (key == 'department') {
                        continue
                    }
                    this.form[key] = ''
                }
                this.isbed = false
            },
            save() {
                // 保存
                for (const key in this.form) {
                    if (this.form[key] == '') {
                        this.$message.warning('请完善信息!')
                        return
                    }
                }
                const bed = {
                    BED_NO: this.form.bedNo,
                    DEPT_ID: this.form.department,
                    BED_CAT: this.form.bedlb,
                    BED_TYPE: this.form.bedzl,
                    BED_GENDER: this.form.bedsex,
                    BED_LEVEL: this.form.freejb,
                    BED_STATUS: this.form.status,
                    iuid: this.btnType
                }
                this.DepartmentAndBedSave(bed).then((res) => {
                    if (res.code == 1) this.$message.success(res.msg)
                    this.getDepartmentAndBedAll()
                })
            },
            handleNodeClick(data) {
                this.isbed = true
                this.btnType = 1
                // console.log(data)
                if (data.Tag != 1) this.getBedInfoByID(data.label)
            },
            getBedInfoByID(param) {
                // 获取单个床位信息
                const data = {
                    label: param
                }
                this.GetBedInfoByID(data).then((res) => {
                    if (res.code == 1) {
                        const data = res.values[0]
                        this.form.bedNo = data.BED_NO
                        this.form.department = data.DEPT_ID
                        this.form.bedlb = data.BED_CAT
                        this.form.bedzl = data.BED_TYPE
                        this.form.bedsex = data.BED_GENDER
                        this.form.freejb = data.BED_LEVEL
                        this.form.status = data.BED_STATUS
                    }
                })
            },
            getDepartmentAndBedAll() {
                // 获取所有部门、床位
                this.GetDepartmentAndBedAll().then((res) => {
                    if (res.code == 1) {
                        this.treeData = res.values
                    }
                })
            },
            getBedDepartmentAll() {
                // 获取所有科室
                this.GET_GetBedDepartmentAll().then((res) => {
                    // console.log(res);
                    if (res.code == 1) {
                        this.departmentoptions = res.values
                    }
                })
            },
            getBedType() {
                // 获取所有病床类别
                this.GET_GetBedType().then((res) => {
                    if (res.code == 1) {
                        this.bedtypeoptions = res.values
                    }
                })
            },
            getBedSex() {
                // 获取性别
                this.GET_GetBedSex().then((res) => {
                    // console.log(res);
                    if (res.code == 1) {
                        this.sexoptions = res.values
                    }
                })
            },
            getbedclass() {
                // 获取病床种类
                this.GET_GetBedClass().then((res) => {
                    if (res.code == 1) {
                        this.bedclassoptions = res.values
                    }
                })
            },
            getBedGrade() {
                // 获取收费级别
                this.GET_GetBedGrade().then((res) => {
                    if (res.code == 1) {
                        this.gradeoptions = res.values
                    }
                })
            },
            getBedState() {
                // 获取状态
                this.GET_GetBedState().then((res) => {
                    if (res.code == 1) {
                        this.stateoptions = res.values
                    }
                })
            },
            handlechagenew(val) {}
        }
    }
</script>
<style lang="scss" scoped>
    .bed-maint {
        .btn {
            margin: 10px 0px 40px 10px;
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

        .tree-pannel {
            border: 1px solid #c0c0c0;
            overflow-y: auto;
            height: calc(100vh - 135px);
        }
    }
</style>
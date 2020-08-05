<template>
    <div class="subIplManage-dailog">
        <el-dialog title="模板属性" :visible.sync="dialogFormVisible" :before-close="handleClose" append-to-body :close-on-click-modal="false" width="471px" style="height:654px+15vh">
            <el-form :model="form" label-width="90px" :rules="rules" ref="form" label-position="left" size="small">
                <el-form-item label="模板名称" prop="name">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="所属业务域">
                    <el-select v-model="form.region" placeholder="请选择活动区域" style="width:100%" @change="selectChange()">
                        <el-option v-for="item in options" :key="item.LIST_CODE" :label="item.LIST_NAME" :value="item.LIST_CODE"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="存储表" prop="sheet" v-if="isbook">
                    <el-input size="mini" v-model="form.sheet"></el-input>
                </el-form-item>
                <el-form style="margin-top:-12px;margin-bottom:19px;">
                    <fieldset style="border:1px solid #dcdfe6;border-radius:5px;line-height:2.3;">
                        <legend>模板类别</legend>
                        <el-form-item>
                            <el-radio-group v-model="form.radio" class="mblb">
                                <el-radio :label="2">通用模板</el-radio>
                                <el-radio :label="1">男性模板</el-radio>
                                <el-radio :label="0">女性模板</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </fieldset>
                </el-form>
                <el-form-item label="备注">
                    <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="form.textarea"></el-input>
                </el-form-item>
                <el-form-item style="margin-bottom:8px;">
                    <el-radio-group v-model="form.ceradio">
                        <el-radio label="1">中医</el-radio>
                        <el-radio label="0">西医</el-radio>
                    </el-radio-group>
                    <el-checkbox v-model="form.checked" style="float:right;">是否医务科签字</el-checkbox>
                </el-form-item>
                <el-form-item>
                    <el-row :gutter="6">
                        <el-col :span="8">
                            <el-form-item prop="checkedSingle">
                                <el-checkbox v-model="form.checkedSingle">是否多份</el-checkbox>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item prop="checkedArea">
                                <el-checkbox v-model="form.checkedArea">是否区域打开</el-checkbox>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form size="small">
                    <fieldset style="border:1px solid #dcdfe6;border-radius:5px;padding:0px 10px;">
                        <legend>模板、科室</legend>
                        <el-form-item>
                            <el-radio-group v-model="form.mkradio">
                                <el-radio label="MA" disabled>标准模板</el-radio>
                                <el-radio label="MB" disabled>专科模板</el-radio>
                                <el-radio label="MC" disabled>个人模板</el-radio>
                                <el-radio label="MZ" disabled>门诊模板</el-radio>
                                <el-radio label="MS" disabled>科室</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item prop="selected">
                            <el-select v-model="form.selected" size="mini" :disabled="isdisableSelect">
                                <el-option v-for="item in kstions" :key="item.DEPT_ID" :label="item.SHORT_CODE" :value="item.DEPT_ID"></el-option>
                            </el-select>
                        </el-form-item>
                    </fieldset>
                </el-form>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="handleClose" size="small">取 消</el-button>
                <el-button type="primary" size="small" @click="handleAdd('form')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import moment from 'moment'
    import {
        mapState
    } from 'vuex'
    import {
        createNamespacedHelpers
    } from 'vuex'
    const {
        mapActions
    } = createNamespacedHelpers('residentDoctor')

    export default {
        name: 'subTplManageDailog',
        props: {
            dialogFormVisible: {
                type: Boolean,
                default: false
            },
            dailogType: {
                type: Number,
                default: 1
            },
            editRes: {
                type: Object,
                default: () => {}
            },
            tpck: {
                type: String,
                default: ''
            },
            currentTreeNode: {
                type: Object,
                default: () => {}
            },
            subType: {
                type: Number,
                default: 0
            }
        },
        data() {
            return {
                temPath: '',
                koko: '',
                xiuCode: '',
                xiuDate: '',
                isdisableSelect: false,
                kstions: [],
                options: [],
                isbook: false,
                form: {
                    sheet: '',
                    assion: '',
                    selected: '',
                    checkedSingle: false,
                    checked: false,
                    checkedArea: false,
                    textarea: '',
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    desc: '',
                    radio: 2,
                    mkradio: ["MA", "MB", "MC", "MZ", "MS"],
                    ceradio: '',
                },
                rules: {
                    name: [{
                        required: true,
                        message: '请输入模板名称',
                        trigger: 'blur'
                    }, ]
                },
            }
        },
        created() {
            this.getInformation()
        },
        watch: {
            dialogFormVisible(val) {
                if (val) {}
            }
        },
        computed: {
            ...mapState({
                loginUserId: state => state.global.userInfo
            })
        },
        methods: {
            ...mapActions([
                'GET_DOCTORBUSINESS',
                'GET_DOCTORDEPT',
                'DOCTOR_INSERTTEMPLATESAVE'
            ]),
            // 业务域值变化事件
            selectChange() {
                if (this.form.region == '0705') {
                    this.isbook = true
                } else {
                    this.isbook = false
                    if (this.dailogType == 1) {
                        this.form.sheet = ''
                    }
                }
            },
            // 获取科室
            getDept() {
                if (this.tpck == 'MS') {
                    // 获取科室
                    let params = {
                        deptId: this.currentTreeNode.code
                    }
                    this.GET_DOCTORDEPT(params).then((res) => {
                        this.kstions = res.values
                        this.form.selected = this.kstions[0].DEPT_ID
                    })
                } else {
                    this.isdisableSelect = true
                }
            },
            // 获取业务域
            getBusiness() {
                this.GET_DOCTORBUSINESS().then((res) => {
                    this.options = res.values
                    if(this.dailogType == 1) {
                        this.form.region = this.options[0].LIST_CODE
                    }
                })
            },
            // 信息获取
            getInformation() {
                this.getDept()
                this.getBusiness()
                if (this.dailogType == 1) {
                    this.form.name = ''
                    this.form.textarea = ''
                    this.form.textarea = ''
                    this.form.mkradio = this.tpck
                    this.form.checkedSingle = this.form.checkedSingle
                    this.form.checked = this.form.checked
                    this.form.checkedArea = this.form.checkedArea
                    this.form.ceradio = this.form.ceradio
                } else {
                    this.$nextTick(function() {
                        if (this.form.region == '0705') {
                            this.isbook = true
                        } else {
                            this.isbook = false
                        }
                    })
                    this.form.sheet = this.editRes.SaveSheet
                    this.form.name = this.editRes.MR_NAME
                    this.form.radio = this.editRes.SEX_FITER
                    this.form.textarea = this.editRes.CONTENT_CODE
                    this.form.ceradio = this.editRes.MEDICINE_TYPE
                    this.form.region = this.editRes.LIST_CODE
                    this.editRes.IS_SINGLE == 0 ? this.form.checkedSingle : (this.form.checkedSingle = true)
                    this.editRes.MUST_FITER == 0 ? this.form.checked : (this.form.checked = true)
                    this.form.mkradio = this.tpck
                    this.editRes.AREA_FLAG == 0 ? this.form.checkedArea : (this.form.checkedArea = true)
                    this.xiuCode = this.editRes.MR_CODE
                    this.xiuDate = this.editRes.CREATE_DATE_TIME
                }
            },
            // 保存
            handleAdd(formName) {
                this.$refs[formName].validate((valid) => {
                    if (!valid) {
                        return
                    } else {
                        if (this.form.mkradio == 'MC') {
                            this.form.assion = 0
                        } else if (this.form.mkradio == 'MS') {
                            this.form.assion = 1
                        } else {
                            this.form.assion = 2
                        }
                        if (this.form.mkradio == 'MS') {
                            this.koko = this.form.selected
                        } else {
                            this.koko = this.form.mkradio
                        }
                        // 新增为1
                        if (this.dailogType == 1) {
                            this.xiuCode = ''
                            this.xiuDate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
                        } else {
                            this.xiuCode = this.xiuCode
                            this.xiuDate = this.xiuDate
                        }
                        if (this.isbook == false) {
                            this.form.sheet = ''
                        }
                        let params = {
                            SaveSheet: this.form.sheet.trim(),
                            LIST_CODE: this.form.region,
                            MR_CODE: this.xiuCode,
                            MR_NAME: this.form.name.trim(),
                            MONITOR_CODE: '',
                            MR_ATTR: this.currentTreeNode.id,
                            DEPT_ID: this.koko,
                            CREATOR_ID: this.loginUserId.UserId,
                            CREATE_DATE_TIME: this.xiuDate,
                            Last_Modify_Date_Time: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                            CONTENT_CODE: this.form.textarea,
                            PERMISSION: this.form.assion,
                            VISIBLED: 1,
                            INPUT_CODE: this.form.name.trim(),
                            MBXML: '',
                            SHOW_ORDER: '',
                            IS_SINGLE: this.form.checkedSingle ? 1 : 0,
                            SEX_FITER: this.form.radio,
                            MUST_FITER: this.form.checked ? 1 : 0,
                            HOSPITAL_CODE: '',
                            MBCONTENT: '',
                            MR_PATH: this.subType == 0 ? ('Template' + '/' + this.koko + '/' + this.form.region) : ('ChildTemplate' + '/' + this.koko + '/' + this.form.region),
                            EMR_TYPE: this.subType == 0 ? 0 : 1,
                            ITEM_FLAG: 0,
                            MEDICINE_TYPE: this.form.ceradio,
                            AREA_FLAG: this.form.checkedArea ? 1 : 0,
                        }
                        console.log(params)
                        this.DOCTOR_INSERTTEMPLATESAVE(params).then(res => {
                            if (res.code == 1) {
                                this.$message.success(res.msg)
                            }
                            this.handleClose()
                        })
                    }
                })
            },
            handleClose() {
                this.isbook = false
                this.$emit('closeSubManage')
            }
        }
    }
</script>
<style lang="scss" scoped>
    .subIplManage-dailog {
        height: 655px;
    }

    .mblb {
        display: flex;
        justify-content: space-around;
        line-height: 2;
    }

    /deep/textarea {
        resize: none;
    }
</style>
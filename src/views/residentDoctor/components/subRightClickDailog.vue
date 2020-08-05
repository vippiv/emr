<template>
    <div class="subTplRightClickManage-daiglog">
        <el-dialog :title="title" :visible.sync="dialogRightClickVisible" width="400px" :before-close="handleClose" append-to-body :close-on-click-modal="false">
            <el-form :model="leftNodeform">
                <el-form-item label="上级名称:" :label-width="formLabelWidth">
                    <el-input :disabled="inputVisible" v-model="leftNodeform.upName" autocomplete="off" size="mini" style="width:76%"></el-input>
                </el-form-item>
                <el-form-item label="名称:" :label-width="formLabelWidth">
                    <el-input v-model="leftNodeform.tempName" autocomplete="off" size="mini" style="width:76%"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" style="text-align:center">
                <el-button @click="handleClose" size="mini">取 消</el-button>
                <el-button type="primary" @click="addTempForm" size="mini">确 定</el-button>
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
        name: 'subRightClickDailog',
        props: {
            dialogRightClickVisible: {
                type: Boolean,
                default: false
            },
            title: {
                type: String,
                default: ''
            },
            nodeData: {
                type: Object,
                default: () => {}
            },
            objNode: {
                type: Object,
                default: () => {}
            },
            rightClickType: {
                type: Number,
                default: 0
            },
            subType: {
                type: Number,
                default: 0
            }
        },
        data() {
            return {
                inputVisible: true,
                formLabelWidth: '80px',
                leftNodeform: {
                    upName: '',
                    tempName: ''
                },
            }
        },
        created() {
            this.get_Information()
        },
        computed: {
            ...mapState({
                loginUserId: state => state.global.userInfo,
            })
        },
        methods: {
            ...mapActions([
                'DOCTOR_INSERT',
                'DOCTOR_UPINSERT',
            ]),
            get_Information() {
                if (this.rightClickType == 0) {
                    this.leftNodeform.upName = this.nodeData.label
                } else {
                    this.leftNodeform.upName = this.nodeData.parent.data.label
                    this.leftNodeform.tempName = this.nodeData.label
                }
            },
            // 保存
            addTempForm() {
                let params = {
                    LIST_CODE: '0',
                    MR_CODE: this.rightClickType == 1 ? this.objNode.id : '',
                    MR_NAME: this.leftNodeform.tempName.trim(),
                    MR_ATTR: this.rightClickType == 1 ? this.nodeData.parent.data.id : this.objNode.id,
                    DEPT_ID: this.objNode.code == 'MC' ? this.objNode.code : this.nodeData.parent.data.code,
                    CREATOR_ID: this.loginUserId.UserId,
                    CREATE_DATE_TIME: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                    LAST_MODIFY_DATE_TIME: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                    VISIBLED: 1,
                    INPUT_CODE: this.leftNodeform.tempName.trim(),
                    INPUTWB_CODE: this.leftNodeform.tempName.trim(),
                    IF_FLAG: 1,
                    EMR_TYPE: this.subType == 0 ? 0 : 1,
                    ITEM_FLAG: 9,
                }
                console.log(params);
                if (this.rightClickType == 0) {
                    this.DOCTOR_INSERT(params).then(res => {
                        if (res.code == 1) {
                            this.$message.success(res.msg)
                        }
                    })
                } else {
                    this.DOCTOR_UPINSERT(params).then(res => {
                        console.log(res);
                        if (res.code == 1) {
                            this.$message.success(res.msg)
                        }
                    })
                }
                this.handleClose()
            },
            // 树获取
            handleClose() {
                this.$emit('closeSubRightClickManage')
            }
        }
    }
</script>
<style lang="scss" scoped>
</style>
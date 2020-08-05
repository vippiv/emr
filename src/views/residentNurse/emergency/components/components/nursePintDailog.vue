// 打印参弹窗
<template>
    <div class="print-dailog">
        <el-dialog title="打印参数设置" :visible.sync="show" append-to-body width="460px" :close-on-click-modal="false" @close='handleclose'>
            <el-form :model="form" size="small">
                <el-row :gutter="15">
                    <el-col :span="12">
                        <el-form-item label="开始页码">
                            <el-input-number v-model="form.startpagenumber" @change="handleChange" :min="0" :max="100" label="描述文字"></el-input-number>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="开始行号">
                            <el-input-number v-model="form.startlinenumber" @change="handleChange" :min="0" :max="100" label="描述文字"></el-input-number>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="15">
                    <el-col :span="12">
                        <el-form-item label="结束页码">
                            <el-input-number v-model="form.endpagenumber" @change="handleChange" :min="0" :max="100" label="描述文字"></el-input-number>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="结束行号">
                            <el-input-number v-model="form.endlinenumber" @change="handleChange" :min="0" :max="100" label="描述文字"></el-input-number>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item>
                    <el-checkbox v-model="form.checked">打印页眉、页脚</el-checkbox>
                </el-form-item>
                <el-form-item label="打印份数">
                    <el-input-number v-model="form.printnumber" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="handleclose" size="small">取 消</el-button>
                <el-button type="primary" @click="handleConfirm" size="small">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        name: 'subTplManagePrintDailog',
        props: {
            show: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                form: {
                    name: '',
                    startpagenumber: '', //开始页码
                    startlinenumber: '', //开始行号
                    endpagenumber: '', //结束页码
                    endlinenumber: '', //结束行号
                    checked: false,
                    printnumber: '' //打印份数
                }
            }
        },
        created() {},
        methods: {
            handleChange() {

            },
            handleclose() {
                this.$emit('closeprindailog',this.form)
            },
            handleConfirm() { //确定
                this.handleclose()
                this.$emit('handleprinting')
            }
        }
    }
</script>
<style lang="scss" scoped>

</style>
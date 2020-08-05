<template>
    <div class="positionDia-container">
        <el-dialog title="定位" :visible.sync="positionshows" width="400px" @close='handleCancel'>
            <el-form :model="form" size="small" label-width="80px" label-position="left">
                <el-form-item label="床位">
                    <el-input v-model="form.cw" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="住院号">
                    <el-input v-model="form.hospitalNo" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="病人姓名">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" style="text-align:right;">
                <el-button type="primary" @click="handleConfirm" size="small">查询</el-button>
                <el-button @click="handleCancel" size="small">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script type="text/javascript">
    import Evtbus from '@/utils/bus'
    export default {
        name: 'PositionDia',
        props: {
            positionshow: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                positionshows:this.positionshow,
                form: {
                    cw: '',
                    hospitalNo: '',
                    name: '',
                    close: false,
                    query: 1,
                    btnType: 'position'
                }
            }
        },
        mounted () {
            const eDialog = document.querySelector('.el-dialog[role="dialog"]')
            console.log('eDialog', eDialog)
            eDialog.style.bottom = "auto"
        },
        methods: {
            handleclose() {
                this.form.query = 0
                this.handleModelClose()
            },
            handleModelClose() {
                Evtbus.$emit('showIframe', false)
                this.$emit('topMenuDiaData', this.form)
            },
            handleConfirm() {
                //查询
                this.form.query = 1
                this.handleModelClose()
            },
            handleCancel() {
                //取消
                this.form.query = 0
                this.handleModelClose()
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
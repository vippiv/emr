<template>
    <div class="resident-nurse-dialog-container">
        <!-- 住院护士顶部导航菜单弹窗 -->
        <el-dialog :title="title" :visible.sync="dialogVisible" :close-on-click-modal="false" :width="diaWidth" :before-close="handleClose">
            <slot name="main"></slot>
        </el-dialog>
    </div>
</template>

<script type="text/javascript">
    export default {
        name: 'ResidentNurseDialogMenuContent',
        props: {
            title: {
                type: String,
                default: '提示'
            },
            dialogVisible: {
                type: Boolean,
                default: false
            },
            diaWidth: {
                type: String,
                default: '60%'
            }
        },
        data() {
            return {}
        },
        methods: {
            handleClose() {
                this.$emit('closeTopMeunDia')
            }
        }
    }
</script>

<style lang="scss" scoped>
    /deep/.el-dialog__wrapper .el-dialog {
        margin-top: auto !important;
        position: absolute;
        left: 0px;
        right:0px;
        top: 5%;
        bottom:0px;
    }
</style>
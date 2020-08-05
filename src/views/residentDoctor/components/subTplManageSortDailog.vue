<template>
    <div class="sub-manage-sort">
        <el-dialog title="模板排序" :visible.sync="dialogSortVisible" :before-close="handleClose" :close-on-click-modal="false" append-to-body width="401px" style="height:632px+15vh">
            <el-row>
                <el-col :span="20">
                    <div style="height:60vh;border:1px solid #ececec; overflow-y: auto;">
                        <ul class="ul">
                            <li :class="[item.flag?'bgclass':'']" @click="handleitem(item)" v-for="item in syData" :key="item.MR_CODE">{{item.MR_NAME}}</li>
                        </ul>
                    </div>
                </el-col>
                <el-col :span="4" style="text-align:center;">
                    <div>
                        <el-button type="primary" size="small" @click="moveup">向上</el-button>
                    </div>
                    <div style="margin-top:10px;">
                        <el-button type="primary" size="small" @click="movedown">向下</el-button>
                    </div>
                    <div style="margin-top:35px;">
                        <el-button type="primary" size="small" @click="saveTemp">保存</el-button>
                    </div>
                </el-col>
            </el-row>
        </el-dialog>
    </div>
</template>
<script>
    import {
        createNamespacedHelpers
    } from 'vuex'
    const {
        mapActions
    } = createNamespacedHelpers('residentDoctor')

    export default {
        name: 'subTplManageSortDailog',
        props: {
            dialogSortVisible: {
                type: Boolean,
                default: false
            },
            tableData: {
                type: Array,
                default: () => []
            },
            currentTreeNode: {
                type: Object,
                default: () => {}
            },
            form: {
                type: Object,
                default: () => {}
            },
            subType: {
                type: Number,
                default: 0
            },
        },
        data() {
            return {
                // 向上功能
                issyData: [],
                dataIndex: 0,
                currenttwdData: null,
                syData: []
            }
        },
        created() {
            this.getSort()
        },
        methods: {
            ...mapActions([
                'DOCTOR_RANK',
                'BTN_DOCTOR_RANKSAVE',
                'GTE_DOCTORCHILDRANK',
                'BTNDOCTOR_RANKSAVE'
            ]),
            getSort() {
                if (this.tableData.length > 0) {
                    const params = {
                        sid: this.currentTreeNode.id,
                        code: this.currentTreeNode.code,
                        tag: this.currentTreeNode.Tag,
                        cbWoman: this.form.checkList.indexOf('woman') > -1 ? '1' : '0',
                        cbMan: this.form.checkList.indexOf('man') > -1 ? '1' : '0',
                        cbTY: this.form.checkList.indexOf('ty') > -1 ? '1' : '0'
                    }
                    if (this.subType == 0) {
                        this.DOCTOR_RANK(params).then((res) => {
                            let result = res.values
                            this.syData = res.values
                        })
                    } else {
                        this.GTE_DOCTORCHILDRANK(params).then((res) => {
                            let result = res.values
                            this.syData = res.values
                        })

                    }
                }
            },
            handleClose() {
                this.$emit('closeSubSortManage')
            },
            // 排序保存按钮
            saveTemp() {
                const sa = []
                const param = []
                this.syData.forEach((item, index) => {
                    let param = {
                        SHOW_ORDER: index,
                        MR_CODE: item.MR_CODE
                    }
                    sa.push(param)
                    param = sa
                })
                if (this.subType == 0) {
                    this.BTN_DOCTOR_RANKSAVE({
                        sa
                    }).then((res) => {
                        this.$message.success('保存成功')
                        this.issyData = []
                        this.handleClose()
                    })
                } else {
                    this.BTNDOCTOR_RANKSAVE({
                        sa
                    }).then((res) => {
                        this.$message.success('保存成功')
                        this.issyData = []
                        this.handleClose()
                    })
                }

            },
            // 向上移动
            moveup() {
                if (this.issyData.length == 0) {
                    this.$message({
                        type: 'warning',
                        message: '请选择要移动的列！'
                    })
                    return null
                }
                const index = this.dataIndex
                const tempOption = this.syData[index - 1]
                if (this.dataIndex == 0) {
                    this.$message({
                        type: 'warning',
                        message: '已置顶'
                    })
                    return null
                }
                this.$set(this.syData, index - 1, this.syData[index])
                this.$set(this.syData, index, tempOption)
                this.dataIndex--
            },
            handleitem(val) {
                // 填充数据
                this.currenttwdData = val
                this.issyData.push(val)
                this.dataIndex = this.getArrayIndex(this.syData, val)
                // 点击每个li
                const newSysData = []
                this.syData.forEach((el) => {
                    el.flag = false
                    newSysData.push(el)
                })
                newSysData.forEach((element) => {
                    if (element == val) {
                        element.flag = true
                    }
                })
                this.syData = newSysData
            },
            getArrayIndex(arr, obj) {
                // 获取数组元素的下标
                let i = arr.length
                while (i--) {
                    if (arr[i] === obj) {
                        return i
                    }
                }
                return -1
            },
            // 向下移动
            movedown() {
                // 向下移动
                if (this.issyData.length == 0) {
                    this.$message({
                        type: 'warning',
                        message: '请选择要移动的列！'
                    })
                    return null
                }
                const index = this.dataIndex
                const tempOption = this.syData[index + 1]
                if (this.dataIndex - this.syData.length == -1) {
                    this.$message({
                        type: 'warning',
                        message: '已置底'
                    })
                    return null
                }
                this.$set(this.syData, index + 1, this.syData[index])
                this.$set(this.syData, index, tempOption)
                this.dataIndex++
            },
        }
    }
</script>
<style lang="scss" scoped>
    .bgclass {
        background-color: #44B3C7;
        color: white;
    }

    ul {
        cursor: pointer;
    }
</style>
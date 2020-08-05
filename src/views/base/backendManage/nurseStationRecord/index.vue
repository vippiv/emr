<template>
    <div class="nurse-station-record" style="background-color:white;">
        <!-- <h1 class="ck-subnav-caption">护士工作站与护士记录单维护</h1> -->
        <el-row>
            <el-col :span="5">
                <el-tree ref="tree" class="tree-pannel" :data="treeData" :props="defaultProps" @node-click="handleNodeClick" highlight-current node-key="id" default-expand-all></el-tree>
            </el-col>
            <el-col :span="18" :offset="1">
                <div style="margin-bottom:80px;">
                    <el-button @click="handleadd" type="primary" size="small">新增</el-button>
                    <el-button @click="handlesave" type="primary" size="small">保存</el-button>
                    <el-button @click="delInfor" type="primary" size="small">删除</el-button>
                </div>
                <el-form class="formbox" ref="form" :model="form" label-width="100px" size="small">
                    <el-form-item label="工作台">
                        <el-select v-model="form.workplat" clearable placeholder="请选择" style="width:260px;">
                            <el-option v-for="item in workplaceOptions" :key="item.WORKBENCH_CODE" :label="item.WORKBENCH_NAME" :value="item.WORKBENCH_CODE"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="名称" style="margin-top:40px;">
                        <el-input v-model="form.name" style="width:260px;"></el-input>
                    </el-form-item>
                    <el-form-item label="编码" style="margin-top:40px;">
                        <div style="width:260px;">{{form.code}}</div>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import {
        mapActions
    } from 'vuex'

    export default {
        data() {
            return {
                form: {
                    workplat: '',
                    name: '',
                    code: ''
                },
                workplaceOptions: [],
                treeData: [],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                currenData: null,
                btnType: 1
            }
        },
        created() {
            this.getNurseSheetInfo()
            this.getcmbFathers()
        },
        mounted() {},
        methods: {
            ...mapActions([
                'GetNurseSheetInfo',
                'GetcmbFathers',
                'DeleteNurseSheet',
                'SaveNurseSheet'
            ]),
            handleNodeClick(data) {
                console.log(data)
                this.btnType = 1
                this.currenData = data
                this.form.workplat = data.code
                this.form.name = data.label
                this.form.code = data.id
            },
            getNurseSheetInfo() {
                // 加载获取护士工作站与护理单
                this.GetNurseSheetInfo().then((res) => {
                    if (res.code == 1) {
                        this.treeData = res.values
                        this.$nextTick(() => {
                            if (this.treeData[0].children.length == 0) {
                                this.$refs.tree.setCurrentKey(this.treeData[0].id)
                                this.form.workplat = this.treeData[0].code
                                this.form.name = this.treeData[0].label
                                this.form.code = this.treeData[0].id
                            } else {
                                this.$refs.tree.setCurrentKey(this.treeData[0].children[0].id)
                                this.form.workplat = this.treeData[0].children[0].code
                                this.form.name = this.treeData[0].children[0].label
                                this.form.code = this.treeData[0].children[0].id
                            }
                        })
                    }
                })
            },
            getcmbFathers() {
                // 获取工作台
                this.GetcmbFathers().then((res) => {
                    if (res.code == 1) {
                        this.workplaceOptions = res.values
                    }
                })
            },
            handleadd() {
                // 新增
                this.btnType = 0
                this.form.name = ''
                this.form.code = ''
            },
            handlesave() {
                // 保存
                const param = {
                    type: this.btnType, // 状态（0：新增；1：更新）
                    txtNames: this.form.name,
                    cmbFathers: this.form.workplat,
                    hid: this.form.code
                }
                console.log(param)
                this.SaveNurseSheet(param).then((res) => {
                    if (res.code == 1) {
                        this.getNurseSheetInfo()
                        this.$message.success(res.msg)
                    }
                })
            },
            delInfor() {
                // 删除
                if (!this.currenData) {
                    this.$message.warning('请选择要删除的数据！')
                    return
                }
                if (this.currenData.Tag == 1) {
                    this.$message.warning('不能删除一级目录')
                    return
                }
                const param = {
                    code: this.currenData.id
                }
                this.$confirm('确定删除?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    })
                    .then(() => {
                        this.DeleteNurseSheet(param).then((res) => {
                            if (res.code == 1) this.$message.success(res.msg)
                            this.getNurseSheetInfo()
                        })
                    })
                    .catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        })
                    })
            }
        }
    }
</script>
<style lang="scss" scoped>
    .nurse-station-record {
        height: 100%;
        .tree-pannel {
            border: 1px solid #c0c0c0;
            overflow-y: auto;
            height: calc(100vh  - 135px);
        }

    }

    /deep/.el-tree-node.is-current>.el-tree-node__content {
        background-color: #44b3c7;
        color: white;
    }
</style>
<template>
    <div class="sync-manage-datatpl" style="background:white;">
        <!-- <h1 class="ck-subnav-caption">模板目录维护</h1> -->
        <el-row :gutter="16">
            <el-col :span="5">
                <el-radio-group v-model="radio" style="margin-bottom:50px;margin-top:15px;" fill="red">
                    <el-radio :label="0">病历模板目录</el-radio>
                    <el-radio :label="1">病历模板树</el-radio>
                </el-radio-group>
                <el-tree class="tree-pannel" :data="treeData" :props="defaultProps" @node-click="handleNodeClick" highlight-current></el-tree>
            </el-col>
            <el-col :span="19">
                <fieldset class="field-st">
                    <legend>数据展示</legend>
                    <el-form class="formbox" ref="form" :model="form" label-width="100px" size="small">
                        <el-form-item label="模板名称">
                            <el-input v-model="form.name" style="width:400px;"></el-input>
                        </el-form-item>
                        <el-form-item label="配置个数">
                            <el-input v-model="form.number" style="width:400px;"></el-input>
                        </el-form-item>
                        <el-form-item label="排序">
                            <el-input v-model="form.sortby" style="width:400px;"></el-input>
                        </el-form-item>
                        <el-form-item label="父级">
                            <el-select v-model="form.parentj" @change="handlechagenew" clearable placeholder="请选择" style="width:400px;" value-key="value" :disabled="isDisabled">
                                <el-option v-for="item in options" :key="item.LIST_CODE" :label="item.LIST_NAME" :value="item.LIST_CODE"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                    <div class="btn">
                        <el-button type="primary" size="small" @click="handleUpdate">修改</el-button>
                        <el-button type="primary" size="small" @click="handleDel">隐藏</el-button>
                    </div>
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
        name: 'backenddatatpl',
        data() {
            return {
                radio: 0,
                radioType: 0,
                isDisabled: false,
                treeData: [],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                form: {
                    name: '',
                    number: '',
                    sortby: '',
                    parentj: ''
                },
                parentAndSon: 1,
                options: [],
                title: '',
                currentNodeData: null
            }
        },
        watch: {
            radio(val, old) {
                if (val == 0) {
                    this.radioType = 0
                    this.getCatalogParentLevel()
                } else if (val == 1) {
                    this.radioType = 1
                    this.getTreeParentLevel()
                }
                this.currentNodeData = null
                this.getCatalogOrTree()
            }
        },
        created() {
            this.getCatalogParentLevel()
            this.getCatalogOrTree()
        },
        methods: {
            ...mapActions([
                'GET_GetCatalogParentLevel',
                'GET_GetTreeParentLevel',
                'GetCatalogOrTree',
                'CatalogSave',
                'TreeSave',
                'CatalogDele',
                'TreeDele'
            ]),
            handleNodeClick(data) {
                this.currentNodeData = data
                this.parentAndSon = data.GRADE
                if (data.GRADE == 1) {
                    this.isDisabled = true
                } else {
                    this.isDisabled = false
                }
                this.form.name = data.label
                this.form.number = !data.USER_TYPE ? '1' : data.USER_TYPE
                this.form.sortby = data.SHOW_ORDER
                this.form.parentj = data.pid
            },
            handlechagenew(val) {},
            getCatalogParentLevel() {
                // 病历模板目录父级下拉
                this.GET_GetCatalogParentLevel().then(res => {
                    if (res.code == 1) this.options = res.values
                })
            },
            getTreeParentLevel() {
                // 病历模板树父级下拉
                this.GET_GetTreeParentLevel().then(res => {
                    if (res.code == 1) this.options = res.values
                })
            },
            getCatalogOrTree() {
                const param = {
                    i: this.radioType
                }
                this.GetCatalogOrTree(param).then(res => {
                    if (res.code == 1) this.treeData = res.values
                })
            },
            handleUpdate() {
                // 修改
                if (!this.currentNodeData) {
                    this.$message.warning('请选择要修改的数据!')
                    return
                }
                const param = {
                    text: this.form.name, // 模板名称
                    UP_LIST_CODE: this.parentAndSon == 1 ? this.currentNodeData.id : this.form.parentj,
                    USER_TYPE: this.form.number, // 配置个数
                    SHOW_ORDER: this.form.sortby, // 排序
                    tid: this.currentNodeData.id,
                    tag: this.currentNodeData.tag
                }
                if (this.radio == 0) {
                    // 病历模板目录修改保存
                    this.CatalogSave(param).then(res => {
                        if (res.code == 1) this.$message.success(res.msg)
                        this.getCatalogOrTree()
                    })
                } else {
                    // 病历模板树修改保存
                    this.TreeSave(param).then(res => {
                        if (res.code == 1) this.$message.success(res.msg)
                        this.getCatalogOrTree()
                    })
                }
            },
            handleDel() {
                // 删除
                if (!this.currentNodeData) {
                    this.$message.warning('请选择要删除的数据!')
                    return null
                }
                const parma = {
                    lblCODE_LIST: this.currentNodeData.id,
                    tag: this.currentNodeData.tag
                }
                if (this.parentAndSon == 1) {
                    // 父节点
                    this.title = '删除父节点，子集将一同删除！是否要删除？'
                } else {
                    // 子节点
                    this.title = '确定删除吗？'
                }
                this.$confirm(this.title, '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    })
                    .then(() => {
                        if (this.radio == 0) {
                            // 病历模板目录删除
                            this.CatalogDele(parma).then(res => {
                                if (res.code == 1) this.getCatalogOrTree()
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                })
                            })
                        } else {
                            // 病历模板树删除
                            this.TreeDele(parma).then(res => {
                                if (res.code == 1) this.getCatalogOrTree()
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                })
                            })
                        }
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
    .sync-manage-datatpl {
        height: 100%;
    }

    .btn {
        position: absolute;
        bottom: 10%;
        right: 14%;
    }

    .formbox {
        margin-left: 120px;
        margin-top: 80px;
    }

    .field-st {
        background: white;
        height: calc(100vh - 300px);
        border-radius: 8px 8px;
        border: 1px solid #c0c0c0;
        margin-top: 10px;
    }

    .tree-pannel {
        border: 1px solid #c0c0c0;
        overflow-y: auto;
        height: calc(100vh - 210px);
    }

    /deep/.el-tree-node.is-current>.el-tree-node__content {
        background-color: #44b3c7;
        color: white;
    }

    /deep/.el-radio__input {
        &.is-checked {
            +.el-radio__label {
                color: #333333;
            }

            .el-radio__inner {
                background: #fd7624;
                border-color: #fd7624;
            }
        }

        .el-radio__inner {
            &:hover {
                border-color: #fd7624;
            }
        }
    }

    /deep/ .el-button {
        background-color: #FF8C00;
        color: white;
        border-color: #FF8C00;
        width: 80px;
    }
</style>
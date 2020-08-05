<template>
    <div class="person-main-power">
        <el-row class="gen1">
            <el-input size="mini" v-model="doctorName" class="searchInput" suffix-icon="el-icon-search" placeholder="人员姓名">
            </el-input>
            <el-button size="mini" @click="handleSearch" class="searchButton">搜索</el-button>
            <el-button size="mini" @click="handleAdd" class="searchButton">保存</el-button>
        </el-row>
        <el-row :gutter="20" class="gen3">
            <el-col :span="12">
                <div class="grid-content bg-purple-dark">用户</div>
            </el-col>
            <el-col :span="12">
                <div class="grid-content bg-purple-dark">职称</div>
            </el-col>
        </el-row>
        <el-row :gutter="20" class="gen4">
            <el-col :span="12">
                <div class="grid-content1">
                    <el-tree ref="tempTree" :data="treeData" :props="defaultProps" :filter-node-method="filterNode" @node-click="handleNodeClick" highlight-current>
                    </el-tree>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="grid-content1">
                    <el-tree ref="tree" node-key="id" :data="titleTreeTitle" show-checkbox @node-click="handleClick" @check="handleCheckChange">
                    </el-tree>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script type="text/javascript">
    import {
        mapActions
    } from 'vuex'

    export default {
        name: 'personMainTitle',
        data() {
            return {
                doctorName: '',
                currentTreeNode: null,
                beforNodes: null,
                titleTreeTitle: [],
                treeData: [],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                }
            }
        },
        created() {
            this.get_GetInformation()
            this.get_GetTitleInformation()
        },
        methods: {
            ...mapActions(['GET_USERDEPT', 'GET_TITLE', 'GET_SYS', 'SAVE_USERTITLE']),
            get_GetInformation() {
                this.GET_USERDEPT().then((res) => {
                    if (res.code === 1) {
                        this.treeData = res.values
                    } else {
                        this.$message({
                            type: 'warning',
                            message: '加载失败'
                        })
                    }
                })
            },
            get_GetTitleInformation() {
                this.GET_TITLE().then((res) => {
                    if (res.code === 1) {
                        this.titleTreeTitle = res.values
                    } else {
                        this.$message({
                            type: 'warning',
                            message: '加载失败'
                        })
                    }
                })
            },
            // 保存
            handleAdd() {
                if (!this.currentTreeNode) {
                    this.$alert('请选择一个用户进行操作', '提示', {
                        confirmButtonText: '确定',
                        type: 'warning',
                        callback: action => {}
                    })
                } else {
                    let params = {
                        StaffId: this.currentTreeNode.id,
                        TITLE_CODE: this.beforNodes ? this.beforNodes.id : ''
                    }
                    this.SAVE_USERTITLE(params).then((res) => {
                        if (res.code == 1) {
                            this.$message.success(res.msg)
                        }
                    })
                }
            },
            // 搜索
            filterNode(value, data) {
                if (!value) return true
                return data.label.indexOf(value) !== -1
            },
            handleSearch() {
                this.$refs.tempTree.filter(this.doctorName)
            },

            // 第一个树
            handleNodeClick(data) {
                if (data.Tag == 2) {
                    this.currentTreeNode = data
                    let params = {
                        userId: data.id
                    }
                    this.GET_SYS(params).then((res) => {
                        if (res.length == 0) {
                            this.$refs.tree.setCheckedKeys([])
                        } else {
                            this.$refs.tree.setCheckedKeys([res[0].TITLE_CODE])
                        }
                    })
                }
            },
            // 右边
            handleClick(data) {},
            handleCheckChange(checkedNodes) {
                this.beforNodes = checkedNodes
                this.$refs.tree.setCheckedKeys([this.beforNodes.id])
            }
        }
    }
</script>
<style lang="scss" scoped>
    .searchButton {
        width: 85px;
        height: 31px;
        background: #ff8c00;
        border-radius: 5px;
        font-size: 14px;
        color: #ffffff;
    }

    .searchInput {
        width: 336px;
        height: 35px;
        background: #ffffff;
        border: NaNpx solid #e8eaed;
        border-radius: 5px;
    }

    /deep/ .el-icon-search {
        width: 16px;
        height: 16px;
        color: #ff8c00;
    }

    .gen1 {
        margin-bottom: 9px;
    }

    .gen3 {
        margin-top: 9px;

        .bg-purple-dark {
            background: #44b3c7
        }

        .grid-content {
            text-align: center;
            min-height: 43px;
            line-height: 43px;
            font-size: 18px;
            font-family: Adobe Heiti Std R, Adobe Heiti Std R-R;
            font-weight: bold;
            color: #ffffff;
            letter-spacing: -1px;
        }

        .row-bg {
            background-color: #f9fafc
        }
    }

    .gen4 {
        margin-top: 9px;

        .grid-content1 {
            height: calc(100vh - 256px);
            overflow-y: auto;
            border: 1px solid #99a9bf
        }
    }

    /deep/.el-tree--highlight-current {
        .el-tree-node.is-current {
            &>.el-tree-node__content {
                background-color: #44B3C7;
                color: white;
            }
        }
    }
</style>
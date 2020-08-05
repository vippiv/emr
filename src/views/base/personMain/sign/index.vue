<template>
    <div class="person-main-power">
        <el-row class="gen1">
            <el-input size="mini" v-model="doctorName" class="searchInput" suffix-icon="el-icon-search" placeholder="人员姓名">
            </el-input>
            <el-button size="mini" @click="handleSearch" class="searchButton">搜索</el-button>
            <el-button size="mini" @click="updateAdd" class="searchButton">保存</el-button>
            <el-button size="mini" @click="updateView" class="searchButton">浏览</el-button>
        </el-row>
        <el-row :gutter="20" class="gen3">
            <el-col :span="12">
                <div class="grid-content bg-purple-dark">用户</div>
            </el-col>
            <el-col :span="12">
                <div class="grid-content bg-purple-dark">签名图片</div>
            </el-col>
        </el-row>
        <el-row :gutter="20" class="gen4">
            <el-col :span="12">
                <div class="grid-content1">
                    <el-tree ref="tempTree" :data="treeData" highlight-current :filter-node-method="filterNode" :props="defaultProps" @node-click="handleNodeClick">
                    </el-tree>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="grid-content1">
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
        name: 'personMainSign',
        data() {
            return {
                doctorName: '',
                // 第一个树
                treeData: [],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                }
            }
        },
        created() {
            this.get_GetInformation()
        },
        methods: {
            ...mapActions(['GET_USERLIST']),
            get_GetInformation() {
                this.GET_USERLIST().then((res) => {
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
            // 搜索
            filterNode(value, data) {
                if (!value) return true
                return data.label.indexOf(value) !== -1
            },
            handleSearch() {
                this.$refs.tempTree.filter(this.doctorName)
            },
            updateAdd() {

            },
            updateView() {

            },
            // 第一个树
            handleNodeClick(data) {}
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
            height: calc(100vh - 249px);
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
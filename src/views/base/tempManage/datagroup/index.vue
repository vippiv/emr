<template>
    <div class="temp-manage-datagroup">
        <!-- 修改栏 -->
        <el-row class="gen">
            <ckImgBtn class="imgBtn-item" icon="ck-imgicon-insert" @click="handleFlClicFn">新建分类</ckImgBtn>
            <ckImgBtn class="imgBtn-item" icon="ck-imgicon-add" @click="handleTfClicFn">新建</ckImgBtn>
            <ckImgBtn class="imgBtn-item" icon="ck-imgicon-modify" @click="handleEditClicFn">修改</ckImgBtn>
            <ckImgBtn class="imgBtn-item" icon="ck-imgicon-delete" @click="handleDeClicFn">删除</ckImgBtn>
            <ckImgBtn class="imgBtn-item" icon="ck-imgicon-save" @click="handleClicFn">保存</ckImgBtn>
        </el-row>
        <el-container class="content">
            <!-- 树形结构 -->
            <el-aside width="227px" style="height: 100%; border: 1px solid #ccc;background-color:white;">
                <p style="padding:10px;">已有病历数据组</p>
                <el-tree :data="treeData" :props="defaultProps" @node-click="handleNodeClick" highlight-current></el-tree>
            </el-aside>
            <!-- 模板展示列表 -->
            <el-main>
                <p>当前数据组</p>
                <el-col :span="2" style="margin-top: 23px;">数据组ID:</el-col>
                <el-col :span="6" style="margin-top: 20px">
                    <el-input size="mini" v-model="xx" :disabled="isdisabled"></el-input>
                </el-col>
                <el-col :span="2" style="margin-top: 23px; margin-left:119px">上方标题:</el-col>
                <el-col :span="6" style="margin-top: 20px">
                    <el-input size="mini" v-model="ss" :disabled="isopen"></el-input>
                </el-col>
            </el-main>
        </el-container>
    </div>
</template>

<script type="text/javascript">
    import {
        mapActions
    } from 'vuex'

    export default {
        name: 'tempManageDatagroup',
        data() {
            return {
                editType: false,
                isopen: true,
                isdisabled: true,
                upData: '',
                xx: '',
                ss: '',
                currentNodeData: null,
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
            ...mapActions(['GET_DATAGROUP', 'GET_PNODEMAXID', 'P_DATAGROUPSAVE', 'GET_CNODEMAXID', 'DELETE_DATAGROUP']),
            handleNodeClick(data) {
                this.isopen = true
                this.currentNodeData = data
                this.xx = this.currentNodeData.id
                this.ss = this.currentNodeData.label
            },
            get_GetInformation() {
                this.GET_DATAGROUP().then((res) => {
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
            handleFlClicFn() {
                if (!this.currentNodeData) {
                    this.$message.error('请选择节点')
                    return
                }
                this.editType = false
                this.isopen = false
                this.GET_PNODEMAXID().then((res) => {
                    if (res.code === 1) {
                        this.xx = res.values
                        this.ss = ''
                    } else {
                        this.$message({
                            type: 'warning',
                            message: '加载失败'
                        })
                    }
                })
            },
            handleClicFn() {
                if (!this.ss || this.isopen == true) {
                    this.$message.error('请输入标题')
                    return
                }
                const params = {
                    Type: this.editType ? 1 : 0,
                    AddType: 0,
                    EMR_DataGroupID: this.xx,
                    EMR_DataGroup: this.ss,
                    BelongDataGroupid: ''
                }
                if (this.xx.split('-').length === 3) { // 新建子类s应该次传1
                    params.AddType = 1
                    params.BelongDataGroupid = this.upData
                }
                this.P_DATAGROUPSAVE(params).then((res) => {
                    if (res.code === 1) {
                        this.$message.success(res.msg)
                        this.editType = !this.editType
                        this.isopen = !this.isopen
                        this.get_GetInformation()
                    }
                })
            },
            handleEditClicFn() {
                if (!this.currentNodeData) {
                    this.$message.error('请输入标题')
                    return
                }
                this.xx = this.currentNodeData.id
                this.ss = this.currentNodeData.label
                this.isopen = false
                this.editType = true
            },
            handleTfClicFn() {
                if (!this.currentNodeData) {
                    this.$message.error('请选择节点')
                    return
                }
                this.editType = false
                let mlngID = ''
                if (this.currentNodeData.children && this.currentNodeData.children.length >= 0) {
                    mlngID = this.currentNodeData.id
                } else if (!this.currentNodeData.children && this.currentNodeData.parentMenuId) {
                    mlngID = this.currentNodeData.parentMenuId
                }
                this.upData = mlngID
                this.GET_CNODEMAXID({
                    mlngID
                }).then((res) => {
                    if (res.code === 1) {
                        this.xx = res.values
                        this.ss = ''
                        this.isopen = false
                    }
                })
            },
            handleDeClicFn() {
                if (!this.currentNodeData) {
                    this.$message.error('请选择节点')
                    return
                }
                this.$confirm('您确定要删除当前选中的数据?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    })
                    .then(() => {
                        this.DELETE_DATAGROUP({
                            EMR_DataGroupID: this.currentNodeData.id
                        }).then((res) => {
                            if (res.code === 1) {
                                this.$message.success(res.msg)
                                this.get_GetInformation()
                            } else {
                                this.$message.error(res.msg)
                            }
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
    .temp-manage-datagroup {
        height: 100%;

        .content {
            height: calc(100% - 55px)
        }
    }

    .gen {
        border: 1px solid #E8EAED;
        background-color: white;
        color: #333;
        padding: 10px 0 4px 7px;
        margin-bottom: 5px;

        .imgBtn-item {
            display: inline-flex;
            justify-content: space-evenly;
            line-height: 2.7;
        }
    }

    /deep/.img-btn>span {
        min-width: 34px !important;

        &:nth-child(1) {
            margin-right: 8px;
        }

        &:nth-child(2) {
            margin-right: 10px;
        }
    }

    .el-aside {
        overflow-x: hidden;
        margin-right: 10px;
    }

    .el-main {
        height: 150px;
        background-color: #ccc;
        border: 1px solid #f9fafc;
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
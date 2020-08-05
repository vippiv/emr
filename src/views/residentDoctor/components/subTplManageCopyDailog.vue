<template>
    <div class="subTplManage-daiglog">
        <el-dialog :title="title" :visible.sync="dialogCopyVisible" :before-close="handleClose" append-to-body :close-on-click-modal="false" width="400px">
            <h2 style="margin:15px 0px;">请选择要操作的列表名</h2>
            <el-tree class="tree-panel" :data="copydata" :props="defaultProps" @node-click="handleNodeClick" highlight-current></el-tree>
            <div slot="footer" class="dialog-footer">
                <el-button @click="handleClose" size="small">取 消</el-button>
                <el-button type="primary" @click="moveTempForm" size="small">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
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
        name: 'subTplManageCopyDailog',
        props: {
            dialogCopyVisible: {
                type: Boolean,
                default: false
            },
            title: {
                type: String,
                default: ''
            },
            copyTreeData: {
                type: Array,
                default: () => []
            },
            copyType: {
                type: Number,
                default: 0
            },
            multipleSelection: {
                type: Array,
                default: () => []
            },
            subType: {
                type: Number,
                default: 0
            },
            subTreeData: {
                type: Array,
                default: () => []
            },
        },
        data() {
            return {
                sureNdd: null,
                currentMoveNode: null,
                ndd: null,
                obj: {},
                currentTreeNode: null,
                copydata: [],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
            }
        },
        created() {
            this.get_Tree()
        },
        computed: {
            ...mapState({
                loginUserId: state => state.global.userInfo,
            })
        },
        methods: {
            ...mapActions([
                'GET_ITEMINDEXBYMRATTR',
                'DOCTOR_TEMPMOVEORCOPYBTN',
                'GET_CHILDITEMINDEXBYMRATTR'
            ]),
            // 保存
            moveTempForm() {
                const params = []
                if (!this.currentMoveNode) {
                    this.$message('请选择列表')
                    return
                } else if (this.currentMoveNode.label == '个人模板' && this.currentMoveNode.Tag == 1) {
                    this.$message.error('请在用户本人下添加')
                    return
                }
                if (this.currentMoveNode.id == 'MC') {
                    this.selfId = this.currentMoveNode.code
                    this.selfPath = 'MC'
                } else {
                    this.selfId = this.loginUserId.UserId
                    this.selfPath = this.currentMoveNode.code
                }
                this.multipleSelection.forEach((item, index) => {
                    this.obj = {
                        isMarkMoveOrCopy: this.copyType == 0 ? 'Move' : '',
                        MR_CODE: item.MR_CODE,
                        MR_ATTR: this.currentMoveNode.id,
                        DEPT_ID: this.selfPath,
                        CREATOR_ID: this.selfId,
                        EMR_TYPE: this.subType == 0 ? 0 : 1,
                        MR_PATH: this.subType == 0 ? ("Template/" + this.selfPath + '/' + item.LIST_CODE) : ("ChildTemplate/" + this.selfPath + '/' + item.LIST_CODE),
                    }
                    params.push(this.obj)
                })
                this.DOCTOR_TEMPMOVEORCOPYBTN(params).then(res => {
                    if (res.code == 1) {
                        this.$message.success(res.msg)
                        this.handleClose()
                        this.handleUpdateTree()
                    }
                })
            },
            handleUpdateTree() {
                this.$emit('actionUpdateTree', this.ndd)
            },
            // 树获取
            get_Tree() {
                if (this.subType == 0) {
                    this.copydata = this.copyTreeData
                } else {
                    this.copydata = this.subTreeData
                }
            },
            handleClose() {
                this.$emit('closeSubCopyManage')
            },
            handleNodeClick(node) {
                this.currentMoveNode = node
                this.ndd = node
                let dept_id = ''
                if (!node.filePath) {
                    dept_id = node.id
                } else {
                    dept_id = node.id
                }
                if (this.subType == 0) {
                    this.GET_ITEMINDEXBYMRATTR({
                        DEPT_ID: dept_id,
                        UserID: this.loginUserId.UserId,
                        tag: node.Tag
                    }).then((res) => {
                        if (res.code === 1) {
                            node.children = res.values
                        }
                    })
                } else {
                    this.GET_CHILDITEMINDEXBYMRATTR({
                        DEPT_ID: dept_id,
                        UserID: this.loginUserId.UserId,
                        tag: node.Tag
                    }).then((res) => {
                        if (res.code === 1) {
                            node.children = res.values
                        }
                    })
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
    .tree-panel {
        height: 49vh;
        border: 1px solid #ebeef5;
        overflow-y: auto;
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
<template>
    <div class="saveToPersonal-container">
        <el-dialog title="存入个人模板" :visible.sync="saveToPersonalDiaVis" width="25%" :before-close="handleCancelInsert">
            <el-form ref="tplForm" :model="tplForm" label-width="130px">
                <el-form-item label="存入个人模板名称:">
                    <el-input v-model="tplForm.name" size="mini"></el-input>
                </el-form-item>
                <h2>请选择要移动的列表名称</h2>
                <div class="tree-box">
                    <el-tree :data="modulesData" node-key="id" highlight-current default-expand-all @node-click="handleNodeClick"></el-tree>
                </div>
                <div class="text-right">
                    <el-button type="primary" size="mini" @click="handleEmitInsert">确定</el-button>
                    <el-button size="mini" @click="handleCancelInsert">取消</el-button>
                </div>
            </el-form>
        </el-dialog>
    </div>
</template>

<script type="text/javascript">
    import {
        mapState,
        createNamespacedHelpers
    } from 'vuex'

    const {
        mapActions
    } = createNamespacedHelpers('residentDoctor')

    export default {
        name: 'SaveToPersonal',
        props: ['saveToPersonalDiaVis'],
        data() {
            return {
                tplForm: {
                    name: ''
                },
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                modulesData: [],
                currentNode: null
            }
        },
        computed: {
            ...mapState({
                medisineOperationItem: state => state.residentNurse.medisineOperationItem,
				nursTempData: state => state.residentNurse.nursTempData,
				userInfo:state => state.global.userInfo
            })
        },
        watch: {
            saveToPersonalDiaVis(val) {
                if (val) {
                    // this.actionGetPersonalModules()
                }
            }
        },
        created() {
            this.actionGetPersonalModules()
        },
        mounted() {
            this.tplForm.name = this.nursTempData.label
        },
        methods: {
            ...mapActions([
                'GET_PERSONAL_MODULES',
				'SAVE_TO_PERSONAL_MODULES',
				'savePersonTemplate'
            ]),
            actionGetPersonalModules() {
                this.GET_PERSONAL_MODULES().then((res) => {
                    if (res.code === 1) {
                        this.modulesData = res.values
                    }
                })
            },
            handleEmitInsert() {
                console.log('11111111111', this.nursTempData)
                if (!this.tplForm.name) {
                    this.$message.error('模板名称不能为空')
                    return
                }
                if (!this.currentNode) {
                    this.$message.error('请选择模板')
                    return
				}
				console.log(JSON.stringify(this.currentNode))
				// TODO 这里参数可能来自两个地方，一个是左侧病历列表树，另一个是模板树
				
				 let data = {
                    fileCode: this.currentNode.id, //文件ID
                    mrCodeNew: this.currentNode.code, //模板编码
                    personName: this.tplForm.name.trim(), //新模板名称
                    userID: this.userInfo.UserId,
                    mrAttr:this.currentNode.code
                }
                console.log(JSON.stringify(data))
                this.savePersonTemplate(data).then(res => {
                    if (res.code == 1) {
                        this.$message.success(res.msg)
                    }
				})
                // this.SAVE_TO_PERSONAL_MODULES({
                //     fileCode: this.currentNode.id,
                //     mrCodeNew: this.currentNode.code,
                //     personName: this.tplForm.name,
                //     fatherID: this.currentNode.id
                // }).then((res) => {
                //     if (res.code === 1) {
                //         this.$message.success('保存成功')
                //         this.handleCancelInsert()
                //     }
                // })
            },
            handleCancelInsert() {
                this.$parent.saveToPersonalDiaVis = false
                this.$parent.handleIframeMask(false)
            },
            handleNodeClick(obj) {
                this.currentNode = obj
            }
        }
    }
</script>

<style lang="scss" scoped>
    .saveToPersonal-container {
        .tree-box {
            border: 1px solid #44B3C7;
            margin: 15px 0;
        }

        /deep/ .el-tree {
            height: 500px;
            overflow-y: auto;
        }

        /deep/ .el-tree--highlight-current {
            .el-tree-node.is-current {
                &>.el-tree-node__content {
                    background-color: #0078d7;
                    color: white;
                }
            }
        }
    }
</style>
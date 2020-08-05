<template>
    <!-- word编辑存入个人模板 -->
    <div class="word-insertpersontpl">
        <el-dialog title="存入个人模板" width="440px" :visible.sync="show" :before-close="handlecolse" :close-on-click-modal="false" append-to-body>
            <el-row style="margin-bottom:15px;">
                <el-col :span="8" style="line-height:2.3;">存入个人模板名称</el-col>
                <el-col :span="16">
                    <el-input v-model="tmlname" size="small"></el-input>
                </el-col>
            </el-row>
            <div>
                <h3 style="margin-bottom:15px;">请选择要移动的列表名称:</h3>
                <el-tree class="self-tree" highlight-current :data="treeData" :props="defaultProps" @node-click="handleNodeClick" style="border:1px solid #DCDFE6;height:400px;overflow-y:auto;"></el-tree>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" type="primary" @click="handleSave">确 定</el-button>
                <el-button size="small" @click="handlecolse">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import {
        mapState,
        createNamespacedHelpers
    } from 'vuex'
    const {
        mapActions
    } = createNamespacedHelpers('residentDoctor')
    export default {
        name: 'subTplSavePersonTpl',
        props: {
            show: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                tmlname: '', //模板名称
                // dialogPerson: false,
                treeData: [],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                treeDataObj: {}
            }
        },
        created() {
            this.getMySelfFatherTemplate()
        },
        computed: {
            ...mapState({
                userInfo: state => state.global.userInfo
            })
        },
        methods: {
            ...mapActions(['GetMySelfFatherTemplate', 'GetSubTemplate', 'savePersonTemplate']),
            getMySelfFatherTemplate() { //获取个人模板父节点
                this.GetMySelfFatherTemplate().then(res => {
                    this.treeData = res
                })
            },
            getSubTemplate(val) { //获取个人模板子节点
                let data = {
                    UserID: this.userInfo.UserId,
                    Code: val.code
                }
                console.log(data)
                this.GetSubTemplate(data).then(res => {
                    val.children = res
                })
            },
            treeNodeData(data) {

            },
            handlecolse() {
                this.$emit('closeperson', false)
            },
            handleNodeClick(data, Node) {
                console.log(JSON.stringify(data))
                this.treeDataObj = data
                this.getSubTemplate(data)

            },
            handleSave() { //保存个人模板
                if (this.tmlname == '') {
                    this.$message.warning('请填写模板名称！')
                    return
                }
                if(this.treeDataObj.Tag==1){
                     this.$message.warning('请选择子节点！')
                    return
                }
                let data = {
                    fileCode: this.treeDataObj.id, //文件ID
                    mrCodeNew: this.$attrs.currentTableData.MR_CODE, //模板编码
                    personName: this.tmlname.trim(), //新模板名称
                    userID: this.userInfo.UserId,
                    mrAttr:this.treeDataObj.code
                }
                console.log(JSON.stringify(data))
                this.savePersonTemplate(data).then(res => {
                    if (res.code == 1) {
                        this.$message.success(res.msg)
                        this.$emit('closeperson', false)
                    }
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
    .word-insertpersontpl {}

    /deep/.el-tree-node.is-current>.el-tree-node__content {
        background-color: #44b3c7;
        color: white;
    }
</style>
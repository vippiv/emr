<template>
    <div class="let-nursing-tml">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-row style="margin-bottom:10px;">
                <el-col :span="12">
                    <el-input v-model="filterText" placeholder="请输入内容" clearable size="mini"></el-input>
                </el-col>
                <el-col :span="6" style="text-align:center;">
                    <el-button type="primary" size="mini" @click="handleSearch">查询</el-button>
                </el-col>
                <el-col :span="6">
                    <el-button type="primary" size="mini" @click="handleRefresh">刷新</el-button>
                </el-col>
            </el-row>
            <el-tab-pane label="护理病历模板" name="first">
                <el-tree class="filter-tree" :data="bldata" :props="defaultProps" :filter-node-method="filterNode" ref="tree" highlight-current @node-click="handleHlNodeClick">
                    <span slot-scope="{node, data}">
                        <span @dblclick="handleBlNodeClick(data, node)">{{data.label}}</span>
                    </span>
                </el-tree>
            </el-tab-pane>
            <!-- <el-tab-pane label="护理记录单模板" name="second">
                <el-tree class="filter-tree" :data="hldata" :props="defaultProps" :filter-node-method="filterNode" ref="hltree" highlight-current @node-click="handleBlNodeClick"></el-tree>
            </el-tab-pane> -->
        </el-tabs>
    </div>
</template>
<script>
    import {
        mapState,
        createNamespacedHelpers
    } from 'vuex'
    import handleActiveX from '@/utils/activeX'
    import Evtbus from '@/utils/bus'
    const {
        mapActions
    } = createNamespacedHelpers('residentNurse')

    export default {
        name: 'LetNursTpl',
        data() {
            return {
                activeName: 'first',
                bldata: [], //病历模板数据
                hldata: [], //护理记录单数据
                filterText: '',
                defaultProps: {
                    children: 'children',
                    label: 'label'
                }
            }
        },
        computed: {
            ...mapState({
                patientInfo: state => state.residentNurse.patientInfo,
                workbanchcode: state => state.global.workBenchID,
                uerInfo: state => state.global.userInfo,
            })
        },
        created() {
            // this.getBlFatherTempl()
        },
        activated(){
            this.getBlFatherTempl()
        },
        methods: {
            ...mapActions([
                'GetBlFatherTempl',
                'GetSonTemplate',
                'GetSysWorkBenchNursing',
                'CREATE_NEW_DOC_CHECK_FILE_EXIST',
                'CREATE_NEW_DOC'
            ]),
            handleSearch() {
                //查询
                if (this.activeName == 'first') {
                    this.$refs.tree.filter(this.filterText)
                } else {
                    this.$refs.hltree.filter(this.filterText)
                }
            },
            handleRefresh() {
                //刷新
                if (this.activeName == 'first') {
                    this.getBlFatherTempl()
                } else {
                    this.getSysWorkBenchNursing()
                }
            },
            getBlFatherTempl() {
                //获取病历模板父节点
                console.log(this.workbanchcode)
                let data = {
                    WORKBENCH_CODE: this.workbanchcode
                }
                this.GetBlFatherTempl(data).then(res => {
                    if (res.code == 1) {
                        this.bldata = res.values
                    }
                })
            },
            getSonTemplate(val) {
                let data = {
                    DEPT_ID: val.id,
                    UserID: this.uerInfo.UserId,
                    tag: val.Tag,
                    label:val.label
                }
                this.GetSonTemplate(data).then(res => {
                    if (res.code == 1) {
                        this.bldata.forEach(item => {
                            if (val.id == item.id) {
                                item.children = res.values
                            }
                        })
                    }
                })
            },
            getSysWorkBenchNursing() {
                let data = {
                    WorkBenchCode: this.workbanchcode
                }
                this.GetSysWorkBenchNursing(data).then(res => {
                    if (res.code == 1) {
                        this.hldata = res.values
                    }
                })
            },
            handleHlNodeClick(data, Node){
                console.log(data)
                this.$store.dispatch('residentNurse/saveNurTemplateData',JSON.parse(JSON.stringify(data)))
                this.getSonTemplate(data)
            },
            handleBlNodeClick(data, Node) {
                console.log('data',data)
                this.$emit('handleletnurstpl','')
                if (data.filePath) {
                    // 加载文档
                    const args = {
                        mrCode: data.code,
                        visit_Id: this.patientInfo.id
                    }
                    new Promise((resolve) => {
                        this.CREATE_NEW_DOC_CHECK_FILE_EXIST(args).then((res) => {
                            resolve(res)
                        })
                    }).then((res) => {
                        if (res.code === 1) {
                            args.listCode = data.code2
                            this.CREATE_NEW_DOC(args).then((res) => {
                                if (res.code === 1) {
                                    console.log(res.values)
                                    Evtbus.$emit('InsertActiveXTab', data, () => {
                                        handleActiveX.tools.fillPatientInfo(res.values) // 替换患者信息
                                        // 把文档状态改成未修改，这个地方跟住院医生病历书写有点不同
                                        handleActiveX.tools.setDocModified(false)
                                        // 将当前文档所有的区域记录脏标记置位为0
                                        handleActiveX.clearRegionModifyFlag()
                                    })
                                } else {
                                    this.$message.error(res.msg)
                                }
                            })
                        } else {
                            this.$message.error(res.msg)
                        }
                    })
                } else {
                    
                }
            },
            filterNode(value, data) {
                if (!value) return true
                return data.label.indexOf(value) !== -1
            },
            handleClick(tab, event) {
                if (tab.paneName == 'first') {
                    //护理病历模板
                    this.activeName = 'first'
                } else {
                    //护理记录单
                    this.activeName = 'second'
                    this.getSysWorkBenchNursing()
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
    .let-nursing-tml {
        padding: 0 10px;

        .filter-tree {
            height: calc(100vh - 250px);
            overflow-y: auto;
        }
    }

    /deep/.el-tree--highlight-current {
        .el-tree-node.is-current {
            &>.el-tree-node__content {
                background-color: #44b3c7;
                color: white;
            }
        }
    }
    .let-nursing-tml /deep/.el-tabs__active-bar{
        background: none;
    }
    .let-nursing-tml /deep/.el-tabs__item.is-active{
        color:#606266;
    }
    .let-nursing-tml /deep/#tab-first{
        margin-left: 100px;
    }
</style>
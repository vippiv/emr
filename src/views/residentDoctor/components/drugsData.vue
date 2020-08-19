<!-- 药品资料库 -->
<template>
    <div class="drugs-ata-container">
        <el-row>
            <el-col :span="7" class="ypboxL">
                <el-tree ref="tree" :data="treeData" highlight-current :props="defaultProps" @node-click="handleNodeClick"></el-tree>
            </el-col>
            <el-col :span="16" class="ypboxR" :offset="1">
                <el-form :model="formInline" size="small" style="height:35px;">
                    <el-row :gutter="10">
                        <el-col :span="9">
                            <el-form-item prop="name">
                                <el-input v-model="formInline.name" size="mini" placeholder="名称"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="9">
                            <el-form-item prop="content">
                                <el-input v-model="formInline.content" size="mini" placeholder="内容"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item>
                                <el-button type="primary" size="mini" @click="queryData">查询</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <el-table highlight-current-row :data="tableData" border style="width: 100%" size="mini" height="200" @row-click="getCurrentRow">
                    <el-table-column type="index" width="50"></el-table-column>
                    <el-table-column prop="NAME_CN" label="名称" align="center"></el-table-column>
                </el-table>
                <el-card shadow="never" class="card-box">
                    <div>
                        <div v-html="drugDetails"></div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<script type="text/javascript">
    import {
        createNamespacedHelpers
    } from 'vuex'
    const {
        mapActions
    } = createNamespacedHelpers('residentDoctor')

    export default {
        name: 'drugsData',
        data() {
            return {
                medicineData: null,
                formInline: {
                    name: '',
                    content: ''
                },
                treeData: [],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                tableData: [],
                currentRow: null,
                drugDetails: null,
            }
        },
        created() {
            this.get_Information()
        },
        mounted() {},
        methods: {
            ...mapActions([
                'GET_DRUG',
                'GET_DRUGBYID',
                'GET_DRUGBYNAMEORCONTENT'
            ]),
            // 左边数据获取
            get_Information() {
                this.GET_DRUG().then((res) => {
                    this.treeData = res.values
                })
            },
            handleNodeClick(medicData) {
                this.medicineData = medicData
                let params = {
                    Drugid: this.medicineData.cid,
                }
                this.GET_DRUGBYID(params).then((res) => {
                    this.tableData = res.values
                    this.drugDetails = this.tableData[0].CONTENT
                })

            },
            getCurrentRow(row, column, event) {
                this.drugDetails = row.CONTENT
            },
            queryData() {
                // 查询
                if (this.formInline.name == '' && this.formInline.content == '') {
                    this.$message('请输入搜索信息')
                    return
                }
                let params = {
                    name: this.formInline.name.trim(),
                    content: this.formInline.content.trim()
                }
                this.GET_DRUGBYNAMEORCONTENT(params).then((res) => {
                    this.tableData = res.values
                    if (res.values.length == 0) {
                        this.drugDetails = null
                        return
                    }
                    this.drugDetails = this.tableData[0].CONTENT
                })

            }
        }
    }
</script>

<style lang="scss" scoped>
    /deep/.el-tree--highlight-current {
        .el-tree-node.is-current {
            &>.el-tree-node__content {
                background-color: #44b3c7;
                color: white;
            }
        }
    }

    /deep/ .el-table__body tr.current-row>td {
        background-color: #44B3C7;
    }

    /deep/ .el-table__body tr {
        cursor: pointer;
    }

    .ypboxL,
    .ypboxR {
        height: 55vh;
        overflow: hidden;
    }

    .ypboxL {
        border: 1px solid #ebeef5;
        overflow-y: auto;
        overflow-x: auto;
    }

    .card-box {
        height: calc(100% - 240px);
        overflow-y: auto;
        margin-top: 10px;
        font-weight: 500;
    }
</style>
<!-- ICD_10国际编码 -->
<template>
    <div class="ICD_10-international-code-container">
        <el-row>
            <el-col :span="7" class="ypboxL">
                <el-tree :data="treeData" ref="tree" highlight-current node-key="BigKindCode" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
            </el-col>
            <el-col :span="16" class="ypboxR" :offset="1">
                <el-form :model="form" size="small" style="height:35px;">
                    <el-row :gutter="10">
                        <el-col :span="6">
                            <el-form-item>
                                <el-input v-model="form.code" size="mini" placeholder="编码"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item>
                                <el-input v-model="form.name" size="mini" placeholder="名称"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item>
                                <el-input v-model="form.pinyin" size="mini" placeholder="拼音"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="3">
                            <el-form-item>
                                <el-button type="primary" size="mini" @click="queryData">查询</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <el-table class="table-box" ref="singleTable" highlight-current-row :data="tableData" border style="width: 100%" size="mini" @row-click="getCurrentRow">
                    <el-table-column type="index" width="50"></el-table-column>
                    <el-table-column prop="ICD10" label="编码" align="center"></el-table-column>
                    <el-table-column prop="ICD10Name" label="名称" align="center"></el-table-column>
                    <el-table-column prop="ICD10HeadPY" label="缩写" align="center"></el-table-column>
                </el-table>
            </el-col>
        </el-row>
    </div>
</template>
<script type="text/javascript">
    import {
        createNamespacedHelpers
    } from "vuex";
    const {
        mapActions
    } = createNamespacedHelpers("residentDoctor");

    export default {
        name: "ICD_10InternationalCode",
        data() {
            return {
                begin: null,
                interData: null,
                form: {
                    code: "",
                    name: "",
                    pinyin: ""
                },
                treeData: [],
                defaultProps: {
                    children: "children",
                    label: "BigKindName"
                },
                tableData: []
            };
        },
        created() {
            this.get_Information();
        },
        mounted() {
            this.$nextTick(() => {
                this.$refs.singleTable.setCurrentRow(this.tableData[0]);
            });
        },
        methods: {
            ...mapActions(["SELECTICDTYPE", "SELECTICD_D", "SELECTBYICD10"]),
            // 左边数据获取
            get_Information() {
                this.SELECTICDTYPE().then(res => {
                    this.treeData = res.values;
                    this.$refs.tree.setCurrentKey([this.treeData[0].BigKindCode]);
                    let params = {
                        Code: this.treeData[0].BigKindCode
                    };
                    this.SELECTICD_D(params).then(res => {
                        this.tableData = res.values;
                        this.begin = this.treeData[0].BigKindCode
                    });
                });
            },
            handleNodeClick(data) {
                this.interData = data;
                this.begin = this.interData.BigKindCode
                let params = {
                    Code: this.interData.BigKindCode
                };
                this.SELECTICD_D(params).then(res => {
                    this.tableData = res.values;
                });
            },
            getCurrentRow(row, column, event) {},
            queryData() {
                // 查询
                let params = {
                    icd: this.form.code,
                    text: this.form.name,
                    piICd: this.form.pinyin,
                    Code: ''
                };
                console.log(params);
                this.SELECTBYICD10(params).then(res => {
                    this.tableData = res.values;
                })
            }
        }
    };
</script>

<style lang="scss" scoped>
    // tree树当前行颜色
    /deep/.el-tree--highlight-current {
        .el-tree-node.is-current {
            &>.el-tree-node__content {
                background-color: #44b3c7;
                color: white;
            }
        }
    }

    // table当前行颜色
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
    }

    .table-box {
        height: 49.5vh;
        overflow-y: auto;
    }
</style>
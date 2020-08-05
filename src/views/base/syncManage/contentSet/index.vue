<template>
    <div class="sync-manage-content-set">
        <div class="top-btn">
            <!-- <el-button type="primary" size="small">刷新</el-button> -->
            <el-button @click="newadd" type="primary" size="small">新增</el-button>
        </div>
        <el-table height="calc(100% - 73px)" :data="tableData" border style="width: 100%" size="small" @row-dblclick="handleMaintable" v-loading="loading" highlight-current-row>
            <el-table-column prop="ID" label="ID" width="80" align="center"></el-table-column>
            <el-table-column prop="NOTES" label="注释" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="NEWITEMNAME" label="新建模板" align="center"></el-table-column>
            <el-table-column prop="NEWDICTNAME" label="新建数组" align="center"></el-table-column>
            <el-table-column prop="OLDITEMNAME" label="原始模板" align="center"></el-table-column>
            <el-table-column prop="OLDDICTNAME" label="原始数据组" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column fixed="right" label="操作" width="180" align="center">
                <template slot-scope="scope">
                    <el-button @click="handledelete(scope.row)" type="primary" size="mini">删除</el-button>
                    <el-button @click="handleedit(scope.row)" type="primary" size="mini">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div style="position:absolute;bottom:0px;right:15px;left:15px;">
            <div class="pagination-pannel">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="paginationInfo.currentPage" :page-sizes="paginationInfo.pageSizes" :page-size="paginationInfo.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="paginationInfo.total"></el-pagination>
            </div>
        </div>

        <!-- 弹窗 -->
        <el-dialog :title="title" :visible.sync="dialogTableVisible" width="700px" :close-on-click-modal="false">
            <el-form ref="form" :rules="rules" :model="form" label-width="100px" size="small">
                <el-row>
                    <el-col :span="11">
                        <el-form-item label="新建模板" prop="newtempalte">
                            <el-select ref="newTempl" v-model="form.newtempalte" @change="handlechagenew" clearable placeholder="请选择" style="width:100%" :disabled="isnewtpl">
                                <el-option v-for="item in newoptions" :key="item.LIST_CODE + Math.random()" :label="item.LIST_NAME" :value="item.LIST_CODE"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" :offset="2">
                        <el-form-item label="原始模板" prop="oldtemplate">
                            <el-select v-model="form.oldtemplate" clearable @change="handlechageold" placeholder="请选择" style="width:100%" :disabled="isoldtpl">
                                <el-option v-for="item in oldoptions" :key="item.LIST_CODE + Math.random()" :label="item.LIST_NAME" :value="item.LIST_CODE"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item label="新建数据组">
                            <ul class="ulbox">
                                <li :class="[yseve?'eventdisable':'']" @click="handenewitem(item)" v-for="item in newsjzArr" :key="item.DICTID + Math.random()">{{item.DICTNAME}}({{item.DICTID}})</li>
                            </ul>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" :offset="2">
                        <el-form-item label="原始数据组">
                            <ul class="ulbox">
                                <li :class="[yseve?'eventdisable':'']" @click="handeolditem(item)" v-for="item in oldsjzArr" :key="item.DICTID + Math.random()">{{item.DICTNAME}}({{item.DICTID}})</li>
                            </ul>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="注释">
                            <el-input v-model="form.notes" :disabled="isnotes"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item label="关系" prop="relations">
                            <el-input v-model="form.relations" :disabled="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" :offset="2">
                        <el-form-item prop="textrelations">
                            <el-input v-model="form.textrelations" type="textarea" :disabled="true" :rows="6"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogTableVisible = false" size="small">取 消</el-button>
                <el-button type="primary" @click="submitForm('form')" size="small" :disabled="isdailogbtn">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script type="text/javascript">
    import {
        mapActions
    } from 'vuex'

    export default {
        name: 'SyncManageContentSet',
        data() {
            return {
                btnType: 0,
                loading: true,
                tableData: [],
                dialogTableVisible: false,
                isdailogbtn: false,
                isnotes: false,
                isnewtpl: false,
                isoldtpl: false,
                yseve: false,
                title: '',
                form: {
                    newtempalte: '',
                    oldtemplate: '',
                    notes: '',
                    relations: '',
                    textrelations: '',
                    id: ''
                },
                rules: {
                    newtempalte: [{
                        required: true,
                        message: '请填写新建模板',
                        trigger: 'change'
                    }],
                    oldtemplate: [{
                        required: true,
                        message: '请填写原始模板',
                        trigger: 'change'
                    }],
                    relations: [{
                        required: true,
                        message: '请填写数据组',
                        trigger: 'change'
                    }],
                    textrelations: [{
                        required: true,
                        message: '请填写原始数据组',
                        trigger: 'change'
                    }]
                },
                newoptions: [], // 新建模板
                oldoptions: [], // 原始模板
                newsjzArr: [], // 新建数据组
                oldsjzArr: [], // 原始数据组
                newtempalteObj: {
                    LIST_CODE: '', // 原始模板ID
                    LIST_NAME: '' // 原始模板
                }, // 单个新建模板数据
                oldtempalteObj: {
                    LIST_CODE: '', // 原始模板ID
                    LIST_NAME: '' // 原始模板
                }, // 单个原始模板数据
                newsjzObj: {}, // 单个新建数据组
                oldsjzObj: {}, // 单个原始数据组
                paginationInfo: {
                    // 分页
                    currentPage: 1,
                    total: 0,
                    pageSizes: [20, 30, 40],
                    pageSize: 20
                }
            }
        },
        watch: {
            'form.newtempalte': {
                handler(val, newval) {
                    console.log(val)
                    // this.choosenewSelect(val)
                },
                immediate: true
            },
            'form.oldtemplate': {
                handler(val, newval) {
                    console.log(val)
                    // this.chooseoldSelect(val)
                },
                immediate: true
            }
        },
        created() {
            this.getTableData()
        },
        methods: {
            ...mapActions([
                'GET_GetSyInformation',
                'GET_GetNewTemplate',
                'GET_GetOriTemplate',
                'GET_GetAddTemplate',
                'GET_GetOldTemplate',
                'POST_DelSyInformation',
                'POST_SyInformationSave'
            ]),
            choosenewSelect(val) {
                console.log(val)
                this.newoptions.forEach((element) => {
                    if (val == element.LIST_CODE) {
                        this.newtempalteObj = element
                        console.log(this.newtempalteObj)
                    }
                })
            },
            chooseoldSelect(val) {
                this.oldoptions.forEach((element) => {
                    if (val == element.LIST_CODE) {
                        this.oldtempalteObj = element
                        console.log(this.oldtempalteObj)
                    }
                })
            },
            newadd() {
                // 新增
                this.title = '新增同步信息'
                this.dialogTableVisible = true
                this.btnType = 0
                this.form.newtempalte = ''
                this.form.oldtemplate = ''
                this.form.notes = ''
                this.form.relations = ''
                this.form.textrelations = ''
                this.newsjzArr = [] // 新建数据组
                this.oldsjzArr = [] // 原始数据组
                this.isdailogbtn = false
                this.isnotes = false
                this.isnewtpl = false
                this.isoldtpl = false
                this.yseve = false
                this.getNewSelct()
                this.getOldSelect()
                
            },
            handleedit(row) {
                // 编辑
                this.title = '编辑同步信息'
                this.dialogTableVisible = true
                this.btnType = 1
                console.log(row)
                this.form.newtempalte = row.NEWITEMNAME
                this.form.oldtemplate = row.OLDITEMNAME
                this.form.relations = row.NEWDICTNAME
                this.form.textrelations = row.OLDDICTNAME
                this.form.notes = row.NOTES
                this.form.id = row.ID
                this.isdailogbtn = false
                this.isnotes = false
                this.isnewtpl = false
                this.isoldtpl = false
                this.yseve = false
                this.newtempalteObj.LIST_CODE = row.NEWITEMID
                this.newtempalteObj.LIST_NAME = row.NEWITEMNAME
                this.oldtempalteObj.LIST_CODE = row.OLDITEMID
                this.oldtempalteObj.LIST_NAME = row.OLDITEMNAME
                const newdata = {
                    fileItemId: row.NEWITEMID
                }
                this.get_GetAddTemplate(newdata)
                const olddata = {
                    fileItemId: row.OLDITEMID
                }
                this.get_GetOldTemplate(olddata)
                this.getNewSelct()
                this.getOldSelect()
            },
            handleMaintable(row, column, event) {
                // 双击表格
                this.form.newtempalte = row.NEWITEMNAME
                this.form.oldtemplate = row.OLDITEMNAME
                this.form.relations = row.NEWDICTNAME
                this.form.textrelations = row.OLDDICTNAME
                this.form.notes = row.NOTES
                this.isdailogbtn = true
                this.isnotes = true
                this.isnewtpl = true
                this.isoldtpl = true
                this.yseve = true
                const newdata = {
                    fileItemId: row.NEWITEMID
                }
                this.get_GetAddTemplate(newdata)
                const olddata = {
                    fileItemId: row.OLDITEMID
                }
                this.get_GetOldTemplate(olddata)
                console.log(row)
                this.title = '浏览同步信息'
                this.dialogTableVisible = true
            },
            submitForm(formName) {
                // 保存数据
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.saveData()
                    } else {
                        console.log('error submit!!')
                        return false
                    }
                })
            },
            saveData() {
                let id
                if (this.btnType == 0) {
                    id = ''
                } else {
                    id = this.form.id
                }
                const data = {
                    OLDDICTID: this.oldtempalteObj.LIST_CODE, // 原始模板ID
                    OLDITEMNAME: this.oldtempalteObj.LIST_NAME, // 原始模板名称
                    OLDDICTNAME: this.form.textrelations, // 原始模板数据
                    NEWITEMID: this.newtempalteObj.LIST_CODE, // 新建模板ID
                    NEWITEMNAME: this.newtempalteObj.LIST_NAME, //	新建模板名称
                    NEWDICTNAME: this.form.relations, //	新建模板数据
                    NOTES: this.form.notes, // 注释
                    ID: id
                }
                console.log(JSON.stringify(data))
                this.POST_SyInformationSave(data).then((res) => {
                    console.log(res)
                    if (res.code == 1) {
                        this.$message.success(res.msg)
                        this.$refs['form'].resetFields()
                        this.dialogTableVisible = false
                        this.getTableData()
                    }
                })
            },
            handledelete(val) {
                // 删除
                const param = {
                    sid: val.ID
                }
                console.log(val)
                this.$confirm('您确定要删除当前选中的数据?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    })
                    .then(() => {
                        this.POST_DelSyInformation(param).then((res) => {
                            console.log(res)
                            if (res.code == 1) {
                                this.$message.success(res.msg)
                                this.getTableData()
                            }
                        })
                    })
                    .catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        })
                    })
            },
            getTableData() {
                const params = {
                    pageSize: this.paginationInfo.pageSize,
                    pageNos: this.paginationInfo.currentPage
                }
                console.log(params)
                this.GET_GetSyInformation(params).then((res) => {
                    console.log(res)
                    if (res.code == 1) {
                        this.loading = false
                        this.paginationInfo.total = res.values.total
                        this.tableData = res.values.values
                    }
                })
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`)
                this.paginationInfo.pageSize = val
                this.getTableData()
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`)
                this.paginationInfo.currentPage = val
                this.getTableData()
            },
            getNewSelct() {
                // 获取新建模板数据
                this.GET_GetNewTemplate().then((res) => {
                    console.log(res)
                    if (res.code == 1) {
                        this.newoptions = res.values
                    }
                })
            },
            getOldSelect() {
                // 获取原始模板数据
                this.GET_GetOriTemplate().then((res) => {
                    console.log(res)
                    if (res.code == 1) {
                        this.oldoptions = res.values
                    }
                })
            },
            handlechagenew(val) {
                console.log(val)
                const data = {
                    fileItemId: val
                }
                this.newoptions.forEach((element, index) => {
                    if (val == element.LIST_CODE) {
                        this.newtempalteObj.LIST_CODE = val
                        this.newtempalteObj.LIST_NAME = element.LIST_NAME
                    }
                })
                this.get_GetAddTemplate(data)
            },
            handlechageold(val) {
                const data = {
                    fileItemId: val
                }
                this.oldoptions.forEach((element) => {
                    if (val == element.LIST_CODE) {
                        this.oldtempalteObj.LIST_CODE = val
                        this.oldtempalteObj.LIST_NAME = element.LIST_NAME
                    }
                })
                this.get_GetOldTemplate(data)
            },
            get_GetAddTemplate(val) {
                // 获取新建数据组
                this.GET_GetAddTemplate(val).then((res) => {
                    console.log(res)
                    if (res.code == 1) {
                        this.newsjzArr = res.values
                    }
                })
            },
            get_GetOldTemplate(val) {
                // 获取原始数据组
                this.GET_GetOldTemplate(val).then((res) => {
                    console.log(res)
                    if (res.code == 1) {
                        this.oldsjzArr = res.values
                    }
                })
            },
            handenewitem(val) {
                this.newsjzObj = val
                this.form.relations = `${val.DICTNAME}(${val.DICTID})`
            },
            handeolditem(val) {
                this.oldsjzObj = val
                console.log(val)
                this.form.textrelations += `[${val.DICTNAME}(${val.DICTID})] + `
            }
        }
    }
</script>
<style lang="scss" scoped>
    .sync-manage-content-set {
        height: 100%;

        .top-btn {
            margin-bottom: 5px;
            background: white;
            height: 55px;
            line-height: 4;
            padding-left: 15px;
        }

        .ulbox {
            height: 60px;
            border: 1px solid #828790;
            height: 230px;
            overflow-y: auto;
        }

        .ulbox>li {
            border-bottom: 1px solid #dcdfe6;
        }

        .eventdisable {
            pointer-events: none;
        }
        .pagination-pannel {
            text-align: right;
            margin-top: 10px;
            background: white;
            height: 45px;
            display: flex;
            align-items: center;
            justify-content: flex-end;
        }
    }
</style>
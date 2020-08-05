<template>
    <div class="temp-manage-datatemp">
        <el-row class="gen">
            <ckImgBtn class="imgBtn-item" icon="ck-imgicon-add" @click="handleAddClicFn">新建</ckImgBtn>
            <ckImgBtn class="imgBtn-item" icon="ck-imgicon-modify" @click="handleEditClicFn">修改</ckImgBtn>
            <ckImgBtn class="imgBtn-item" icon="ck-imgicon-delete" @click="handleDeleteClicFn">删除</ckImgBtn>
        </el-row>
        <el-container class="content">
            <el-aside width="227px" style="height: 100%; border: 1px solid #ccc;background-color:white;">
                <p style="padding:10px;">已有病历数据元</p>
                <!-- 左边树 -->
                <el-tree :data="treeData" :props="defaultProps" @node-click="handleNodeClick" highlight-current></el-tree>
            </el-aside>
            <!-- 右边内容 -->
            <el-main>
                <div class="grid-content">
                    <el-form ref="form" :disabled="disabled" :model="form" label-width="109px">
                        <el-row>
                            <el-form-item label="数据元名称" prop="name">
                                <el-input v-model="form.name" size="mini" style="width:66%; padding-right: 66px"></el-input>
                                <el-button type="primary" size="mini" @click="addEdit">保存</el-button>
                            </el-form-item>
                        </el-row>
                        <el-row>
                            <el-form-item label="数据元类型" prop="radioType">
                                <el-radio-group v-model="form.radioType">
                                    <el-radio :label="'danXu'">单选列表</el-radio>
                                    <el-radio :label="'danXuZh'">单选组合列表</el-radio>
                                    <el-radio :label="'duoXu'">多选列表</el-radio>
                                    <el-radio :label="'duoXuZh'">多选组合列表</el-radio>
                                    <el-radio :label="'Wbs'">文本框</el-radio>
                                    <el-radio :label="'fXs'">复选框</el-radio>
                                    <el-radio :label="'nuBs'">数字框</el-radio>
                                    <el-radio :label="'riqi'">日期时间框</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-row>
                        <el-row>
                            <el-col :span="6">
                                <el-form-item label="是否显示边框" prop="radioShow">
                                    <el-radio-group v-model="form.radioShow">
                                        <el-radio :label="'yes'">是</el-radio>
                                        <el-radio :label="'no'">否</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </el-col>
                            <el-col :span="7">
                                <el-form-item label=" 左边框字符:" v-show="isbtn" prop="leftInput">
                                    <el-input v-model="form.leftInput" size="mini"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="7">
                                <el-form-item label=" 右边框字符:" v-show="isbtn" prop="rightInput">
                                    <el-input v-model="form.rightInput" size="mini"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="6">
                                <el-form-item :inline="true" label="是否允许删除" prop="radioDelete">
                                    <el-radio-group v-model="form.radioDelete">
                                        <el-radio :label="'yes'">是</el-radio>
                                        <el-radio :label="'no'">否</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item :inline="true" label="是否允许修改" prop="radioEdit">
                                    <el-radio-group v-model="form.radioEdit">
                                        <el-radio :label="'yes'">是</el-radio>
                                        <el-radio :label="'no'">否</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </el-col>
                            <el-col :span="5">
                                <el-form-item label="分隔符:" prop="fenInput">
                                    <el-input v-model="form.fenInput" size="mini" style="min-width:80px;"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="4">
                                <el-form-item prop="checked">
                                    <el-checkbox v-model="form.checked">必须录入</el-checkbox>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="7">
                                <el-form-item label="上方标题:" prop="title">
                                    <el-input v-model="form.title" size="mini" style="min-width:80px;"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="7">
                                <el-form-item label="占位符:" prop="zhan">
                                    <el-input v-model="form.zhan" size="mini" style="min-width:80px;"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="4" v-show="ok">
                                <el-form-item label="最大长度:" prop="len">
                                    <el-input v-model="form.len" size="mini" style="min-width:80px;"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-form-item>
                                <el-checkbox v-model="form.checkedSerect">保密浏览</el-checkbox>
                                <el-checkbox v-model="form.checkedHide">隐藏显示</el-checkbox>
                                <el-checkbox v-model="form.checkedXML">不生成到XML文件中去</el-checkbox>
                            </el-form-item>
                        </el-row>
                        <el-form-item label="可选值列表:">
                            <div class="textarea">
                                <div class="ulHidden" v-if="disabled">
                                </div>
                                <ul class="ul" :class="[disabled ? 'hidden' : '']">
                                    <li @click="handleitem(item)" v-for="item in arearData" :class="[item.flag ? 'bgclass' : '']" :key="item.idx">{{item.ItemText}}
                                    </li>
                                </ul>
                            </div>
                            <el-button type="primary" size="mini" @click="focusclick">新建值</el-button>
                            <el-button type="primary" size="mini" @click="editClick">修改值</el-button>
                            <el-button type="primary" size="mini" @click="deleteClick">删除值</el-button>
                        </el-form-item>
                        <el-form-item label="请录入值:" prop="dec">
                            <el-input size="mini" v-model="form.dec" ref="input"></el-input>
                            <el-button type="primary" size="mini" @click="onSubmit">确定</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script type="text/javascript">
    import {
        mapActions
    } from 'vuex'

    export default {
        name: 'tempManageDatatemp',
        data() {
            return {
                editWrite: '',
                deleteID: '',
                idsStr: '',
                isbtn: false,
                isAdd: false,
                // 右边内容
                arearData: [],
                input: '',
                checked: false,
                disabled: true,
                ok: false,
                form: {
                    checkedXML: false,
                    checkedHide: false,
                    checkedSerect: false,
                    zhan: '',
                    title: '',
                    fenInput: '',
                    radioEdit: '',
                    radioDelete: '',
                    leftInput: '',
                    rightInput: '',
                    radioShow: '',
                    radioType: '',
                    checked: false,
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    dec: '',
                    len: ''
                },
                currentNode: null,
                currentCellNode: null,
                mas_id: '',
                treeData: [],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                chooseNode: null
            }
        },
        watch: {
            'form.radioShow': function(val) {
                if (val == 'yes') {
                    this.isbtn = true
                } else {
                    this.isbtn = false
                }
            },
            "form.radioType": function(val) {
                if (val == 'Wbs') {
                    this.ok = true
                } else {
                    this.ok = false
                }
            }
        },
        created() {
            this.get_GetInformation()
        },
        methods: {
            ...mapActions(["GETDATATEMP", 'GET_DATECELL_M', 'GET_MASTRIUMDICT', 'DELETE', 'SAVETEMP']),
            // 修改值
            editClick() {
                if (!this.chooseNode) {
                    if (this.arearData.length === 0) {
                        this.$message.error('无可修改选项')
                        return
                    }
                    this.$message.error('请选择值')
                    return
                }
                this.deleteID = this.chooseNode.idx
                this.editWrite = this.chooseNode.ItemText
                this.form.dec = this.editWrite
                this.$refs.input.focus()
            },
            // 删除值
            deleteClick() {
                if (!this.chooseNode) {
                    this.$message.error('请选择值')
                    return
                }
                var index = this.arearData.findIndex(item => {
                    if (item.idx == this.chooseNode.idx) {
                        return true
                    }
                })
                this.arearData.splice(index, 1)
                this.idsStr = this.arearData.map(function(obj, index) {
                    return obj.ItemText;
                }).join(",");
                this.chooseNode = null
                this.deleteID = ''
                this.editWrite = ''
            },

            // 新建值
            focusclick() {
                this.deleteID = ''
                this.editWrite = ''
                this.chooseNode = null
                this.arearData.forEach(el => {
                    el.flag = false
                })
                this.$refs.input.focus()
            },
            onSubmit() {
                if (this.form.dec == '') {
                    this.$message.error('请输入值')
                    return
                }
                if (this.deleteID === '') {
                    // 新建
                    this.arearData.push({
                        ItemText: this.form.dec.trim(),
                        idx: this.arearData.length,
                        flag: false
                    })
                    this.idsStr = this.arearData.map(function(obj, index) {
                        return obj.ItemText;
                    }).join(",");
                    this.form.dec = ''
                } else {
                    // 修改
                    this.chooseNode.ItemText = this.form.dec
                }
            },
            handleitem(val) {
                // 点击选中的节点
                this.chooseNode = val
                // 点击每个li
                this.arearData.forEach(el => {
                    if (el.idx === val.idx) {
                        el.flag = true
                    } else {
                        el.flag = false
                    }
                })
                this.form.dec = val.ItemText
            },
            // 左边树获取
            get_GetInformation() {
                this.GETDATATEMP().then((res) => {
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
            // 获取右边病例元信息
            handleNodeClick(node) {
                this.disabled = true
                this.currentNode = node
                const params = {
                    mlngID: this.currentNode.id
                }
                this.GET_DATECELL_M(params).then((res) => {
                    this.currentCellNode = res.values[0]
                    this.form.name = this.currentCellNode.MASURIUM_NAME
                    this.form.leftInput = this.currentCellNode.LEFT_FRAME_CHAR
                    this.form.rightInput = this.currentCellNode.RIGHT_FRAME_CHAR
                    this.form.fenInput = this.currentCellNode.UNIT
                    this.form.title = this.currentCellNode.TOP_TITLE
                    this.form.zhan = this.currentCellNode.PLACEHOLDER
                    this.currentCellNode.IF_CREATE_XML == 1 ? this.form.checkedXML = false : this.form.checkedXML = true
                    this.currentCellNode.IF_HIDE == 0 ? this.form.checkedHide = false : this.form.checkedHide = true
                    this.currentCellNode.IF_SECRCY_SCAN == 0 ? this.form.checkedSerect = false : this.form.checkedSerect = true
                    this.currentCellNode.IF_MUST == 0 ? this.form.checked = false : this.form.checked = true
                    this.currentCellNode.IF_MOD == 0 ? this.form.radioEdit = 'yes' : this.form.radioEdit = 'no'
                    this.currentCellNode.IF_DEL == 0 ? this.form.radioDelete = 'yes' : this.form.radioDelete = 'no'
                    this.currentCellNode.SHOW_FRAME == 1 ? this.form.radioShow = 'yes' : this.form.radioShow = 'no'
                    if (this.currentCellNode.MASURIUM_TYPE == 2) {
                        this.form.radioType = 'danXu'
                    } else if (this.currentCellNode.MASURIUM_TYPE == 1) {
                        this.form.radioType = 'danXuZh'
                    } else if (this.currentCellNode.MASURIUM_TYPE == 3) {
                        this.form.radioType = 'Wbs'
                    } else if (this.currentCellNode.MASURIUM_TYPE == 4) {
                        this.form.radioType = 'fXs'
                    } else if (this.currentCellNode.MASURIUM_TYPE == 5) {
                        this.form.radioType = 'nuBs'
                    } else if (this.currentCellNode.MASURIUM_TYPE == 6) {
                        this.form.radioType = 'duoXu'
                    } else if (this.currentCellNode.MASURIUM_TYPE == 7) {
                        this.form.radioType = 'duoXuZh'
                    } else if (this.currentCellNode.MASURIUM_TYPE == 8) {
                        this.form.radioType = 'riqi'
                    }
                })
                let param = {
                    basicSelectElementID: this.currentNode.id
                }
                this.GET_MASTRIUMDICT(param).then(res => {
                    const data = res.values
                    data.forEach(item => {
                        item.flag = false
                    })
                    this.arearData = data
                })
            },
            // 新增模板
            handleAddClicFn() {
                if (!this.currentNode) {
                    this.$message.error('请选择节点')
                } else {
                    this.disabled = false
                    this.$refs.form.resetFields()
                    this.arearData = []
                    this.isAdd = true
                }
            },
            // 更改
            changeAdd() {
                if (this.form.radioType == 'danXu') {
                    this.mas_id = '2'
                } else if (this.form.radioType == 'danXuZh') {
                    this.mas_id = '1'
                } else if (this.form.radioType == 'Wbs') {
                    this.mas_id = '3'
                } else if (this.form.radioType == 'fXs') {
                    this.mas_id = '4'
                } else if (this.form.radioType == 'nuBs') {
                    this.mas_id = '5'
                } else if (this.form.radioType == 'duoXu') {
                    this.mas_id = '6'
                } else if (this.form.radioType == 'duoXuZh') {
                    this.mas_id = '7'
                } else if (this.form.radioType == 'riqi') {
                    this.mas_id = '8'
                }
            },
            // 保存
            addEdit() {
                if (this.form.name.trim() == '') {
                    this.$message.error('请输入名称')
                    return
                }
                this.changeAdd()
                let params = {
                    MASURIUM_ID: this.isAdd ? 0 : this.currentNode.id,
                    MASURIUM_NAME: this.form.name.trim(),
                    UP_MASURIUM_ID: this.isAdd ? this.currentNode.id : this.currentCellNode.UP_MASURIUM_ID,
                    MASURIUM_TYPE: this.mas_id,
                    SHOW_FRAME: this.form.radioShow == 'yes' ? 1 : 0,
                    LEFT_FRAME_CHAR: this.form.leftInput.trim(),
                    RIGHT_FRAME_CHAR: this.form.rightInput.trim(),
                    IF_DEL: this.form.radioDelete == 'yes' ? 0 : 1,
                    IF_MOD: this.form.radioEdit == 'yes' ? 0 : 1,
                    IF_SYS_DES: 0,
                    CHOOSE: this.idsStr.trim(),
                    MOST_LENGTH: this.form.len,
                    TOP_TITLE: this.form.title,
                    IF_MUST: this.form.checked ? 1 : 0,
                    IF_SECRCY_SCAN: this.form.checkedSerect ? 1 : 0,
                    UNIT: this.form.fenInput,
                    PLACEHOLDER: this.form.zhan,
                    IF_HIDE: this.form.checkedHide ? 1 : 0,
                    IF_CREATE_XML: this.form.checkedXML ? 0 : 1
                }
                this.SAVETEMP(params).then(res => {
                    if (res.code == 1) this.$message.success(res.msg)
                    this.disabled = true
                    this.get_GetInformation()
                })
            },
            // 修改
            handleEditClicFn() {
                if (!this.currentNode) {
                    this.$message.error('请选择节点')
                } else {
                    this.disabled = false
                    this.isAdd = false
                }
            },

            // 删除模板
            handleDeleteClicFn() {
                if (!this.currentNode) {
                    this.$message.error('请选择节点')
                    return
                }

                let params = {
                    MASURIUM_ID: this.currentNode.id
                }
                this.$confirm('确定删除?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    })
                    .then(() => {
                        this.DELETE(params).then(res => {
                            if (res.code == 1) this.$message.success(res.msg)
                            this.currentNode = null
                            this.get_GetInformation()
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
    .temp-manage-datatemp {
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
        margin-bottom: 6px;

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

    .el-row {
        &:last-child {
            margin-bottom: 0;
        }
    }

    /deep/.el-form-item__content {
        margin-top: 0px;
        margin-bottom: -26px;
        line-height: 3;
        // height: 40px;
    }

    .el-main {
        // border: 1px solid #ccc;
        // padding: 0px;
        padding: 0 0 0 9px;
        height: 100%;
        overflow: auto;
    }

    .bg-purple-dark {
        background: #99a9bf;
    }

    .bg-purple {
        background: #d3dce6;
    }

    .bg-purple-light {
        background: #e5e9f2;
    }

    .grid-content {
        border: 1px solid #ccc;
        border-radius: 4px;
        height: 100%;
        overflow-y: auto;
        background-color: white;
    }

    .bgclass {
        background-color: #44B3C7;
        color: white;
    }

    .textarea {
        border: 1px solid #ccc;
        width: 777px;
        height: 333px;
        overflow-y: auto;
        position: relative;

        .ulHidden {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            color: #ccc;
        }

        .ul {
            line-height: 23px;
            height: 23px;
            cursor: pointer;
        }
    }

    .hidden {
        color: #ccc;
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
<!-- ICD管理 -->
<template>
    <div class="sub-ice-manage-container">
        <div class="imgBtnBox">
            <ckImgBtn class="imgBtn-item" icon="ck-imgicon-save" @click="handleSave">确定</ckImgBtn>
        </div>
        <el-row>
            <el-col :span="11">
                <el-card shadow="never">
                    <el-radio-group v-model="radio" class="radiobox" @change="radioChange">
                        <el-radio :label="'pin'">ICD拼音码</el-radio>
                        <el-radio :label="'ming'">ICD名称</el-radio>
                        <el-radio :label="'bian'">ICD编码</el-radio>
                    </el-radio-group>
                    <div class="searchInput">
                        <el-input v-model="Input" style="width:100%;padding-right: 9px;" size="mini" @keydown.enter.native="infoSelect"></el-input>
                        <el-button @click="infoSelect()" size="mini">模糊查询</el-button>
                    </div>
                </el-card>
                <el-table ref="monthlyPlanTable" :data="tableData" border height="calc(100vh - 500px)" style="width: 100%; min-height: 480px;margin-top:10px;overflow-y:auto;" size="mini" highlight-current-row @current-change="handleCurrentChange" @row-click="handleLeftRowClick">
                    <el-table-column prop="ICD10" label="ICD编码"></el-table-column>
                    <el-table-column prop="ICD10Name" label="ICD名称"></el-table-column>
                    <el-table-column prop="ICD10HeadPY" label="ICD拼音码"></el-table-column>
                </el-table>
            </el-col>
            <el-col :span="2">
                <div class="btn-box">
                    <div>
                        <el-button type="primary" size="mini" class="btn" @click="handleToRight">
                            <i class="el-icon-arrow-right"></i>
                        </el-button>
                    </div>
                    <div style="margin-top:25px;">
                        <el-button type="primary" size="mini" class="btn" @click="handleToLeft">
                            <i class="el-icon-arrow-left"></i>
                        </el-button>
                    </div>
                </div>
            </el-col>
            <el-col :span="11">
                <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                    <el-tab-pane label="科室" name="first">
                        <el-table ref="departmentTable" :data="depatmentData" border height="calc(100vh - 470px)" class="table-box" size="mini" highlight-current-row @row-click="handleDepartmentRowClick">
                            <el-table-column prop="ICD10" label="ICD编码"></el-table-column>
                            <el-table-column prop="ICD10Name" label="ICD名称"></el-table-column>
                            <el-table-column prop="ICD10HeadPY" label="ICD拼音码"></el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="个人" name="second">
                        <el-table ref="personTable" :data="personData" border height="calc(100vh - 470px)" class="table-box" size="mini" highlight-current-row @row-click="handlePersonRowClick">
                            <el-table-column prop="ICD10" label="ICD编码"></el-table-column>
                            <el-table-column prop="ICD10Name" label="ICD名称"></el-table-column>
                            <el-table-column prop="ICD10HeadPY" label="ICD拼音码"></el-table-column>
                        </el-table>
                    </el-tab-pane>
                </el-tabs>
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
    import {
        mapState
    } from 'vuex'
    export default {
        name: 'subICEManage',
        data() {
            return {
                rightPersonChoosedRow: null,
                leftChoosedRow: null,
                // 保存
                finParams: [],
                depatmentData1: [],
                personData1: [],
                addTwoParams: [],
                addThreeParams: [],
                addOneParams: [],
                addParams: [],
                obj: {},
                obj1: {},
                addTrue: false,
                deleteTrue: false,
                addRight: 0,
                deleteLeft: 0,
                // 右边列表加载
                rightIndex: 0,
                radioMa: 0,
                radioName: 0,
                radioNumber: 1,
                radio: 'pin',
                Input: '',
                activeName: 'first',
                tableData: [],
                currentRow: null,
                departmentCurrentRow: null,
                personCurrentRow: null,
                hasRow: null,
                hasDepartmentRow: null,
                hasPersonRow: null,
                depatmentData: [],
                personData: [],
                tabIndex: 0
            }
        },
        created() {
            this.get_information()
            this.get_SyInformation(0)
            this.get_SyInformation(1)
        },
        computed: {
            ...mapState({
                loginUserId: state => state.global.userInfo,
                deptID: state => state.global.deptID
            })
        },
        methods: {
            ...mapActions([
                'GET_AllICD',
                "GET_RIGHTTAB",
                "SAVE_BTN"
            ]),
            // 右边数据获取
            get_SyInformation(department) {
                let params = {
                    sign: department,
                    sid: department == 0 ? this.deptID : this.loginUserId.UserId
                }
                this.GET_RIGHTTAB(params).then((res) => {
                    if (department == 1) {
                        this.personData = res.values
                    } else {
                        this.depatmentData = res.values
                    }
                })
            },

            // 搜索
            infoSelect() {
                this.get_information()
            },
            radioChange(val) {
                if (val == 'pin') {
                    this.radioNumber = 1
                } else {
                    this.radioNumber = 0
                }
                if (val == 'ming') {
                    this.radioName = 1
                } else {
                    this.radioName = 0
                }
                if (val == 'bian') {
                    this.radioMa = 1
                } else {
                    this.radioMa = 0
                }
                this.get_information()
            },
            // 左边数据获取
            get_information() {
                let params = {
                    rbCode: this.radioMa,
                    rbName: this.radioName,
                    rbPinyinCode: this.radioNumber,
                    txtInput: this.Input
                }
                this.GET_AllICD(params).then((res) => {
                    this.tableData = res.values
                })
            },
            handleClick(tab, event) {
                this.tabIndex = tab.index
                this.rightIndex = tab.index
                this.hasDepartmentRow = null
                this.hasPersonRow = null
            },

            handleSave() {
                const saveParams = []
                let obj1 = null,
                    obj = null
                if (this.depatmentData.length !== 0) {
                    this.depatmentData.forEach((item, index) => {
                        obj1 = {
                            MY_ID: this.deptID,
                            IDC_ID: item.KindID,
                            IDC_NAME: item.ICD10Name,
                            SIGN: 0,
                        }
                        saveParams.push(obj1)
                    })
                } else {
                    obj1 = {
                        MY_ID: this.deptID,
                        IDC_ID: '',
                        IDC_NAME: '',
                        SIGN: 0,
                    }
                    saveParams.push(obj1)
                }
                if (this.personData.length !== 0) {
                    this.personData.forEach((item, index) => {
                        obj = {
                            MY_ID: this.loginUserId.UserId,
                            IDC_ID: item.KindID,
                            IDC_NAME: item.ICD10Name,
                            SIGN: 1,
                        }
                        saveParams.push(obj)
                    })
                } else {
                    obj = {
                        MY_ID: this.loginUserId.UserId,
                        IDC_ID: '',
                        IDC_NAME: '',
                        SIGN: 1,
                    }
                    saveParams.push(obj)
                }
                console.log('saveParams', saveParams)
                this.SAVE_BTN(saveParams).then((res) => {
                    if (res.code == 1) {
                        this.$message.success(res.msg)
                        this.get_SyInformation(0)
                        this.get_SyInformation(1)
                    } else {
                        this.$message.error(res.msg)
                    }
                })
            },
            handleToRight() {
                if (!this.leftChoosedRow) {
                    this.$message('请选择信息行操作')
                    return
                }
                if (this.activeName === 'first') { // 科室
                    const existNode = this.depatmentData.filter((item) => item.ICD10HeadPY === this.leftChoosedRow.ICD10HeadPY)
                    if (existNode.length > 0) {
                        this.$message.error('请勿重复选择')
                        return
                    }
                    this.depatmentData.push({
                        dateStamp: new Date().getTime(),
                        ...this.leftChoosedRow
                    })
                } else if (this.activeName === 'second') { // 个人
                    const existNode = this.personData.filter((item) => item.ICD10HeadPY === this.leftChoosedRow.ICD10HeadPY)
                    if (existNode.length > 0) {
                        this.$message.error('请勿重复选择')
                        return
                    }
                    this.personData.push({
                        dateStamp: new Date().getTime(),
                        ...this.leftChoosedRow
                    })
                }
            },
            handleToLeft() {
                if (this.activeName === 'first') {
                    if (!this.rightDepartmentChoosedRow) {
                        this.$message('请选择信息行操作')
                        return
                    }
                    // 科室
                    const index = this.getArrayIndex(
                        this.depatmentData,
                        this.rightDepartmentChoosedRow
                    )
                    this.depatmentData.splice(index, 1)
                    this.rightDepartmentChoosedRow = this.depatmentData[0]
                    this.$refs.departmentTable.setCurrentRow(this.depatmentData[0])
                } else if (this.activeName === 'second') {
                    if (!this.rightPersonChoosedRow) {
                        this.$message('请选择信息行操作')
                        return
                    }
                    // 个人
                    const index = this.getArrayIndex(this.personData, this.rightPersonChoosedRow)
                    this.personData.splice(index, 1)
                    this.rightPersonChoosedRow = this.personData[0]
                    this.$refs.personTable.setCurrentRow(this.personData[0])
                }
            },
            getArrayIndex(arr, obj) {
                // 获取数组元素的下标
                let i = -1
                arr.forEach((item, index) => {
                    if (obj.dateStamp === item.dateStamp) {
                        i = index
                    }
                })
                return i
            },
            handleCurrentChange(val) {
                this.currentRow = val
            },
            handleDepartmentCurrentChange(val) {
                this.departmentCurrentRow = val
            },
            handlePersonCurrentChange(val) {
                this.personCurrentRow = val
            },
            handleLeftRowClick(val) {
                this.leftChoosedRow = val
            },
            handleDepartmentRowClick(val) {
                this.rightDepartmentChoosedRow = val
            },
            handlePersonRowClick(val) {
                this.rightPersonChoosedRow = val
            },
        }
    }
</script>

<style lang="scss" scoped>
    .sub-ice-manage-container {
        min-height: 560px;
    }

    /deep/.el-card__body {
        padding: 6px;
    }

    .searchInput {
        display: inline-flex;
        // justify-content: space-evenly;
        margin: 12px 0 0 0;
        /deep/.el-button {
            min-width: 76px !important;
        }
    }

    .imgBtnBox {
        margin-bottom: 3px;
        margin-top: -15px;

        .imgBtn-item {
            display: inline-flex;
            justify-content: space-evenly;
            line-height: 2.7;
        }
    }

    /deep/.img-btn>span {
        min-width: 34px !important;

        &:nth-child(1) {
            margin-right: 3px;
        }

        &:nth-child(2) {
            margin-right: 10px;
        }
    }

    /deep/ .el-table__body tr.current-row>td {
        background-color: #44B3C7;
    }

    /deep/ .el-table__body tr {
        cursor: pointer;
    }

    .sub-ice-manage-container /deep/.el-tabs__header.is-top {
        margin-bottom: 5px;
    }

    .table-box {
        width: 100%;
        height: calc(100vh - 470px);
        border: 1px solid #ebeef5;
        overflow-y: auto;
        min-height: 510px;
    }

    .radiobox {
        display: flex;
        justify-content: space-between;
    }

    .btn-box {
        margin-top: 120px;
        text-align: center;
    }

    .sub-ice-manage-container /deep/.el-table .warning-row {
        background: #ecf5ff;
    }
</style>
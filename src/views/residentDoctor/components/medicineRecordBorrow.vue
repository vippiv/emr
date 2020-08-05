<!-- 借阅 -->
<template>
    <div class="medicine-record-borrow-container">
        <el-card shadow="never" v-if="beforeState">
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane label="已归档病案查询" name="first">
                    <div style="margin-bottom:10px;">
                        <el-button @click="handlretrieval" type="primary" size="mini">检索</el-button>
                        <el-button @click="handleBorrow" type="primary" size="mini">借阅</el-button>
                        <el-button type="primary" size="mini" @click="handleClear">清空</el-button>
                    </div>
                    <el-form :model="form" size="mini" label-width="100px">
                        <fieldset class="self-fieldset">
                            <legend>检索条件</legend>
                            <el-row>
                                <el-col :span="4">
                                    <el-form-item label="住院号：">
                                        <el-input v-model="form.hospitalization"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="4">
                                    <el-form-item label="姓名：">
                                        <el-input v-model="form.name"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="4">
                                    <el-form-item label="病人卡号：">
                                        <el-input v-model="form.cardNum"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="5">
                                    <el-form-item label="性别：">
                                        <el-radio-group v-model="form.sex">
                                            <el-radio :label="0">男</el-radio>
                                            <el-radio :label="1">女</el-radio>
                                        </el-radio-group>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="7">
                                    <el-form-item label="出院日期：">
                                        <el-date-picker v-model="form.gdStartDate" type="date" placeholder="选择开始日期" style="width:45%;" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
                                        <span style="margin:0px 10px;">-</span>
                                        <el-date-picker v-model="form.gdEndDate" type="date" placeholder="选择结束日期" style="width:45%;" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="5">
                                    <el-form-item label="出院科室：">
                                        <el-input v-model="form.department" :disabled="true" style="width:70%;"></el-input>
                                        <el-button type="primary" size="mini" style="float:right;" @click="choosedepartment">选择</el-button>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="4">
                                    <el-form-item label="年龄：">
                                        <el-input v-model="form.lage" style="width:40%"></el-input>
                                        <span style="margin:0px 10px;">-</span>
                                        <el-input v-model="form.eage" style="width:40%"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="4">
                                    <el-form-item label="住院医生：">
                                        <el-input v-model="form.doctor"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </fieldset>
                    </el-form>
                    <el-table ref="multipleTable" :data="jstableData" tooltip-effect="dark" style="width: 100%;margin-top:10px;" border height="430" @selection-change="handleBorrowInfo" size="mini">
                        <el-table-column type="selection" width="55" align="center"></el-table-column>
                        <el-table-column prop="VISIT_ID" label="ID号" align="center" width="260"></el-table-column>
                        <el-table-column prop="VISIT_NO" label="住院号" align="center"></el-table-column>
                        <el-table-column prop="In_Times" label="住院次" show-overflow-tooltip align="center"></el-table-column>
                        <el-table-column prop="PAT_NAME" label="姓名" align="center"></el-table-column>
                        <el-table-column prop="CODE_NAME" label="性别" align="center"></el-table-column>
                        <el-table-column prop="PATIENT_AGE" label="年龄" align="center"></el-table-column>
                        <el-table-column label="出生日期" align="center" width="200">
                            <template slot-scope="scope">{{ scope.row.PAT_BIRTHDATE }}</template>
                        </el-table-column>
                        <el-table-column label="入院日期" align="center" width="200">
                            <template slot-scope="scope">{{ scope.row.ADM_DATE }}</template>
                        </el-table-column>
                        <el-table-column prop="dept" label="出院科室" align="center"></el-table-column>
                        <el-table-column label="出院日期" align="center" width="200">
                            <template slot-scope="scope">{{ scope.row.DISCHARGE_DATE }}</template>
                        </el-table-column>
                        <el-table-column prop="INHOS_DOC" label="住院医生" align="center"></el-table-column>
                        <el-table-column prop="MAIN_DOC" label="主治医生" align="center"></el-table-column>
                    </el-table>
                    <!-- 分页 -->
                    <div style="text-align:right;margin-top:10px;">
                        <el-pagination @size-change="handleSizeChange($event,'0')" @current-change="handleCurrentChange($event,'0')" :current-page="paginationInfo.currentPage" :page-sizes="paginationInfo.pageSizes" :page-size="paginationInfo.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="paginationInfo.total"></el-pagination>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="借阅病历" name="second">
                    <el-button @click="handlereturn" type="primary" size="mini" style="margin-bottom:10px;">归还</el-button>
                    <el-table ref="multipleTable" :data="jytableData" tooltip-effect="dark" style="width: 100%;" border @row-click="handletableReturn" @row-dblclick="handleDbReturn" highlight-current-row height="600" size="mini">
                        <el-table-column prop="VISIT_ID" label="病人ID" align="center" width="260"></el-table-column>
                        <el-table-column prop="PAT_NAME" label="姓名" align="center"></el-table-column>
                        <el-table-column prop="CODE_NAME" label="性别" align="center"></el-table-column>
                        <el-table-column prop="PATIENT_AGE" label="年龄" align="center"></el-table-column>
                        <el-table-column prop="In_Times" label="住院次" show-overflow-tooltip align="center"></el-table-column>
                        <el-table-column label="入院日期" align="center" width="200">
                            <template slot-scope="scope">{{ scope.row.ADM_DATE }}</template>
                        </el-table-column>
                        <el-table-column label="出院日期" align="center" width="200">
                            <template slot-scope="scope">{{ scope.row.DISCHARGE_DATE }}</template>
                        </el-table-column>
                        <!-- <el-table-column prop="name" label="诊断" align="center"></el-table-column> -->
                        <el-table-column prop="APPLY_DATE" label="申请日期" align="center" width="200"></el-table-column>
                        <el-table-column prop="BORROW_DOCTOR_NAME" label="申请医师" align="center"></el-table-column>
                        <el-table-column prop="BORROW_DEPT" label="所属科室" align="center" width="200"></el-table-column>
                        <!-- <el-table-column prop="name" label="审批类别" align="center"></el-table-column> -->
                        <el-table-column prop="AIM" label="借阅目的" align="center"></el-table-column>
                        <el-table-column prop="TIME_LIMIT_UNIT" label="期限单位" align="center"></el-table-column>
                        <el-table-column prop="APPROVE_DATE" label="批准日期" align="center"></el-table-column>
                        <el-table-column prop="APPROVER" label="批准人" align="center"></el-table-column>
                    </el-table>
                    <!-- 分页 -->
                    <div style="text-align:right;margin-top:10px;">
                        <el-pagination @size-change="handleSizeChange($event,'1')" @current-change="handleCurrentChange($event,'1')" :current-page="paginationInfo.currentPage" :page-sizes="paginationInfo.pageSizes" :page-size="paginationInfo.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="paginationInfo.total"></el-pagination>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="借阅历史记录" name="third">
                    <el-row>
                        <el-col :span="18">
                            <div class="jy-panel">
                                借阅期限：
                                <el-date-picker v-model="jyStartDate" type="date" placeholder="选择开始日期" size="mini" style="width:180px;" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
                                <span style="margin:0px 10px;">-</span>
                                <el-date-picker v-model="jyEndDate" type="date" placeholder="选择结束日期" size="mini" style="width:180px;" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
                                <el-button @click="handleBorrowHistory" type="primary" size="mini" style="margin-left:10px;">查询</el-button>
                            </div>
                        </el-col>
                    </el-row>
                    <el-table ref="multipleTable" :data="jslstableData" tooltip-effect="dark" style="width: 100%;margin-top:10px;" border height="600" size="mini">
                        <el-table-column prop="VISIT_ID" label="病人ID" align="center"></el-table-column>
                        <el-table-column prop="IN_TIMES" label="住院次数" show-overflow-tooltip align="center"></el-table-column>
                        <el-table-column prop="DEPT_NAME_CN" label="借阅科室" align="center"></el-table-column>
                        <el-table-column prop="APPLY_DATE" label="借阅日期" align="center"></el-table-column>
                        <el-table-column prop="STOP_DATE" label="借阅期限" align="center"></el-table-column>
                        <el-table-column prop="DENY_FLAG" label="拒绝提示" align="center"></el-table-column>
                        <el-table-column prop="BORROW_FLAG" label="借阅状态" align="center"></el-table-column>
                    </el-table>
                    <!-- 分页 -->
                    <div style="text-align:right;margin-top:10px;">
                        <el-pagination @size-change="handleSizeChange($event,'2')" @current-change="handleCurrentChange($event,'2')" :current-page="paginationInfo.currentPage" :page-sizes="paginationInfo.pageSizes" :page-size="paginationInfo.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="paginationInfo.total"></el-pagination>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </el-card>
        <el-dialog title="借阅登记卡" :visible.sync="jycardDailog" width="600px" append-to-body>
            <el-table :data="cardData" border size="mini" height="200" highlight-current-row>
                <el-table-column property="PAT_NAME" label="姓名"></el-table-column>
                <el-table-column property="VISIT_NO" label="病案号"></el-table-column>
                <el-table-column property="In_Times" label="住院次数"></el-table-column>
            </el-table>
            <el-form ref="cardForm" :model="cardForm" label-width="80px" label-position="left" size="small" style="margin-top:20px;">
                <el-row :gutter="40">
                    <el-col :span="12">
                        <el-form-item label="借阅人">
                            <el-input v-model="cardForm.jyperson" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="借阅部门">
                            <el-input v-model="cardForm.jydpt" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="40">
                    <el-col :span="12">
                        <el-form-item label="借阅日期">
                            <el-date-picker disabled v-model="cardForm.jydate" type="date" style="width:100%;" placeholder="选择开始日期" value-format="yyyy-MM-dd"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="借阅期限">
                            <el-date-picker v-model="cardForm.jydeathdate" type="date" style="width:100%;" placeholder="选择开始日期" value-format="yyyy-MM-dd"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <!-- <el-row>
          <el-col :span="24">
            <el-form-item label="借阅部门">
              <el-input v-model="cardForm.jydpt" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>-->
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="借阅用途">
                            <el-input v-model="cardForm.jyway"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="jycardDailog = false" size="small">取 消</el-button>
                <el-button type="primary" @click="handleConfirm" size="small">确 定</el-button>
            </div>
        </el-dialog>
        <medicineRecordBorrowDailog :dialogdptvisible="dialogdptvisible" v-if="ishow" @closeDailog="handleclose"></medicineRecordBorrowDailog>
        <!-- 双击借阅病历切换的页面 -->
        <el-card shadow="never" v-if="afterState">
            <el-row :gutter="10">
                <el-col :span="4">
                    <div style="text-align:center;background-color:#64c5d2;height:35px;line-height:35px;color:white;font-size:16px;">病历列表</div>
                    <div class="left-menu" style="height:700px;overflow-y:auto;">
                        <el-menu default-active="2" class="el-menu-vertical-demo">
                            <el-submenu v-for="item in treeData" :key="item.id" :index="item.id">
                                <template slot="title">
                                    <span>{{item.label}}</span>
                                </template>
                                <div v-if="item.children">
                                    <div v-for="(subitem, subindex) in item.children" :key="subindex">
                                        <el-menu-item :index="subitem.id" @click="handleShowThisData(subitem)">{{subitem.label}}</el-menu-item>
                                    </div>
                                </div>
                            </el-submenu>
                        </el-menu>
                    </div>
                </el-col>
                <el-col :span="20">
                    <div style="height:600px;">
                        <el-button type="primary" size="small">打印</el-button>
                        <el-button type="primary" size="small" @click="backprevstep">返回</el-button>
                    </div>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script type="text/javascript">
    import medicineRecordBorrowDailog from '@/views/residentDoctor/components/medicineRecordBorrowDailog'
    import {
        createNamespacedHelpers,
        mapState
    } from 'vuex'
    const {
        mapActions
    } = createNamespacedHelpers('residentDoctor')
    export default {
        name: 'medicineRecordBorrow',
        components: {
            medicineRecordBorrowDailog
        },
        data() {
            return {
                treeData: [],
                beforeState: true,
                afterState: false,
                jycardDailog: false,
                cardData: [],
                cardForm: {
                    jyperson: '',
                    jyconnect: '',
                    jydate: '',
                    jydeathdate: '',
                    jydpt: '',
                    jyway: ''
                },
                activeName: 'first',
                ishow: false,
                dialogdptvisible: false,
                paginationInfo: {
                    // 分页
                    currentPage: 1,
                    total: 0,
                    pageSizes: [20, 30, 40],
                    pageSize: 20
                },
                form: {
                    hospitalization: '',
                    name: '',
                    cardNum: '',
                    sex: 0,
                    gdStartDate: '', // 开始日期
                    gdEndDate: '', // 结束日期
                    department: '',
                    lage: '',
                    eage: '',
                    doctor: ''
                },
                jyStartDate: '', // 借阅开始日期
                jyEndDate: '', // 借阅结束日期
                jyCurrentVal: [],
                returnCurrent: null,
                jytableData: [],
                jstableData: [],
                jslstableData: []
            }
        },
        created() {
            this.handlretrieval()
        },
        mounted() {
            this.cardForm.jydate = this.timeDefaultShow
        },
        computed: {
            timeDefaultShow() {
                var date = new Date()
                var s1 =
                    date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
                console.log(s1)
                return s1
            },
            ...mapState({
                userInfo: state => state.global.userInfo
            })
        },
        methods: {
            ...mapActions([
                'LoadServe',
                'RetrievalBtn',
                'Borrow',
                'SelectHistoryBtn',
                'ReturnBtn',
                'JyetUsersByGroup'
            ]),
            handleDbReturn(row) {
                this.returnCurrent = row
                this.jyetUsersByGroup(row)
                this.beforeState = false
                this.afterState = true
            },
            jyetUsersByGroup(row) { //病历列表-双击右边树
                let data = {
                    VistID: row.VISIT_ID
                }
                this.JyetUsersByGroup(data).then(res => {
                    if (res.code == 1) {
                        this.treeData = res.values
                    }
                })
            },
            backprevstep() {
                this.beforeState = true
                this.afterState = false
            },
            handletableReturn(row) {
                this.returnCurrent = row
            },
            handlereturn() {
                //归还
                if (this.returnCurrent == null) {
                    this.$message.success('请选择您要归还的信息!')
                    return
                }
                let data = {
                    VISIT_ID: this.returnCurrent.VISIT_ID,
                    IN_TIMES: this.returnCurrent.In_Times,
                    Borrow_Doctor_Id: this.returnCurrent.BORROW_DOCTOR_ID
                }
                console.log(JSON.stringify(data))
                this.ReturnBtn(data).then(res => {
                    if (res.code == 1) {
                        this.loadServe()
                        this.$message.success(res.msg)
                    }
                })
            },
            loadServe() {
                console.log(this.userInfo)
                // 获取病历借阅服务信息
                let data = {
                    userId: this.userInfo.UserId,
                    pageSize: this.paginationInfo.pageSize,
                    pageNos: this.paginationInfo.currentPage
                }
                this.LoadServe(data).then(res => {
                    if (res.code == 1) {
                        let result = res.values
                        this.jytableData = result.values
                        this.paginationInfo.total = result.total
                        this.paginationInfo.currentPage = result.pageNos
                    }
                })
            },
            handleClear() {
                //清空
                this.form.hospitalization = ''
                this.form.name = ''
                this.form.cardNum = ''
                this.form.sex = 0
                this.form.gdStartDate = ''
                this.form.gdEndDate = ''
                this.form.department = ''
                this.form.lage = ''
                this.form.eage = ''
                this.form.doctor = ''
            },
            handlretrieval() {
                //检索
                let data = {
                    txtVisitNos: this.form.hospitalization,
                    txtPatNames: this.form.name,
                    txtVisitIds: this.form.cardNum,
                    sex: this.form.sex,
                    start: this.form.gdStartDate,
                    end: this.form.gdEndDate,
                    txtDepts: this.form.department,
                    txtAgeStarts: this.form.lage,
                    txtAgeEnds: this.form.eage,
                    txtInhosDocs: this.form.doctor,
                    pageSize: this.paginationInfo.pageSize,
                    pageNos: this.paginationInfo.currentPage
                }
                this.RetrievalBtn(data).then(res => {
                    if (res.code == 1) {
                        let result = res.values
                        this.jstableData = result.values
                        this.paginationInfo.total = result.total
                        this.paginationInfo.currentPage = result.pageNos
                    }
                })
            },
            handleBorrowInfo(row, column, event) {
                console.log(row)
                this.jyCurrentVal = row
                this.cardData = row
            },
            handleConfirm() {
                //确定借阅
                if (this.cardForm.jydeathdate == '') {
                    this.$message.warning('请选择借阅期限!')
                    return
                }
                console.log(this.jyCurrentVal)
                let data = []
                this.jyCurrentVal.forEach(item => {
                    let obj = {
                        Borrow_Doctor_Id: this.userInfo.UserId, //登录人id
                        VISIT_ID: item.VISIT_ID, //病人id
                        IN_TIMES: item.In_Times, //住院次数
                        PatName: item.PAT_NAME, //姓名
                        APPLY_DATE: this.cardForm.jydate, //借阅日期
                        STOP_DATE: this.cardForm.jydeathdate, //借阅期限
                        Aim: this.cardForm.jyway //借阅用途
                    }
                    data.push(obj)
                })
                console.log(JSON.stringify(data))
                this.Borrow(data).then(res => {
                    if (res.code == 1) {
                        this.jycardDailog = false
                        this.$message.success(res.msg)
                    } else {
                        this.$message.warning(res.msg)
                    }
                })
            },
            handleBorrow() {
                //借阅
                if (this.jyCurrentVal.length == 0) {
                    this.$message.warning('请选中您要借阅的信息!')
                    return
                }
                this.cardForm.jyperson = ''
                this.jycardDailog = true

                console.log(this.jyCurrentVal)
            },
            handleBorrowHistory() {
                this.selectHistoryBtn()
            },
            selectHistoryBtn() {
                //借阅历史记录查询按钮
                let data = {
                    userid: this.userInfo.UserId,
                    startDate: this.jyStartDate,
                    EndDate: this.jyEndDate,
                    pageSize: this.paginationInfo.pageSize,
                    pageNos: this.paginationInfo.currentPage
                }
                this.SelectHistoryBtn(data).then(res => {
                    if (res.code == 1) {
                        let result = res.values
                        this.jslstableData = result.values
                        this.paginationInfo.total = result.total
                        this.paginationInfo.currentPage = result.pageNos
                    }
                })
            },
            handleclose(val) {
                val && (this.form.department = val.SHORT_CODE)
                this.ishow = false
                this.dialogdptvisible = false
            },
            choosedepartment() {
                // 科室弹窗
                this.ishow = true
                this.dialogdptvisible = true
            },
            handleClick(tab, event) {
                console.log(tab, event)
                if (tab.paneName == 'first') {
                    this.handlretrieval()
                    //已归档病案查询
                } else if (tab.paneName == 'second') {
                    //借阅病历
                    this.loadServe()
                } else {
                    this.selectHistoryBtn()
                    //借阅历史记录
                }
            },
            handleSizeChange(val, index) {
                this.paginationInfo.pageSize = val
                if (index == 0) {
                    this.handlretrieval()
                } else if (index == 1) {
                    this.loadServe()
                } else if (index == 2) {
                    this.selectHistoryBtn()
                }
            },
            handleCurrentChange(val, index) {
                // console.log(val)
                // console.log(index)
                this.paginationInfo.currentPage = val
                if (index == 0) {
                    this.handlretrieval()
                } else if (index == 1) {
                    this.loadServe()
                } else if (index == 2) {
                    this.selectHistoryBtn()
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .self-fieldset {
        border: 1px solid #ebeef5;
        border-radius: 8px;
    }

    .jy-panel {
        display: flex;
        align-items: center;
    }

    /deep/.el-card__body {
        padding: 10px 10px;
    }

    /deep/.el-tabs__nav .is-top {
        line-height: 30px;
        height: 30px;
    }

    /deep/.el-tabs__nav-prev,
    /deep/.el-tabs__nav-next {
        line-height: 2.8;
        height: 30px;
    }
</style>
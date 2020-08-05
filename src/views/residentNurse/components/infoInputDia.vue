<template>
    <div class="infoInputDia-container">
        <div class="top-btn imgBtnBox">
            <ckImgBtn class="imgBtn-item" icon="ck-imgicon-search" @click="handle('query')" style="padding-left:0px;">查询</ckImgBtn>
            <ckImgBtn class="imgBtn-item" icon="ck-imgicon-search" @click="handle('all')">全部</ckImgBtn>
            <!-- <ckBtn icon="ck-icon-edit">修正时间</ckBtn> -->
            <ckImgBtn class="imgBtn-item" icon="ck-imgicon-save" @click="handle('save')">保存</ckImgBtn>
            <ckImgBtn class="imgBtn-item" icon="ck-imgicon-printView" @click="handle('print')">打印</ckImgBtn>
            <!-- <ckBtn icon="ck-icon-quit">退出</ckBtn> -->
        </div>
        <el-form ref="form" :model="form" label-width="0px" size="mini">
            <el-form-item class="form-item">
                <label>
                    <el-checkbox v-model="form.rychecked">入院</el-checkbox>
                    <el-input v-model="form.ry" :disabled="form.ryable"></el-input>天内
                </label>
                <label>
                    <el-checkbox v-model="form.shchecked">手术</el-checkbox>
                    <el-input v-model="form.sh" :disabled="form.shable"></el-input>天内
                </label>
                <label>
                    <el-checkbox v-model="form.bwchecked">病危</el-checkbox>
                </label>
                <!-- <label>
          <el-checkbox v-model="form.twchecked">体温</el-checkbox>
          <el-input v-model="form.twl" :disabled="form.twlable"></el-input>°C
          <span style="margin:auto 10px;">至</span>
          <el-input v-model="form.twr" :disabled="form.twrable"></el-input>°C
        </label>-->
                <label>
                    <el-checkbox v-model="form.dtchecked">日期</el-checkbox>
                    <el-date-picker v-model="form.date" :disabled="form.dateable" type="datetime" placeholder="选择日期" style="width:180px;" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
                </label>
                <label>
                    <el-checkbox v-model="form.dptchecked">科室</el-checkbox>
                    <el-select v-model="form.dptvalue" :disabled="form.dptable" placeholder="请选择" style="width:150px;">
                        <el-option v-for="item in dptoptions" :key="item.DEPT_ID" :label="item.DEPT_NAME_CN" :value="item.DEPT_ID"></el-option>
                    </el-select>
                </label>
            </el-form-item>
        </el-form>
        <el-table :data="tableData" style="width: 100%;margin-bottom:50px;" border size="mini" height="calc(100vh - 350px)" highlight-current-row>
            <el-table-column type="index" width="50" label="序号" align="center"></el-table-column>
            <el-table-column prop="BED_NO" label="床号" align="center"></el-table-column>
            <el-table-column prop="PAT_NAME" label="姓名" align="center"></el-table-column>
            <el-table-column prop="PAT_GENDER" label="性别" align="center"></el-table-column>
            <el-table-column label="日期" align="center" width="160">
                <template v-slot="scope">{{scope.row.ORDERTIME|momentFilter}}</template>
            </el-table-column>
            <el-table-column label="口温" align="center">
                <template v-slot="scope">
                    <el-input v-model="scope.row.MOUTH" size="mini"></el-input>
                </template>
            </el-table-column>
            <el-table-column prop="ARMPIT" label="腋温" align="center">
                <template v-slot="scope">
                    <el-input v-model="scope.row.ARMPIT" size="mini"></el-input>
                </template>
            </el-table-column>
            <el-table-column prop="ANUS" label="肛温" align="center">
                <template v-slot="scope">
                    <el-input v-model="scope.row.ANUS" size="mini"></el-input>
                </template>
            </el-table-column>
            <el-table-column prop="PULSE" label="脉搏" align="center">
                <template v-slot="scope">
                    <el-input v-model="scope.row.PULSE" size="mini"></el-input>
                </template>
            </el-table-column>
            <el-table-column prop="HEARTBEAT" label="起搏心律" align="center">
                <template v-slot="scope">
                    <el-input v-model="scope.row.HEARTBEAT" size="mini"></el-input>
                </template>
            </el-table-column>
            <el-table-column prop="BREATHING" label="呼吸" align="center">
                <template v-slot="scope">
                    <el-input v-model="scope.row.BREATHING" size="mini"></el-input>
                </template>
            </el-table-column>
            <el-table-column prop="FEVER" label="高热降温" align="center">
                <template v-slot="scope">
                    <el-input v-model="scope.row.FEVER" size="mini"></el-input>
                </template>
            </el-table-column>
            <el-table-column prop="ISRISE" label="体温不升" align="center">
                <template v-slot="scope">
                    <el-checkbox v-model="scope.row.ISRISE" :checked="scope.row.ISRISE=='1'?true:false"></el-checkbox>
                </template>
            </el-table-column>
            <el-table-column prop="REMARKS" label="备注" align="center">
                <template v-slot="scope">
                    <el-input v-model="scope.row.REMARKS" size="mini"></el-input>
                </template>
            </el-table-column>
            <el-table-column prop="TEMPERATURE" label="体温未测" align="center" width="110">
                <template v-slot="scope">
                    <el-select @change="handleChangle" v-model="scope.row.TEMPERATURE" placeholder size="mini">
                        <el-option v-for="item in optionsSelect" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    <!-- <el-input v-model="scope.row.TEMPERATURE" size="mini"></el-input> -->
                </template>
            </el-table-column>
            <el-table-column prop="BLOODPRESSURE" label="血压1(mmHg)" align="center" width="120">
                <template v-slot="scope">
                    <el-input v-model="scope.row.BLOODPRESSURE" size="mini"></el-input>
                </template>
            </el-table-column>
            <el-table-column prop="BLOODPRESSURE2" label="血压2(mmHg)" align="center" width="120">
                <template v-slot="scope">
                    <el-input v-model="scope.row.BLOODPRESSURE2" size="mini"></el-input>
                </template>
            </el-table-column>
            <el-table-column prop="IN_METE" label="入量(ml)" align="center">
                <template v-slot="scope">
                    <el-input v-model="scope.row.IN_METE" size="mini"></el-input>
                </template>
            </el-table-column>
            <el-table-column prop="PRESSURE" label="负压引流" align="center">
                <template v-slot="scope">
                    <el-input v-model="scope.row.PRESSURE" size="mini"></el-input>
                </template>
            </el-table-column>
            <el-table-column prop="FAECES" label="大便(次)" align="center">
                <template v-slot="scope">
                    <el-input v-model="scope.row.FAECES" size="mini"></el-input>
                </template>
            </el-table-column>
            <el-table-column prop="SKINTEST1" label="皮试1" align="center">
                <template v-slot="scope">
                    <el-input v-model="scope.row.SKINTEST1" size="mini"></el-input>
                </template>
            </el-table-column>
            <el-table-column prop="SKINTEST2" label="皮试2" align="center">
                <template v-slot="scope">
                    <el-input v-model="scope.row.SKINTEST2" size="mini"></el-input>
                </template>
            </el-table-column>
            <el-table-column prop="WEIGHT" label="体重(kg)" align="center">
                <template v-slot="scope">
                    <el-input v-model="scope.row.WEIGHT" size="mini"></el-input>
                </template>
            </el-table-column>
            <el-table-column prop="SATURATION2" label="血氧饱和度(%)2" align="center" width="130">
                <template v-slot="scope">
                    <el-input v-model="scope.row.SATURATION2" size="mini"></el-input>
                </template>
            </el-table-column>
            <el-table-column prop="SATURATION" label="血氧饱和度(%)" align="center" width="120">
                <template v-slot="scope">
                    <el-input v-model="scope.row.SATURATION" size="mini"></el-input>
                </template>
            </el-table-column>
            <el-table-column prop="HEIGHT" label="末梢血糖mmol/L" align="center" width="130">
                <template v-slot="scope">
                    <el-input v-model="scope.row.HEIGHT" size="mini"></el-input>
                </template>
            </el-table-column>
            <el-table-column prop="OPERATIONDATE" label="手术日期" align="center">
                <template v-slot="scope">
                    <el-checkbox v-model="scope.row.OPERATIONDATE"></el-checkbox>
                </template>
            </el-table-column>
            <el-table-column prop="BACKROOMDATE" label="回室日期" align="center">
                <template v-slot="scope">
                    <el-checkbox v-model="scope.row.BACKROOMDATE"></el-checkbox>
                </template>
            </el-table-column>
            <el-table-column prop="INTODATE" label="转入日期" align="center">
                <template v-slot="scope">
                    <el-checkbox v-model="scope.row.INTODATE"></el-checkbox>
                </template>
            </el-table-column>
            <el-table-column prop="CHILDBIRTHDATE" label="分娩日期" align="center">
                <template v-slot="scope">
                    <el-checkbox v-model="scope.row.CHILDBIRTHDATE"></el-checkbox>
                </template>
            </el-table-column>
            <el-table-column prop="DEATHDATE" label="死亡日期" align="center">
                <template v-slot="scope">
                    <el-checkbox v-model="scope.row.DEATHDATE"></el-checkbox>
                </template>
            </el-table-column>
            <el-table-column prop="VISIT_ID" label="住院号" align="center" width="210"></el-table-column>
        </el-table>
        <ckPagination :currentPage="pageNos" :total="total" :pageSize="pageSize" @_pageSizeChange="pageSizeChange" @_currentPageChange="currentPageChange"></ckPagination>
    </div>
</template>

<script type="text/javascript">
    import {
        createNamespacedHelpers,
        mapState
    } from 'vuex'
    const {
        mapActions
    } = createNamespacedHelpers('residentNurse')
    import moment from 'moment'
    export default {
        name: 'InfoInputDia',
        data() {
            return {
                optionsSelect: [{
                        label: '拒测',
                        value: '拒测'
                    },
                    {
                        label: '外出',
                        value: '外出'
                    },
                    {
                        label: '请假',
                        value: '请假'
                    }
                ],
                pageSize: 20,
                pageNos: 1,
                total: 0,
                form: {
                    rychecked: false,
                    ry: 0,
                    ryable: true,
                    shchecked: false,
                    shable: true,
                    sh: 0,
                    bwchecked: false,
                    twchecked: false,
                    twl: 0,
                    twr: 0,
                    twlable: true,
                    twrable: true,
                    dtchecked: false,
                    date: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                    dateable: true,
                    dptchecked: false,
                    dptable: true
                },
                dptvalue: '',
                dptoptions: [],
                tableData: []
            }
        },
        filters: {
            momentFilter: function(value) {
                if (!value) return ''
                return moment(value).format('YYYY-MM-DD HH:mm:ss')
            }
        },
        watch: {
            'form.rychecked': {
                //人院
                handler(newV) {
                    if (newV) {
                        this.form.ryable = false
                    } else {
                        this.form.ryable = true
                    }
                }
            },
            'form.shchecked': {
                //手术
                handler(newV) {
                    if (newV) {
                        this.form.shable = false
                    } else {
                        this.form.shable = true
                    }
                }
            },
            'form.bwchecked': {
                //病危
                handler(newV) {
                    if (newV) {} else {}
                }
            },
            'form.twchecked': {
                //体温
                handler(newV) {
                    if (newV) {
                        this.form.twlable = false
                        this.form.twrable = false
                    } else {
                        this.form.twlable = true
                        this.form.twrable = true
                    }
                }
            },
            'form.dtchecked': {
                //日期
                handler(newV) {
                    if (newV) {
                        this.form.dateable = false
                    } else {
                        this.form.dateable = true
                    }
                }
            },
            'form.dptchecked': {
                //科室
                handler(newV) {
                    if (newV) {
                        this.form.dptable = false
                    } else {
                        this.form.dptable = true
                    }
                }
            }
        },
        created() {
            this.loadTreeInfo('0')
            this.getTreeInfoDept()
        },
        computed: {
            ...mapState({
                departmentId: state => state.global.deptID
            })
        },
        methods: {
            ...mapActions(['GetTreeInfoDept', 'LoadTreeInfo', 'SaveThreeInfo']),
            handleChangle() {

            },
            handle(val) {
                if (val == 'query') {
                    //查询
                    if (
                        this.form.rychecked ||
                        this.form.dtchecked ||
                        this.form.shchecked ||
                        this.form.bwchecked
                    ) {
                        //有勾选条件时
                        this.loadTreeInfo('1')
                    } else {
                        //无勾选条件时
                        this.loadTreeInfo('0')
                    }
                } else if (val == 'all') {
                    //全部
                    this.loadTreeInfo('0')
                } else if (val == 'save') {
                    //保存
                    console.log(this.tableData[0])
                    let newTableData = []
                    this.tableData.forEach(item => {
                        let obj = {}
                        obj.BED_NO = item.BED_NO
                        obj.PAT_NAME = item.PAT_NAME
                        obj.PAT_GENDER = item.PAT_GENDER
                        obj.ORDERTIME = item.ORDERTIME
                        obj.MOUTH = item.MOUTH
                        obj.ARMPIT = item.ARMPIT
                        obj.ANUS = item.ANUS
                        obj.PULSE = item.PULSE
                        obj.HEARTBEAT = item.HEARTBEAT
                        obj.BREATHING = item.BREATHING
                        obj.FEVER = item.FEVER
                        obj.ISRISE = item.ISRISE ? 1 : 0
                        obj.REMARKS = item.REMARKS
                        obj.TEMPERATURE = item.TEMPERATURE
                        obj.BLOODPRESSURE = item.BLOODPRESSURE
                        obj.BLOODPRESSURE2 = item.BLOODPRESSURE2
                        obj.IN_METE = item.IN_METE
                        obj.PRESSURE = item.PRESSURE
                        obj.FAECES = item.FAECES
                        obj.SKINTEST1 = item.SKINTEST1
                        obj.SKINTEST2 = item.SKINTEST2
                        obj.WEIGHT = item.WEIGHT
                        obj.SATURATION2 = item.SATURATION2
                        obj.SATURATION = item.SATURATION
                        obj.HEIGHT = item.HEIGHT
                        obj.OPERATIONDATE = item.OPERATIONDATE ? 1 : 0
                        obj.BACKROOMDATE = item.BACKROOMDATE ? 1 : 0
                        obj.INTODATE = item.INTODATE ? 1 : 0
                        obj.CHILDBIRTHDATE = item.CHILDBIRTHDATE ? 1 : 0
                        obj.DEATHDATE = item.DEATHDATE ? 1 : 0
                        obj.VISIT_ID = item.VISIT_ID
                        newTableData.push(obj)
                    })
                    let data = newTableData
                    console.log(JSON.stringify(data[0]))
                    this.SaveThreeInfo(data).then(res => {
                        if (res.code == 1) {
                            this.$emit('closetopMenuDiaData')
                            this.$message.success(res.msg)
                        }
                    })
                } else if (val == 'print') {
                    //打印
                }
            },
            getTreeInfoDept() {
                this.GetTreeInfoDept().then(res => {
                    console.log(res)
                    if (res.code == 1) {
                        this.dptoptions = res.values
                    }
                })
            },
            loadTreeInfo(val) {
                console.log(this.departmentId)
                let data = {
                    DeptID: this.departmentId,
                    IsLoad: val,
                    pageSize: this.pageSize,
                    pageNos: this.pageNos,
                    ckInto: this.form.rychecked ? 1 : 0,
                    ckIntoTxt: this.form.ry,
                    ckbDate: this.form.dtchecked ? 1 : 0,
                    ckbDateTxt: this.form.date,
                    ckOpreation: this.form.shchecked ? 1 : 0,
                    ckOpreationTxt: this.form.sh,
                    ckIlless: this.form.bwchecked ? 1 : 0
                }
                console.log(JSON.stringify(data))
                this.LoadTreeInfo(data).then(res => {
                    console.log(res)
                    if (res.code == 2) {
                        let result = res.values
                        this.total = result.total
                        this.tableData = result.values
                    }
                })
            },
            pageSizeChange(size) {
                this.pageSize = size
                if (
                    this.form.rychecked ||
                    this.form.dtchecked ||
                    this.form.shchecked ||
                    this.form.bwchecked
                ) {
                    //有勾选条件时
                    this.loadTreeInfo('1')
                } else {
                    //无勾选条件时
                    this.loadTreeInfo('0')
                }
            },
            currentPageChange(val) {
                this.pageNos = val
                if (
                    this.form.rychecked ||
                    this.form.dtchecked ||
                    this.form.shchecked ||
                    this.form.bwchecked
                ) {
                    //有勾选条件时
                    this.loadTreeInfo('1')
                } else {
                    //无勾选条件时
                    this.loadTreeInfo('0')
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .infoInputDia-container {
        .form-item {
            margin: 10px auto;

            label {
                margin-right: 15px;

                .el-input {
                    width: 100px;
                }
            }
        }

        .imgBtnBox {
            margin-bottom: 10px;

            .imgBtn-item {
                display: inline-flex;
                justify-content: space-evenly;
                line-height: 2.3;
            }
        }

        /deep/.img-btn>span {
            min-width: 34px !important;

            &:nth-child(1) {
                min-width: 34px !important;
                margin-right: 8px;
            }

            &:nth-child(2) {
                margin-right: 10px;
            }
        }
    }
</style>
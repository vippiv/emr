<template>
    <div class="nursing-patrol">
        <el-row>
            <el-col :span="14" style="text-align:right;font-size:18px;letter-spacing:12px;">
                <h1>护理巡视及患者睡眠记录单(2)</h1>
            </el-col>
            <el-col :span="8" style="text-align:center;font-size:16px;">
                <span>日期：{{topDate}}</span>
            </el-col>
        </el-row>
        <div class="table-wrapper">
            <table v-if="tableData.length>0?true:false" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" class="gridtable" border style="border-color:#ebeef5;" cellspacing="0" cellpadding="0">
                <thead>
                    <tr>
                        <th width='110' v-for="item in headerData" :key="item.value">{{item.label}}</th>
                    </tr>
                </thead>
                <tbody class="table-body" ref="table">
                    <tr v-for="item in tableData" :key="item.id">
                        <td class="tb-w">{{ item.BedNo}}</td>
                        <td class="tb-w">{{ item.VisitName}}</td>
                        <td class="tb-w">
                            <el-select v-if="inputselectStatus" v-model="item.Eighteen" placeholder size="mini" clearable>
                                <el-option v-for="item in optionsSelect" :key="item.idx" :label="item.ItemText" :value="item.ItemText"></el-option>
                            </el-select>
                        </td>
                        <td class="tb-w">
                            <el-select v-if="inputselectStatus" v-model="item.EighteenHalf" placeholder size="mini" clearable>
                                <el-option v-for="item in optionsSelect" :key="item.idx" :label="item.ItemText" :value="item.ItemText"></el-option>
                            </el-select>
                        </td>
                        <td class="tb-w">
                            <el-select v-if="inputselectStatus" v-model="item.Nighteen" placeholder size="mini" clearable>
                                <el-option v-for="item in optionsSelect" :key="item.idx" :label="item.ItemText" :value="item.ItemText"></el-option>
                            </el-select>
                        </td>
                        <td class="tb-w">
                            <el-select v-if="inputselectStatus" v-model="item.NighteenHalf" placeholder size="mini" clearable>
                                <el-option v-for="item in optionsSelect" :key="item.idx" :label="item.ItemText" :value="item.ItemText"></el-option>
                            </el-select>
                        </td>
                        <td class="tb-w">
                            <el-select v-if="inputselectStatus" v-model="item.Twenty" placeholder size="mini" clearable>
                                <el-option v-for="item in optionsSelect" :key="item.idx" :label="item.ItemText" :value="item.ItemText"></el-option>
                            </el-select>
                        </td>
                        <td class="tb-w">
                            <el-select v-if="inputselectStatus" v-model="item.TwentyHalf" placeholder size="mini" clearable>
                                <el-option v-for="item in optionsSelect" :key="item.idx" :label="item.ItemText" :value="item.ItemText"></el-option>
                            </el-select>
                        </td>
                        <td class="tb-w">
                            <el-select v-if="inputselectStatus" v-model="item.Twentyone" placeholder size="mini" clearable>
                                <el-option v-for="item in optionsSelect" :key="item.idx" :label="item.ItemText" :value="item.ItemText"></el-option>
                            </el-select>
                        </td>
                        <td class="tb-w">
                            <el-select v-if="inputselectStatus" v-model="item.TwentyoneHalf" placeholder size="mini" clearable>
                                <el-option v-for="item in optionsSelect" :key="item.idx" :label="item.ItemText" :value="item.ItemText"></el-option>
                            </el-select>
                        </td>
                        <td class="tb-w">
                            <el-select v-if="inputselectStatus" v-model="item.Twentytwo" placeholder size="mini" clearable>
                                <el-option v-for="item in optionsSelect" :key="item.idx" :label="item.ItemText" :value="item.ItemText"></el-option>
                            </el-select>
                        </td>
                        <td class="tb-w">
                            <el-select v-if="inputselectStatus" v-model="item.TwentytwoHalf" placeholder size="mini" clearable>
                                <el-option v-for="item in optionsSelect" :key="item.idx" :label="item.ItemText" :value="item.ItemText"></el-option>
                            </el-select>
                        </td>
                        <td class="tb-w">
                            <el-select v-if="inputselectStatus" v-model="item.Twentythree" placeholder size="mini" clearable>
                                <el-option v-for="item in optionsSelect" :key="item.idx" :label="item.ItemText" :value="item.ItemText"></el-option>
                            </el-select>
                        </td>
                        <td class="tb-w">
                            <el-select v-if="inputselectStatus" v-model="item.TwentythreeHalf" placeholder size="mini" clearable>
                                <el-option v-for="item in optionsSelect" :key="item.idx" :label="item.ItemText" :value="item.ItemText"></el-option>
                            </el-select>
                        </td>
                        <td class="tb-w">
                            <el-select v-if="inputselectStatus" v-model="item.Twentyfour" placeholder size="mini" clearable>
                                <el-option v-for="item in optionsSelect" :key="item.idx" :label="item.ItemText" :value="item.ItemText"></el-option>
                            </el-select>
                        </td>
                        <td class="tb-w">
                            <el-select v-if="inputselectStatus" v-model="item.TwentyfourHalf" placeholder size="mini" clearable>
                                <el-option v-for="item in optionsSelect" :key="item.idx" :label="item.ItemText" :value="item.ItemText"></el-option>
                            </el-select>
                        </td>
                        <td class="tb-w">
                            <el-select v-if="inputselectStatus" v-model="item.One" placeholder size="mini" clearable>
                                <el-option v-for="item in optionsSelect" :key="item.idx" :label="item.ItemText" :value="item.ItemText"></el-option>
                            </el-select>
                        </td>
                        <td class="tb-w">
                            <el-select v-if="inputselectStatus" v-model="item.OneHalf" placeholder size="mini" clearable>
                                <el-option v-for="item in optionsSelect" :key="item.idx" :label="item.ItemText" :value="item.ItemText"></el-option>
                            </el-select>
                        </td>
                        <td class="tb-w">
                            <el-select v-if="inputselectStatus" v-model="item.Two" placeholder size="mini" clearable>
                                <el-option v-for="item in optionsSelect" :key="item.idx" :label="item.ItemText" :value="item.ItemText"></el-option>
                            </el-select>
                        </td>
                        <td class="tb-w">
                            <el-select v-if="inputselectStatus" v-model="item.TwoHalf" placeholder size="mini" clearable>
                                <el-option v-for="item in optionsSelect" :key="item.idx" :label="item.ItemText" :value="item.ItemText"></el-option>
                            </el-select>
                        </td>
                        <td class="tb-w">
                            <el-select v-if="inputselectStatus" v-model="item.Three" placeholder size="mini" clearable>
                                <el-option v-for="item in optionsSelect" :key="item.idx" :label="item.ItemText" :value="item.ItemText"></el-option>
                            </el-select>
                        </td>
                        <td class="tb-w">
                            <el-select v-if="inputselectStatus" v-model="item.ThreeHalf" placeholder size="mini" clearable>
                                <el-option v-for="item in optionsSelect" :key="item.idx" :label="item.ItemText" :value="item.ItemText"></el-option>
                            </el-select>
                        </td>
                        <td class="tb-w">
                            <el-select v-if="inputselectStatus" v-model="item.Four" placeholder size="mini" clearable>
                                <el-option v-for="item in optionsSelect" :key="item.idx" :label="item.ItemText" :value="item.ItemText"></el-option>
                            </el-select>
                        </td>
                        <td class="tb-w">
                            <el-select v-if="inputselectStatus" v-model="item.FourHalf" placeholder size="mini" clearable>
                                <el-option v-for="item in optionsSelect" :key="item.idx" :label="item.ItemText" :value="item.ItemText"></el-option>
                            </el-select>
                        </td>
                        <td class="tb-w">
                            <el-select v-if="inputselectStatus" v-model="item.Five" placeholder size="mini" clearable>
                                <el-option v-for="item in optionsSelect" :key="item.idx" :label="item.ItemText" :value="item.ItemText"></el-option>
                            </el-select>
                        </td>
                        <td class="tb-w">
                            <el-select v-if="inputselectStatus" v-model="item.FiveHalf" placeholder size="mini" clearable>
                                <el-option v-for="item in optionsSelect" :key="item.idx" :label="item.ItemText" :value="item.ItemText"></el-option>
                            </el-select>
                        </td>
                        <td class="tb-w">
                            <el-select v-if="inputselectStatus" v-model="item.Six" placeholder size="mini" clearable>
                                <el-option v-for="item in optionsSelect" :key="item.idx" :label="item.ItemText" :value="item.ItemText"></el-option>
                            </el-select>
                        </td>
                        <td class="tb-w">
                            <el-select v-if="inputselectStatus" v-model="item.SixHalf" placeholder size="mini" clearable>
                                <el-option v-for="item in optionsSelect" :key="item.idx" :label="item.ItemText" :value="item.ItemText"></el-option>
                            </el-select>
                        </td>
                    </tr>
                    <tr>
                        <td class="tb-w" colspan="2">护士签名</td>
                        <td class="tb-w td-hover" @dblclick="handleTableCell(item)" v-for="item in nursingSingerData" :key="item.Time">
                            <el-input v-if="inputselectStatus" v-model="item.UserName" size="mini" clearable @clear="handleCellClear(item)"></el-input>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div style="margin-bottom:90px;margin-top:10px;">
            备注:1、睡眠记录:患者睡眠全天用红\"O\"表示;患者未睡划护理巡视对应的符号.2、护理巡视:全天统一用蓝笔,1\"√\"-无特殊情况;2\"△\"-发现病人病情变化或其他" +
            "情况(详见护理记录单)
        </div>
        <ckPagination style="margin:40px auto;" :currentPage="pageNos" :total="total" :pageSize="pageSize" @_pageSizeChange="pageSizeChange" @_currentPageChange="currentPageChange"></ckPagination>
        <div style="position:absolute;bottom:50px;">
            <el-button type="primary" size="mini" @click="handleNursing('save')">保存</el-button>
            <el-button type="primary" size="mini">打印</el-button>
            <el-button type="primary" size="mini">打印预览</el-button>
        </div>
    </div>
</template>
<script>
    import {
        mapState
    } from 'vuex'
    import moment from 'moment'
    import {
        createNamespacedHelpers
    } from 'vuex'
    const {
        mapActions
    } = createNamespacedHelpers('residentNurse')
    export default {
        name: 'nursingPatrolSecode',
        data() {
            return {
                inputselectStatus:false,
                loading: true,
                pageSize: 20,
                pageNos: 1,
                total: 0,
                optionsSelect: [],
                topDate: moment(new Date()).format('YYYY-MM-DD'),
                tableData: [],
                headerData: [{
                        value: '1',
                        label: '床号'
                    }, {
                        value: '2',
                        label: '姓名'
                    }, {
                        value: '3',
                        label: '18:00'
                    }, {
                        value: '4',
                        label: '18:30'
                    }, {
                        value: '5',
                        label: '19:00'
                    }, {
                        value: '6',
                        label: '19:30'
                    }, {
                        value: '7',
                        label: '20:00'
                    }, {
                        value: '8',
                        label: '20:30'
                    }, {
                        value: '9',
                        label: '21:00'
                    }, {
                        value: '10',
                        label: '21:30'
                    },
                    {
                        value: '11',
                        label: '22:00'
                    }, {
                        value: '12',
                        label: '22:30'
                    }, {
                        value: '13',
                        label: '23:00'
                    }, {
                        value: '14',
                        label: '23:30'
                    }, {
                        value: '15',
                        label: '0:00'
                    }, {
                        value: '16',
                        label: '0:30'
                    },
                    {
                        value: '17',
                        label: '1:00'
                    }, {
                        value: '18',
                        label: '1:30'
                    }, {
                        value: '19',
                        label: '2:00'
                    }, {
                        value: '20',
                        label: '2:30'
                    }, {
                        value: '21',
                        label: '3:00'
                    }, {
                        value: '22',
                        label: '3:30'
                    }, {
                        value: '23',
                        label: '4:00'
                    }, {
                        value: '24',
                        label: '4:30'
                    },
                    {
                        value: '25',
                        label: '5:00'
                    }, {
                        value: '26',
                        label: '5:30'
                    },
                    {
                        value: '27',
                        label: '6:00'
                    }, {
                        value: '28',
                        label: '6:30'
                    },
                ],
                nursingSingerData: [],
                timer:null
            }
        },
        computed: {
            ...mapState({
                loginUserId: state => state.global.userInfo,
                dptId: state => state.global.deptID
            })
        },
        created() {
            this.getNursingInspection()
            this.get_MASURIUM_DICT_ITEM()
            this.getNurseSingerName()
        },
        mounted(){
            this.timer = setTimeout(() => {
                this.inputselectStatus = true
            }, 1000);
        },
        methods: {
            ...mapActions([
                'GetNurseSingerNameScnd',
                'Get_MASURIUM_DICT_ITEM',
                'SaveNursingInspectionScnd',
                'GetNurseQMScnd'
            ]),
            getNurseSingerName() { //获取护士签名
                let data = {
                    deptId: this.dptId,
                    dttime: this.topDate
                }
                this.GetNurseQMScnd(data).then(res => {
                    if (res.code == 1) {
                        this.nursingSingerData = res.values
                    }
                })
            },
            handleTableCell(val) {
                this.nursingSingerData.forEach(item => {
                    if (item.Time == val.Time) {
                        item.UserName = this.loginUserId.UserName
                        item.UserID = this.loginUserId.UserId
                    }
                })
            },
            get_MASURIUM_DICT_ITEM() {
                this.Get_MASURIUM_DICT_ITEM().then(res => {
                    if (res.code == 1) {
                        this.optionsSelect = res.values
                    }
                })
            },
            getNursingInspection() { //获取护理巡视表格信息
                let data = {
                    deptid: this.dptId,
                    dttime: this.topDate,
                    pageSize: this.pageSize,
                    pageNos: this.pageNos
                }
                this.GetNurseSingerNameScnd(data).then(res => {
                    if (res.code == 1) {
                        this.loading = false
                        let result = res.values
                        this.total = result.total
                        this.tableData = result.values
                    }
                })
            },
            pageSizeChange(size) {
                this.pageSize = size
                this.getNursingInspection()
            },
            currentPageChange(val) {
                this.pageNos = val
                this.getNursingInspection()
            },
            handleNursing(val) {
                if (val == 'save') {
                    //保存
                    this.tableData.forEach(item => {
                        item.DeptCode = this.dptId
                    })
                    let data = {
                        eMR_HL_SMs: this.tableData,
                        EMR_HL_SMseven: this.nursingSingerData
                    }
                    this.SaveNursingInspectionScnd(data).then(res => {
                        if (res.code == 1) {
                            this.$message.success(res.msg)
                            this.getNursingInspection()
                            this.getNurseSingerName()
                        }
                    })
                }
            },
            handleCellClear(val) {
                this.nursingSingerData.forEach(item => {
                    if (item.Time == val.Time) {
                        item.UserName = ''
                        item.UserID = ''
                    }
                })
            },

        },
        beforeDestroy(){
            clearTimeout(this.timer)
        }
    }
</script>
<style lang="scss" scoped>
    .nursing-patrol {
        // height: 80vh;
        background-color: white;
        .el-select {
            border: none !important;
        }

        .el-select /deep/ .el-input {
            border: none !important;
            border-color: #fff;
        }

        .el-select /deep/ input {
            border: none !important;
        }

        .el-select /deep/ .el-select__caret {
            display: none !important;
        }

        .el-select /deep/ .el-icon-circle-close {
            display: block !important;
        }

        /deep/.el-input--mini .el-input__inner {
            border: none;
            border-radius: 0px;
            cursor: pointer;
            color: transparent;
            text-shadow: 0 0 0 #606266;
        }

        .table-wrapper {
            overflow: auto;
            height: calc(100vh - 320px);

            .gridtable {
                border-collapse: collapse;
                width: 100%;
                overflow: auto;
                table-layout: fixed;
                word-break: break-all;
                word-wrap: break-word;

                // .table-body {
                // }

                thead>tr {
                    background: #eef1f6;
                }

                th,
                td {
                    border: 1px solid #dfe6ec;
                    font-size: 14px;
                    font-weight: normal;
                    text-align: center;
                    padding: 6px 0px;
                }

                tbody>tr {
                    &:hover {
                        background: #eef1f6;
                    }

                    .td-hover:hover {
                        cursor: pointer;
                    }
                }
            }
        }


    }
</style>
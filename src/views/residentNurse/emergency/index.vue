<template>
    <div class="emergency-container">
        <topImgBtn @actionSubEvent="handleSubEvent"></topImgBtn>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="本科在院患者列表" name="first">
                <patientList :personDatas="bkpersonData" @_handleSizeChange='handleSizeChange' @_handleCurrentChange='handleCurrentChange' :paginationInfo='paginationInfo' :patientTotal="patientTotal" :nurseThree="nurseThree" :nurseTwo="nurseTwo" :nurseOne="nurseOne"></patientList>
            </el-tab-pane>
            <el-tab-pane label="转科未提交患者列表" name="second">
                <patientList :personDatas="zkpersonData" :paginationInfo='paginationInfo' :patientTotal="patientTotal" :nurseThree="nurseThree" :nurseTwo="nurseTwo" :nurseOne="nurseOne"></patientList>
            </el-tab-pane>
            <el-tab-pane label="出院未送交病历患者列表" name="third">
                <patientList :personDatas="cypersonData" :paginationInfo='paginationInfo' :patientTotal="patientTotal" :nurseThree="nurseThree" :nurseTwo="nurseTwo" :nurseOne="nurseOne"></patientList>
            </el-tab-pane>
        </el-tabs>
        <topMenuDia :title="topMenuDiaTitle" :dialogVisible="topMenuDiaVis" :diaWidth="customDiaWidth" @closeTopMeunDia="handleCloseTopMeunDia">
            <div slot="main">
                <component :is="topMenuComponentName" :patientInfo="tempPatientInfo" :dialogVisible="topMenuDiaVis" :inDoctor="inDoctor" :emergencyDoctor="emergencyDoctor" @closetopMenuDiaData="handleclosetopMenuDiaData" @topMenuDiaData="handletopMenuDiaData"></component>
            </div>
        </topMenuDia>
        <!-- 定位 -->
        <positionDia :positionshow='positionshow' @topMenuDiaData="handletopMenuDiaData" v-if="positionshow"></positionDia>
    </div>
</template>

<script>
    import {
        mapState,
        createNamespacedHelpers
    } from 'vuex'
    import patientList from './components/patientList'
    import topImgBtn from '../components/topImgBtn'
    import topMenuDia from '../components/index'
    import positionDia from '../components/positionDia'
    import infoInputDia from '../components/infoInputDia'
    import nursingPatrol from '../components/nursingPatrol'
    import nursingPatrolSecode from '../components/nursingPatrolSecode'
    import Evtbus from '@/utils/bus'
    const {
        mapActions
    } = createNamespacedHelpers('residentNurse')
    let moment = require('moment')
    // 中文简体
    moment.locale('zh-cn')
    export default {
        name: 'EmergencyMedicine',
        data() {
            return {
                positionshow: false,
                bkstaus: true, //本科在院卡片显示
                activeName: 'first',
                options: [{
                        value: '1',
                        label: '卡片显示'
                    },
                    {
                        value: '2',
                        label: '列表显示'
                    }
                ],
                patientTotal: 0, //本科在院患者总数
                value: '1',
                bkpersonData: [], //本科在院患者数据
                zkpersonData: [], //转科在院患者数据
                cypersonData: [], //出院未送交患者
                paginationInfo: {
                    // 分页
                    currentPage: 1,
                    total: 0,
                    pageSizes: [20, 30, 40],
                    pageSize: 20
                },
                bktotal: 0,
                zktotal: 0,
                cytotal: 0,
                hlType: 1,
                hltotal: {}, //护理数据
                nurseThree: 0,
                nurseTwo: 0,
                nurseOne: 0,
                BenNo: '', //床号
                Visit_NO: '', //住院号
                VName: '', //姓名
                topMenuDiaTitle: '',
                topMenuDiaVis: false,
                customDiaWidth: '',
                topMenuComponentName: '',
                tempPatientInfo: {},
                inDoctor: null, // 收录医师
                emergencyDoctor: null // 急诊医师
            }
        },
        components: {
            patientList,
            topImgBtn,
            topMenuDia,
            positionDia,
            infoInputDia,
            nursingPatrol,
            nursingPatrolSecode
        },
        computed: {
            ...mapState({
                deptID: state => state.global.deptID
            })
        },
        watch: {
            deptID(oldVal, newVal) {
                if (oldVal !== newVal) {
                    this.getAllData()
                }
            }
        },
        created() {
            this.getAllData()
        },
        methods: {
            ...mapActions([
                'GET_SYST_VISIT1_BY_IPDEPT',
                'GetSYS_TByZKCountLevel',
                'GetSYS_T_VISIT_1ByIpDeptCountLevel',
                'GetSYS_T_VISIT_1ByZKCountLevel',
                'GetSYS_T_VISIT_1ByCYCountLevel'
            ]),
            handleSizeChange(val) {

                if (this.activeName == 'first') {
                    //本科在院患者
                    this.paginationInfo.pageSize = val
                    this.getSYSTVISIT1ByIpDept({
                        tag: 1
                    })
                } else if (this.activeName == 'second') {
                    //转科未提交院患者
                    this.paginationInfo.pageSize = val
                    this.getSYSTVISIT1ByIpDept({
                        tag: 2
                    })
                } else {
                    this.paginationInfo.pageSize = val
                    //出院未送交院患者
                    this.getSYSTVISIT1ByIpDept({
                        tag: 3
                    })
                }
            },
            handleCurrentChange(val) {
                if (this.activeName == 'first') {
                    //本科在院患者
                    this.paginationInfo.currentPage = val
                    this.getSYSTVISIT1ByIpDept({
                        tag: 1
                    })
                } else if (this.activeName == 'second') {
                    //转科未提交院患者
                    this.paginationInfo.currentPage = val
                    this.getSYSTVISIT1ByIpDept({
                        tag: 2
                    })
                } else {
                    this.paginationInfo.currentPage = val
                    //出院未送交院患者
                    this.getSYSTVISIT1ByIpDept({
                        tag: 3
                    })
                }
            },
            getAllData() {
                this.getSYSTVISIT1ByIpDept({
                    tag: 1
                })
                this.getSystbyzkCountLevel({
                    tag: 1
                })
                this.getSYS_T_VISIT_1ByIpDeptCountLevel()
            },
            getSYSTVISIT1ByIpDept(tab) {
                //获取数据源
                let data = {
                    tag: tab.tag,
                    deptId: this.deptID,
                    pageSize: this.paginationInfo.pageSize,
                    pageNos: this.paginationInfo.currentPage,
                    BenNo: this.BenNo,
                    Visit_NO: this.Visit_NO,
                    VName: this.VName
                }
                this.GET_SYST_VISIT1_BY_IPDEPT(data).then(res => {
                    console.log(res)
                    if (res.code == 1) {
                        let result = res.values
                        console.log(result)
                        if (tab.tag === 1) {
                            // 本科在院
                            this.bkpersonData = result.values
                            this.paginationInfo.total = result.total
                            this.bktotal = result.total
                        } else if (tab.tag === 2) {
                            // 转科未提交
                            this.zkpersonData = result.values
                            this.paginationInfo.total = result.total
                            this.zktotal = result.total
                        } else if (tab.tag === 3) {
                            // 出院未提交
                            this.cypersonData = result.values
                            this.paginationInfo.total = result.total
                            this.cytotal = result.total
                        }
                    }
                })
            },
            getSystbyzkCountLevel(tab) {
                //获取护理人数
                let data = {
                    deptid: this.deptID,
                    type: this.hlType //本科在院护理总数 1 查询转科未提交患者护理总数 2 查询出院未提交患者护理总数 3
                }
                this.GetSYS_TByZKCountLevel(data).then(res => {
                    if (res.code == 1) {
                        this.hltotal = res.values
                    }
                })
            },
            //本科在院患者总数
            getSYS_T_VISIT_1ByIpDeptCountLevel() {
                let data = {
                    deptid: this.deptID
                }
                this.GetSYS_T_VISIT_1ByIpDeptCountLevel(data).then(res => {
                    console.log(res)
                    if (res.code == 1) {
                        this.patientTotal = res.values
                        console.log(this.patientTotal)
                    }
                })
            },
            //转科未提交患者总数
            getSYS_T_VISIT_1ByZKCountLevel() {
                let data = {
                    deptid: this.deptID
                }
                this.GetSYS_T_VISIT_1ByZKCountLevel(data).then(res => {
                    console.log(res)
                    if (res.code == 1) {
                        this.patientTotal = res.values
                    }
                })
            },
            //出院未送交病历总数
            getSYS_T_VISIT_1ByCYCountLevel() {
                let data = {
                    deptid: this.deptID
                }
                this.GetSYS_T_VISIT_1ByCYCountLevel(data).then(res => {
                    console.log(res)
                    if (res.code == 1) {
                        this.patientTotal = res.values
                    }
                })
            },
            handleSubEvent(val) {
                if (val === 'reflash') {
                    // TODO 刷新页面
                    this.BenNo = ''
                    this.Visit_NO = ''
                    this.VName = ''
                    if (this.activeName == 'first') {
                        this.getSYSTVISIT1ByIpDept({
                            tag: 1
                        })
                    } else if (this.activeName == 'second') {
                        this.getSYSTVISIT1ByIpDept({
                            tag: 2
                        })
                    } else if (this.activeName == 'third') {
                        this.getSYSTVISIT1ByIpDept({
                            tag: 3
                        })
                    }
                } else if (val === 'position') {
                    //定位
                    Evtbus.$emit('showIframe', true)
                    this.positionshow = true
                    // this.topMenuDiaTitle = '定位'
                    // this.customDiaWidth = '380px'
                    // this.topMenuComponentName = 'positionDia'
                    // this.topMenuDiaVis = true
                } else if (val === 'infoInput') {
                    //三测表
                    this.topMenuDiaTitle = '体温单'
                    this.customDiaWidth = '95%'
                    this.topMenuComponentName = 'infoInputDia'
                    this.topMenuDiaVis = true
                } else if (val == 'nursingpatrol') {
                    //护理巡视
                    this.topMenuDiaTitle = '护理巡视及患者睡眠记录单'
                    this.customDiaWidth = '95%'
                    this.topMenuComponentName = 'nursingPatrol'
                    this.topMenuDiaVis = true
                } else if (val == 'nursingpatrol2') { //护理巡视2
                    this.topMenuDiaTitle = '护理巡视及患者睡眠记录单2'
                    this.customDiaWidth = '95%'
                    this.topMenuComponentName = 'nursingPatrolSecode'
                    this.topMenuDiaVis = true
                }
                Evtbus.$emit('showIframe', true)
            },
            handletopMenuDiaData(val) {
                console.log(val)
                if (val.btnType == 'position') {
                    //定位
                    this.dwshow = val.close
                    if (val.query == 1) {
                        this.BenNo = val.cw
                        this.Visit_NO = val.hospitalNo
                        this.VName = val.name

                        if (this.activeName == 'first') {
                            this.getSYSTVISIT1ByIpDept({
                                tag: 1
                            })
                        } else if (this.activeName == 'second') {
                            this.getSYSTVISIT1ByIpDept({
                                tag: 2
                            })
                        } else if (this.activeName == 'third') {
                            this.getSYSTVISIT1ByIpDept({
                                tag: 3
                            })
                        }
                    } else {
                        Evtbus.$emit('showIframe', false)
                        this.positionshow = val.close
                    }
                }

            },
            handleCloseTopMeunDia() {
                this.topMenuDiaTitle = ''
                this.topMenuComponentName = ''
                this.topMenuDiaVis = false
            },
            handleclosetopMenuDiaData() {
                this.topMenuDiaTitle = ''
                this.topMenuComponentName = ''
                this.topMenuDiaVis = false
            },
            handleClick(tab, event) {
                this.BenNo = ''
                this.Visit_NO = ''
                this.VName = ''
                if (tab.paneName == 'first') {
                    //本科在院患者
                    this.hlType = 1
                    this.getSYSTVISIT1ByIpDept({
                        tag: 1
                    })
                    this.getSystbyzkCountLevel({
                        tag: 1
                    })
                    this.getSYS_T_VISIT_1ByIpDeptCountLevel() //患者总数
                } else if (tab.paneName == 'second') {
                    //转科未提交院患者
                    this.hlType = 2
                    this.getSYSTVISIT1ByIpDept({
                        tag: 2
                    })
                    this.getSystbyzkCountLevel({
                        tag: 2
                    })
                    this.getSYS_T_VISIT_1ByZKCountLevel() //患者总数
                } else {
                    //出院未送交院患者
                    this.hlType = 3
                    this.getSYSTVISIT1ByIpDept({
                        tag: 3
                    })
                    this.getSystbyzkCountLevel({
                        tag: 3
                    })
                    this.getSYS_T_VISIT_1ByCYCountLevel() //患者总数
                }
            }
            // handleShowPatient(val) {
            //   if (val == 'position') {
            //     //定位
            //     this.dwshow = true
            //   } else if (val == 'reflash') {
            //     this.BenNo = ''
            //     this.Visit_NO = ''
            //     this.VName = ''
            //     if (this.activeName == 'first') {
            //       this.getSYSTVISIT1ByIpDept({
            //         tag: 1
            //       })
            //     } else if (this.activeName == 'second') {
            //       this.getSYSTVISIT1ByIpDept({
            //         tag: 2
            //       })
            //     } else if (this.activeName == 'third') {
            //       this.getSYSTVISIT1ByIpDept({
            //         tag: 3
            //       })
            //     }
            //   }
            // }
        }
    }
</script>

<style lang="scss" scoped>
    .emergency-container {
        background-color: white;
        height: 100%;
        padding: 10px;

        .action-box {
            span {
                padding: 10px;
            }
        }

        .statis {
            span {
                padding: 0 10px;
            }
        }
    }

    /deep/.el-tabs__item {
        width: auto;
        text-align: center;
        font-size: 14px;
    }
</style>
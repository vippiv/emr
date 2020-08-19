<template>
    <div class="medicine-record-detail-container">
        <div class="top-imgbtn-box">
            <topImgBtn :btnshow='false' @actionSubEvent="handleSubEvent"></topImgBtn>
        </div>
        <el-container style="height:calc(100vh - 120px);margin-top:10px;padding:0px 10px;">
            <el-aside width="260px" style="background-color:white;">
                <el-tabs class="tab-self" v-model="activeName" type="card" @tab-click="handleClick">
                    <el-tab-pane label="病人列表" name="first">
                        <el-menu ref="patientList" default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
                            <el-submenu v-for="item in leftTree" :key="item.code" :index="item.code">
                                <template slot="title">
                                    <span>{{item.label}}</span>
                                </template>
                                <div v-if="item.children">
                                    <div v-for="subitem in item.children" :key="subitem.id">
                                        <el-menu-item :index="subitem.code" @dblclick.native="handleDbTree(subitem)">{{subitem.label}}</el-menu-item>
                                    </div>
                                </div>
                            </el-submenu>
                        </el-menu>
                    </el-tab-pane>
                    <el-tab-pane label="病人信息" name="second" ref="automatic">
                        <h1 class="caption">病历列表</h1>
                        <div class="desc">
                            <span>床号：{{bkcdVal.BED_NO}}</span>
                            <span>{{bkcdVal.PAT_NAME}}</span>
                            <span>{{bkcdVal.PAT_GENDER}}</span>
                            <span>{{bkcdVal.PATIENT_AGE}}</span>
                        </div>
                        <el-menu default-active="2" class="el-menu-vertical-demo">
                            <el-submenu v-for="item in rightTree" :key="item.id" :index="item.id">
                                <template slot="title">
                                    <!-- <span>{{item.label}}</span> -->
                                    <div :class="!item.children ? 'hiddenIcon' : ''"><span>{{item.label}}</span></div>
                                </template>
                                <div v-if="item.children">
                                    <div v-for="(subitem, subindex) in item.children" :key="subindex">
                                        <el-menu-item :index="subitem.code" @dblclick.native="handleShowThisData(subitem)">{{subitem.label}}</el-menu-item>
                                    </div>
                                </div>
                            </el-submenu>
                        </el-menu>
                    </el-tab-pane>
                </el-tabs>
            </el-aside>
            <el-main>
                <activeXHandler :nursingfilecode='nursingfilecode' :saveSheet='saveSheet'></activeXHandler>
                <div class="main-box">
                    <div class="main-imgbtn" style="height:calc(100vh - 165px);overflow-x:auto;">
                        <!-- <ckBtn icon="ck-icon-search" @click="handleClicFn">常用语</ckBtn>
    					<ckBtn icon="ck-icon-export" @click="handleReturn">返回</ckBtn> -->

                        <contentShow @getnursTreeData='getnursTreeData' style="overflow:auto;"></contentShow>
                    </div>
                    <div class="main-right">
                        <letNursTpl></letNursTpl>
                    </div>
                </div>
            </el-main>
        </el-container>
        <topMenuDia :title="topMenuDiaTitle" :dialogVisible="topMenuDiaVis" :diaWidth="customDiaWidth" @closeTopMeunDia="handleCloseTopMeunDia">
            <div slot="main">
                <component :is="topMenuComponentName" :patientInfo="tempPatientInfo" :dialogVisible="topMenuDiaVis" :inDoctor="inDoctor" :emergencyDoctor="emergencyDoctor"></component>
            </div>
        </topMenuDia>
        <nurseCYYDailog :showDialogModal="show" @closeModal="CloseModal" v-if="show"></nurseCYYDailog>
        <!-- 定位 -->
        <positionDia :positionshow='positionshow' @topMenuDiaData="handletopMenuDiaData" v-if="positionshow"></positionDia>
    </div>
</template>

<script type="text/javascript">
    import {
        mapState,
        createNamespacedHelpers
    } from 'vuex'
    import letNursTpl from '../components/letNursTpl.vue'
    import nurseCYYDailog from '../components/nurseCYYDailog.vue'
    import topImgBtn from '../components/topImgBtn'
    import topMenuDia from '../components/index'
    import positionDia from '../components/positionDia'
    import infoInputDia from '../components/infoInputDia'
    import contentShow from '../components/contentShow'
    import activeXHandler from './components/activeXHandler'
    import nursingPatrol from '../components/nursingPatrol'
    import nursingPatrolCopy from '../components/nursingPatrolCopy'
    import nursingPatrolSecode from '../components/nursingPatrolSecode'
    import Evtbus from '@/utils/bus'

    const {
        mapActions
    } = createNamespacedHelpers('residentNurse')

    export default {
        name: 'MedicineRecordDetail',
        components: {
            letNursTpl,
            nurseCYYDailog,
            topImgBtn,
            topMenuDia,
            positionDia,
            infoInputDia,
            contentShow,
            activeXHandler,
            nursingPatrol,
            nursingPatrolSecode,
            nursingPatrolCopy
        },
        provide() {
            return {
                self: this
            }
        },
        data() {
            return {
                saveSheet: '',
                nursingfilecode: '',
                positionshow: false,
                show: false,
                leftTree: [],
                leftTreeSon: [],
                rightTree: [],
                bkcdVal: {},
                activeName: 'second',
                patientID: this.$route.params.id,
                petientListIndex: '',
                topMenuDiaTitle: '',
                topMenuDiaVis: false,
                customDiaWidth: '',
                topMenuComponentName: '',
                tempPatientInfo: {},
                inDoctor: null, // 收录医师
                emergencyDoctor: null // 急诊医师
            }
        },
        computed: {
            ...mapState({
                activeXTab: state => state.residentNurse.activeXTab,
                patientInfo: state => state.residentNurse.patientInfo,
                dptId: state => state.global.deptID
            })
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.getSYS_T_VISIT_1ByVisitId(vm.$route.params.id)
                vm.nursegetUsersByGroup(vm.$route.params.id)
                vm.treeVisitFatherInfo()
            })
        },
        activated() {
            this.$store.dispatch('residentNurse/saveNurTemplateData', "{}")
            this.patientID = this.$route.params.id
        },
        mounted() {
            this.SAVE_MEDISION_RECORD_TAB([]) // 由于页面刷新不会导致vuex中数据丢失，因此这里要手动删除
            Evtbus.$on('updateMedisineRecordTree', () => {
                const _this = this
                this.nursegetUsersByGroup(this.$route.params.id)
            })
        },
        methods: {
            ...mapActions([
                'SAVE_MEDISION_RECORD_TAB',
                'NursegetUsersByGroup',
                'GetSYS_T_VISIT_1ByVisitId',
                'TreeVisitFatherInfo',
                'TreeVisitInfo'
            ]),
            getnursTreeData(val) {
                // console.log('9999', val)
                if (val.filePath.indexOf('//') > -1) { //左边边菜单树
                    this.nursingfilecode = val.id
                } else { //右边菜单树
                    this.nursingfilecode = ''
                }
                this.saveSheet = val.label
            },
            handleclosenewposition() { //定位

            },
            handleSubEvent(val) {
                if (val === 'reflash') {
                    // TODO 刷新页面
                    this.BenNo = ''
                    this.Visit_NO = ''
                    this.VName = ''
                    // if (this.activeName == 'first') {
                    //   this.getSYSTVISIT1ByIpDept({
                    //     tag: 1
                    //   })
                    // } else if (this.activeName == 'second') {
                    //   this.getSYSTVISIT1ByIpDept({
                    //     tag: 2
                    //   })
                    // } else if (this.activeName == 'third') {
                    //   this.getSYSTVISIT1ByIpDept({
                    //     tag: 3
                    //   })
                    // }
                } else if (val === 'position') {
                    //定位
                    Evtbus.$emit('showIframe', true)
                    this.positionshow = true
                    // Evtbus.$emit('showIframe', true)
                    // this.topMenuDiaTitle = '定位'
                    // this.customDiaWidth = '380px'
                    // this.topMenuComponentName = 'positionDia'
                    // this.topMenuDiaVis = true
                } else if (val === 'infoInput') {
                    //三测表
                    Evtbus.$emit('showIframe', true)
                    this.topMenuDiaTitle = '体温单'
                    this.customDiaWidth = '95%'
                    this.topMenuComponentName = 'infoInputDia'
                    this.$nextTick(() => {
                        this.topMenuDiaVis = true
                    })
                } else if (val == 'nursingpatrol') {
                    //护理巡视
                    Evtbus.$emit('showIframe', true)
                    this.topMenuDiaTitle = '护理巡视及患者睡眠记录单'
                    this.customDiaWidth = '95%'
                    // this.topMenuComponentName = 'nursingPatrol'
                    this.topMenuComponentName = 'nursingPatrolCopy'
                    setTimeout(() => {
                        this.topMenuDiaVis = true
                    }, 1000)
                } else if (val == 'nursingpatrol2') {
                    Evtbus.$emit('showIframe', true)
                    this.topMenuDiaTitle = '护理巡视及患者睡眠记录单2'
                    this.customDiaWidth = '95%'
                    this.topMenuComponentName = 'nursingPatrolSecode'
                    setTimeout(() => {
                        this.topMenuDiaVis = true
                    }, 1000)
                } else if (val == 'returnback') { //退出
                    this.$router.push({
                        path: '/nurse'
                    }).catch(err => {
                        console.log('输出报错', err)
                    })
                }
            },
            nursegetUsersByGroup(val) {
                //根据id获取病人信息
                let data = {
                    VistID: val
                }
                this.NursegetUsersByGroup(data).then(res => {
                    if (res.code == 1) {
                        this.rightTree = res.values
                    }
                })
            },
            treeVisitFatherInfo() {
                //获取病人父节点
                let data = {
                    deptid: this.dptId
                }
                this.TreeVisitFatherInfo(data).then(res => {
                    if (res.code == 1) {
                        this.leftTree = res.values
                    }
                })
            },
            treeVisitInfo(val) {
                //获取病人子节点
                let data = {
                    id: this.dptId,
                    code: val
                }
                this.TreeVisitInfo(data).then(res => {
                    if (res.code == 1) {
                        this.leftTree.forEach(item => {
                            if (val == item.code) {
                                item.children = res.values
                            }
                        })
                    }
                })
            },
            getSYS_T_VISIT_1ByVisitId(val) {
                let data = {
                    visitId: val
                }
                this.GetSYS_T_VISIT_1ByVisitId(data).then(res => {
                    if (res.code == 1) {
                        this.bkcdVal = res.values[0]
                    }
                })
            },
            handleReturn() {
                //返回
                this.$router.push({
                    name: 'nurseEmergency'
                })
            },
            CloseModal() {
                this.show = false
            },
            handleClicFn() {
                //常用语
                this.show = true
            },
            handleShowPatient(val) {},
            handleClick(tab, event) {
                if (tab.paneName == 'first') {
                    //病人列表
                    this.$refs.patientList.close(this.petientListIndex)
                    this.treeVisitFatherInfo()
                } else {
                    //病人信息
                    this.getSYS_T_VISIT_1ByVisitId(this.patientID)
                }
            },
            // 打开odt文档
            handleShowThisData(obj) {
                // this.SAVE_MEDISINE_OPERATION_DOC(obj) // 记录当前操作项      
                if (this.activeXTab.length > 0) {
                    if (this.patientInfo.id === this.activeXTab[0].patientID) {
                        this.$nextTick(() => {
                            Evtbus.$emit('InsertActiveXTab', obj)
                        })
                    } else {
                        this.$confirm('您已切换病人，打开病人文件需要关闭当前文件，是否需要保存当前文件？', '提示', {
                            confirmButtonText: '是',
                            cancelButtonText: '否',
                            type: 'warning'
                        }).then(() => {
                            // 执行关闭已有窗口，然后重新打开
                            Evtbus.$emit('OutActiveXTab')
                            this.$nextTick(() => {
                                Evtbus.$emit('InsertActiveXTab', obj)
                            })
                        })
                    }
                } else {
                    this.$nextTick(() => {
                        Evtbus.$emit('InsertActiveXTab', obj)
                    })
                }
            },
            handleCloseTopMeunDia() {
                Evtbus.$emit('showIframe', false)
                this.topMenuDiaTitle = ''
                this.topMenuComponentName = ''
                this.topMenuDiaVis = false
            },
            handletopMenuDiaData(val) {
                if (val.btnType == 'position') {
                    //定位
                    this.dwshow = val.close
                    if (val.query == 1) {
                        this.BenNo = val.cw
                        this.Visit_NO = val.hospitalNo
                        this.VName = val.name

                        // if (this.activeName == 'first') {
                        //   this.getSYSTVISIT1ByIpDept({
                        //     tag: 1
                        //   })
                        // } else if (this.activeName == 'second') {
                        //   this.getSYSTVISIT1ByIpDept({
                        //     tag: 2
                        //   })
                        // } else if (this.activeName == 'third') {
                        //   this.getSYSTVISIT1ByIpDept({
                        //     tag: 3
                        //   })
                        // }
                    }
                }
                Evtbus.$emit('showIframe', false)
                this.positionshow = val.close
                this.topMenuDiaVis = false
            },
            handleOpen(key, keyPath) {
                //病人列表-左菜单点击
                this.petientListIndex = key
                this.treeVisitInfo(key)
            },
            handleClose(key, keyPath) {
                //病人列表-左菜单点击
            },
            handleDbTree(val) {
                this.patientID = val.id
                this.activeName = 'second'
                this.getSYS_T_VISIT_1ByVisitId(val.id)
                this.nursegetUsersByGroup(val.id)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .medicine-record-detail-container {
        height: 100%;
        background-color: #F3F6FB;
        user-select: none;

        .caption {
            font-size: 16px;
            background: #3CBCD3;
            line-height: 1.8;
            color: white;
            text-align: center;
            letter-spacing: 5px;
        }

        .desc {
            line-height: 2;
            text-align: center;

            span {
                padding-right: 5px;
            }
        }

        .el-menu-vertical-demo {
            height: calc(100vh - 240px);
            overflow-y: auto;
        }

        .main-box {
            padding-top: 0px;
            padding-right: 0px;
            display: flex;

            .main-imgbtn {
                flex: 1;
            }

            .main-right {
                background-color: white;
                overflow: hidden;
                flex: 0 0 300px;
            }
        }

        .top-imgbtn-box {
            height: 55px;
            background-color: white;
            line-height: 5.8;
            padding-left: 10px;
        }
    }

    /deep/.el-main {
        padding: 0px 0px 0px 15px;
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

    /deep/.el-menu-item,
    /deep/.el-submenu__title {
        height: 46px;
        line-height: 46px;
    }

    /deep/ .hiddenIcon+.el-submenu__icon-arrow {
        display: none;
    }
</style>
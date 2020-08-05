<template>
    <div class="patientList-container">
        <div class="statis">
            <span>患者总数：{{patientTotal}}</span>
            <span>三级护理：{{nurseThree}}</span>
            <span>二级护理：{{nurseTwo}}</span>
            <span>一级护理：{{nurseOne}}</span>
            <span>显示模式</span>
            <el-select v-model="value" size="mini" placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
        </div>
        <div class="medica-records pagoverscroll" v-if="bkstaus">
            <div class="item" v-for="item in personDatas" :key="item.VISIT_ID" @dblclick="handleRedirectDetail(item)">
                <div class="item-detail">
                    <div class="item-font">{{item.PAT_NAME.substr(0,1)}}</div>
                    <div>
                        <p>床号：{{item.BED_NO}}</p>
                        <p>姓名：{{item.PAT_NAME}}</p>
                        <p>年龄：{{item.PATIENT_AGE}}</p>
                        <p>住院号：{{item.VISIT_NO}}</p>
                    </div>
                </div>
                <div class="item-detail-bottom">
                    <p>病情：{{item.ADM_ILLNESS}}</p>
                    <p>诊断：</p>
                    <p>入院日期：{{item.ADM_DATE}}</p>
                    <p>住院医师：{{item.INHOSNAME}}</p>
                </div>
            </div>
        </div>
        <div class="pagoverscroll" v-else>
            <el-table :data="personDatas" border style="width: 100%;" height="600" size="mini" highlight-current-row @row-dblclick="handleBkTable">
                <el-table-column prop="DOCTOR_PART_STATUS" label="状态" align="center"></el-table-column>
                <el-table-column prop="DEPT_NAME_CN" label="所在科室" align="center" width="130"></el-table-column>
                <el-table-column prop="IP_VISIT_STATUS" label="住院就诊状态" align="center" width="130"></el-table-column>
                <el-table-column prop="VISIT_NO" label="住院号" align="center" width="110"></el-table-column>
                <el-table-column prop="PAT_NAME" label="姓名" align="center"></el-table-column>
                <el-table-column prop="PAT_GENDER" label="性别" align="center"></el-table-column>
                <el-table-column prop="IN_TIMES" label="次" align="center"></el-table-column>
                <el-table-column label="入院日期" align="center" width="130">
                    <template v-slot="scope">{{scope.row.ADM_DATE|dateYMDHMSFormat}}</template>
                </el-table-column>
                <el-table-column prop="PATIENT_AGE" label="年龄" align="center"></el-table-column>
                <el-table-column label="出院日期" align="center">
                    <template v-slot="scope">{{scope.row.DISCHARGE_DATE|dateYMDHMSFormat}}</template>
                </el-table-column>
                <el-table-column prop="BED_NO" label="床号" align="center"></el-table-column>
                <el-table-column prop="INHOSNAME" label="住院医生" align="center"></el-table-column>
                <el-table-column prop="MAINNAME" label="主治医师" align="center"></el-table-column>
                <el-table-column prop="CHIEFNAME" label="主任医师" align="center"></el-table-column>
                <el-table-column prop="ADM_DAY" label="住院日" align="center"></el-table-column>
                <el-table-column label="确诊日期" align="center">
                    <template v-slot="scope">{{scope.row.CONFIRM_DATE|dateYMDHMSFormat}}</template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <div style="background-color:white;height:45px;display:flex;align-items:center;justify-content:flex-end;">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="paginationInfo.currentPage" :page-sizes="paginationInfo.pageSizes" :page-size="paginationInfo.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="paginationInfo.total"></el-pagination>
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">
    import {
        createNamespacedHelpers
    } from 'vuex'
    import moment from 'moment'
    const {
        mapActions
    } = createNamespacedHelpers('residentNurse')
    export default {
        name: 'PatientList',
        props: ['personDatas', 'nurseThree', 'nurseTwo', 'nurseOne', 'patientTotal', 'paginationInfo'],
        data() {
            return {
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
                bkTotal: 0, //本科在院患者总数
                wzkTotal: 0, //转科未提交患者总数
                cyTotal: 0, //出院未送交病历总数
                value: '1',
                personData: [], //本科在院患者数据
                bkpersonData: [],
                hlType: 1,
                hltotal: {} //护理数据
            }
        },
        watch: {
            value: {
                handler: function(newval, oldval) {
                    console.log(newval)
                    console.log(oldval)
                    if (this.activeName == 'first') {
                        if (newval == '1') {
                            //卡片
                            this.bkstaus = true
                        } else {
                            //列表
                            this.bkstaus = false
                        }
                    }
                },
                immediate: true
            }
        },
        filters: {
            dateYMDHMSFormat(val) {
                let value
                if (val) {
                    value = moment(val).format('YYYY-MM-DD')
                } else {
                    value = ''
                }
                return value
            }
        },
        methods: {
            ...mapActions([
                'GET_SYST_VISIT1_BY_IPDEPT'
            ]),
            handleBkTable(row) {
                //双击本科在院table
                this.$router.push({
                    name: 'emergencyRecordDetail',
                    params: {
                        id: row.VISIT_ID
                    }
                })
            },
            handleSizeChange(val) {
                this.$emit('_handleSizeChange', val)
            },
            handleCurrentChange(val) {
                this.$emit('_handleCurrentChange', val)
            },
            handleRedirectDetail(row) {
                // console.log(row)
                this.$router.push({
                    name: 'emergencyRecordDetail',
                    params: {
                        id: row.VISIT_ID
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .patientList-container {
        .statis {
            span {
                padding: 0 10px;
            }
        }

        .medica-records {
            padding: 0px 15px 15px 15px;

            .item {
                float: left;
                margin-top: 1rem;
                width: auto;
                margin-right: 15px;
                border: 1px solid #fcfcfc;
                box-shadow: 0 0 8px 0px rgba(117, 119, 122, 0.2);
                cursor: pointer;

                &:hover {
                    border-color: #24B4CE;
                    box-shadow: 0 0 5px gray;
                }
            }

            & p {
                line-height: 1.6;
            }

            .item-detail {
                display: flex;
                align-items: center;
                padding: 5px;
                height: 100px;
            }

            .item-detail-bottom {
                padding: 5px 10px;
                border-top: 1px solid #eeeeee;
                height: 106px;
            }

            .item-font {
                background-color: #44b3c7;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                line-height: 50px;
                text-align: center;
                color: #fff;
                font-size: 21px;
                font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular;
                font-weight: bold;
                margin: 25px;
            }

        }

        .pagoverscroll {
            height: calc(100vh - 200px);
            overflow-y: auto;
        }
    }
</style>
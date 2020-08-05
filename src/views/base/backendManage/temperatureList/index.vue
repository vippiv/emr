<template>
    <div class="temperature-list" style="background:white;">
        <!-- <h1 class="ck-subnav-caption">体温单配置</h1> -->
        <div class="btn">
            <el-button @click="handleAdd" type="primary" size="small" :disabled="isadd">新增</el-button>
            <el-button @click="deltemperature" type="primary" size="small" :disabled="isremove">移出</el-button>
            <el-button @click="saveTemp" type="primary" size="small">确定</el-button>
        </div>
        <el-row>
            <el-col :span="6">
                <div style="margin-bottom:5px;">选定的列：</div>
                <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
                    <el-tab-pane label="体温单排序" name="first">
                        <ul class="ulsort">
                            <li :class="[item.flag?'bgclass':'']" @click="handleitem(item)" v-for="item of syData" :key="item.Code">{{item.Name}}</li>
                        </ul>
                    </el-tab-pane>
                    <el-tab-pane label="录入排序" name="second">
                        <ul class="ul">
                            <li :class="[item.flag?'bgclass':'']" @click="handleitemSort(item)" @dblclick="shishiClick(item)" v-for="item of syDataSort" :key="item.Code">{{item.Name}}</li>
                        </ul>
                    </el-tab-pane>
                </el-tabs>
            </el-col>
            <el-col :span="2">
                <div style="margin-top:100px;margin-left:30px;">
                    <div style>
                        <el-button @click="moveup" type="primary" size="small">向上</el-button>
                    </div>
                    <div style="margin-top:60px;">
                        <el-button @click="movedown" type="primary" size="small">向下</el-button>
                    </div>
                </div>
            </el-col>
            <el-col :span="16">
                <div></div>
                <el-form class="formbox" ref="form" :model="form" label-width="100px" size="small">
                    <el-form-item label="列属性："></el-form-item>
                    <el-form-item class="item-top">
                        <el-checkbox v-model="form.checkedsee" label="可见性" name="type" :disabled="istype"></el-checkbox>
                    </el-form-item>
                    <el-form-item label="列宽：" class="item-top">
                        <el-input v-model="form.cwidth" style="width:260px;" :disabled="iscname"></el-input>
                    </el-form-item>
                    <el-form-item label="列名：" class="item-top">
                        <el-input v-model="form.cname" style="width:260px;" :disabled="iscwidth"></el-input>
                    </el-form-item>
                    <el-form-item label="名称：" class="item-top">
                        <el-input v-model="form.name" style="width:260px;" :disabled="isname"></el-input>
                    </el-form-item>
                    <el-form-item class="item-top">
                        <el-checkbox v-model="form.ismg" label="是否分上下午" name="type" :disabled="isismg"></el-checkbox>
                    </el-form-item>
                    <el-form-item label="列名(上)：" class="item-top">
                        <el-input v-model="form.cnames" style="width:260px;" :disabled="istop"></el-input>
                    </el-form-item>
                    <el-form-item label="名称(下)：" class="item-top">
                        <el-input v-model="form.namex" style="width:260px;" :disabled="isbot"></el-input>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <!-- 新增弹窗 -->
        <temperatureListDailog :show.sync="show" v-if="show" @handlefresh="handlefresh"></temperatureListDailog>
        <!-- 体温单录入弹窗 -->
        <temperatureListLrDailog :lrshow.sync="lrshow" :currentData="currentlrData" v-if="lrshow" @handlefreshLr="handlefresh"></temperatureListLrDailog>
    </div>
</template>
<script>
    import {
        mapActions
    } from 'vuex'
    import temperatureListDailog from '@/views/base/backendManage/temperatureList/temperatureListDailog'
    import temperatureListLrDailog from '@/views/base/backendManage/temperatureList/temperatureListLrDailog'
    export default {
        name: 'temperatureList',
        components: {
            temperatureListDailog,
            temperatureListLrDailog
        },
        data() {
            return {
                isadd: false,
                isremove: false,
                show: false,
                lrshow: false,
                activeName: 'first',
                form: {
                    cwidth: '', // 列宽
                    cname: '', // 列名
                    name: '', // 名称
                    cnames: '', // 列名(上)
                    namex: '', // 名称(下)
                    checkedsee: false, // 可见性
                    ismg: false // 是否分上下午
                },
                tapType: 0,
                chooseId: '',
                istype: false,
                iscname: false,
                iscwidth: false,
                isname: false,
                isismg: false,
                istop: false,
                isbot: false,
                syData: [],
                afterSyData: [],
                syDataSort: [],
                afterSyDataSort: [],
                dataIndex: 0,
                dataIndexsort: 0,
                issyData: [],
                issyDataSort: [],
                currenttwdData: null,
                currentlrData: []
            }
        },
        watch: {
            'form.ismg': {
                handler(val) {
                    this.istop = !val
                    this.isbot = !val
                },
                deep: true // 深度监听
            }
        },
        created() {
            this.getThermometerList()
            this.getThermometerEntryInfo()
        },
        mounted() {},
        methods: {
            ...mapActions([
                'GetThermometerList',
                'GetThermometerEntryInfo',
                'TitemsInfoDelete',
                'SaveThermometer',
                'GetTTitemsInfo'
            ]),
            shishiClick(val) {
                // console.log(val)
                this.getTTitemsInfo(val.Code)
            },
            getThermometerList() {
                // 获取体温单排序
                this.GetThermometerList().then(res => {
                    if (res.code == 1) {
                        this.syData = JSON.parse(JSON.stringify(res.values2))
                        this.afterSyData = JSON.parse(JSON.stringify(res.values2))
                    }
                })
            },
            getThermometerEntryInfo() {
                // 获取录入排序
                this.GetThermometerEntryInfo().then(res => {
                    if (res.code == 1) {
                        this.syDataSort = JSON.parse(JSON.stringify(res.values2))
                        this.afterSyDataSort = JSON.parse(JSON.stringify(res.values2))
                    }
                })
            },
            moveup() {
                // 向上移动
                if (this.tapType == 0) {
                    // 体温单上移
                    // index 是索引位置
                    if (this.issyData.length == 0) {
                        this.$message({
                            type: 'warning',
                            message: '请选择要移动的列！'
                        })
                        return null
                    }
                    const index = this.dataIndex
                    const tempOption = this.syData[index - 1]
                    if (this.dataIndex == 0) {
                        this.$message({
                            type: 'warning',
                            message: '已置顶'
                        })
                        return null
                    }
                    this.$set(this.syData, index - 1, this.syData[index])
                    this.$set(this.syData, index, tempOption)
                    this.dataIndex--
                } else {
                    // 录入排序上移
                    if (this.issyDataSort.length == 0) {
                        this.$message({
                            type: 'warning',
                            message: '请选择要移动的列！'
                        })
                        return null
                    }
                    const index = this.dataIndexsort
                    const tempOption = this.syDataSort[index - 1]
                    if (this.dataIndexsort == 0) {
                        this.$message({
                            type: 'warning',
                            message: '已置顶'
                        })
                        return null
                    }
                    this.$set(this.syDataSort, index - 1, this.syDataSort[index])
                    this.$set(this.syDataSort, index, tempOption)
                    this.dataIndexsort--
                }
                this.afterSyData = JSON.parse(JSON.stringify(this.syData))
                this.afterSyDataSort = JSON.parse(JSON.stringify(this.syDataSort))
            },
            movedown() {
                // 向下移动
                if (this.tapType == 0) {
                    // 体温单下移
                    if (this.issyData.length == 0) {
                        this.$message({
                            type: 'warning',
                            message: '请选择要移动的列！'
                        })
                        return null
                    }
                    const index = this.dataIndex
                    const tempOption = this.syData[index + 1]
                    if (this.dataIndex - this.syData.length == -1) {
                        this.$message({
                            type: 'warning',
                            message: '已置底'
                        })
                        return null
                    }
                    this.$set(this.syData, index + 1, this.syData[index])
                    this.$set(this.syData, index, tempOption)
                    this.dataIndex++
                } else {
                    // 录入单下移
                    if (this.issyDataSort.length == 0) {
                        this.$message({
                            type: 'warning',
                            message: '请选择要移动的列！'
                        })
                        return null
                    }
                    const index = this.dataIndexsort
                    const tempOption = this.syDataSort[index + 1]
                    if (this.dataIndexsort - this.syDataSort.length == -1) {
                        this.$message({
                            type: 'warning',
                            message: '已置底'
                        })
                        return null
                    }
                    this.$set(this.syDataSort, index + 1, this.syDataSort[index])
                    this.$set(this.syDataSort, index, tempOption)
                    this.dataIndexsort++
                }
                this.afterSyData = JSON.parse(JSON.stringify(this.syData))
                this.afterSyDataSort = JSON.parse(JSON.stringify(this.syDataSort))
            },
            handleAdd() {
                // 添加
                this.show = true
            },
            handleClick(tab, event) {
                // console.log(tab.index)
                this.tapType = tab.index
                if (tab.index == 0) {
                    // 体温单排序
                    this.isadd = false
                    this.isremove = false
                    this.istype = false
                    this.iscname = false
                    this.iscwidth = false
                    this.isname = false
                    this.isismg = false
                    this.istop = false
                    this.isbot = false
                } else {
                    // 录入排序
                    this.isadd = true
                    this.isremove = true
                    this.istype = true
                    this.iscname = true
                    this.iscwidth = true
                    this.isname = true
                    this.isismg = true
                    this.istop = true
                    this.isbot = true
                }
            },
            setData(val) {
                this.form.cwidth = val.TWDIndex // 列宽
                this.form.cname = val.Code // 列名
                this.form.name = val.Name // 名称
                this.form.cnames = val.Morningcode // 列名(上)
                this.form.namex = val.Afternooncode // 名称(下)
                this.form.checkedsee = val.Visible == 1 // 可见性
                this.form.ismg = val.Isline == 1 // 是否分上下午
            },
            handleitem(val) {
                // 填充数据
                this.setData(val)
                this.currenttwdData = val
                this.issyData.push(val)
                this.dataIndex = this.getArrayIndex(this.syData, val)
                // 点击每个li
                const newSysData = []
                this.syData.forEach(el => {
                    el.flag = false
                    newSysData.push(el)
                })
                newSysData.forEach(element => {
                    if (element == val) {
                        element.flag = true
                    }
                })
                this.syData = newSysData
            },
            getArrayIndex(arr, obj) {
                // 获取数组元素的下标
                let i = arr.length
                while (i--) {
                    if (arr[i] === obj) {
                        return i
                    }
                }
                return -1
            },
            handleitemSort(val) {
                // 点击每个li
                this.issyDataSort.push(val)
                this.dataIndexsort = this.getArrayIndex(this.syDataSort, val)
                const newSysDataSort = []
                this.syDataSort.forEach(el => {
                    el.flag = false
                    newSysDataSort.push(el)
                })
                newSysDataSort.forEach(element => {
                    if (element == val) {
                        element.flag = true
                    }
                })
                this.syDataSort = newSysDataSort
            },
            deltemperature() {
                // 移出
                if (!this.currenttwdData) {
                    this.$message.warning('请选择要删除的数据！')
                    return
                }
                console.log(this.currenttwdData)
                const param = {
                    code: this.currenttwdData.Code
                }
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    })
                    .then(() => {
                        this.TitemsInfoDelete(param).then(res => {
                            if (res.code == 1) {
                                this.getThermometerList()
                                this.$message.success(res.msg)
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
            handlefresh() {
                // 刷新
                this.getThermometerList()
            },
            saveTemp() {
                // 保存
                if (this.tapType == 0) {
                    //体温单排序
                    let syDataFlag = this.syData.some(item => item.flag)
                    if (!syDataFlag) {
                        this.$message.warning('请选择列!')
                        return
                    }
                } else {
                    let syDataSortFlag = this.syDataSort.some(item => item.flag)
                    if (!syDataSortFlag) {
                        this.$message.warning('请选择列!')
                        return
                    }
                }
                const param = {
                    type: this.tapType, // 0：更新体温单；1：录入
                    lvColumnsnames: this.afterSyData, // 操作后的体温单List
                    Select: this.syData, // 操作前的体温单List
                    txtNames: this.form.name, // 名称
                    textBox1: this.form.cname, // 列名
                    ckVisibles: this.form.checkedsee ? 1 : 0, // 可见性
                    ckLine: this.form.ismg ? 1 : 0, // 是否分上下午
                    txtMorningss: this.form.cnames, // 列名上
                    txtAfternoonss: this.form.namex, // 列名下
                    lstRls: this.afterSyDataSort, // 操作后的录入List
                    Select1: this.syDataSort // 操作前的录入List
                }
                console.log(JSON.stringify(param))
                this.SaveThermometer(param).then(res => {
                    if (res.code == 1) {
                        this.$message.success(res.msg)
                        if (this.tapType == 0) { //体温单排序
                            this.getThermometerList()
                        } else {
                            this.getThermometerEntryInfo()
                        }
                    } else if (res.code == 2) {
                        this.$message.warning(res.msg)
                    }
                })
            },
            getTTitemsInfo(val) {
                let data = {
                    code: val
                }
                // console.log(data)
                this.GetTTitemsInfo(data).then(res => {
                    console.log(res)
                    if (res.code == 1) {
                        if (res.values.length > 0) {
                            this.currentlrData = res.values
                            this.lrshow = true
                        }
                    }
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
    .temperature-list {
        height: 100%;

        .ul,
        .ulsort {
            height: calc(100vh - 280px);
            overflow-y: auto;
        }

        .ul>li,
        .ulsort>li {
            height: 30px;
            line-height: 30px;
            padding-left: 15px;
        }

        .bgclass {
            background-color: #00838f;
            color: white;
        }

        .btn {
            margin-bottom: 20px;
        }

        .item-top {
            margin-top: 25px;
        }

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
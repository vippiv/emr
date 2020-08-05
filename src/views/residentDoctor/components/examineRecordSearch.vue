<!-- 检验记录查询 -->
<template>
    <div class="examine-recordSearch-container">
        <ckImgBtn icon="ck-imgicon-search" @click="handleClicFn">查询</ckImgBtn>
        <ckBtn icon="ck-icon-export" @click="handleClicFn">导出EXCEL</ckBtn>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="检验项目">
                <el-select v-model="formInline.region" size="mini">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="检查时间">
                <el-col :span="11">
                    <el-date-picker type="date" placeholder="选择日期" v-model="formInline.date1" style="width: 100%;" size="mini"></el-date-picker>
                </el-col>
                <el-col class="line" :span="2" style="text-align:center">-</el-col>
                <el-col :span="11">
                    <el-date-picker type="date" placeholder="选择日期" v-model="formInline.date2" style="width: 100%;" size="mini"></el-date-picker>
                </el-col>
            </el-form-item>
            <el-form-item label="检验类型">
                <el-select v-model="formInline.regionType" size="mini">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <el-main>
        </el-main>
    </div>
</template>

<script type="text/javascript">
    export default {
        name: 'examineRecordSearch',
        data() {
            return {
                formInline: {
                    region: '',
                    regionType: '',
                    date1: '',
                    date2: ''
                },
                options1: [{
                    value: '选项5',
                    label: '呼吸道感染病原体'
                }, {
                    value: '选项6',
                    label: '血清胰岛素测定'
                }],
                options: [{
                    value: '选项1',
                    label: '肺炎支原体抗体IgM'
                }, {
                    value: '选项2',
                    label: '肺炎支原体抗体IgG'
                }, {
                    value: '选项3',
                    label: '视黄醇结合蛋白'
                }, {
                    value: '选项4',
                    label: '胰岛素'
                }]
            }
        },
        methods: {
            handleClicFn() {}
        }
    }
</script>

<style lang="scss" scoped>
    .gen {
        margin: 10px 0
    }

    .el-main {
        border: 1px solid #000;
        width: auto;
        height: 500px;
    }
</style>
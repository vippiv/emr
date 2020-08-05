<!-- 病人查询 -->
<template>
    <div class="patientSearch-container">
        <ckImgBtn icon="ck-imgicon-search" @click="handleClicFn">查询</ckImgBtn>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="病人ID:">
                <el-input size="mini" v-model="formInline.patientId" style="width:79%"></el-input>
            </el-form-item>
            <el-form-item label="病人姓名:">
                <el-input size="mini" v-model="formInline.patientName" style="width:79%"></el-input>
            </el-form-item>
        </el-form>
        <el-row>
            <el-table border :data="tableData" style="width: 100%">
                <el-table-column prop="date" label="状态">
                </el-table-column>
                <el-table-column prop="id" label="病人ID">
                </el-table-column>
                <el-table-column prop="name" label="病人姓名">
                </el-table-column>
                <el-table-column prop="sex" label="姓别">
                </el-table-column>
                <el-table-column prop="old" label="年龄">
                </el-table-column>
                <el-table-column prop="sty" label="病人状态">
                </el-table-column>
                <el-table-column prop="room" label="所在科室">
                </el-table-column>
                <el-table-column prop="doctor" label="住院医生">
                </el-table-column>
            </el-table>
        </el-row>
    </div>
</template>

<script type="text/javascript">
    export default {
        name: 'patientSearch',
        data() {
            return {
                tableData: [],
                formInline: {
                    patientId: '',
                    patientName: ''
                }
            }
        },
        methods: {
            handleClicFn() {

            }
        }
    }
</script>

<style lang="scss" scoped>
    .demo-form-inline {
        margin: 10px 0;
    }
</style>
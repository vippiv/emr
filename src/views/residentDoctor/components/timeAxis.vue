<!-- 时间轴 -->
<template>
    <div class="timeAxis-container">
        <ckImgBtn icon="ck-imgicon-search" @click="handleClicFn">查询</ckImgBtn>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="显示起始日期:">
                <el-date-picker type="date" v-model="formInline.date1" size="mini"></el-date-picker>
            </el-form-item>
            <el-form-item label="入院日期:">
                <el-input style="width:36%" size="mini"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script type="text/javascript">
    export default {
        name: 'timeAxis',
        data() {
            return {
                formInline: {
                    date1: ''
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
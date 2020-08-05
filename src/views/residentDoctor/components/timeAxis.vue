<!-- 时间轴 -->
<template>
    <div class="timeAxis-container">
        <div class="imgBtnBox">
            <ckImgBtn class="imgBtn-item" icon="ck-imgicon-search" @click="handleClicFn">查询</ckImgBtn>
        </div>
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

    .imgBtnBox {
        margin-bottom: -9px;
        margin-top: -15px;

        .imgBtn-item {
            display: inline-flex;
            justify-content: space-evenly;
            line-height: 2.7;
        }
    }

    /deep/.img-btn>span {
        min-width: 34px !important;

        &:nth-child(1) {
            margin-right: 3px;
        }

        &:nth-child(2) {
            margin-right: 10px;
        }
    }
</style>
<!-- 确诊诊断 -->
<template>
    <div class="definiteDiagnosis-container">
        <div class="imgBtnBox">
            <ckImgBtn class="imgBtn-item" icon="ck-imgicon-import" @click="handleClicFn">确定</ckImgBtn>
        </div>
        <el-row class="gen">
            <el-col :span="11" :offset="6">
                确定诊断:
                <el-input size="mini" style="width:49%;"></el-input>
            </el-col>
        </el-row>
        <!-- <el-form :model="form">
            <el-form-item label="确定诊断:">
                <div class='input' contenteditable></div>
            </el-form-item>

        </el-form> -->
        <el-row>
            <el-col :span="11" :offset="6">
                <div class="demo-input-suffix">
                    确诊日期:
                    <el-date-picker type="date" v-model="date1" size="mini"></el-date-picker>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <p>请填写3日未确诊原因:</p>
            <div class="main">
                <el-input type="textarea" :rows="8" v-model="textarea"></el-input>
            </div>
        </el-row>
    </div>
</template>

<script type="text/javascript">
    export default {
        name: 'definiteDiagnosis',
        data() {
            return {
                date1: '',
                textarea: ''
            }
        },
        methods: {
            handleClicFn() {

            }
        }
    }
</script>

<style lang="scss" scoped>
    // .input {
    //     width: 200px;
    //     height: 24px;
    //     line-height: 24px;
    //     font-size: 14px;
    //     padding: 5px 8px;
    //     border: 1px solid #ddd;
    // }

    .gen {
        margin: 10px 0
    }

    .main {
        border: 1px solid #ccc;
        width: auto;
        height: auto;
        background-color: rgb(240, 240, 240);
        box-shadow: -1px -1px 0px 0px;
    }

    /deep/textarea {
        border: none;
        resize: none;
    }

    .imgBtnBox {
        margin-bottom: -6px;
        margin-top: -13px;

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
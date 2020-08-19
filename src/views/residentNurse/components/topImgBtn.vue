<template>
    <div class="top-img-btn">
        <div class="action-box imgBtnBox">
            <ckImgBtn v-if="btnshow" class="imgBtn-item" icon="ck-imgicon-reflesh" @click="handleShowPatient('reflash')">刷新</ckImgBtn>
            <ckImgBtn v-if="btnshow" class="imgBtn-item" icon="ck-imgicon-position" @click="handleShowPatient('position')">定位【F1】</ckImgBtn>
            <ckImgBtn class="imgBtn-item" icon="ck-imgicon-infoInput" @click="handleShowPatient('infoInput')">三测表信息批量录入</ckImgBtn>
            <ckImgBtn class="imgBtn-item" icon="ck-imgicon-nursingpatrol" @click="handleShowPatient('nursingpatrol')">护理巡视</ckImgBtn>
            <ckImgBtn class="imgBtn-item" icon="ck-imgicon-nursingpatrol" @click="handleShowPatient('nursingpatrol2')">护理巡视2</ckImgBtn>
            <ckImgBtn class="imgBtn-item" icon="ck-imgicon-lifesigns" @click="handleShowPatient('lifesigns')">生命体征</ckImgBtn>
            <ckImgBtn class="imgBtn-item" icon="ck-imgicon-consultationarrange" @click="handleShowPatient('consultation')">会诊安排</ckImgBtn>
             <ckImgBtn class="imgBtn-item" icon="ck-imgicon-export" @click="handleShowPatient('returnback')">退出</ckImgBtn>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'topImgBtn',
        props:{
            btnshow:{
                type:Boolean,
                default:false
            }
        },
        data() {
            return {
                dwshow: false
            }
        },
        created() {},
        methods: {
            handleShowPatient(val) {
                this.$emit('actionSubEvent', val)
            }
        }
    }
</script>
<style lang="scss" scoped>
    .imgBtnBox {
        margin-bottom: 10px;

        .imgBtn-item {
            display: inline-flex;
            justify-content: space-evenly;
            line-height: 2.6;
        }
    }

    /deep/.img-btn>span {
        min-width: 34px !important;

        &:nth-child(1) {
            min-width: 34px !important;
            margin-right: 8px;
        }

        &:nth-child(2) {
            margin-right: 10px;
        }
    }
</style>
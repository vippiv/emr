<!-- 图库管理 -->
<template>
    <div class="sub-images-manage-container">
        <div class="imgBtnBox">
            <ckImgBtn class="imgBtn-item" icon="ck-imgicon-save" @click="handlesave">保存</ckImgBtn>
            <ckImgBtn class="imgBtn-item" icon="ck-imgicon-print" @click="handleprint">打印</ckImgBtn>
            <ckImgBtn class="imgBtn-item" icon="ck-imgicon-printView" @click="handlebrowser">浏览</ckImgBtn>
        </div>
        <el-row :gutter="20" style="margin-top:15px;">
            <el-col :span="11">
                <span>矢量图名称列表:</span>
                <ul class="ul">
                    <li :class="[item.flag?'bgclass':'']" @click="handleitem(item)" @dblclick="setData(item)" v-for="item of syData" :key="item.id">{{item.label}}</li>
                </ul>
            </el-col>
            <el-col :span="13">
                <el-form ref="form" :model="form" label-width="80px" size="small">
                    <el-form-item label="名称:">
                        <el-input v-model="form.name" style="width:69%;" size="mini"></el-input>
                    </el-form-item>
                    <el-form-item label="图片内容:">
                        <img :src="form.imgSrc" />
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script type="text/javascript">
    // var time = null //  在这里定义time 为null
    import {
        createNamespacedHelpers
    } from 'vuex'
    const {
        mapActions
    } = createNamespacedHelpers('residentDoctor')

    export default {
        name: 'subImagesManage',
        data() {
            return {
                form: {
                    name: '',
                    imgSrc: ''
                },
                syData: [],
                time: null
            }
        },
        created() {
            this.get_GetInformation()
        },
        methods: {
            ...mapActions([
                'GET_IMAGETREE',
            ]),
            get_GetInformation() {
                this.GET_IMAGETREE().then((res) => {
                    this.syData = res.values
                })
            },
            handlesave() {
                // 保存
            },
            handleprint() {
                // 打印
            },
            handlebrowser() {
                // 浏览
            },
            handleitem(val) {
                // 点击每个li
                clearTimeout(this.time) // 首先清除计时器
                this.time = setTimeout(() => {
                    const newSysData = []
                    this.syData.forEach((el) => {
                        el.flag = false
                        newSysData.push(el)
                    })
                    newSysData.forEach((element) => {
                        if (element == val) {
                            element.flag = true
                        }
                    })
                    this.syData = newSysData
                })
            },
            setData(val) {
                // 双击填充数据
                clearTimeout(this.time) // 首先清除计时器
                this.form.name = val.label
            }
        }
    }
</script>

<style lang="scss" scoped>
    .imgBtnBox {
        // margin-bottom: 15px;

        .imgBtn-item {
            display: inline-flex;
            justify-content: space-evenly;
            line-height: 2.7;
        }
    }

    /deep/.img-btn>span {
        min-width: 34px !important;
        min-height: 34px !important;

        &:nth-child(1) {
            margin-right: 8px;
        }

        &:nth-child(2) {
            margin-right: 10px;
        }
    }

    .ul {
        border: 1px solid #e6e6e6;
        height: 45vh;
        overflow-y: auto;
        white-space: nowrap;
        margin-top: 5px;
    }

    .ul>li {
        cursor: pointer;
        height: 30px;
        border-bottom: 1px solid #e6e6e6;
        line-height: 30px;
        padding-left: 15px;
    }

    .bgclass {
        background-color: #44B3C7;
        color: white;
    }
</style>
<template>
    <div class="vector-graph" style="background:white;">
        <!-- <h1 class="ck-subnav-caption">矢量图维护</h1> -->
        <div class="btn">
            <el-upload class="upload-demo" ref="upload" action :auto-upload="false" :show-file-list="false" :file-list="fileList" :before-upload="handlebefore" :on-change="handlechange">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
            </el-upload>
            <el-button @click="delImg" type="primary" size="small" style="margin-bottom:15px;margin-left:10px;">删除当前图片</el-button>
        </div>
        <el-row>
            <el-col :span="8" class="tree-content">
                <ul class="ulsort">
                    <li :class="[item.flag?'bgclass':'']" @click="handleitem(item)" v-for="item of treeData" :key="item.id">{{item.lable}}</li>
                </ul>
                <!-- <el-tree :data="treeData" :props="defaultProps" @node-click="handleNodeClick"></el-tree> -->
            </el-col>
            <el-col :span="15" :offset="1">
                <el-form class="formbox" ref="form" :model="form" label-width="100px" size="small">
                    <el-form-item label="图片本地路径">
                        <el-input v-model="form.localimg" style="width:260px;"></el-input>
                    </el-form-item>
                    <el-form-item label="图片名称">
                        <el-input v-model="form.name" style="width:260px;"></el-input>
                    </el-form-item>
                </el-form>
                <div class="img-content">
                    <img ref="icon" :src="imageSrc" alt width="100%" height="100%" />
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import {
        mapActions
    } from 'vuex'
    export default {
        name: 'vectorGraph',
        data() {
            return {
                form: {
                    localimg: '',
                    name: '',
                    upimgType: ''
                },
                imageSrc: '',
                localImgSrc: '',
                fileList: [
                    // {
                    //   name: "food.jpeg",
                    //   url:
                    //     "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
                    // }
                ],
                treeData: [],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                treeDatas: [],
                currentval: null,
                currentImg: null
            }
        },
        created() {
            this.getFileList()
        },
        methods: {
            ...mapActions([
                'GetFileList',
                'GetFileInfo',
                'DeleteFileInfo',
                'UploadFileInfo'
            ]),
            getFileList(val) {
                this.GetFileList().then(res => {
                    // console.log(res)
                    if (res.code == 1) {
                        this.treeData = res.values
                        if (val) {
                            // console.log(val)
                            const newSysData = []
                            this.treeData.forEach(el => {
                                el.flag = false
                                newSysData.push(el)
                            })
                            newSysData.forEach(element => {
                                if (element.lable == val) {
                                    element.flag = true
                                    this.getFileInfo(element.id)
                                }
                            })
                            this.treeData = newSysData
                        }
                    }
                })
            },
            delImg() {
                // 删除当前图片
                if (this.currentval == null) {
                    this.$message.warning('请选择要删除的图片!')
                    return
                }
                const param = {
                    picPath: this.currentval.id
                }
                this.$confirm('你确定要删除当前图片?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    })
                    .then(() => {
                        this.DeleteFileInfo(param).then(res => {
                            if (res.code == 1) {
                                this.imageSrc = ''
                                this.$message.success(res.msg)
                                this.getFileList()
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
            handleNodeClick(data) {
                // console.log(data)
            },
            getFileInfo(val) {
                // 获取单个图片
                const param = {
                    code: val
                }
                this.GetFileInfo(param).then(res => {
                    if (res.code == 1) {
                        // console.log(res.values)
                        this.imageSrc = res.values
                    }
                })
            },
            getImageBase64(img, ext) {
                // console.log(ext)
                var canvas = document.createElement('canvas') //创建canvas DOM元素，并设置其宽高和图片一样
                canvas.width = img.width
                canvas.height = img.height
                var ctx = canvas.getContext('2d')
                ctx.drawImage(img, 0, 0, img.width, img.height) //使用画布画图
                var dataURL = canvas.toDataURL('image/' + ext) //返回的是一串Base64编码的URL并指定格式
                canvas = null //释放
                return dataURL
            },

            submitUpload() {
                // 上传
                let that = this
                if (this.localImgSrc == '') {
                    this.$message.warning('请上传图片!')
                    return
                }
                let imgType = this.currentImg.name.substr(
                    this.currentImg.name.lastIndexOf('.') + 1
                )
                var user_icon = this.$refs.icon
                user_icon.src = this.localImgSrc //指定图片路径
                user_icon.onload = function() {
                    let base64 = that.getImageBase64(user_icon, imgType) //base64编码
                    const param = {
                        imgStr: base64, // 图片路径
                        imgName: that.form.name == '' ? '无名称' : that.form.name, // 手输图片名称,
                        imgType: that.form.upimgType //图片名称
                    }
                    // console.log(JSON.stringify(param))
                    // console.log(that)
                    that.UploadFileInfo(param).then(res => {
                        if (res.code == '1') {
                            that.$message.success(res.msg)
                            let formImgName = that.form.name
                            user_icon.onload = null
                            that.getFileList(formImgName)
                            // console.log(that)
                        }
                    })
                }
            },
            handlebefore(file) {
                // console.log(file)
            },
            handlechange(file, fileList) {
                this.currentImg = file
                // console.log(file.name)
                this.form.upimgType = file.name
                const URL = window.URL || window.webkitURL
                this.imageSrc = URL.createObjectURL(file.raw)
                this.localImgSrc = URL.createObjectURL(file.raw)
            },
            handleitem(val) {
                // console.log(val)
                this.currentval = val
                this.form.name = val.lable
                // 点击每个li
                const newSysData = []
                this.treeData.forEach(el => {
                    el.flag = false
                    newSysData.push(el)
                })
                newSysData.forEach(element => {
                    if (element == val) {
                        element.flag = true
                    }
                })
                this.treeData = newSysData
                this.getFileInfo(val.id)
            }
        }
    }
</script>
<style lang="scss" scoped>
    .vector-graph {
        height: 100%;
        .btn {
            display: flex;
        }

        .img-content {
            border: 1px solid #d5e4f3;
            height: calc(100vh - 290px);
        }

        .tree-content {
            border: 1px solid #d5e4f3;
            // height: calc(100vh - 290px);
        }

        .ul,
        .ulsort {
            height: calc(100vh - 200px);
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

    }
</style>
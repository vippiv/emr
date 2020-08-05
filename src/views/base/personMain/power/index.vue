<template>
    <div class="person-main-power">
        <el-row class="gen1">
            <el-input size="mini" v-model="doctorName" class="searchInput" suffix-icon="el-icon-search">
            </el-input>
            <el-button size="mini" @click="handleSearch" class="searchButton">搜索</el-button>
            <el-button size="mini" @click="updateAllAuthority" class="searchButton">保存</el-button>
        </el-row>
        <el-row :gutter="20" class="gen3">
            <el-col :span="6">
                <div class="grid-content bg-purple1">组管理</div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple2">权限</div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple3">工作台</div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple4">特殊职能</div>
            </el-col>
        </el-row>
        <el-row :gutter="20" class="gen4">
            <el-col :span="6" class="frame">
                <div class="grid-content1 bg-purple">
                    <el-tree :data="treeData" :props="defaultProps" highlight-current node-key="id" ref="groupTree" default-expand-all @node-click="handleNodeClick">
                    </el-tree>
                </div>
            </el-col>
            <el-col :span="6" class="frame">
                <div class="grid-content1 bg-purple">
                    <el-tree :data="authorityData" :props="defaultProps" node-key="id" ref="authorityTree" check-strictly highlight-current default-expand-all show-checkbox @check-change="handleAuthCheckChange">
                    </el-tree>
                </div>
            </el-col>
            <el-col :span="6" class="frame">
                <div class="grid-content1 bg-purple" :class="disabledTree ? 'cursor-disabled' : ''">
                    <el-tree :data="workPlatformData" :props="defaultProps" node-key="id" ref="workBenchTree" check-strictly default-expand-all highlight-current show-checkbox @check-change="handleWorkBenchCheckChange">
                    </el-tree>
                </div>
            </el-col>
            <el-col :span="6" class="frame">
                <div class="grid-content1 bg-purple" :class="disabledTree ? 'cursor-disabled' : ''">
                    <el-tree @check="getonly" :data="specialFuncData" :props="defaultProps" node-key="id" ref="specialTree" check-strictly default-expand-all highlight-current show-checkbox @check-change="handleSpecialCheckChange">
                    </el-tree>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script type="text/javascript">
    import {
        mapActions
    } from 'vuex'
    import {
        isNum
    } from '@/utils/utils'

    export default {
        name: 'personMainPower',
        data() {
            return {
                count: 1,
                treeData: [], // 组管理树
                authorityData: [], // 权限管理树
                workPlatformData: [], // 工作台树
                specialFuncData: [], // 特殊职能树
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                disabledTree: false,
                checkedAuthrity: [],
                checkedWorkBench: [],
                checkedSpecial: [],
                timer: null,
                currentDoctor: null,
                doctorName: '',
                oldDoctorName: '',
                searchCheckedNode: [],
                searchCheckedNodeIndex: -1
            }
        },
        created() {
            this.get_GetInformation()
            this.get_GetRoleInformation()
            this.getWorkPlatform()
            this.getSpecialFunction()
        },
        methods: {
            ...mapActions([
                'GetPower',
                'GET_USERSBYGROUPHOUSEMAN',
                'GetRole',
                'GetWorkPlatform',
                'GetSpecial',
                'GET_USER_ROLE_BY_CODE',
                'GET_WORK_BENCH_BY_CODE',
                'GET_SPECIAL_BY_CODE',
                'UPDATE_USER_ROLES',
                'UPDATE_WORK_BENCH',
                'UPDATE_SPECIAL'
            ]),
            // 权限树获取
            get_GetRoleInformation() {
                this.GetRole().then((res) => {
                    this.authorityData = res.values
                })
            },
            // 组管理树获取
            get_GetInformation() {
                this.GetPower().then((res) => {
                    console.log(res)
                    this.treeData = res.values
                })
            },
            // 工作台树获取
            getWorkPlatform() {
                this.GetWorkPlatform().then((res) => {
                    this.workPlatformData = res.values
                })
            },
            // 特殊职能树获取
            getSpecialFunction() {
                this.GetSpecial().then((res) => {
                    this.specialFuncData = res.values
                })
            },
            // 获取权限选中项
            getRoleByCode(node) {
                this.checkedAuthrity = []
                this.$refs.authorityTree.setCheckedKeys([])
                this.GET_USER_ROLE_BY_CODE({
                    tag: node.Tag,
                    code: node.id
                }).then((res) => {
                    const authrityData = res.values
                    authrityData.forEach((item) => {
                        this.checkedAuthrity.push(item.FUNC_CODE)
                    })
                    this.$refs.authorityTree.setCheckedKeys(this.checkedAuthrity)
                })
            },
            // 获取工作台选中项
            getWorkBenchByCode(node) {
                this.checkedWorkBench = []
                this.$refs.workBenchTree.setCheckedKeys([])
                this.GET_WORK_BENCH_BY_CODE({
                    code: node.id
                }).then((res) => {
                    const workBenchData = res.values
                    workBenchData.forEach((item) => {
                        this.checkedWorkBench.push(item.WORKBENCH_CODE)
                    })
                    this.$refs.workBenchTree.setCheckedKeys(this.checkedWorkBench)
                })
            },
            // 获取特殊权限选中项
            getSpecialByCode(node) {
                this.checkedSpecial = []
                this.$refs.specialTree.setCheckedKeys([])
                this.GET_SPECIAL_BY_CODE({
                    code: node.id
                }).then((res) => {
                    const specialData = res.values
                    specialData.forEach((item) => {
                        this.checkedSpecial.push(item.SPECIAL_ROLE_ID)
                    })
                    this.$refs.specialTree.setCheckedKeys(this.checkedSpecial)
                })
            },
            // 权限树change事件
            handleAuthCheckChange(node, checked, indeterminate) {
                if (checked) {
                    // 把选中项添加到选中项数组中，需要判断数组中是否存在选中项
                    if (!isNum(parseInt(node.code, 10)) && this.checkedAuthrity.indexOf(node.id) < 0) {
                        this.checkedAuthrity.push(node.id)
                    }
                } else {
                    // 把取消选中的项剔除出去，，需要判断数组中是否存在选中项
                    const index = this.checkedAuthrity.indexOf(node.id)
                    if (index > -1) {
                        this.checkedAuthrity.splice(index, 1)
                    }
                }
            },
            // 工作台树change事件
            handleWorkBenchCheckChange(node, checked, indeterminate) {
                if (checked) {
                    // 把选中项添加到选中项数组中，需要判断数组中是否存在选中项
                    if (this.checkedWorkBench.indexOf(node.id) < 0) {
                        this.checkedWorkBench.push(node.id)
                    }
                } else {
                    // 把取消选中的项剔除出去，，需要判断数组中是否存在选中项
                    const index = this.checkedWorkBench.indexOf(node.id)
                    if (index > -1) {
                        this.checkedWorkBench.splice(index, 1)
                    }
                }
            },
            // 特殊职能树change事件
            handleSpecialCheckChange(node, checked, indeterminate) {
                if (node.Tag == 1) {
                    this.$refs.specialTree.setCheckedKeys([])
                }
                if (checked) {
                    // 把选中项添加到选中项数组中，需要判断数组中是否存在选中项
                    if (this.checkedSpecial.indexOf(node.id) < 0) {
                        this.checkedSpecial.push(node.id)
                    }
                } else {
                    // 把取消选中的项剔除出去，，需要判断数组中是否存在选中项
                    const index = this.checkedSpecial.indexOf(node.id)
                    if (index > -1) {
                        this.checkedSpecial.splice(index, 1)
                    }
                }
            },
            // 特殊职能树只能选择一个
            getonly() {
                // 获取当节点的值
                var getlist = this.$refs.specialTree.getCheckedNodes()
                // 循环遍历当前节点的值
                for (var i = 0; i < getlist.length; i++) {
                    for (var j = i + 1; j < getlist.length; j++) {
                        if (getlist[i].code == getlist[j].code) {
                            this.$message('此工作台仅限一个特殊职能')
                            this.$refs.specialTree.setCheckedKeys([])
                        }
                    }
                }
            },
            updateAllAuthority() {
                if (!this.currentDoctor) {
                    return
                }
                Promise.all([this.updateUserRoles(), this.updateWorkBench(), this.updateSpecial()]).then(() => {
                    this.$message.success('更新成功')
                })
            },
            updateUserRoles() {
                this.UPDATE_USER_ROLES({
                    userCode: this.currentDoctor.id,
                    ids: this.checkedAuthrity.join(',')
                }).then((res) => {
                    if (res.code === 1) {
                        new Promise((resolve) => {
                            resolve(res)
                        })
                    }
                })
            },
            updateWorkBench() {
                this.UPDATE_WORK_BENCH({
                    userCode: this.currentDoctor.id,
                    ids: this.checkedWorkBench.join(',')
                }).then((res) => {
                    if (res.code === 1) {
                        new Promise((resolve) => {
                            resolve(res)
                        })
                    }
                })
            },
            updateSpecial() {
                this.UPDATE_SPECIAL({
                    userCode: this.currentDoctor.id,
                    ids: this.checkedSpecial.join(',')
                }).then((res) => {
                    if (res.code === 1) {
                        new Promise((resolve) => {
                            resolve(res)
                        })
                    }
                })
            },
            handleNodeClick(node) {
                console.log(node)
                this.currentDoctor = node
                if (this.currentDoctor.Tag == '2') {
                    this.GET_USERSBYGROUPHOUSEMAN({
                        usercode: this.currentDoctor.id,
                    }).then(res => {
                        console.log(res)
                        if (res.values.length !== 0) {
                            node.children = res.values
                        }
                    })
                }
                // 禁用工作台和特殊职能
                if (node.Tag === 1) {
                    this.disabledTree = true
                } else {
                    this.disabledTree = false
                }
                // 根据人员获取权限
                this.getRoleByCode(node)
                // 获取工作台
                this.getWorkBenchByCode(node)
                // 获取特殊职能
                this.getSpecialByCode(node)
            },
            handleSearch() {
                if (!this.doctorName) {
                    this.$message.error('请输入查询内容')
                    return
                }
                if (this.oldDoctorName !== this.doctorName) {
                    this.searchCheckedNode = []
                    this.treeData.forEach((item) => {
                        if (item.children && item.children.length > 0) {
                            item.children.forEach((subItem) => {
                                if (subItem.label.indexOf(this.doctorName) > -1) {
                                    this.searchCheckedNode.push(subItem)
                                }
                            })
                        }
                    })
                    this.oldDoctorName = this.doctorName
                }
                if (this.searchCheckedNode.length > 1) {
                    this.searchCheckedNodeIndex < this.searchCheckedNode.length ? this.searchCheckedNodeIndex += 1 : this.searchCheckedNodeIndex = -1
                    this.$refs.groupTree.setCurrentKey(this.searchCheckedNode[this.searchCheckedNodeIndex].id)
                    this.handleNodeClick(this.searchCheckedNode[this.searchCheckedNodeIndex])
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .searchButton {
        width: 85px;
        height: 31px;
        background: #ff8c00;
        border-radius: 5px;
        font-size: 14px;
        color: #ffffff;
    }

    .searchInput {
        width: 336px;
        height: 35px;
        background: #ffffff;
        border: NaNpx solid #e8eaed;
        border-radius: 5px;
    }

    /deep/ .el-icon-search {
        width: 16px;
        height: 16px;
        color: #ff8c00;
    }

    .gen1 {
        margin-bottom: 9px;
    }

    .gen3 {
        margin-top: 9px;

        .el-col {
            border-radius: 4px;
        }

        .bg-purple-dark {
            background: #99a9bf;
        }

        .bg-purple1 {
            background: url(../../../../assets/images/personmain/group.png) 34% 50% no-repeat #44b3c7;
            border: NaNpx solid #e8eaed;
        }

        .bg-purple2 {
            background: url(../../../../assets/images/personmain/power.png) 34% 50% no-repeat #44b3c7;
            border: NaNpx solid #e8eaed;
        }

        .bg-purple3 {
            background: url(../../../../assets/images/personmain/gallery.png) 34% 50% no-repeat #44b3c7;
            border: NaNpx solid #e8eaed;
        }

        .bg-purple4 {
            background: url(../../../../assets/images/personmain/specialfunction.png) 34% 50% no-repeat #44b3c7;
            border: NaNpx solid #e8eaed;
        }

        .bg-purple-light {
            background: #e5e9f2;
        }

        .grid-content {
            // padding-left: 46px;
            text-align: center;
            min-height: 43px;
            line-height: 43px;
            font-size: 18px;
            font-family: Adobe Heiti Std R, Adobe Heiti Std R-R;
            font-weight: bold;
            color: #ffffff;
            letter-spacing: -1px;
        }

        .row-bg {
            padding: 10px 0;
            background-color: #f9fafc;
        }
    }

    .gen4 {
        margin-top: 9px;

        .grid-content1 {
            min-height: 666px;
        }

        .frame {
            height: calc(100vh - 255px);
            border: 1px solid #99a9bf;
            overflow-y: auto;
        }
    }

    .cursor-disabled {
        pointer-events: none;

        /deep/ .el-tree-node__label {
            color: gray;
            user-select: none;
        }
    }

    /deep/ .el-tree--highlight-current {
        .el-tree-node.is-current {
            &>.el-tree-node__content {
                background-color: #44B3C7;
                color: white;
            }
        }
    }
</style>
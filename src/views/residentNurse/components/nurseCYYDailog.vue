<template>
  <div class="nurse-cyy-dailog">
    <el-dialog
      title="病情观察及措施常用语"
      :visible.sync="showDialogModal"
      :before-close="handleClose"
      :close-on-click-modal="false"
      width="700px"
    >
      <el-row :gutter="20">
        <el-col :span="12">
          <el-row style="margin-bottom:10px;">
            <el-col :span="6" style="line-height:2;">科室</el-col>
            <el-col :span="18">
              <el-select
                v-model="dptvalue"
                placeholder="请选择"
                style="width:100%;"
                size="small"
                filterable 
                @change="handleChange"
              >
                <el-option
                  v-for="item in optionsearch"
                  :key="item.DEPT_ID"
                  :label="item.DEPT_NAME_CN"
                  :value="item.DEPT_ID"
                ></el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-table :data="gridData" size="mini" border height="400" highlight-current-row>
            <el-table-column property="TITLE" label="标题" align="center"></el-table-column>
            <el-table-column property="USER_NAME" label="创建人" align="center"></el-table-column>
            <el-table-column property="DEPTNAME" label="科室名称" align="center"></el-table-column>
          </el-table>
        </el-col>
        <el-col :span="12">
          <h2>常用语</h2>
          <el-form ref="form" :model="form" label-width="50px" label-position="left" size="small">
            <el-form-item label="标题">
              <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="内容">
              <el-input type="textarea" v-model="form.content"></el-input>
            </el-form-item>
            <el-form-item label="类型">
              <el-radio-group v-model="form.radiotype">
                <el-radio label="护理" value="0"></el-radio>
                <el-radio label="批注" value="1"></el-radio>
              </el-radio-group>
            </el-form-item>
            <!-- <el-form-item>
              <el-button type="primary" @click="dialogFormVisible = false">新增</el-button>
              <el-button type="primary" @click="dialogFormVisible = false">删除</el-button>
              <el-button type="primary" @click="dialogFormVisible = false">保存</el-button>
              <el-button @click="dialogFormVisible = false">取消</el-button>
            </el-form-item> -->
          </el-form>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex'
const { mapActions } = createNamespacedHelpers('residentNurse')
export default {
  name: 'nurseCYYDailog',
  props: {
    showDialogModal: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dptvalue: '',
      form: {
        title: '',
        content: '',
        radiotype: 0
      },
      optionsearch: [],
      gridData: [],
      contentObj:{},
    }
  },
  created() {
    this.getCommonDept()
  },
  methods: {
    ...mapActions(['GetCommonDept', 'LoadInfo']),
    handleChange(val) {
      let data = {
        DeptID: val
      }
      this.LoadInfo(data).then(res => {
        console.log(res)
        if (res.code == 1&&res.values.length>0) {
          this.gridData = res.values
          this.form.title = res.values[0].TITLE
          this.form.content = res.values[0].CONTENTS
          this.form.radiotype = res.values[0].FLAG
        }
      })
    },
    getCommonDept() {
      //获取科室
      this.GetCommonDept('').then(res => {
        console.log(res)
        if (res.code == 1) {
          this.optionsearch = res.values
        }
      })
    },
    handleClose() {
      this.$emit('closeModal')
    }
  }
}
</script>
<style lang="scss" scoped>
.nurse-cyy-dailog {
}
</style>
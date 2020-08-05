<template>
  <div>
    <el-dialog
      title="添加列"
      :visible.sync="dialogFormVisible"
      @close="$emit('update:show', false)"
      width="30%"
      size="small"
    >
      <el-form :rules="rules" ref="form" :model="form" label-width="80px">
        <el-form-item label="数据名" prop="dataname">
          <el-input v-model="form.dataname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="设计列名" prop="lname">
          <el-input v-model="form.lname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-select
            v-model="form.type"
            clearable
            placeholder="请选择"
            style="width:100%"
          >
            <el-option v-for="item in typeOptions" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="resetForm('form')" size="small">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'temperatureListDailog',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      dialogFormVisible: this.show,
      form: {
        dataname: '', // 数据名
        lname: '', // 设计列名
        type: '' // 类型
      },
      typeOptions: [],
      rules: {
        dataname: [
          { required: true, message: '请输入数据名', trigger: 'change' }
        ],
        lname: [
          { required: true, message: '请输入设计列名', trigger: 'change' }
        ],
        type: [{ required: true, message: '请选择类型', trigger: 'change' }]
      }
    }
  },
  created () {
    this.getStyles()
  },
  methods: {
    ...mapActions(['GetStyles', 'TitemsInfoAdd']),
    getStyles () {
      // 获取类型
      this.GetStyles().then((res) => {
        if (res.code == 1) {
          this.typeOptions = res.values
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const param = {
            txtColumn: this.form.dataname,
            cmbStyle: this.form.lname,
            txtColumnCode: this.form.type
          }
          this.TitemsInfoAdd(param).then((res) => {
            if (res.code == 1) {
              this.$message.success(res.msg)
              this.$emit('handlefresh')
              this.$emit('update:show', false)
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>

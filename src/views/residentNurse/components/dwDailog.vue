<template>
  <div class="dw-container">
    <el-dialog
      title="定位"
      :visible.sync="dwshow"
      width="380px"
      :close-on-click-modal="false"
      :before-close="handleclose"
    >
      <el-form :model="form" size="small" label-width="80px">
        <el-form-item label="床位">
          <el-input v-model="form.cw" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="住院号">
          <el-input v-model="form.hospitalNo" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="病人姓名">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleConfirm" size="small">查询</el-button>
        <el-button @click="handleCancel" size="small">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'dwDailog',
  props: {
    dwshow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {
        cw: '',
        hospitalNo: '',
        name: '',
        close: false,
        query: 1
      }
    }
  },
  methods: {
    handleclose() {
      this.form.query = 0
      this.handleModelClose()
    },
    handleModelClose() {
      this.$emit('triggerdw', this.form)
    },
    handleConfirm() {
      //查询
      this.form.query = 1
      this.handleModelClose()
    },
    handleCancel() {
      //取消
      this.form.query = 0
      this.handleModelClose()
    }
  }
}
</script>
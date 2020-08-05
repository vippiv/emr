<template>
  <div class="medicine-borrow-dailog">
    <el-dialog
      title="科室查询"
      :visible.sync="dialogdptvisible"
      width="600px"
      :before-close="handlebfclose"
      append-to-body
    >
      <el-row style="margin-bottom:10px;line-height:2.3">
        <el-col :span="10">
          <el-radio-group v-model="topradio">
            <el-radio :label="0">名称(&M)</el-radio>
            <el-radio :label="1">编码(&C)</el-radio>
          </el-radio-group>
        </el-col>
        <el-col :span="14">
          <el-input v-model="search" size="small" @keyup.enter.native="handleEnterSearch"></el-input>
        </el-col>
      </el-row>

      <el-table
        :data="gridData"
        border
        size="mini"
        highlight-current-row
        @row-dblclick="handleDbTable"
        style="height:33vh;overflow-y:auto;"
      >
        <el-table-column property="DEPT_NAME_CN" label="名称"></el-table-column>
        <el-table-column property="SHORT_CODE" label="编码"></el-table-column>
        <el-table-column property="SPEC_CODE" label="SPEC_CODE"></el-table-column>
      </el-table>
      <el-radio-group v-model="bottomradio" style="margin-top:15px;">
        <el-radio :label="1">精确查询</el-radio>
        <el-radio :label="0">模糊查询</el-radio>
      </el-radio-group>
    </el-dialog>
  </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex'
const { mapActions } = createNamespacedHelpers('residentDoctor')
export default {
  name: 'medicineRecordBorrowDailog',
  props: {
    dialogdptvisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      topradio: 0,
      bottomradio: 1,
      search: '',
      gridData: []
    }
  },
  watch: {
    topradio(newval, old) {
      this.sELECTDept()
    },
    bottomradio(newval, old) {
      this.sELECTDept()
    }
  },
  created() {
    this.sELECTDept()
  },
  methods: {
    ...mapActions(['SELECTDept']),
    handleEnterSearch() {
      //输入框回车查询事件
      this.sELECTDept()
    },
    sELECTDept() {
      let data = {
        selecttype: this.bottomradio,
        selectif: this.topradio,
        Condition: this.search
      }
      this.SELECTDept(data).then(res => {
        if (res.code == 1) {
          this.gridData = res.values
        }
      })
    },
    handleDbTable(row, column, event) {
      // 双击选择弹框中表格
      this.$emit('closeDailog', row)
    },
    handlebfclose() {
      this.$emit('closeDailog')
    }
  }
}
</script>
<style lang="scss" scoped>
</style>

<template>
  <div>
    <el-dialog
      title="设计列"
      :visible.sync="dialogFormVisiblelr"
      @close="$emit('update:lrshow', false)"
      width="460px"
      size="small"
    >
      <el-row>
        <el-col :span="7">
          <div class="lefts">
            <div style="text-align:center;">
              <el-input v-model="addinput" placeholder="请输入内容" size="mini" style="width:80%;"></el-input>
              <el-button
                @click="addBtn"
                class="left-btn"
                type="primary"
                size="mini"
                :disabled="isAddBtn"
              >添加</el-button>
            </div>
          </div>
        </el-col>
        <el-col :span="13">
          <ul class="ul">
            <li
              :class="[item.flag?'bgclass':'']"
              @click="handleitemSort(item)"
              v-for="item of syDataSort"
              :key="item.ColumnsCode +Math.random()"
            >{{item.ItemData}}</li>
          </ul>
        </el-col>
        <el-col :span="4">
          <div class="lefts">
            <el-button @click="delbtn" type="primary" size="mini" :disabled="isdelBtn">删除</el-button>
          </div>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisiblelr = false" size="mini">取 消</el-button>
        <el-button @click="saveBtn" type="primary" size="mini">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'temperatureListLrDailog',
  props: {
    lrshow: {
      type: Boolean,
      default: false
    },
    currentData: {
      type: Array
    }
  },
  data() {
    return {
      dialogFormVisiblelr: this.lrshow,
      syDataSort: this.currentData,
      addinput: '',
      isAddBtn: false,
      isdelBtn: false,
      listItemData: null
    }
  },
  created() {},
  methods: {
    ...mapActions(['GetTTitemsInfo', 'SaveTTitemsInfo']),

    handleitemSort(val) {
      // 点击每个li
      this.listItemData = val
      let newSysDataSort = []
      this.syDataSort.forEach(el => {
        el.flag = false
        newSysDataSort.push(el)
      })
      newSysDataSort.forEach(element => {
        if (element == val) {
          element.flag = true
        }
      })
      this.syDataSort = newSysDataSort
    },
    addBtn() {
      //添加
      let obj = {
        ColumnsCode: this.syDataSort[0].ColumnsCode,
        ItemData: this.addinput
      }
      this.syDataSort.push(obj)
    },
    delbtn() {
      //删除
      if (!this.listItemData) {
        this.$message.warning('请选择要删除的数据！')
        return
      } else {
        let newDataSort = JSON.parse(JSON.stringify(this.syDataSort))
        newDataSort.forEach((item, index) => {
          console.log(item)
          if (item.ItemData == this.listItemData.ItemData) {
            newDataSort.splice(index, 1)
          }
        })
        console.log(newDataSort)
        this.syDataSort = newDataSort
      }
    },
    saveBtn() {
      //保存
      let arr = []
      this.syDataSort.forEach(item => {
        arr.push(item.ItemData)
      })
      let data = {
        code: this.syDataSort[0].ColumnsCode,
        items: arr
      }
      console.log(JSON.stringify(data))
      this.SaveTTitemsInfo(data).then(res => {
        if(res.code==1) this.$message.success(res.msg)
        this.$emit('update:lrshow', false)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.ul,
.ulsort {
  height: 20vh;
  overflow-y: auto;
  border: 1px solid #828790;
}
.ul > li,
.ulsort > li {
  height: 30px;
  line-height: 30px;
  padding-left: 15px;
}
.bgclass {
  background-color: #00838f;
  color: white;
}
.lefts {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20vh;
}
.left-btn {
  margin-top: 15px;
}
</style>
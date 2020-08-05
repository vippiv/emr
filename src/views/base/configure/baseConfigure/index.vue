<template>
  <div>
    <h1 class="ck-subnav-caption">基本配置</h1>
    <div class="formbox">
      <el-button @click="save" type="primary" size="small" style="margin:10px 0px;">保存</el-button>
      <div>
        <!-- 基本配置 -->
        <el-form class="form" :model="baseForm" ref="baseForm" size="small">
          <fieldset class="form-fieldset">
            <legend>基本配置</legend>
            <el-form-item label="医院名称:">
              <el-input v-model="baseForm.name" style="width:30vw;"></el-input>
            </el-form-item>
            <el-form-item label="密码永不过期:">
              <el-radio-group v-model="baseForm.pdradio">
                <el-radio :label="0">是</el-radio>
                <el-radio :label="1">否</el-radio>
              </el-radio-group>
              <span class="span-margin">说明：是，不过期；否，允许过期（三个月后密码过期）</span>
            </el-form-item>
            <el-form-item label="控制单位字数:">
              <el-radio-group v-model="baseForm.szradio">
                <el-radio :label="0">是</el-radio>
                <el-radio :label="1">否</el-radio>
              </el-radio-group>
              <span class="span-margin">说明：是否需要控制病人基本信息的单位数字。是，需要控制；否，不需要控制</span>
            </el-form-item>
          </fieldset>
        </el-form>
        <!-- 护士工作站 -->
        <el-form class="form" :model="nurseForm" ref="nurseForm" size="small">
          <fieldset class="form-fieldset">
            <legend>护士工作站</legend>
            <el-form-item label="加载护理模板:">
              <el-radio-group v-model="nurseForm.loadingRadio">
                <el-radio :label="0">是</el-radio>
                <el-radio :label="1">否</el-radio>
              </el-radio-group>
              <span class="span-margin">说明：是否在护理单模板中加载护理文书病历模板</span>
            </el-form-item>
          </fieldset>
        </el-form>
        <!-- 医生工作站 -->
        <el-form class="form" :model="doctorForm" ref="doctorForm" size="small">
          <fieldset class="form-fieldset">
            <legend>医生工作站</legend>
            <el-form-item label="同级浏览:">
              <el-radio-group v-model="doctorForm.llradio">
                <el-radio :label="0">是</el-radio>
                <el-radio :label="1">否</el-radio>
              </el-radio-group>
              <span class="span-margin">说明：同级医生是否运行互相浏览病历</span>
            </el-form-item>
            <el-form-item label="转科限制:">
              <el-radio-group v-model="doctorForm.zkxzRadio">
                <el-radio :label="0">是</el-radio>
                <el-radio :label="1">否</el-radio>
              </el-radio-group>
              <span class="span-margin">说明：是否允许如何医生（现在是住院医生才可以）都可以对病人进行转科，晚上有值班医生，特殊情况需要转</span>
            </el-form-item>
            <el-form-item label="病历锁定:">
              <el-radio-group v-model="doctorForm.blsdRadio">
                <el-radio :label="0">是</el-radio>
                <el-radio :label="1">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="数据组换行:">
              <el-radio-group v-model="doctorForm.hhRadio">
                <el-radio :label="0">是</el-radio>
                <el-radio :label="1">否</el-radio>
              </el-radio-group>
              <span class="span-margin">说明：同步数据组是否需要换行</span>
            </el-form-item>
            <el-form-item label="未签字打印:">
              <el-radio-group v-model="doctorForm.wqzRadio">
                <el-radio :label="0">是</el-radio>
                <el-radio :label="1">否</el-radio>
              </el-radio-group>
              <span class="span-margin">说明：病历没有签字是否允许打印</span>
            </el-form-item>
            <el-form-item label="签字后修改:">
              <el-radio-group v-model="doctorForm.xgRadio">
                <el-radio :label="0">是</el-radio>
                <el-radio :label="1">否</el-radio>
              </el-radio-group>
              <span class="span-margin">说明：病历签字后本人是否允许修改</span>
            </el-form-item>
            <el-form-item label="西医诊断功能:">
              <el-radio-group v-model="doctorForm.xyzdRadio">
                <el-radio :label="0">是</el-radio>
                <el-radio :label="1">否</el-radio>
              </el-radio-group>
              <span class="span-margin">说明：判断所属医院患者信息是否需要西医诊断功能</span>
            </el-form-item>
            <el-form-item label="是否保留页脚:">
              <el-radio-group v-model="doctorForm.blyjRadio">
                <el-radio :label="0">是</el-radio>
                <el-radio :label="1">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="保存入院诊断提示:">
              <el-radio-group v-model="doctorForm.bczdRadio">
                <el-radio :label="0">是</el-radio>
                <el-radio :label="1">否</el-radio>
              </el-radio-group>
              <span class="span-margin">说明：判断保存入院诊断是否提示</span>
            </el-form-item>
            <el-form-item label="符合临床路径提示:">
              <el-radio-group v-model="doctorForm.lcljRadio">
                <el-radio :label="0">是</el-radio>
                <el-radio :label="1">否</el-radio>
              </el-radio-group>
              <span class="span-margin">说明：是否需要保存入院诊断后，根据诊断提示“该诊断符合临床路径”</span>
            </el-form-item>
            <el-form-item label="住院/主治医生兼具:">
              <el-radio-group v-model="doctorForm.ysjjRadio">
                <el-radio :label="0">是</el-radio>
                <el-radio :label="1">否</el-radio>
              </el-radio-group>
              <span class="span-margin">说明：在接诊的时候住院医生和主治医生是否可以为同一个人</span>
            </el-form-item>
            <el-form-item label="修改已签审个人模板:">
              <el-radio-group v-model="doctorForm.personRadio">
                <el-radio :label="0">是</el-radio>
                <el-radio :label="1">否</el-radio>
              </el-radio-group>
              <span class="span-margin">说明：住院医生工作站模板管理中个人模板签审状态下是否可以修改</span>
            </el-form-item>
            <el-form-item label="取已归档病人信息文件:">
              <el-radio-group v-model="doctorForm.xxwjRadio">
                <el-radio :label="0">是</el-radio>
                <el-radio :label="1">否</el-radio>
              </el-radio-group>
              <span
                class="span-margin"
              >说明：是否需要到31号端口取已归档的病人文件信息（是就是取EMR_SYS_FTP里面的dr=1的ip和端口号，否则取dr=2）</span>
            </el-form-item>
            <el-form-item label="把病历文件中已归档的病人文件信息移动到31号端口文件的执行时间:">
              <el-time-picker
                arrow-control
                v-model="doctorForm.dotime"
                value-format="HH:mm:ss"
                :picker-options="{selectableRange: '00:00:00 - 23:59:59'}"
                placeholder="请选择时间"
              ></el-time-picker>
            </el-form-item>
            <el-form-item label="病历首次申请开放时间:">
              <el-input-number
                v-model="doctorForm.opentime"
                @change="handleChange"
                :min="1"
                :max="10"
                label="描述文字"
              ></el-input-number>
              <span class="span-margin">小时</span>
            </el-form-item>
            <el-form-item label="出院病历定时提交时间:">
              <el-input-number
                v-model="doctorForm.tjTime"
                @change="handleChange"
                :min="1"
                :max="10"
                label="描述文字"
              ></el-input-number>
              <span class="span-margin">天</span>
            </el-form-item>
            <el-form-item label="交接班记录修改时间:">
              <el-input-number
                v-model="doctorForm.updateTime"
                @change="handleChange"
                :min="1"
                :max="10"
                label="描述文字"
              ></el-input-number>
              <span class="span-margin">小时</span>
            </el-form-item>
            <el-form-item label="门诊病历控制his是否允许开医嘱（主诉字数）:">
              <el-input v-model="doctorForm.zsNum" style="width:10vw;"></el-input>
            </el-form-item>
            <el-form-item label="病史字数:">
              <el-input v-model="doctorForm.bsNum" style="width:10vw;"></el-input>
            </el-form-item>
          </fieldset>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      baseForm: {
        name: '',
        pdradio: '',
        szradio: ''
      },
      nurseForm: {
        loadingRadio: ''
      },
      doctorForm: {
        llradio: '',
        zkxzRadio: '',
        blsdRadio: '',
        hhRadio: '',
        wqzRadio: '',
        xgRadio: '',
        xyzdRadio: '',
        blyjRadio: '',
        bczdRadio: '',
        lcljRadio: '',
        ysjjRadio: '',
        personRadio: '',
        xxwjRadio: '',
        dotime: '', // 执行时间
        opentime: '', // 开发时间
        tjTime: '', // 提交时间
        updateTime: '', // 修改时间
        zsNum: '', // 主诉字数
        bsNum: '' // 病史字数
      },
      basicData: []
    }
  },
  created() {
    // console.log()
    this.getBasicConfiguration()
  },
  methods: {
    ...mapActions(['GetBasicConfiguration', 'SaveBasicConfiguration']),
    getBasicConfiguration() {
      //获取基本配置
      this.GetBasicConfiguration().then(res => {
        console.log(res)
        if (res.code == 1) {
          this.basicData = res.values
          this.dolabeltovalue(res.values)
        }
      })
    },
    dolabeltovalue(data) {
      let arr = [] //ItemID
      data.forEach(item => {
        arr.push(item.ItemID)
      })
      arr.forEach(item => {
        switch (item) {
          case '1': //医院名称
            this.baseForm.name = this.doXhvalue(data, item)
            break
          case '12': //密码
            this.baseForm.pdradio = parseInt(this.doXhvalue(data, item))
            break
          case '10': //单位字数
            this.baseForm.szradio = parseInt(this.doXhvalue(data, item))
            break
          case '14': //护理模板
            this.nurseForm.loadingRadio = parseInt(this.doXhvalue(data, item))
            break
          case '2': //同级浏览
            this.doctorForm.llradio = parseInt(this.doXhvalue(data, item))
            break
          case '20': //转科限制
            this.doctorForm.zkxzRadio = parseInt(this.doXhvalue(data, item))
            break
          case '3': //病历锁定
            this.doctorForm.blsdRadio = parseInt(this.doXhvalue(data, item))
            break
          case '11': //数据组换行
            this.doctorForm.hhRadio = parseInt(this.doXhvalue(data, item))
            break
          case '4': //未签字打印
            this.doctorForm.wqzRadio = parseInt(this.doXhvalue(data, item))
            break
          case '5': //签字后修改
            this.doctorForm.xgRadio = parseInt(this.doXhvalue(data, item))
            break
          case '16': //西医诊断功能
            this.doctorForm.xyzdRadio = parseInt(this.doXhvalue(data, item))
            break
          case '9': //是否保留页脚
            this.doctorForm.blyjRadio = parseInt(this.doXhvalue(data, item))
            break
          case '15': //保存入院诊断提示
            this.doctorForm.bczdRadio = parseInt(this.doXhvalue(data, item))
            break
          case '17': //符合临床路径提示
            this.doctorForm.lcljRadio = parseInt(this.doXhvalue(data, item))
            break
          case '19': //住院/主治医生兼具
            this.doctorForm.ysjjRadio = parseInt(this.doXhvalue(data, item))
            break
          case '13': //修改签审模板
            this.doctorForm.personRadio = parseInt(this.doXhvalue(data, item))
            break
          case '21': //归档病人信息
            this.doctorForm.xxwjRadio = parseInt(this.doXhvalue(data, item))
            break
          case '18': //执行时间
            console.log(this.doXhvalue(data, item))
            this.doctorForm.dotime = this.doXhvalue(data, item)
            break
          case '6': //开放时间
            this.doctorForm.opentime = this.doXhvalue(data, item)
            break
          case '7': //提交时间
            this.doctorForm.tjTime = this.doXhvalue(data, item)
            break
          case '8': //修改时间
            this.doctorForm.updateTime = this.doXhvalue(data, item)
            break
          case '35': //主诉字数
            console.log(this.doXhvalue(data, item))
            this.doctorForm.zsNum = this.doXhvalue(data, item)
            break
          case '36': //病史字数
            this.doctorForm.bsNum = this.doXhvalue(data, item)
            break
        }
      })
    },
    doXhvalue(data, val) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].ItemID == val) {
          return data[i].Value
        }
      }
    },
    save() {
      //保存
      let saveEntity = []
      // 医院名称
      let doctname = {
        ID: '1',
        Value: this.baseForm.name,
        ValueDes: ''
      }
      saveEntity.push(doctname)
      // 密码
      let pwd = {
        ID: '12',
        Value: this.baseForm.pdradio,
        ValueDes: this.baseForm.pdradio == 0 ? '是' : '否'
      }
      saveEntity.push(pwd)
      // 单位字数
      let dwzs = {
        ID: '10',
        Value: this.baseForm.szradio,
        ValueDes: this.baseForm.pdradio == 1 ? '是' : '否'
      }
      saveEntity.push(dwzs)
      // 护理模板
      let hlmb = {
        ID: '14',
        Value: this.nurseForm.loadingRadio,
        ValueDes: this.nurseForm.loadingRadio == 1 ? '是' : '否'
      }
      saveEntity.push(hlmb)
      // 同级浏览
      let tjll = {
        ID: '2',
        Value: this.doctorForm.llradio,
        ValueDes: this.doctorForm.llradio == 1 ? '是' : '否'
      }
      saveEntity.push(tjll)
      // 转科限制
      let zkxz = {
        ID: '20',
        Value: this.doctorForm.zkxzRadio,
        ValueDes: this.doctorForm.zkxzRadio == 1 ? '是' : '否'
      }
      saveEntity.push(zkxz)
      //病历锁定
      let blsd = {
        ID: '3',
        Value: this.doctorForm.blsdRadio,
        ValueDes: this.doctorForm.blsdRadio == 1 ? '是' : '否'
      }
      saveEntity.push(blsd)
      //数据组换行
      let sjzhh = {
        ID: '11',
        Value: this.doctorForm.hhRadio,
        ValueDes: this.doctorForm.hhRadio == 1 ? '是' : '否'
      }
      saveEntity.push(sjzhh)
      //未签字打印
      let wqzdy = {
        ID: '4',
        Value: this.doctorForm.wqzRadio,
        ValueDes: this.doctorForm.wqzRadio == 0 ? '是' : '否'
      }
      saveEntity.push(wqzdy)
      //签字后修改
      let qzxg = {
        ID: '5',
        Value: this.doctorForm.xgRadio,
        ValueDes: this.doctorForm.xgRadio == 1 ? '是' : '否'
      }
      saveEntity.push(qzxg)
      //西医诊断功能
      let xyzdgn = {
        ID: '16',
        Value: this.doctorForm.xyzdRadio,
        ValueDes: this.doctorForm.xyzdRadio == 0 ? '是' : '否'
      }
      saveEntity.push(xyzdgn)
      //是否保留页脚
      let blyj = {
        ID: '9',
        Value: this.doctorForm.blyjRadio,
        ValueDes: this.doctorForm.blyjRadio == 1 ? '是' : '否'
      }
      saveEntity.push(blyj)
      //保存入院诊断提示
      let ryzdts = {
        ID: '15',
        Value: this.doctorForm.bczdRadio,
        ValueDes: ''
      }
      saveEntity.push(ryzdts)
      //符合临床路径提示
      let lcljts = {
        ID: '17',
        Value: this.doctorForm.lcljRadio,
        ValueDes: this.doctorForm.lcljRadio == 1 ? '是' : '否'
      }
      saveEntity.push(lcljts)
      //住院/主治医生兼具
      let zyysjj = {
        ID: '19',
        Value: this.doctorForm.ysjjRadio,
        ValueDes: this.doctorForm.ysjjRadio == 1 ? '是' : '否'
      }
      saveEntity.push(zyysjj)
      //修改签审模板
      let xgqsmb = {
        ID: '13',
        Value: this.doctorForm.personRadio,
        ValueDes: this.doctorForm.personRadio == 1 ? '是' : '否'
      }
      saveEntity.push(xgqsmb)
      //归档病人信息
      let gdbrxx = {
        ID: '21',
        Value: this.doctorForm.xxwjRadio,
        ValueDes: this.doctorForm.xxwjRadio == 1 ? 'dr=2' : 'dr=1'
      }
      saveEntity.push(gdbrxx)
      //执行时间
      let zxtime = {
        ID: '18',
        Value: this.doctorForm.dotime,
        ValueDes: ''
      }
      saveEntity.push(zxtime)
      //开放时间
      let kftime = {
        ID: '6',
        Value: this.doctorForm.opentime,
        ValueDes: '小时'
      }
      saveEntity.push(kftime)
      //提交时间
      let tjsj = {
        ID: '7',
        Value: this.doctorForm.tjTime,
        ValueDes: '天'
      }
      saveEntity.push(tjsj)
      //修改时间
      let xgshj = {
        ID: '8',
        Value: this.doctorForm.updateTime,
        ValueDes: '小时'
      }
      saveEntity.push(xgshj)
      //主诉字数
      let zszs = {
        ID: '35',
        Value: this.doctorForm.zsNum,
        ValueDes: ''
      }
      saveEntity.push(zszs)
      //病史字数
      let bszs = {
        ID: '36',
        Value: this.doctorForm.bsNum,
        ValueDes: ''
      }
      saveEntity.push(bszs)
      console.log(JSON.stringify(saveEntity))
      this.SaveBasicConfiguration(saveEntity).then(res => {
        if (res.code == 1) {
          this.$message.success(res.msg)
        }
      })
    },
    handleChange() {}
  }
}
</script>
<style lang="scss" scoped>
.span-margin {
  margin-left: 15px;
}
.formbox {
  right: 0;
  left: 0;
}
.form-fieldset {
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  padding: 5px 10px;
}
</style>

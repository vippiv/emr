<template>
	<div class="activex-hanlder-container">
		<!-- <h2>saveFileInfo参数</h2>
		<div v-text="showArgs" style="word-break: break-all;"></div>
		<h2>UploadFileInfoByString参数</h2>
		<div v-text="UploadFileInfoByString" style="word-break: break-all;"></div> -->
		<div class="inline-block" v-if="docHandlerBtn && writingMode === 'writing'">
			<div class="handler-item" @click="handleSaveDoc">
				<img :src="imgBtnSet.saveBtn" class="img-btn">
				<el-dropdown>
					<el-button type="text">保存</el-button>
					<el-dropdown-menu slot="dropdown"></el-dropdown-menu>
				</el-dropdown>
			</div>
			<div class="handler-item">
				<img :src="imgBtnSet.insertBtn" class="img-btn">
				<el-dropdown @visible-change="handleVisibleChange" @command="handleInsertCommand">
					<el-button type="text">插入<i class="el-icon-arrow-down el-icon--right"></i></el-button>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item command="table">插入表格</el-dropdown-item>
						<el-dropdown-item command="sign">插入签名</el-dropdown-item>
						<el-dropdown-item command="doctorSign">插入上级医师签名</el-dropdown-item>
						<el-dropdown-item command="ventorImg">插入矢量图</el-dropdown-item>
						<el-dropdown-item command="delSign">删除签名</el-dropdown-item>
						<el-dropdown-item command="specialSymbol">插入特殊符号</el-dropdown-item>
						<el-dropdown-item command="delAllSign">删除本页所有签名</el-dropdown-item>
						<el-dropdown-item command="allDiseaseProgress">默认全部病程时间</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</div>
			<div class="handler-item">
				<img :src="imgBtnSet.printBtn" class="img-btn">
				<el-dropdown @visible-change="handleVisibleChange" @command="handleInsertCommand">
					<el-button type="text">打印<i class="el-icon-arrow-down el-icon--right"></i></el-button>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item command="print">打印</el-dropdown-item>
						<el-dropdown-item command="continuePrint">续打</el-dropdown-item>
						<el-dropdown-item command="choosePrint">选择续打</el-dropdown-item>
						<el-dropdown-item command="printPreview">打印预览</el-dropdown-item>
						<el-dropdown-item command="printAppoint">打印(门诊病历)</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</div>
			<div class="handler-item" @click="handleSaveAsPersonal">
				<img :src="imgBtnSet.saveTplBtn" class="img-btn">
				<el-dropdown>
					<el-button type="text">存入个人模板</el-button>
					<el-dropdown-menu slot="dropdown"></el-dropdown-menu>
				</el-dropdown>
			</div>
			<div class="handler-item" @click="handleImportClinicalData">
				<img :src="imgBtnSet.applyDataBtn" class="img-btn">
				<el-dropdown>
					<el-button type="text">临床数据</el-button>
					<el-dropdown-menu slot="dropdown"></el-dropdown-menu>
				</el-dropdown>
			</div>
			<div class="handler-item">
				<img :src="imgBtnSet.importBtn" class="img-btn">
				<el-dropdown @visible-change="handleVisibleChange">
					<el-button type="text">导入数据<i class="el-icon-arrow-down el-icon--right"></i></el-button>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item>导入出院带药</el-dropdown-item>
						<el-dropdown-item>导入危急值</el-dropdown-item>
						<el-dropdown-item>导入危急值及病程</el-dropdown-item>
						<el-dropdown-item>导入输血评价</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</div>
			<div class="handler-item" @click="handleDelRegion">
				<img :src="imgBtnSet.delBtn" class="img-btn">
				<el-dropdown>
					<el-button type="text">删除区域</el-button>
					<el-dropdown-menu slot="dropdown"></el-dropdown-menu>
				</el-dropdown>
			</div>
		</div>
		<div class="inline-block" v-if="docHandlerBtn && ['writing', 'unCleaning', 'cleaning', 'secretary'].includes(writingMode)">
			<div class="handler-item" @click="handleUpdatePatient">
				<img :src="imgBtnSet.updateBtn" class="img-btn">
				<el-dropdown>
					<el-button type="text">更新患者信息</el-button>
					<el-dropdown-menu slot="dropdown"></el-dropdown-menu>
				</el-dropdown>
			</div>
			<div class="handler-item">
				<img :src="imgBtnSet.writeBtn" class="img-btn">
				<el-dropdown @visible-change="handleVisibleChange" @command="handleInsertCommand">
					<el-button type="text">书写模式<i class="el-icon-arrow-down el-icon--right"></i></el-button>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item command="writeMode">书写模式</el-dropdown-item>
						<el-dropdown-item command="unCleaningMode">非清洁浏览</el-dropdown-item>
						<el-dropdown-item command="cleaningMode">清洁浏览</el-dropdown-item>
						<el-dropdown-item command="secretMode">保密浏览</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</div>
		</div>
		<div class="inline-block" v-if="docHandlerBtn  && writingMode === 'writing'">
			<div class="handler-item" @click="handleSyncInfo">
				<img :src="imgBtnSet.syncBtn" class="img-btn">
				<el-dropdown>
					<el-button type="text">同步</el-button>
					<el-dropdown-menu slot="dropdown"></el-dropdown-menu>
				</el-dropdown>
			</div>
			<div class="handler-item" @click="handleDiagnosis">
				<img :src="imgBtnSet.diagnosisBtn" class="img-btn">
				<el-dropdown>
					<el-button type="text">诊断</el-button>
					<el-dropdown-menu slot="dropdown"></el-dropdown-menu>
				</el-dropdown>
			</div>
			<div class="handler-item" @click="handleSurgery">
				<el-dropdown>
					<img :src="imgBtnSet.operationBtn" class="img-btn">
					<el-button type="text">手术</el-button>
					<el-dropdown-menu slot="dropdown"></el-dropdown-menu>
				</el-dropdown>
			</div>
		</div>
		<div class="handler-item" @click="handleBackMain">
			<img :src="imgBtnSet.backBtn" class="img-btn">
			<el-button type="text">返回</el-button>
		</div>
		<!-- <div class="handler-item" @click="actionGetControl">
			<img :src="imgBtnSet.backBtn" class="img-btn">
			<el-button type="text">获取数据元</el-button>
		</div>
		<div class="handler-item" @click="actionGetSection">
			<img :src="imgBtnSet.backBtn" class="img-btn">
			<el-button type="text">获取数据组</el-button>
		</div>
		<div class="handler-item" @click="actionGetAllRegion">
			<img :src="imgBtnSet.backBtn" class="img-btn">
			<el-button type="text">获取区域</el-button>
		</div> -->
		<!-- object得层次是最高的，无法通过z-index更改，iframe层级比object高，其他元素设置z-index高于iframe即可 -->
		<iframe class="cover-object" v-show="iframeShow"></iframe>
		<insertLeaderSignDia
			:insertLeaderSignDiaVis="insertLeaderSignDiaVis"
			@actionInsertLeaderSign="actionInsertLeaderSign"
		></insertLeaderSignDia>
		<insertVectorGraph
			:insertVectorGraphDiaVis="insertVectorGraphDiaVis"
			@actionInsertVectorGraph="actionInsertVectorGraph"
		></insertVectorGraph>
		<saveToPersonal
			:saveToPersonalDiaVis="saveToPersonalDiaVis"
		></saveToPersonal>
		<clinicalData
			:clinicalDataDiaVis="clinicalDataDiaVis"
		></clinicalData>
		<diseaseDiagnosis
			:diseaseDiagnosisDiaVis="diseaseDiagnosisDiaVis"
		></diseaseDiagnosis>
		<operationDia
			:operationDiaVis="operationDiaVis"
		></operationDia>
	</div>
</template>

<script type="text/javascript">
	import { mapState, createNamespacedHelpers } from 'vuex'
	import moment from 'moment'
	import saveBtn from '@/assets/images/imgbtn/save.png'
	import insertBtn from '@/assets/images/imgbtn/insert.png'
	import printBtn from '@/assets/images/imgbtn/print.png'
	import saveTplBtn from '@/assets/images/imgbtn/savetpl.png'
	import applyDataBtn from '@/assets/images/imgbtn/applydata.png'
	import importBtn from '@/assets/images/imgbtn/import.png'
	import delBtn from '@/assets/images/imgbtn/del.png'
	import writeBtn from '@/assets/images/imgbtn/write.png'
	import syncBtn from '@/assets/images/imgbtn/sync.png'
	import diagnosisBtn from '@/assets/images/imgbtn/diagnosis.png'
	import operationBtn from '@/assets/images/imgbtn/operation.png'
	import backBtn from '@/assets/images/imgbtn/back.png'
	import updateBtn from '@/assets/images/imgbtn/update.png'
	import insertLeaderSignDia from './components/insertLeaderSignDia'
	import insertVectorGraph from './components/insertVectorGraph'
	import saveToPersonal from './components/saveToPersonal'
	import clinicalData from './components/clinicalData'
	import diseaseDiagnosis from './components/diseaseDiagnosis'
	import operationDia from './components/operationDia'
	import handleActiveX from '@/utils/activeX'
	import Evtbus from '@/utils/bus'

	const { mapActions } = createNamespacedHelpers('residentDoctor')

	export default {
		name: 'ActiveXHandler',
		data () {
			return {
				imgBtnSet: {
					saveBtn,
					insertBtn,
					printBtn,
					saveTplBtn,
					applyDataBtn,
					importBtn,
					delBtn,
					writeBtn,
					syncBtn,
					diagnosisBtn,
					operationBtn,
					backBtn,
					updateBtn
				},
				iframeShow: false,
				iframe: null,
				docAllControl: null,
				docStr: '',
				submitRegion: [],
				submitSection: [],
				submitControl: [],
				insertLeaderSignDiaVis: false,
				insertVectorGraphDiaVis: false,
				saveToPersonalDiaVis: false,
				clinicalDataDiaVis: false,
				diseaseDiagnosisDiaVis: false,
				operationDiaVis: false,
				docHandlerBtn: true,
				writingMode: 'writing',
				showArgs: '',
				UploadFileInfoByString: ''
			}
		},
		components: {
			insertLeaderSignDia,
			insertVectorGraph,
			saveToPersonal,
			clinicalData,
			diseaseDiagnosis,
			operationDia
		},
		computed: {
			...mapState({
				userInfo: state => state.global.userInfo,
				userRole: state => state.global.userRole,
				deptID: state => state.global.deptID,
				patientInfo: state => state.residentDoctor.patientInfo,
				medisineOperationItem: state => state.residentDoctor.medisineOperationItem,
				activeXCheckbox: state => state.global.activeXCheckbox,
				DateTime: state => state.global.DateTime,
				workBenchID: state => state.global.workBenchID
			})
		},
		inject: ['self'],
		mounted () {
			// 初始化activeX对象
			// handleActiveX.init(document.all.oframe)
			Evtbus.$on('initActiveXObject', () => {
				this.initActiveXObject()
			})
			Evtbus.$on('showIframe', (val) => {
				this.handleIframeMask(val)
			})
			Evtbus.$on('updateWriteMode', (mode) => {
				this.writingMode = mode
				handleActiveX.setDocMode(this.writingMode)
			})
			Evtbus.$on('showDocHandleBtn', (val) => {
				this.docHandlerBtn = val
			})
		},
		methods: {
			...mapActions([
				'SAVE_RYPG',
				'DOC_HAS_CHANGED',
				'IS_GROUP_DIAGNOSIS',
				'SAVE_DOC_BY_STRING',
				'SAVE_DOC_DATA',
				'INSERT_SIGN',
				'INSERT_LEADER_SIGN',
				'GET_PATIENT_INFO',
				'MEDISINE_RECORD_SYNC',
				'SAVE_AUTHRITY_CHECK',
				'UPDATE_MEDISINE_OPERATION_ITEM'
			]),
			initActiveXObject () {
				handleActiveX.init(document.getElementById('oframe' + Evtbus.objectId))
			},
			// 设置iframe，object层级过高无法设置
			handleVisibleChange (val) {
				this.iframeShow = val
				if (!val) {
					return
				}
				this.iframe = document.getElementsByClassName('cover-object')[0]
				const elDropdownMenu = document.getElementsByClassName('el-dropdown-menu')
				let ele = null
				setTimeout(() => {
					for (let i = 0; i < elDropdownMenu.length; i++) {
						if (elDropdownMenu[i].getAttribute('x-placement')) {
							ele = elDropdownMenu[i]
							this.iframe.style.left = `${ele.offsetLeft}px`
							this.iframe.style.top = `${ele.offsetTop}px`
							this.iframe.style.width = `${ele.offsetWidth}px`
							this.iframe.style.height = `${ele.offsetHeight}px`
						}
					}
				}, 200)
			},
			// 设置iframe全屏，否则弹窗mask无法覆盖object
			handleIframeMask (val) {
				setTimeout(() => {
					this.iframeShow = val
					this.iframe = document.getElementsByClassName('cover-object')[0]
					this.iframe.style.left = `0px`
					this.iframe.style.top = `0px`
					this.iframe.style.width = `100vw`
					this.iframe.style.height = `100vh`
				}, 200)
			},
			handleInsertCommand (command) {
				if (!Evtbus.objectId) {
					this.$message.warning('请先打开病历文档!')
					return
				}
				switch (command) {
					case 'table':
						handleActiveX.insertTable("Table", 3,2 )
						break
					case 'sign':
						this.actionInsertSign()
						break
					case 'doctorSign':
						this.handleIframeMask(true)
						this.insertLeaderSignDiaVis = true
						break
					case 'ventorImg':
						this.handleIframeMask(true)
						this.insertVectorGraphDiaVis = true
						break
					case 'delSign':
						document.all.oframe.InsertTable("Table", 3,2 )
						break
					case 'specialSymbol':
						document.all.oframe.InsertTable("Table", 3,2 )
						break
					case 'delAllSign':
						document.all.oframe.InsertTable("Table", 3,2 )
						break
					case 'allDiseaseProgress':
						document.all.oframe.InsertTable("Table", 3,2 )
						break
					case 'allDiseaseProgress':
						document.all.oframe.InsertTable("Table", 3,2 )
						break
					case 'print':
						handleActiveX.printDoc()
						break
					case 'continuePrint':
						// TODO 这里的参数需要配置
						handleActiveX.printDocByLine(true, true, 1, 1, 1, 1, 1)
						break
					case 'choosePrint': //选择续打
                        var r = confirm("续打时要包含页眉信息?")
                        if (r == true) {
                            handleActiveX.previewDocBySelect2(true)
                        } else {
                            handleActiveX.previewDocBySelect2(false)
                        }
                        break
					case 'printPreview':
						handleActiveX.printPreview()
						break
					case 'writeMode':
						this.writingMode = 'writing'
						this.handleIframeMask(false)
						handleActiveX.setDocMode('writing')
						Evtbus.$emit('updateDocWriteMode', this.writingMode)
						break
					case 'unCleaningMode':
						this.writingMode = 'unCleaning'
						this.handleIframeMask(false)
						handleActiveX.setDocMode('unCleaning')
						Evtbus.$emit('updateDocWriteMode', this.writingMode)
						break
					case 'cleaningMode':
						this.writingMode = 'cleaning'
						this.handleIframeMask(false)
						handleActiveX.setDocMode('cleaning')
						Evtbus.$emit('updateDocWriteMode', this.writingMode)
						break
					case 'secretMode':
						this.writingMode = 'secretary'
						this.handleIframeMask(false)
						handleActiveX.setDocMode('secretary')
						Evtbus.$emit('updateDocWriteMode', this.writingMode)
						break
					default:
						break
				}
			},
			handleSaveAsPersonal () {
				if (!handleActiveX.tools.docHasChanged()) {
					this.handleIframeMask(true)
					this.saveToPersonalDiaVis = true
				} else {
					this.$message.warning('请先保存文档')
				}				
			},
			handleImportClinicalData () {
				this.handleIframeMask(true)
				this.clinicalDataDiaVis = true
			},
			handleSaveDoc () {
				if (!Evtbus.objectId) { // 当前不存在可操作性的Object
					this.$message.error('请选择病历')
					return
				}
				this.SAVE_AUTHRITY_CHECK({
					visit_Id: this.patientInfo.VISIT_ID
				}).then((res) => {
					if (res.code === 1) {
						// 可以保存
						this.actionSaveRypg()
						this.actionDocHasChanged()
						this.actionIsGroupDisgnosis()
					} else {
						this.$message.error(res.msg)
					}
				})
			},
			handleBackMain () {
				this.self.showTree = false
				Evtbus.$emit('OutActiveXTab')
			},
			handleDelRegion () {
				// office控件有bug，点击region小句柄再删除会导致上一个区域，只有点击区域内才能正确删除
				const region = handleActiveX.getCurrentRegion()
				if (!region) {
					this.$message.error('请先选择要删除的区域')
					return
				}
				this.iframeShow = true
				this.iframe = document.getElementsByClassName('cover-object')[0]
				setTimeout(() => {
					this.iframe.style.left = `0px`
					this.iframe.style.top = `0px`
					this.iframe.style.width = `100vw`
					this.iframe.style.height = `100vh`
				}, 200)
				this.$confirm('确定要删除该区域吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消'
				}).then(() => {
					handleActiveX.delRegion(region, 3)
					this.iframeShow = false
				}).catch(() => {
					this.iframeShow = false
				})
			},
			handleUpdatePatient () {
				this.GET_PATIENT_INFO({
					visitId: this.patientInfo.VISIT_ID
				}).then((res) => {
					if (res.code === 1) {
						// 更新页面上患者信息
						handleActiveX.tools.fillPatientInfo(res.values[0]) // 替换患者信息
					}
				})
			},
			// 同步
			handleSyncInfo () {
				if (!handleActiveX.getAllSectionCount()) {
					return
				}
				let nowregionname = '', strSectionName = '', listCode = '', RegionName = ''
				if (handleActiveX.getAllRegion()) {
					RegionName = handleActiveX.getAllRegion()
					if (handleActiveX.getCurrentRegion()) {
						nowregionname = handleActiveX.getCurrentRegion()
						strSectionName = handleActiveX.getStructNamesInRegion(nowregionname, 2)
					} else {
						this.$message.error('请选择需要同步的区域病程！')
						return
					}
					listCode = nowregionname.substring(0, 4)
				}
				const args = {
					visit_Id: this.patientInfo.VISIT_ID
				}
				if (listCode) {
					args.listCode = listCode
				}
				if (strSectionName) {
					args.strSectionName = strSectionName
				}
				if (RegionName) {
					args.RegionName = RegionName
				}
				this.MEDISINE_RECORD_SYNC(args).then((res) => {
					if (res.code === 1) {
						handleActiveX.tools.syncContent(this.patientInfo.VISIT_ID, res.values, res.values2, res.values4.split(','), res.values5)
					}
				})
			},
			// 诊断
			handleDiagnosis () {
				const sectionNode = ['S-07-001','S-07-002','S-07-003','S-07-004','S-07-005','S-07-006','S-07-007','S-07-008','S07001','S07002','S07003','S07004','S07005','S07006','S07007','S07008']
				// 获取当前文档的所有节点名
				const strSectionName = handleActiveX.getAllSection()
				// 将所有的节点名截取存到数组中
				const strArray = strSectionName.split(',')
				let ints = 0;
				for (let i = 0; i < strArray.length; i++) {
					if (strArray[i].trim() == "S-07-001" || strArray[i].trim() == "S-07-002" || strArray[i].trim() == "S-07-003" || strArray[i].trim() == "S-07-004" || strArray[i].trim() == "S-07-005" || strArray[i].trim() == "S-07-006" || strArray[i].trim() == "S-07-007" || strArray[i].trim() == "S-07-008") {
						ints = 1
						handleActiveX.setSectionProp(strArray[i].trim(), "EditProtect", "false")
					}
				}
				if (ints === 1) {
					// const currentSection = handleActiveX.getCurrentSection()
					// 打开弹窗
					// if (!sectionNode.includes(currentSection.substr(0,6))) {
					// 	this.$message.error('请先选择数据组')
					// 	return
					// }
					this.diseaseDiagnosisDiaVis = true
					this.handleIframeMask(true)
				} else {
					this.$message.warning('当前文档不存在诊断数据组')
					this.diseaseDiagnosisDiaVis = false
				}
			},
			// 手术
			handleSurgery () {
				// 获取当前文档的所有节点名
				const strSectionName = handleActiveX.getAllSection()
				// 将所有的节点名截取存到数组中
				const strArray = strSectionName.split(',')
				// 判断模板有没有手术名称节点
				let ints = 0
				for (let i = 0; i < strArray.length; i++) {
					if (strArray[i].trim() === "S-94") {
						ints = 1
					}
				}
				if (!ints) {
					this.$message.error('请打开手术相关文档')
					return
				}
				this.operationDiaVis = true
				this.handleIframeMask(true)
			},
			actionInsertSign () {
				this.INSERT_SIGN({
					visit_Id: this.patientInfo.VISIT_ID,
					RegionNames: handleActiveX.getAllRegion() ? handleActiveX.getAllRegion() : ' ',
					ControlName: handleActiveX.getAllNewControl() ? handleActiveX.getAllNewControl() : ' ',
					CurrentRegionName: handleActiveX.getCurrentRegion() ? handleActiveX.getCurrentRegion() : ' ',
					UserId: this.userInfo.UserId,
					UserName: this.userInfo.UserName,
					DepCode: this.userInfo.DepCode,
					RoleValue: this.userInfo.RoleValue,
					isMarkName: this.userInfo.isMarkName
				}).then((res) => {
					if (res.code === 1) {
						if (res.values) {
							handleActiveX.insertNewControl(res.values, res.values.split('--')[1], 3)
						}
						if (res.image) {
							handleActiveX.insertSign(res.image)
						}
						handleActiveX.setControlProp(res.values, "DelFlag", "TRUE")
						handleActiveX.setControlProp(res.values, "EditProtect", "TRUE")
						handleActiveX.setControlProp(res.values, "Edge", "FALSE")
						handleActiveX.setControlProp(res.values, "IsNotRecordInXML", "FALSE")
						handleActiveX.setControlProp(res.values, "Printable", "TRUE")
					} else {
						this.$message.error(res.msg)
					}
				})
			},
			// 插入上级医师签名
			actionInsertLeaderSign (leaderAccount) {
				this.INSERT_LEADER_SIGN({
					leaderID: leaderAccount.name,
					pw: leaderAccount.pw,
					visit_Id: this.patientInfo.VISIT_ID,
					RegionNames: handleActiveX.getAllRegion() ? handleActiveX.getAllRegion() : ' ',
					ControlName: handleActiveX.getAllNewControl() ? handleActiveX.getAllNewControl() : ' ',
					CurrentRegionName: handleActiveX.getCurrentRegion() ? handleActiveX.getCurrentRegion() : ' ',
					DepCode: this.userInfo.DepCode,
					WorkApplication: this.workBenchID
				}).then((res) => {
					if (res.code === 1) {
						if (res.values) {
							handleActiveX.insertNewControl(res.values, res.values.split('--')[1], 3)
						}
						if (res.image) {
							handleActiveX.insertSign(res.image)
						}
						handleActiveX.setControlProp(res.values, "DelFlag", "TRUE")
						handleActiveX.setControlProp(res.values, "EditProtect", "TRUE")
						handleActiveX.setControlProp(res.values, "Edge", "FALSE")
						handleActiveX.setControlProp(res.values, "IsNotRecordInXML", "FALSE")
						handleActiveX.setControlProp(res.values, "Printable", "TRUE")
					} else {
						this.$message.error(res.msg)
					}
				})
			},
			// 插入矢量图
			actionInsertVectorGraph (vectorGraphUrl) {
				// 插入矢量图
			},
			actionSaveRypg () {
				this.SAVE_RYPG({
					visit_Id: this.patientInfo.VISIT_ID,
					MR_CODE: this.medisineOperationItem.code
				})
			},
			actionDocHasChanged () {
				if (this.medisineOperationItem.filePath.indexOf('Template') > -1) { // 如果是新建病程产生的文件则不需要去服务器检查
					return
				}
				this.DOC_HAS_CHANGED({
					openFileTime: moment(this.medisineOperationItem.openTime).format("YYYY-MM-DD HH:mm:ss"),
					fileCode: this.medisineOperationItem.filePath.split('//')[1].split('.')[0],
					visit_Id: this.patientInfo.VISIT_ID
				}).then((res) => {
					if (res.code === 2) {
						// code === 2 表明服务器上的文档已经有更改，要重新打开文档，之前的更改要全部丢掉
						this.$message.warning(res.msg)
					} else if (res.code == 1) {
						// code === 1 会返回入院时间，需要通过axNsoControl.GetAllControlNameByCurrentDoc()方法获得，名为'1000001128'控件的时间
						this.getDocAllControl(res.values)
					}
				})
			},
			actionIsGroupDisgnosis () {
				if (this.medisineOperationItem.filePath.indexOf('Template') > -1) { // 如果是新建病程产生的文件则不需要去服务器检查
					this.docStr = handleActiveX.saveToString()
					this.actionSaveDocByString()
					return
				}
				this.IS_GROUP_DIAGNOSIS({
					visit_Id: this.patientInfo.VISIT_ID,
					Mr_Code: this.medisineOperationItem.code,
					fileCode: this.medisineOperationItem.filePath.split('//')[1].split('.')[0]
				}).then((res) => {
					if (res.code === 2) {
						// 属于会诊类别，弹出会诊记录申请单对话框
					} else {
						// 可以进行文档保存，先文件上传
						this.docStr = handleActiveX.saveToString()
						this.actionSaveDocByString()
					}
				})
			},
			actionSaveDocByString () {
				if (!this.docStr) {
					this.$message.warning('缺少文档流')
					return
				}
				const args = {
					streamStr: this.docStr,
					deptID: this.deptID,
					mr_code: this.medisineOperationItem.code,
					list_code: this.medisineOperationItem.code2,
					visitId: this.patientInfo.VISIT_ID,
					filetype: 2,
					filepath: this.medisineOperationItem.filePath.split('//')[0],
					isUpdate: this.medisineOperationItem.filePath.indexOf('Template') > -1 ? 0 : 1// 0 新增 1 更新
				}
				if (args.isUpdate === 1) {
					args.updateFileName = this.medisineOperationItem.filePath.split('//')[1].replace('.odt', '')
				}
				this.UploadFileInfoByString = args
				this.SAVE_DOC_BY_STRING(args).then((res) => {
					if (res.code === 1) {
						this.actionSaveDocData(res.values)
					} else {
						this.$message.error('数据流保存失败')
					}
				})
			},
			actionSaveDocData (fileCode) {
				this.actionGetSection() // 值存储在this.submitSection中
				this.actionGetControl() // 值存储在this.submitControl中
				const args = {
					type: 1, // 0 新增；1：修改；下面会做判断，根据情况来更改值
					fileStream: this.docStr,
					strXML: handleActiveX.getStructXml("AllUserProp_CS2C", "Reserve,Reserve2,IsChecked"), // 文本xml
					DataGroup: this.submitSection, // 所有数据组
					DataElement: this.submitControl, // 所有数据元
					sa: handleActiveX.obj.GetRegionNamesWithPostil(),
					s1: handleActiveX.obj.GetRecensionInfoByRequiment("", "", 100, this.DateTime.MinValue, this.DateTime.MaxValue),
					region: handleActiveX.getAllRegion(),
					visit_Id: this.patientInfo.VISIT_ID,
					Mr_Code: this.medisineOperationItem.code,
					capion_Date_Time: this.medisineOperationItem.capion_Date_Time, //标题时间
					listcode: this.medisineOperationItem.code2,
					fileCode: fileCode,
					userid: this.userInfo.UserId,
					username: this.userInfo.UserName,
					deptcode: this.deptID
				}
				if (this.userRole.isMarkName) {
					args.isMarkName = this.userRole.isMarkName
				}
				if (this.userRole.RoleValue) {
					args.RoleValue = this.userRole.RoleValue
				}
				if (this.userRole.HousemanName) {
					args.HousemanName = this.userRole.HousemanName
				}
				if (this.userRole.HouseMan) {
					args.HouseMan = this.userRole.HouseMan
				}
				// args.type的值要根据情况来判断
				if (this.medisineOperationItem.filePath.indexOf('Template') > -1) {
					args.type = 0
				} else {
					// 如果是修改文档，改传第一个region的名称（如：0407-normal-02）
					const allRegion = handleActiveX.getAllRegion()
					if (allRegion) {
						args.listcode = allRegion.split(',').length > 0 ? allRegion.split(',')[0].split('-')[0] : ''
					}
				}
				this.showArgs = args
				this.SAVE_DOC_DATA(args).then((res) => {
					if (res.code === 1) {
						this.$message.success('保存成功')
						// 把标签中的'*'号去掉，如果是新增还要在标题上加上时间, 0 新增；1：修改
						if (args.type === 0) {
							Evtbus.$emit('replaceTabStar', {
								saveTime: res.values2
							})
							// 更新medisineOperationItem的相关字段，只有新增的时候才要更新
							this.UPDATE_MEDISINE_OPERATION_ITEM({
								filePath: res.values,
								title: this.medisineOperationItem.title + res.values2,
								label: this.medisineOperationItem.label + res.values2,
								capion_Date_Time: res.values2
							})
						} else {
							Evtbus.$emit('replaceTabStar')
						}
						// 更新左侧病历树
						Evtbus.$emit('updateMedisineRecordTree')
					} else {
						this.$message.error(res.msg)
					}
				})
			},
			// 获取页面上所有的数据组(section)
			actionGetSection () {
				this.submitSection = []
				const sections = handleActiveX.getAllSection()
				const sectionArr = sections.split(',')
				sectionArr.forEach((item, index) => {
					this.submitSection.push({
						sectionTitle: handleActiveX.getSectionProp(item, 'HelpTip'),
						sectionContent: handleActiveX.getSectionText(item),
						sectionCode: item,
						isCheck: false // 数据组中没有checkbox
					})
				})
			},
			// 获取页面上所有的数据元(newControl)
			actionGetControl () {
				this.submitControl = []
				const controls = handleActiveX.getAllNewControl()
				const controlsArr = controls.split(',')
				if (!controls) return
				controlsArr.forEach((item, index) => {
					this.submitControl.push({
						sectionTitle: handleActiveX.getNewControlProp(item, 'HelpTip'),
						sectionContent: handleActiveX.getNewControlText(item),
						sectionCode: item,
						isCheck: handleActiveX.tools.inCheckboxList(this.activeXCheckbox, item) ? handleActiveX.getCheckboxStatus(item) : false
					})
				})
			},
			// 获取页面上所有的区域(region)
			actionGetAllRegion () {
				const regions = handleActiveX.getAllRegion()
				if (!regions) return
				const regionArr = regions.split(',')
				regionArr.forEach((item, index) => {
					this.submitRegion.push({
						regionTitle: item,
						regionText: handleActiveX.getRegionText(item)
					})
				})
			},
			getDocAllControl (inDate) {
				this.docAllControl = handleActiveX.getAllNewControl()
				this.docAllControl.split(',').forEach(item => {
					if (item.indexOf('1000001128') > -1) {
						const docRecordTime = handleActiveX.getNewControlText(item)
						// 如果控件时间小于入院时间则报错
						if (new Date(docRecordTime).getTime() < new Date(inDate).getTime()) {
							// TODO 文本随意写的，具体控件上这个时间是什么时间
							this.$message.error('病历时间不能小于入院时间')
						}
					}
				})
			}
		},
		destroyed () {
			// 移除事件监听，防止重复执行
			Evtbus.$off('initActiveXObject')
			Evtbus.$off('showIframe')
			Evtbus.$off('updateWriteMode')
			Evtbus.$off('showDocHandleBtn')
		}
	}
</script>

<style lang="scss" scoped>
	.activex-hanlder-container {
		border: 1px solid #E8EAED;
		background-color: white;
		padding: 5px;
		margin-bottom: 5px;
		.handler-item {
			display: inline-block;
			margin-right: 15px;
		}
		.img-btn {
			width: 25px;
			margin-right: 5px;
		}
		.cover-object{
			position: fixed;
			width: 0;
			height: 0;
			left: 0px;
			top: 0px;
			z-index: 11;
		}
		/deep/ .el-button {
			padding-top: 5px;
			padding-bottom: 5px;
		}
	}
</style>
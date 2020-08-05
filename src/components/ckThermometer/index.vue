<template>
	<div class="temperature-chart-container">
		<div id="temperature"></div>
		<div class="operation">
			<el-button type="text" @click="handlePreWeek">上一周</el-button>
			<el-button type="text" @click="handleNextWeek">下一周</el-button>
		</div>
		<!-- <span class="x-axis">X轴</span>
		<span class="y-axis">y轴</span>
		<span class="original">(0, 0)</span> -->
	</div>
</template>

<script type="text/javascript">
	import zrender from 'zrender'
	import moment from 'moment'
	import { realData, pluseMark, temperatureMark, topAxisData, dayInerval, everyMonthDays } from './data/chartData'
	import { DrawUtil, createCircle, addHover, isLeapYear, createLine } from './utils/utils'

	export default {
		name: 'TempertureChart',
		props: ['temperatureSheetData'],
		data () {
			return {
				xLineLen: {
					day: 7, // 天数 7天, x轴被分成几大块
					time: 6 // 一天多少分段
				},
				canavsWidth: 0, // 画板宽度，会动态获取
				canavsHeight: 0, // 画板高度，会动态获取
				zr: '', // 画板
				yLineLen: {
					XRegion: 9, // y轴坐标分几个大块
					XShare: 5, // 每块份几个小块
					XLineArr: [4] // 需要特殊处理的横线 冲上往下算
				},
				coordinateOptions: {
					leftLines: 2, // 左侧坐标轴列数
					topLines: 4, // 顶部指示性说明行数
					bottomLines: 7, // 底部页尾行数
					width: 50, // 坐标轴左侧竖线刻度之间距离
					height: 30 // 坐标轴顶部横线刻度之间距离
				},
				caption: { // 体温单抬头
					title: '****第一人民医院',
					subTitle: '体温单',
					patientInfo: {
						name: '王勇',
						age: 60,
						gender: '男',
						department: '呼吸科',
						bedNo: '37-01',
						inDate: '2020-2-3', // 入院日期
						mdsRecord: '121-24'
					},
					height: [50, 40, 30],
					captionHeight: 0
				},
				topAxisData: '',
				switchSymbol: 'next',
				allArmpitDot: [], // 所有腋窝温度点
				allMouthDot: [], // 所有口腔温度点
				allAnuDot: [], // 所有肛温点
				allPulseDot: [] // 所有脉搏点
			}
		},
		computed: {
			// x轴每一格的宽度
			xCellWidth () {
				return (this.canavsWidth - this.coordinateOptions.leftLines * this.coordinateOptions.width) / (this.xLineLen.day * this.xLineLen.time)
			},
			// y轴每一格的宽度
			yCellWidth () {
				return (this.canavsHeight - (this.coordinateOptions.topLines + this.coordinateOptions.bottomLines) * this.coordinateOptions.height - this.caption.captionHeight) / (this.yLineLen.XRegion * this.yLineLen.XShare)
			}
		},
		created () {
			let height = 0
			this.caption.height.forEach((item) => {
				height += item
			})
			this.caption.captionHeight = height
			// this.getPatientInDate() // 原来是在这里执行的
		},
		mounted () {
			// this.init()
		},
		watch: {
			'temperatureSheetData' (newVal, oldVal) {
				if (newVal && (newVal || newVal.FirstDay !== oldVal.FirstDay)) {
					this.zr && this.zr.clear()
					// console.log('val执行', newVal.perfectData)
					this.getPatientInDate()
					this.actionRelaceData()
					this.init()
					// this.drawCharts()
				}
			}
		},
		methods: {
			getPatientInDate () {
				this.topAxisData = {
					inDate: this.temperatureSheetData.FirstDay ? moment(this.temperatureSheetData.FirstDay).format('YYYY/MM/DD') : '2012/7/8', // 起始日期
					inDateTime: '14:05:00', // 起始时间
					outDate: '',
					outDateTime: '',
					operationDate: '2012/8/28', // 手术日期
					operationDateTime: '14:38:36' // 手术时间
				}
				this.topAxisData.switchDate = this.topAxisData.inDate
			},
			createTag () {
				const div = document.createElement('div')
				div.classList.add('tips')
				document.getElementById('temperature').appendChild(div)
			},
			init () {
				this.allArmpitDot = []
				this.allMouthDot = []
				this.allAnuDot = []
				this.allPulseDot = []
				this.zr = zrender.init(document.getElementById('temperature'))
				this.canavsWidth = this.zr.getWidth()
				this.canavsHeight = this.zr.getHeight()
				this.drawCharts()
			},
			drawCharts () {
				this.createCoordinate() // 生成坐标轴及其刻度
				this.yLine() // 生成Y轴坐标(竖线)
				this.xLine() // 生成X轴坐标(横线)
				this.createTag()
			},
			createCoordinate () {
				this.createCaptionAxis() // 创建抬头
				this.createTopAxis() // 创建顶部横轴
				this.createLeftAxis() // 创建左侧纵轴
				this.createBottomAxis() // 创建底部横轴
			},
			createCaptionAxis () {
				const style = {
					textFill: 'black'
				}
				const XlineOne = new zrender.Line({
					shape: {
						x1: 0,
						y1: 0,
						x2: this.canavsWidth,
						y2: 0
					},
					style: {
						lineWidth: 0.3
					}
				})
				const XlineTwo = new zrender.Line({
					shape: {
						x1: 0,
						y1: this.caption.height[0],
						x2: this.canavsWidth,
						y2: this.caption.height[0]
					},
					style: {
						lineWidth: 0.3
					}
				})
				const XlineThree = new zrender.Line({
					shape: {
						x1: 0,
						y1: this.caption.height[0] + this.caption.height[1],
						x2: this.canavsWidth,
						y2: this.caption.height[0] + this.caption.height[1]
					},
					style: {
						lineWidth: 0.3
					}
				})
				const XlineFour = new zrender.Line({
					shape: {
						x1: 0,
						y1: this.caption.height[0] + this.caption.height[1] + this.caption.height[2],
						x2: this.canavsWidth,
						y2: this.caption.height[0] + this.caption.height[1] + this.caption.height[2]
					},
					style: {
						lineWidth: 0.3
					}
				})
				this.zr.add(XlineOne)
				this.zr.add(XlineTwo)
				this.zr.add(XlineThree)
				this.zr.add(XlineFour)
				const patientInfo = `姓名：${this.caption.patientInfo.name}  年龄：${this.caption.patientInfo.age}  性别：${this.caption.patientInfo.gender}  科室：${this.caption.patientInfo.department}  床号：${this.caption.patientInfo.bedNo}  入院日期：${this.caption.patientInfo.inDate}  病历号：${this.caption.patientInfo.mdsRecord}`
				DrawUtil.drawHorizontalText(this.zr, this.caption.title, this.canavsWidth / 2 - 200, 12, {
					fontSize: 26,
					...style
				})
				DrawUtil.drawHorizontalText(this.zr, this.caption.subTitle, this.canavsWidth / 2 - 120, this.caption.height[0] + 10, {
					fontSize: 20,
					...style
				})
				DrawUtil.drawHorizontalText(this.zr, patientInfo, 0, this.caption.height[0] + this.caption.height[1] + 10, {
					fontSize: 14,
					...style
				})
			},
			createTopAxis () {
				const style = {
					textFill: 'black',
					letterSpacing: '10'
				}
				const baseDistance = this.coordinateOptions.width * this.coordinateOptions.leftLines
				const distance = (this.canavsWidth - this.coordinateOptions.width * this.coordinateOptions.leftLines) / this.xLineLen.day
				const subDistance = (this.canavsWidth - this.coordinateOptions.width * this.coordinateOptions.leftLines) / (this.xLineLen.day * this.xLineLen.time)
				// 创建坐标轴顶部横线
				for (let i = 0; i < 5; i++) {
					const XlineOne = new zrender.Line({
						shape: {
							x1: 0,
							y1: i * this.coordinateOptions.height + this.caption.captionHeight,
							x2: this.canavsWidth,
							y2: i * this.coordinateOptions.height + this.caption.captionHeight
						}
					})
					this.zr.add(XlineOne)
					DrawUtil.drawHorizontalText(this.zr, '日期', 10, this.caption.captionHeight + 10, style)
					DrawUtil.drawHorizontalText(this.zr, '住院天数', 10, this.caption.captionHeight + 40, style)
					DrawUtil.drawHorizontalText(this.zr, '手术后天数', 10, this.caption.captionHeight + 70, style)
					DrawUtil.drawHorizontalText(this.zr, '时间', 10, this.caption.captionHeight + 100, style)
				}
				// 渲染时间
				for (let i = 0; i < this.xLineLen.day; i++) {
					dayInerval.forEach((sitem, sindex) => {
						DrawUtil.drawHorizontalText(this.zr, sitem, baseDistance + sindex * subDistance + i * distance + DrawUtil.calcMiniDistance(sindex), this.caption.captionHeight + 100, style)
					})
				}
				this.renderTopAxisDate()
			},
			// 渲染顶部日期，住院天数以及手术后天数
			renderTopAxisDate () {
				let weekDay = null
				const style = {
					textFill: 'black',
					letterSpacing: '10'
				}
				const baseDistance = this.coordinateOptions.width * this.coordinateOptions.leftLines
				const distance = (this.canavsWidth - this.coordinateOptions.width * this.coordinateOptions.leftLines) / this.xLineLen.day
				if (this.switchSymbol === 'next') {
					weekDay = this.getWeekDay(this.topAxisData.switchDate)
				}
				if (this.switchSymbol === 'pre') {
					this.topAxisData.switchDate = this.getPreWeekDay(this.topAxisData.switchDate)
					weekDay = this.getWeekDay(this.getPreWeekDay(this.topAxisData.switchDate))
				}
				// 把坐标轴顶部横线内数据渲染进去
				this.topAxisData.switchDate = weekDay[this.xLineLen.day]
				for (let i = 0; i < this.xLineLen.day; i++) {
					// 渲染当天日期
					DrawUtil.drawHorizontalText(this.zr, weekDay[i], baseDistance + distance / 4 + i * distance, this.caption.captionHeight + 10, style)
					// 渲染当天是入院的第几天
					DrawUtil.drawHorizontalText(this.zr, this.calcInDays(this.topAxisData.inDate, weekDay[i]), baseDistance + distance / 2.5 + i * distance, this.caption.captionHeight + 40, style)
					// 渲染当天是手术后的第几天
					if (new Date(weekDay[i]).getTime() >= new Date(this.topAxisData.operationDate).getTime()) {
						DrawUtil.drawHorizontalText(this.zr, this.calcInDays(this.topAxisData.operationDate, weekDay[i]), baseDistance + distance / 2.5 + i * distance, this.caption.captionHeight + 70, style)
					}
					// 渲染温度节点
					this.renderDataNode(weekDay[i], i)
				}
			},
			// 往前计算两周，得到第一天的日期，由于接口给的数据跟当初设计的不一致，所以这里往前推算的日期发生更改，原来需要往前推算两周，现在不需要了
			getPreWeekDay (begin) {
				const date = new Date(new Date(begin).getTime() - this.xLineLen.day * 0 * 24 * 60 * 60 * 1000)
				return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
			},
			// 往后计算一周
			getWeekDay (begin) {
				const weekDay = []
				for (let i = 0; i <= this.xLineLen.day; i++) {
					weekDay.push(this.calcDate(begin, i))
				}
				return weekDay
			},
			calcInDays (inDate, nowDate) {
				return (new Date(nowDate).getTime() - new Date(inDate).getTime()) / (24 * 60 * 60 * 1000) + 1
			},
			calcDate (date, i) {
				const dateArr = this.topAxisData.switchDate.split('/')
				if (isLeapYear(dateArr[0])) {
					everyMonthDays[1] = 29
				}
				dateArr[2] = Number(dateArr[2]) + Number(i)
				if (dateArr[2] > everyMonthDays[dateArr[1] - 1]) {
					dateArr[2] -= everyMonthDays[dateArr[1] - 1]
					if (Number(dateArr[1]) === 12) {
						dateArr[1] = 1
						dateArr[0] = Number(dateArr[0]) + 1
					} else {
						dateArr[1] = Number(dateArr[1]) + 1
					}
				}
				return dateArr.join('/')
			},
			createLeftAxis () {
				// 第一条竖线
				const XlineOne = new zrender.Line({
					shape: {
						x1: 0,
						y1: this.caption.captionHeight,
						x2: 0,
						y2: this.canavsHeight
					}
				})
				this.zr.add(XlineOne)
				// 第二条竖线
				const XlineTwo = new zrender.Line({
					shape: {
						x1: this.coordinateOptions.width,
						y1: this.coordinateOptions.height * this.coordinateOptions.topLines + this.caption.captionHeight,
						x2: this.coordinateOptions.width,
						y2: this.canavsHeight - this.coordinateOptions.height * this.coordinateOptions.bottomLines
					},
					style: {
						stroke: '#ff0000'
					}
				})
				this.zr.add(XlineTwo)
				// 第三条竖线
				const XlineThree = new zrender.Line({
					shape: {
						x1: this.coordinateOptions.width * this.coordinateOptions.leftLines,
						y1: this.caption.captionHeight,
						x2: this.coordinateOptions.width * this.coordinateOptions.leftLines,
						y2: this.canavsHeight
					}
				})
				this.zr.add(XlineThree)
				// 文本(脉搏)
				const textPluse = new zrender.Text({
					style: {
						text: '脉搏\n(次/分)',
						fontSize: 14,
						textFill: '#FF4949',
						textBackgroundColor: '#FFF'
					}
				})
				textPluse.attr('position', [4, this.caption.captionHeight + this.coordinateOptions.height * this.coordinateOptions.topLines + 3])
				this.zr.add(textPluse)
				// 文本(体温)
				const textTemperature = new zrender.Text({
					style: {
						text: '体温\n(°C)',
						fontSize: 14,
						textFill: 'black',
						textBackgroundColor: '#FFF'
					}
				})
				textTemperature.attr('position', [60, this.caption.captionHeight + this.coordinateOptions.height * this.coordinateOptions.topLines + 3])
				this.zr.add(textTemperature)
				this.createMark(pluseMark, 'pluse') // 生成脉搏刻度
				this.createMark(temperatureMark, 'temperature') // 生成体温刻度
			},
			createBottomAxis () {
				const style = {
					textFill: 'black',
					letterSpacing: '10'
				}
				const baseYPos = this.canavsHeight - this.coordinateOptions.height * this.coordinateOptions.bottomLines + 10
				let name = ''
				const baseDistance = this.coordinateOptions.width * this.coordinateOptions.leftLines
				const distance = (this.canavsWidth - this.coordinateOptions.width * this.coordinateOptions.leftLines) / this.xLineLen.day
				// 创建坐标轴底部横线
				for (let i = 0; i < 8; i++) {
					const y = baseYPos + this.coordinateOptions.height * i
					const XlineOne = new zrender.Line({
						shape: {
							x1: 0,
							y1: this.canavsHeight - i * this.coordinateOptions.height,
							x2: this.canavsWidth,
							y2: this.canavsHeight - i * this.coordinateOptions.height
						}
					})
					this.zr.add(XlineOne)
					switch (i) {
						case 0:
							name = '大便(次/日)'
							break
						case 1:
							name = '体重(Kg)'
							break
						case 2:
							name = '皮试2'
							break
						case 3:
							name = '血氧饱和度(%)'
							break
						case 4:
							name = '血压(mmHg)'
							break
						case 5:
							name = '负压引流(ml)'
							break
						case 6:
							name = 'SACAS'
							break
					}
					DrawUtil.drawHorizontalText(this.zr, name, 5, y, style)
				}
				const topAxisData = this.temperatureSheetData.axiosData
				// 把坐标轴底部横线内数据渲染进去
				topAxisData.forEach((item, index) => {
					DrawUtil.drawHorizontalText(this.zr, item.excretion, baseDistance + distance / 2.5 + index * distance, baseYPos + this.coordinateOptions.height * 0, style)
					DrawUtil.drawHorizontalText(this.zr, item.weight, baseDistance + distance / 2.5 + index * distance, baseYPos + this.coordinateOptions.height * 1, style)
					DrawUtil.drawHorizontalText(this.zr, item.skinTest, baseDistance + distance / 2.5 + index * distance, baseYPos + this.coordinateOptions.height * 2, style)
					DrawUtil.drawHorizontalText(this.zr, `${item.bloodOxygen.f} | ${item.bloodOxygen.s}`, baseDistance + distance / 3 + index * distance, baseYPos + this.coordinateOptions.height * 3, style)
					DrawUtil.drawHorizontalText(this.zr, `${item.bloodPress.up} | ${item.bloodPress.down}`, baseDistance + distance / 3 + index * distance, baseYPos + this.coordinateOptions.height * 4, style)
					DrawUtil.drawHorizontalText(this.zr, item.vsd, baseDistance + distance / 2.5 + index * distance, baseYPos + this.coordinateOptions.height * 5, style)
					DrawUtil.drawHorizontalText(this.zr, item.sacas, baseDistance + distance / 2.5 + index * distance, baseYPos + this.coordinateOptions.height * 6, style)
				})
			},
			createMark (data, type) {
				let colour = 'red'
				let x = 4
				if (type === 'temperature') {
					colour = 'black'
					x = 65
				}
				const gridHeight = this.canavsHeight - this.caption.captionHeight - this.coordinateOptions.height * (this.coordinateOptions.topLines + this.coordinateOptions.bottomLines)
				const bigCellHeight = gridHeight / this.yLineLen.XRegion - 1.4 // 减1.4是为了消除线型宽度导致的一点误差
				const baseYPos = this.canavsHeight - gridHeight - this.coordinateOptions.height * this.coordinateOptions.bottomLines
				data.forEach((item, index) => {
					const mark = new zrender.Text({
						style: {
							text: item,
							fontSize: 14,
							textFill: colour,
							textBackgroundColor: '#FFF'
						}
					})
					const y = baseYPos + bigCellHeight * (index + 1)
					mark.attr('position', [x, y])
					this.zr.add(mark)
				})
			},
			yLine () {
				const Xline = new zrender.Line({
					shape: {
						x1: 0,
						y1: this.canavsHeight,
						x2: this.canavsWidth,
						y2: this.canavsHeight
					}
				})
				this.zr.add(Xline)
				const Yline = new zrender.Line({
					shape: {
						x1: this.canavsWidth,
						y1: this.caption.captionHeight,
						x2: this.canavsWidth,
						y2: this.canavsHeight
					}
				})
				this.zr.add(Yline)
				const yWidth = (this.canavsWidth - this.coordinateOptions.width * this.coordinateOptions.leftLines) / this.xLineLen.day
				// 循环显示竖线格子(大格子)
				for (let i = 0; i < this.xLineLen.day; i++) {
					// 纵坐标
					const Yline = new zrender.Line({
						shape: {
							x1: yWidth * i + this.coordinateOptions.width * this.coordinateOptions.leftLines,
							y1: this.caption.captionHeight,
							x2: yWidth * i + this.coordinateOptions.width * this.coordinateOptions.leftLines,
							y2: this.canavsHeight
						},
						style: {
							opacity: 1,
							lineWidth: 1,
							stroke: i === 0 ? 'black' : '#ff0000'
						}
					})
					this.zr.add(Yline)
				}
				// 循环生成小格子
				const yLinAll = this.xLineLen.day * this.xLineLen.time
				for (let i = 0; i < yLinAll; i++) {
					const Yline = new zrender.Line({
						shape: {
							x1: yWidth / this.xLineLen.time * i + this.coordinateOptions.width * this.coordinateOptions.leftLines,
							y1: this.coordinateOptions.height * (this.coordinateOptions.topLines - 1) + this.caption.captionHeight,
							x2: yWidth / this.xLineLen.time * i + this.coordinateOptions.width * this.coordinateOptions.leftLines,
							y2: this.canavsHeight - this.coordinateOptions.height * this.coordinateOptions.bottomLines
						},
						style: {
							opacity: 1,
							lineWidth: 0.3,
							stroke: '#000'
						}
					})
					this.zr.add(Yline)
				}
			},
			xLine () {
				const xHeight = (this.canavsHeight - this.caption.captionHeight - this.coordinateOptions.height * (this.coordinateOptions.topLines + this.coordinateOptions.bottomLines)) / this.yLineLen.XRegion
				const XShareAll = this.yLineLen.XRegion * this.yLineLen.XShare
				// 循环显示横线格子(大格子)
				for (let i = 0; i < this.yLineLen.XRegion; i++) {
					let color = '#000'
					this.yLineLen.XLineArr.forEach((el) => {
						if (el === i) {
							color = '#ff0000'
						}
					})
					// 横坐标 加粗
					const Xline = new zrender.Line({
						shape: {
							x1: this.coordinateOptions.width * this.coordinateOptions.leftLines,
							y1: xHeight * i + this.coordinateOptions.height * this.coordinateOptions.topLines + this.caption.captionHeight,
							x2: this.canavsWidth,
							y2: xHeight * i + this.coordinateOptions.height * this.coordinateOptions.topLines + this.caption.captionHeight
						},
						style: {
							opacity: 1,
							lineWidth: 1,
							stroke: color
						}
					})
					this.zr.add(Xline)
				}
				// 循环生成小格子
				for (let a = 0; a < XShareAll; a++) {
					// 横坐标
					const Xline = new zrender.Line({
						shape: {
							x1: this.coordinateOptions.width * this.coordinateOptions.leftLines,
							y1: xHeight / this.yLineLen.XShare * a + this.coordinateOptions.height * this.coordinateOptions.topLines + this.caption.captionHeight,
							x2: this.canavsWidth,
							y2: xHeight / this.yLineLen.XShare * a + this.coordinateOptions.height * this.coordinateOptions.topLines + this.caption.captionHeight
						},
						style: {
							opacity: 1,
							lineWidth: 0.5,
							stroke: '#000'
						}
					})
					this.zr.add(Xline)
				}
			},
			renderDataNode (date, pos) { // 渲染数据节点
				// const data = realData // MOCK数据
				const data = this.temperatureSheetData.perfectData
				data.forEach((item) => {
					// 判断是否有这天
					if (new Date(item.MeasuringDate).getTime() === new Date(date).getTime()) {
						if (item.ARMPIT) {
							const getX = this.getX(item, pos)
							const getY = this.transformY('temperature', item.ARMPIT, 1)
							const Circle = createCircle(getX, getY, 5, {
								fill: 'transparent',
								stroke: 'blue'
							})
							this.zr.add(Circle)
							addHover(Circle, {
								tips: `腋温: ${item.ARMPIT}`
							}, getX, getY, {
								r: 8
							}, {
								r: 5
							})
							this.allArmpitDot.push({
								x: getX,
								y: getY
							})
						}
						if (item.MOUTH) {
							const getX = this.getX(item, pos)
							const getY = this.transformY('temperature', item.MOUTH, 1)
							const Circle = createCircle(getX, getY, 5, {
								fill: 'blue'
							})
							this.zr.add(Circle)
							addHover(Circle, {
								tips: `口温: ${item.MOUTH}`
							}, getX, getY, {
								r: 8
							}, {
								r: 5
							})
							this.allMouthDot.push({
								x: getX,
								y: getY
							})
						}
						if (item.ANUS) {
							const getX = this.getX(item, pos)
							const getY = this.transformY('temperature', item.ANUS, 1)
							const Circle = createCircle(getX, getY, 5, {
								fill: 'transparent',
								stroke: 'blue'
							})
							this.zr.add(Circle)
							addHover(Circle, {
								tips: `肛温: ${item.ANUS}`
							}, getX, getY, {
								r: 8
							}, {
								r: 5
							})
							this.allAnuDot.push({
								x: getX,
								y: getY
							})
						}
						if (item.PULSE) {
							const getX = this.getX(item, pos)
							const getY = this.transformY('pulse', item.PULSE, 1)
							const Circle = createCircle(getX, getY, 5, {
								fill: 'red',
								stroke: 'transparent'
							})
							this.zr.add(Circle)
							addHover(Circle, {
								tips: `脉搏: ${item.PULSE}`
							}, getX, getY, {
								r: 8
							}, {
								r: 5
							})
							this.allPulseDot.push({
								x: getX,
								y: getY
							})
						}
					}
				})
				this.renderLineBetweenDot(this.allArmpitDot, {
					stroke: 'blue',
					lineWidth: 1
				})
				this.renderLineBetweenDot(this.allMouthDot, {
					stroke: 'blue',
					lineWidth: 1
				})
				this.renderLineBetweenDot(this.allAnuDot, {
					stroke: 'blue',
					lineWidth: 1
				})
				this.renderLineBetweenDot(this.allPulseDot, {
					stroke: 'red',
					lineWidth: 1
				})
			},
			renderLineBetweenDot (dotArray, style) {
				const len = dotArray.length
				dotArray.forEach((item, index) => {
					const firtDot = dotArray[index]
					const secondDot = dotArray[index + 1 >= len ? index : index + 1]
					const line = createLine(firtDot.x, firtDot.y, secondDot.x, secondDot.y, style)
					this.zr.add(line)
				})
			},
			getX (data, index) {
				const XWidth = this.XShareOne()
				const surplusWidth = XWidth + this.xCellWidth * dayInerval.indexOf(data.ORDERTIME) + index * this.xCellWidth * this.xLineLen.time + this.xCellWidth / 2
				return surplusWidth
			},
			// 转换y轴坐标点为正确坐标点 因为y轴坐标是顶点为0递增的 所有用总高度减去原来坐标的高度剩下的高度就是正确坐标点
			// i代表一个格子代表几个高度
			transformY (type, data, i) {
				const YHeight = this.YShareOne()
				let surplusHeight = ''
				surplusHeight = YHeight - (data - 34) * 5 * this.yCellWidth
				if (type === 'pulse') {
					surplusHeight = YHeight - (data / 20 - 1) * 5 * this.yCellWidth
				}
				return surplusHeight
			},
			XShareOne () {
				return this.coordinateOptions.leftLines * this.coordinateOptions.width
			},
			YShareOne () {
				return this.canavsHeight - this.coordinateOptions.bottomLines * this.coordinateOptions.height
			},
			handlePreWeek () {
				// const distance = Math.abs((new Date(this.topAxisData.switchDate).getTime() - new Date(this.topAxisData.inDate).getTime()) / (24 * 60 * 60 * 1000))
				// if (distance <= this.xLineLen.day) {
				// 	alert('无上一页')
				// 	return
				// }
				// 触发接口重新加载数据，传递上一周的起始日期
				this.$emit('actionGetTemperatureData', new Date(this.temperatureSheetData.FirstDay).getTime() - 24 * 60 * 60 * 1000)
				this.switchSymbol = 'pre'
				// this.zr.clear()
				// this.init()
			},
			handleNextWeek () {
				// 触发接口重新加载数据，传递下一周的起始日期
				this.$emit('actionGetTemperatureData', new Date(this.temperatureSheetData.LastDay).getTime() + 24 * 60 * 60 * 1000)
				this.switchSymbol = 'next'
				// this.zr.clear()
				// this.init()
			},
			actionRelaceData () {
				this.caption.patientInfo.name = this.temperatureSheetData.UserName
				this.caption.patientInfo.age = this.temperatureSheetData.UserAge
				this.caption.patientInfo.gender = this.temperatureSheetData.UserSex
				this.caption.patientInfo.department = this.temperatureSheetData.UserSex
				this.caption.patientInfo.bedNo = this.temperatureSheetData.UserBedNo
				this.caption.patientInfo.inDate = this.temperatureSheetData.VisitInto
				this.caption.patientInfo.mdsRecord = this.temperatureSheetData.strYM.split('|')[6]
			}
		}
	}
</script>

<style lang="scss" scoped>
	.temperature-chart-container {
		// width: 1230px;
		width: 100%;
		height: 1330px;
		position: relative;
		.operation {
			position: absolute;
			top: 17px;
			left: 15px;
		}
		.x-axis, .y-axis, .original {
			position: absolute;
		}
		.x-axis {
			top: -12px;
			right: -30px;
		}
		.y-axis {
			bottom: -21px;
			left: -12px;
		}
		.original {
			left: -17px;
			top: -16px;
		}
	}
	#temperature {
		// width: 1200px;
		width: 100%;
		height: 1300px;
		padding: 15px;
		position: relative;
		background-color: white;
	}
	canvas{
		width: 100%;
		height: 700px;
	}
</style>

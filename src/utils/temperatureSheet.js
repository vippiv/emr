import moment from 'moment'
import { deepCopy } from './utils'

const handleTemperatureSheetData = {
	dealTw (data) {
		const timeDistance = [2, 6, 10, 14, 18, 22]
		const perfectData = []
		let tw = data.tw && data.tw.length > 1 ? String(data.tw).split(',') : ''
		let mb = data.mb && data.mb.length > 1 ? String(data.mb).split(',') : ''
		const dataTpl = {
			MeasuringDate: '', // 日期
			ORDERTIME: null, // 录入时间
			MOUTH: null, // 口温
			ARMPIT: null, // 腋温
			ANUS: null, // 肛温
			PULSE: null, // 脉搏
			HEARTBEAT: null, // 起博心跳
			BREATHING: '0', // 呼吸
			FEVER: null, // 高热降温
			ISRISE: '0', // 体温不升
			REMARKS: null, // 备注
			TEMPERATURE: '拒测' // 体温未测
		}
		// 七天循环
		for(let i = 0; i < 7; i++) {		
			timeDistance.forEach(dis => {
				let baseData = deepCopy(dataTpl)
				baseData.MeasuringDate = moment(new Date(new Date(data.FirstDay).getTime() + (i * 24 * 60 * 60 * 1000))).format('YYYY/MM/DD')
				baseData.ORDERTIME = dis
				// 体温数据处理
				tw && tw.forEach(dayItem => {
					// dayItem -> '4:10:0|36.3'
					let temperatureDayTimeData = dayItem.split(':')
					let temperature = temperatureDayTimeData[2].split('|') // 温度数据，temperature[0], 0 -> 口温 1 -> 腋温， 2-> 肛温
					if (parseInt(temperatureDayTimeData[0], 10) === parseInt(i, 10) + 1 && parseInt(temperatureDayTimeData[1], 10) === parseInt(dis, 10)) {
						if (parseInt(temperature[0], 10) === 0) {
							baseData.MOUTH = temperature[1] // 口温
						}
						if (parseInt(temperature[0], 10) === 1) {
							baseData.ARMPIT = temperature[1] // 腋温
						}
						if (parseInt(temperature[0], 10) === 1) {
							baseData.ANUS = temperature[1] // 肛温
						}
					}
				})
				// 脉搏数据处理
				mb && mb.forEach(mbItem => {
					// mbItem -> '4:10:100'
					let mbDayTimeData = mbItem.split(':')
					// 只有天数和i值相等时才更新对应数据，mbDayTimeData[0]代表第几天，mbDayTimeData[1]代表几点
					if (parseInt(mbDayTimeData[0], 10) === parseInt(i, 10) + 1 && parseInt(dis, 10) === parseInt(mbDayTimeData[1], 10)) {
						baseData.PULSE = mbDayTimeData[2]
					}
				})
				perfectData.push(baseData)
			})
		}
		return perfectData
	},
	dealAxiosData (data) {
		const timeDistance = [2, 6, 10, 14, 18, 22]
		const perfectData = []
		// 坐标轴数据模板
		const axiosData = {
			date: '',
			inHosptailDays: 10,
			operationDays: 1,
			dayInerval: [2, 6, 10, 14, 18, 22],
			excretion: '', // 大便
			weight: '', // 体重
			skinTest: '', // 皮试2
			bloodOxygen: { // 血氧饱和度
				f: '',
				s: ''
			},
			bloodPress: { // 血压
				up: '',
				down: ''
			},
			vsd: '', // 负压引流
			sacas: '' // SACAS
		}
		// 七天循环
		for(let i = 0; i < 7; i++) {
			let baseData = deepCopy(axiosData)
			baseData.date = moment(new Date(new Date(data.FirstDay).getTime() + (i * 24 * 60 * 60 * 1000))).format('YYYY/MM/DD')
			data.ZIDUAN.forEach(item => {
				item.forEach(subItem => {
					let subItemContent = subItem.split(':')
					if (parseInt(subItemContent[0], 10) === parseInt(i, 10)) {
						if (subItemContent[1].indexOf('大便') > -1) {
							baseData.excretion = subItemContent[2]
						} else if (subItemContent[1].indexOf('负压引流') > -1) {
							baseData.vsd = subItemContent[2]
						} else if (subItemContent[1].indexOf('皮试1') > -1) {
							// baseData.vsd = subItemContent[2]
						} else if (subItemContent[1].indexOf('皮试2') > -1) {
							baseData.skinTest = subItemContent[2]
						} else if (subItemContent[1].indexOf('体重') > -1) {
							baseData.weight = subItemContent[2]
						}
						
					}
				})
			})
			perfectData.push(baseData)
		}
		return perfectData
	}
}

export default handleTemperatureSheetData

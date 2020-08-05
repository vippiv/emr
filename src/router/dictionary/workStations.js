import * as urls from '../routePath'

const workStations = {
	1001: {
		text: '基础数据维护',
		path: urls.BASE,
		imgCls: 'base'
	},
	1101: {
		text: '病历模板维护工作站',
		path: '',
		imgCls: '',
		hidden: true
	},
	2001: {
		text: '住院医生工作站',
		path: urls.RESIDENT,
		imgCls: 'resident'
	},
	3001: {
		text: '门诊医生工作站',
		path: urls.OUTPATIENT,
		imgCls: 'outpatient'
	},
	4001: {
		text: '科室质控工作站',
		path: '',
		imgCls: '',
		hidden: true
	},
	5001: {
		text: '住院质控工作站',
		path: '',
		imgCls: '',
		hidden: true
	},
	6001: {
		text: '电子病案管理系统',
		path: '',
		imgCls: '',
		hidden: true
	},
	7001: {
		text: '病历浏览工作站',
		path: '',
		imgCls: '',
		hidden: true
	},
	8001: {
		text: '病历维护工作站',
		path: '',
		imgCls: '',
		hidden: true
	},
	9001: {
		text: '病案借阅工作站',
		path: '',
		imgCls: '',
		hidden: true
	},
	'A001': {
		text: '住院护士工作站',
		path: urls.NURSE,
		imgCls: 'nurse'
	},
	'B001': {
		text: '会诊工作站',
		path: '',
		imgCls: '',
		hidden: true
	},
	'C001': {
		text: '院感工作站',
		path: '',
		imgCls: '',
		hidden: true
	},
	'D001': {
		text: '手术科室工作站',
		path: '',
		imgCls: '',
		hidden: true
	}
}

export default workStations

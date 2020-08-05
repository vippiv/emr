import * as urls from '../routePath'

// 住院护士工作站
const nurseEmergency = () => import('@/views/residentNurse/emergency/index.vue') // 急诊内科
const emergencyRecordDetail = () => import('@/views/residentNurse/emergency/detail.vue') // 急诊内科病历详情

const routes = [
	{
		name: 'nurseEmergency',
		path: `${urls.NURSE_EMERGENCY}`,
		meta: {
			title: '急诊内科'
		},
		component: nurseEmergency
	},
	{
		name: 'emergencyRecordDetail',
		path: `${urls.NURSE_EMERGENCY_DETAIL}`,
		meta: {
			title: '病历详情',
			hidden: true
		},
		component: emergencyRecordDetail
	}
]

export default routes

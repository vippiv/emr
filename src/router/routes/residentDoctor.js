import * as urls from '../routePath'

// 住院医生工作站
const residentialDoctor = () => import('@/views/residentDoctor/respiratory/index.vue') // 住院医生

const respiratoryMedicine = () => import('@/views/residentDoctor/respiratory/index.vue') // 呼吸内科

const routes = [
	{
		name: 'residentialDcotor',
		path: `${urls.RESIDENT_DOCTOR}`,
		meta: {
			title: '住院医生'
		},
		component: residentialDoctor
	}
]

export default routes

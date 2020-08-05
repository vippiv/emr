import * as urls from './routePath'
import baseRoutes from './routes/base' // 基础数据维护
import residentDoctorRoutes from './routes/residentDoctor' // 住院医生工作站
import residentNurseRoutes from './routes/residentNurse' // 住院护士工作站

// 基础数据维护中间页
const baseMiddlePage = () => import('@/views/base/middlePage.vue')

// 住院医生工作站中间页
const residentDoctorMiddlePage = () => import('@/views/residentDoctor/middlePage.vue')

// 门诊医生工作站中间页
const outPatientMiddlePage = () => import('@/views/outPatient/middlePage.vue')

// 住院护士工作站中间页
const residentNurseMiddlePage = () => import('@/views/residentNurse/middlePage.vue')

const menu = [
    {
        path: urls.BASE,
        meta: {
            title: '基础数据维护',
            icon: 'icon-nav-base'
        },
        component: baseMiddlePage,
        children: [
            ...baseRoutes
        ]
    },
    {
        path: urls.RESIDENT,
        meta: {
        title: '住院医生工作站',
            icon: 'icon-nav-sale'
        },
        component: residentDoctorMiddlePage,
        children: [
            ...residentDoctorRoutes
        ]
    },
    {
        path: urls.OUTPATIENT,
        meta: {
            title: '门诊医生工作站',
            icon: 'icon-nav-product'
        },
        component: outPatientMiddlePage,
        children: []
    },
    {
        path: urls.NURSE,
        meta: {
            title: '住院护士工作站',
            icon: 'icon-nav-order-check'
        },
        component: residentNurseMiddlePage,
        children: [
            ...residentNurseRoutes
        ]
    }
]

export default menu

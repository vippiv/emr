import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import getters from './getters'
import global from './module/global'
import login from './module/login'
import syncManage from './module/syncManage'
import backenManage from './module/backenManage'
import baseConfigure from './module/baseConfigure'
import tempManage from './module/tempManage'
import personMain from './module/personMain'
import systemManage from './module/systemManage'
import residentDoctor from './module/residentDoctor'
import residentNurse from './module/residentNurse'

Vue.use(Vuex)
const store = new Vuex.Store({
    strict: process.env.NODE_ENV !== 'prod',
    getters,
    modules: {
        global,
        login,
        syncManage,
        backenManage,
        baseConfigure,
        tempManage,
        personMain,
        systemManage,
        residentDoctor,
        residentNurse
    },
    plugins: [createPersistedState()]
})

export default store

import ckPagination from './ckPagination'
import ckMainNav from './ckMainNav'
import ckBtn from './ckBtn'
import ckImgBtn from './ckImgBtn'
import ckInput from './ckForm/ckInput'
import ckRadio from './ckForm/ckRadio'
import ckCheckbox from './ckForm/ckCheckbox'
import ckYmd from './ckForm/ckYmd'
import ckAddress from './ckForm/ckAddress'
import ckThermometer from './ckThermometer'
import ElTree from './ckTree'

const loadComponents = {
  install (Vue) {
    Vue.component('ckPagination', ckPagination)
    Vue.component('ckMainNav', ckMainNav)
    Vue.component('ckBtn', ckBtn)
    Vue.component('ckImgBtn', ckImgBtn)
    Vue.component('ckInput', ckInput)
    Vue.component('ckRadio', ckRadio)
    Vue.component('ckCheckbox', ckCheckbox)
    Vue.component('ckYmd', ckYmd)
    Vue.component('ckAddress', ckAddress)
    Vue.component('ckThermometer', ckThermometer)
    Vue.component('ElTrees', ElTree)
  }
}
export default loadComponents

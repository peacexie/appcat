import Vue from 'vue'
import App from './App'
import ureq from '@/common/ureq'
import tool from '@/common/tool'
import store from '@/common/store'

Vue.config.productionTip = false

Vue.prototype.$ureq = ureq
Vue.prototype.$tool = tool
Vue.prototype.$store = store
//Vue.prototype.$city = uni.getStorageSync('city') || 'dg';

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()

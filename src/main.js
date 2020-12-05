/*
 * @Description:
 * @Author: xiaobai
 * @Date: 2020-12-03 16:35:48
 * @LastEditTime: 2020-12-05 14:27:16
 * @LastEditors: Please set LastEditors
 * @Reference:
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'

// 导入样式
import './assets/css/global.css'

import axios from 'axios'
axios.defaults.baseURL = 'https://www.liulongbin.top:8888/api/private/v1/'
Vue.prototype.$http = axios

Vue.config.productionTip = false

/** eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

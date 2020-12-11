/*
 * @Description:
 * @Author: xiaobai
 * @Date: 2020-12-03 16:35:48
 * @LastEditTime: 2020-12-10 18:32:41
 * @LastEditors: Please set LastEditors
 * @Reference:
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'

// 导入样式
import './assets/css/global.css'
import TreeTable from 'vue-table-with-tree-grid'

import axios from 'axios'
// 配置请求的根路径
axios.defaults.baseURL = 'https://www.liulongbin.top:8888/api/private/v1/'
// axios 请求拦截
axios.interceptors.request.use(config => {
  // console.log(config)
  // 为请求头对象添加 token 验证的 Authorization 字段
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // 在最后必须 return config
  return config
})
Vue.prototype.$http = axios

Vue.config.productionTip = false

Vue.component('tree-table', TreeTable)

/** eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

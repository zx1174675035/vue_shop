/*
 * @Description:
 * @Author: xiaobai
 * @Date: 2020-12-03 16:35:48
 * @LastEditTime: 2020-12-20 15:49:41
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

// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
// 导入富文本编辑器样式
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme

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
// 将富文本编辑器注册为全局可用组件
Vue.use(VueQuillEditor)
Vue.component('tree-table', TreeTable)

/**
 * 格式化时间
 */
Vue.filter('dateFormart', function (originVue) {
  const dt = new Date(originVue * 1000)

  const y = dt.getFullYear()
  // padStart(2, "0") ---> 是否满足两位数，不满足则在前面添加0
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')

  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')

  return `${y}-${m}-${d}-${hh}-${mm}-${ss}`
})

/** eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

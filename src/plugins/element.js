/*
 * @Description:
 * @Author: xiaobai
 * @Date: 2020-12-03 16:38:27
 * @LastEditTime: 2020-12-05 14:45:51
 * @LastEditors: Please set LastEditors
 * @Reference:
 */
import Vue from 'vue'
import { Form, FormItem, Button, Input, Message } from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
// 挂载弹窗提示组件
Vue.prototype.$message = Message

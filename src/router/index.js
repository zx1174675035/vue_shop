/*
 * @Description:
 * @Author: xiaobai
 * @Date: 2020-12-03 16:35:48
 * @LastEditTime: 2020-12-05 19:10:16
 * @LastEditors: Please set LastEditors
 * @Reference:
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    { path: '/home', component: Home }
  ]
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to: 将要访问的路径
  // from：代表从哪个路径而来
  // next：是一个函数，表示放行
  //      next() 放行   next('/login') 强制跳转
  if (to.path === '/login') return next()
  // 获取 token
  const tokenStr = window.sessionStorage.getItem('token')
  // 没有 token 则强制跳转登录页面
  if (!tokenStr) return next('/login')
  next()
})

export default router

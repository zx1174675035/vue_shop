<!--
 * @Description:
 * @Author: xiaobai
 * @Date: 2020-12-05 18:34:45
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-05 20:23:47
 * @Reference:
-->

<template>
  <div>
    <el-button
      type="info"
      @click="logout"
    >退出</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    logout () {
      // window.sessionStorage.clear()
      // 清空token
      window.sessionStorage.removeItem('token')
      // 跳转到登录页面
      this.$router.push('/login')
    }
  }
}
</script>
<style lang="less" scoped>
</style>

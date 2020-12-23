<!--
 * @Description: 数据报表
 * @Author: xiaobai
 * @Date: 2020-12-23 21:47:50
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-23 22:30:15
 * @Reference:
-->
<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      <el-breadcrumb-item>数据报表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 2、为 ECharts 准备一个具备大小（宽高）的 DOM -->
      <div
        id="main"
        style="width: 800px;height:400px;"
      ></div>
    </el-card>
  </div>
</template>
<script>
// 1、导入 echarts.js
// import echarts from 'echarts'
import * as echarts from 'echarts'
import _ from 'lodash'
export default {
  data () {
    return {
      options: {
        title: {
          text: '用户来源'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#E9EEF3'
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            boundaryGap: false
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ]
      }
    }
  },
  created () { },
  // 此时页面上的元素都渲染完毕
  async mounted () {
    // var main = this.$refs.chart

    // 3、基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'))
    const { data: res } = await this.$http.get('reports/type/1')
    if (res.meta.status !== 200) {
      return this.$message.error('获取折线图数据失败！')
    }

    // 4、准备数据的配置项
    const result = _.merge(res.data, this.options)

    // 5、展示数据
    myChart.setOption(result)
  },
  methods: {}
}
</script>
<style lang="less" scoped>
</style>

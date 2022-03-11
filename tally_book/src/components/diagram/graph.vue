<template>
  <div class="diagram_box">
    <div id="diagram" style="width: 450px;height:100%; font-weight: bold; margin-left: 0; padding-left: 0;"></div>
  </div>
</template>

<script>
import judgeYear from '@/lib/judgeYear.js'
import filterAdd from '@/lib/filterAdd'
import { mapState } from 'vuex'

const echarts = require('echarts/lib/echarts')
require('echarts/lib/component/grid')
require('echarts/lib/chart/line')
require('echarts/lib/component/title')

export default {
  name: 'graph',

  data() {
    return {
      myChart: null,
      xAxisData: [],
      yAxisData: []
    }
  },

  props: ['year', 'month', 'type', 'isCut'],

  watch: {
    type(newVal, oldVal) {
      var arr = null

      // 月图表
      if (this.isCut === true) {
        arr = this.everyday(newVal, this.year, this.month, this.recordMoneyData)
        this.xAxisData = arr.dayArr
        this.yAxisData = arr.dayDataArr
      } else {
        arr = this.monthly(newVal, this.year, this.recordMoneyData)
        this.xAxisData = arr.monthArr
        this.yAxisData = arr.monthDataArr
      }
      this.echartsInit()
    },

    isCut(newVal, oldVal) {
      var arr = null

      // 月图表
      if (newVal === true) {
        arr = this.everyday(this.type, this.year, this.month, this.recordMoneyData)
        this.xAxisData = arr.dayArr
        this.yAxisData = arr.dayDataArr
      } else {
        arr = this.monthly(this.type, this.year, this.recordMoneyData)
        this.xAxisData = arr.monthArr
        this.yAxisData = arr.monthDataArr
      }
      this.echartsInit()
    },

    year(newVal, oldVal) {
      var arr = this.monthly(this.type, newVal, this.recordMoneyData)
      this.xAxisData = arr.monthArr
      this.yAxisData = arr.monthDataArr
      this.echartsInit()
    }
  },

  computed: {
    // 将this.$store.state.recordModule.recordMoneyData 变为 this.recordMoneyData
    ...mapState('recordModule', ['recordMoneyData'])
  },

  activated() {
    var arr = this.everyday('-', this.year, this.month, this.recordMoneyData)
    this.xAxisData = arr.dayArr
    this.yAxisData = arr.dayDataArr

    this.$nextTick(() => {
      this.echartsInit()
    })
  },

  methods: {
    echartsInit() {
      if (this.myChart === null) {
        this.myChart = echarts.init(document.getElementById('diagram'))
      } else {
        this.myChart.dispose()
        this.myChart = echarts.init(document.getElementById('diagram'))
      }
      var option = {
        title: {
          text: `${this.year}年${this.isCut ? this.month + '月' : ''}${this.type === '-' ? '支出' : '收入'}`
        },
        xAxis: {
          type: 'category',
          data: this.xAxisData
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: this.yAxisData,
            type: 'line'
          }
        ]
      }
      this.myChart.setOption(option)
    },

    // 某月中每天的支出或收入情况
    everyday(sgin, year, month, arr) {
      var len = judgeYear(year, month)
      var day = '01'
      var dayArr = []
      var dayDataArr = []

      for (var i = 1; i <= len; i++) {
        if (i < 10) {
          day = '0' + i.toString()
        } else {
          day = i.toString()
        }
        dayArr[i - 1] = i
        dayDataArr[i - 1] = filterAdd(sgin, (year + '-' + month + '-' + day), arr)
      }

      return {
        dayArr: dayArr,
        dayDataArr: dayDataArr
      }
    },

    // 某年中每个月的支出或收入情况
    monthly(sgin, year, arr) {
      var month = '01'
      var monthArr = []
      var monthDataArr = []

      for (var i = 1; i <= 12; i++) {
        if (i < 10) {
          month = '0' + i.toString()
        } else {
          month = i.toString()
        }

        monthArr[i - 1] = i
        monthDataArr[i - 1] = filterAdd(sgin, (year + '-' + month), arr)
      }

      return {
        monthArr: monthArr,
        monthDataArr: monthDataArr
      }
    }
  }
}
</script>

<style scoped>
.diagram_box { width: 100%; height: 280px; background-color: #fff; margin-top: 24px; margin-left: 0; padding-left: 0; overflow-x: auto; overflow-y: hidden; }
</style>

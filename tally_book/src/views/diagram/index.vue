<template>
  <div id="chart">
    <!-- 标题 -->
    <nav>
      <div>
        <i class="iconfont icon-quxiao" @click="leaveHandler"></i>
        <span>账单详情</span>
        <div></div>
      </div>
    </nav>

    <!-- 月支出与收入 -->
    <diagramDetail
      :year="year" :month="month" :type="moneyType" :isCut='isCut'
      @yearAlter='yearAlterHandler'
      @thisYear='thisYearHandler'
    >
    </diagramDetail>

    <!-- 支出与收入图表切换按键 -->
    <div class="button">
      <button class="out_btn" @click="moneyType = '-'">支出</button>
      <button class="in_btn" @click="moneyType = '+'">收入</button>
    </div>

    <!-- 月表与年表切换 -->
    <div class="switchover">
      <div></div>
      <button @click="isCut = !isCut">
        <i class="iconfont icon-jiantou_zuoyouqiehuan"></i>
        <span>{{ isCut ? '切换月账单' : '切换日账单' }}</span>
      </button>
    </div>

    <!-- 图表 -->
    <diagramGraph :type="moneyType" :year="year" :month="month" :isCut='isCut'></diagramGraph>
  </div>
</template>

<script>
import diagramDetail from '../../components/diagram/detail.vue'
import diagramGraph from '../../components/diagram/graph.vue'
import moment from 'moment'

export default {
  name: 'diagram',

  data() {
    return {
      year: moment(new Date()).format('YYYY'),
      month: moment(new Date()).format('MM'),
      moneyType: '-',   // - 支出   + 收入
      isCut: true     // true 月图表  false 年图表
    }
  },

  components: {
    diagramDetail,
    diagramGraph
  },

  destroyed() {
    this.leaveHandler()
  },

  methods: {
    yearAlterHandler(value) {
      this.year = value
    },

    thisYearHandler(value) {
      this.year = value
    },

    leaveHandler() {
      this.year = moment(new Date()).format('YYYY')
      this.month = moment(new Date()).format('MM')
      this.moneyType = '-'
      this.isCut = true
      this.$nextTick(() => {
        this.$router.push('/home')
      })
    }
  }
}
</script>

<style>
#chart nav div { display: flex; justify-content: space-between; padding: 12px 16px; align-items: center; background-color: #ebeffe; }
#chart nav div i { display: block; font-weight: bold; margin-left: 8px; }
#chart nav div span { font-size: 20px; }

#chart .detail { display: flex; flex-direction: column; margin: 25px 10px; background-color: #fff; padding-left: 45px; padding-top: 25px; padding-bottom: 25px; position: relative; border-radius: 25px; }
#chart .detail .date { font-size: 24px; font-weight: bold; margin-bottom: 8px; }
#chart .detail .out span:nth-of-type(1),
#chart .detail .in span:nth-of-type(1) { font-size: 18px; color: #333333; }
#chart .detail .out span:nth-of-type(2),
#chart .detail .in span:nth-of-type(2) { font-size: 16px; color: gray; }

#chart .button { display: flex; justify-content: center; align-items: center; }
#chart .button .out_btn,
#chart .button .in_btn { height: 30px; width: 70px; border: none; outline: none; background-color: #f60; border-radius: 20px; color: #fff; margin: 2px 18px; font-size: 18px; }
#chart .switchover { margin-top: 20px; display: flex; justify-content: space-between;flex-direction: row; }
#chart .switchover button { margin-right: 25px; outline: none; border: none; color: #f60; background-color: #f5f4f9; font-size: 16px; }
</style>

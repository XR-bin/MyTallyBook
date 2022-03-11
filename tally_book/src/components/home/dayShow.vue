<template>
  <!-- 今日支出记录 -->
  <div class="list_box">
    <!-- 今日支出收入金额 -->
    <h3 class="nav">
      <span>今日支出</span>
      <span>￥{{ dayExpend }}</span>
      <span>收入</span>
      <span>￥{{ dayEarning }}</span>
    </h3>
    <!-- 今日支出收入记录列表 -->
    <ul class="list">
      <li v-for="(item, index) in dayArr" :key="index">
        <span class="label">
          <span>{{ item.label.join('，') }}</span>
          <span>{{ item.notes }}</span>
        </span>
        <span class="money">
          <span>{{item.type}}</span>
          <span>￥</span>
          <span>{{ item.sum.toFixed(1) }}</span>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import filterAdd from '@/lib/filterAdd'

export default {
  name: 'dayShow',

  props: {
    today: {
      type: String,
      default: '2020-01-01'
    }
  },

  computed: {
    // 将this.$store.state.recordModule.recordMoneyData 变为 this.recordMoneyData
    ...mapState('recordModule', ['recordMoneyData']),

    // 支出
    dayExpend() {
      return filterAdd('-', this.today, this.recordMoneyData)
    },

    // 收入
    dayEarning() {
      return filterAdd('+', this.today, this.recordMoneyData)
    },

    dayArr() {
      return this.recordMoneyData.filter(item => item.date.indexOf(this.today) >= 0)
    }
  }
}
</script>

<style scoped>
/* 今日支出记录 */
.list_box { margin-top: 10px; }
/* 今日支出收入金额 */
.list_box .nav { font-size: 1.12em; text-align: center; margin-bottom: 16px ; }
/* 今日支出收入记录列表 */
.list_box .list { height: 48vh; overflow: auto; }
.list_box .list li { display: flex; justify-content: space-between; margin: 0px 12px 8px 12px; padding: 10px; background-color: #fff; border-radius: 15px; }
.list_box .list li .label { display: flex; flex-direction: column; width: 75%; font-size: 18px; padding-left: 10px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis; }
.list_box .list li .label span:nth-of-type(2) { font-size: 14px; color: #afafaf; overflow: hidden; white-space: nowrap; text-overflow:ellipsis; }
.list_box .list li .money { display: flex; justify-content: center; align-items: center; font-size: 16px; }
</style>

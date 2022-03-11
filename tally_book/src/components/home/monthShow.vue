<template>
  <div class="show container">
    <div class="show_box container">
      <div class="out">
        <span>本月支出</span>
        <span>￥{{monthExpend}}</span>
      </div>
      <div class="in">
        <span>本月收入</span>
        <span>￥{{monthEarning}}</span>
      </div>
      <router-link tag="a" to="/diagram" class="show_link">查看图表分析</router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import filterAdd from '@/lib/filterAdd'

export default {
  name: 'monthShow',

  props: {
    month: {
      type: String,
      default: '2020-01'
    }
  },

  computed: {
    // 将this.$store.state.recordModule.recordMoneyData 变为 this.recordMoneyData
    ...mapState('recordModule', ['recordMoneyData']),

    // 支出
    monthExpend() {
      return filterAdd('-', this.month, this.recordMoneyData)
    },

    // 收入
    monthEarning() {
      return filterAdd('+', this.month, this.recordMoneyData)
    }
  }
}
</script>

<style scoped>
/* 本月收入支出 */
.show { display:flex; justify-content: center; align-items: center; }
.show .show_box { width: 85%; height: 22vh; flex-wrap: wrap; position: relative; background-color: #fff; border-radius: 20px; }
.show .show_box .out { position: absolute; left: 14%; top: 20%; }
.show .show_box .in { position: absolute; right: 18%; top: 20%; }
.show .show_box .out span:nth-of-type(1),
.show .show_box .in span:nth-of-type(1) { font-size: 14px; color: #9b9b9b; }
.show .show_box .out span:nth-of-type(2),
.show .show_box .in span:nth-of-type(2) { position: absolute; left: -20px; top: 20px; font-size: 28px; width: 120px; }
.show .show_box .show_link { position: absolute; bottom: 15%; font-size: 14px; color: #0f9570; }
</style>

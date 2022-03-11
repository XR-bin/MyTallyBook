<template>
  <div id="home">
    <!-- 头部标题 -->
    <nav>记账本</nav>

    <!-- 本月支出与收入栏 -->
    <homeMonth :month='month'></homeMonth>

    <!-- 今日支出记录 -->
    <homeDay :today='today'></homeDay>

    <!-- 记账按键 -->
    <router-link tag='button' to="/record" class="record_btn">
      记一笔
    </router-link>
  </div>
</template>

<script>
import homeMonth from '../../components/home/monthShow.vue'
import homeDay from '../../components/home/dayShow.vue'
import moment from 'moment'

export default {
  data() {
    return {
      today: moment(new Date()).format('YYYY-MM-DD'),
      month: moment(new Date()).format('YYYY-MM')
    }
  },

  components: {
    homeMonth,
    homeDay
  }
}
</script>

<style scoped>
/* 标题 */
#home nav { display: flex; justify-content: space-between; padding: 10px 16px; background-color: #ebeff2; margin-bottom: 14px; font-size: 20px; align-items:center; font-weight: bold; }

/* 记账按键 */
#home .record_btn { border: none; outline: none; height: 43px; width: 123px; border-radius: 20px; background-color: #f60; position: absolute; right: 26px; color: #fff; bottom: 10px; }
</style>

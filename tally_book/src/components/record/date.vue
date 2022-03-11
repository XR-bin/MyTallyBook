<template>
  <label class="date_box">
    <span>请选择日期：</span><input type="date" v-model="dateValue" @change="changeHandler" />
  </label>
</template>

<script>
import moment from 'moment'
export default {
  name: 'recordDate',

  data() {
    return {
      dateValue: moment(new Date()).format('YYYY-MM-DD')
    }
  },

  methods: {
    changeHandler() {
      this.$emit('date', this.dateValue)
    }
  }
}
</script>

<style>
/* 日期选择 */
.date_box { width: 100%; margin: 20px 0px; background-color: #fff; display: inline-block; border-radius: 25px; }
.date_box span { font-size: 18px; font-weight: bold; padding: 0px 2px 0px 25px; }
.date_box input { border: 1px solid rgba(0,0,0,.5); background-color: #fff; }
</style>

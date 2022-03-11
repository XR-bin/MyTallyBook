<template>
  <div class="sum_box">
    <label class="sum">
      <input type="number" v-model="moneyValue" @blur="blurHandler" />
      <div class="sum_show">
        <span>金额</span>
        <div>￥{{ moneyValue }}</div>
      </div>
    </label>
  </div>
</template>

<script>
export default {
  name: 'record_sum',

  data() {
    return {
      moneyValue: '0'
    }
  },

  props: {
    sumValue: {
      type: String,
      default: '0'
    }
  },

  watch: {
    moneyValue(newVal, oldVal) {
      if (oldVal === '0') {
        if (newVal.substr(1, 1) !== '.') {
          newVal = newVal.substr(1, 1)
        }
      }

      var reg = /^(\d{0,6})(\.(\d{0,1}))?$/g
      if (!reg.test(newVal)) {
        this.moneyValue = oldVal
      } else {
        if (newVal === '') {
          this.moneyValue = '0'
          return
        }
        this.moneyValue = newVal
      }
    },

    // 接受父组件传来得数据(用于清除操作)
    sumValue(newVal, oldVal) {
      if (newVal !== this.moneyValue) {
        this.moneyValue = newVal
      }
    }
  },

  methods: {
    // 向外面抛出数据
    blurHandler() {
      this.$emit('sum', this.moneyValue)
    }
  }
}
</script>

<style scoped>
/* 记录金额 */
.sum_box { width: 100%; height: 60px; margin-top: 10px; position: relative; text-align: center; }
.sum_box .sum {  height: 100%; background-color: #fff; margin: 0px 10px; border-radius: 25px; }
.sum_box .sum .sum_show { width: 100%; border-radius: 25px; display: flex; justify-content: space-between; align-items: center; background-color: #fff; position: absolute; top: 0; }
.sum_box .sum .sum_show span { display: inline-block; font-size: 36px; font-weight: bold; margin: 0px 30px; }
.sum_box .sum .sum_show div { display: inline-block; font-size: 28px; margin: 0px 40px; }
.sum_box .sum input { border: none; outline: none; }
</style>

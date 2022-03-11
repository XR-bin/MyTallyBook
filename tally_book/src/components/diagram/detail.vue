<template>
  <div>
    <transition name="chronology">
      <div class="chronology" v-show="!isCut && isShow">
        <span>往年数据</span>
        <ul @click="yearSelect($event)">
          <li v-for="(item, index) in yearFilte" :key="index">{{ item }}</li>
        </ul>
      </div>
    </transition>
    <div class="detail">
      <span class="date" v-show="isCut">{{ year }}年{{ month }}月</span>
      <span class="date" v-show="!isCut">{{ year }}年</span>
      <i class="iconfont icon-rili calendar" v-show="!isCut" @click="isShow = !isShow"></i>
      <div class="out">
        <span>支出</span>
        <span>￥{{ monthExpend }}</span>
      </div>
      <div class="in">
        <span>收入</span>
        <span>￥{{ monthEarning }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import filterAdd from '@/lib/filterAdd'
import moment from 'moment'

export default {
  name: 'detail',

  data() {
    return {
      isShow: false
    }
  },

  props: ['year', 'month', 'type', 'isCut'],

  computed: {
    // 将this.$store.state.recordModule.recordMoneyData 变为 this.recordMoneyData
    ...mapState('recordModule', ['recordMoneyData']),

    yearFilte() {
      var arr = []
      arr = this.recordMoneyData.map(item => {
        return Number(item.date.substr(0, 4))
      })
      arr = [...new Set(arr)]
      return arr.sort((a, b) => b - a)
    },

    // 支出
    monthExpend() {
      if (this.isCut) {
        return filterAdd('-', this.year + '-' + this.month, this.recordMoneyData)
      } else {
        return filterAdd('-', this.year, this.recordMoneyData)
      }
    },

    // 收入
    monthEarning() {
      if (this.isCut) {
        return filterAdd('+', this.year + '-' + this.month, this.recordMoneyData)
      } else {
        return filterAdd('+', this.year, this.recordMoneyData)
      }
    }
  },

  watch: {
    isCut(newValue, oldValue) {
      if (newValue) {
        this.isShow = false
        if (this.year !== moment(new Date()).format('YYYY')) {
          this.$emit('thisYear', moment(new Date()).format('YYYY'))
        }
      }
    }
  },

  methods: {
    yearSelect(e) {
      if (e.target.nodeName.toLowerCase() === 'li') {
        this.$emit('yearAlter', e.target.innerHTML)
      }
    }
  }
}
</script>

<style scoped>
.chronology { width: 100%; background-color: #fff;
  display:flex; flex-direction: column; justify-content:center; align-items: center;
  overflow: auto; min-height: 100px;
  margin-top: 12px; padding: 12px 10%;
  position: relative; }
.chronology-enter-active, .chronology-leave-active {
  transition: opacity .8s;
}
.chronology-enter, .chronology-leave-to{
  opacity: 0;
}
.chronology span { font-size: 18px; font-weight: bold; }
.chronology ul {
  width: 300px; height:100px; display: flex; flex-wrap: wrap; margin-top: 10px;
}
.chronology ul li {
  width: 80px; height: 25px; margin: 6px 10px; display: flex; align-items: center; justify-content: center;
}

.chronology ul li.active { background-color: #1989FA; border-radius: 15px; }

.detail { display: flex; flex-direction: column; margin: 25px 10px; background-color: #fff; padding-left: 45px; padding-top: 25px; padding-bottom: 25px; position: relative; border-radius: 25px; }
.detail .date { font-size: 24px; font-weight: bold; margin-bottom: 8px; }
.detail i.calendar { position: absolute; right: 42px; font-size: 28px; font-weight: bold; }
.detail .out span:nth-of-type(1),
.detail .in span:nth-of-type(1) { font-size: 18px; color: #333333; }
.detail .out span:nth-of-type(2),
.detail .in span:nth-of-type(2) { font-size: 16px; color: gray; }
</style>

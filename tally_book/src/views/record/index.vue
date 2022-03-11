<template>
  <div id="record">
    <!-- 标题(金额类型----收入还是支出) -->
    <recordNav @usetype="useType" @leave="leaveHandler"></recordNav>

    <!-- 标签选择 -->
    <recordLabel :tagValue='moneyLabel' @label='labelHandler'></recordLabel>

    <!-- 日期选择 -->
    <recordDate @date='dateHandler'></recordDate>

    <!-- 记录金额 -->
    <recordSum :sumValue='moneySum' @sum='sumHandler'></recordSum>

    <!-- 备注 -->
    <recordNotes :notesValue='moneyNotes' @notes='notesHandler'></recordNotes>

    <!-- 按键 -->
    <div class="set_btn1">
      <button @click="submitHandler">添加一笔</button>
    </div>
    <div class="set_btn2">
      <button @click="clearHandler">全部重置</button>
    </div>

  </div>
</template>

<script>
import recordNav from '../../components/record/nav.vue'
import recordLabel from '../../components/record/label.vue'
import recordSum from '../../components/record/sum.vue'
import recordNotes from '../../components/record/notes.vue'
import recordDate from '../../components/record/date.vue'
import { Toast } from 'vant'
import 'vant/lib/index.css'
import moment from 'moment'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'record',

  data() {
    return {
      moneyType: '-', // 这次记录是收入还是支出， + 收入， -支出
      moneyLabel: [],
      moneyDate: moment(new Date()).format('YYYY-MM-DD'),
      moneySum: '0',
      moneyNotes: ''
    }
  },

  components: {
    recordNav,
    recordLabel,
    recordSum,
    recordNotes,
    recordDate
  },

  computed: {
    // 将this.$store.state.recordModule.recordMoneyData 变为 this.recordMoneyData
    ...mapState('recordModule', ['recordMoneyData'])
  },

  methods: {
    // 决定此次记录是支出还是收入
    useType(value) {
      this.moneyType = value
    },

    // 金额标签
    labelHandler(value) {
      this.moneyLabel = value
    },

    // 金额记录日期
    dateHandler(value) {
      this.moneyDate = value
    },

    // 金额数据
    sumHandler(value) {
      this.moneySum = value
    },

    // 备注数据
    notesHandler(value) {
      this.moneyNotes = value
    },

    // 将this.$store.commit('recordModule/recordSet', 数据) 变为 this.recordSet(数据)
    ...mapMutations('recordModule', ['recordSet']),

    // 提交数据
    submitHandler() {
      if ((this.moneyLabel.length === 0) || (this.moneySum === '0')) {
        Toast('标签或金额不能为空')
        return
      }
      var myData = {
        type: this.moneyType,
        label: this.moneyLabel,
        date: this.moneyDate,
        sum: Number(this.moneySum),
        notes: this.moneyNotes
      }

      this.recordSet(myData)

      this.moneyLabel = []
      this.moneySum = '0'
      this.moneyNotes = ''
      Toast('记录成功')
    },

    // 重置按键的功能
    clearHandler() {
      this.moneyLabel = []
      this.moneySum = '0'
      this.moneyNotes = ''
    },

    leaveHandler() {
      this.moneyLabel = []
      this.moneySum = '0'
      this.moneyNotes = ''
      this.moneyDate = moment(new Date()).format('YYYY-MM-DD')

      this.$nextTick(() => {
        this.$router.push('/home')
      })
    }
  }
}
</script>

<style>
/* 按键 */
#record .set_btn1 { margin-top: 30px; width: 100%; text-align: center; }
#record .set_btn2 { margin-top: 15px; width: 100%; text-align: center; }
#record .set_btn1 button,
#record .set_btn2 button { border: none; outline: none; width: 260px; height: 30px; background-color: #0F9570; color: #fff; font-size: 18px; border-radius: 15px; }
</style>

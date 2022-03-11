<template>
  <label class="notes">
    备注：<input type="text" v-model="moneyText" @blur="blurHandler" />
  </label>
</template>

<script>
export default {
  name: 'recordNotes',

  data() {
    return {
      moneyText: ''
    }
  },

  props: {
    notesValue: {
      type: String,
      default: ''
    }
  },

  watch: {
    // 接受父组件传来得数据(用于清除操作)
    notesValue(newVal, oldVal) {
      if (newVal !== this.moneyText) {
        this.moneyText = newVal
      }
    }
  },

  methods: {
    // 向外面抛出数据
    blurHandler() {
      this.$emit('notes', this.moneyText)
    }
  }
}
</script>

<style scoped>
.notes { display: block; padding-left: 30px; background-color: #fff; margin-top: 22px; line-height: 30px; font-size: 20px; font-weight: 500; }
.notes input { border: none; outline: none; font-size: 16px }
</style>

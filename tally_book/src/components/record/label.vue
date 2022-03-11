<template>
  <div class="label_box">
    <div class="label_list">
      <div v-for="(item, index) in tagList" :key="index" @click="clickHandler($event)">{{ item }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'record_label',

  data() {
    return {
      tagList: ['衣服', '吃饭', '住宿', '水电', '交通', '工作', '购物', '学习', '旅游', '娱乐', '休闲', '外快'],
      outTagList: []
    }
  },

  props: ['tagValue'],

  watch: {
    // 接受父组件传来得数据(用于清除操作)
    tagValue(newVal, oldVal) {
      if (!newVal.length) {
        this.outTagList = newVal
        var oDiv = document.querySelectorAll('.label_list .active')
        for (var i = 0; i < oDiv.length; i++) {
          oDiv[i].className = ''
        }
      }
    }
  },

  methods: {
    clickHandler(e) {
      var oDiv = e.currentTarget
      if (oDiv.className) {
        var i = this.outTagList.indexOf(oDiv.innerHTML)
        this.outTagList.splice(i, 1)
        oDiv.className = ''
      } else {
        if (this.outTagList.length >= 3) {
          return
        }
        this.outTagList.push(oDiv.innerHTML)
        oDiv.className = 'active'
      }

      this.$emit('label', this.outTagList)
    }
  }
}
</script>

<style scoped>
/* 标签选择 */
.label_box { background-color: #fff; padding: 2px 8px; margin: 20px 10px; border-radius: 15px; overflow: auto; }
.label_box .label_list { display: flex; justify-content: flex-start; flex-wrap: wrap; padding: 2px 5px; }
.label_box .label_list div { margin: 8px 3%; width: 19%; text-align: center; }
.label_box .label_list div.active { background-color: #B3D4FC; border-radius: 15px; }
.label_box .label_list div i { font-size: 24px; font-weight: bold; }
</style>

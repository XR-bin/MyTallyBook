<template>
  <nav>
    <div class="title_box">
      <i class="iconfont icon-quxiao" @click="leave"></i>
      <div class="type_btn">
        <span class="active" @click="clickHandler($event)">支出</span>
        <span @click="clickHandler($event)">收入</span>
      </div>
      <div></div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'record_nav',

  methods: {
    clickHandler(e) {
      var oSpen = e.currentTarget
      if (oSpen.innerHTML === '支出') {
        oSpen.className = "active"
        oSpen.parentNode.children[1].className = ''
        this.$emit('usetype', '-')
      } else {
        oSpen.className = "active"
        oSpen.parentNode.children[0].className = ''
        this.$emit('usetype', '+')
      }
    },
    
    leave() {
      this.$emit("leave")
    }
  }
}
</script>

<style scoped>
/* 标题(金额类型----收入还是支出*/
nav .title_box { display: flex; justify-content: space-between; padding: 12px 16px; align-items: center; background-color: #ebeff4; }
nav .title_box i { display: block; font-weight: bold; margin-left: 8px; }
nav .title_box .type_btn { display: inline; }
nav .title_box .type_btn span { font-size: 20px; margin-right: 10px; }
nav .title_box .type_btn span.active { border-bottom: 2px #000 solid; }
</style>

export default {
  namespaced: true,    // 命名空间

  // 公共状态
  // 定义 “全局”状态的对象
  state: {
    recordMoneyData: JSON.parse(window.localStorage.getItem('dataSource')) || []
  },

  // 集中修改状态，可以被监控，能及时发现谁出问题，通过devtools工具的时光旅行功能
  mutations: {
    recordSet(state, recordData) {
      state.recordMoneyData.push(recordData)
      window.localStorage.setItem('dataSource', JSON.stringify(state.recordMoneyData))
    }
  },

  // 专门处理异步
  actions: {
  }
}

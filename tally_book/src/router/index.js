import Vue from 'vue'
import VueRouter from 'vue-router'
import diagramRouter from './page/diagram.js'
import recordRouter from './page/record.js'
import homeRouter from './page/home.js'

Vue.use(VueRouter)
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    diagramRouter,
    recordRouter,
    homeRouter,
    
    // 初始界面默认为home
    {
      path: '',
      redirect: '/diagram'
    },
    // 界面地址错误跳转为home
    {
      path: '*', // *是通配符，优先级是最低的
      redirect: '/diagram'
    }
  ]
})
export default router

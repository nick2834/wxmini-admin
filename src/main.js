import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import router from './router'
import store from './store'
import globalData from 'components/global'
Vue.use(ElementUI)
Vue.prototype.GLOBAL = globalData//挂载到Vue实例上面

router.beforeEach((to, from, next) => {
  let isLogin = sessionStorage.getItem('isLogin')
  let token = sessionStorage.getItem('token')
  if (to.path == '/login') {
    sessionStorage.removeItem('user');
  }
  let user = JSON.parse(sessionStorage.getItem('user'));
  if (!user && to.path != '/login' && to.path != '/apilogin' && to.path != '/callback') {
    next({ path: '/login' })
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import VueLazyload from 'vue-lazyload'
import 'element-ui/lib/theme-chalk/index.css'
import "@/styles/css/base.css"
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueLazyload)
import moment from 'moment'
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


//全局过滤函数
Vue.filter('formatDuration',(dt)=>{
  // 转分
  let min = Math.ceil(dt / 1000 / 60);
  min = min < 10 ? '0' + min : min;
  // 秒
  let sec = Math.ceil((dt / 1000) % 60);
  sec = sec < 10 ? '0' + sec : sec;
  return min + ':' + sec;
})
Vue.filter('formatTime', (time)=>{
  return moment(time).format('YYYY-MM-DD hh:mm:ss');
})
Vue.filter('formatCount',(count)=>{
  if (count / 10000 > 10) {
    return parseInt(count / 10000) + '万';
  } else {
    return count;
  }
})
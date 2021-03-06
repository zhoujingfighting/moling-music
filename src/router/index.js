import Vue from 'vue'
import VueRouter from 'vue-router'
// import app from "@/App.vue"
import discovery from '@/views/discovery.vue'
import mv from '@/views/mv.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: discovery
  },
  {
    path: '/discovery',
    component :discovery
  },
  {
    path: '/mv',
    component :mv
  }
]

const router = new VueRouter({
  routes
})

export default router

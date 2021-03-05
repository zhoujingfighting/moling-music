import Vue from 'vue'
import VueRouter from 'vue-router'
import app from "@/App.vue"
import discovery from '@/views/discovery.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: app
  },
  {
    path: '/discovery',
    component :discovery
  }
]

const router = new VueRouter({
  routes
})

export default router

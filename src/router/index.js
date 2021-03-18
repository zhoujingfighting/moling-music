import Vue from 'vue'
import VueRouter from 'vue-router'
// import app from "@/App.vue"
import discovery from '@/views/discovery.vue'
import mv from '@/views/mv.vue'
import mvs from '@/views/mvs.vue'
import playlists from '@/views/playlists.vue'
import songs from '@/views/newSongs.vue'
import result from '@/views/result.vue'
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    redirect: './discovery'
  },
  {
    path: '/discovery',
    component:discovery
  },
  {
    path: '/mv',
    component :mv
  },
  {
    path: '/mvs',
    component :mvs
  },
  {
    path: '/playlists',
    component : playlists
  },
  {
    path: '/newsongs',
    component : songs
  } ,
  {
    path: '/result',
    component : result
  
  }
]

const router = new VueRouter({
  routes
})

export default router

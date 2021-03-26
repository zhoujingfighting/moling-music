import Vue from 'vue'
import VueRouter from 'vue-router'
// import app from "@/App.vue"
import discovery from '@/views/discovery.vue'
import mv from '@/views/mv.vue'
import mvs from '@/views/mvs.vue'
import playlists from '@/views/playlists.vue'
import songs from '@/views/newSongs.vue'
import result from '@/views/result.vue'
import playlist from '@/views/playlist.vue'
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
    component :mv ,
    meta:{
      keepALive : true
    }
  },
  {
    path: '/mvs',
    component :mvs,
    meta:{
      keepALive : true
    }
  },
  {
    path: '/playlists',
    component : playlists
  },
  {
    path: '/newsongs',
    component : songs,
    meta:{
      keepALive : true
    }
  } ,
  {
    path: '/result',
    component : result,
    meta:{
      keepALive : true
    }
  },
  {
    path: '/playlist',
    component : playlist,
    meta:{
      keepALive : true
    }
  }
]

const router = new VueRouter({
  routes
})

export default router

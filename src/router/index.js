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
    redirect: './discovery' ,
  },
  {
    path: '/discovery',
    component:discovery ,
    meta:{
        keepAlive:true
    }
  },
  {
    path: '/mv',
    component :mv,
  },
  {
    path: '/mvs',
    component :mvs
  },
  {
    path: '/playlists',
    component : playlists,
    meta:{
      keepAlive:true
  }
  },
  {
    path: '/newsongs',
    component : songs,
    meta:{
      keepAlive:true
    }
  } ,
  {
    path: '/result',
    component : result,
    meta:{
      keepAlive:true
    }
  },
  {
    path: '/playlist',
    component : playlist,
  }
]

const router = new VueRouter({
  routes
})

export default router

import Vue from 'vue'
import Vuex from 'vuex'
//创建整个项目的数据仓库对象 , 将多组件公用数据放置在此对象里
Vue.use(Vuex)
const store = new Vuex.Store({
  //data
  state: {
    preSonglists :[] ,
    //歌曲切换的总列表,左右切换 , 应该将每一次播放的歌曲存进前一次播放的列表中
    nextSonglist:[],
    //因为每个页面跳转的歌曲状态不一样,这个列表也不一样 ,
  },
  //methods , 在mutation里修改状态
  mutations: {
    preSong(){

    },
    nextSong(){

    }
  },
  //异步方法
  actions: {
  },
  //模块
  modules: {
  }
})
export default store

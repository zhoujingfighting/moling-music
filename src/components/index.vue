<template>
  <div class="index-container">
    <div class="nav" >
      <ul>
        <li>
          <router-link to="/discovery">
            <span class="iconfont icon-find-music">&#xe728;</span>
            发现音乐
          </router-link>
        </li>
        <li>
          <router-link to="/playlists">
            <span class="iconfont icon-music-list">&#xe602;</span>
            推荐歌单
          </router-link>
        </li>
        <li>
          <router-link to="/newsongs">
            <span class="iconfont icon-music">&#xf116;</span>
            最新音乐
          </router-link>
        </li>
        <li>
          <router-link to="/mvs">
            <span class="iconfont icon-mv">&#xe630;</span>
            最新MV
          </router-link>
        </li>
      </ul>
    </div>
    
    <!-- 全部vue跳转区都在这 -->
    <div class="main">
      <keep-alive>
        <router-view>
        </router-view>
      </keep-alive>
    </div>
    <div class="lyric-show" >
      <div class="lyric-wrapper" v-if="url.length !==0">
        <div class="imgwrapper" >
          <img :src="bgsrc" alt="">
        </div>
        <div class = "lyrciwrapper"> 
          <div class="ulwrapper">
            <ul class="liwrapper">
              <li
              v-for="(item,index) in lyrarr"
              :key="index"
              class="lyric"
              >
              {{ item }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="player">
      <i class="iconfont left"
      @click = "handlePre"
      > &#xe636;</i>
      <i class="iconfont right"
      @click = 'handleNext'
      >&#xe638;</i>
      <!-- 这个列表切换应该由全局公共状态确定,因为不同页面获得的歌曲列表不太一样 -->
      <audio 
       controls
       autoplay
       :src="url"
       loop="true"
       @timeupdate = "handletime"
       ref="audio"
       @ended="handleEnded"
      ></audio>
    </div>
  </div>
</template>
<script>
import {getLyric , getAlbum , getSongdetail} from '@/api/lyric.js'
export default {
  name: 'index',
  data() {
    return {
      activeIndex: 0,
      url:"" ,
      musicid:"",
      //音乐id ,获得歌词信息
      albumid:"",
      //专辑信息,获得专辑信息:主要是获取专辑封面
      bgsrc:"" , 
      lyric:"" , 
      timearr:[],
      lyrarr : [] ,
      liarr:[],          
      index : -1 , 
      ul:null ,
    };
  } , 
  methods :{
    handletime(){
            if(this.$refs.audio.currentTime == 0){
              this.index = -1
            }
            if( this.$refs.audio.currentTime > this.timearr[0]){
              this.index ++
              this.timearr.shift()
              this.liarr[this.index].style = "color:violet"
              this.ul.style = "margin-top:" + `-${15*this.index}` + "px"
            }
    } , 
    handleEnded(){
      if(this.$refs.audio.loop === true){
        this.changeLyric()
      }
    } ,
    changeLyric(){
      this.index = -1
      this.liarr = []
      this.timearr = []
      this.lyrarr = []
      var array = this.lyric.split('\n')
      //正则表达式.匹配时间
      var rex = /\[(\d*:\d*\.\d*)\]/
      array.forEach( item => {
        if(rex.exec(item) != null){
          var res = rex.exec(item)[1]
          var res1 = res.split(":")
          var min = parseInt(res1[0]) * 60
          var sec = parseFloat(res1[1])
          var time =parseFloat( Number( min + sec).toFixed(2) )
          this.timearr.push( time )
          //定义一个times存取时间
          //定义一个lyric存取歌词
          var lyc = item.split(']')[1]
         if(lyc) this.lyrarr.push(lyc)
        }
      })
      //歌词更新完,立马进入歌曲部分
      this.liarr = document.getElementsByClassName('lyric')
      this.ul = document.querySelector('.liwrapper')
    } , 
    handlePre(){
      //要向总线传递目前播放歌曲的index
      let temp = null
      for(let i = 0 ; i < this.totalSonglist.length ; i ++){
        for(let key in this.totalSonglist[i]){
            if( this.totalSonglist[i][key] === this.url ){
              temp = i
            }
        }
      }
      for(let key in this.totalSonglist[temp - 1]){
        this.musicid = key
        this.url = this.totalSonglist[temp-1][key]
      }
      
    } ,
    handleNext(){
      //要向总线传递目前播放歌曲的index
        let temp = null
      for(let i = 0 ; i < this.totalSonglist.length ; i ++){
        for(let key in this.totalSonglist[i]){
            if( this.totalSonglist[i][key] === this.url ){
              temp = i
            }
        }
      }
      for(let key in this.totalSonglist[temp+ 1]){
        this.musicid = key
        this.url = this.totalSonglist[temp + 1][key]
      }
    } ,
  } ,
  watch:{
    url(){
      if(!this.urlArr.includes(this.url)){
          const map = {} 
          map[ this.musicid ]  =  this.url
          this.$store.state.preSonglists.push( map )
      }
      //每一次切换歌曲的时候上一首的列表中应该push进去这个url
      getLyric({
        id : this.musicid
      }).then(res => {
        this.lyric = res.lrc.lyric
        }
      )
    } , 
    musicid(){
      getSongdetail({
        ids:this.musicid
      }).then(res => {
        this.albumid = res.songs[0].al.id
        this.bgsrc = res.songs[0].al.picUrl
        })
    },
    albumid(){
      getAlbum({
        id : this.albumid
      })
    } , 
    lyric(){
      this.changeLyric()
    },
    index(){
      if(this.index == -1){
        this.liarr.forEach(item =>{
          item.style = ""
        })
      }
    } ,
    songEnd(){
      
    }
  },
  computed:{
    urlArr(){
        let result =[]
        this.totalSonglist.forEach(item => {
          for(let key in item){
            result.push(item[key])
          }
        })
        return result
    },
    totalSonglist(){
      return this.$store.state.preSonglists.concat( this.$store.state.nextSonglist )
    } ,
    songEnd(){
      return this.$refs.audio.ended
    }
  }
};
</script>
<style lang="scss">
    .index-container {
        // background: red;
        display: flex;
        .nav {
            width: 200px;
            height: 850px;
            margin-left:20px;
            ul{
              position: fixed;  
            }
            li {
                height: 60px;
                cursor: pointer;
                display: flex;
                align-items: center;
                &:hover {
                   background-color: #e7e7e7;
                }
                .iconfont {
                  margin-right: 10px;
                  font-size: 20px;
              }
            a{
            color: black;
            padding-left: 30px;
           font-size: 18px;
           line-height: 60px;
           width: 100%;
           height: 100%;
          &.router-link-active {
            color: #dd6d60;
            .iconfont {
              color: #dd6d60;
          }
        }
      }
    }
  }
  .main {
    flex: 1;
    // overflow-y: scroll;
    padding: 10px 20px;
    > div {
      max-width: 1100px;
      margin: 0 auto;
    }
  }
  .lyric-show{
    width:300px;
    height:800px;
    .lyric-wrapper{
      width: 320px;
      height:100%;
      position: fixed;
      // background: violet;
      margin-left:-60px;
      .imgwrapper{
        width:100%;
        height:320px;
       
        img{
          
          width:100%;
          height:100%;
          display: block;
          border-radius:50%;
        }
      }
      .lyrciwrapper{
        text-align: center;
        .ulwrapper{
          width:100%;
          overflow: hidden;
          // position: fixed;
          .liwrapper{
             overflow: hidden;
            // background: violet;
          }
        }

      }
    }
  }
  .player {
    background: #f1f3f4;
    height: 40px;
    position: fixed;
    z-index: 4;
    bottom: 0;
    left: 0;
    width: 40%;
    margin-left:1130px;
    .left{
      top:16px;
      position: absolute;
      font-size: 20px;
      bottom:0;
      left:25px;
       &:hover{
        color:red;
      }
    }
    .right{
       top:16px;
      position: absolute;
      font-size: 20px;
      bottom:0;
      left:56px;
      &:hover{
        color:red;
      }
    }
  }
  audio {
    position:absolute;
    right:0;
    width: 90%;
    border-radius: none;
    outline: none;
    color:red;
  }
}
</style>
<style scoped>
  @keyframes rotate
     { 
       from{transform: rotate(0deg);}
       to {transform: rotate(360deg);}
     }
  .imgwrapper{
     animation: rotate  30s infinite linear;
  }
</style>
     
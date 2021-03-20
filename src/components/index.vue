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
      <router-view></router-view>
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
      ul:null
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
    }
  } ,
  watch:{
    url(){
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
    bottom: 0;
    left: 0;
    width: 20%;
    // transform: translateX(-60%);
  }
  audio {
    width: 100%;
    border-radius: none;
    outline: none;
  }
}
</style>
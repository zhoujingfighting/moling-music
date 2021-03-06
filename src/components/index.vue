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
          <router-link to="/songs">
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
    <div class="lyric-show">
      <div class="lyric-wrapper">

      </div>
    </div>
    <div class="player">
      <audio controls autoplay :src="url" loop></audio>
    </div>
  </div>
</template>
<script>
export default {
  name: 'index',
  data() {
    return {
      activeIndex: 0,
      url:""
    };
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
      background: red;
      margin-left:-60px;
    }
  }
  .player {
    background: #f1f3f4;
    height: 60px;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
  }
  audio {
    width: 100%;
    border-radius: none;
    outline: none;
  }
}
</style>
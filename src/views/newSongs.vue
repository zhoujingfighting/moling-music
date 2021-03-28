<template>
  <div class="songs-container" >
    <div class="tab-bar">
      <span class="item" :class="{ active: type == 0 }" @click="type = 0"
        >全部</span
      >
      <span class="item" :class="{ active: type == 7 }" @click="type = 7"
        >华语</span
      >
      <span class="item" :class="{ active: type == 96 }" @click="type = 96"
        >欧美</span
      >
      <span class="item" :class="{ active: type == 8 }" @click="type = 8"
        >日本</span
      >
      <span class="item" :class="{ active: type == 16 }" @click="type = 16"
        >韩国</span
      >
    </div>
    <!-- 底部的table -->
    <table class="el-table song-table">
      <thead>
        <th></th>
        <th></th>
        <th>音乐标题</th>
        <th>歌手</th>
        <th>专辑</th>
        <th>时长</th>
      </thead>
      <tbody>
        <tr
          class="el-table__row"
          v-for="(item, index) in tableData"
          :key="item.id"
        >
          <td>{{ index + 1 }}</td>
          <td>
            <div class="img-wrap" @click="playMusic(item.id)">
              <img v-lazy="item.album.picUrl" alt="" />
              <span  class="iconfont icon-play" >&#xe634;</span>
            </div>
          </td>
          <td>
            <div class="song-wrap">
              <div class="name-wrap">
                <span>{{ item.name }}</span>
                <span v-if="item.mvid != 0" class="iconfont icon-mv" @click='toMV(item.mvid)'></span>
              </div>
              <span>{{ item.subTitle }}</span>
            </div>
          </td>
          <td>{{ item.artists[0].name }}</td>
          <td>
            {{ item.album.name }}
          </td>
          <td>{{ item.duration | formatDuration }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { topSongs } from '@/api/songs';
import { songUrl } from '@/api/discovery';
export default {
  name: 'songs',
  data() {
    return {
      type: 0,
      tableData: [],
    };
  },
  methods: {
    toMV(id){
      this.$router.push(`/mv?id=${id}`)
    },
    getData() {
      topSongs({
        type: this.type
      }).then(res => {
        this.tableData = res.data;
      });
    },
    playMusic(id) {
      songUrl({
        id: id
      }).then(res => {
        // window.console.log(res)
        // this.songUrl = res.data[0].url
        this.$parent.url = res.data[0].url;
        this.$parent.musicid = res.data[0].id;
      });
    }
  },
  watch: {
    type() {
      this.getData();
    }
  },
  created() {
    this.getData();
  }
};
</script>

<style lang="scss">
    .songs-container {
  .tab-bar {
    display: flex;
    justify-content: flex-end;
    .item {
      font-size: 15px;
      color: gray;
      margin-right: 20px;
      cursor: pointer;
      &.active {
        color: #dd6d60;
      }
    }
  }
  .song-table {
    .song-wrap {
      > span {
        margin-top: 20px;
        display: inline-block;
        color: #bebebe;
      }
      .icon-mv {
        padding-left: 5px;
        color: #dd6d60;
      }
    }
    .img-wrap {
      position: relative;
      width: 70px;
      height: 70px;
      img {
        width: 70px;
        height: 70px;
        border-radius: 5px;
      }
      .icon-play {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 25px;
        height: 25px;
        color: #dd6d60;
        font-size: 24px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        // background: rgba(255, 255, 255, 0.8);
        &::before {
          transform: translateX(1px);
        }
      }
    }
  }
}
</style>
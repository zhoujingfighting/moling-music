<template>
  <div class="playlist-container">
    <div class="top-wrap">
      <div class="img-wrap">
        <img v-lazy="coverImgUrl" alt="" />
      </div>
      <div class="info-wrap">
        <p class="title">{{ title }}</p>
        <div class="author-wrap">
          <img class="avatar" v-lazy="avatarUrl" alt="" />
          <span class="name">{{ nickname }}</span>
          <span class="time">{{ createTime }} 创建</span>
        </div>
        <div class="tag-wrap">
          <span class="title">标签:</span>
          <ul>
            <li v-for="item in tags" :key="item">{{ item }}</li>
          </ul>
        </div>
        <div class="desc-wrap">
          <span class="title">简介:</span>
          <span class="desc">{{ signature }}</span>
        </div>
      </div>
    </div>
    <el-tabs v-model="activeIndex">
      <el-tab-pane label="歌曲列表" name="1">
        <table class="el-table playlit-table">
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
                  <img v-lazy="item.al.picUrl" alt="" />
                  <span class="iconfont icon-play">&#xe603;</span>
                </div>
              </td>
              <td>
                <div class="song-wrap">
                  <div class="name-wrap">
                    <span>{{ item.name }}</span>
                    <!-- mv图标 -->
                    <span v-if="item.mv != 0" @click="toMV(item.mv)" class="iconfont icon-mv"></span>
                  </div>
                  <span>{{ item.subTitle }}</span>
                </div>
              </td>
              <td>{{ item.ar[0].name }}</td>
              <td>
                {{ item.al.name }}
              </td>
              <td>{{ item.dt | formatDuration }}</td>
            </tr>
          </tbody>
        </table>
      </el-tab-pane>
      <el-tab-pane :label="`评论(${total + hotComments.length})`" name="2">
        <!-- 热门评论 -->
        <div v-if="hotComments.length != 0" class="comment-wrap">
          <p class="title">
            热门评论<span class="number">({{ hotComments.length }})</span>
          </p>
          <div
            class="comments-wrap"
            v-for="item in hotComments"
            :key="item.commentId"
          >
            <div class="item">
              <div class="icon-wrap">
                <img v-lazy="item.user.avatarUrl" alt="" />
              </div>
              <div class="content-wrap">
                <div class="content">
                  <span class="name">{{ item.user.nickname }}：</span>
                  <span class="comment">{{ item.content }}</span>
                </div>
                <div v-if="item.beReplied.length != 0" class="re-content">
                  <span class="name"
                    >{{ item.beReplied[0].user.nickname }}：</span
                  >
                  <span class="comment">{{ item.beReplied[0].content }}</span>
                </div>
                <div class="date">{{ item.time | formatTime }}</div>
              </div>
            </div>
          </div>
        </div>
        <!-- 最新评论 -->
        <div class="comment-wrap">
          <p class="title">
            最新评论<span class="number">({{ total }})</span>
          </p>
          <div v-if="comments.length != 0" class="comments-wrap">
            <div class="item" v-for="item in comments" :key="item.commentId">
              <div class="icon-wrap">
                <img v-lazy="item.user.avatarUrl" alt="" />
              </div>
              <div class="content-wrap">
                <div class="content">
                  <span class="name">{{ item.user.nickname }}：</span>
                  <span class="comment">{{ item.content }}</span>
                </div>
                <div v-if="item.beReplied.length != 0" class="re-content">
                  <span class="name"
                    >{{ item.beReplied[0].user.nickname }}：</span
                  >
                  <span class="comment">{{ item.beReplied[0].content }}</span>
                </div>
                <div class="date">{{ item.time | formatTime }}</div>
              </div>
            </div>
          </div>
        </div>
        <!-- 分页器 -->
        <el-pagination
          @current-change="handleCurrentChange"
          background
          layout="prev, pager, next"
          :total="total"
          :current-page="page"
          :page-size="5"
        >
        </el-pagination>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { playlistDetail, listComments, hotComments } from '@/api/playlist';
import { songUrl } from '@/api/discovery';
import moment from 'moment';
export default {
  name: 'playlist',
  data() {
    return {
      activeIndex: '1',
      tableData: [],
      title: '',
      avatarUrl: '',
      coverImgUrl: '',
      signature: '',
      nickname: '',
      tags: [],
      createTime: '',
      // 热门评论
      hotComments: [],
      // 普通评论
      comments: [],
      // 分页相关数据
      // 每页数据
      limit: 20,
      // 页码
      page: 1,
      // 总条数
      total: 0
    };
  },
  filters: {},
  created() {
    const { id } = this.$route.query;
    playlistDetail({
      id
    }).then(res => {
      // window.console.log(res)
      // 歌曲信息
      this.tableData = res.playlist.tracks;
      this.title = res.playlist.name;
      this.avatarUrl = res.playlist.creator.avatarUrl;
      this.coverImgUrl = res.playlist.coverImgUrl;
      this.signature = res.playlist.creator.signature;
      this.nickname = res.playlist.creator.nickname;
      this.tags = res.playlist.tags;
      this.createTime = moment(res.playlist.createTime).format('YYYY-MM-DD');
    });
    // 获取热门评论
    hotComments({
      id
    }).then(res => {
      this.hotComments = res.hotComments;
    });

    // 获取评论信息
    this.getComments();
  },
  methods: {
    toMV(id){
      this.$router.push(`/mv?id=${id}`)
    },
    // 获取歌曲评论
    getComments() {
      const { id } = this.$route.query;
      // 获取歌曲评论
      listComments({
        id,
        offset: (this.page - 1) * 5
      }).then(res => {
        this.total = res.total;
        this.comments = res.comments;
      });
    },
    // 页码改变
    handleCurrentChange(val) {
      this.page = val;
      this.getComments();
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
  watch:{
    tableData(){
          const arr = this.tableData 
          console.log(this.tableData )
          this.$store.state.nextSonglist = []
        for(let i = 0 ; i < arr.length ; i ++){
          this.$store.state.nextSonglist[i] = {}
          songUrl({id:arr[i].id}).then(res => this.$store.state.nextSonglist[i][arr[i].id] =  res.data[0].url )
        }
          // console.log( this.$store.state.nextSonglist , this.$store.state )
    }
  }
};
</script>

<style lang="scss">
.playlist-container {
  margin: auto;
  padding-top: 40px;
  .top-wrap {
    display: flex;
    span {
      font-size: 17px;
    }
    .img-wrap {
      margin-right: 30px;
      img {
        width: 230px;
        height: 230px;
      }
    }
    .info-wrap {
      .title {
        margin-bottom: 20px;
      }
      .author-wrap {
        display: flex;
        align-items: center;
        margin-bottom: 25px;
        img {
          width: 35px;
          height: 35px;
          border-radius: 50%;
          margin-right: 10px;
        }
        .name {
          margin-right: 10px;
        }
        .time {
          font-size: 14px;
        }
      }
      .play-wrap {
        width: 120px;
        height: 35px;
        border-radius: 4px;
        background: linear-gradient(to right, #e85e4d, #c6483c);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 25px;
        span {
          color: white;
          &.iconfont {
            margin-right: 8px;
          }
          &.text {
            font-size: 16px;
          }
        }
      }
      .tag-wrap {
        display: flex;
        margin-bottom: 15px;
        span {
          margin: 0;
        }
        ul {
          display: flex;
          align-items: center;
        }
        li {
          font-size: 15px;
          &:not(:last-child)::after {
            content: '/';
            margin: 0 4px;
          }
        }
      }
      .desc-wrap {
        span {
          &:last-child {
            font-size: 15px;
          }
        }
      }
      span:first-child {
        margin-right: 10px;
      }
    }
  }
  .playlit-table{
      .img-wrap{
        position: relative;
        width:70px;
        height:70px;
        img{
          width:100%;
          height:100%;
          border-radius:10px;
        }
        .icon-play{
          position:absolute;
          left:50%;
          top:50%;
          transform: translateX(-50%) translateY(-50%);
          font-size:25px;
          color:lightgray;
          opacity: 0.5;
          &:hover{
            color:red;
            opacity: 1;
          }
        }
      }
    }
  .comment-wrap {
    margin-bottom: 70px;
    .title {
      font-size: 20px;
      .number {
        color: black;
        font-size: 18px;
      }
    }
    .item {
      display: flex;
      padding-top: 20px;
      .icon-wrap {
        margin-right: 15px;
        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }
      }
      &:not(:last-child) {
        .content-wrap {
          border-bottom: 1px solid #f2f2f1;
        }
      }
      .date {
        color: #bebebe;
        font-size: 14px;
      }

      .content-wrap {
        padding-bottom: 20px;

        flex: 1;
        .name {
          color: #517eaf;
          font-size: 14px;
        }
        .comment {
          font-size: 14px;
        }
        .content,
        .re-content {
          margin-bottom: 10px;
        }
        .re-content {
          padding: 10px;
          background-color: #e6e5e6;
          border-radius: 5px;
        }
      }
    }
  }
}
</style>

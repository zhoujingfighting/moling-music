<template>
  <div class="mvs-container">
    <div class="filter-wrap">
      <div class="seciton-wrap">
        <span class="section-type">地区:</span>
        <ul class="tabs-wrap">
          <li class="tab">
            <span
              class="title"
              :class="{ active: area == '全部' }"
              @click="area = '全部'"
              >全部</span
            >
          </li>
          <li class="tab">
            <span
              class="title"
              :class="{ active: area == '内地' }"
              @click="area = '内地'"
              >内地</span
            >
          </li>
          <li class="tab">
            <span
              class="title"
              :class="{ active: area == '港台' }"
              @click="area = '港台'"
              >港台</span
            >
          </li>
          <li class="tab">
            <span
              class="title"
              :class="{ active: area == '欧美' }"
              @click="area = '欧美'"
              >欧美</span
            >
          </li>
          <li class="tab">
            <span
              class="title"
              :class="{ active: area == '日本' }"
              @click="area = '日本'"
              >日本</span
            >
          </li>
          <li class="tab">
            <span
              class="title"
              :class="{ active: area == '韩国' }"
              @click="area = '韩国'"
              >韩国</span
            >
          </li>
        </ul>
      </div>
      <div class="type-wrap">
        <span class="type-type">类型:</span>
        <ul class="tabs-wrap">
          <li class="tab">
            <span
              class="title"
              :class="{ active: type == '全部' }"
              @click="type = '全部'"
              >全部</span
            >
          </li>
          <li class="tab">
            <span
              class="title"
              :class="{ active: type == '官方版' }"
              @click="type = '官方版'"
              >官方版</span
            >
          </li>
          <li class="tab">
            <span
              class="title"
              :class="{ active: type == '原声' }"
              @click="type = '原声'"
              >原声</span
            >
          </li>
          <li class="tab">
            <span
              class="title"
              :class="{ active: type == '现场版' }"
              @click="type = '现场版'"
              >现场版</span
            >
          </li>
          <li class="tab">
            <span
              class="title"
              :class="{ active: type == '网易出品' }"
              @click="type = '网易出品'"
              >网易出品</span
            >
          </li>
        </ul>
      </div>
      <div class="order-wrap">
        <span class="order-type">排序:</span>
        <ul class="tabs-wrap">
          <li class="tab">
            <span
              class="title"
              :class="{ active: order == '上升最快' }"
              @click="order = '上升最快'"
              >上升最快</span
            >
          </li>
          <li class="tab">
            <span
              class="title"
              :class="{ active: order == '最热' }"
              @click="order = '最热'"
              >最热</span
            >
          </li>
          <li class="tab">
            <span
              class="title"
              :class="{ active: order == '最新' }"
              @click="order = '最新'"
              >最新</span
            >
          </li>
        </ul>
      </div>
    </div>
    <!-- mv容器 -->
    <!-- 推荐MV -->
    <!-- 和之前的mv一样,router view push改变了路由方向 -->
    <div class="mvs">
      <div class="items">
        <div
          v-for="item in mvList"
          :key="item.id"
          class="item"
          @click="toMv(item.id)"
        >
          <div class="img-wrap">
            <img :src="item.cover" alt="" />
            <div class="iconfont icon-play">
              <i class="iconfont icon-show"> &#xe634;</i>
            </div>
            <div class="num-wrap">
              <div class="num">{{ item.playCount | formatCount }}</div>
            </div>
          </div>
          <div class="info-wrap">
            <div class="name">{{ item.name }}</div>
            <div class="singer">{{ item.artisetName }}</div>
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
    </div>
  </div>
</template>

<script>
import { allMvs } from '@/api/mvs';
export default {
  name: 'mvs',
  data() {
    return {
      area: '全部',
      type: '全部',
      order: '上升最快',
      // 每页数据
      limit: 12,
      // 页码
      page: 1,
      // 总条数
      total: 0,
      // mv列表数据
      mvList: []
    };
  },
  created() {
    this.getData();
  },
  watch: {
    area: [
      function() {
        this.page = 1;
      },
      'getData'
    ],
    type: [
      function() {
        this.page = 1;
      },
      'getData'
    ],
    order: [
      function() {
        this.page = 1;
      },
      'getData'
    ]
  },
  methods: {
    // 页码改变
    handleCurrentChange(val) {
      this.page = val;
      this.getData();
    },
    getData() {
      const { area, type, order } = this;
      allMvs({
        area,
        type,
        order,
        offset: (this.page - 1) * this.limit
      }).then(res => {
        // window.console.log(res)
        this.mvList = res.data;
        if (res.count) {
          this.total = res.count;
        }
      });
    },
    toMv(id) {
      this.$router.push(`/mv?id=${id}`);
    }
  }
};
</script>

<style lang="scss">
.mvs-container {
  padding-top: 20px;
  .filter-wrap {
    > div {
      margin-bottom: 30px;
      vertical-align: baseline;
      display: flex;
      align-items: center;
      span {
        font-size: 14px;
        height: 100%;
        &.title {
          margin: 20px;
          color: gray;
          cursor: pointer;
          padding: 5px 20px;
          &.active {
            color: #dd6d60;
            background-color: #fcf6f5;
            border-radius: 20px;
          }
          &::before {
            content: '', pos;
          }
        }
      }
      ul {
        display: flex;
        li:not(:last-child) {
          border-right: 1px solid #f2f2f1;
        }
      }
    }
  }
  .mvs {
    .items {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      .item {
        width: 250px;
        cursor: pointer;
        margin-right: 25px;
        margin-bottom: 30px;
        .img-wrap {
          width: 100%;
          position: relative;
          img {
            width: 100%;
            border-radius: 5px;
          }
          .num-wrap {
            position: absolute;
            color: white;
            top: 0;
            right: 0;
            font-size: 15px;
            padding-right: 5px;
            padding-top: 2px;
          }
          .icon-play {
              font-size: 12px;
              position: absolute;
              right:50%;
              top:50%;
              transform: translateX(50%) translateY(-50%);
              margin-right: 5px;
              .icon-show{
                font-size:36px;
                &:hover{
                  color:#fff;
                }
              }
            }
        }
        .info-wrap {
          .name {
            font-size: 15px;
          }
          .singer {
            font-size: 14px;
            color: #c5c5c5;
          }
        }
      }
    }
  }
}
</style>

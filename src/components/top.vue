<template>
  <div class="top-container">
    <div class="left-box">
      <div class="img-wrapper">
        <img src="@/styles/images/moling.png" alt="">
        <h3 class="title">墨灵音乐</h3>
      </div>
    </div>
    <div class="right-box">
      <el-input size="small" @keyup.enter.native="toResult" placeholder="搜索" v-model.trim="query">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
    </div>
  </div>
</template>

<script>
export default {
  name: 'top',
  data(){
    return {
      query:''
    }
  },
  methods:{
    toResult(){
      if(!this.query){
        this.$message.warning('请输入查询内容')
      }else{
        this.$router.push(`/result?keywords=${this.query}`)
      }
    }
  },
};
</script>

<style lang="scss" scoped>
    .top-container{
        display: flex;
        width:100%;
        height:100px;
        .left-box{
            position: fixed;
            .img-wrapper{
                margin-left:40px;
                margin-top:10px
            }
            .title{
                position: relative;
                left:110px;
                top:-60px;
            }
        }
        .right-box{
            position: fixed;
            right:50px;
            top:50px;
        }
    }
</style>
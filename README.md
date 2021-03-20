# moling
做这个的目的就是致敬一个作者,他创造了墨灵音乐这个网站,对于我这个不爱打开音乐软件的人来说简直是福音!
## 组件
element-ui
## 时常处理函数
- 用来显示每个mv上面的时长
  - Vue.filter(obj,function(){
    return XXX
     })
## 待解决bug
mv界面,加载时,分页器下面的显示会在mv页面没有加载完显示出来 , 看着很突兀 
最新音乐界面,加载第一次很缓慢,后面的也很缓慢
- 右边歌词界面需要更新
- 2021/3/18:
  - 以后有时间更新完核心功能(歌曲切换,喜欢,收藏等)
  - 目前实现功能就是正常的搜索以及播放歌曲,mv功能
  - 可以根据前面这些API,来查询到后面的mv页面所需要的id以及后续的一些内容,this.$query.XXX
  - 推荐歌单以及歌单打开页面还没有更新(待更)
- 2021/3/20
  - 准备写歌词同步
    - bug:非会员歌曲歌词显示有误,时间显示错误
    - audio自带标签单曲循环,循环后歌词无法返回原样
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run dev
```

### Compiles and minifies for production
```
npm run build
```
### Lints and fixes files
```
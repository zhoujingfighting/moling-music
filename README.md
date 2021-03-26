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
- 2021/3/21
  - 发现问题:歌曲切换需要公共状态管理,因为不同歌单界面获得歌曲不一样,切换的模式也不一样,先留坑
  - 晚8点半:歌曲切换功能完成,只能用element-ui字体,按钮有点丑
  - bug:专辑封面在第一次切换时会有显示bug
- 2021/3/23
  - 歌单页面的样式得改一下 => 下午两时许改完
- 2021/3/26
  - keep-alive组件优化:router-view区域,因为整个页面其他几块都是固定不动的
## 优点及核心功能
  - 提供歌曲下载(mp3)
  - 歌曲歌词展示以及歌曲歌曲切换功能
  
## 各种请求API以及功能
  - 网易云API接口调用大全地址:https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=neteasecloudmusicapi
  - 最基础的ajax请求是用axios封装到request.js中的,其余所有的api是由基础的request.js获得
  - 发现页面用的api以及参数 => discovery.js
    - 获取轮播图 :  **function banner**
      - 接口地址：https://autumnfish.cn/banner
      - 可选参数 : type  0:pc 1:andriod 2:iphone 3:ipad
    - 推荐歌单 : **function songlist**
      - 接口地址 :  https://autumnfish.cn/personalized
      -  参数 : 可选参数 :** `limit`: 获取数量 , 默认为 30 (不支持 offset)
    - 最新音乐 : **function newsong**
      - 接口地址 :  https://autumnfish.cn/personalized/newsong
    - 播放歌曲 : **function songUrl**
      - 接口地址 : https://autumnfish.cn/song/url
    -  推荐mv : **function mv**
      - 接口地址 : https://autumnfish.cn/personalized/mv
  - 精品歌单页面用的请求API , **playlists.js**
    - 

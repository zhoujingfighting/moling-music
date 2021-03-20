import request from '@/utils/request';

  export function getLyric({id}){
    return request({
        url: '/lyric',
        method: 'get',
        params:{
            id
        }
      });
  }

 export function getAlbum({id}){
     //获取专辑信息,得到专辑封面
    return request({
        url: '/lyric',
        method: 'get',
        params:{
            id
        }
      });
 }

 export function getSongdetail({ids}){
    return request({
        url: '/song/detail',
        method: 'get',
        params:{
            ids
        }
      });
 }
   /*
  
  获取歌曲详情
说明 : 调用此接口 , 传入音乐 id(支持多个 id, 用 , 隔开), 可获得歌曲详情(注意:歌曲封面现在需要通过专辑内容接口获取)

必选参数 : ids: 音乐 id, 如 ids=347230

接口地址 : /song/detail

调用例子 : /song/detail?ids=347230,/song/detail?ids=347230,347231

获取专辑内容
说明 : 调用此接口 , 传入专辑 id, 可获得专辑内容

必选参数 : id: 专辑 id

接口地址 : /album

调用例子 : /album?id=32311
  
  
  
  */
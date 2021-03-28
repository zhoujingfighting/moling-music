//登陆用的接口
import request from '@/utils/request';
//手机登录
export function phoneLogin( {phone , password} ){
    return request({
        url: '/login/cellphone',
        method: 'get',
        params:{
            phone, 
            password
        }
      });
}

//验证此手机号有没有注册
export function register( {phone}){
    return request({
         url : '/cellphone/existence/check' ,
         method : 'get',
         params:{
             phone
         }
    })
}
export function generatorKey(){      //二维码key生成接口
    return request({
         url : '/login/qr/key' ,
         method : 'get',
    })
}

export function generatorCode({key}){      //二维码生成,使用上面的key
    return request({
         url : '/login/qr/create' ,
         method : 'get',
         params:{
             key
         }
    })
}

export function generatorPhoneCode({phone}){      //生成手机验证码
    return request({
         url : '/captcha/sent' ,
         method : 'get',
         params:{
             phone
         }
    })
}

export function checkPhoneCode( {phone,captcha} ){      //验证手机验证码
    return request({
         url : '/captcha/verify' ,
         method : 'get',
         params:{
             phone ,
             captcha
         }
    })
}
export function rigester( { phone,captcha,password,nickname } ){    //注册(可修改密码)
    return request({
         url : '/activate/init/profile' ,
         method : 'get',
         params:{
             phone ,
             captcha ,
             password ,
             nickname
         }
    })
}

export function nickname( { nickname } ){    //初始化昵称
    return request({
         url : '/captcha/verify' ,
         method : 'get',
         params:{
             nickname
         }
    })
}
export function changePhone( { oldcaptcha,captcha,phone,ctcode } ){    //更换绑定手机
    return request({    //必选参数 : oldcaptcha: 原手机验证码 captcha: 新手机验证码 phone : 手机号码 ctcode : 国家区号,默认86即中国
         url : '/rebind' ,
         method : 'get' ,
         params : {
             oldcaptcha ,
             captcha ,
             phone ,
             ctcode
         }
    })
}
export function exitLogin(){    //退出登录
    return request({  
         url : '/logout' ,
         method : 'get' 
    })
}
export function checkLogin(){    //检查登录状态
    return request({  
         url : '/login/status' ,
         method : 'get' 
    })
}

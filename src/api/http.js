import aixos from "axios"
// Notify是一个提示组件
import {Notify,showNotify} from "vant"
// http://backend-api-01.newbee.ltd/api/v1/user/login
// process.env.NODE_ENV
// 当 yarn dev 时 此时是开发环境  process.env.NODE_ENV 的值就是“devement” 生产环境
// 当 yarn build 时 此时是生产环境  process.env.NODE_ENV 的值就是“production”  开发环境
let http = aixos.create({
    //配置对象
	//基础路径，发请求的时候，路径当中会出现api，不用你手写
	baseURL:process.env.NODE_ENV==='production'?'http://backend-api-01.newbee.ltd/api/v1/':'/api/v1',
	//请求时间超过5秒
	timeout:5000
})

// 固定写法，添加请求拦截器 :在发请求之前，请求拦截器可以检测到,可以在请求发出去之前做一些事情,里面也包含两个函数 一个是请求成功  一个是请求失败的函数
http.interceptors.request.use((config)=>{
    //config是个配置对象，对象里面有一个属性很重要，headers请求头
    // 登录的时候会在本地存储一个token,请求头就去本地拿取这个token
    config.headers.token=localStorage.getItem("mltoken")
    return config 
},(error)=>{
    // 请求失败，就返回一个失败的promise
    return Promise.reject(error)
}),

//响应拦截器：包含两个函数（一个是成功返回的函数，一个是失败的返回的函数）
http.interceptors.response.use((response)=>{
//成功的回调函数：服务器响应数据回来以后，响应拦截器可以检测到，可以做一些事情。
    let data = response.data
    if(data.resultCode != 200){
        
        showNotify({ type: 'danger', message: data.message ||'系统繁忙，请稍后再试22222' });
    }
    // else{
    //     showNotify({ type: 'success', message: '注册成功' });
    // }
    return data
},(error)=>{
    Notify({
        type:"danger",
        message:"系统繁忙，请稍后再试111"
    })
    return promise.reject(new Error('fail'))
})

export default http
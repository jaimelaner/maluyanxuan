import http from "./http.js"
import md5 from "js-md5"
// 注册接口
export function register(name,psd){
    return http.post("/user/register",{
        loginName:name,
        password:psd
    })
}
// 登录接口
export function login(name,psd){
    return http.post("/user/login",{
        loginName:name,
        passwordMd5:md5(psd),
    })
}
// 首页数据
// http://backend-api-01.newbee.ltd/api/v1/index-infos
export function index_infos(){
    return http.get("/index-infos",{

    })
}

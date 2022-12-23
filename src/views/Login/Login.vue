<template>
    <div class="login">
         <!-- 顶部导航栏 -->
         <header>
            <van-nav-bar   :title="isTitle?'登录':'注册' "  left-arrow @click-left="onClickLeft"> 
                <template #right>
                    <van-icon name="ellipsis" size="18" />
                </template>
            </van-nav-bar>
        </header>
        <!-- logo -->
        <img src="../../assets/logo.png" width="150" alt="">
        <!-- 登录表单 -->
        <div class="login-form">
            <van-form @submit="onSubmit">
                <van-cell-group inset>
                    <van-field
                    v-model="username"
                    name="用户名"
                    label="用户名"
                    placeholder="手机号"
                    :rules="[{ required: true, message: '请填写手机号' }]"
                    />
                    <van-field
                    v-model="password"
                    type="password"
                    name="密码"
                    label="密码"
                    placeholder="密码"
                    :rules="[{ required: true, message: '请填写密码' }]"
                    />
                </van-cell-group>
                <div class="identify">
                    <span>验证码</span>
                    <span class="change" @click="refreshCode">换一张</span>
                    <input type="text" @blur="inputNumber($event)">
                    <div @click="refreshCode">
                        <Identify class="iden" :identifyCode="identifyCode"></Identify>
                    </div>
                </div>

                <div class="register">
                    <p @click="changeTitle">{{ isTitle?'立即注册':'已有账号,立即登录' }}</p>
                </div>
                <div style="margin: 16px;">
                    <van-button round block type="primary" native-type="submit">
                    {{ isTitle?'登录':'注册' }}
                    </van-button>
                </div>
            </van-form>
        </div>
    </div>
</template>
<script setup>
import {ref ,reactive,toRefs,onMounted}from "vue"
import Identify from "../../components/Identify.vue"
import{register,login,index_infos}from '@/api/index.js'
import{ showNotify,showToast} from 'vant'
import {useRoute,useRouter} from "vue-router"


let route =useRoute()
let router =useRouter()
// 首页home所需要的数据
let homeData= reactive({})
let useInfo=reactive({
    username:"15614375553",
    password:"12345",
    isTitle:true,
})
let {username,password,isTitle} = toRefs(useInfo)
// 点击返回
let onClickLeft=()=>{

}
// 点击提交
let onSubmit=()=>{
    if(useInfo.isTitle){
        console.log('登录');
        login(useInfo.username,useInfo.password).then((res)=>{
            if(idenCode.value=="" || idenCode.value !=identifyCode.value){
                showToast('验证码错误');
            }else{
            if(res.resultCode==200){
                localStorage.setItem('mltoken',res.data)
                router.replace('/home')
                showNotify({
                    type:'success',message:'登陆成功'
                })
                index_infos().then((res)=>{
                    console.log(res);
                    homeData.value=res.data
                    console.log(homeData.value);
                })
            }
            }

        })
    }else{
        console.log("注册");
        register(useInfo.username,useInfo.password).then((res)=>{
            console.log(res);
            if(idenCode.value=="" || idenCode.value !=identifyCode.value){
                showToast('验证码错误');
            }else{
            if(res.resultCode == 200){
                showNotify({
                    type: 'success', message: '注册成功'
                })
                useInfo.isTitle=true
            }
            }
        })
        
    }
}
// 点击切换注册和登录
let changeTitle=()=>{
    isTitle.value=!isTitle.value
}
let inputNumber=(e)=>{
    console.log(identifyCode.value);
    console.log(e.target.value);
    idenCode.value=e.target.value
}

// 图形验证码
let idenCode=ref("")
let identifyCodes = "1234567890"
let identifyCode = ref('3212')
const randomNum = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min)
}
 
const makeCode = (o, l) => {
    for (let i = 0; i < l; i++) {
        identifyCode.value += o[randomNum(0, o.length)];
    }
}
 
const refreshCode = () => {
    identifyCode.value = "";
    makeCode(identifyCodes, 4);
}
 
onMounted(() => {
    identifyCode.value = "";
    makeCode(identifyCodes, 4);
})

</script>
<style scoped lang="less">
.login {
    width: 100%;
    height: 100%;

    header {
        width: 100%;
        padding: 0 0.26667rem;
        box-sizing: border-box;
        background: #fff;
        border-bottom: 0.02667rem solid #dcdcdc;
    }

    img {
        width: 3.2rem;
        height: 3.2rem;
        display: block;
        margin: 36px auto 0;
    }
    
    .identify{
        margin-left: 0.6rem;
        height: 1.5rem;
        line-height: 1.5rem;
        span{
            font-size: 20px;
        }
        .change{
            font-size: 16px;
            margin-left: 0.3rem;
            color: #1989FA;
            cursor: pointer;
        }
        input{
        font-size: 20px;
        display: inline;
        width: 2rem;
        height: 0.8rem;
        margin-left: 0.3rem;
        border: 1px solid #dcdcdc;
   
        }   
        div{
            display: inline;
            .iden{
            display: inline;
            margin-left: 0.5rem;
            vertical-align: bottom;
            line-height: 1.3rem;
        }
        }
        
    }
    .register{
        margin-top: 0.5rem;
        margin-left: 1rem;
        font-size: 18px;
        color: #1989FA;
    }
    .van-button--round{
        margin: auto;
        width: 8rem;
        font-size: 20px;
        background-color: #1BAEAE;
    }

}
</style>

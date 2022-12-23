<template>

    <div class="home">
        <header>
            <div class="left">
                <van-icon name="wap-nav" />
            </div>
            <div class="middle">
                <span class="one">码路严选</span>
                <span class="two"> | </span>
                <span class="three">全新全意为学员服务</span>
            </div>
            <div class="right">
                <van-icon name="contact" />
            </div>
        </header>
        <main>
            <van-swipe :loop="false" :width="420" height="200" autoplay="3000">
                <van-swipe-item><img :src="carousels.values" width="420" alt=""></van-swipe-item>
                <van-swipe-item>
                    <img :src="carousels1.values" width="420" alt="">
                </van-swipe-item>
                <van-swipe-item>
                    <img :src="carousels2.values" width="420" alt="">
                </van-swipe-item>
            </van-swipe>
        </main>
    </div>
</template>
<script setup>
import { Icon } from 'vant';
import {index_infos } from "@/api/index.js"
import {ref,reactive} from "vue"
import {onMounted} from "vue"
let carousels=reactive([])
let carousels1=reactive([])
let carousels2=reactive([])
let hotGoodses=reactive([])
let newGoodses=reactive([])
let recommendGoodses=reactive([])

onMounted(()=>{
    index_infos().then((res)=>{
        console.log(res);
        carousels.values=res.data.carousels[0].carouselUrl
        carousels1.values=res.data.carousels[1].carouselUrl
        carousels2.values=res.data.carousels[2].carouselUrl
        hotGoodses.values=res.data.hotGoodses
        newGoodses.values=res.data.newGoodses
        recommendGoodses.values=res.data.recommendGoodses
        console.log(carousels.values);
    })
})


    

</script>
<style  scoped lang="less">
header{
    position: fixed;
    left:0;
    top: 0;
    display: flex;
    justify-content: space-around;
    width: 100%;
    height: 50px;
    line-height: 50px;
    z-index: 10;
    .left{
        color: #1BAEAE;
    }
    .middle{
        background: rgba(255,255,255,0.5);
        border-radius:25px;
        height: 30px;
        width: 260px;
        margin-top: 10px;
        line-height: 30px;
        text-align: center;
        .one{
            font-size: 24px;
            color: #1BAEAE;
            font-weight: bolder;
        }
        .two{

        }
        .three{
            margin-left: 10px;
            font-size: 12px;
            vertical-align: middle;
        }
    }
    .right{
        color: #1BAEAE;
    }
}
</style>
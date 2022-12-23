<template>
    <div>
        <van-tabbar route active-color="#1BAEAE">
            <van-tabbar-item replace to="/home" icon="home-o">
                <span>首页</span>
                <template #icon="props">
                    <!-- <span class="icon iconfont icon-shouye"></span> -->
                    <van-icon name="wap-home" />
                </template>
            </van-tabbar-item>
            <van-tabbar-item replace to="/category" icon="search">
                <span>分类</span>
                <template #icon="props">
                    <span class="icon iconfont icon-grouping"></span>
                </template>
            </van-tabbar-item>
            <van-tabbar-item replace to="/cart" icon="search">
                <span>购物车</span>
                <template #icon="props">
                    <van-icon name="shopping-cart-o" />
                </template>
            </van-tabbar-item>
            <van-tabbar-item replace to="/user" icon="search">
                <span>我的</span>
                <template #icon="props">
                    <van-icon name="user-o" />
                </template>
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>
<script setup>
</script>
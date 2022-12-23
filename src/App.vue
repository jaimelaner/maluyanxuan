<template>
  <div id="app">
    <router-view></router-view>
    <TabBer v-if="isShowNav"></TabBer>
  </div>
</template>

<script setup>
import TabBer from "./components/TabBer.vue"
import {watch,ref } from "vue"
import { useRoute } from "vue-router";
let route =useRoute()
let isShowNav=ref(false)
watch(route,newVal=>{
  console.log(newVal.meta.isShowNav);
  isShowNav.value=newVal.meta.isShowNav;
},{
  immediate:true
})

</script>


<style scoped>

</style>

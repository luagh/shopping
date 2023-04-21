<template>
    <div class="f-header">
        <span class="logo">
          <el-icon><eleme-filled /></el-icon>
           后台管理
        </span>
        <el-icon class="icon-btn"><fold/>
        </el-icon>
        <el-tooltip
          effect="dark"
          content="刷新"
          placement="bottom">
        <el-icon class="icon-btn" @click="handleRefresh"><refresh /></el-icon>
        </el-tooltip>
       <div class="ml-auto flex items-center">
        <el-tooltip
          effect="dark"
          content="全屏"
          placement="bottom">
          <el-icon class="icon-btn" @click="toggle">
            <full-screen v-if="!isFullscreen" />
            <aim v-else/>
        </el-icon>
        </el-tooltip>
        
     <el-dropdown class="dropdown" @command="handleCommand">
        <span class="flex items-center text-light-50">
       <el-avatar class="mr-2" size="25" :src="$store.state.user.avatar"/>
       {{ $store.state.user.username}}
       <el-icon class="el-icon--right">
         <arrow-down />
       </el-icon>
       </span>
        <template #dropdown>
            <el-dropdown-menu>
            <el-dropdown-item command="rePassword">修改密码</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </template>
     </el-dropdown>
       </div>
    </div>
</template>
<script setup>
import {showModal,toast } from "~/composables/util"
import {logout} from "~/api/manager"
import {useRouter} from 'vue-router'
import {useStore} from 'vuex'
import {useFullscreen} from '@vueuse/core'
const {isFullscreen,toggle }=useFullscreen()

const router =useRouter()
const store =useStore()

const handleCommand =(c)=> {
    switch (c){
     case "logout":
     handleLogout()
     break;
     case "rePassword":
     console.log("修改密码")
     break;
     }
}
   //刷新
  const handleRefresh = ()=>location.reload()  

   function handleLogout(){
    showModal("是否要退出登录？").then(res=>{
    logout ().finally(() => {

        store.dispatch("logout")
        //跳转回登录页
        router.push("/login")
        //提示退出登录成功
        toast("退出登录成功")
    })
  })
   }

</script>
<style>
.f-header{
    @apply flex items-center bg-indigo-500 text-light-50 fixed top-0 left-0 right-0;
   height:64px;
}
.logo{
    width:250px;
@apply flex justify-center items-center text-xl font-thin;
}
.icon-btn{
    @apply flex justify-center items-center;
       width:42px;
       height:64px;
       cursor:pointer;
}
.icon-btn:hover{
@apply bg-indigo-600;
}
.f-header .dropdown{
    height:64px;
    cursor:pointer;
    @apply flex justify-center items-center mx-5;
}
</style>
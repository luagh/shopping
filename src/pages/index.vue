<template>
    <div>
        后台首页
        {{ $store.state.user.username  }}

        <el-button @click="handleLogout">退出登录</el-button>
    </div>
</template>
<script  setup>
import {showModal,toast } from "~/composables/util"
import {logout} from "~/api/manager"
import {useRouter} from 'vue-router'
import {useStore} from 'vuex'
const router =useRouter()
const store =useStore()
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
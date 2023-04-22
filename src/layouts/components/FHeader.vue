<template>
  <div class="f-header">
    <el-dropdown class="dropdown" @command="handleCommand">
      <span class="flex items-center text-light-50 ">
        <el-avatar class="mr-2" size="25" :src="$store.state.user.avatar" />
        {{ $store.state.user.username }}
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="rePassword">修改密码</el-dropdown-item>
          <el-dropdown-item command="logout" @click="handleLogout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>

    <el-tooltip effect="dark" content="全屏" placement="bottom">
      <el-icon class="icon-btn" @click="toggle">
        <full-screen v-if="!isFullscreen" />
        <aim v-else />
      </el-icon>
    </el-tooltip>

    <el-tooltip effect="dark" content="刷新" placement="bottom">
      <el-icon class="icon-btn" @click="handleRefresh">
        <refresh />
      </el-icon>
    </el-tooltip>
    <div class="mx-auto flex items-center">
      <el-tooltip effect="dark" content="GIN后台" placement="bottom">
        <span class="logo flex items-center justify-center">
          <el-icon class="mr-1"><eleme-filled /></el-icon>
          后台管理
        </span>
      </el-tooltip>
    </div>
    <div class="ml-auto flex items-center">
      <el-icon class="icon-btn" @click="$store.commit('handleAsideWidth')">
        <Expand v-if="$store.state.asideWidth == '250px'" />
        <fold v-else />
      </el-icon>

    </div>

  </div>

  <FormDrawer ref="formDrawerRef" title="修改密码" destroyOnClose @submit="onSubmit">

    <el-form ref="formRef" :rules="rules" :model="form" label-width="80px" size="small">
      <el-form-item prop="oldpassword" label="旧密码">
        <el-input v-model="form.oldpassword" placeholder="请输入旧密码">
        </el-input>
      </el-form-item>
      <el-form-item prop="password" label="新密码">
        <el-input type="password" v-model="form.password" placeholder="请输入新密码" show-password>
        </el-input>
      </el-form-item>
      <el-form-item prop="repassword" label="确认密码">
        <el-input type="repassword" v-model="form.repassword" placeholder="请输入确认密码" show-password>
        </el-input>
      </el-form-item>
    </el-form>

  </FormDrawer>
</template>
<script setup>

import { useFullscreen } from '@vueuse/core'
import FormDrawer from "~/components/FormDrawer.vue"
import { useRepassword, useLogout } from '~/composables/useManager'
//isFullscreen 是否全屏 //toggle切花全屏
const { isFullscreen, toggle } = useFullscreen()

const { formDrawerRef,
  form,
  rules,
  formRef,
  onSubmit,
  openRePassWordForm } = useRepassword()

const { handleLogout } = useLogout()

//
const handleCommand = (c) => {
  //console.log(c);
  switch (c) {
    case "logout":
      handleLogout()
      break;
    case "rePassword":
      // showDrawer.value =true
      openRePassWordForm()
      break;
    default:
      break;
  }

}



//刷新
function handleRefresh() {
  location.reload()
}

</script>
<style>
.f-header {
  @apply flex items-center bg-indigo-500 text-light-50 fixed top-0 left-0 right-0;
  height: 64px;
  z-index: 1000;
}

.logo {
  width: 150px;
  @apply flex justify-center items-center text-xl font-thin;
}

.icon-btn {
  @apply flex justify-center items-center;
  width: 42px;
  height: 64px;
  cursor: pointer;
  position: relative;
}

.icon-btn:hover {
  @apply bg-indigo-600;
}

.f-header .dropdown {
  height: 64px;
  cursor: pointer;
  @apply flex justify-center items-center mx-5;
}

.dialog-footer {
  display: flex;
  justify-content: center;
}

.mx-auto {
  @apply mx-auto;
}
</style>
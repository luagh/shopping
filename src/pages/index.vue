<template>
    <div>
        后台首页
        {{ $store.state.user.username  }}

        <el-button @click="handleLogout">退出登录</el-button>
    </div>
</template>
<script  setup>



</script>
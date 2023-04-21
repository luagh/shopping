<template>
    <div class="common-layout">
    <el-container>
      <el-aside width="200px"><FMenu/></el-aside>
      <el-container>
        <el-header><FHeader/></el-header>
        <el-main><FTaglist/></el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup>
import FHeader from './components/FHeader.vue'
import FMenu from './components/FMenu.vue'
import FTaglist from './components/FTaglist.vue'
</script>
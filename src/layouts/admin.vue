<template>
   
    <el-container>
        <el-header>
            <FHeader/>
        </el-header>
      
      <el-container>
        <el-aside width="200px">
            <FMenu/>
        </el-aside>
        <el-main>
            <FTaglist/>
        <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  
</template>
<script setup>
import FHeader from './components/FHeader.vue'
import FMenu from './components/FMenu.vue'
import FTaglist from './components/FTaglist.vue'
</script>
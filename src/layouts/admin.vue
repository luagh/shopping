<template>
    <el-container>
         <el-header>
             <FHeader/>
         </el-header>
         <el-container>
             <el-main>
                 <FTaglist/>
                 <router-view></router-view>
             </el-main>
             <el-aside order="2" style="flex-grow: 0; flex-shrink: 0; flex-basis: 200px;">
                 <FMenu/>
             </el-aside>
         </el-container>
     </el-container>
 </template>
<script setup>
import FHeader from './components/FHeader.vue'
import FMenu from './components/FMenu.vue'
import FTaglist from './components/FTaglist.vue'
</script>
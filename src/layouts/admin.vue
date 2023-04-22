<template>
    <el-container>
         <el-header>
             <FHeader/>
         </el-header>
         <el-container>
             <el-main>
                 <FTaglist/>
                 <router-view v-slot="{Component}">
                    <transition name="fade">
                        <keep-alive :max="10">
                    <component :is="Component"></component>
                </keep-alive>
                    </transition>
                
                </router-view>
             </el-main>
             <el-aside order="2" style="flex-grow: 0; flex-shrink: 0; flex-basis: 250px;">
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
<style>
.el-aside{
    transition: all 0.2s;
}

.fade-enter-to{
    opacity: 1;
}
.fade-leave-from {
    opacity: 1;
}

.fade-enter-from{
    opacity: 0;

}
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active{
    transition-delay: 0.3s;

}
.fade-leave-active{
    transition: all 0.3s;
    
}
</style>
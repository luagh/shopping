<template>
    <div class="f-tag-list" :style="{ right: $store.state.asideWidth }">
        <el-tabs
    v-model="activeTab"
    type="card"
    class="demo-tabs"
    @tab-change="changeTab" 
    @tab-remove="removeTab"
  >
    <el-tab-pane
      v-for="item in tabList"
      :key="item.path"
      :label="item.title"
      :name="item.path"
      :closable="item.path != '/'"
    > 
      {{ item.content }}
    </el-tab-pane>
  </el-tabs>

  <span class="tag-btn">
    <el-dropdown>
    <span class="el-dropdown-link">
      <el-icon >
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>Action 1</el-dropdown-item>
        <el-dropdown-item>Action 2</el-dropdown-item>
        <el-dropdown-item>Action 3</el-dropdown-item>
        <el-dropdown-item disabled>Action 4</el-dropdown-item>
        <el-dropdown-item divided>Action 5</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  </span>
    </div>
    <div style="height:44px;"></div>
</template>
<script setup>
import { ref } from 'vue'
import { useRoute ,onBeforeRouteUpdate} from 'vue-router'
import { useCookies } from '@vueuse/integrations/useCookies'
import { router } from '../../router';

const cookie =useCookies()
const route= useRoute()
let tabIndex = 2
const activeTab = ref(route.path)
const tabList = ref([
{
    title: '后台首页',
    path:'/',
    
  }, {
    title: '商城管理',
    path:'/goods/list'
    
  },
  
])

//添加标签导航
function addTab(tab){
 let noTab= tabList.value.findIndex( t =>t.path == tab.path) == -1
if(noTab){
    tabList.value.push(tab)
}
cookie.set("tabList",tabList.value)
}
//初始化标签导航列表
function initTabList(){
let tbs =cookie.get("tabList")
if(tbs){
tabList.value =tbs
}
}
initTabList()

onBeforeRouteUpdate( (to,from) => {
activeTab.value=true
    addTab({
        title:to.meta.title,
        path:to.path
})
       
})
const changeTab = (t) => {
    activeTab.value=true
    router.push(t)
}
const removeTab = (targetName) => {

}
</script>
<style>

.f-tag-list{
    @apply fixed bg-gray-100 flex items-center px-2;
    top: 68px;
    left: 0;
    height: 50px;
    z-index: 100;
}
.tag-btn{
    @apply bg-white rounded ml-auto flex items-center justify-center px-2;
    height: 32px;
}
:deep(.el-tabs__header){
    border: 0!important;
    @apply mb-0;
}
:deep(.el-tabs__nav){
    border: 0!important;
}
:deep(.el-tabs__item){
    border: 0!important;
    height: 32px;
    line-height: 32px;
    @apply bg-white mx-1 rounded;
}
:deep(.el-tabs__nav-next),:deep(.el-tabs__nav-prev){
    line-height: 32px;
    height: 32px;
}
:deep(.is-disabled){
    cursor: not-allowed;
    @apply text-gray-300;
}
</style>
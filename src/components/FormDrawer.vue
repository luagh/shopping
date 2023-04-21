<template>
     <el-dialog v-model="showDrawer" :title="title" :width="width"
     :close-on-click-modal="false" :destroy-on-close="destroyOnClose">
       <div class="formDrawer">
        <div class="body">
          <slot></slot>
        </div>
        <div class="actions flex items-center justify-center">
          <el-button type="primary" @click="submit" :loading="loading">{{confirmText}}</el-button>
          <el-button type="default" @click="close">取 消</el-button>
      
        </div>
       </div>
    </el-dialog>
</template>
<script setup>

import { ref } from 'vue'
const showDrawer = ref(false)
const loading = ref(false)

    const showLoading = ()=>loading.value = true
    const hideLoading = ()=>loading.value = false
    const props = defineProps({
        title:String,
        width:{
            type:String,
            default:"35%"
        },
        destroyOnClose:{
            type:Boolean,
            default:false
        },
        confirmText:{
            type:String,
            default:"提交"

        }
    })

    //打开
    const open = () => showDrawer.value = true
    //关闭
    const close = () => showDrawer.value = false
//暴露事件
const emit = defineEmits(['submit'])
    const submit = ()=>emit('submit')
     //向父组件暴露方法
     defineExpose({
        open,
        close,
        showLoading,
        hideLoading
    })
</script>

<style>
  
</style>
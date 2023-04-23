<template>
    <el-aside width="200px" class="image-aside" v-loading="loading">
        <div class="top">
            <AsideList :active="activeId == item.id" v-for="(item, index) in list" :key="index">
                {{ item.name }}
            </AsideList>
        </div>
        <div class="bottom">
            <el-pagination :pager-count="11" layout="prev,pager, next" :total="total" :current-page="currentPage"
                :page-size="limit" @current-change="getData" />
        </div>
    </el-aside>
</template>
<script setup>
import { ref } from 'vue';
import AsideList from './AsideList.vue';
import { getImageClassList } from '~/api/image_class.js';

//加载动画
const loading = ref(false)
const list = ref([])
const activeId = ref(0)

//分页
const currentPage = ref(1)
const total = ref(0)
const limit = ref(10)

//获取数据
function getData(p = null) {
    if (typeof p == 'number') {
        currentPage.value = p
    }
    loading.value = true
    getImageClassList(currentPage.value)
        .then(res => {
            total.value = res.totalCount
            list.value = res.list
            let item = list.value[0]
            if (item) {
                activeId.value = item.id
                // handleChangeActiveId(item.id)
            }

        }).finally(() => {
            loading.value = false
        })
}

getData()


</script>
<style>
.image-aside {
    border-right: 1px solid #eee;
    position: relative;
}

.image-aside .top {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 50px;
    overflow-y: auto;
}

.image-aside .bottom {
    position: absolute;
    bottom: 0;
    height: 50px;
    left: 0;
    right: 0;
    @apply flex items-center justify-center
}

.aside-list {
    border-bottom: 1px solid #f4f4f4;
    cursor: pointer;
    @apply flex items-center p-3 text-sm text-gray-600
}

.aside-list:hover {
    @apply bg-blue-50;
}
</style>
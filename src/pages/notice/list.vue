<template>
    <el-card shadow="never">
        <!-- 新增|刷新 -->
        <div class="flex items-center justify-between mb-4">
            <el-button type="primary" size="small">新增</el-button>
            <el-tooltip effect="dark" content="刷新数据" placement="top">
                <el-button text @click="getData">
                    <el-icon size="20">
                        <Refresh />
                    </el-icon>
                </el-button>
            </el-tooltip>
        </div>

        <el-table :data="tableData" stripe style="width: 100%" v-loading="loading">
            <el-table-column prop="title" label="公告标题" />
            <el-table-column prop="create_time" label="发布时间" width="380" />
            <el-table-column label="操作" width="180px" align="center">
                <template #default="scope">
                    <el-button type="primary" size="small" text>修改</el-button>
                    <el-popconfirm title="是否要删除" confirmbuttontext="确认" cancelbuttontext="取消"
                        @confirm="handleDelete(scope.row.id)">
                        <template #reference>
                            <el-button text type="primary" size="small">删除
                            </el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <div class="flex items-center justify-center mt-5">
            <el-pagination :pager-count="11" layout="prev,pager, next" :total="total" :current-page="currentPage"
                :page-size="limit" @current-change="getData" />
        </div>

    </el-card>
</template>
<script setup>
import { ref } from "vue"
import { getNoticeList } from "~/api/notice.js"

const tableData = ref([])
const loading = ref(false)
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
    getNoticeList(currentPage.value)
        .then(res => {
            tableData.value = res.list
            total.value = res.totalCount
        }).finally(() => {
            loading.value = false
        })
}

getData()
</script>
<style></style>
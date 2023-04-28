<template>
    <el-drawer title="推广人列表" v-model="dialogVisible" size="70%">
        <!-- 搜索 -->
        <el-form :model="searchForm" size="normal">
            <el-form-item label="时间选择">
                <el-radio-group v-model="searchForm.type">
                    <el-radio-button label="all">全部</el-radio-button>
                    <el-radio-button label="today">今天</el-radio-button>
                    <el-radio-button label="yesterday">昨天</el-radio-button>
                    <el-radio-button label="last7days">最近7天</el-radio-button>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="开始日期">
                <el-date-picker v-model="searchForm.starttime" type="date" placeholder="开始日期" value-format="YYYY-MM-DD"
                    style="width:90%" />
            </el-form-item>
            <el-form-item label="结束时间">
                <el-date-picker v-model="searchForm.endtime" type="date" placeholder="结束时间" value-format="YYYY-MM-DD"
                    style="width:90%" />
            </el-form-item>
            <el-form-item label="用户类型">
                <el-radio-group v-model="searchForm.level">
                    <el-radio-button :label="0">全部</el-radio-button>
                    <el-radio-button :label="1">今天</el-radio-button>
                    <el-radio-button :label="2">昨天</el-radio-button>

                </el-radio-group>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="getData">立即创建</el-button>
                <el-button @click="resetSearchForm">取消</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="tableData" stripe style="width: 100%" v-loading="loading">
            <el-table-column label="ID" prop="id" align="center" />
            <el-table-column label="头像" width="65">
                <template #default="{ row }">

                    <el-avatar :size="40" :src="row.avatar">
                        <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.
png" />
                    </el-avatar>
                </template>
            </el-table-column>
            <el-table-column label="用户信息" prop="username" width="100">
                <template #default="{ row }">
                    <div class="text-xs">
                        <p>用户：{{ row.username }}</p>
                        <p>昵称：{{ row.nickname }}</p>
                        <p>姓名：{{ row.user_info.name }}</p>
                        <p>电话：{{ row.phone }}</p>
                    </div>
                </template>
            </el-table-column>

            <el-table-column label="用户信息" prop="username" align="center" width="110px"></el-table-column>
            <el-table-column label="订单数量" prop="share_num" align="center" width="90px"></el-table-column>
            <el-table-column label="订单金额" prop="share_order_num" align="center" width="90px"></el-table-column>
            <el-table-column label="绑定时间" prop="create_time" align="center" width="90px"></el-table-column>


            <el-table-column label="操作" width="180px" align="center">
                <template #default="{ row }">
                    <el-button @click="openDataDrawer(row.id)" type="primary" size="small" text>
                        推广人</el-button>
                    <el-button type="primary" size="small" text>推广订单</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="flex items-center justify-center mt-5">
            <el-pagination :pager-count="11" layout="prev,pager, next" :total="total" :current-page="currentPage"
                :page-size="limit" @current-change="getData" />
        </div>
    </el-drawer>
</template>


<script setup>
import { ref } from "vue";
import {
    getAgentList, getAgentOrderList
} from "~/api/distribution.js"
import { useInitTable } from '~/composables/useCommon.js'

defineProps({
    type: {
        type: String,
        default: "user"
    }
})
const dialogvisible = ref(false)
const {
    searchForm,
    resetSearchForm,
    tableData,
    loading,
    currentPage,
    total,
    limit,
    getData
} = useInitTable({
    searchForm: {
        type: "all",
        starttime: null,
        endtime: null,
        level: 0,
        user_id: 0
    },
    getList: getAgentList,
    onGetListSuccess: (res) => {
        tableData.value = res.list
        total.value = res.totalCount

    }
})

const open = (id) => {

    dialogvisible.value = true
    searchForm.user_id = id
    getData()
}

defineExpose({
    open
})


</script>
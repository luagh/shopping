<template>
    <el-card shadow="never">
        <!-- 新增|刷新 -->
        <div class="flex items-center justify-between mb-4">
            <el-button type="primary" size="small" @click="handlecreate">新增</el-button>
            <el-tooltip effect="dark" content="刷新数据" placement="top">
                <el-button text @click="getData">
                    <el-icon size="20">
                        <Refresh />
                    </el-icon>
                </el-button>
            </el-tooltip>
        </div>

        <el-table :data="tableData" stripe style="width: 100%" v-loading="loading">
            <el-table-column label="优惠券名称" width="350">
                <template #default="{ row }">
                    <div class=" border border-dashed py-2 px-4 rounded "
                        :class="row.statusText == '领取中' ? 'active' : 'inactive'">
                        <h5 class="font-bold text-md">{{ row.name }}</h5>
                        <small>{{ row.start_time }}~ {{ row.end_time }}</small>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="statusText" label="状态" />
            <el-table-column label="优惠">
                <template #default="{ row }">
                    {{ row.type ? "满减" : "折扣" }}{{ row.type ? ("￥" + row.value) : (row.value + "折") }}
                </template>

            </el-table-column>
            <el-table-column prop="total" label="发放数量" />
            <el-table-column prop="used" label="已使用" />
            <el-table-column label="操作" width="180px" align="center">
                <template #default="scope">
                    <el-button type="primary" size="small" text @click="handleEdit(scope.row)">修改</el-button>
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
        <FormDrawer ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
            <el-form :model="form" ref="formRef" :rules="rules" label-width="80px" :inline="false">
                <el-form-item label="公告标题" prop="title">
                    <el-input v-model="form.title" placeholder="公告标题"></el-input>
                </el-form-item>
                <el-form-item label="公告内容" prop="content">
                    <el-input v-model="form.content" placeholder="公告内容" type="textarea" :rows="5"></el-input>
                </el-form-item>
            </el-form>
        </FormDrawer>
    </el-card>
</template>
<script setup>
import {
    getCouponList, createCoupon, updateCoupon,
    deleteCoupon, updateCouponStatus
} from "~/api/coupon.js"
import FormDrawer from "~/components/FormDrawer.vue";
import { useInitTable, useInitForm } from '~/composables/useCommon.js'

function formatstatus(row) {
    let s = "领取中"
    let start_time = (new Date(row.start_time)).getTime()
    let now = (new Date()).getTime()
    let end_time = (new Date(row.end_time)).getTime()
    if (start_time > now) {
        s = "未开始"
    } else if (end_time < now) {
        s = "已结束"
    } else if (row.status == 0) {
        s = "已失效"
    }
    return s
}
const {
    tableData,
    loading,
    currentPage,
    total,
    limit,
    getData,
    handleDelete
} = useInitTable({
    getList: getCouponList,
    onGetListSuccess: (res) => {
        tableData.value = res.list.map(o => {
            //转化优惠券状态
            o.statusText = formatstatus(o)
            return o
        })
        total.value = res.totalCount
    },
    delete: deleteCoupon
})


const {
    formDrawerRef,
    formRef,
    form,
    rules,
    drawerTitle,
    handleSubmit,
    handlecreate,
    handleEdit } = useInitForm({
        form: {
            title: '',
            content: ''
        },
        rules: {
            title: [{ required: true, message: '公告标题不能为空', trigger: 'blur' },],
            content: [{ required: true, message: '公告内容不能为空', trigger: 'blur' },]
        },
        getData,
        update: updateCoupon,
        create: createCoupon
    })
</script>
<style scoped>
.active {
    @apply border-rose-200 bg-rose-500 text-red-400;
}


.inactive {
    @apply border-gray-200 bg-gray-50 text-gray-400;
}
</style>
<template>
    <el-card shadow="never" class="border-0">
        <ListHeader @refresh="getData" @create="handlecreate" />
        <el-tree :data="tableData" :props="{ label: 'name', children: 'child' }" v-loading="loading" node-key="id">
            <template #default="{ node, data }">
                <div class="custom-tree-node">
                    <span>{{ data.name }}</span>
                    <div class="ml-auto">
                        <el-switch :modelValue="data.status" :active-value="1" inactive-value="0"
                            @change="handlestatusChange($event, data)" />
                        <el-button text type="primary" size="small" @click.stop="handleEdit(data)">修改</el-button>

                        <el-popconfirm title="是否要删除" confirmbuttontext="确认" cancelbuttontext="取消"
                            @confirm="handleDelete(data.id)">
                            <template #reference>
                                <el-button text type="primary" size="small">删除
                                </el-button>
                            </template>
                        </el-popconfirm>
                    </div>
                </div>
            </template>
        </el-tree>
        <FormDrawer ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
            <el-form :model="form" ref="formRef" :rules="rules" label-width="80px" :inline="false">
                <el-form-item label="分类名称" prop="name">
                    <el-input v-model="form.name" placeholder="分类名称"></el-input>
                </el-form-item>
            </el-form>
        </FormDrawer>
    </el-card>
</template>
<script setup>
import { useInitTable, useInitForm } from "~/composables/useCommon.js"
import { getCategoryList, createCategory, updateCategory, updateCategoryStatus, deleteCategory } from "~/api/category.js";
import FormDrawer from "~/components/FormDrawer.vue";
import ListHeader from "~/components/ListHeader.vue";

const {
    loading,
    tableData,
    getData,
    handleDelete,
    handlestatusChange
} = useInitTable({
    getList: getCategoryList,
    onGetListSuccess: (res) => {
        tableData.value = res

    },
    delete: deleteCategory,
    updateStatus: updateCategoryStatus
})

const {
    formDrawerRef,
    formRef,
    form,
    rules,
    drawerTitle,
    handleSubmit,
    handlecreate,
    handleEdit
} = useInitForm({
    form: {
        name: "",
    },
    getData,
    update: updateCategory,
    create: createCategory
})


</script>
<style>
.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    font-size: 14px;
    padding-right: 8px;
}
</style>
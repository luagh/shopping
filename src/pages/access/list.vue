<template>
    <el-card shadow="never" class="border-0">
        <ListHeader @refresh="getData" />
        <el-tree :data="tableData" :props="{ label: 'name', children: 'child' }" v-loading="loading" node-key="id"
            :default-expanded-keys="defaultExpandedKeys">
            <template #default="{ node, data }">
                <div class="custom-tree-node">
                    <el-tag size="small" :type="data.menu ? '' : 'info'">{{ data.menu ? "菜单" : "权限" }}</el-tag>
                    <el-icon v-if="data.icon" size="16" class="ml-2">
                        <component is="data.icon" />
                    </el-icon>
                    <span>{{ data.name }}</span>
                    <div class="ml-auto">
                        <el-switch modelValue="status" :active-value="1" inactive-value="0" />
                        <el-button text type="primary" size="small">修改</el-button>
                        <el-button text type="primary" size="small">增加</el-button>
                        <el-button text type="primary" size="small">删除</el-button>
                    </div>
                </div>
            </template>
        </el-tree>
    </el-card>
</template>
<script setup>
import { useInitTable } from "~/composables/useCommon.js"
import ListHeader from "~/components/ListHeader.vue";
import { getRuleList } from "~/api/rule.js";
import { ref } from "vue";


const defaultExpandedKeys = ref([])

const {
    loading,
    tableData,
    getData
} = useInitTable({
    getList: getRuleList,
    onGetListSuccess: (res) => {
        tableData.value = res.list
        defaultExpandedKeys.value = res.list.map(o => o.id)
    }
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
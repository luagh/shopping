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
            <el-table-column prop="name" label="角色名称" />
            <el-table-column prop="desc" label="角色描述" width="380" />
            <el-table-column label="状态" width="120">
                <template #default="{ row }">
                    <el-switch :modelValue="row.status" :active-value="1" inactive-value="0" :loading="row.statusLoading"
                        :disabled="row.super == 1" @change="handleStatuschange($event, row)">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="250px" align="center">
                <template #default="scope">
                    <el-button type="primary" size="small" text @click="openSetRule(scope.row)">配置权限</el-button>
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
                <el-form-item label="角色名称" prop="name">
                    <el-input v-model="form.name" placeholder="角色名称"></el-input>
                </el-form-item>
                <el-form-item label="角色描述" prop="desc">
                    <el-input v-model="form.desc" placeholder="角色描述" type="textarea" :rows="5"></el-input>
                </el-form-item>
                <el-form-item label="状态" prop="status">
                    <el-switch v-model="form.status" :active-value="1" inactive-value="0">
                    </el-switch>
                </el-form-item>
            </el-form>
        </FormDrawer>

        <!-- <!-·权限配置-> -->
        <FormDrawer ref="setRuleFormDrawerRef" title="权限配置" @submit="handleSetRuleSubmit">
            <el-tree-v2 ref="elTreeRef" node-key="id" :default-expanded-keys="defaultExpandedKeys" :data="ruleList"
                :check-strictly="checkStrictly" @check="handleTreeCheck" :props="{ label: 'name', children: 'child' }"
                show-checkbox :height="treeHeight" />
        </FormDrawer>
    </el-card>
</template>
<script setup>
import { getRoleList, createRole, updateRole, deleteRole, updateRoleStatus, setRoleRules } from "~/api/role.js"
import FormDrawer from "~/components/FormDrawer.vue";
import { useInitTable, useInitForm } from '~/composables/useCommon.js'
import { ref } from "vue"
import { getRuleList } from "~/api/rule.js"
import { toast } from "~/composables/util.js"
const {
    tableData,
    loading,
    currentPage,
    total,
    limit,
    getData,
    handleDelete,
    handleStatuschange
} = useInitTable({
    getList: getRoleList,
    delete: deleteRole,
    updateStatus: updateRoleStatus
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
            name: '',
            desc: '',
            status: 1
        },
        rules: {
            name: [{ required: true, message: '角色名称不能为空', trigger: 'blur' },],
            desc: [{ required: true, message: '角色描述不能为空', trigger: 'blur' },]
        },
        getData,
        update: updateRole,
        create: createRole
    })

const setRuleFormDrawerRef = ref(null)
const ruleList = ref([])
const ruleIds = ref([]) //当前角色拥有的权限ID
const defaultExpandedKeys = ref([])
const checkStrictly = ref(false)
const treeHeight = ref(0)
const roleId = ref(0)
const elTreeRef = ref(null)
const openSetRule = (row) => {
    roleId.value = row.id
    treeHeight.value = window.innerHeight - 170
    checkStrictly.value = true
    getRuleList(1).then(res => {
        ruleList.value = res.list
        defaultExpandedKeys.value = res.list.map(o => o.id)//默认展开一级菜单
        // 打开弹窗
        setRuleFormDrawerRef.value.open()

        //当前角色拥有的权限ID
        ruleIds.value = row.rules.map(o => o.id)
        setTimeout(() => {
            elTreeRef.value.setCheckedKeys(ruleIds.value)
            checkStrictly.value = false
        }, 150);

    })
}

const handleSetRuleSubmit = () => {
    setRuleFormDrawerRef.value.showLoading()
    setRoleRules(roleId.value, ruleIds.value)
        .then(res => {
            toast("配置成功")
            getData()
            setRuleFormDrawerRef.value.close()
        }).finally(() => {
            setRuleFormDrawerRef.value.hideLoading()
        })
}

const handleTreeCheck = (...e) => {
    const { checkedKeys, halfCheckedKeys } = e[1]
    ruleIds.value = [...checkedKeys, ...halfCheckedKeys]
}

</script>
<style></style>
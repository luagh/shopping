<template>
    <el-card shadow="never" class="border-0">
        <ListHeader @refresh="getData" @create="handlecreate" />
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
                        <el-switch :modelValue="data.status" :active-value="1" inactive-value="0"
                            @change="handleStatusChange($event, data)" />
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
                <el-form-item label="上级菜单" prop="rule_id">
                    <el-cascader placeholder="选择上级菜单" v-model="form.rule_id" :options="options"
                        :props="{ value: 'id', label: 'name', children: 'child', checkStrictly: true, emitPath: false }" />
                </el-form-item>
                <el-form-item label="菜单/规则" prop="menu">
                    <el-radio-group v-model="form.menu">
                        <el-radio :label="1" border>菜单</el-radio>
                        <el-radio :label="0" border>规则</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="名称" prop="name">
                    <el-input v-model="form.name" style="width: 30%;" placeholder="名称"></el-input>
                </el-form-item>
                <el-form-item label="菜单图标" prop="icon" v-if="form.menu == 1">
                    <LconSelect v-model="form.icon" />
                </el-form-item>
                <el-form-item label="前端路由" prop="frontpath" v-if="form.menu == 0 && form.rule_id > 0">
                    <el-input v-model="form.frontpath" placeholder="前端路由"></el-input>
                </el-form-item>
                <el-form-item label="后端规则" prop="condition" v-if="form.menu == 0">
                    <el-input v-model="form.condition" placeholder="后端规则"></el-input>
                </el-form-item>
                <el-form-item label="请求方式" prop="method" v-if="form.menu == 0">
                    <el-select v-model="form.method" class="m-2" placeholder="请选择请求方式">
                        <el-option v-for="item in ['GET', 'POST', 'PUT', 'DELETE']" :key="item" :label="item"
                            :value="item" />
                    </el-select>
                </el-form-item>
                <el-form-item label="排序" prop="order">
                    <el-input-number v-model="form.order" :min="0" :max="1000" />
                </el-form-item>

            </el-form>
        </FormDrawer>
    </el-card>
</template>
<script setup>
import { useInitTable, useInitForm } from "~/composables/useCommon.js"
import { getRuleList, createRule, updateRule, updateRuleStatus, deleteRule } from "~/api/rule.js";
import { ref } from "vue";
import FormDrawer from "~/components/FormDrawer.vue";
import ListHeader from "~/components/ListHeader.vue";
import LconSelect from "~/components/lconSelect.vue";

const defaultExpandedKeys = ref([])
const options = ref([])
const {
    loading,
    tableData,
    getData,
    handleDelete,
    handlestatusChange
} = useInitTable({
    getList: getRuleList,
    onGetListSuccess: (res) => {
        options.value = res.rules
        tableData.value = res.list
        defaultExpandedKeys.value = res.list.map(o => o.id)
    },
    delete: deleteRule,
    updateStatus: updateRuleStatus
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
        menu: 0,
        rule_id: 0,
        condition: "",
        method: "GET",
        status: 1,
        order: 50,
        icon: "",
        frontpath: ""
    },
    getData,
    update: updateRule,
    create: createRule
})

//添加子分类
const addchild = (id) => {
    handleCreate()
    form.rule_id = id
    form.status = 1
}

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
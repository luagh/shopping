<template>
    <div>
        <el-tabs v-model="searchForm.tab" @tab-change="getData">
            <el-tab-pane :label="item.name" :name="item.key" v-for="(item, index) in tabbars" :key="index"></el-tab-pane>
        </el-tabs>

        <el-card shadow="never" class="border-0">

            <!-- 搜索 -->
            <Search :model="searchForm" @search="getData" @reset="resetSearchForm">
                <SearchItem label="关键词">
                    <el-input v-model="searchForm.title" placeholder="商品名称" clearable></el-input>
                </SearchItem>
                <template #show>
                    <SearchItem label="商品分类">
                        <el-cascader v-model="searchForm.category_id" :options="category_list"
                            :props="{ value: 'id', label: 'name', children: 'child', checkStrictly: true, emitPath: false }"
                            placeholder="请选择商品分类" />
                    </SearchItem>
                </template>
            </Search>
            <!-- <div class="flex items-center justify-between mb-4">
                <el-button type="primary" size="small" @click="handlecreate">新增</el-button>

                <el-tooltip effect="dark" content="刷新数据" placement="top">
                    <el-button text @click="getData">
                        <el-icon size="20">
                            <Refresh />
                        </el-icon>
                    </el-button>
                </el-tooltip>
            </div>
         -->
            <ListHeader layout="create,refresh,delete" @create="handleCreate" @refresh="getData"
                @delete="handleMultiDelete">
                <el-button size="small" @click="handleMultiStatusChange(1)"
                    v-if="searchForm.tab == 'all' || searchForm.tab == 'off'">上架</el-button>
                <el-button size="small" @click="handleMultiStatusChange(0)"
                    v-if="searchForm.tab == 'all' || searchForm.tab == 'saling'">下架</el-button>
            </ListHeader>

            <el-table ref="multipleTableRef" @selection-change="handleSelectionChange" :data="tableData" stripe
                style="width: 100%" v-loading="loading">
                <el-table-column type="selection" width="55" />
                <el-table-column prop="title" label="商品" width="300">
                    <template #default="{ row }">
                        <div class="flex">
                            <el-image class="mr-3 rounded" :src="row.cover" fit="cover" :lazy="true"
                                style="width: 50px;height: 50px;"></el-image>
                            <div class="flex-1">
                                <p>{{ row.title }}</p>
                                <div>
                                    <span class="text-rose-500">¥{{ row.min_price }}</span>
                                    <el-divider direction="vertical"></el-divider>
                                    <span class="text-gray-500 text-xs">¥{{ row.min_oprice }}</span>
                                </div>
                                <p class="text-gray-400 text-xs mb-1">分类:{{ row.category ? row.category?.name : '未分类' }}
                                </p>
                                <p class="text-gray-400 text-xs">创建时间:{{ row.create_time }}</p>

                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="实际销量" width="70" prop="sale_count"></el-table-column>
                <el-table-column label="商品状态" width="70">
                    <template #default="{ row }">
                        <el-tag :type="row.status ? 'primary' : 'info'" size="small">{{ row.status ? '上架' : '仓库'
                        }}</el-tag>

                    </template>

                </el-table-column>
                <el-table-column v-if="searchForm.tab != 'delete'" label="审核状态" width="120" align="center">
                    <template #default="{ row }">
                        <div class="flex flex-col" v-if="row.ischeck == 0">
                            <el-button type="primary" size="small" plain>审核通过</el-button>
                            <el-button class="mt-2 !ml-0" type="info" size="small" plain>审核拒绝</el-button>
                        </div>
                        <span v-else>{{ row.ischeck == 1 ? '通过' : '拒绝' }}</span>
                    </template>

                </el-table-column>

                <el-table-column align="center" label="总库存" width="90" prop="stock"></el-table-column>
                <el-table-column prop="create_time" label="创建时间" width="180" />
                <el-table-column label="操作" align="center">
                    <template #default="scope">
                        <div v-if="searchForm.tab != 'delete'">
                            <el-button class="px-1" type="primary" size="small" text
                                @click="handleEdit(scope.row)">修改</el-button>

                            <el-button class="px-1"
                                :type="(scope.row.sku_type == 0 && !scope.row.sku_value) || (scope.row.sku_type == 1 && scope.row.goods_skus != null) ? 'danger' : 'primary'"
                                size="small" text @click="handleSetGoodsSkus(scope.row)"
                                :loading="scope.row.skusLoading">商品规格</el-button>

                            <el-button class="px-1" :type="scope.row.goods_banner.length == 0 ? 'danger' : 'primary'"
                                size="small" text @click="handleSetGoodsBanners(scope.row)"
                                :loading="scope.row.bannersLoading">设置轮播图</el-button>

                            <el-button class="px-1" :type="!scope.row.content ? 'danger' : 'primary'" size="small" text
                                @click="handleSetGoodsContent(scope.row)"
                                :loading="scope.row.contentLoading">商品详情</el-button>

                            <el-popconfirm title="是否要删除该商品" confirm-button-text="确认" cancel-button-text="取消"
                                @confirm="handleDelete([scope.row.id])">
                                <template #reference>
                                    <el-button class="px-1" text type="primary" size="small">删除</el-button>
                                </template>
                            </el-popconfirm>
                        </div>
                        <span v-else>暂无操作</span>
                    </template>
                </el-table-column>
            </el-table>
            <div class="flex items-center justify-center mt-5">
                <el-pagination :pager-count="11" layout="prev,pager, next" :total="total" :current-page="currentPage"
                    :page-size="limit" @current-change="getData" />
            </div>
            <FormDrawer ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
                <el-form :model="form" ref="formRef" :rules="rules" label-width="80px" :inline="false">
                    <el-form-item label="商品名称" prop="title">
                        <el-input v-model="form.title" placeholder="商品名称"></el-input>
                    </el-form-item>
                    <el-form-item label="封面" prop="cover">
                        <ChooseImage v-model="form.cover" />
                    </el-form-item>
                    <el-form-item label="商品分类" prop="category_id">
                        <el-select v-model="form.category_id" value-key="" placeholder="选择所属商品分类" clearable filterable>
                            <el-option v-for="item in category_list" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="商品描述" prop="desc">
                        <el-input type="textarea" v-model="form.desc" placeholder="商品描述"></el-input>
                    </el-form-item>
                    <el-form-item label="单位" prop="unit">
                        <el-input v-model="form.unit" placeholder="请输入单位" style="width:50%"></el-input>
                    </el-form-item>

                    <el-form-item label="总库存" prop="stock">
                        <el-input v-model="form.stock" type="number" placeholder="请输总库存" style="width:50%">
                            <template #append>件</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="预警库存" prop="min_stock">
                        <el-input v-model="form.min_stock" type="number" placeholder="请输预警库存" style="width:50%">
                            <template #append>件</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="最低销售价" prop="min_price">
                        <el-input v-model="form.min_price" type="number" placeholder="请输最低销售价" style="width:50%">
                            <template #append>元</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="最低原价" prop="min_oprice">
                        <el-input v-model="form.min_oprice" type="number" placeholder="请输最低原价" style="width:50%">
                            <template #append>元</template>
                        </el-input>
                    </el-form-item>

                    <el-form-item label="库存显示" prop="stock_display">
                        <el-radio-group v-model="form.stock_display">
                            <el-radio :label="0">隐藏</el-radio>
                            <el-radio :label="1">显示</el-radio>

                        </el-radio-group>

                    </el-form-item>

                    <el-form-item label="是否上架" prop="status">
                        <el-radio-group v-model="form.status">
                            <el-radio :label="0">放入仓库</el-radio>
                            <el-radio :label="1">立即上架</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-form>
            </FormDrawer>
        </el-card>
    </div>
</template>
<script setup>

import { ref } from "vue"
import FormDrawer from "~/components/FormDrawer.vue";
import ChooseImage from "~/components/Chooselmage.vue";
import Search from "~/components/Search.vue";
import SearchItem from "~/components/SearchItem.vue";
import ListHeader from "~/components/ListHeader.vue";

import {
    getGoodsList, updateGoodsStatus,
    createGoods, updateGoods, deleteGoods
} from "~/api/goods.js"
import {
    getCategoryList
} from "~/api/category.js"
import { useInitTable, useInitForm } from '~/composables/useCommon.js'

const roles = ref([])

const {
    searchForm,
    resetSearchForm,
    tableData,
    loading,
    currentPage,
    total,
    limit,
    getData,
    handleDelete,
    handleSelectionChange,
    multipleTableRef,
    handleMultiDelete,
    handleMultiStatusChange
} = useInitTable({
    searchForm: {
        title: "",
        tab: "all",
        category_id: null,
    },
    getList: getGoodsList,
    onGetListSuccess: (res) => {
        tableData.value = res.list.map(o => {
            o.statusLoading = false
            return o
        })
        total.value = res.totalCount
    },
    delete: deleteGoods,
    updateStatus: updateGoodsStatus

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
        title: null, //商品名称
        category_id: null, //商品分类
        cover: null, //商品封面
        desc: null, //描述
        unit: '件', //商品单位 
        stock: 100, //商品库存
        min_stock: 10, //库存预警
        status: 0, //商品是否上架 0 仓库 1上架
        stock_display: 0, //商品库存是否显示0隐藏 1显示
        min_price: 0, //最低销售价
        min_oprice: 0,  //最低原价
    },
    getData,
    update: updateGoods,
    create: createGoods
})

//Tabs 标签页
const tabbars = [
    {
        key: 'all',
        name: '全部'
    }, {
        key: 'checking',
        name: '审核中'
    }, {
        key: 'saling',
        name: '出售中'
    }, {
        key: 'off',
        name: '已下架'
    }, {
        key: 'min_stock',
        name: '库存预警'
    }, {
        key: 'delete',
        name: '回收站'
    }]
//商品分类

const category_list = ref([])
getCategoryList().then(res => category_list.value = res)

const showSearch = ref(false)

</script>
<style></style>
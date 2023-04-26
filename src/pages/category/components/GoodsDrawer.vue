<template>
    <FormDrawer ref="formDrawerRef" title="推荐商品">
        <el-table :data="tableData" border stripe style="width: 100%;">
            <el-table-column prop="goods_id" label="ID" width="60" />
            <el-table-column label="商品封面" width="60">
                <template #default="{ row }">
                    <el-image :src="row.cover" fit="fill" :lazy="true" style="width:64px;height:64px;"></el-image>
                </template>
            </el-table-column>
            <el-table-column prop="name" label="商品名称" width="60" />
            <el-table-column label="商品名称" width="60">
                <template #default="{ row }">
                    <el-popconfirm title="是否要删除" confirmbuttontext="确认" cancelbuttontext="取消" @confirm="handleDelete(row)">
                        <template #reference>
                            <el-button text type="primary" size="small" :loading="row.loading">删除
                            </el-button>
                        </template>
                    </el-popconfirm>

                </template>

            </el-table-column>

        </el-table>

    </FormDrawer>
</template>
<script setup>
import { ref } from "vue"
import { toast } from "~/composables/util.js"
import FormDrawer from "~/components/FormDrawer.vue";
import {
    getCategoryGoods, deleteCategoryGoods
} from "~/api/category.js"
const formDrawerRef = ref(null)
const tableData = ref([])
const category_id = ref(0)
const open = (item) => {
    category_id.value = item.id
    item.goodsDrawerLoading = true
    getData().then(res => {
        formDrawerRef.value.open()
    }).finally(() => {
        item.goodsDrawerLoading = false

    })

}

function getData() {
    return getCategoryGoods(category_id.value).then(res => {
        tableData.value = res.map(o => {
            o.loading = false
            return o
        })
    })
}

const handleDelete = (row) => {
    row.loading = true
    deleteCategoryGoods(row.id).then(res => {
        toast('删除成功')
        getData()

    }).finally(() => {
        row.loading = false
    })
}

// const chooseGoodsRef = ref(null)
// const handleConnect = () => {
//     //console.log(111);
//     chooseGoodsRef.value.open((goods_ids) => {
//         formDrawerRef.value.showLoading()
//         connectCategoryGoods({
//             id: category_id.value,
//             goods_ids: goods_ids
//         }).then(res => {
//             getData()
//             toast('关联成功')
//         }).finally(() => {
//             formDrawerRef.value.hideLoading()

//         })

//     })
// }

defineExpose({
    open

})
</script>
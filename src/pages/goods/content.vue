<template>
    <FormDrawer ref="formDrawerRef" title="设置商品详情" @submit="submit" :destroy-on-close="true">
        <el-form :model="form" label-width="80px">
            <el-form-item label="商品详情">
                <Editor v-model="form.content"></Editor>
            </el-form-item>

        </el-form>
    </FormDrawer>
</template>


<script setup>
import { reactive, ref } from "vue";
import FormDrawer from "~/components/FormDrawer.vue";
import { toast } from '~/composables/util.js'
import { readGoods, updateGoods } from '~/api/goods.js'
import Editor from "~/components/Editor.vue";
const formDrawerRef = ref(null)

const form = reactive({
    content: '',

})
const goodsId = ref(0)
const open = (row) => {
    goodsId.value = row.id
    row.contentLoading = true
    readGoods(goodsId.value).then(res => {
        form.content = res.content
        formDrawerRef.value.open()

    }).finally(() => {
        row.contentLoading = false
    })



}

const emit = defineEmits(['reloadData'])
const submit = () => {
    formDrawerRef.value.showLoading()
    updateGoods(goodsId.value, form).then(res => {
        toast(`设置商品详情成功`)
        formDrawerRef.value.close()
        emit('reloadData')
    }).finally(() => {
        formDrawerRef.value.hideLoading()
    })


}

defineExpose({
    open
})

</script> 
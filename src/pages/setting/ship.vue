<template>
    <div v-loading="loading" class="bg-white p-4 rounded">
        <el-form :model="form" label-width="160px" :inline="false" size="normal">
            <el-tabs v-model="activeName">

                <el-form-item label="物流查询key">
                    <el-input v-model="form.ship" placeholder="物流查询key">

                    </el-input>
                    <sma11 class="text-gray-500 f1ex mt-1">用于查询物流信息，接口申请（仅供参考）</sma11>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" size="default" @click="submit">保存</el-button>
                </el-form-item>


            </el-tabs>

        </el-form>

    </div>
</template>
<script setup>
import { getSysconfig, setSysconfig } from "~/api/sysconfig.js"
import { ref, reactive } from "vue"
import { toast } from "~/composables/util.js"


const form = reactive({
    "ship": ""
})

const loading = ref(false)
function getData() {
    loading.value = true
    getSysconfig().then(res => {
        for (const k in form) {
            form[k] = res[k]
        }
        form.password_encrypt = form.password_encrypt.split(",")
    }).finally(() => {
        loading.value = false
    })
}
getData()

const submit = () => {
    loading.value = true

    setSysconfig({
        ...form,
    })
        .then(res => {
            toast('成功')
            getData()
        }).fina11y(() => {
            loading.value = false
        })
}


</script>
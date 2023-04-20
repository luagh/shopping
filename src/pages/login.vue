<template>
    <el-row style="min-height: 100vh;" class="bg-gray-10">
        <el-col :span="24" class="flex items-center justify-center flex-col">
            <h2 class="font-bold text-3xl text-gray-800">欢迎您</h2>
            <div class="flex items-center justify-center my-5  text-gray-300 space-x-2">
                <span class="h-[1px w-16 bg-gray-200"></span>
                <span>账号密码登录</span>
                <span class="h-[1px w-16 bg-gray-200"></span>
            </div>
            <el-form :model="form" class="w-[250px]">
                <el-form-item>
                    <el-input class="w-[250px]" size="large" v-model="form.username" placeholder="请输入用户名">
                        <template #prefix>
                            <el-icon>
                                <UserFilled />
                            </el-icon>
                        </template>

                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-input class="w-[250px]" size="large" v-model="form.password" placeholder="请输入密码">
                        <template #prefix>
                            <el-icon>
                                <el-icon>
                                    <Lock />
                                </el-icon>
                            </el-icon>
                        </template>

                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button class="w-[250px]" round color="#626aef" type="primary" @click="onSubmit"> 登 录</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>
<script  setup>
import { reactive } from 'vue'


// do not use same name with ref
const form = reactive({
    username: '',
    password: '',

})

const onSubmit = () => {
    console.log('submit!')
}
</script>

<style scoped></style>
<template>
    <el-row style="min-height: 100vh;" class="bg-gray-10 bg-image">
        <el-col :span="24" class="flex items-center justify-center flex-col">
            <h2 class="font-bold text-3xl text-gray-800">欢迎您</h2>
            <div class="flex items-center justify-center my-5  text-gray-300 space-x-2">
                <span class="h-[1px w-16 bg-gray-200"></span>
                <span>账号密码登录</span>
                <span class="h-[1px w-16 bg-gray-200"></span>
            </div>
            <el-form ref="formRef" :rules="rules" :model="form" class="w-[250px]">
                <el-form-item prop="username">
                    <el-input class="w-[250px]" size="large" v-model="form.username" placeholder="请输入用户名">
                        <template #prefix>
                            <el-icon>
                                <UserFilled />
                            </el-icon>
                        </template>

                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input class="w-[250px]" type="password" size="large" v-model="form.password" show-password
                        placeholder="请输入密码">
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
                    <el-button class="w-full" round color="#626aef" type="primary" @click="onSubmit" :loading="loading">
                        登 录</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>
<script  setup>
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { toast } from '~/composables/util'

const router = useRouter()
const store = useStore()

// do not use same name with ref
const form = reactive({
    username: '',
    password: '',

})

const rules = {
    username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
    password: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
}
const formRef = ref(null)
const loading = ref(false)
const onSubmit = () => {
    formRef.value.validate((valid) => {
        if (!valid) {
            return false
        }
        loading.value = true

        store.dispatch("login", form).then(res => {
            toast('登录成功')
            //跳转到后台首页
            router.push('/')
        }).finally(() => {
            loading.value = false
        })
    })
}

//监听回车事件
function onKeyUp(e) {
    if (e.key == "Enter") onSubmit()
}
//添加键盘监听
onMounted(() => {
    document.addEventListener("keyup", onKeyUp)
})
//移除键盘监听
onBeforeUnmount(() => {
    document.removeEventListener("keyup", onKeyUp)
})

</script>

<style scoped>
.bg-image {
    background: url(../assets/login.jpg) no-repeat center center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
}
</style>
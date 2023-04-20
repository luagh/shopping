<template>
    <el-row style="min-height: 100vh;" class="bg-gray-10">
        <el-col :span="24" class="flex items-center justify-center flex-col">
            <h2 class="font-bold text-3xl text-gray-800">欢迎您</h2>
            <div class="flex items-center justify-center my-5  text-gray-300 space-x-2">
                <span class="h-[1px w-16 bg-gray-200"></span>
                <span>账号密码登录</span>
                <span class="h-[1px w-16 bg-gray-200"></span>
            </div>
            <el-form ref="formRef" :rules="rules" :model="form" class="w-[250px]">
                <el-form-item prop="username">
                    <el-input   class="w-[250px]" size="large" v-model="form.username" placeholder="请输入用户名">
                        <template #prefix>
                            <el-icon>
                                <UserFilled />
                            </el-icon>
                        </template>

                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input class="w-[250px]" type="password" size="large" v-model="form.password"  show-password placeholder="请输入密码">
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
import {ref, reactive } from 'vue'
import {login} from '~/api/manager'
import {useRouter} from 'vue-router'
import { ElMessage } from 'element-plus'
import {useCookies} from '@vueuse/integrations/useCookies'

const router =useRouter()

// do not use same name with ref
const form = reactive({
    username: '',
    password: '',

})

const rules={
    username:[{required:true,message:'用户名不能为空',trigger:'blur'}],
    password:[{required:true,message:'密码不能为空',trigger:'blur'}]
}
const formRef =ref(null)

const onSubmit = () => {
    formRef.value.validate( (valid)=>{
   if(!valid){
    return false
   }
   login(form.username,form.password)
   .then(res=>{
    console.log(res.data.data);
    ElMessage({
        //提示成功
        message:'登录成功',
        type:'success',
        duration:3000,
    })
    // 存储token和用户相关信息
    const cookie = useCookies()
    cookie.set("admin-token",res.data.data.token)
    //跳转到后台首页
    router.push('/')
})
   .catch(err=>{ 
    ElMessage({
        message:err.response.data.msg ||'请求失败',
        type:'error',
        duration:3000
    })
   })
    })
    
}
</script>

<style scoped></style>
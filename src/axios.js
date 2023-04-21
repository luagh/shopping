import axios from "axios"
import { ElMessage } from 'element-plus'
import { useCookies } from '@vueuse/integrations/useCookies'
//axios请求库

const service = axios.create({
    baseURL: "/api"

})
// 添加请求拦截器
service.interceptors.request.use(function (config) {

    // 往header头自动添加token
    const cookie = useCookies()
    const token = cookie.get("admin-token")
    if (token) {
        config.headers["token"] = token
    }
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response.data.data;
}, function (error) {
    // 对响应错误做点什么
    ElMessage({
        message: err.response.data.msg || '请求失败',
        type: 'error',
        duration: 3000
    })

    return Promise.reject(error);
})

export default service
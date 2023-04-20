import axios from '~/axios'

//登录接口交互
export function login(username, password) {
    return axios.post("/admin/login", {
        username,
        password
    })
}
import axios from "axios"
//axios请求库

const service = axios.create({
    baseURL: "/api"

})

export default service
import axios from '~/axios'


// 列表 
export function getGoodsCommentList(page, query = {

}) {
    let q = []
    for (const key in query) {
        if (query[key]) {
            q.push(`${key}=${encodeURIComponent(query[key])}`)
        }
    }
    let r = q.join("&")
    r = r ? ("?" + r) : ""

    return axios.get(`/admin/goods_comment/${page}${r}`)
}

// 修改状态
export function updateGoodsCommentStatus(id, status) {
    return axios.post(`/admin/goods_comment/${id}/update_status`, {
        status
    })
}
export function reviewGoodsComment(id, data) {
    return axios.post(`/admin/goods_comment/review/${id}`, {
        data
    })
}

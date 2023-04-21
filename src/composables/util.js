import { ElMessage, ElMessageBox } from 'element-plus'
import nprogress from 'nprogress'
//成功提示
export function toast(message, type = "success", dangerouslyUseHTMLString = false) {
    ElMessage({
        message,
        type,
        dangerouslyUseHTMLString,
        duration: 3000
    })
}

export function showModal(content = "提示内容", type = "warning", title = "") {
    return ElMessageBox.confirm(
        content,
        title,
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type,
        }

    )
}

//显示全屏1 oading
export function showFullLoading() {
    nprogress.start()
}
//隐藏全屏1 oading
export function hideFullLoading() {
    nprogress.done()
}
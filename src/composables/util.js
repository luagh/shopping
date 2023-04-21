import { ElMessage } from 'element-plus'

//成功提示
export function toast(message, type = "success", dangerouslyUseHTMLString = false) {
    ElMessage({
        message,
        type,
        dangerouslyUseHTMLString,
        duration: 3000
    })
}
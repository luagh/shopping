import { reactive, ref } from "vue"
import { logout, updatepassword } from '~/api/manager'
import { showModal, toast } from "~/composables/util"
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'


export function useRepassword() {
    const router = useRouter()
    const store = useStore()
    const formDrawerRef = ref(null)
    const form = reactive({
        oldpassword: "",
        password: "",
        repassword: "",
    });

    const rules = {
        oldpassword: [
            { required: true, message: '旧密码不能为空', trigger: 'blur' },
            // {min:3,max:20,message:'用户名长度3到20之间',trigger:'blur'}
        ],
        password: [
            { required: true, message: '新密码不能为空', trigger: 'blur' }
        ],
        repassword: [
            { required: true, message: '确认密码不能为空', trigger: 'blur' }
        ]
    }

    const formRef = ref(null)

    const onSubmit = () => {
        formRef.value.validate((valid) => {
            if (!valid) {
                return false
            }
            formDrawerRef.value.showLoading()
            updatepassword(form).then(res => {
                toast('修改密码成功,请重新登录')
                store.dispatch('logout')
                //跳转回登录页
                router.push('/login')

            }).finally(() => {
                formDrawerRef.value.hideLoading()
            })

        })

    }


    const openRePassWordForm = () => formDrawerRef.value.open()

    return {
        formDrawerRef,
        form,
        rules,
        formRef,
        onSubmit,
        openRePassWordForm
    }
}


export function useLogout() {
    const router = useRouter()
    const store = useStore()
    //退出登录
    function handleLogout() {

        showModal('是否要退出登录？').then(res => {
            logout().finally(() => {
                store.dispatch('logout')


                router.push('/login')
                toast('退出成功')
            })

        })
    }
    return {
        handleLogout
    }
}

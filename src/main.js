import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import { router } from './router'
import store from './store'
import 'virtual:windi.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import './permission'
import "nprogress/nprogress.css"
const app = createApp(App)
app.use(store)
app.use(router)

app.use(ElementPlus)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

import permission from '~/directives/permission.js'
app.use(permission)
app.mount('#app')

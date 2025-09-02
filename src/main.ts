import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
// 关闭 Vue Devtools（推荐在生产环境中使用）
app.config.globalProperties.__VUE_DEVTOOLS_GLOBAL_HOOK__ = false

app.mount('#app')

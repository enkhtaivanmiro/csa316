import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'
import './assets/colors.css'
import './assets/text.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL
})

app.use(createPinia())
app.use(router)

app.provide('api',api)

app.mount('#app')

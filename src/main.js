import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import router from "@/router/router";

const application = createApp(App)
application.use(router)
application.mount('#app')

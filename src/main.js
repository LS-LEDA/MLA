import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import router from "@/router/router";
import store from "@/vuex/store";

const application = createApp(App)
application.use(router)
application.use(store)
application.mount('#app')

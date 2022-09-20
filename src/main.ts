import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import router from "@/router/router";
import {createPinia} from "pinia";
import store from "@/vuex/store";

const pinia = createPinia();

const application = createApp(App)
application.use(router)
application.use(store)
application.use(pinia)
application.mount('#app')

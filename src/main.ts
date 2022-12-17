import { createApp } from 'vue';
import App from './App.vue';
import './index.css';
import router from '@/router/router';
import { createPinia } from 'pinia';
import { i18n } from '../locales/i18n';

const pinia = createPinia();

const application = createApp(App);
application.use(router);
application.use(pinia);
application.use(i18n);
application.mount('#app');

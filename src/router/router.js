import { createRouter, createWebHistory } from 'vue-router'
import ImportDataPage from "@/pages/ImportData/ImportDataPage";
import Dashboard from "@/pages/Dashboard";
import Plugins from "@/pages/Plugins";
import Settings from "@/pages/Settings";

const routes = [
    { path: '/', component: ImportDataPage },
    { path: '/import-data', component: ImportDataPage },
    { path: '/dashboard', component: Dashboard },
    { path: '/plugins', component: Plugins },
    { path: '/settings', component: Settings },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
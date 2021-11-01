import { createRouter, createWebHistory } from 'vue-router'
import ImportData from "@/pages/ImportData";
import Dashboard from "@/pages/Dashboard";
import Plugins from "@/pages/Plugins";
import Settings from "@/pages/Settings";

const routes = [
    { path: '/', component: ImportData },
    { path: '/import-data', component: ImportData },
    { path: '/dashboard', component: Dashboard },
    { path: '/plugins', component: Plugins },
    { path: '/settings', component: Settings },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
import { createRouter, createWebHistory } from 'vue-router'
import ImportDataPage from "@/pages/ImportData/ImportDataPage";
import DashboardPage from "@/pages/Dashboard/DashboardPage";
import Plugins from "@/pages/Plugins";
import Settings from "@/pages/Settings";
import Summary from "@/pages/Dashboard/Summary/Summary";

const routes = [
    { path: '/', component: ImportDataPage },
    { path: '/import-data', component: ImportDataPage },
    {
        path: '/dashboard',
        component: DashboardPage,
        children:[
            {
                path: '/dashboard/summary',
                component: Summary
            }
        ]
    },
    { path: '/plugins', component: Plugins },
    { path: '/settings', component: Settings },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
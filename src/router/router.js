import store from '@/vuex/store';

import { createRouter, createWebHistory } from 'vue-router';
import ImportDataPage from "@/pages/ImportData/ImportDataPage";
import DashboardPage from "@/pages/Dashboard/DashboardPage";
import Plugins from "@/pages/Plugins";
import Settings from "@/pages/Settings";
import Summary from "@/pages/Dashboard/Summary/Summary";
import Students from "@/pages/Dashboard/Students/Students";
import Resources from "@/pages/Dashboard/Resources/Resources";
import Sentimental from "@/pages/Dashboard/Sentimental/Sentimental";

const routes = [
    { path: '/', component: ImportDataPage },
    { path: '/import-data', component: ImportDataPage },
    {
        path: '/dashboard',
        component: DashboardPage,
        redirect: "/dashboard/summary",
        children:[
            {
                path: '/dashboard/summary',
                component: Summary
            },
            {
                path: '/dashboard/students',
                component: Students
            },
            {
                path: '/dashboard/resources',
                component: Resources
            },
            {
                path: '/dashboard/sentimental-analysis',
                component: Sentimental,
                beforeEnter: () => {
                    if ( store.state.imported_data !== true ) {
                        // Show alert
                        store.commit('toggleAlert', "Import forum log")
                        // Delayed alert hiding & store timer ID for user manual dismiss
                        store.state.alert.timeout = setTimeout( () => {
                            // Automatically hide alert after 5s
                            store.commit('toggleAlert', "Import forum log")
                        }, 5000);
                        return '/import-data';
                    }
                }
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
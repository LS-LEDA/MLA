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
                component: Summary,
                beforeEnter: () => {
                    return check_imported_moodle_data()
                }
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
                    return check_imported_forum_data();
                }
            }
        ]
    },
    { path: '/plugins', component: Plugins },
    { path: '/settings', component: Settings },
]

function check_imported_forum_data(){
    if ( !store.state.imported_data.forum_logs ) {
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


function check_imported_moodle_data(){
    if ( store.state.imported_data.moodle_logs !== true ) {
        // Show alert
        store.commit('toggleAlert', "Import moodle log")
        // Delayed alert hiding & store timer ID for user manual dismiss
        store.state.alert.timeout = setTimeout( () => {
            // Automatically hide alert after 5s
            store.commit('toggleAlert', "Import moodle log")
        }, 5000);
        return '/import-data';
    }
}

/*function check_imported_data() {
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
}*/

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
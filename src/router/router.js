import store from '@/vuex/store';

import { createRouter, createWebHistory } from 'vue-router';
import {redirectionAlert} from "@/services/utils/utils";
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
                name: "summary",
                beforeEnter: (to, from) => {
                    return check_imported_data(to, from);
                }
            },
            {
                path: '/dashboard/students',
                name: "students",
                component: Students,
                beforeEnter: () => {
                    redirectionAlert("To be implemented for the next release")
                    return false
                }
            },
            {
                path: '/dashboard/resources',
                name: "resources",
                component: Resources,
                beforeEnter: () => {
                    redirectionAlert("To be implemented for the next release")
                    return false
                }
            },
            {
                path: '/dashboard/sentimental-analysis',
                component: Sentimental,
                name: "sentiment",
                beforeEnter: () => {
                    return check_imported_forum_data();
                }
            }
        ]
    },
    {
        path: '/plugins',
        component: Plugins,
        beforeEnter: () => {
            redirectionAlert("To be implemented for the next release")
            return false
        }
    },
    { path: '/settings', component: Settings },
]

function check_imported_forum_data(){
    if ( !store.state.imported_data.forum_logs ) {
        // Show alert
        redirectionAlert("Import Forum log");
        return '/import-data';
    }
}

function check_imported_data(to, from) {
    // Redirect to Sentiment tab if forum log has been imported
    if ( !store.state.imported_data.moodle_logs && store.state.imported_data.forum_logs) {
        // Redirect to import data page if "Summary" button is pressed from the Dashboard's Sentiment page
        if ( to.name === 'summary' && from.name === 'sentiment') {
            redirectionAlert("Import Forum log");
            return '/import-data';
        }
        return '/dashboard/sentimental-analysis';
    }
    // Redirect to Summary tab if moodle log has been imported
    if ( store.state.imported_data.moodle_logs && !store.state.imported_data.forum_logs) {
        return true;
    }
    // Redirect to Summary tab if both files have been imported
    if ( store.state.imported_data.moodle_logs && store.state.imported_data.forum_logs ) {
        return true;
    }
    // Redirect to import data page because there's no data
    redirectionAlert("Import Moodle and/or Forum logs");
    return '/import-data';
}

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
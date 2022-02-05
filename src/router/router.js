import store from '@/vuex/store';

import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router';
import {redirectionAlert} from "@/services/utils/utils";
import ImportDataPage from "@/pages/ImportData/ImportDataPage";
import DashboardPage from "@/pages/Dashboard/DashboardPage";
import Plugins from "@/pages/Plugins/Plugins";
import Settings from "@/pages/Settings/Settings";
import Summary from "@/pages/Dashboard/Summary/Summary";
import Students from "@/pages/Dashboard/Students/Students";
import Resources from "@/pages/Dashboard/Resources/Resources";
import Sentimental from "@/pages/Dashboard/Sentiment/Sentiment";
import General from "@/pages/Settings/General/General";
import Themes from "@/pages/Settings/Themes/Themes";
import About from "@/pages/Settings/About/About";

const routes = [
    {
        path: '/',
        component: ImportDataPage,
        // Called when first loading the app
        // We need to load user preferences like theming
        beforeEnter:(to, from, next) => {
            store.dispatch('getUserSettings');
            // On receive settings handler
            window.ipc.on('read_settings', (args) => {
                store.state.settings = args
                next();
            })
        },
    },
    {
        path: '/import-data',
        name: "import-data",
        component: ImportDataPage,
    },
    {
        path: '/dashboard',
        name: "dashboard",
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
                path: '/dashboard/sentiment',
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
        name: "plugins",
        component: Plugins,
        beforeEnter: () => {
            redirectionAlert("To be implemented for the next release")
            return false
        }
    },
    {
        path: '/settings',
        component: Settings,
        name: "settings",
        redirect: "/settings/general",
        children: [
            {
                path: '/settings/general',
                name: "general",
                component: General,
            },
            {
                path: '/settings/themes',
                name: "themes",
                component: Themes,
            },
            {
                path: '/settings/about',
                name: "about",
                component: About,
            }
        ]
    },
]

function check_imported_forum_data(){
    if ( !store.state.imported_data.forum_logs ) {
        // Show alert
        redirectionAlert("Import Forum log");
        return false;
    }
}

function check_imported_data(to, from) {
    // Redirect to Sentiment tab if forum log has been imported
    if ( !store.state.imported_data.moodle_logs && store.state.imported_data.forum_logs) {
        // Redirect to import data page if "Summary" button is pressed from the Dashboard's Sentiment page
        if ( to.name === 'summary' && from.name === 'sentiment') {
            redirectionAlert("Import Forum log");
            return false;
        }
        return '/dashboard/sentiment';
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
    // https://nklayman.github.io/vue-cli-plugin-electron-builder/guide/commonIssues.html#blank-screen-on-builds-but-works-fine-on-serve
    history: process.env.IS_ELECTRON ? createWebHashHistory() : createWebHistory(),
    routes,
});

export default router;
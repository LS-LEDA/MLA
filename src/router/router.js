import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router';
import {redirectionAlert} from "@/services/utils/utils";
import ImportDataPage from "@/pages/ImportData/ImportDataPage.vue";
import DashboardPage from "@/pages/Dashboard/DashboardPage.vue";
import Plugins from "@/pages/Plugins/Plugins.vue";
import Settings from "@/pages/Settings/Settings.vue";
import Summary from "@/pages/Dashboard/Summary/Summary.vue";
import Students from "@/pages/Dashboard/Students/Students.vue";
import Resources from "@/pages/Dashboard/Resources/Resources.vue";
import Sentimental from "@/pages/Dashboard/Sentiment/Sentiment.vue";
import General from "@/pages/Settings/General/General.vue";
import Themes from "@/pages/Settings/Themes/Themes.vue";
import About from "@/pages/Settings/About/About.vue";
import AI from "@/pages/Settings/AI/AI.vue";
import Overview from "@/pages/Dashboard/Students/Overview/Overview.vue";
import List from "@/pages/Dashboard/Students/List/List.vue";
import SummaryOverview from "@/pages/Dashboard/Summary/SummaryOverview/SummaryOverview.vue";
import Weekly from "@/pages/Dashboard/Summary/Weekly/Weekly.vue";
import {useSettingsStore} from "@/vuex/settingsStore";
import {useAppStore} from "@/vuex/appStore";
import {i18n} from "../../locales/i18n";

const routes = [
    {
        path: '/',
        component: ImportDataPage,
        // Called when first loading the app
        // We need to load user preferences like theming
        beforeEnter:(to, from, next) => {
            const settingsStore = useSettingsStore();
            settingsStore.getSettings();
            // On receive settings handler
            window.ipc.on('read_settings', (args) => {
                settingsStore.$patch((state) => {
                    state.settings = args;
                });
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
                },
                redirect: "/dashboard/summary/overview",
                children: [
                    {
                        name: 'summary overview',
                        component: SummaryOverview,
                        path: '/dashboard/summary/overview',

                    },
                    {
                        name: 'weekly interaction',
                        component: Weekly,
                        path: '/dashboard/summary/weekly',
                    }
                ]
            },
            {
                path: '/dashboard/students',
                name: "students",
                component: Students,
                redirect: "/dashboard/students/overview",
                children: [
                    {
                        name: 'overview',
                        component: Overview,
                        path: '/dashboard/students/overview',

                    },
                    {
                        name: 'students list',
                        component: List,
                        path: '/dashboard/students/list',
                    }
                ]
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
                path: '/settings/ai',
                name: "artificial intelligence",
                component: AI,
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
    const appStore = useAppStore();
    if ( !appStore.imported_data.forum_logs ) {
        // Show alert
        redirectionAlert(i18n.global.t("errors.import_forum_needed"));
        return false;
    }
}

function check_imported_data(to, from) {
    const appStore = useAppStore();
    // Redirect to Sentiment tab if forum log has been imported
    if ( !appStore.imported_data.moodle_logs && appStore.imported_data.forum_logs) {
        // Redirect to import data page if "Summary" button is pressed from the Dashboard's Sentiment page
        if ( to.name === 'summary' && from.name === 'sentiment') {
            redirectionAlert(i18n.global.t("errors.import_forum_needed"));
            return false;
        }
        return '/dashboard/sentiment';
    }
    // Redirect to Summary tab if moodle log has been imported
    if ( appStore.imported_data.moodle_logs && !appStore.imported_data.forum_logs) {
        return true;
    }
    // Redirect to Summary tab if both files have been imported
    if ( appStore.imported_data.moodle_logs && appStore.imported_data.forum_logs ) {
        return true;
    }
    // Redirect to import data page because there's no data
    redirectionAlert(i18n.global.t("errors.import_needed"));
    return '/import-data';
}

const router = createRouter({
    // https://nklayman.github.io/vue-cli-plugin-electron-builder/guide/commonIssues.html#blank-screen-on-builds-but-works-fine-on-serve
    history: import.meta.env.VITE_IS_ELECTRON
        ? createWebHashHistory() : createWebHistory(),
    routes,
});

export default router;
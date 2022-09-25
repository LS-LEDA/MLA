<template>
    <div class="flex flex-row py-2 mx-2 my-5 h-20" :class="nav_state ? null : 'justify-center items-center'">
        <!-- Navigation bar App logo routed -->
        <div class="self-center" :class="logo_hovered ? 'z-0' : 'z-50'">
            <router-link :to="imported_data"
                         :class="logo_hovered ? 'invisible' : null"
                         @mouseover="logo_hover"
                         @mouseleave="logo_not_hover"
                         @click="redirectionAlert(this.$t('errors.import_needed'))">
                <img class="max-h-16 rounded-lg origin-center transform transition duration-500"
                     src="/assets/mla_logo.png" alt="MLA Logo">
            </router-link>
        </div>
        <!-- Application name -->
        <!--<transition name="fade">-->
        <div class="flex-1 mx-4 font-bold text-2xl self-center hover:cursor-pointer" v-if="nav_state">
            <router-link :to="imported_data"
                         @click="redirectionAlert(this.$t('errors.import_needed'))">
                <h1>MLA</h1>
            </router-link>
        </div>
        <!--</transition>-->
        <!-- Navigation shrink button -->
        <button type="button" class="flex self-center center w-auto place-items-center"
                :class="nav_state ? null : 'absolute transform transition duration-700 rotate-180'"
                @click="changeNavigationBarStatus"
                @mouseover="logo_hover"
                @mouseleave="logo_not_hover">
            <svg-icon size="36" type="mdi" :path="path" class="hover:drop-shadow text-gray-500 place-self-center"/>
        </button>
    </div>
</template>

<script>

import SvgIcon from '@jamescoyle/vue-icon'
import {mdiChevronDoubleLeft} from "@mdi/js";
import {redirectionAlert} from "@/services/utils/utils";
import {useSettingsStore} from "@/vuex/settingsStore";
import {useAppStore} from "@/vuex/appStore";

export default {
    name: "NavigationHeader",
    components: {
        SvgIcon,
    },
    setup() {
        const appStore = useAppStore();
        const settingsStore = useSettingsStore();
        return { appStore, settingsStore };
    },
    computed: {
        nav_state() {
            return this.settingsStore.navigation_bar_status;
        },
        imported_data() {
            if ( this.appStore.imported_data.moodle_logs && this.appStore.imported_data.forum_logs ) {
                return '/dashboard/summary';
            }
            // Redirect to Summary tab
            if ( this.appStore.imported_data.moodle_logs && !this.appStore.imported_data.forum_logs ) {
                return '/dashboard/summary';
            }
            // Redirect to Sentiment tab
            if ( !this.appStore.imported_data.moodle_logs && this.appStore.imported_data.forum_logs ) {
                return '/dashboard/sentiment';
            }
            return '/import-data';
        }
    },
    data() {
        return {
            path: mdiChevronDoubleLeft,
            logo_hovered: false
        }
    },
    methods: {
        // Expand or shrink navigation bar
        changeNavigationBarStatus() {
            this.settingsStore.changeNavigationBarStatus();
        },
        logo_hover() {
            if(!this.nav_state) {
                this.logo_hovered = true;
            }
        },
        logo_not_hover() {
            this.logo_hovered = false;
        },
        redirectionAlert: function (message) {
            redirectionAlert(message)
        }
    }
}
</script>

<style scoped>

</style>
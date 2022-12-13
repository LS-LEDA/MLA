<template>
    <div class="flex flex-row py-2 mx-2 my-5 h-20" :class="nav_state ? null : 'justify-center items-center'">
        <!-- Navigation bar App logo routed -->
        <div class="self-center">
            <router-link :to="imported_data"
                         @click="redirectionAlert(this.$t('errors.import_needed'))">
                <img class="max-h-16 rounded-md origin-center transform transition duration-500"
                     src="/assets/mla_logo.png" alt="MLA Logo">
            </router-link>
        </div>
        <!-- Application name -->
        <div class="flex mx-4 font-bold text-2xl self-center hover:cursor-pointer" v-if="nav_state">
            <router-link
				:to="imported_data"
				@click="redirectionAlert(this.$t('errors.import_needed'))"
			>
                <h1>MLA</h1>
            </router-link>
        </div>
    </div>
</template>

<script>
import {redirectionAlert} from "@/services/utils/utils";
import {useSettingsStore} from "@/vuex/settingsStore";
import {useAppStore} from "@/vuex/appStore";

export default {
    name: "NavigationHeader",
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
    methods: {
        redirectionAlert: function (message) {
            redirectionAlert(message)
        }
    }
}
</script>

<style scoped>

</style>
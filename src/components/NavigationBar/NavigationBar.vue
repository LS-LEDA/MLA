<template>
    <div :class="nav_state ? 'w-80' : 'w-20'" class="mx-2 my-2 flex flex-col bg-secondary dark:bg-dark_secondary rounded-xl transform transition-all duration-700">
        <NavigationHeader/>
        <div class="flex flex-col gap-y-3 mx-2">
            <router-link active-class="bg-primary_variant dark:bg-dark_primary_variant"
                :class="nav_state ? null : 'justify-center'"
                class="flex flex-row bg-primary dark:bg-dark_primary hover:bg-primary_variant dark:hover:bg-dark_primary_variant rounded-lg py-3 px-4 font-bold w-full"
                :to="page.page_link" v-for="(page, index) in pages" :key="index">
                <SvgIcon type="mdi" :path="page.button_icon"/>
                <span class="ml-3" v-if="nav_state">{{ page.button_name }}</span>
            </router-link>
        </div>
        <div class="flex flex-col flex-1 justify-end">
            <DownloadButton/>
        </div>
    </div>
</template>

<script>
import DownloadButton from '@/components/NavigationBar/DownloadButton.vue';
import NavigationHeader from "@/components/NavigationBar/NavigationHeader.vue";
import {
  mdiCogOutline,
  mdiDatabaseImportOutline,
  mdiToyBrickPlusOutline,
  mdiViewDashboardOutline
} from "@mdi/js";
import SvgIcon from "@jamescoyle/vue-icon";
import {useSettingsStore} from "@/vuex/settingsStore";

export default {
    name: "NavigationBar",
    components: {
        NavigationHeader,
        DownloadButton,
        SvgIcon
    },
    setup() {
        const settingsStore = useSettingsStore();
        return { settingsStore };
    },
    computed: {
        /**
         * Navigation bar state:
         * true: expanded
         * false: shrank
         */
        nav_state() {
            return this.settingsStore.navigation_bar_status;
        }
    },
    data() {
        return {
            pages: [
                {
                    button_name: 'Import data',
                    button_icon: mdiDatabaseImportOutline,
                    page_link: '/import-data'
                },
                {
                    button_name: 'Dashboard',
                    button_icon: mdiViewDashboardOutline,
                    page_link: '/dashboard'
                },
                {
                    button_name: 'Plugins',
                    button_icon: mdiToyBrickPlusOutline,
                    page_link: '/plugins'
                },
                {
                    button_name: 'Configuration',
                    button_icon: mdiCogOutline,
                    page_link: '/settings'
                }
            ],
        }
    }
}
</script>

<style scoped>

</style>
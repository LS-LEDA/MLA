<template>
    <div class="ml-2 my-2 sm:w-max xl:w-2/12 flex flex-col bg-white rounded-xl ">
        <NavigationHeader/>
        <router-link :to="page.page_link" v-for="(page, index) in pages" :key="index" class="mx-2">
            <NavigationButton :page="page"/>
        </router-link>
        <div class="flex flex-col flex-1 justify-end">
            <DownloadButton :nav_state="nav_state"/>
        </div>
    </div>
</template>

<script>
import DownloadButton from '@/components/NavigationBar/DownloadButton'
import NavigationButton from '@/components/NavigationBar/NavigationButton'
import NavigationHeader from "@/components/NavigationBar/NavigationHeader";
import {
  mdiCogOutline,
  mdiDatabaseImportOutline,
  mdiToyBrickPlusOutline,
  mdiViewDashboardOutline
} from "@mdi/js";

export default {
    name: "NavigationBar",
    components: {
        NavigationHeader,
        NavigationButton,
        DownloadButton
    },
    computed: {
        /**
         * Navigation bar state:
         * true: expanded
         * false: shrank
         */
        nav_state() {
            console.log(this.$store.state.navigation_bar_status)
            return this.$store.state.navigation_bar_status
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
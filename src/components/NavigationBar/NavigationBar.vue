<template>
    <div class="fixed left-2 top-2 bottom-2 w-2/12 flex flex-col bg-white rounded-xl">
        <NavigationButton v-for="(page, index) in pages" :page="page" :key="index"/>
        <DownloadButton class="block"/>
    </div>
</template>

<script>
import DownloadButton from '@/components/NavigationBar/DownloadButton'
import NavigationButton from '@/components/NavigationBar/NavigationButton'
import {mdiCogOutline, mdiDatabaseImportOutline, mdiToyBrickPlusOutline, mdiViewDashboardOutline} from "@mdi/js";

export default {
    name: "NavigationBar",
    components: {
        NavigationButton,
        DownloadButton
    },
    data() {
        return {
            pages: [
                {
                    button_name: 'Import data',
                    button_icon: mdiDatabaseImportOutline
                },
                {
                    button_name: 'Dashboard',
                    button_icon: mdiViewDashboardOutline
                },
                {
                    button_name: 'Plugins',
                    button_icon: mdiToyBrickPlusOutline
                },
                {
                    button_name: 'Configuration',
                    button_icon: mdiCogOutline
                }
            ]
        }
    }
}
</script>

<style scoped>

</style>
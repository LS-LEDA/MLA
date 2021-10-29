<template>
    <div class="fixed left-2 top-2 bottom-2 sm:w-max xl:w-2/12 flex flex-col bg-white rounded-xl ">
        <NavigationHeader/>
        <NavigationButton v-for="(page, index) in pages" :page="page" :key="index"/>
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
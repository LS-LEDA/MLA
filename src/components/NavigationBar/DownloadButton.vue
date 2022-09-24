<template>
    <button type="button" class="flex bg-primary_variant dark:bg-dark_primary_variant rounded-lg px-4 py-2 mx-2 my-2
            block font-bold uppercase justify-center">
        <svg-icon type="mdi" :path="download_icon" v-if="!nav_state"></svg-icon>
        <span v-if="nav_state">{{$t("navigation.download")}}</span>
    </button>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiCloudDownload } from "@mdi/js";
import {useSettingsStore} from "@/vuex/settingsStore";

export default {
    name: "DownloadButton",
    components: {
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
            download_icon: mdiCloudDownload,
        }
    }
}
</script>

<style scoped>

</style>
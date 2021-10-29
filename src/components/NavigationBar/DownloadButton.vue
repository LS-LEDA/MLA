<template>
    <button type="button" class="flex bg-blue-400 rounded-lg px-4 py-2 mx-2 my-2
            block font-bold uppercase justify-center">
        <svg-icon type="mdi" :path="download_icon" v-if="!nav_state"></svg-icon>
        <span v-if="nav_state">Download</span>
    </button>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiCloudDownload } from "@mdi/js";

export default {
    name: "DownloadButton",
    components: {
        SvgIcon
    },
    props: ['nav_state'],
    data() {
        return {
            download_icon: mdiCloudDownload,
        }
    }
}
</script>

<style scoped>

</style>
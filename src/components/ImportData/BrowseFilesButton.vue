<template>
    <button
        type="button"
        class="flex flex-row bg-primary dark:bg-dark_primary hover:bg-primary_variant dark:hover:bg-dark_primary_variant rounded-lg px-6 py-3 mx-2 my-2 font-bold"
        @click="this.$parent.$refs.moodle_file.click()">
        <svg-icon
            type="mdi" :path="open_folder_icon"></svg-icon>
        <span class="ml-3">{{$t("app.drag_drop.browse")}}</span>
    </button>
</template>

<script>
// TODO: Unify BrowseFilesButton & Button to IconButton
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiFolderOpen } from '@mdi/js'

export default {
    name: "BrowseFilesButton",
    components: {
        SvgIcon
    },
    data() {
        return {
            open_folder_icon: mdiFolderOpen
        }
    }
}
</script>

<style scoped>

</style>
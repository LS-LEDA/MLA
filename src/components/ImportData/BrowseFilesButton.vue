<template>
    <button
        type="button"
        class="flex flex-row bg-primary hover:bg-primary_variant rounded-lg px-6 py-3 mx-2 my-2 font-bold"
        @click="this.$parent.$refs.moodle_file.click()">
        <svg-icon
            type="mdi" :path="open_folder_icon"></svg-icon>
        <span class="ml-3">Browse Files</span>
    </button>
</template>

<script>
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
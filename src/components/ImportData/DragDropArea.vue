<template>
    <div class="flex flex-col border-black border-2 rounded-3xl border-dashed p-10 m-20 w-full justify-center items-center">
        <input type="file" ref="moodle_file" class="hidden">
        <svg-icon class="w-1/4 h-1/4 justify-center my-2"
            type="mdi" :path="upload_file_icon"></svg-icon>
        <span class="font-bold text-center text-4xl my-2"> Drag & Drop file here </span>
        <span class="text-center text-3xl my-2"> or </span>
        <BrowseFilesButton class="w-max"/>
        <svg-icon class="mx-0 justify-items-end right-0 bottom-0"
            type="mdi" :path="information_icon" @click="informationPopUp"></svg-icon>
    </div>
</template>

<script>
import BrowseFilesButton from "@/components/ImportData/BrowseFilesButton";
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiFileUpload, mdiHelpCircleOutline  } from "@mdi/js"

export default {
    name: "DragDropArea",
    components: {
        BrowseFilesButton,
        SvgIcon
    },
    data() {
        return {
            upload_file_icon: mdiFileUpload,
            information_icon: mdiHelpCircleOutline,
        }
    },
    methods: {
        informationPopUp: function () {
            console.log("Open information PopUp")
        }
    }
}
</script>

<style scoped>

</style>
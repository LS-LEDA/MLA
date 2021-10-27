<template>
    <div class="flex flex-col border-black border-2 rounded-3xl border-dashed p-10 m-20 w-full justify-center items-center
                space-y-6"
                @dragenter.prevent="toggleActive"
                @dragleave.prevent="toggleActive"
                @dragover.prevent
                @drop.prevent="select_file"
                :class=" {'bg-blue-200 transition-all duration-300' :active }">
        <input type="file" ref="moodle_file" class="hidden" @change="select_file">
        <svg-icon class="w-1/4 h-1/4 justify-center"
            type="mdi" :path="upload_file_icon"></svg-icon>
        <span class="font-bold text-center text-5xl"> Drag & Drop file here </span>
        <span class="text-center text-4xl"> or </span>
        <BrowseFilesButton class="w-max" :class="{'bg-white transition-all duration-300' :active }"/>
        <div class="flex flex-row w-full h-1/5 justify-end content-end">
            <div class="flex items-end">
                <svg-icon type="mdi" :path="information_icon" @click="informationPopUp"></svg-icon>
            </div>
        </div>
    </div>
</template>

<script>
import BrowseFilesButton from "@/components/ImportData/BrowseFilesButton";
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiFileUpload, mdiHelpCircleOutline  } from "@mdi/js"
import { ref } from 'vue'

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
            data_file: null,
        }
    },
    setup() {
        const active = ref(false)
        const toggleActive = () => {
            active.value = !active.value
        }

        return { active, toggleActive }
    },
    methods: {
        informationPopUp: function () {
            console.log("Open information PopUp")
        },
        /**
         * Called on drop event, enables a popup
         * for the user to confirm the upload
         * @param e: data transfer with files
         */
        drop: function (e) {
            this.toggleActive()
            let droped_file = e.dataTransfer.files[0]
            if ( !droped_file ) return
            this.data_file = droped_file
        }
    }
}
</script>

<style scoped>

</style>
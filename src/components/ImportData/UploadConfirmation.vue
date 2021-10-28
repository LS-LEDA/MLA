<template>
    <div class="flex fixed inset-0 z-50 justify-center place-items-center bg-gray-500 bg-opacity-75 transition-opacity"
        role="dialog" aria-modal="true">
        <div class="flex flex-col w-2/6 h-auto bg-white rounded-3xl space-y-2 pb-3 drop-shadow-xl">
            <!-- Uploaded file section -->
            <div class="flex flex-row rounded-2xl m-5 px-5 py-4 border border-black">
                <svg-icon type="mdi" :path="file_icon"/>
                <span class="ml-5">data_file.json</span>
            </div>
            <!-- Backend connection status-->
            <div class="flex flex-row self-center">
                <div class="flex self-center w-4 h-4 bg-red-300 rounded-md border-2 border-red-600"></div>
                <span class="ml-2"> Please install <strong>coreMLA</strong> or choose <strong>LServer</strong> in the Settings</span>
            </div>
            <!-- Upload Confirmation Buttons -->
            <div class="flex flex-row justify-center">
                <IconButton :icon="cancel_icon" type="Cancel" @click="$emit('buttonClick', false)"/>
                <IconButton :icon="upload_icon" type="Upload" @click="$emit('buttonClick', true)"/>
            </div>
        </div>
    </div>
</template>

<script>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiClose, mdiFile, mdiUpload } from "@mdi/js";
import IconButton from "@/components/UI/IconButton";

export default {
    name: "UploadConfirmation",
    components: {
        IconButton,
        SvgIcon
    },
    emits: ['buttonClick'],
    //TODO: Ping backend on render
    data() {
        return {
            file_icon: mdiFile,
            cancel_icon: mdiClose,
            upload_icon: mdiUpload,
        }
    }
}
</script>

<style scoped>

</style>
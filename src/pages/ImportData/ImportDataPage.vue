<template>
    <section id="import_data_area" class="h-full w-full flex justify-center content-center">
        <div class="flex bg-white rounded-3xl w-full m-24 content-center justify-center">
            <DragDropArea/>
        </div>
        <UploadConfirmation v-if="file_selected" @buttonClick="confirm_upload"/>
    </section>
</template>

<script>
import DragDropArea from "@/components/ImportData/DragDropArea";
import UploadConfirmation from "@/components/ImportData/UploadConfirmation";

export default {
    name: "ImportDataPage",
    data() {
        return {
            file_selected: false
        }
    },
    components: {
        UploadConfirmation,
        DragDropArea
    },
    methods: {
        /**
         * Toggles the Upload Confirmation
         * PopUp visibility
         */
        toggle_pop_up: function () {
            this.file_selected = !this.file_selected
        },
        /**
         * Emitted when a file has been selected
         * or dropped in the Import File Area
         */
        confirm_upload: function (whichButton) {
            // Check whether to upload or cancel
            if ( whichButton ) {
                //TODO: Upload
            }

            // Final Close the PopUp
            this.toggle_pop_up()
        }
    }
}
</script>

<style scoped>

</style>
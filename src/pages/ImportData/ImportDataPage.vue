<template>
    <section id="import_data_area" class="h-full w-full flex justify-center content-center">
        <div class="flex flex-col bg-white rounded-3xl w-full m-24 content-center justify-center">
            <UploadProgressBar/>
            <DragDropArea @onUpload="toggle_pop_up"/>
        </div>
        <UploadConfirmation v-if="file_selected" @buttonClick="confirm_upload" :selected_file_name="selected_file_name"/>
    </section>
</template>

<script>
import DragDropArea from "@/components/ImportData/DragDropArea";
import UploadConfirmation from "@/components/ImportData/UploadConfirmation";
import UploadProgressBar from "@/components/ImportData/UploadProgressBar";

export default {
    name: "ImportDataPage",
    data() {
        return {
            file_selected: false,
            selected_file_name: ""
        }
    },
    components: {
        UploadProgressBar,
        UploadConfirmation,
        DragDropArea
    },
    methods: {
        /**
         * Toggles the Upload Confirmation
         * PopUp visibility
         */
        toggle_pop_up: function (selected_file_name) {
            this.file_selected = !this.file_selected
            this.selected_file_name = selected_file_name
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
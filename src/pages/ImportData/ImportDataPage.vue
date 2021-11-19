<template>
    <section id="import_data_area" class="relative h-full w-full flex place-content-center" >
        <InformationPopUp v-if="show_popUp" @infoPopUp= "toggle_information_pop_up"/>
        <div class="flex flex-col bg-white rounded-3xl h-5/6 w-9/12 self-center justify-center">
            <UploadProgressBar/>
            <DragDropArea @onUpload="toggle_pop_up" @popUp="toggle_information_pop_up"/>
        </div>
        <UploadConfirmation v-if="file_selected" @buttonClick="confirm_upload" :selected_file_name="selected_file_name"/>
    </section>
</template>

<script>
import DragDropArea from "@/components/ImportData/DragDropArea";
import UploadConfirmation from "@/components/ImportData/UploadConfirmation";
import UploadProgressBar from "@/components/ImportData/UploadProgressBar";
import InformationPopUp from "@/components/ImportData/InformationPopUp";

export default {
    name: "ImportDataPage",
    data() {
        return {
            file_selected: false,
            selected_file_name: "",
            selected_file: null,
            show_popUp : false
        }
    },
    components: {
        UploadProgressBar,
        UploadConfirmation,
        DragDropArea,
        InformationPopUp
    },
    methods: {
        /**
         * Toggles the Information PopUp visibility
         */
        toggle_information_pop_up: function () {
            this.show_popUp = !this.show_popUp;
        },
        /**
         * Toggles the Upload Confirmation
         * PopUp visibility
         */
        toggle_pop_up: function (selected_file) {
            this.file_selected = !this.file_selected
            // Store file name
            this.selected_file_name = selected_file.name
            // Store file
            this.selected_file = selected_file
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
            this.toggle_pop_up(this.selected_file_name)
        }
    }
}
</script>

<style scoped>

</style>
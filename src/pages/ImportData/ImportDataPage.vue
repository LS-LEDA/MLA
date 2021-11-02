<template>
    <InformationPopUp v-if="show_popUp" @infoPopUp= "toggle_information_pop_up"/>
    <section id="import_data_area" class="h-full w-full flex justify-center content-center row-start-1 row-end-1 col-start-1 col-end-1" v-bind:class="{ blur: show_popUp }" >
        <div class="flex flex-col bg-white rounded-3xl w-full m-24 content-center justify-center">
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
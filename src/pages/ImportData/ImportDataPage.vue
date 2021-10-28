<template>
    <section id="import_data_area" class="h-full w-full flex justify-center content-center">
        <div class="flex bg-white rounded-3xl w-full m-24 content-center justify-center">
            <DragDropArea/>
        </div>
        <UploadConfirmation v-if="file_selected"/>
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
    }
}
</script>

<style scoped>

</style>
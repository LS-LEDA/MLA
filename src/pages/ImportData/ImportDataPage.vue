<template>
    <section id="import_data_area" class="h-full w-full flex justify-center content-center">
        <div class="flex bg-white rounded-3xl w-full m-24 content-center justify-center">
            <DragDropArea/>
        </div>
    </section>
</template>

<script>
import DragDropArea from "@/components/ImportData/DragDropArea";

export default {
    name: "ImportDataPage",
    components: {
        DragDropArea
    }
}
</script>

<style scoped>

</style>
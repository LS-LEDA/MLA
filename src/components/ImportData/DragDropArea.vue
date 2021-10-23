<template>
    <div class="flex flex-col border-black border-2 rounded-3xl border-dashed p-10 m-20 w-max">
        <BrowseFilesButton class="w-max"/>
    </div>
</template>

<script>
import BrowseFilesButton from "@/components/ImportData/BrowseFilesButton";

export default {
    name: "DragDropArea",
    components: {
        BrowseFilesButton
    }
}
</script>

<style scoped>

</style>
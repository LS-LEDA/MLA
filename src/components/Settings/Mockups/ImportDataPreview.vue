<template>
    <div class="flex flex-col w-10/12 h-4/6 bg-blue-100 rounded-lg pt-2 p-5">
        <!-- BrowserWindow circles -->
        <div class="flex w-full h-8 justify-end space-x-1 p-2">
            <div class="w-4 h-4 rounded-full bg-green-500"/>
            <div class="w-4 h-4 rounded-full bg-orange-500"/>
            <div class="w-4 h-4 rounded-full bg-red-500"/>
        </div>

        <div class="flex w-full h-full space-x-3">
            <!-- Navigation bar -->
            <div class="flex flex-col w-20 h-full bg-white rounded-lg space-y-2 p-1">
                <div class="flex rounded-lg w-full h-14 bg-blue-300"/>
                <div class="flex rounded-lg w-full h-14 bg-blue-200"/>
                <div class="flex rounded-lg w-full h-14 bg-blue-200"/>
                <div class="flex rounded-lg w-full h-14 bg-blue-200"/>
            </div>

            <!-- Main content -->
            <div class="flex w-full h-full p-10 rounded-lg items-center justify-center">
                <!-- Dashboard navigation tabs buttons -->
                <div class="flex flex-col w-full h-full py-10 px-32 bg-white rounded-lg justify-center items-center space-y-2">
                    <!-- Progress Bar -->
                    <div class="flex w-full h-full bg-gray-100 rounded-lg">

                    </div>
                    <!-- Drag and Drop area-->
                    <div class="flex flex-col w-full h-full p-5 border border-black border-dashed rounded-lg
                                items-center space-y-2">
                        <!-- Icon -->
                        <div class="flex w-20 h-20 bg-gray-100 rounded-lg"/>
                        <div class="flex w-64 h-8 bg-gray-100 rounded-lg"/>
                        <div class="flex w-32 h-18 justify-center">
                            <IconButton :icon="open_folder_icon" :status="true" type="Import"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import IconButton from "@/components/UI/IconButton";
import {mdiFolderOpen} from "@mdi/js";
export default {
    name: "ImportDataPreview",
    components: {IconButton},
    data() {
        return {
            open_folder_icon: mdiFolderOpen
        }
    }
}
</script>

<style scoped>

</style>
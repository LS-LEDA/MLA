<template>
    <div class="flex h-full w-96 overflow-y-hidden pb-4">
        <div class="bg-white h-full w-full rounded-lg mx-2 my-2">
            <Calendar/>
        </div>
    </div>
</template>

<script>
import Calendar from "@/components/UI/Calendar";
export default {
    name: "InformationPanel",
    components: {Calendar}
}
</script>

<style scoped>

</style>
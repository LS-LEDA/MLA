<template>
    <div class="flex flex-col rounded-lg bg-white w-full h-full p-10">
        <div class="font-extrabold uppercase"> Forum File Data </div>
        <div class="flex flex-col">
            <!-- Forum message file name -->
            <div class="flex justify-between">
                <div class="font-bold"> File name </div>
                <div class="flex"> discussion_forum_moodle.json </div>
            </div>
            <!-- Forum total messages -->
            <div class="flex justify-between">
                <div class="font-bold"> Messages </div>
                <div> 4 </div>
            </div>
            <!-- Forum total users -->
            <div class="flex justify-between">
                <div class="font-bold"> Users </div>
                <div> 4 </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "SentimentFileCard"
}
</script>

<style scoped>

</style>
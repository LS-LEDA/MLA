<template>
    <h1 class="text-4xl font-extrabold"> Summary of all course interactions </h1>
    <span class="font-bold text-2xl text-gray-500"> Information on the number of interactions </span>
    <InteractionCard/>
</template>

<script>
import InteractionCard from "@/components/Summary/InteractionCard";

export default {
    name: "Summary",
    components: {
        InteractionCard
    }
}
</script>

<style scoped>

</style>
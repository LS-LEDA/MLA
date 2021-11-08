<template>
    <h1 class="text-4xl font-extrabold"> Summary of all course interactions </h1>
    <span class="font-bold text-2xl text-gray-500"> Information on the number of interactions </span>
    <InteractionCard/>
    <div class="grid grid-rows-2 grid-cols-3 gap-5 bg-white w-full h-full bg-white rounded-3xl mt-5">
      <SummaryCard/>
      <SummaryCard/>
      <SummaryCard/>
      <SummaryCard/>
      <SummaryCard/>
      <SummaryCard/>
    </div>
</template>

<script>
import InteractionCard from "@/components/Summary/InteractionCard";
import SummaryCard from "@/components/Summary/SummaryCard";

export default {
    name: "Summary",
    components: {
        InteractionCard,
        SummaryCard
    }
}
</script>

<style scoped>

</style>
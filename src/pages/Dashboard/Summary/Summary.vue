<template>
    <h1 class="text-4xl font-extrabold"> Summary of all course interactions </h1>
    <span class="font-bold text-2xl text-gray-500"> Information on the number of interactions </span>
    <InteractionCard/>
    <div class="grid grid-rows-2 grid-cols-3 gap-5 bg-transparent w-full h-full bg-white rounded-3xl mt-5">
      <SummaryCard v-for="(statistic, index) in statistics" :statistic="statistic" :key="index"/>
    </div>
</template>

<script>
import InteractionCard from "@/components/Summary/InteractionCard";
import SummaryCard from "@/components/Summary/SummaryCard";
import {
  mdiFileDocumentOutline
} from "@mdi/js";

export default {
    name: "Summary",
    components: {
        InteractionCard,
        SummaryCard
    },
      data(){
        return{
          statistics:[
            {
              statistic_name: "Tasks",
              number: 0,
              icon: mdiFileDocumentOutline,
              id: 0
            },
            {
              statistic_name: "Files",
              number: 0,
              icon: mdiFileDocumentOutline,
              id: 1
            },
            {
              statistic_name: "Pages",
              number:0,
              icon: mdiFileDocumentOutline,
              id: 2
            },
            {
              statistic_name: "URL",
              number:0,
              icon: mdiFileDocumentOutline,
              id: 3
            },
            {
              statistic_name: "Learning Tools Interoperability",
              number:0,
              icon: mdiFileDocumentOutline,
              id: 4
            },
            {
              statistic_name: "Wiki",
              number:0,
              icon: mdiFileDocumentOutline,
              id: 5
            }
          ]
        }


      }
}
</script>

<style scoped>

</style>
<template>
    <h1 class="text-4xl font-extrabold"> Summary of all course interactions </h1>
    <span class="font-bold text-2xl text-gray-500"> Information on the number of interactions </span>
    <InteractionCard/>
    <div class="grid grid-rows-2 grid-cols-3 gap-x-20 gap-y-10 bg-transparent w-full h-full bg-white rounded-3xl mt-5 ">
      <SummaryCard v-for="(statistic, index) in statistics" :statistic="statistic" :key="index"/>
    </div>
</template>

<script>
import InteractionCard from "@/components/Summary/InteractionCard";
import SummaryCard from "@/components/Summary/SummaryCard";
import {
  mdiFileDocumentOutline,
  mdiTextBoxCheck,
  mdiHammerScrewdriver,
  mdiWikipedia,
  mdiLinkVariant,
  mdiViewDashboardOutline
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
              number: 7342,
              icon: mdiTextBoxCheck ,
              info:"The total number of interactions with all deliveries of a subject. "
            },
            {
              statistic_name: "Files",
              number: 1913,
              icon: mdiFileDocumentOutline,
              info:" The total number of interactions with all files of a subject."
            },
            {
              statistic_name: "Pages",
              number:75,
              icon: mdiViewDashboardOutline,
              info:"The total number of interactions with the pages of a subject."
            },
            {
              statistic_name: "URL",
              number:34,
              icon: mdiLinkVariant ,
              info: "The total number of interactions with the URL resource of a subject."
            },
            {
              statistic_name: "Learning Tools Interoperability",
              number:0,
              icon: mdiHammerScrewdriver ,
              info:"The total number of interactions with the learning tools interoperability resources of a subject."
            },
            {
              statistic_name: "Wiki",
              number:1,
              icon: mdiWikipedia ,
              info:"The total number of interactions with the wikis of a subject."
            }
          ]
        }


      }
}
</script>

<style scoped>

</style>
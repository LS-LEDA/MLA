<template>
    <h1 class="text-4xl font-extrabold"> Summary of all course interactions </h1>
    <span class="font-bold text-2xl text-gray-500"> Information on the number of interactions </span>
    <!-- Dashboard Summary Total Interactions card-->
    <InteractionCard :summary="summary" :logs="logs"/>
    <!-- Dashboard Summary cards-->
    <div class="grid  gap-x-5 gap-y-5 w-full max-h-full mt-5
                sm:auto-rows-auto sm:grid-cols-1
                md:auto-rows-auto md:grid-cols-2
                xl:auto-rows-auto xl:grid-cols-3">
        <SummaryCard v-for="(statistic, index) in summary.statistics"
                   :statistic="statistic" :key="index"
                    @popUp="detailed_information_pop_up(index)"/>
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
    mdiNewspaperVariantOutline,
} from "@mdi/js";

export default {
    name: "Summary",
    emits: ['popUp'],
    components: {
        InteractionCard,
        SummaryCard
    },
    computed: {
        summary() {
            let summary_types = this.$store.state.summary.summary_types;
            let total_interactions = this.$store.state.summary.total_interactions;

            // TODO: Fix this hardcoded part for future releases. Specially when re-ordering is enabled
            this.statistics.forEach( (stat, index) => {
                switch ( stat.statistic_name ) {
                    case 'Tasks':
                        stat.number = summary_types['Tarea'].count;
                        this.$store.commit('saveSummaryCard', {summaryID: index, summary: summary_types['Tarea'].interactions});
                        break;
                    case 'URL':
                        stat.number = summary_types['URL'].count;
                        this.$store.commit('saveSummaryCard', {summaryID: index, summary: summary_types['URL'].interactions});
                        break;
                }
            });
            return { total_interactions: total_interactions, statistics: this.statistics }
        },
        logs() {
            return this.$store.state.logs;
        },
    },
    methods: {
        detailed_information_pop_up: function (summaryID){
            this.$emit('popUp', summaryID);
        }
    },
    data(){
        return{
            statistics:[
                {
                    statistic_name: "Tasks",
                    number: 0,
                    icon: mdiTextBoxCheck ,
                    info:"The total number of interactions with all deliveries of a subject."
                },
                {
                    statistic_name: "Files",
                    number: 0,
                    icon: mdiFileDocumentOutline,
                    info:" The total number of interactions with all files of a subject."
                },
                {
                    statistic_name: "Pages",
                    number: 0,
                    icon: mdiNewspaperVariantOutline,
                    info:"The total number of interactions with the pages of a subject."
                },
                {
                    statistic_name: "URL",
                    number: 0,
                    icon: mdiLinkVariant,
                    info: "The total number of interactions with the URL resource of a subject."
                },
                {
                    statistic_name: "Learning Tools Interoperability",
                    number: 0,
                    icon: mdiHammerScrewdriver,
                    info:"The total number of interactions with the learning tools interoperability resources of a subject."
                },
                {
                    statistic_name: "Wiki",
                    number: 0,
                    icon: mdiWikipedia ,
                    info:"The total number of interactions with the wikis of a subject."
                }
            ],
            total_interactions: 0
        }
    }
}
</script>

<style scoped>

</style>
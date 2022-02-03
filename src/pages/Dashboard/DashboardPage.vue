<template>
    <section id="dashboard" class="relative flex flex-col w-full h-full">
        <div class="w-full h-full overflow-y-auto">
            <div class="flex flex-col flex-auto w-full h-full px-5 py-10">
                <!-- Tabs buttons -->
                <div class="grid grid-cols-2 gap-2 xl:flex xl:flex-row pb-5">
                    <router-link active-class="bg-primary_variant dark:bg-dark_primary_variant"
                                 class="bg-primary dark:bg-dark_primary w-full hover:bg-primary_variant dark:hover:bg-dark_primary_variant rounded-lg text-2xl font-bold py-3 text-center"
                                 :to="tab.tab_path"
                                 v-for="(tab, index) in tabs"
                                 :key="index">
                            {{ tab.tab_name }}
                    </router-link>
                </div>
                <!-- Dashboard deeply nested component view -->
                <router-view @popUp="toggle_popup"></router-view>
            </div>
        </div>
        <!-- Summary Card Pop Up -->
        <SummaryPopUp v-if="popup" @popUp="toggle_popup" :summaryID="summaryID" :card_name="card_name" class="absolute"/>
        <!-- Total Interaction Card Pop Up -->
        <InteractionPopUp v-if="total_popup" @popUp="toggle_popup"/>
        <!-- Alert -->
        <Alert v-if="alert_status.status" :message="alert_status.message"
               @closeAlert="close_alert"/>
    </section>
    <InformationPanel/>
</template>

<script>

import SummaryPopUp from "@/components/Summary/SummaryPopUp";
import InformationPanel from "@/components/InformationPanel/InformationPanel";
import InteractionPopUp from "@/components/Summary/InteractionPopUp";
import Alert from "@/components/UI/Alert";

export default {
    name: "DashboardPage",
    components: {
        InformationPanel,
        InteractionPopUp,
        SummaryPopUp,
        Alert
    },
    methods: {
        /**
         * Toggle popup by id
         * 0: Total Interaction Card
         * 1: Summary Card
         * @param id popup identifier
         * @param card_name
         * @param summaryID
         */
        toggle_popup: function ({id, card_name, summaryID}) {
            if (id === 0) {
                // Total information popup
                this.total_popup = !this.total_popup;
            } else {
                // Summary card popup
                this.summaryID = summaryID;
                this.card_name = card_name;
                this.popup = !this.popup;
            }
        },
        close_alert: function(){
            // Clears toggle alert timeout if alert is dismissed by the user
            clearTimeout(this.$store.state.alert.timeout);
            this.$store.state.alert.status = false;
        }
    },
    computed: {
        alert_status(){
            return this.$store.state.alert;
        }
    },
    data() {
        return {
            tabs: [
                {
                    tab_name: "Summary",
                    tab_path: "/dashboard/summary"
                },
                {
                    tab_name: "Students",
                    tab_path: "/dashboard/students"
                },
                {
                    tab_name: "Resources",
                    tab_path: "/dashboard/resources"
                },
                {
                    tab_name: "Sentiment",
                    tab_path: "/dashboard/sentiment"
                },
            ],
            total_popup: false,
            popup: false,
            summaryID: 0,
            card_name: ""
        }
    }
}
</script>

<style scoped>

</style>
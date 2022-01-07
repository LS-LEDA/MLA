<template>
    <section id="dashboard" class="relative flex flex-col w-full h-full">
        <div class="w-full h-full overflow-y-auto">
            <div class="flex flex-col flex-auto w-full h-full px-5 py-10">
                <!-- Tabs buttons -->
                <div class="grid grid-cols-2 gap-2 xl:flex xl:flex-row pb-5">
                    <router-link active-class="bg-blue-300"
                                 class="bg-blue-200 w-full hover:bg-blue-300 rounded-lg text-2xl font-bold py-3 text-center"
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
        <SummaryPopUp v-if="popup" @popUp="toggle_popup" :summaryID="summaryID" :card_name="card_name" class="absolute"/>
        <!-- Alert -->
        <Alert v-if="alert_status.status" :message="alert_status.message"
               @closeAlert="close_alert"/>
    </section>
    <InformationPanel/>
</template>

<script>

import SummaryPopUp from "@/components/Summary/SummaryPopUp";
import InformationPanel from "@/components/InformationPanel/InformationPanel";
import Alert from "@/components/UI/Alert";

export default {
    name: "DashboardPage",
    components: {
        InformationPanel,
        SummaryPopUp,
        Alert
    },
    methods: {
        toggle_popup: function ({card_name, summaryID}) {
            this.summaryID = summaryID;
            this.card_name = card_name;
            this.popup = !this.popup;
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
            popup: false,
            summaryID: 0,
            card_name: ""
        }
    }
}
</script>

<style scoped>

</style>
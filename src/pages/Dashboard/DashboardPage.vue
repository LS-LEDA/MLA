<template>
    <section id="dashboard" class="relative flex flex-col w-full h-full overflow-y-auto">
        <div class="flex flex-col w-full h-full px-5 py-10">
            <!-- Tabs buttons -->
            <div class="flex flex-row pb-5 space-x-5">
                <router-link :to="tab.tab_path" v-for="(tab, index) in tabs" :key="index" class="">
                    <button class="bg-blue-100 hover:bg-blue-200 rounded-lg text-2xl font-bold py-3 px-2
                                   md:px-5 lg:px-10"> {{ tab.tab_name }}</button>
                </router-link>
            </div>
            <!-- Dashboard deeply nested component view -->
            <router-view @popUp="toggle_popup"></router-view>
        </div>
        <SummaryPopUp v-if="popup" @popUp="toggle_popup" :summaryID="summaryID" :card_name="card_name" class="absolute"/>
    </section>
    <InformationPanel/>
</template>

<script>

import SummaryPopUp from "@/components/Summary/SummaryPopUp";
import InformationPanel from "@/components/InformationPanel/InformationPanel";

export default {
    name: "DashboardPage",
    components: {
        InformationPanel,
        SummaryPopUp
    },
    methods: {
        toggle_popup: function ({card_name, summaryID}) {
            this.summaryID = summaryID;
            this.card_name = card_name;
            this.popup = !this.popup;
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
                    tab_name: "Sentimental",
                    tab_path: "/dashboard/sentimental-analysis"
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
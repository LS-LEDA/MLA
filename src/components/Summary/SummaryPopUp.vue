<template>
    <div class="flex flex-col absolute w-full h-full justify-center place-items-center z-40 bg-gray-400 bg-opacity-75 transition-opacity"
         role="dialog" aria-modal="true">

        <!-- PopUp white background -->
        <div class="flex flex-col bg-white w-11/12 h-5/6 rounded-xl z-50 p-5 gap-y-5">
            <div class="flex w-full justify-between">
                <!-- PopUp Title -->
                <div class="w-auto bg-blue-300 rounded-xl py-2 px-5 font-bold">
                    {{ card_name }}
                </div>
                <!-- Close button -->
                <button type="button" class=" justify-self-end bg-gray-100 text-gray-400 rounded-lg focus:ring-2 focus:ring-gray-200
                hover:bg-gray-200 inline-flex w-10 h-10 place-content-center items-center"
                        @click="close_pop_up({card_name, summaryID})">
                    <SvgIcon class="hover:cursor-pointer" type="mdi" :path="close_icon"/>
                </button>
            </div>

            <!-- Summary card chart -->
            <div class="flex w-full h-3/6">
                <div class="flex items-center relative w-full w-full text-center mx-6 font-bold text-4xl rounded-3xl">
                    <canvas class="max-h-full max-w-full" id="summary_chart"></canvas>
                </div>
            </div>
            <!-- Summary card table -->
            <div v-if="!withData" class="self-center"> No data </div>
            <div v-else class="flex w-full max-h-full justify-center overflow-y-scroll">
                <table class="table-auto">
                    <thead class="bg-blue-300">
                        <tr class="text-left uppercase">
                            <th class="p-3"> Interactions type </th>
                            <th class="p-3"> Number of interactions </th>
                        </tr>
                    </thead>
                    <tbody>
                    <tr class="bg-blue-200 hover:bg-blue-300" v-for="(interaction, index) in summary_interactions" :key="index">
                        <td class="font-bold p-3"> {{ interaction[0] }} </td>
                        <td class="p-3"> {{ interaction[1] }} </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="absolute w-full h-full filter backdrop-blur-sm z-10"></div>
    </div>
</template>

<script>
import SvgIcon from "@jamescoyle/vue-icon";
import {mdiClose} from "@mdi/js";
import {Chart, registerables} from "chart.js";
import summaryCardChartData from "@/assets/summaryCardChartData";

export default {
    name: "SummaryPopUp",
    components: {
        SvgIcon
    },
    props: ['summaryID', 'card_name'],
    methods: {
        close_pop_up: function ({card_name, summaryID}) {
            this.$emit('popUp', {card_name, summaryID});
        },
        summary_chart: function (chartId, chartData) {
            let ctx = document.getElementById(chartId);
            Chart.register(...registerables);
            this.interactions_chart = new Chart(ctx, {
                type: chartData.type,
                data: chartData.data,
                options: chartData.options,
            });
        }
    },
    mounted() {
        try {
            let unsorted_interactions = Object.entries(this.$store.state.summary_cards[this.summaryID]);
            // Sort by interaction value - TimSort
            // Each object ['Interaction Name', 'Interaction Value']
            this.summary_interactions = unsorted_interactions.sort(
                (a, b) => {
                    return b[1] - a[1]
                }
            );

            let labels = [];
            let data = [];
            this.summary_interactions.forEach( interaction => {
                labels.push(interaction[0]);
                data.push(interaction[1])
            })
            this.summaryCardChartData.options.scales.x.labels = labels;
            this.summaryCardChartData.data.datasets[0].data = data;
            // Create Summary PopUp chart once the component is mounted
            this.summary_chart('summary_chart', this.summaryCardChartData);
        } catch (error) {
            // No interactions for the selected summary card
            this.withData = false;
        }
    },
    data(){
        return {
            close_icon: mdiClose,
            summary_interactions: {},
            withData: true,
            summaryCardChartData: summaryCardChartData
        }
    }
}
</script>

<style scoped>

</style>
<template>
    <!-- Interactions Card  -->
    <div class="flex w-full h-full bg-secondary dark:bg-dark_secondary rounded-3xl p-10 mt-5 hover:cursor-pointer filter drop-shadow-lg
                transform transition duration-500"
         @click="show_details"
    >
        <!-- Card Information -->
        <div class="flex flex-col w-full text-center lg:text-left lg:w-5/12 justify-self-center self-center space-y-3">
            <span class="text-4xl lg:text-5xl"> Total of Interactions </span>
            <span class="text-6xl font-bold"> {{ summary.total_interactions.toLocaleString() }} </span>
        </div>
        <!-- Card graphics -->
        <div class="flex relative w-full w-full hidden lg:block">
            <canvas class="max-h-full max-w-full" id="total_interactions_chart"></canvas>
        </div>
    </div>
</template>

<script>
import { Chart, registerables } from 'chart.js';
import totalInteractionChartData from "@/assets/totalInteractionChartData";

export default {
    name: "InteractionCard",
    props: ['summary', 'logs'],
    emits: ['popUp'],
    data() {
        return {
            totalInteractionChartData: totalInteractionChartData,
            interactions_chart: null,
        }
    },
    methods: {
        /**
         * Renders a chart in total interaction card
         * @param chartId: canvas chart ID
         * @param chartData chart data
         */
        totalInteractionChart (chartId, chartData) {
            let ctx = document.getElementById(chartId);
            Chart.register(...registerables);
            this.interactions_chart = new Chart(ctx, {
                type: chartData.type,
                data: chartData.data,
                options: chartData.options,
            });
        },
        /**
         * Renders a popup in the parent component
         */
        show_details: function () {
            this.$emit('popUp');
        }
    },
    mounted() {
        let types = {};
        this.logs.forEach( (log) => {
            types[log.yearMonthDate] = (types[log.yearMonthDate] + 1 ) || 1;
        });
        let dates = Object.keys(types);
        let interactions = Object.values(types);
        this.totalInteractionChartData.options.scales.x.labels = dates;
        this.totalInteractionChartData.data.datasets[0].data = interactions;

        // Create Total Interactions chart once component is mounted
        this.totalInteractionChart('total_interactions_chart', this.totalInteractionChartData);
    },
    unmounted() {
        // Clear chart once the component is unmounted
        this.interactions_chart.clear();
    }
}
</script>

<style scoped>

</style>
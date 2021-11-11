<template>
    <!-- Interactions Card  -->
    <div class="flex w-full h-72 bg-white rounded-3xl p-10 mt-5 hover:cursor-pointer filter drop-shadow-lg
        transform transition duration-500 hover:scale-[101%]">
        <!-- Card Information -->
        <div class="flex flex-col w-5/12 justify-self-center self-center space-y-3">
            <span class="text-5xl"> Total of Interactions </span>
            <span class="text-6xl font-bold"> {{ interactions_count.toLocaleString() }} </span>
        </div>
        <!-- Card graphics -->
        <div class="w-full w-full text-center mx-6 font-bold text-4xl rounded-3xl">
            <canvas class="max-h-full" id="total_interactions_chart"></canvas>
        </div>
    </div>
</template>

<script>
import { Chart, registerables } from 'chart.js';
import totalInteractionChartData from "@/assets/totalInteractionChartData";

export default {
    name: "InteractionCard",
    data() {
        return {
            interactions_count: 10394,
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
        }
    },
    mounted() {
        // Create Total Interactions chart once component is mounted
        this.totalInteractionChart('total_interactions_chart', this.totalInteractionChartData)
    },
    unmounted() {
        // Clear chart once the component is unmounted
        this.interactions_chart.clear();
    }
}
</script>

<style scoped>

</style>
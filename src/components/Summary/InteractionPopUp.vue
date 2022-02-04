<template>
    <div class="flex flex-col absolute w-full h-full justify-center place-items-center z-40 bg-gray-400 bg-opacity-75 transition-opacity"
         role="dialog" aria-modal="true">
        <!-- PopUp white background -->
        <div class="flex flex-col bg-secondary dark:bg-dark_secondary w-11/12 h-5/6 rounded-xl z-50 p-5 gap-y-5">
            <div class="flex w-full justify-between">
                <!-- PopUp Title -->
                <div class="w-auto bg-primary_variant dark:bg-dark_primary_variant rounded-lg py-2 px-5 font-bold">
                    Total Interactions
                </div>
                <!-- Close button -->
                <button type="button" class="justify-self-end bg-gray-100 text-gray-400 rounded-lg focus:ring-2 focus:ring-gray-200
                    hover:bg-gray-200 inline-flex w-10 h-10 place-content-center items-center"
                        @click="close_pop_up">
                    <SvgIcon class="hover:cursor-pointer" type="mdi" :path="close_icon"/>
                </button>
            </div>

            <!-- Cart Section -->
            <div class="flex w-full h-1/3">
                <!-- Total Interaction Interactive Chart -->
                <div class="flex relative w-full h-full block">
                    <canvas class="max-h-full max-w-full" id="interactions_chart"></canvas>
                </div>
                <!-- Chart Controllers -->
                <div class="flex flex-col">
                    <IconButton :icon="zoom_in_icon" :status="true"/>
                    <IconButton :icon="zoom_out_icon" :status="true"/>
                    <IconButton :icon="zoom_reset_icon" :status="true"/>
                </div>
            </div>
        </div>
        <div class="absolute w-full h-full filter backdrop-blur-sm z-10"></div>
    </div>
</template>

<script>
import {mdiClose, mdiMagnifyMinusOutline, mdiMagnifyPlusOutline, mdiUndo} from "@mdi/js";
import SvgIcon from "@jamescoyle/vue-icon";
import {Chart, registerables} from "chart.js";
import totalInteractionChartData from "@/assets/totalInteractionChartData";
import zoomPlugin from 'chartjs-plugin-zoom';
import IconButton from "@/components/UI/IconButton";

export default {
    name: "InteractionPopUp",
    components: {
        IconButton,
        SvgIcon
    },
    props: ['logs'],
    emits: ['popUp'],
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
        this.totalInteractionChart('interactions_chart', this.totalInteractionChartData);
    },
    unmounted() {
        // Reset chart data config
        this.totalInteractionChartData.options.plugins.zoom.zoom.wheel.enabled = true;
        this.totalInteractionChartData.options.plugins.zoom.zoom.pinch.enabled = true;
        this.totalInteractionChartData.options.plugins.zoom.pan.enabled = true;

        // Clear chart once the component is unmounted
        this.interactions_chart.clear();
    },
    methods: {
        close_pop_up: function () {
            this.$emit('popUp', {id: 0});
        },
        /**
         * Renders a chart in total interaction card
         * @param chartId: canvas chart ID
         * @param chartData chart data
         */
        totalInteractionChart (chartId, chartData) {
            // Enable zoom & pan for the chart
            chartData.options.plugins.zoom.zoom.wheel.enabled = true;
            chartData.options.plugins.zoom.zoom.pinch.enabled = true;
            chartData.options.plugins.zoom.pan.enabled = true;
            let ctx = document.getElementById(chartId);
            Chart.register(...registerables);
            Chart.register(zoomPlugin);
            this.interactions_chart = new Chart(ctx, {
                type: chartData.type,
                data: chartData.data,
                options: chartData.options,
            });
        }
    },
    data() {
        return {
            close_icon: mdiClose,
            interactions_chart: null,
            totalInteractionChartData: totalInteractionChartData,
            zoom_in_icon: mdiMagnifyPlusOutline,
            zoom_out_icon: mdiMagnifyMinusOutline,
            zoom_reset_icon: mdiUndo
        }
    }
}
</script>

<style scoped>

</style>
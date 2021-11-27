<template>
    <div class="flex flex-col rounded-xl bg-white w-full h-full p-10 gap-5">
        <div class="font-extrabold uppercase"> Overall Sentiment Analysis </div>

        <div class="flex w-full h-full">
            <div class="flex relative w-full h-full">
                <canvas class="max-w-full max-h-full" id="overall_sentiment_chart"></canvas>
            </div>

            <!-- Overall score icon -->
            <div class="flex w-full h-full justify-center items-center">
                <svg-icon class="w-1/2 h-full" type="mdi"
                          :path="overall_sentiment ? positive_icon : negative_icon"
                          :class=" overall_sentiment ? 'text-green-400' : 'text-red-400'">
                </svg-icon>
            </div>
        </div>
    </div>
</template>

<script>
import {Chart, registerables} from "chart.js";
import SvgIcon from '@jamescoyle/vue-icon';
import overallSentimentChartData from "@/assets/overallSentimentChartData";
import {mdiRobotAngryOutline, mdiRobotHappyOutline} from "@mdi/js";

export default {
    name: "SentimentOverallCard",
    components: {
        SvgIcon
    },
    data() {
        return {
            overall_sentiment_data: overallSentimentChartData,
            overall_sentiment_chart: null,
            /**
             * Overall sentiment analysis
             * Positive:    True
             * Negative:    False
             */
            overall_sentiment: true,
            positive_icon: mdiRobotHappyOutline,
            negative_icon: mdiRobotAngryOutline,
        }
    },
    methods: {
        /**
         * Renders a chart in overall sentiment card
         * @param chartId: canvas chart ID
         * @param chartData chart data
         */
        overallSentimentChart (chartId, chartData) {
            let ctx = document.getElementById(chartId);
            Chart.register(...registerables);
            this.overall_sentiment_chart = new Chart(ctx, {
                type: chartData.type,
                data: chartData.data,
                options: chartData.options,
            });
        }
    },
    mounted() {
        // Dynamically load computed sentiments
        this.overall_sentiment_data.data.datasets[0].data = [
            this.$store.state.forum.sentiments.positive,
            this.$store.state.forum.sentiments.neutral,
            this.$store.state.forum.sentiments.negative
        ];
        // Create Total Interactions chart once component is mounted
        this.overallSentimentChart('overall_sentiment_chart', this.overall_sentiment_data);
    },
    unmounted() {
        // Clear chart once the component is unmounted
        this.overall_sentiment_chart.clear();
    }
}
</script>

<style scoped>

</style>
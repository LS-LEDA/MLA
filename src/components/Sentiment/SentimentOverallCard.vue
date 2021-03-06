<template>
    <div class="flex flex-col rounded-xl bg-secondary dark:bg-dark_secondary w-full h-full p-10">
        <div class="font-extrabold uppercase"> Overall Sentiment Analysis </div>

        <div class="flex w-full h-full">
            <div class="flex relative w-full h-full">
                <canvas class="max-w-full max-h-full" id="overall_sentiment_chart"></canvas>
            </div>

            <!-- Overall score icon -->
            <div class="flex w-full h-full justify-center items-center">
                <svg-icon class="w-1/2 h-full" type="mdi"
                          :path="choose_sentiment_icon()"
                          :class="choose_sentiment_icon_color()">
                </svg-icon>
            </div>
        </div>
    </div>
</template>

<script>
import {Chart, registerables} from "chart.js";
import SvgIcon from '@jamescoyle/vue-icon';
import overallSentimentChartData from "@/assets/overallSentimentChartData";
import {mdiRobotAngryOutline, mdiRobotHappyOutline, mdiRobotOutline} from "@mdi/js";

export default {
    name: "SentimentOverallCard",
    components: {
        SvgIcon
    },
    props: ['sentiments'],
    data() {
        return {
            overall_sentiment_data: overallSentimentChartData,
            overall_sentiment_chart: null,
            positive_icon: mdiRobotHappyOutline,
            neutral_icon: mdiRobotOutline,
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
        },
        choose_sentiment_icon: function() {
            let p = this.sentiments.positive;
            let neu = this.sentiments.neutral;
            let n = this.sentiments.negative;

            if (p >= neu && p >= n) {
                return this.positive_icon;
            } else if (neu >= p && neu >= n) {
                return this.neutral_icon;
            } else {
                return this.negative_icon;
            }
        },
        choose_sentiment_icon_color: function () {
            let p = this.sentiments.positive;
            let neu = this.sentiments.neutral;
            let n = this.sentiments.negative;

            if (p >= neu && p >= n) {
                return 'text-green-400';
            } else if (neu >= p && neu >= n) {
                return 'text-yellow-400';
            } else {
                return 'text-red-400';
            }
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
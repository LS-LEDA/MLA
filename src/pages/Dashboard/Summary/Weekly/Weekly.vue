<template>
    <div id="weekly_interactions" class="flex w-full h-full bg-secondary rounded-xl mt-5">
    </div>
</template>

<script>
import * as echarts from 'echarts';
import weeklyInteractionConfig from "@/assets/weeklyInteractionsMap";

export default {
    name: "Weekly",
    mounted() {
        let heatmapDom = document.getElementById('weekly_interactions');
        this.heatmap = echarts.init(heatmapDom);

        // Get weekly interactions data and mount the heatmap chart
        this.week_data.series[0].data = this.$store.state.summary.week_interactions;
        this.heatmap.setOption(this.week_data);
    },
    beforeUnmount() {
        this.heatmap.dispose();
        this.heatmap = null;
    },
    data() {
        return {
            heatmap: null,
            week_data: weeklyInteractionConfig
        }
    }
}
</script>

<style scoped>

</style>
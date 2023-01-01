<template>
  <div
    aria-modal='true'
    class='flex flex-col absolute w-full h-full justify-center place-items-center z-40 bg-gray-400 bg-opacity-75 transition-opacity'
    role='dialog'
  >
    <!-- PopUp white background -->
    <div
      class='flex flex-col bg-secondary dark:bg-dark_secondary w-11/12 h-5/6 rounded-xl z-50 p-5 gap-y-5'
    >
      <div class='flex w-full justify-between'>
        <!-- PopUp Title -->
        <div
          class='w-auto bg-primary_variant dark:bg-dark_primary_variant rounded-lg py-2 px-5 font-bold'
        >
          {{ $t('dashboard.summary.total_interactions.title') }}
        </div>
        <!-- Close button -->
        <button
          class='justify-self-end bg-gray-100 text-gray-400 rounded-lg focus:ring-2 focus:ring-gray-200 hover:bg-gray-200 inline-flex w-10 h-10 place-content-center items-center'
          type='button'
          @click='close_pop_up'
        >
          <SvgIcon :path='close_icon' class='hover:cursor-pointer' type='mdi' />
        </button>
      </div>

      <!-- Cart Section -->
      <div class='flex w-full h-1/3'>
        <!-- Total Interaction Interactive Chart -->
        <div class='flex relative w-full h-full block'>
          <canvas
            id='interactions_chart'
            class='max-h-full max-w-full'
          ></canvas>
        </div>
        <!-- Chart Controllers -->
        <div class='hidden md:flex flex-col'>
          <Button :icon='zoom_in_icon' @btnClick='zoom_event(0)' />
          <Button :icon='zoom_out_icon' @btnClick='zoom_event(1)' />
          <Button :icon='zoom_reset_icon' @btnClick='zoom_event(2)' />
        </div>
      </div>

      <div class='flex w-full h-2/3'>
        <!-- Interactions table -->
        <div class='flex w-full lg:w-1/2 h-full overflow-y-scroll'>
          <Table :interactions='create_interactions_table' />
        </div>
      </div>
    </div>
    <div class='absolute w-full h-full filter backdrop-blur-sm z-10'></div>
  </div>
</template>

<script>
  import {
    mdiClose,
    mdiMagnifyMinusOutline,
    mdiMagnifyPlusOutline,
    mdiUndo,
  } from '@mdi/js';
  import SvgIcon from '@jamescoyle/vue-icon';
  import { Chart, registerables } from 'chart.js';
  import totalInteractionChartData from '@/assets/totalInteractionChartData';
  import zoomPlugin from 'chartjs-plugin-zoom';
  import Table from '@/components/UI/Table.vue';
  import { inject } from 'vue';
  import { useAppStore } from '@/vuex/appStore';
  import Button from '@/components/UI/Button.vue';

  export default {
    name: 'InteractionPopUp',
    components: {
      Button,
      Table,
      SvgIcon,
    },
    props: ['logs'],
    setup() {
      const appStore = useAppStore();
      let total_popup = inject('total_popup');
      return {
        appStore,
        total_popup,
      };
    },
    mounted() {
      let types = {};
      this.logs.forEach((log) => {
        types[log.yearMonthDate] = types[log.yearMonthDate] + 1 || 1;
      });
      let dates = Object.keys(types);
      let interactions = Object.values(types);
      this.totalInteractionChartData.options.scales.x.labels = dates;
      this.totalInteractionChartData.data.datasets[0].data = interactions;

      // Create Total Interactions chart once component is mounted
      this.totalInteractionChart(
        'interactions_chart',
        this.totalInteractionChartData,
      );
    },
    computed: {
      /**
       * Get interactions from vuex and prepares the data
       * for being displayed in the interactions table
       * @return {[string, unknown][]}
       */
      create_interactions_table: function() {
        let interactions = {};
        let summary_types = Object.entries(this.appStore.summary.summary_types);

        summary_types.forEach((interaction) => {
          // interaction[0]: Interaction name e.g - 'Task'
          // interaction[1]: Interaction object e.g - { count: 100, interactions: {} }
          interactions[interaction[0]] = interaction[1].count;
        });

        return Object.entries(interactions);
      },
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
      close_pop_up: function() {
        this.total_popup = !this.total_popup;
      },
      /**
       * Renders a chart in total interaction card
       * @param chartId: canvas chart ID
       * @param chartData chart data
       */
      totalInteractionChart(chartId, chartData) {
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
      },
      /**
       * Chart zooming buttons handlers
       * 0: Zooms In
       * 1: Zoom Out
       * 2: Reset Zoom
       * @param eventID Zoom Button ID
       */
      zoom_event: function(eventID) {
        switch (eventID) {
          case 0:
            this.interactions_chart.zoom(1.1, 'zoom');
            break;
          case 1:
            this.interactions_chart.zoom(0.9, 'zoom');
            break;
          case 2:
            this.interactions_chart.resetZoom('show');
            break;
          default:
            console.log('Unrecognized Zoom Event');
        }
      },
    },
    data() {
      return {
        close_icon: mdiClose,
        interactions_chart: null,
        totalInteractionChartData: totalInteractionChartData,
        zoom_in_icon: mdiMagnifyPlusOutline,
        zoom_out_icon: mdiMagnifyMinusOutline,
        zoom_reset_icon: mdiUndo,
      };
    },
  };
</script>

<style scoped></style>

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
          class='w-auto bg-primary_variant dark:bg-dark_primary_variant rounded-xl py-2 px-5 font-bold'
        >
          {{ card_name }}
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

      <!-- Summary card chart -->
      <div class='flex w-full h-3/6'>
        <div
          class='flex items-center relative w-full w-full text-center mx-6 font-bold text-4xl rounded-3xl'
        >
          <canvas id='summary_chart' class='max-h-full max-w-full'></canvas>
        </div>
      </div>
      <!-- Summary card table -->
      <div v-if='!withData' class='self-center'>No data</div>
      <div
        v-else
        class='flex w-full max-h-full justify-center overflow-y-scroll'
      >
        <Table :interactions='summary_interactions' />
      </div>
    </div>
    <div class='absolute w-full h-full filter backdrop-blur-sm z-10'></div>
  </div>
</template>

<script>
  import SvgIcon from '@jamescoyle/vue-icon';
  import { mdiClose } from '@mdi/js';
  import { Chart, registerables } from 'chart.js';
  import summaryCardChartData from '@/assets/summaryCardChartData';
  import Table from '@/components/UI/Table.vue';
  import { inject } from 'vue';
  import { useAppStore } from '@/vuex/appStore';

  export default {
    name: 'SummaryPopUp',
    components: {
      Table,
      SvgIcon,
    },
    props: ['summaryID', 'card_name'],
    setup() {
      const appStore = useAppStore();
      let popup = inject('popup');
      return {
        appStore,
        popup,
      };
    },
    methods: {
      close_pop_up: function() {
        this.popup = !this.popup;
      },
      summary_chart: function(chartId, chartData) {
        let ctx = document.getElementById(chartId);
        Chart.register(...registerables);
        this.interactions_chart = new Chart(ctx, {
          type: chartData.type,
          data: chartData.data,
          options: chartData.options,
        });
      },
    },
    mounted() {
      try {
        let unsorted_interactions = Object.entries(
          this.appStore.summary_cards[this.summaryID],
        );
        // Sort by interaction value - TimSort
        // Each object ['Interaction Name', 'Interaction Value']
        this.summary_interactions = unsorted_interactions.sort((a, b) => {
          return b[1] - a[1];
        });

        let labels = [];
        let data = [];
        this.summary_interactions.forEach((interaction) => {
          labels.push(interaction[0]);
          data.push(interaction[1]);
        });
        this.summaryCardChartData.options.scales.x.labels = labels;
        this.summaryCardChartData.data.datasets[0].data = data;
        // Create Summary PopUp chart once the component is mounted
        this.summary_chart('summary_chart', this.summaryCardChartData);
      } catch (error) {
        // No interactions for the selected summary card
        this.withData = false;
      }
    },
    data() {
      return {
        close_icon: mdiClose,
        summary_interactions: {},
        withData: true,
        summaryCardChartData: summaryCardChartData,
      };
    },
  };
</script>

<style scoped></style>

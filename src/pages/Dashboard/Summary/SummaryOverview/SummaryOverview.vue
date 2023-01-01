<template>
  <!-- Dashboard Summary Total Interactions card-->
  <InteractionCard
    :logs='logs'
    :summary='summary'
    @popUp='total_interaction_popup'
  />
  <!-- Dashboard Summary cards-->
  <div
    class='grid gap-x-5 gap-y-5 w-full max-h-full mt-5 sm:auto-rows-auto sm:grid-cols-1 md:auto-rows-auto md:grid-cols-2 xl:auto-rows-auto xl:grid-cols-3'
  >
    <SummaryCard
      v-for='(statistic, index) in summary.statistics'
      :key='index'
      :statistic='statistic'
      @popUp='
        detailed_information_pop_up({
          card_name: statistic.statistic_name,
          summaryID: index,
        })
      '
    />
  </div>
</template>

<script>
  import InteractionCard from '@/components/Summary/InteractionCard.vue';
  import SummaryCard from '@/components/Summary/SummaryCard.vue';
  import {
    mdiFileDocumentOutline,
    mdiHammerScrewdriver,
    mdiLinkVariant,
    mdiNewspaperVariantOutline,
    mdiTextBoxCheck,
    mdiWikipedia,
  } from '@mdi/js';
  import { inject } from 'vue';
  import { useAppStore } from '@/vuex/appStore';

  export default {
    name: 'SummaryOverview',
    components: {
      InteractionCard,
      SummaryCard,
    },
    computed: {
      summary() {
        let summary_types = this.appStore.summary.summary_types;
        let total_interactions = this.appStore.summary.total_interactions;

        // TODO: Fix this hardcoded part for future releases. Specially when re-ordering is enabled
        this.statistics.forEach((stat, index) => {
          switch (stat.statistic_name) {
            case 'Tasks':
              if (!('Tarea' in summary_types)) return;
              stat.number = summary_types['Tarea'].count;
              this.appStore.saveSummaryCard({
                summaryID: index,
                summary: summary_types['Tarea'].interactions,
              });
              break;
            case 'URL':
              if (!('URL' in summary_types)) return;
              stat.number = summary_types['URL'].count;
              this.appStore.saveSummaryCard({
                summaryID: index,
                summary: summary_types['URL'].interactions,
              });
              break;
          }
        });
        return {
          total_interactions: total_interactions,
          statistics: this.statistics,
        };
      },
      logs() {
        return this.appStore.logs;
      },
    },
    setup() {
      const appStore = useAppStore();
      // Inject provided variables from DashboardPage parent component
      let total_popup = inject('total_popup');
      let popup = inject('popup');
      let summaryID = inject('summaryID');
      let card_name = inject('card_name');
      return {
        appStore,
        total_popup,
        popup,
        summaryID,
        card_name,
      };
    },
    methods: {
      detailed_information_pop_up: function({ card_name, summaryID }) {
        this.popup = true;
        this.summaryID = summaryID;
        this.card_name = card_name;
      },
      total_interaction_popup: function() {
        this.total_popup = true;
      },
    },
    data() {
      return {
        statistics: [
          {
            statistic_name: 'Tasks',
            number: 0,
            icon: mdiTextBoxCheck,
            info: 'The total number of interactions with all deliveries of a subject.',
          },
          {
            statistic_name: 'Files',
            number: 0,
            icon: mdiFileDocumentOutline,
            info: ' The total number of interactions with all files of a subject.',
          },
          {
            statistic_name: 'Pages',
            number: 0,
            icon: mdiNewspaperVariantOutline,
            info: 'The total number of interactions with the pages of a subject.',
          },
          {
            statistic_name: 'URL',
            number: 0,
            icon: mdiLinkVariant,
            info: 'The total number of interactions with the URL resource of a subject.',
          },
          {
            statistic_name: 'Learning Tools Interoperability',
            number: 0,
            icon: mdiHammerScrewdriver,
            info: 'The total number of interactions with the learning tools interoperability resources of a subject.',
          },
          {
            statistic_name: 'Wiki',
            number: 0,
            icon: mdiWikipedia,
            info: 'The total number of interactions with the wikis of a subject.',
          },
        ],
      };
    },
  };
</script>

<style scoped></style>

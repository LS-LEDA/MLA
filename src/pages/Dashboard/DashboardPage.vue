<template>
  <section id='dashboard' class='relative flex flex-col w-full h-full'>
    <div class='w-full h-full overflow-y-auto'>
      <div class='flex flex-col flex-auto w-full h-full px-5 py-10'>
        <!-- Tabs buttons -->
        <div class='grid grid-cols-2 gap-2 xl:flex xl:flex-row pb-5'>
          <router-link
            v-for='(tab, index) in tabs'
            :key='index'
            :to='tab.tab_path'
            active-class='bg-primary_variant dark:bg-dark_primary_variant'
            class='bg-primary dark:bg-dark_primary w-full hover:bg-primary_variant dark:hover:bg-dark_primary_variant rounded-lg text-2xl font-bold py-3 text-center'
          >
            {{ $t(tab.tab_name) }}
          </router-link>
        </div>
        <!-- Dashboard deeply nested component view -->
        <router-view></router-view>
      </div>
    </div>
    <!-- Summary Card Pop Up -->
    <SummaryPopUp
      v-if='popup'
      :card_name='card_name'
      :summaryID='summaryID'
      class='absolute'
    />
    <!-- Total Interaction Card Pop Up -->
    <InteractionPopUp v-if='total_popup' :logs='logs' />
    <!-- Alert -->
    <Alert
      v-if='alert_status.status'
      :message='alert_status.message'
      @closeAlert='close_alert'
    />
  </section>
  <InformationPanel />
</template>

<script>
  import SummaryPopUp from '@/components/Summary/SummaryPopUp.vue';
  import InformationPanel from '@/components/InformationPanel/InformationPanel.vue';
  import InteractionPopUp from '@/components/Summary/InteractionPopUp.vue';
  import Alert from '@/components/UI/Alert.vue';
  import { provide, ref } from 'vue';
  import { useAppStore } from '@/vuex/appStore';

  export default {
    name: 'DashboardPage',
    components: {
      InformationPanel,
      InteractionPopUp,
      SummaryPopUp,
      Alert,
    },
    methods: {
      close_alert: function() {
        // Clears toggle alert timeout if alert is dismissed by the user
        clearTimeout(this.appStore.alert.timeout);
        this.appStore.alert.status = false;
      },
    },
    computed: {
      alert_status() {
        return this.appStore.alert;
      },
      logs() {
        return this.appStore.logs;
      },
    },
    setup() {
      const appStore = useAppStore();
      let total_popup = ref(false);
      let popup = ref(false);
      let summaryID = ref(0);
      let card_name = ref('Mayuyu');
      provide('total_popup', total_popup);
      provide('popup', popup);
      provide('summaryID', summaryID);
      provide('card_name', card_name);
      return {
        appStore,
        total_popup,
        popup,
        summaryID,
        card_name,
      };
    },
    data() {
      return {
        tabs: [
          {
            tab_name: 'navigation.dashboard.summary',
            tab_path: '/dashboard/summary',
          },
          {
            tab_name: 'navigation.dashboard.students',
            tab_path: '/dashboard/students',
          },
          {
            tab_name: 'navigation.dashboard.resources',
            tab_path: '/dashboard/resources',
          },
          {
            tab_name: 'navigation.dashboard.sentiment',
            tab_path: '/dashboard/sentiment',
          },
        ],
      };
    },
  };
</script>

<style scoped></style>

<template>
  <div class='h-full w-96 overflow-y-hidden pb-4'>
    <div
      class='flex flex-col bg-secondary dark:bg-dark_secondary h-full rounded-lg mx-2 my-2'
    >
      <Item v-if='log_name' :title='log_name' />
      <Calendar calendarID='1' @dateSelect='selectDate' />
      <Calendar calendarID='2' @dateSelect='selectDate' />
    </div>
  </div>
</template>

<script>
  import Calendar from '@/components/UI/Calendar.vue';
  import Item from '@/components/UI/Item.vue';
  import { useAppStore } from '@/vuex/appStore';

  export default {
    name: 'InformationPanel',
    components: {
      Item,
      Calendar,
    },
    setup() {
      const appStore = useAppStore();
      return { appStore };
    },
    data() {
      return {
        start_date: new Date(),
        end_date: new Date(),
      };
    },
    computed: {
      log_name() {
        return this.appStore.dashboard.course_name;
      },
    },
    methods: {
      /**
       * Stores the selected dates from the side panels' calendars.
       * @param date Selected date information { day, month, year }
       * @param calendarID Which calendar
       */
      selectDate: function(date, calendarID) {
        if (calendarID === 1) {
          this.start_date.setDate(date.day);
          this.start_date.setMonth(date.month);
          this.start_date.setFullYear(date.year);
        } else {
          this.end_date.setDate(date.day);
          this.end_date.setMonth(date.month);
          this.end_date.setFullYear(date.year);
        }
      },
    },
  };
</script>

<style scoped></style>

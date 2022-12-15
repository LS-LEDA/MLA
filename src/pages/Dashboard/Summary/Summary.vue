<template>
  <div class='flex w-full h-auto justify-between'>
    <h1 class='text-4xl font-extrabold'>{{ $t('dashboard.summary.title') }}</h1>
    <div class='flex w-auto h-auto gap-x-3'>
      <button
        :disabled='this.current_page === 0'
        class='flex max-w-full max-h-full bg-primary dark:bg-dark_primary rounded-md hover:bg-primary_variant dark:hover:bg-dark_primary_variant aspect-square justify-center items-center disabled:opacity-30 disabled:hover:bg-primary'
        @click='change_page(-1)'
      >
        <SvgIcon :path='left_icon' size='28' type='mdi' />
      </button>
      <button
        :disabled='this.current_page === this.tabs.length - 1'
        class='flex max-w-full max-h-full bg-primary dark:bg-dark_primary rounded-md hover:bg-primary_variant dark:hover:bg-dark_primary_variant aspect-square justify-center items-center disabled:opacity-30 disabled:hover:bg-primary'
        @click='change_page(1)'
      >
        <SvgIcon
          :path='right_icon'
          size='28'
          type='mdi'
          @click='change_page(1)'
        />
      </button>
    </div>
  </div>
  <span class='font-bold text-2xl text-gray-500'>
    {{ $t(tabs[current_page].tab_description) }}
  </span>
  <router-view></router-view>
</template>

<script>
  import { mdiMenuLeft, mdiMenuRight } from '@mdi/js';
  import SvgIcon from '@jamescoyle/vue-icon';

  export default {
    name: 'Summary',
    emits: ['popUp'],
    components: {
      SvgIcon,
    },
    methods: {
      /**
       * Change tabs method.
       * @param side left / right button
       * -1: left button press
       * 1: right button press
       */
      change_page: function(side) {
        // Check for tab boundaries
        if (
          this.current_page + side >= 0 &&
          this.current_page + side < this.tabs.length
        ) {
          this.current_page += side;
        }

        // Change view
        switch (this.current_page) {
          case 1:
            this.$router.push('/dashboard/summary/weekly');
            break;
          default:
            this.$router.push('/dashboard/summary/overview');
        }
      },
    },
    data() {
      return {
        left_icon: mdiMenuLeft,
        right_icon: mdiMenuRight,
        current_page: 0,
        tabs: [
          {
            tab_name: 'Summary Overview',
            tab_description: 'dashboard.summary.tabs.1',
            tab_path: 'dashboard/summary/overview',
          },
          {
            tab_name: 'Weekly Interactions',
            tab_description: 'dashboard.summary.tabs.2',
            tab_path: 'dashboard/summary/weekly',
          },
        ],
      };
    },
  };
</script>

<style scoped></style>

<template>
  <div
    :class="card_status ? 'pb-10' : null"
    class='flex flex-col w-full bg-secondary dark:bg-dark_secondary rounded-3xl filter drop-shadow-lg transform transition duration-500 hover:scale-[101%] p-10 pb-5 cursor-pointer'
    @click='show_details'
  >
    <!-- Card information -->
    <template v-if='card_status'>
      <button
        class='items-end place-self-end text-gray-500 rounded-lg hover:bg-gray-300'
        type='button'
        @click.stop='changeView()'
      >
        <SvgIcon :path='close_icon' class='hover:cursor-pointer' type='mdi' />
      </button>
      <span
        class='flex h-full mx-3 text-xl font-bold text-center self-center place-self-center items-center'
      >
        {{ statistic.info }}
      </span>
    </template>
    <template v-else>
      <!-- Card title -->
      <span
        class='text-xl text-gray-500 font-bold row-start-1 row-end-1 col-start-1 col-end-1'
      >
        {{ statistic.statistic_name }}
      </span>
      <!-- Card Statistics & Logo -->
      <div class='flex w-full flex-1 justify-between items-center'>
        <span
          class='text-6xl font-bold row-start-2 row-end-2 col-start-1 col-end-1'
        >
          {{ statistic.number }}
        </span>
        <svg-icon
          :path='statistic.icon'
          class='justify-self-end'
          height='100'
          type='mdi'
          width='100'
        ></svg-icon>
      </div>
      <!-- Card Information Icon -->
      <button
        class='items-end place-self-end text-gray-500 rounded-lg hover:bg-gray-300'
        type='button'
        @click.stop='changeView()'
      >
        <SvgIcon :path='help_icon' class='hover:cursor-pointer' type='mdi' />
      </button>
    </template>
  </div>
</template>

<script>
  import SvgIcon from '@jamescoyle/vue-icon';
  import { mdiClose, mdiHelpCircleOutline } from '@mdi/js';

  export default {
    name: 'SummaryCard',
    props: ['statistic'],
    emits: ['popUp'],
    components: {
      SvgIcon,
    },
    data() {
      return {
        help_icon: mdiHelpCircleOutline,
        close_icon: mdiClose,
        /**
         * Cart Status
         * false:   Front
         * true:    Back
         */
        card_status: false,
      };
    },
    methods: {
      changeView: function() {
        this.card_status = !this.card_status;
      },
      /**
       * Renders a popup with in the parent component
       */
      show_details: function() {
        this.$emit('popUp');
      },
    },
  };
</script>

<style scoped></style>

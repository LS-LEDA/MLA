<template>
  <div class='flex w-full h-full items-center place-content-between'>
    <div class='flex items-center space-x-2'>
      <!-- Mode icon -->
      <div
        class='flex w-12 h-12 rounded-lg bg-primary dark:bg-dark_primary justify-center items-center'
      >
        <SvgIcon :path='mode.icon' type='mdi' />
      </div>

      <!-- Mode description -->
      <div>
        {{ $t(mode.description) }}
      </div>
    </div>
    <Checkbox
      :id='id'
      :selected='selected === id'
      value='hello'
      @click='toggle_mode'
    />
  </div>
</template>

<script>
  import Checkbox from '@/components/UI/Checkbox.vue';
  import SvgIcon from '@jamescoyle/vue-icon';

  export default {
    name: 'ModeSelector',
    props: ['selected', 'mode', 'id'],
    emits: ['select_mode'],
    components: {
      Checkbox,
      SvgIcon,
    },
    methods: {
      /**
       * Switch between dark, light mode or
       * let system decide for the user.
       */
      toggle_mode: function() {
        this.$emit('select_mode', this.$props.id);
      },
    },
  };
</script>

<style scoped></style>

<template>
  <div
    :class="selected ? 'bg-primary_variant dark:bg-dark_primary_variant' : null"
    class='flex items-center border-2 rounded-md border-primary_variant dark:border-dark_primary_variant w-8 h-8 flex-shrink-0 justify-center items-center hover:cursor-pointer'
  >
    <input
      :id='id'
      class='opacity-0 absolute h-8 w-8 cursor-pointer'
      type='checkbox'
    />
    <SvgIcon
      v-if='selected'
      :path='check_icon'
      class='text-white'
      size='16'
      type='mdi'
    />
  </div>
</template>

<script lang='ts'>
  import SvgIcon from '@jamescoyle/vue-icon';
  import { mdiCheck } from '@mdi/js';

  export default {
    name: 'Checkbox',
    props: {
      id: String,
      selected: Boolean,
    },
    components: {
      SvgIcon,
    },
    data() {
      return {
        check_icon: mdiCheck,
      };
    },
  };
</script>

<style scoped></style>

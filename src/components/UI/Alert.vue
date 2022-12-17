<template>
  <div
    class='absolute bottom-0 left-0 right-0 z-50 flex transition place-content-center'
  >
    <div
      class='flex bg-red-100 rounded-lg p-5 mb-3 text-red-700 items-center'
      role='alert'
    >
      <SvgIcon :path='help_icon' class='text-red-500' type='mdi' />
      <div class='font-bold pl-2 pr-5'>
        {{ message }}
      </div>
      <button
        class='ml-auto bg-red-100 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1 hover:bg-red-200 inline-flex h-8 w-8'
        type='button'
        @click="this.$emit('closeAlert')"
      >
        <SvgIcon :path='close_icon' type='mdi' />
      </button>
    </div>
  </div>
</template>

<script lang='ts'>
  import SvgIcon from '@jamescoyle/vue-icon';
  import { mdiClose, mdiInformation } from '@mdi/js';

  export default {
    name: 'Alert',
    props: {
      message: String,
    },
    emits: ['closeAlert'],
    components: {
      SvgIcon,
    },
    data() {
      return {
        help_icon: mdiInformation,
        close_icon: mdiClose,
      };
    },
  };
</script>

<style scoped></style>

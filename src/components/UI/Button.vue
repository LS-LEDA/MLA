<template>
  <button
    :disabled='disable'
    class='flex flex-row bg-primary dark:bg-dark_primary hover:enabled:bg-primary_variant dark:enabled:hover:bg-dark_primary_variant rounded-md font-bold py-2 px-4'
    @click="this.$emit('btnClick')"
  >
    <svg-icon
      v-if='icon'
      :class="icon && text ? 'mr-3' : ''"
      :path='icon'
      type='mdi'
    ></svg-icon>
    <span v-if='text'> {{ text }} </span>
  </button>
</template>

<script>
  import SvgIcon from '@jamescoyle/vue-icon';
  import { useSettingsStore } from '@/vuex/settingsStore';

  export default {
    name: 'Button',
    props: ['icon', 'text', 'disable'],
    components: {
      SvgIcon,
    },
    emits: ['btnClick'],
    setup() {
      const settingsStore = useSettingsStore();
      return { settingsStore };
    },
  };
</script>

<style scoped></style>

<template>
  <div
    :class="
      selected === id
        ? 'bg-primary_variant dark:bg-dark_primary_variant'
        : 'bg-primary dark:bg-dark_primary'
    "
    class='flex flex-col rounded-lg w-full h-32 p-5 space-y-2 hover:cursor-pointer'
    @click='select_theme'
  >
    <!-- Theme name -->
    <div class='self-center font-bold text-xl'>
      {{ theme.name }}
    </div>

    <!-- Theme colours -->
    <div class='flex flex-initial w-full justify-center'>
      <div v-if='current_mode' class='flex justify-center palette'>
        <div
          v-for='(colour, index) in theme.colours'
          :key='index'
          :class='colour'
          class='rounded-full border-2 border-white w-12 h-12 circle'
        ></div>
      </div>
      <div v-else-if='!current_mode' class='flex justify-center palette'>
        <div
          v-for='(colour, index) in theme.dark_colours'
          :key='index'
          :class='colour'
          class='rounded-full border-2 border-white w-12 h-12 circle'
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
  import { useSettingsStore } from '@/vuex/settingsStore';

  export default {
    name: 'Theme',
    props: ['theme', 'id', 'selected'],
    emits: ['select_theme'],
    setup() {
      const settingsStore = useSettingsStore();
      return { settingsStore };
    },
    computed: {
      current_mode: function() {
        return this.settingsStore.settings['theme']['mode'] === 'light';
      },
    },
    methods: {
      select_theme: function() {
        this.$emit('select_theme', this.$props.id);
      },
    },
  };
</script>

<style scoped>
  .palette {
    transform: translateX(20px);
  }

  .circle {
    position: relative;
    left: 0;
  }

  .circle:nth-child(2) {
    left: -10px;
  }

  .circle:nth-child(3) {
    left: -20px;
  }

  .circle:nth-child(4) {
    left: -30px;
  }

  .circle:last-child {
    left: -40px;
  }
</style>

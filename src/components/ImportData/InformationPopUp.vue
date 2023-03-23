<template>
  <div
    aria-modal='true'
    class='flex flex-col absolute inset-0 justify-center place-items-center bg-gray-400 bg-opacity-75 transition-opacity'
    role='dialog'
  >
    <div
      class='flex flex-col bg-primary dark:bg-dark_primary w-3/6 h-4/6 rounded-3xl z-50'
    >
      <div class='w-4/5 h-4/5 self-center p-10'>
        <iframe
          allowfullscreen
          class='relative inset-0 w-full h-full rounded-2xl'
          src='https://www.loom.com/embed/ed2bc470d04c4d02b9825e9954069b41'
        >
        </iframe>
      </div>
      <button
        class='self-center bg-primary dark:bg-dark_primary hover:bg-primary_variant dark:hover:bg-dark_primary_variant rounded-lg font-bold py-3 w-1/6 h-1/10'
        @click='hidePopUp'
      >
        EXIT
      </button>
    </div>
    <div class='absolute w-full h-full filter backdrop-blur-sm z-10'></div>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'InformationPopUp',
    emits: ['infoPopUp'],
    methods: {
      hidePopUp(): void {
        this.$emit('infoPopUp');
      },
    },
  };
</script>

<style scoped></style>

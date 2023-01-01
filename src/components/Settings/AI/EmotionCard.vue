<template>
  <div className='flex w-auto h-auto place-items-center'>
    <div className='flex w-full h-fit'>
      {{ emotion }}
    </div>
    <Button
      :icon='remove_icon'
      class='px-2'
      @click="this.$emit('removeEmotion')"
    />
  </div>
</template>

<script>
  import { mdiClose } from '@mdi/js';
  import Button from '@/components/UI/Button.vue';

  /**
   * EmotionCard is a component for the list of imported
   * emotions in the AI settings tab.
   */
  export default {
    name: 'EmotionCard',
    props: ['emotion'],
    components: {
      Button,
    },
    data() {
      return {
        remove_icon: mdiClose,
      };
    },
  };
</script>

<style scoped></style>

<template>
  <span
    class='text-typography dark:text-dark_typography text-xs font-semibold px-2.5 py-0.5 rounded bg-secondary dark:bg-dark_secondary'
  >
    {{ text }}
  </span>
</template>

<script lang='ts'>
  export default {
    name: 'Badge',
    props: {
      text: String,
    },
  };
</script>

<style scoped></style>

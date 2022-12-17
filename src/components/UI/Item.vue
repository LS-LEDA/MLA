<template>
  <div
    class='flex m-2 px-5 py-2 rounded-md bg-primary dark:bg-dark_primary font-bold justify-center'
  >
    {{ title }}
  </div>
</template>

<script lang='ts'>
  export default {
    name: 'Item',
    props: {
      title: String,
    },
  };
</script>

<style scoped></style>

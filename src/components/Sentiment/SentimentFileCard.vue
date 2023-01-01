<template>
  <div
    class='flex flex-col rounded-lg bg-secondary dark:bg-dark_secondary w-full h-full p-10'
  >
    <div class='font-extrabold uppercase'>Forum File Data</div>
    <div class='flex flex-col'>
      <!-- Forum message file name -->
      <div class='flex justify-between'>
        <div class='font-bold'>File name</div>
        <div class='flex'>{{ file_name }}</div>
      </div>
      <!-- Forum total messages -->
      <div class='flex justify-between'>
        <div class='font-bold'>Messages</div>
        <div>{{ messages }}</div>
      </div>
      <!-- Forum total users -->
      <div class='flex justify-between'>
        <div class='font-bold'>Users</div>
        <div>{{ users }}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SentimentFileCard',
    props: ['file_name', 'messages', 'users'],
  };
</script>

<style scoped></style>

<template>
  <div
    class='flex flex-col w-10/12 h-4/6 bg-background dark:bg-dark_background rounded-lg pt-2 p-5'
  >
    <!-- BrowserWindow circles -->
    <div class='flex w-full h-8 justify-end space-x-1 p-2'>
      <div class='w-4 h-4 rounded-full bg-green-500' />
      <div class='w-4 h-4 rounded-full bg-orange-500' />
      <div class='w-4 h-4 rounded-full bg-red-500' />
    </div>

    <div class='flex w-full h-full space-x-3'>
      <!-- Navigation bar -->
      <div
        class='flex flex-col w-20 h-full bg-secondary dark:bg-dark_secondary rounded-lg space-y-2 p-1'
      >
        <div
          class='flex rounded-lg w-full h-14 bg-primary_variant dark:bg-dark_primary_variant'
        />
        <div
          class='flex rounded-lg w-full h-14 bg-primary dark:bg-dark_primary'
        />
        <div
          class='flex rounded-lg w-full h-14 bg-primary dark:bg-dark_primary'
        />
        <div
          class='flex rounded-lg w-full h-14 bg-primary dark:bg-dark_primary'
        />
      </div>

      <!-- Main content -->
      <div class='flex flex-col w-full h-full rounded-lg space-y-2'>
        <!-- Dashboard navigation tabs buttons -->
        <div class='flex w-full h-10 space-x-2'>
          <div
            class='flex rounded-lg h-full w-1/4 bg-primary_variant dark:bg-dark_primary_variant'
          />
          <div
            class='flex rounded-lg h-full w-1/4 bg-primary dark:bg-dark_primary'
          />
          <div
            class='flex rounded-lg h-full w-1/4 bg-primary dark:bg-dark_primary'
          />
          <div
            class='flex rounded-lg h-full w-1/4 bg-primary dark:bg-dark_primary'
          />
        </div>

        <!-- Page name -->
        <div class='flex w-3/6 h-6 bg-gray-100 rounded-lg' />
        <div class='flex w-2/6 h-6 bg-gray-100 rounded-lg' />

        <!-- Dashboard Summary Total Interaction card -->
        <div
          class='flex h-2/6 bg-secondary dark:bg-dark_secondary rounded-lg'
        ></div>

        <!-- Dashboard Summary Cards -->
        <div class='grid grid-cols-3 grid-rows-2 h-3/6 w-full rounded-lg gap-2'>
          <div
            v-for='(card, index) in 6'
            :key='index'
            class='flex w-full h-full bg-secondary dark:bg-dark_secondary rounded-lg'
          />
        </div>
      </div>

      <!-- Information panel -->
      <div
        class='flex w-48 h-full rounded-lg bg-secondary dark:bg-dark_secondary'
      />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SummaryPreview',
  };
</script>

<style scoped></style>

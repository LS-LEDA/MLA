<template>
  <div class='flex w-full h-fit bg-primary dark:bg-dark_primary rounded-lg p-5'>
    <div class='flex w-1/12 font-bold justify-center'>{{ id }}.</div>
    <div class='flex w-5/12'>{{ name }}</div>
    <div class='flex w-2/12'>{{ Math.round(student.total) }}</div>
    <div class='flex w-4/12'>{{ this.time_spent() }}</div>
  </div>
</template>

<script>
  /**
   * DedicationCard component used in Student Dedication list
   */
  export default {
    name: 'DedicationCard',
    props: ['id', 'name', 'student'],
    methods: {
      /**
       * Convert student total time spent to days, hours, minutes format
       * @returns {`${number} days ${number} hours ${number} minutes`}
       */
      time_spent: function() {
        let days = Math.round(this.student.total / 24 / 60);
        let hours = Math.floor(this.student.total / 60);
        let minutes = Math.round(this.student.total % 60);
        return `${days} days ${hours} hours ${minutes} minutes`;
      },
    },
  };
</script>

<style scoped></style>

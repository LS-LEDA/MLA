<template>
  <div class='flex w-full h-fit bg-primary dark:bg-dark_primary rounded-lg p-5'>
    <div class='flex w-1/12 font-bold justify-center'>{{ id }}.</div>
    <div class='flex w-8/12'>{{ name }}</div>
    <div class='flex-none w-2/12'>{{ student.count }}</div>
    <div class='flex w-2/12'>{{ student.percent.toFixed(2) }} %</div>
  </div>
</template>

<script>
  /**
   * ParticipationCard is a component for the student
   * participation table in the students' dashboard page.
   * It provides information about the amount of tasks
   * that a student has done in Moodle course
   * Student Name - Participation % - Amount of tasks
   */
  export default {
    name: 'ParticipationCard',
    props: ['id', 'name', 'student'],
  };
</script>

<style scoped></style>

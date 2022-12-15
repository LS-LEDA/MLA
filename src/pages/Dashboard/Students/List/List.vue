<template>
  <div class='flex w-full h-full mt-5'>
    <StudentList />
  </div>
</template>

<script>
  /**
   * List is the student list component for the Students section
   * Dashboard > Students > Students List
   */
  import StudentList from '@/components/Students/StudentList.vue';

  export default {
    name: 'List',
    components: {
      StudentList,
    },
  };
</script>

<style scoped></style>

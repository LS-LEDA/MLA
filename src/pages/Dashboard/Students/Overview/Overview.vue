<template>
  <div class='flex w-full h-full mt-5 gap-x-5'>
    <!-- Student Participation -->
    <div
      class='flex flex-col w-2/6 h-full bg-secondary dark:bg-dark_secondary rounded-xl p-3 gap-y-3'
    >
      <div class='flex w-full justify-between'>
        <span class='flex font-bold text-xl'>
          {{ $t('dashboard.students.tables.student_participation') }}
        </span>
        <button
          class='items-end place-self-end text-gray-500 rounded-lg hover:bg-gray-300'
          type='button'
          @click.stop='this.sp_info = !this.sp_info'
        >
          <SvgIcon
            :path='sp_info ? close_icon : info_icon'
            class='hover:cursor-pointer'
            type='mdi'
          />
        </button>
      </div>
      <!-- Student participation list -->
      <div class='flex flex-col w-full h-full overflow-y-auto'>
        <div v-if='!sp_info' class='flex flex-col w-full h-96 gap-y-5 pr-1'>
          <!-- List header -->
          <div class='flex w-full h-auto px-5 font-bold'>
            <div class='flex w-1/12 justify-center'>ID</div>
            <div class='w-8/12'>
              {{ $t('dashboard.students.misc.student_name') }}
            </div>
            <div class='w-2/12'>#</div>
            <div class='w-2/12'>%</div>
          </div>
          <ParticipationCard
            v-for='(student, name, index) in students_participation'
            :id='index'
            :key='index'
            :name='name'
            :student='student'
          />
        </div>
        <!-- Information -->
        <p v-else>
          {{ $t('dashboard.students.tables.student_participation_info') }}
        </p>
      </div>
    </div>
    <StudentDedication />
  </div>
</template>

<script>
  import { mdiClose, mdiHelpCircleOutline } from '@mdi/js';
  import ParticipationCard from '@/components/Students/ParticipationCard.vue';
  import StudentDedication from '@/components/Students/StudentDedication.vue';
  import SvgIcon from '@jamescoyle/vue-icon';
  import { useAppStore } from '@/vuex/appStore';

  export default {
    name: 'Overview',
    components: {
      SvgIcon,
      ParticipationCard,
      StudentDedication,
    },
    setup() {
      const appStore = useAppStore();
      return { appStore };
    },
    computed: {
      students_participation: function() {
        return this.appStore.students;
      },
    },
    data() {
      return {
        info_icon: mdiHelpCircleOutline,
        close_icon: mdiClose,
        sp_info: false,
      };
    },
  };
</script>

<style scoped></style>

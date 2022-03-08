<template>
    <div class="flex w-full h-full mt-5 gap-x-5">
        <!-- Student Participation -->
        <div class="flex flex-col w-2/6 h-full bg-secondary dark:bg-dark_secondary rounded-xl p-3 gap-y-3">
            <div class="flex w-full justify-between">
                <span class="flex font-bold text-xl">
                    Student Participation
                </span>
                <button type="button" class="items-end place-self-end text-gray-500 rounded-lg hover:bg-gray-300"
                        @click.stop="this.sp_info = !this.sp_info">
                    <SvgIcon class="hover:cursor-pointer" type="mdi" :path="sp_info ? close_icon : info_icon"/>
                </button>
            </div>
            <!-- Student participation list -->
            <div class="flex flex-col w-full h-full overflow-y-auto">
                <div v-if="!sp_info" class="flex flex-col w-full h-96 gap-y-5 pr-1">
                    <!-- List header -->
                    <div class="flex w-full h-auto px-5 font-bold">
                        <div class="flex w-1/12 justify-center"> ID </div>
                        <div class="w-8/12"> Student Name </div>
                        <div class="w-2/12"> # </div>
                        <div class="w-2/12"> % </div>
                    </div>
                    <ParticipationCard v-for="(student, name, index) in students_participation"
                                       :key="index"
                                       :id="index"
                                       :name="name"
                                       :student="student"
                    />
                </div>
                <!-- Information -->
                <p v-else>
                    Total number of interactions between each student and the resources of the course (Includes course viewing).
                </p>
            </div>
        </div>
        <StudentDedication/>
    </div>
</template>

<script>
import {mdiClose, mdiHelpCircleOutline} from "@mdi/js";
import ParticipationCard from "@/components/Students/ParticipationCard";
import StudentDedication from "@/components/Students/StudentDedication";
import SvgIcon from "@jamescoyle/vue-icon";

export default {
    name: "Overview",
    components: {
        SvgIcon,
        ParticipationCard,
        StudentDedication
    },
    computed: {
        students_participation: function () {
            return this.$store.state.students
        }
    },
    data() {
        return {
            info_icon: mdiHelpCircleOutline,
            close_icon: mdiClose,
            sp_info: false,
        }
    }
}
</script>

<style scoped>

</style>
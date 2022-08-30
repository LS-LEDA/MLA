<template>
    <div class="flex flex-col w-4/6 h-1/2 bg-secondary dark:bg-dark_secondary rounded-xl p-3 gap-y-3">
        <div class="flex w-full justify-between">
                <span class="flex font-bold text-xl">
                    Student Dedication
                </span>
            <button type="button" class="items-end place-self-end text-gray-500 rounded-lg hover:bg-gray-300"
                    @click.stop="this.sd_info = !this.sd_info">
                <SvgIcon class="hover:cursor-pointer" type="mdi" :path="sd_info ? close_icon : info_icon"/>
            </button>
        </div>
        <!-- Student participation list -->
        <div class="flex flex-col w-full h-full overflow-y-auto">
            <div v-if="!sd_info" class="flex flex-col w-full h-96 gap-y-5 pr-1">
                <!-- List header -->
                <div class="flex w-full h-auto px-5 font-bold">
                    <div class="flex w-1/12 justify-center"> ID </div>
                    <div class="flex w-5/12"> Student Name </div>
                    <div class="flex w-2/12"> Minutes </div>
                    <div class="flex w-4/12"> Time spent </div>
                </div>
                <DedicationCard v-for="(student, name, index) in students_dedication"
                                   :key="index"
                                   :id="index"
                                   :name="name"
                                   :student="student"
                />
            </div>
            <!-- Information -->
            <p v-else>
                Total time that each member has dedicated to the course.
            </p>
        </div>
    </div>
</template>

<script>
/**
 * Student Dedication list in students section
 * TODO: Merge this component with StudentParticipation list
 */
import {mdiClose, mdiHelpCircleOutline} from "@mdi/js";
import SvgIcon from "@jamescoyle/vue-icon";
import DedicationCard from "@/components/Students/DedicationCard.vue";

export default {
    name: "StudentDedication",
    components: {
        DedicationCard,
        SvgIcon
    },
    computed: {
        students_dedication: function () {
            return this.$store.state.students;
        }
    },
    data() {
        return {
            info_icon: mdiHelpCircleOutline,
            close_icon: mdiClose,
            sd_info: false
        }
    }
}
</script>

<style scoped>

</style>
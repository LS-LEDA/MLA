<template>
    <h1 class="text-4xl font-extrabold"> Students Data </h1>
    <span class="font-bold text-2xl text-gray-500"> Information on students interactions </span>
    <!-- Student Participation -->
    <div class="flex w-full h-full mt-5">
        <div class="flex flex-col w-2/6 h-full bg-secondary dark:bg-dark_secondary rounded-xl p-3 gap-y-3">
            <span class="flex font-bold text-xl">
                Student Participation
            </span>
            <!-- Student participation list -->
            <div class="flex flex-col w-full h-full overflow-y-auto">
                <div class="flex flex-col w-full h-96 gap-y-5 pr-1">
                    <ParticipationCard v-for="(student, index) in students_participation"
                                       :key="index"
                                       :name="index"
                                       :student="student"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ParticipationCard from "@/components/Students/ParticipationCard";
export default {
    name: "Students",
    components: {
        ParticipationCard
    },
    computed: {
        students_participation: function () {
            return this.$store.state.students
        }
    },
}
</script>

<style scoped>

</style>
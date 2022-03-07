<template>
    <div class="flex flex-col w-full h-full bg-secondary dark:bg-dark_secondary rounded-xl p-5 gap-y-5">
        <div class="flex w-full h-auto justify-between">
            <!-- Search box for student filtering -->
            <div class="flex w-3/12 h-10">
                <input class="flex w-full h-full rounded-lg bg-primary dark:bg-dark_primary p-2"
                       id="student_search"
                       type="text"
                       placeholder="Search"
                       v-model="student_search"
                >
            </div>

            <!-- Change view -->
            <div class="flex gap-x-3">
                <button class="flex max-w-full max-h-full bg-primary dark:bg-dark_primary rounded-md hover:bg-primary_variant
            dark:hover:bg-dark_primary_variant aspect-square justify-center items-center">
                    <SvgIcon type="mdi" :path="list_icon" size="28"/>
                </button>
                <button class="flex max-w-full max-h-full bg-primary dark:bg-dark_primary rounded-md hover:bg-primary_variant
            dark:hover:bg-dark_primary_variant aspect-square justify-center items-center">
                    <SvgIcon type="mdi" :path="grid_icon" size="28"/>
                </button>
            </div>
        </div>

        <!-- Student list -->
        <div class="flex w-full h-full overflow-y-auto">
            <div class="flex flex-col w-full h-96 gap-y-5">
                <StudentCard v-for="(student, index) in students_list"
                             :key="index"
                             :student="student[1]"
                             :name="student[0]"
                />
            </div>
        </div>
    </div>
</template>

<script>
import StudentCard from "@/components/Students/StudentCard";
import SvgIcon from "@jamescoyle/vue-icon";
import {mdiViewGrid, mdiViewSequential} from "@mdi/js";
export default {
    name: "StudentList",
    components: {
        StudentCard,
        SvgIcon
    },
    computed: {
        students_list: function () {
            return this.$store.state.students
        }
    },
    data() {
        return {
            list_icon: mdiViewGrid,
            grid_icon: mdiViewSequential,
        }
    }
}
</script>

<style scoped>

</style>
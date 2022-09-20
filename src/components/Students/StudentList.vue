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
                        dark:hover:bg-dark_primary_variant aspect-square justify-center items-center disabled:opacity-30
                        disabled:hover:bg-primary"
                        @click="this.grid = true"
                        :disabled="this.grid"
                >
                    <SvgIcon type="mdi" :path="list_icon" size="28"/>
                </button>
                <button class="flex max-w-full max-h-full bg-primary dark:bg-dark_primary rounded-md hover:bg-primary_variant
                        dark:hover:bg-dark_primary_variant aspect-square justify-center items-center disabled:opacity-30
                        disabled:hover:bg-primary"
                        @click="this.grid = false"
                        :disabled="!this.grid"
                >
                    <SvgIcon type="mdi" :path="grid_icon" size="28"/>
                </button>
            </div>
        </div>

        <!-- Student list -->
        <div class="flex w-full h-full overflow-y-auto">
            <!-- List view -->
            <div v-if="!this.grid" class="flex flex-col w-full h-full gap-y-5">
                <StudentCard v-for="(student, index) in students_list"
                             :key="index"
                             :student="student[1]"
                             :name="student[0]"
                             :grid="false"
                />
            </div>
            <!-- Grid view -->
            <div v-else class="grid w-full h-fit grid-cols-6 grid-rows-auto gap-5 overflow-y-auto">
                <StudentCard v-for="(student, index) in students_list"
                             :key="index"
                             :student="student[1]"
                             :name="student[0]"
                             :grid="true"
                />
            </div>
        </div>
    </div>
</template>

<script>
import StudentCard from "@/components/Students/StudentCard.vue";
import SvgIcon from "@jamescoyle/vue-icon";
import {mdiViewGrid, mdiViewSequential} from "@mdi/js";
import {useAppStore} from "@/vuex/appStore";
export default {
    name: "StudentList",
    components: {
        StudentCard,
        SvgIcon
    },
    setup() {
        const appStore = useAppStore();
        return { appStore };
    },
    computed: {
        /**
         * Gets students list with/out filtering
         * @returns {[string, unknown][]}
         */
        students_list: function () {
            let student_list = Object.entries(this.appStore.students)

            return [...student_list].filter( student => {
                return student[0].toLowerCase().includes(this.student_search.toLowerCase())
            });
        }
    },
    data() {
        return {
            list_icon: mdiViewGrid,
            grid_icon: mdiViewSequential,
            student_search: '',
            grid: true,
        }
    }
}
</script>

<style scoped>

</style>
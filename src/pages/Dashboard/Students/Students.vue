<template>
    <div class="flex w-full h-auto justify-between">
        <h1 class="text-4xl font-extrabold"> Students Data </h1>
        <div class="flex w-auto h-auto gap-x-3">
            <button class="flex max-w-full max-h-full bg-primary dark:bg-dark_primary rounded-md hover:bg-primary_variant
            dark:hover:bg-dark_primary_variant aspect-square justify-center items-center"
                    @click="change_page(-1)"
            >
                <SvgIcon type="mdi" :path="left_icon" size="28"/>
            </button>
            <button class="flex max-w-full max-h-full bg-primary dark:bg-dark_primary rounded-md hover:bg-primary_variant
            dark:hover:bg-dark_primary_variant aspect-square justify-center items-center"
                    @click="change_page(1)"
            >
                <SvgIcon type="mdi" :path="right_icon" size="28" @click="change_page(1)"/>
            </button>
        </div>
    </div>
    <span class="font-bold text-2xl text-gray-500"> {{ tabs[current_page].tab_description }} </span>
    <router-view></router-view>
</template>

<script>
import {mdiMenuLeft, mdiMenuRight} from "@mdi/js";
import SvgIcon from "@jamescoyle/vue-icon";
export default {
    name: "Students",
    components: {
        SvgIcon
    },
    methods: {
        /**
         * Change tabs method.
         * @param side left / right button
         * -1: left button press
         * 1: right button press
         */
        change_page: function (side) {
            // Check for tab boundaries
            if ( this.current_page + side >= 0 && this.current_page + side < this.tabs.length) {
                this.current_page += side;
            }

            // Change view
            switch (this.current_page) {
                case 1:
                    this.$router.push('/dashboard/students/list');
                    break;
                default:
                    this.$router.push('/dashboard/students/overview');
            }
        }
    },
    data() {
        return {
            left_icon: mdiMenuLeft,
            right_icon: mdiMenuRight,
            current_page: 0,
            tabs: [
                {
                    tab_name: "Overview",
                    tab_description: "Information on students interactions",
                    tab_path: "dashboard/students/overview"
                },
                {
                    tab_name: "Students List",
                    tab_description: "Students list",
                    tab_path: "dashboard/students/list"
                }
            ]
        }
    }
}
</script>

<style scoped>

</style>
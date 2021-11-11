<template>
    <div class="flex flex-row py-2 mx-2 my-5 h-20">
        <div class="flex-initial">
            <img class="w-auto h-full rounded-lg"
                 src="/assets/jsmla_logo.png" alt="jsMLA Logo">
        </div>
        <div class="flex-initial mx-4 font-bold text-4xl self-center">
            <h1>jsMLA</h1>
        </div>
        <div class="flex flex-1 w-max justify-end">
            <button type="button" class="self-center flex flex-row justify-self-end">
                <svg-icon size="36" type="mdi" :path="path" class="hover:drop-shadow shrink_icon"></svg-icon>
            </button>
        </div>
    </div>
</template>

<script>

import SvgIcon from '@jamescoyle/vue-icon'
import {mdiChevronDoubleLeft} from "@mdi/js";

export default {
    name: "NavigationHeader",
    components: {
        SvgIcon,
    },
    computed: {
        nav_state() {
            return this.$store.state.navigation_bar_status
        }
    },
    data() {
        return {
            path: mdiChevronDoubleLeft
        }
    }
}
</script>

<style scoped>
    .shrink_icon {
        color: gray;
    }
</style>
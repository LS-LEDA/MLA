<template>
    <div class="flex flex-row py-2 mx-2 my-5 h-20">
        <!-- Navigation bar App logo routed -->
        <router-link to="/import-data" :class="nav_state ? null : 'relative'">
            <img class="h-full w-full rounded-lg" src="/assets/jsmla_logo.png" alt="jsMLA Logo">
        </router-link>
        <!-- Application name -->
        <div class="flex-initial mx-4 font-bold text-2xl self-center hover:cursor-pointer" v-if="nav_state">
            <router-link to="/import-data">
                <h1>jsMLA</h1>
            </router-link>
        </div>
        <!-- Navigation shrink button -->
        <div class="flex flex-1 w-max justify-end" :class="nav_state ? null : 'absolute'">
            <button type="button" class="self-center flex flex-row justify-self-end" @click="changeNavigationBarStatus"
                    :class="nav_state ? null : 'transform transition duration-500 rotate-180'">
                <svg-icon size="36" type="mdi" :path="path" class="hover:drop-shadow shrink_icon"/>
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
    },
    methods: {
        // Expand or shrink navigation bar
        changeNavigationBarStatus() {
            this.$store.commit('changeNavigationBarStatus')
        }
    }
}
</script>

<style scoped>
    .shrink_icon {
        color: gray;
    }
</style>
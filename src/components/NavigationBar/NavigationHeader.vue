<template>
    <div class="flex flex-row py-2 mx-2 my-5 h-20" :class="nav_state ? null : 'justify-center items-center'">
        <!-- Navigation bar App logo routed -->
        <router-link :to="imported_data ? '/dashboard' : '/import-data'">
                <img class="max-h-16 rounded-lg origin-center z-50"
                     :class="'z-50'"
                     src="/assets/jsmla_logo.png" alt="jsMLA Logo">
        </router-link>
        <!-- Application name -->
        <!--<transition name="fade">-->
        <div class="flex-1 mx-4 font-bold text-2xl self-center hover:cursor-pointer" v-if="nav_state">
            <router-link :to="imported_data ? '/dashboard' : '/import-data'">
                    <h1>jsMLA</h1>
            </router-link>
        </div>
        <!--</transition>-->
        <!-- Navigation shrink button -->
        <button type="button" class="flex self-center center w-auto place-items-center z-0"
                :class="nav_state ? null : 'absolute transform transition duration-700 rotate-180'"
                @click="changeNavigationBarStatus">
            <svg-icon size="36" type="mdi" :path="path" class="hover:drop-shadow shrink_icon place-self-center"/>
        </button>
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
        },
        imported_data() {
            return this.$store.state.imported_data
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

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
</style>
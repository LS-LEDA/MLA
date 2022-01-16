<template>
    <div class="flex w-full h-full space-x-5">
        <div class="flex flex-col w-2/6 space-y-5">
            <!-- Application Mode settings -->
            <div class="flex flex-col w-full h- space-y-2">
                <div class="font-bold text-2xl">
                    Application mode
                </div>
                <ModeSelector v-for="( mode, index ) in application_modes" :key="index"
                              :selected="selected"
                              :mode="mode"
                              :id="index"
                              @select_mode="select_mode"
                />
            </div>
            <!-- Application Theme settings -->
            <div class="flex w-full h-full">
                <div class="font-bold text-2xl">
                    Application theme
                </div>
            </div>
        </div>

        <!-- Application Theme Preview -->
        <div class="flex w-4/6">
            Theme preview
        </div>
    </div>
</template>

<script>

import {mdiMonitor, mdiWeatherNight, mdiWhiteBalanceSunny} from "@mdi/js";
import ModeSelector from "@/components/Settings/ModeSelector";

export default {
    name: "Themes",
    components: {
        ModeSelector,
    },
    data() {
        return {
            selected: true,
            application_modes: [
                {
                    mode: "dark",
                    description: "Dark mode for night owls",
                    icon: mdiWeatherNight
                },
                {
                    mode: "light",
                    description: "Light mode for daydreamers",
                    icon: mdiWhiteBalanceSunny
                },
                {
                    mode: "system",
                    description: "Let the system decide for yous",
                    icon: mdiMonitor
                }
            ]
        }
    },
    methods: {
        /**
         * Switch between light or dark mode
         * dark: true
         * light: false
         */
        select_mode: function (selected_id) {
            this.selected = selected_id
        }
    }
}
</script>

<style scoped>

</style>
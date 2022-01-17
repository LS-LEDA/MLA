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
            <!-- TODO: Overflow layout -->
            <!-- Application Theme settings -->
            <div class="flex flex-col w-full h-full space-y-2">
                <div class="font-bold text-2xl">
                    Application theme
                </div>

                <div class="grid grid-cols-2 auto-rows-max gap-4 h-full overflow-x-hidden overflow-y-scroll">
                    <Theme v-for="( theme, index ) in themes" :key="index" :theme="theme"/>
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
import Theme from "@/components/Settings/Theme";

export default {
    name: "Themes",
    components: {
        Theme,
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
            ],
            themes: [
                {
                    name: "Summer Splash",
                    colours: [
                        '#264653',
                        '#2A9D8F',
                        '#E9C46A',
                        '#F4A261',
                        '#E76F51',
                    ]
                },
                {
                    name: "Pastel Dreams",
                    colours: [
                        '#CDB4DB',
                        '#FFC8DD',
                        '#FFAFCC',
                        '#BDE0FE',
                        '#A2D2FF',
                    ]
                },
                {
                    name: "Berry Blues",
                    colours: [
                        '#EF476F',
                        '#FFD166',
                        '#06D6A0',
                        '#118AB2',
                        '#073B4C',
                    ]
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
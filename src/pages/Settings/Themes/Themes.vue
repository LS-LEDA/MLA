<template>
    <div class="flex w-full h-full space-x-5">
        <div class="flex flex-col w-2/6 space-y-5">
            <!-- Application Mode settings -->
            <div class="flex flex-col w-full h- space-y-2">
                <div class="font-bold text-2xl">
                    Application mode
                </div>
                <ModeSelector v-for="( mode, index ) in themes_settings['application_modes']" :key="index"
                              :selected="selected_mode"
                              :mode="mode"
                              :id="index"
                              @select_mode="select_mode"
                />
            </div>
            <!-- TODO: Overflow layout -->
            <!-- Application Theme settings -->
            <div class="flex flex-col w-full h-full space-y-2">
                <div class="flex w-full justify-between">
                    <div class="font-bold text-2xl self-center">
                        Application theme
                    </div>
                    <div class="flex">
                        <IconButton :icon="revert_icon" type="Default theme" :status="true" @click="revert_theme"/>
                        <IconButton :icon="add_icon" type="Add" :status="true" @click="add_theme"/>
                    </div>
                </div>

                <div class="grid grid-cols-2 auto-rows-max gap-4 h-full overflow-x-hidden overflow-y-scroll">
                    <Theme v-for="( theme, index ) in themes_settings['themes']" :key="index"
                           :theme="theme"
                           :selected="selected_theme"
                           :id="index"
                           @select_theme="select_theme"/>
                </div>
            </div>
        </div>

        <!-- Application Theme Preview -->
        <div class="flex flex-col w-4/6 h-full justify-center items-center space-y-5">
            <component :is="views[view_counter]"></component>
            <!-- Preview dotted indicator -->
            <div class="flex w-full justify-center space-x-2">
                <div class="w-4 h-4 rounded-full hover:cursor-pointer"
                     :class="( index - 1 ) === view_counter ? 'bg-gray-400' : 'bg-gray-200'"
                     @click="change_preview(index - 1)"
                     v-for="index in views.length" :key="index">
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import {mdiMonitor, mdiPlus, mdiUndo, mdiWeatherNight, mdiWhiteBalanceSunny} from "@mdi/js";
import ModeSelector from "@/components/Settings/ModeSelector";
import Theme from "@/components/Settings/Theme";
import IconButton from "@/components/UI/IconButton";
import SummaryPreview from "@/components/Settings/Mockups/SummaryPreview";
import ImportDataPreview from "@/components/Settings/Mockups/ImportDataPreview";
import {markRaw} from "vue";

export default {
    name: "Themes",
    components: {
        SummaryPreview,
        IconButton,
        Theme,
        ModeSelector,
    },
    data() {
        return {
            // TODO: Load stored settings
            selected_mode: 0,
            selected_theme: 0,
            revert_icon: mdiUndo,
            add_icon: mdiPlus,
            view_counter: 0,
            views: [
                // Not reactive components
                markRaw(SummaryPreview),
                markRaw(ImportDataPreview)
            ],
            themes_settings: {
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
                        description: "Let the system decide for you",
                        icon: mdiMonitor
                    }
                ],
                themes: [
                    {
                        name: "Summer Splash",
                        colours: [
                            'bg-[#264653]',
                            'bg-[#2A9D8F]',
                            'bg-[#E9C46A]',
                            'bg-[#F4A261]',
                            'bg-[#E76F51]',
                        ]
                    },
                    {
                        name: "Pastel Dreams",
                        colours: [
                            'bg-[#CDB4DB]',
                            'bg-[#FFC8DD]',
                            'bg-[#FFAFCC]',
                            'bg-[#BDE0FE]',
                            'bg-[#A2D2FF]',
                        ]
                    },
                    {
                        name: "Berry Blues",
                        colours: [
                            'bg-[#EF476F]',
                            'bg-[#FFD166]',
                            'bg-[#06D6A0]',
                            'bg-[#118AB2]',
                            'bg-[#073B4C]',
                        ]
                    }
                ]
            },
        }
    },
    methods: {
        /**
         * Switch between light or dark mode
         * @param selected_id: Selected mode ID
         */
        select_mode: function (selected_id) {
            this.selected_mode = selected_id
            // TODO: Load user saved settings
            if ( selected_id === 0 ) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        },
        /**
         * Select between available themes
         * @param selected_id: Selected theme ID
         */
        select_theme: function (selected_id) {
            this.selected_theme = selected_id
        },
        add_theme: function () {
            // TODO: Implement add theme button
        },
        revert_theme: function () {
            // TODO: Implement add theme button
        },
        /**
         * On preview dot click change the view counter
         * This will load the selected preview mockup
         * @param previewID
         */
        change_preview: function (previewID) {
            this.view_counter = previewID;
        }
    }
}
</script>

<style scoped>

</style>
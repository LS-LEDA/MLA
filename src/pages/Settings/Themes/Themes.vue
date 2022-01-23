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
            colour_properties: [
                '--primary',
                '--primary_variant',
                '--secondary',
                '--secondary_variant',
                '--background',
                '--typography'
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
                        name: "Nabuki Sky",
                        colours: [
                            'bg-[#bfdbfe]',
                            'bg-[#93c5fd]',
                            'bg-[#ffffff]',
                            'bg-[#ffffff]',
                            'bg-[#dbeafe]',
                        ],
                        dark_colours: [
                            'bg-[#64748b]',
                            'bg-[#334155]',
                            'bg-[#1e293b]',
                            'bg-[#64748b]',
                            'bg-[#0f172a]',
                        ]
                    },
                    {
                        name: "Sakura Pink",
                        colours: [
                            'bg-[#fbcfe8]',
                            'bg-[#f9a8d4]',
                            'bg-[#ffffff]',
                            'bg-[#ffffff]',
                            'bg-[#fce7f3]',
                        ]
                    },
                    {
                        name: "La Vie en Rose",
                        colours: [
                            'bg-[#fecdd3]',
                            'bg-[#fda4af]',
                            'bg-[#ffffff]',
                            'bg-[#ffffff]',
                            'bg-[#ffe4e6]',
                        ]
                    },
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
    computed: {
        refresh_settings: function () {
            this.get_settings();
            return null;
        }
    },
    watch: {
        // This will trigger computed refresh_settings
        // on vuex settings changed
        refresh_settings() {}
    },
    mounted() {
        this.get_settings();
    },
    methods: {
        /**
         * Switch between light or dark mode
         * @param selected_id: Selected mode ID
         */
        select_mode: function (selected_id) {
            this.selected_mode = selected_id
            switch ( selected_id ) {
                case 0:
                    this.$store.commit('setSettings', {
                        key: 'theme.mode',
                        value: 'dark'
                    })
                    document.documentElement.classList.add('dark');
                    break;
                case 1:
                    this.$store.commit('setSettings', {
                        key: 'theme.mode',
                        value: 'light'
                    })
                    document.documentElement.classList.remove('dark');
                break;
                case 2:
                    console.log("System mode")
                    // TODO: Apply system mode
                break;
            }
        },
        /**
         * Select between available themes
         * @param selected_id: Selected theme ID
         */
        select_theme: function (selected_id) {
            this.selected_theme = selected_id
            // Dynamically apply the selected theme colours
            // to the root css variables
            let colour;
            this.themes_settings.themes[selected_id]['colours'].forEach( (col, index) => {
                colour = col.substring(
                    col.indexOf("[") + 1,
                    col.lastIndexOf("]")
                );
                document.documentElement.style.setProperty(this.colour_properties[index], colour);
            })
            this.$store.commit('setSettings', {
                key: 'theme.selectedThemeID',
                value: selected_id
            })
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
        },
        get_settings: function () {
            // Get themes settings sections
            let sections = Object.keys(this.themes_settings)

            // Get settings from vuex
            let sett = this.$store.state.settings

            // Current sections { 'application_modes', 'themes }
            sections.forEach( (section) => {
                if ( section === 'application_modes' ) {
                    this.themes_settings[section].forEach( ( mode, index ) => {
                        if ( mode.mode === sett['theme'].mode ) {
                            this.selected_mode = index
                        }
                    })
                } else {
                    // TODO: Load themes from user settings
                }
            });
        }
    }
}
</script>

<style scoped>

</style>
<template>
    <div class="flex flex-col w-full lg:w-1/2 h-full divide-y">
        <div class="flex h-auto flex-col py-5" v-for="( setting, index ) in general_settings" :key="index">
            <div class="flex justify-between">
                <div class="flex h-6 space-x-2">
                    <span class="font-bold">
                        {{ $t(setting.setting) }}
                    </span>
                    <Badge v-if="setting.beta" class="bg-amber-100 text-amber-800 text-sm font-medium dark:bg-amber-200 dark:text-amber-800" text="beta"/>
                </div>
                <Checkbox :selected="setting.selected" @click="toggle_setting(setting.id)"/>
            </div>
            <p class="flex pr-20">
                {{ $t(setting.description) }}
            </p>
        </div>
        <div class="ml-0.5 flex flex-col">
            <span class="font-bold py-5">
                {{ $t("settings.general.set_lang") }}
            </span>
            <IconButton
                :type="this.$i18n.locale"
                :icon="lang_icon"
                :status="true"
                @click="this.lang_dropdown = !this.lang_dropdown"
                class="w-fit font-normal rounded-md space-x-2"
            />
            <!-- Dropdown menu -->
            <div v-if="lang_dropdown" role="menu" id="dropdown" class="mt-2 flex-col w-44 h-44 rounded shadow shadow-lg p-1 z-10">
                <div class="flex flex-col h-full space-y-1">
                    <input
                        id="search_lang"
                        type="text"
                        v-model="search_lang"
                        class="w-full h-fit bg-transparent border border-primary rounded-sm"
                    >
                    <ul class="h-full text-gray-700 dark:text-gray-200 overflow-y-auto overflow-x-hidden">
                        <li
                            class="hover:bg-gray-200 rounded-sm"
                            v-for="(locale, index) in lang_list"
                            :key="index"
                            @click="this.$i18n.locale = locale"
                        >
                            {{locale}}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Checkbox from "@/components/UI/Checkbox.vue";
import Badge from "@/components/UI/Badge.vue";
import {useSettingsStore} from "@/vuex/settingsStore";
import {mdiTranslate} from "@mdi/js";
import IconButton from "@/components/UI/IconButton.vue";
export default {
    name: "General",
    components: {
        IconButton,
        Checkbox,
        Badge
    },
    setup() {
        const settingsStore = useSettingsStore();
        return { settingsStore };
    },
    methods: {
        toggle_setting: function(settingID) {
            // Update Pinia store & settings
            this.settingsStore.setSettings({
                key: 'general' + '.' + settingID,
                value: !this.settingsStore.settings['general'][settingID]
            })
        },
        get_settings: function () {
            // Get settings from Pinia
            let sett = this.settingsStore.settings
            this.general_settings.forEach( (setting) => {
                setting.selected = sett['general'][setting.id]
            })
        }
    },
    computed: {
        refresh_settings: function () {
            this.get_settings();
            return null;
        },
        lang_list: function() {
            let availableLocales = this.$i18n.availableLocales;
            return [...availableLocales].filter( lang => {
                return lang.toUpperCase().includes(this.search_lang.toUpperCase())
            } )
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
    data(){
        return {
            search_lang: "",
            lang_icon: mdiTranslate,
            lang_dropdown: false,
            general_settings: [
                {
                    id: 'gpu',
                    setting: "settings.general.set_gpu.title",
                    description: "settings.general.set_gpu.description",
                    selected: false
                },
                {
                    id: 'openOnStartup',
                    setting: "settings.general.set_startup.title",
                    description: "settings.general.set_startup.description",
                    selected: false
                },
                {
                    id: 'tray',
                    setting: "settings.general.set_tray.title",
                    description: "settings.general.set_tray.description",
                    selected: false
                },
                {
                    id: 'ai',
                    setting: "settings.general.set_ai.title",
                    description: "settings.general.set_ai.description",
                    beta: true,
                    selected: false
                }
            ]
        }
    }
}
</script>

<style scoped>

</style>
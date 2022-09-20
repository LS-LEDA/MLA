<template>
    <div class="flex flex-col w-full lg:w-1/2 h-full divide-y">
        <div class="flex flex-col py-5" v-for="( setting, index ) in general_settings" :key="index">
            <div class="flex justify-between">
                <div class="flex h-6 space-x-2">
                    <span class="font-bold">
                        {{ setting.setting }}
                    </span>
                    <Badge v-if="setting.beta" class="bg-amber-100 text-amber-800 text-sm font-medium dark:bg-amber-200 dark:text-amber-800" text="beta"/>
                </div>
                <Checkbox :selected="setting.selected" @click="toggle_setting(setting.id)"/>
            </div>
            <p class="flex pr-20">
                {{ setting.description }}
            </p>
        </div>
    </div>
</template>

<script>
import Checkbox from "@/components/UI/Checkbox.vue";
import Badge from "@/components/UI/Badge.vue";
import {useSettingsStore} from "@/vuex/settingsStore";
export default {
    name: "General",
    components: {
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
            general_settings: [
                {
                    id: 'gpu',
                    setting: "Hardware Acceleration",
                    description: "Turn on Hardware Acceleration, which uses GPU to make MLA smoother. Turn it off if you are experiencing frame drops.",
                    selected: false
                },
                {
                    id: 'openOnStartup',
                    setting: "Open MLA",
                    description: "Save yourself a few clicks and let MLA greet you on computer startup.",
                    selected: false
                },
                {
                    id: 'tray',
                    setting: "Minimize to tray",
                    description: "Hitting X will make MLA sit back and relax in your system tray when you close the app.",
                    selected: false
                },
                {
                    id: 'ai',
                    setting: "Emotion Analysis AI",
                    description: "Use AI to detect forum messages' emotion.",
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
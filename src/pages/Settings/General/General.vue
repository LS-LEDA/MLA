<template>
    <div class="flex flex-col w-3/6 h-full divide-y">
        <div class="flex flex-col py-5" v-for="( setting, index ) in general_settings" :key="index">
            <div class="flex justify-between">
               <span class="font-bold">
                   {{ setting.setting }}
               </span>
                <Checkbox :selected="setting.selected" @click="toggle_setting(index)"/>
            </div>
            <p class="flex pr-20">
                {{ setting.description }}
            </p>
        </div>
    </div>
</template>

<script>
import Checkbox from "@/components/UI/Checkbox";
export default {
    name: "General",
    components: {Checkbox},
    methods: {
        toggle_setting: function(settingID) {
            this.general_settings[settingID].selected = !this.general_settings[settingID].selected
        }
    },
    data(){
        return {
            general_settings: [
                {
                    setting: "Hardware Acceleration",
                    description: "Turn on Hardware Acceleration, which uses GPU to make MLA smoother. Turn it off if you are experiencing frame drops.",
                    selected: false
                },
                {
                    setting: "Open MLA",
                    description: "Save yourself a few clicks and let MLA greet you on computer startup.",
                    selected: false
                },
                {
                    setting: "Minimize to tray",
                    description: "Hitting X will make MLA sit back and relax in your system tray when you close the app.",
                    selected: false
                }
            ]
        }
    }
}
</script>

<style scoped>

</style>
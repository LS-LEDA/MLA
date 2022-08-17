<template>
    <div class="flex flex-col absolute w-full h-full justify-center place-items-center z-40 bg-gray-400 bg-opacity-75 transition-opacity"
         role="dialog" aria-modal="true">
        <div class="flex flex-col bg-white z-50 rounded-lg p-5">
            <button type="button"
                    @click="close_popup"
                    class="ml-auto bg-gray-100 text-gray-500 rounded-lg focus:ring-2 focus:ring-gray-400 p-1 hover:bg-gray-200 inline-flex h-8 w-8">
                <SvgIcon type="mdi" :path="close_icon"/>
            </button>
            <!-- Component to render [Documentation] -->
            <component
                :is="currentPopUp"
                v-bind="popUpProps"
            />
        </div>
        <div class="absolute w-full h-full filter backdrop-blur-sm z-10"></div>
    </div>
</template>

<script>
import SvgIcon from "@jamescoyle/vue-icon";
import {mdiClose} from "@mdi/js";

export default {
    name: "PopUp",
    props: ['currentPopUp', 'popUpProps'],
    emits: ['closePopUp'],
    components: {
        SvgIcon
    },
    data() {
        return {
            close_icon: mdiClose
        }
    },
    methods: {
        /**
         * Emit close popup event to parent component
         */
        close_popup: function () {
            this.$emit('closePopUp');
        }
    }
}
</script>

<style scoped>

</style>
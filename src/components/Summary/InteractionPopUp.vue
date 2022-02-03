<template>
    <div class="flex flex-col absolute w-full h-full justify-center place-items-center z-40 bg-gray-400 bg-opacity-75 transition-opacity"
         role="dialog" aria-modal="true">
        <!-- PopUp white background -->
        <div class="flex flex-col bg-secondary dark:bg-dark_secondary w-11/12 h-5/6 rounded-xl z-50 p-5 gap-y-5">
            <!-- Close button -->
            <button type="button" class=" justify-self-end bg-gray-100 text-gray-400 rounded-lg focus:ring-2 focus:ring-gray-200
                hover:bg-gray-200 inline-flex w-10 h-10 place-content-center items-center"
                    @click="close_pop_up">
                <SvgIcon class="hover:cursor-pointer" type="mdi" :path="close_icon"/>
            </button>
        </div>
        <div class="absolute w-full h-full filter backdrop-blur-sm z-10"></div>
    </div>
</template>

<script>
import {mdiClose} from "@mdi/js";
import SvgIcon from "@jamescoyle/vue-icon";

export default {
    name: "InteractionPopUp",
    components: {
        SvgIcon
    },
    emits: ['popUp'],
    methods: {
        close_pop_up: function () {
            this.$emit('popUp', {id: 0});
        },
    },
    data() {
        return {
            close_icon: mdiClose,
        }
    }
}
</script>

<style scoped>

</style>
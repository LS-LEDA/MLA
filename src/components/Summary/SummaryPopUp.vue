<template>
    <div class="flex flex-col absolute w-full h-full justify-center place-items-center bg-gray-400 bg-opacity-75 transition-opacity"
         role="dialog" aria-modal="true">
        <div class="flex flex-col bg-white w-11/12 h-5/6 rounded-xl z-50">
            <button type="button" class="bg-gray-100 text-gray-400 rounded-lg focus:ring-2 focus:ring-gray-200
            hover:bg-gray-200 inline-flex hover:bg-blue-500 rounded-xl w-10 h-10 place-content-center items-center"
                    @click="close_pop_up">
                <SvgIcon class="hover:cursor-pointer" type="mdi" :path="close_icon"/>
            </button>
        </div>
        <div class="absolute w-full h-full filter backdrop-blur-sm z-10"></div>
    </div>
</template>

<script>
import SvgIcon from "@jamescoyle/vue-icon";
import {mdiClose} from "@mdi/js";

export default {
    name: "SummaryPopUp",
    components: {
        SvgIcon
    },
    methods: {
        close_pop_up: function () {
            this.$emit('popUp')
        }
    },
    data(){
        return {
            close_icon: mdiClose
        }
    }
}
</script>

<style scoped>

</style>
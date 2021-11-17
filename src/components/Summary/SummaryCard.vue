<template>
    <div class="flex flex-col w-full bg-white rounded-3xl filter drop-shadow-lg
    transform transition duration-500 hover:scale-[101%] p-10 pb-5" :class="card_status ? 'pb-10': null">
        <!-- Card information -->
        <template v-if="card_status">
            <svg-icon class="items-end place-self-end hover:cursor-pointer text-gray-400" type="mdi" :path=close_icon @click="changeView()"></svg-icon>
            <span class="flex h-full mx-3 text-xl font-bold text-center self-center place-self-center items-center">
                {{ statistic.info }}
            </span>
        </template>
        <template v-else>
            <!-- Card title -->
            <span class="text-xl text-gray-500 font-bold row-start-1 row-end-1 col-start-1 col-end-1">
                {{ statistic.statistic_name }}
            </span>
            <!-- Card Statistics & Logo -->
            <div class="flex w-full flex-1 justify-between items-center">
                <span class="text-6xl font-bold row-start-2 row-end-2 col-start-1 col-end-1" >
                    {{ statistic.number }}
                </span>
                <svg-icon class ="justify-self-end" height="100" width="100" type="mdi" :path="statistic.icon"></svg-icon>
            </div>
            <!-- Card Information Icon -->
            <svg-icon class="items-end place-self-end hover:cursor-pointer" type="mdi" :path=help_icon @click="changeView()"></svg-icon>
        </template>
    </div>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon'
import {mdiClose, mdiHelpCircleOutline} from "@mdi/js"

export default {
    name: "SummaryCard",
    props: ['statistic'],
    components: {
        SvgIcon
    },
    data() {
        return {
            help_icon: mdiHelpCircleOutline,
            close_icon: mdiClose,
            /**
             * Cart Status
             * false:   Front
             * true:    Back
             */
            card_status: false
        }
    },
    methods: {
        changeView: function () {
            this.card_status = !this.card_status
        }
    }
}
</script>

<style scoped>

</style>

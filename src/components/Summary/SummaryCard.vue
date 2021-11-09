<template>
    <div class="flex flex-col w-full bg-white rounded-3xl w-full filter drop-shadow-lg
    transform transition duration-500 hover:scale-[101%] select-none p-10 pb-5">
        <!-- Card title -->
        <span class="text-xl text-gray-500 font-bold row-start-1 row-end-1 col-start-1 col-end-1" v-if="front">{{ statistic.statistic_name }}</span>
        <!-- Card Statistics & Logo -->
        <div class="flex w-full flex-1 justify-between items-center">
            <span class="text-6xl font-bold row-start-2 row-end-2 col-start-1 col-end-1" v-if="front" >{{ statistic.number }}</span>
            <svg-icon class ="justify-self-end" height="100" width="100" type="mdi" :path="statistic.icon" v-if="front"></svg-icon>
        </div>
        <!-- Card Information -->
        <svg-icon class="items-end place-self-end hover:cursor-pointer" type="mdi" :path=path @click="changeView()"></svg-icon>
        <span class="mr-3 ml-3 text-xl font-bold text-center self-center" v-if="back"> {{statistic.info}} </span>
    </div>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon'
import {mdiHelpCircleOutline} from "@mdi/js"

export default {
    name: "SummaryCard",
    props: ['statistic'],
    components: {
        SvgIcon
    },
    data() {
        return {
            path: mdiHelpCircleOutline,
            back: false,
            front: true
        }
    },
    methods: {
        changeView: function () {
            this.back = !this.back
            this.front = !this.front
        }
    }
}
</script>

<style scoped>

</style>

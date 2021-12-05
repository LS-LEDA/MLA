<template>
    <div class="flex flex-col absolute w-full h-full justify-center place-items-center bg-gray-400 bg-opacity-75 transition-opacity"
         role="dialog" aria-modal="true">

        <!-- PopUp white background -->
        <div class="flex flex-col bg-white w-11/12 h-5/6 rounded-xl z-50 p-5">
            <div class="flex w-full justify-between">
                <!-- PopUp Title -->
                <div class="w-auto bg-blue-300 rounded-xl py-2 px-5 font-bold">
                    {{ card_name }}
                </div>
                <!-- Close button -->
                <button type="button" class=" justify-self-end bg-gray-100 text-gray-400 rounded-lg focus:ring-2 focus:ring-gray-200
                hover:bg-gray-200 inline-flex hover:bg-blue-500 rounded-xl w-10 h-10 place-content-center items-center"
                        @click="close_pop_up({card_name, summaryID})">
                    <SvgIcon class="hover:cursor-pointer" type="mdi" :path="close_icon"/>
                </button>
            </div>

            <!-- Summary card chart -->
            <div class="flex w-full h-3/6">
            </div>
            <!-- Summary card table -->
            <div v-if="!withData" class="self-center"> No data </div>
            <div v-else class="flex w-full max-h-full justify-center overflow-y-scroll">
                <table class="table-auto">
                    <thead class="bg-blue-300">
                        <tr class="text-left uppercase">
                            <th class="p-3"> Interactions type </th>
                            <th class="p-3"> Number of interactions </th>
                        </tr>
                    </thead>
                    <tbody>
                    <tr class="bg-blue-100 hover:bg-blue-400" v-for="(interaction, index) in summary_interactions" :key="index">
                        <td class="font-bold p-3"> {{ interaction[0] }} </td>
                        <td class="p-3"> {{ interaction[1] }} </td>
                    </tr>
                    </tbody>
                </table>
            </div>
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
    props: ['summaryID', 'card_name'],
    methods: {
        close_pop_up: function ({card_name, summaryID}) {
            this.$emit('popUp', {card_name, summaryID});
        }
    },
    mounted() {
        try {
            let unsorted_interactions = Object.entries(this.$store.state.summary_cards[this.summaryID]);
            // Sort by interaction value - TimSort
            // Each object ['Interaction Name', 'Interaction Value']
            this.summary_interactions = unsorted_interactions.sort(
                (a, b) => {
                    return b[1] - a[1]
                }
            );
        } catch (error) {
            // No interactions for the selected summary card
            this.withData = false;
        }
    },
    data(){
        return {
            close_icon: mdiClose,
            summary_interactions: {},
            withData: true,
        }
    }
}
</script>

<style scoped>

</style>
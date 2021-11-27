<template>
    <div class="flex w-full h-auto gap-x-3 hover:cursor-pointer">
        <!-- Profile Logo -->
        <div class="flex rounded-xl bg-blue-300 h-16 w-1/12">
            <svg-icon class="w-full h-full" type="mdi" :path="profile_icon"/>
        </div>

        <!-- Message Box -->
        <div class="flex flex-col w-full bg-blue-200 rounded-xl p-10 text-justify border-r-8"
             :class="border_color()">
            <div class="flex justify-between">
                <div class="text-gray-500 font-bold"> @{{ messages.username }} </div>
                <div class="text-gray-400"> {{ messages.created }} </div>
            </div>
            <div> {{ messages.message }} </div>
        </div>
    </div>
</template>

<script>
import SvgIcon from "@jamescoyle/vue-icon";
import {mdiAccount} from "@mdi/js";

export default {
    name: "SentimentChatCard",
    components: {
        SvgIcon
    },
    props: ['messages'],
    data() {
        return {
            profile_icon: mdiAccount,
        }
    },
    methods: {
        border_color: function () {
            switch (this.messages.sentiment){
                case "positive":
                    return 'border-green-500';
                case "negative":
                    return 'border-red-500';
                default:
                    return 'border-yellow-500';
            }
        }
    }
}
</script>

<style scoped>

</style>
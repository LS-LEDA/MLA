<template>
    <h1 class="text-4xl font-extrabold"> Sentiment Analysis </h1>
    <span class="font-bold text-2xl text-gray-500"> Forum messages sentiments </span>

    <div class="flex flex-col w-full h-full mt-5 gap-y-5">
        <!-- Sentiment cards -->
        <div class="flex w-full h-52 gap-x-5">
            <SentimentFileCard class="row-span-1"
                               :file_name="selected_file_name"
                               :messages="forum.messages"
                               :users="forum.users"/>
            <SentimentOverallCard :sentiments="forum.sentiments"/>
        </div>

        <div class="flex w-full h-full gap-x-5 pb-10">
            <div class="flex flex-col w-1/2 bg-white rounded-xl p-10 overflow-y-scroll overflow-x-hidden gap-y-5
                        backdrop-filter">
                <SentimentChatCard v-for="(message, index) in forum.forum_messages" :messages="message" :key="index"
                                   :class="selected_id === index ? 'brightness-100' : 'brightness-75'"
                                   @click="select_msg(index)"/>
            </div>
            <SentimentScore class="w-1/2" :score="selected_msg_score"/>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import SentimentChatCard from "@/components/Sentiment/SentimentChatCard";
import SentimentScore from "@/components/Sentiment/SentimentScore";
import SentimentOverallCard from "@/components/Sentiment/SentimentOverallCard";
import SentimentFileCard from "@/components/Sentiment/SentimentFileCard";

export default {
    name: "Sentimental",
    components: {

        SentimentFileCard,
        SentimentOverallCard,
        SentimentScore,
        SentimentChatCard
    },
    data(){
        return {
            selected_msg_score: "",
            selected_id: 0,
            selected_file_name: "",
        }
    },
    mounted() {
        this.selected_msg_score = this.$store.state.forum.forum_messages[0].sentiment;
        this.selected_file_name = this.$store.state.forum_file_name;
    },
    computed: {
        forum() {
            return this.$store.state.forum;
        }
    },
    methods: {
        select_msg: function(msg_id) {
            this.selected_msg_score = this.$store.state.forum.forum_messages[msg_id].sentiment;
            this.selected_id = msg_id;
        },
    }
}
</script>

<style scoped>

</style>
<template>
    <h1 class="text-4xl font-extrabold"> Sentimental Analysis </h1>
    <span class="font-bold text-2xl text-gray-500"> Forum messages sentiments </span>

    <div class="grid grid-rows-4 grid-cols-2 w-full h-full gap-5 mt-5">
        <SentimentFileCard class="row-span-1"
                           :file_name="selected_file_name"
                           :messages="forum_messages.length"
                           :users="total_users"/>
        <SentimentOverallCard/>
        <div class="flex flex-col h-full bg-white rounded-xl row-span-3 p-10 overflow-y-scroll overflow-x-hidden gap-y-5
                    backdrop-filter">
            <SentimentChatCard v-for="(message, index) in forum_messages" :messages="message" :key="index"
                               :class="selected_id === index ? 'brightness-100' : 'brightness-75'"
                               @click="select_msg(index)"/>
        </div>
        <SentimentScore :score="selected_msg_score"/>
    </div>
</template>

<script>
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
            total_users: 0,
            sentiments_count: {}
        }
    },
    mounted() {
        this.selected_msg_score = this.$store.state.forum_messages[0].sentiment;
        console.log(this.$store.state.forum_file_name)
        this.selected_file_name = this.$store.state.forum_file_name;
    },
    computed: {
        forum_messages() {
            this.count_users(this.$store.state.forum_messages);
            this.count_sentiments(this.$store.state.forum_messages);
            return this.$store.state.forum_messages;
        }
    },
    methods: {
        select_msg: function(msg_id) {
            this.selected_msg_score = this.$store.state.forum_messages[msg_id].sentiment;
            this.selected_id = msg_id;
        },
        count_users: function (messages) {
            let dict = {};
            let count = 0;
            messages.forEach( (msg) => {
                dict[msg.username] = (dict[msg.username] + 1) || count++;
            })
            this.total_users = count;
        },
        count_sentiments: function (messages) {
            messages.forEach( (msg) => {
                this.sentiments_count[msg.sentiment] = (this.sentiments_count[msg.sentiment] + 1) || 1;
            });
        }
    }
}
</script>

<style scoped>

</style>
<template>
    <h1 class="text-4xl font-extrabold"> Sentimental Analysis </h1>
    <span class="font-bold text-2xl text-gray-500"> Forum messages sentiments </span>

    <div class="grid grid-rows-4 grid-cols-2 w-full h-full gap-5 mt-5">
        <SentimentFileCard class="row-span-1"/>
        <SentimentOverallCard/>
        <div class="flex flex-col h-full bg-white rounded-xl row-span-3 p-10 overflow-y-scroll gap-y-5">
            <SentimentChatCard v-for="(message, index) in forum_messages" :messages="message" :key="index"/>
        </div>
        <SentimentScore score="POSITIVE"/>
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
    computed: {
        forum_messages() {
            return this.$store.state.forum_messages
        }
    }
}
</script>

<style scoped>

</style>
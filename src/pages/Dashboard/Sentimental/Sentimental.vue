<template>
    <h1 class="text-4xl font-extrabold"> Sentimental Analysis </h1>
    <span class="font-bold text-2xl text-gray-500"> Forum messages sentiments </span>
</template>

<script>
import SentimentChatCard from "@/components/Sentiment/SentimentChatCard";

export default {
    name: "Sentimental",
    components: {
        SentimentChatCard
    },
    data() {
        return {
            forum_messages: [
                {
                    userfullname: "User 1",
                    message: "I love cats 🐈",
                    timestamp: "18/11/2021"
                },
                {
                    userfullname: "User 2",
                    message: "I love cats too🐈  I own a cat called Maro, what about you guys? Do you have any pets at home?" +
                        "I love cats too🐈  I own a cat called Maro, what about you guys? Do you have any pets at home?",
                    timestamp: "18/11/2021"
                },
                {
                    userfullname: "User 3",
                    message: "Yes I do, but I’m more of a dog 🐕 fan. My cute little doggie’s name is Cheems",
                    timestamp: "18/11/2021"
                },
                {
                    userfullname: "User 4",
                    message: "You bastards, free those animals, they’re not toys!!",
                    timestamp: "18/11/2021"
                }
            ]
        }
    }
}
</script>

<style scoped>

</style>
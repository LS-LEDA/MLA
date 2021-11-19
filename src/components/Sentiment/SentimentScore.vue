<template>
    <div class="flex w-full h-20 border-2 rounded-xl place-content-center items-center"
         :class="selectScore ? 'bg-green-300 border-green-500' : 'bg-red-300 border-red-500'">
        <span class="font-black text-white text-5xl"> {{ score }} </span>
    </div>
</template>

<script>
export default {
    name: "SentimentScore",
    props: ['score'],
    computed: {
        /**
         * Determine if the selected message
         * is positive or not, hence, it changes
         * the badge styles
         * @returns {boolean}
         */
        selectScore() {
            return this.score === "POSITIVE"
        }
    }
}
</script>

<style scoped>

</style>
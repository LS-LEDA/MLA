<template>
    <div class="flex w-full h-20 border-2 rounded-xl place-content-center items-center"
         :class="selectScore">
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
         * @returns {string}
         */
        selectScore() {
            switch (this.score){
                case "positive":
                    return 'bg-green-300 border-green-500';
                case "negative":
                    return 'bg-red-300 border-red-500';
                default:
                    return 'bg-yellow-300 border-yellow-500';
            }
        }
    }
}
</script>

<style scoped>

</style>
<template>
    <div class="flex w-full h-full gap-x-2">
        <div class="flex flex-col w-1/3 h-full gap-y-5">
            <!-- Imported emotions list -->
            <!-- TODO: Add a select all checkbox -->
            <div class="flex flex-col w-full h-3/4">
                <div class="flex font-bold text-2xl">
                    Emotions List
                </div>
                <div class="w-full h-full overflow-y-scroll">
                    <div class="flex flex-col w-full h-96">
                        <EmotionCard v-for="( emotion, index) in emotions" :key="index" :emotion="emotion"/>
                    </div>
                </div>
            </div>

            <!-- Import emotions box -->
            <div class="flex flex-col w-full h-1/4 border border-slate-200 rounded-xl p-3 place-items-center gap-y-3">
                <textarea
                    class="block w-full h-full text-base font-normal text-gray-700 bg-white bg-clip-padding
                    border border-solid border-gray-300 rounded transition ease-in-out m-0 border-0
                    focus:text-gray-700 focus:outline-none bg-transparent resize-none"
                    id="emotions_input"
                    placeholder="Enter emotions here"
                ></textarea>
                <Button text="Add" @btnClick="add_emotions"/>
            </div>
        </div>
    </div>
</template>

<script>
import EmotionCard from "@/components/Settings/AI/EmotionCard";
import Button from "@/components/UI/Button";

export default {
    name: "AI",
    components: {
        Button,
        EmotionCard
    },
    methods: {
        /**
         * Get the emotions from the input textarea
         * and lists them in the emotions list section
         */
        add_emotions: function () {
            let emotions = document.getElementById('emotions_input').value;
            document.getElementById('emotions_input').value = "";
            // TODO: Improve the parsing
            this.emotions = this.emotions.concat(emotions.split(" "));
        }
    },
    data() {
        return {
            emotions: [],
        }
    }
}
</script>

<style scoped>

</style>
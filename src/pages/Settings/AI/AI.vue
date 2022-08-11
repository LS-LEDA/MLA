<template>
    <div class="flex flex-col w-full h-full space-y-2">
        <div class="flex w-full h-full gap-x-5">
            <div class="flex flex-col w-1/3 h-full gap-y-5">
                <!-- Imported emotions list -->
                <!-- TODO: Add a select all checkbox -->
                <div class="flex flex-col w-full h-3/4">
                    <div class="flex font-bold text-2xl">
                        Emotions List
                    </div>
                    <div class="w-full h-full overflow-y-scroll">
                        <div class="flex flex-col w-full h-96">
                            <EmotionCard v-for="( emotion, index) in emotions"
                                         :key="index"
                                         :emotion="emotion"
                                         @removeEmotion="this.remove_emotion_card(index)"/>
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

            <!-- Dataset section -->
            <div class="flex flex-col w-2/3 h-full gap-y-5">
                <div class="flex flex-col w-full h-3/4 overflow-y-hidden">
                    <div class="flex font-bold text-2xl">
                        Datasets data
                    </div>
                    <div class="flex flex-col w-full h-full space-y-3 overflow-y-scroll">
                        <div class="flex w-full h-fit rounded-lg space-x-2 bg-primary dark:bg-dark_primary px-5 py-2 place-items-center" v-for="(sentence, index) in emotions_dataset" :key="index">
                            <p class="w-8/12 truncate text-ellipsis whitespace-nowrap overflow-hidden"> {{ sentence.message }} </p>
                            <div class="flex w-4/12 overflow-x-auto no-scrollbar gap-x-2">
                                <Badge v-for="(tag, tag_index) in sentence.tag" :text="tag" :key="tag_index"
                                      class="flex h-fit w-fit p-1"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Import emotion labeled dataset section -->
                <div class="flex w-full h-1/4">
                    <div class="flex w-full border-black border rounded-xl border-dashed p-5 justify-center items-center
                    space-x-5"
                         @dragenter.prevent="toggleActive"
                         @dragleave.prevent="toggleActive"
                         @dragover.prevent
                         @drop.prevent="select_file"
                         :class=" {'bg-primary dark:bg-dark_primary transition-all duration-300' :active }">
                        <input type="file" ref="moodle_file" class="hidden" @change="select_file">
                        <span class="font-bold text-center text-2xl"> Drag & Drop file here </span>
                        <span class="text-center text-xl"> or </span>
                        <BrowseFilesButton class="w-max" :class="{'bg-secondary dark:bg-dark_secondary transition-all duration-300' :active }"/>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex w-full h-fit justify-center">
            <Button text="Train AI" @btnClick="train_ai"/>
        </div>
    </div>
</template>

<script>
import EmotionCard from "@/components/Settings/AI/EmotionCard";
import Button from "@/components/UI/Button";
import {mdiFileUpload, mdiHelpCircleOutline} from "@mdi/js";
import {ref} from "vue";
import BrowseFilesButton from "@/components/ImportData/BrowseFilesButton";
import {load_emotions, train_ai} from "@/services/ai_processing";
import Badge from "@/components/UI/Badge";

export default {
    name: "AI",
    components: {
        Badge,
        BrowseFilesButton,
        Button,
        EmotionCard
    },
    setup() {
        const active = ref(false)
        const toggleActive = () => {
            active.value = !active.value;
        }

        return { active, toggleActive }
    },
    computed: {
        emotions_dataset() {
            return this.$store.state.emotions_dataset;
        }
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
        },
        /**
         * Removes the selected emotion card from the list
         * @param emotionCardID: Selected emotion card
         */
        remove_emotion_card: function (emotionCardID) {
            this.emotions.splice(emotionCardID, 1);
        },
        /**
         * File selection callback
         * Stores the selected file
         * @param e
         */
        select_file: function (e) {
            let uploaded_file;
            if (e.type === "drop") {
                this.toggleActive();
                uploaded_file = e.dataTransfer.files[0];
                if ( !uploaded_file ) return;
                this.data_file = uploaded_file;
                load_emotions(this.data_file);
                return;
            }
            uploaded_file = e.target.files[0];
            if ( !uploaded_file ) return;
            this.data_file = uploaded_file;
            this.$refs.moodle_file.value = null;
            load_emotions(this.data_file);
        },
        /**
         * Triggers AI emotion analysis training
         */
        train_ai: function () {
            // Store the emotions list
            this.$store.commit('saveEmotionsList', this.emotions);
            train_ai();
        }
    },
    data() {
        return {
            emotions: [],
            upload_file_icon: mdiFileUpload,
            information_icon: mdiHelpCircleOutline,
            data_file: null,
            emotion_dataset: []
        }
    }
}
</script>

<style scoped>

</style>
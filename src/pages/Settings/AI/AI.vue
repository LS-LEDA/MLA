<template>
  <div class='flex flex-col w-full h-full space-y-2'>
    <div class='flex w-full justify-between'>
      <div class='flex items-center space-x-2'>
        <span class='text-2xl font-bold'>
          {{ $t('settings.ai.title') }}
        </span>
        <Badge
          class='bg-amber-100 text-amber-800 text-sm font-medium dark:bg-amber-200 dark:text-amber-800'
          text='beta'
        />
        <SvgIcon
          :path='information_icon'
          type='mdi'
          @click='show_documentation'
        />
      </div>
      <div class='flex'>
        <div class='flex w-auto h-4'>
          <Button
            :disable='check_loaded_data'
            :text="$t('settings.ai.train_ai')"
            class='h-fit w-fit'
            @btnClick='train_ai'
          />
        </div>
        <div class='flex w-auto h-4'>
          <input
            ref='model_file'
            class='hidden'
            multiple
            type='file'
            @change='load_model'
          />
          <Button
            :text="$t('settings.ai.load_model_weights')"
            class='h-fit w-fit'
            @btnClick='this.$refs.model_file.click()'
          />
        </div>
      </div>
    </div>
    <div class='flex w-full h-full divide-x-2 overflow-y-hidden'>
      <div class='flex flex-col w-1/3 h-full gap-y-5 pr-2'>
        <!-- Imported emotions list -->
        <!-- TODO: Add a select all checkbox -->
        <div class='flex flex-col w-full h-3/4'>
          <div class='flex font-bold text-xl'>
            {{ $t('settings.ai.emotions_list') }}
          </div>
          <div class='w-full h-full overflow-y-scroll'>
            <div class='flex flex-col w-full h-96'>
              <EmotionCard
                v-for='(emotion, index) in emotions'
                :key='index'
                :emotion='emotion'
                @removeEmotion='this.remove_emotion_card(index)'
              />
            </div>
          </div>
        </div>

        <!-- Import emotions box -->
        <div
          class='flex flex-col w-full h-1/4 border border-slate-200 rounded-xl p-3 place-items-center gap-y-3'
        >
          <textarea
            id='emotions_input'
            :placeholder="this.$t('settings.ai.emotions_list_input')"
            class='block w-full h-full text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 border-0 focus:text-gray-700 focus:outline-none bg-transparent resize-none'
          ></textarea>
          <Button class='h-fit w-fit' text='Add' @btnClick='add_emotions' />
        </div>
      </div>

      <!-- Dataset section -->
      <div class='flex flex-col w-2/3 h-full gap-y-5 pl-2'>
        <div class='flex flex-col w-full h-3/4'>
          <div class='flex font-bold text-xl'>
            {{ $t('settings.ai.datasets_data') }}
          </div>
          <div class='flex flex-col w-full h-full overflow-y-scroll'>
            <div class='flex flex-col w-full h-96 space-y-2'>
              <div
                v-for='(sentence, index) in emotions_dataset'
                :key='index'
                class='flex w-full h-fit rounded-lg space-x-2 bg-primary dark:bg-dark_primary px-5 py-2 place-items-center'
              >
                <p
                  class='w-8/12 truncate text-ellipsis whitespace-nowrap overflow-hidden'
                >
                  {{ sentence.message }}
                </p>
                <div class='flex w-4/12 overflow-x-auto no-scrollbar gap-x-2'>
                  <Badge
                    v-for='(tag, tag_index) in sentence.tag'
                    :key='tag_index'
                    :text='tag'
                    class='flex h-fit w-fit p-1'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Import emotion labeled dataset section -->
        <div class='flex w-full h-1/4'>
          <div
            :class="{
              'bg-primary dark:bg-dark_primary transition-all duration-300':
                active,
            }"
            class='flex w-full border-black border rounded-xl border-dashed p-5 justify-center items-center space-x-5'
            @dragenter.prevent='toggleActive'
            @dragleave.prevent='toggleActive'
            @dragover.prevent
            @drop.prevent='select_file'
          >
            <input
              ref='ai_dataset_file'
              class='hidden'
              type='file'
              @change='select_file'
            />
            <span class='font-bold text-center text-2xl'>
              {{ $t('app.drag_drop.drag_drop', 2) }}
            </span>
            <span class='text-center text-xl'> or </span>
            <Button
              :class="{
                'bg-secondary dark:bg-dark_secondary transition-all duration-300':
                  active,
              }"
              :icon='open_folder_icon'
              :text="this.$t('app.drag_drop.browse')"
              @btnClick='browse_open'
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import EmotionCard from '@/components/Settings/AI/EmotionCard.vue';
  import Button from '@/components/UI/Button.vue';
  import {
    mdiFileUpload,
    mdiFolderOpen,
    mdiHelpCircleOutline,
    mdiTranslate,
  } from '@mdi/js';
  import { ref } from 'vue';
  import {
    load_emotions,
    load_model,
    train_ai,
  } from '@/services/ai_processing';
  import Badge from '@/components/UI/Badge.vue';
  import SvgIcon from '@jamescoyle/vue-icon';
  import { html } from '@/documentation/settings-ai-training.md';
  import { useAppStore } from '@/vuex/appStore';

  export default {
    name: 'AI',
    components: {
      Badge,
      Button,
      EmotionCard,
      SvgIcon,
    },
    emits: ['popUp'],
    setup() {
      const appStore = useAppStore();
      const active = ref(false);
      const toggleActive = () => {
        active.value = !active.value;
      };

      return { active, appStore, toggleActive };
    },
    computed: {
      emotions_dataset() {
        return this.appStore.emotions_dataset;
      },
      /**
       * Enables or disables "Train AI" button
       * Enable: Emotions & Emotions dataset have data
       * Disable: Either Emotions or Emotions dataset have no data
       * @returns {boolean}
       */
      check_loaded_data() {
        return this.emotions.length === 0 || this.emotions_dataset.length === 0;
      },
    },
    methods: {
      browse_open: function() {
        this.$refs.ai_dataset_file.click();
      },
      /**
       * Get the emotions from the input textarea
       * and lists them in the emotions list section
       */
      add_emotions: function() {
        let emotions = document.getElementById('emotions_input').value;
        document.getElementById('emotions_input').value = '';
        // TODO: Improve the parsing
        this.emotions = this.emotions.concat(emotions.split(' '));
      },
      /**
       * Removes the selected emotion card from the list
       * @param emotionCardID: Selected emotion card
       */
      remove_emotion_card: function(emotionCardID) {
        this.emotions.splice(emotionCardID, 1);
      },
      /**
       * File selection callback
       * Stores the selected file
       * @param e
       */
      select_file: function(e) {
        let uploaded_file;
        if (e.type === 'drop') {
          this.toggleActive();
          uploaded_file = e.dataTransfer.files[0];
          if (!uploaded_file) return;
          this.data_file = uploaded_file;
          load_emotions(this.data_file);
          return;
        }
        uploaded_file = e.target.files[0];
        if (!uploaded_file) return;
        this.data_file = uploaded_file;
        this.$refs.ai_dataset_file.value = null;
        load_emotions(this.data_file);
      },
      /**
       * Triggers AI emotion analysis training
       */
      train_ai: function() {
        // Store the emotions list
        this.appStore.saveEmotionsList(this.emotions);
        train_ai();
      },
      // TODO: Automatic model loading from the file system with tfjs-node
      /**
       * Loads the AI sequential model from user selected files,
       * ensures that only 2 files are loaded, these files extensions must be
       * .json for the model and .bin for the weights.
       * It logs an error if the aforementioned requirements are not satisfied.
       * @param e Input event
       */
      load_model: function(e) {
        if (e.target.files.length !== 2) {
          console.log(
            'Please upload the AI model files (model.json & weights.bin)',
          );
          return;
        }

        // Must be 2 files
        [...e.target.files].forEach((file) => {
          if (file.name.endsWith('.json')) {
            this.model_file = file;
          } else if (file.name.endsWith('.bin')) {
            this.weights_file = file;
          }
        });

        if (this.model_file === null || this.weights_file === null) {
          console.log(
            'Please upload the AI model files (model.json & weights.bin)',
          );
          return;
        }

        // Finally, load the model to the system
        load_model(this.model_file, this.weights_file);
      },
      /**
       * Emits popup event to its parent component
       * and sends the documentation file to be displayed
       */
      show_documentation: function() {
        this.$emit('popUp', this.docs_file);
      },
    },
    data() {
      return {
        emotions: [],
        lang_icon: mdiTranslate,
        open_folder_icon: mdiFolderOpen,
        upload_file_icon: mdiFileUpload,
        information_icon: mdiHelpCircleOutline,
        data_file: null,
        model_file: null,
        weights_file: null,
        show_docs: false,
        docs_file: html,
      };
    },
  };
</script>

<style scoped></style>

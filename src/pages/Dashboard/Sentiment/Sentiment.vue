<template>
  <h1 class='text-4xl font-extrabold'>Sentiment Analysis</h1>
  <span class='font-bold text-2xl text-gray-500'>
    Forum messages sentiments
  </span>

  <div class='flex flex-col w-full h-full mt-5 gap-y-5 overflow-y-hidden'>
    <!-- Sentiment cards -->
    <div class='flex w-full h-52 gap-x-5'>
      <SentimentFileCard
        :file_name='selected_file_name'
        :messages='forum.messages'
        :users='forum.users'
        class='row-span-1'
      />
      <SentimentOverallCard :sentiments='forum.sentiments' />
    </div>

    <div class='flex w-full h-full gap-x-5 overflow-y-hidden'>
      <div
        class='flex flex-col w-1/2 h-full bg-secondary dark:bg-dark_secondary rounded-xl p-10 overflow-y-scroll overflow-x-hidden gap-y-2 backdrop-filter'
      >
        <SentimentChatCard
          v-for='(message, index) in forum.forum_messages'
          :key='index'
          :class="selected_id === index ? 'brightness-100' : 'brightness-75'"
          :messages='message'
          @click='select_msg(index)'
        />
      </div>
      <div class='flex flex-col w-1/2 space-y-2'>
        <SentimentScore :score='selected_msg_score' class='w-full' />
        <span class=''>Emotion Analysis: {{ this.selected_msg_emotion }}</span>
      </div>
    </div>
  </div>
</template>

<script>
  /* eslint-disable */
  import SentimentChatCard from '@/components/Sentiment/SentimentChatCard.vue';
  import SentimentScore from '@/components/Sentiment/SentimentScore.vue';
  import SentimentOverallCard from '@/components/Sentiment/SentimentOverallCard.vue';
  import SentimentFileCard from '@/components/Sentiment/SentimentFileCard.vue';
  import { useAppStore } from '@/vuex/appStore';

  export default {
    name: 'Sentiment',
    emits: ['popUp'],
    components: {
      SentimentFileCard,
      SentimentOverallCard,
      SentimentScore,
      SentimentChatCard,
    },
    data() {
      return {
        selected_msg_score: '',
        selected_id: 0,
        selected_file_name: '',
        selected_msg_emotion: '',
      };
    },
    setup() {
      const appStore = useAppStore();
      return { appStore };
    },
    mounted() {
      this.selected_msg_score = this.appStore.forum.forum_messages[0].sentiment;
      this.selected_msg_emotion = this.appStore.forum.forum_messages[0].emotion;
      this.selected_file_name = this.appStore.forum_file_name;
    },
    computed: {
      forum() {
        return this.appStore.forum;
      },
    },
    methods: {
      select_msg: function(msg_id) {
        this.selected_msg_score =
          this.appStore.forum.forum_messages[msg_id].sentiment;
        this.selected_msg_emotion =
          this.appStore.forum.forum_messages[msg_id].emotion;
        this.selected_id = msg_id;
      },
    },
  };
</script>

<style scoped></style>

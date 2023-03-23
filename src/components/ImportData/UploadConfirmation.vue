<template>
  <div
    aria-modal='true'
    class='flex absolute inset-0 justify-center place-items-center bg-gray-400 bg-opacity-75 transition-opacity'
    role='dialog'
  >
    <div
      class='flex flex-col w-2/6 h-auto bg-secondary dark:bg-dark_secondary rounded-3xl space-y-2 pb-3 drop-shadow-xl z-50'
    >
      <!-- Uploaded file section -->
      <div class='flex flex-row rounded-2xl m-5 px-5 py-4 border border-black'>
        <svg-icon :path='file_icon' type='mdi' />
        <span class='ml-5'> {{ selected_file_name  }} </span>
      </div>
      <!-- Backend connection status-->
      <div v-if='alive' class='flex flex-row self-center'>
        <div
          class='flex self-center w-4 h-4 bg-green-300 rounded-md border-2 border-green-600'
        ></div>
        <span class='ml-2'> Connected to: Local <strong>coreMLA</strong></span>
      </div>
      <div v-else class='flex flex-row self-center'>
        <div
          class='flex self-center w-4 h-4 bg-red-300 rounded-md border-2 border-red-600'
        ></div>
        <span class='ml-2'>
          Please install <strong>coreMLA</strong> or choose
          <strong>LServer</strong> in the Settings
        </span>
      </div>
      <!-- Upload Confirmation Buttons -->
      <div class='flex flex-row justify-center'>
        <Button
          :icon='cancel_icon'
          :text="$t('app.cancel')"
          @btnClick="$emit('buttonClick', false)"
        />
        <Button
          :icon='upload_icon'
          :text="$t('app.upload')"
          @btnClick="$emit('buttonClick', true)"
        />
      </div>
    </div>
    <div class='absolute w-full h-full filter backdrop-blur-sm z-10'></div>
  </div>
</template>

<script lang="ts">
  import SvgIcon from '@jamescoyle/vue-icon';
  import { mdiClose, mdiFile, mdiUpload } from '@mdi/js';
  import Button from '@/components/UI/Button.vue';

  export default {
    name: 'UploadConfirmation',
    components: {
      Button,
      SvgIcon,
    },
    emits: ['buttonClick'],
    props: {
      selected_file_name : {
        type: String,
        required: true,
      },
    },
    //TODO: Ping backend on render
    data() {
      return {
        file_icon: mdiFile,
        cancel_icon: mdiClose,
        upload_icon: mdiUpload,
        alive: true,
      };
    },
  };
</script>

<style scoped></style>

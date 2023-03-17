<template>
  <div class='flex h-1/4 items-center'>
    <div class='w-full'>
      <div class='flex pb-3'>
        <div class='flex-1'></div>

        <div class='flex-1'>
          <div
            class='w-10 h-10 bg-green-200 border-4 border-green-500 border-opacity-25 mx-auto rounded-full text-lg flex items-center'
          >
            <svg-icon
              v-if='progress.status >= 1'
              :path='completed_icon'
              class='w-full'
              type='mdi'
            ></svg-icon>
            <span v-else class='text-center w-full'>1</span>
          </div>
        </div>
        <div
          class='w-1/6 align-center items-center align-middle content-center flex'
        >
          <div
            class='w-full bg-gray-100 rounded items-center align-middle align-center flex-1'
          >
            <div
              v-if='progress.status >= 1'
              class='bg-green-400 text-xs leading-none py-1 text-center text-grey-darkest rounded'
              style='width: 100%'
            ></div>
            <div
              v-if='progress.status === 0'
              :style="{ width: progress.progress + '%' }"
              class='bg-green-400 text-xs leading-none py-1 text-center text-grey-darkest rounded'
            ></div>
          </div>
        </div>
        <div class='flex-1'>
          <div
            class='w-10 h-10 bg-green-200 border-4 border-green-500 border-opacity-25 mx-auto rounded-full text-lg flex items-center'
          >
            <svg-icon
              v-if='progress.status >= 2'
              :path='completed_icon'
              class='w-full'
              type='mdi'
            ></svg-icon>
            <span v-else class='text-center w-full'>2</span>
          </div>
        </div>
        <div
          class='w-1/6 align-center items-center align-middle content-center flex'
        >
          <div
            class='w-full bg-gray-100 rounded items-center align-middle align-center flex-1'
          >
            <div
              v-if='progress.status >= 2'
              class='bg-green-400 text-xs leading-none py-1 text-center text-grey-darkest rounded'
              style='width: 100%'
            ></div>
            <div
              v-if='progress.status === 1'
              :style="{ width: progress.progress + '%' }"
              class='bg-green-400 text-xs leading-none py-1 text-center text-gray-darkest rounded'
            ></div>
            <div
              v-if='progress.status < 1'
              class='bg-gray-100 text-xs leading-none py-1 text-center text-grey-darkest rounded'
            ></div>
          </div>
        </div>
        <div class='flex-1'>
          <div
            class='w-10 h-10 bg-green-200 border-4 border-4 border-green-500 border-opacity-25 mx-auto rounded-full text-lg flex items-center'
          >
            <svg-icon
              v-if='progress.status >= 3'
              :path='completed_icon'
              class='w-full'
              type='mdi'
            ></svg-icon>
            <span v-else class='text-center w-full'>3</span>
          </div>
        </div>
        <div
          class='w-1/6 align-center items-center align-middle content-center flex'
        >
          <div
            class='w-full bg-gray-100 rounded items-center align-middle align-center flex-1'
          >
            <div
              v-if='progress.status >= 3'
              class='bg-green-400 text-xs leading-none py-1 text-center text-grey-darkest rounded'
              style='width: 100%'
            ></div>
            <div
              v-if='progress.status === 2'
              :style="{ width: progress.progress + '%' }"
              class='bg-green-400 text-xs leading-none py-1 text-center text-grey-darkest rounded'
            ></div>
            <div
              v-if='progress.status < 2'
              class='bg-gray-100 text-xs leading-none py-1 text-center text-grey-darkest rounded'
            ></div>
          </div>
        </div>
        <div class='flex-1'>
          <div
            class='w-10 h-10 bg-green-200 border-4 border-green-500 border-opacity-25 mx-auto rounded-full text-lg flex items-center'
          >
            <span class='text-center w-full'>4</span>
          </div>
        </div>

        <div class='flex-1'></div>
      </div>

      <div class='flex text-lg content-center text-center'>
        <div class='w-1/4'>
          {{ $t('import_page.progress_bar.step1') }}
        </div>

        <div class='w-1/4'>
          {{ $t('import_page.progress_bar.step2') }}
        </div>

        <div class='w-1/4'>
          {{ $t('import_page.progress_bar.step3') }}
        </div>

        <div class='w-1/4'>
          {{ $t('import_page.progress_bar.step4') }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import SvgIcon from '@jamescoyle/vue-icon';
  import { mdiCheck } from '@mdi/js';
  import { useAppStore } from '@/vuex/appStore';

  export default {
    name: 'UploadProgressBar',
    components: {
      SvgIcon,
    },
    setup() {
      const appStore = useAppStore();
      return { appStore };
    },
    computed: {
      progress(): {
        status: number;
        progress: number;
      }{
        return {
          status: this.appStore.upload_status.status,
          progress: this.appStore.upload_status.progress,
        };
      },
    },
    data() {
      return {
        completed_icon: mdiCheck,
      };
    },
  };
</script>

<style scoped></style>

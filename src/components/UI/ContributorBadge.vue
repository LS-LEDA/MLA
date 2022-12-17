<template>
  <!-- Contributor badge background -->
  <div
    class='flex bg-primary dark:bg-dark_primary rounded-lg max-w-full max-h-32 shadow-lg shadow-primary_variant/30 p-5 gap-x-3 truncate text-ellipsis'
  >
    <!-- Profile Icon -->
    <img :src='contributor.icon' alt='icon' class='w-20 h-20 rounded-full' />

    <!-- Profile information -->
    <div class='flex flex-col w-full h-full'>
      <!-- Contributor name -->
      <div class='font-black'>
        {{ contributor.name }}
      </div>

      <!-- TODO: Fix overflow -->
      <!-- Contributor contact information -->
      <span class='flex max-w-full font-bold text-blue-600 space-x-2'>
        <a :href='`mailto:` + contributor.email'>
          {{ contributor.email }}
        </a>
        <SvgIcon
          :path='copy_icon'
          class='self-center hover:bg-primary dark:hover:bg-dark_primary'
          size='16'
          type='mdi'
          @click='copy_mail'
        />
      </span>

      <!-- Contributor role in the project -->
      <div class='text-gray-500 inline'>
        {{ contributor.role }}
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
  import SvgIcon from '@jamescoyle/vue-icon';
  import { mdiContentCopy } from '@mdi/js';

  export default {
    name: 'ContributorBadge',
    props: {
      contributor: {
        name: String,
        email: String,
        icon: String,
        role: String,
      },
    },
    components: {
      SvgIcon,
    },
    data() {
      return {
        copy_icon: mdiContentCopy,
      };
    },
    methods: {
      /**
       * Copies the selected mail to clipboard
       */
      copy_mail: function() {
        navigator.clipboard.writeText(this.contributor.email);
      },
    },
  };
</script>

<style scoped></style>

<template>
  <div
    :class="nav_state ? 'w-60' : 'w-16'"
    class='mx-2 my-2 flex flex-col bg-secondary dark:bg-dark_secondary rounded-md transform transition-all duration-700 z-[1]'
  >
    <NavigationHeader />
    <div class='flex flex-col h-full mx-2 justify-between'>
      <div class='flex flex-col gap-y-3'>
        <div
          v-for='(page, index) in pages'
          :key='index'
          class='flex flex-col rounded-md bg-primary dark:bg-dark_primary font-bold w-full h-fit relative'
        >
          <router-link
            :class="[
              nav_state ? '' : 'place-content-center',
              page.wrapped !== undefined && !page.wrapped && nav_state
                ? 'rounded-b-none'
                : '',
            ]"
            :to='page.page_link'
            active-class='w-full bg-primary_variant dark:bg-dark_primary_variant'
            class='flex w-full p-2 rounded-md hover:bg-primary_variant space-x-3'
          >
            <SvgIcon :path='page.button_icon' type='mdi' />
            <span v-if='nav_state'>{{ $t(page.button_name) }}</span>
          </router-link>
          <!-- Wrap page children list icon -->
          <SvgIcon
            v-if='nav_state && page.children'
            :path='
              this.pages[index].wrapped ? chevron_down_icon : chevron_up_icon
            '
            class='absolute bg-primary rounded-md right-2 top-2 cursor-pointer'
            type='mdi'
            @click='page.wrapped = !page.wrapped'
          />
          <div
            v-if='nav_state && page.wrapped !== undefined && !page.wrapped'
            class='p-2'
          >
            <router-link
              v-for='(subpage, subpageIndex) in page.children'
              :key='subpageIndex'
              v-slot='{ isActive }'
              :class="nav_state ? null : 'justify-center'"
              :to='page.page_link + subpage.rel_link'
              active-class='bg-primary_variant dark:bg-dark_primary_variant rounded-md'
              class='text-sm flex w-full px-2 py-2 hover:bg-primary_variant dark:hover:bg-dark_primary_variant hover:rounded-md'
            >
              <div
                v-if='isActive'
                class='border-l-4 border-primary my-0.5 rounded-full mr-2'
              />
              {{ $t(subpage.button_name) }}
            </router-link>
          </div>
        </div>
      </div>
      <Button
        id='download'
        :icon='nav_state ? null : download_icon'
        :text="nav_state ? this.$t('navigation.download') : null"
        class='bg-primary_variant dark:bg-dark_primary_variant uppercase font-bold justify-center mb-3 !px-0'
      />
    </div>
    <!-- Navigation shrink button -->
    <button
      class='bg-secondary dark:bg-dark_secondary absolute -right-4 h-12 w-4 top-1/2 transform -translate-y-1/2 rounded-r-md'
      @click='changeNavigationBarStatus'
    >
      <SvgIcon
        :path='chevron_left_icon'
        :rotate='nav_state ? 0 : 180'
        class='text-black dark:text-secondary transform transition duration-700'
        size='16'
        type='mdi'
      />
    </button>
  </div>
</template>

<script>
  import NavigationHeader from '@/components/NavigationBar/NavigationHeader.vue';
  import {
    mdiChevronDoubleLeft,
    mdiChevronDown,
    mdiChevronUp,
    mdiCogOutline,
    mdiDatabaseImportOutline,
    mdiToyBrickPlusOutline,
    mdiViewDashboardOutline,
    mdiCloudDownload,
  } from '@mdi/js';
  import SvgIcon from '@jamescoyle/vue-icon';
  import { useSettingsStore } from '@/vuex/settingsStore';
  import Button from '@/components/UI/Button.vue';

  export default {
    name: 'NavigationBar',
    components: {
      Button,
      NavigationHeader,
      SvgIcon,
    },
    setup() {
      const settingsStore = useSettingsStore();
      return { settingsStore };
    },
    computed: {
      /**
       * Navigation bar state:
       * true: expanded
       * false: shrank
       */
      nav_state() {
        return this.settingsStore.navigation_bar_status;
      },
    },
    methods: {
      // Expand or shrink navigation bar
      changeNavigationBarStatus() {
        this.settingsStore.changeNavigationBarStatus();
      },
    },
    data() {
      return {
        chevron_down_icon: mdiChevronDown,
        chevron_up_icon: mdiChevronUp,
        chevron_left_icon: mdiChevronDoubleLeft,
        download_icon: mdiCloudDownload,
        pages: [
          {
            button_name: 'navigation.import',
            button_icon: mdiDatabaseImportOutline,
            page_link: '/import-data',
          },
          {
            button_name: 'navigation.dashboard.dash',
            button_icon: mdiViewDashboardOutline,
            page_link: '/dashboard',
            wrapped: true,
            children: [
              {
                button_name: 'navigation.dashboard.summary',
                rel_link: '/summary',
              },
              {
                button_name: 'navigation.dashboard.students',
                rel_link: '/students',
              },
              {
                button_name: 'navigation.dashboard.resources',
                rel_link: '/resources',
              },
              {
                button_name: 'navigation.dashboard.sentiment',
                rel_link: '/sentiment',
              },
            ],
          },
          {
            button_name: 'navigation.plugins',
            button_icon: mdiToyBrickPlusOutline,
            page_link: '/plugins',
          },
          {
            button_name: 'navigation.settings.sett',
            button_icon: mdiCogOutline,
            page_link: '/settings',
            wrapped: true,
            children: [
              {
                button_name: 'navigation.settings.general',
                rel_link: '/general',
              },
              {
                button_name: 'navigation.settings.ai',
                rel_link: '/ai',
              },
              {
                button_name: 'navigation.settings.themes',
                rel_link: '/themes',
              },
              {
                button_name: 'navigation.settings.about',
                rel_link: '/about',
              },
            ],
          },
        ],
      };
    },
  };
</script>

<style scoped></style>

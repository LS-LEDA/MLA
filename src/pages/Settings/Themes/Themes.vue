<template>
  <div class='flex w-full h-full space-x-5'>
    <div class='flex flex-col w-full xl:w-2/6 space-y-5'>
      <!-- Application Mode settings -->
      <div class='flex flex-col w-full h- space-y-2'>
        <div class='font-bold text-2xl'>
          {{ $t('settings.themes.app_mode') }}
        </div>
        <ModeSelector
          v-for="(mode, index) in themes_settings['application_modes']"
          :id='index'
          :key='index'
          :mode='mode'
          :selected='selected_mode'
          @select_mode='select_mode'
        />
      </div>
      <!-- TODO: Overflow layout -->
      <!-- Application Theme settings -->
      <div class='flex flex-col w-full h-full space-y-2'>
        <div class='flex w-full justify-between'>
          <div class='font-bold text-2xl self-center'>
            {{ $t('settings.themes.app_theme') }}
          </div>
          <div class='flex'>
            <Button
              :icon='revert_icon'
              :text="this.$t('settings.themes.default_theme')"
              @click='revert_theme'
            />
            <Button
              :icon='add_icon'
              :text="this.$t('settings.themes.add')"
              @click='add_theme'
            />
          </div>
        </div>

        <div
          class='grid grid-cols-2 auto-rows-max gap-4 h-full overflow-x-hidden overflow-y-scroll'
        >
          <Theme
            v-for='(theme, index) in app_themes'
            :id='index'
            :key='index'
            :selected='selected_theme'
            :theme='theme'
            @select_theme='select_theme'
          />
        </div>
      </div>
    </div>

    <!-- Application Theme Preview -->
    <div
      class='hidden xl:flex flex-col w-4/6 h-full justify-center items-center space-y-5'
    >
      <component :is='views[view_counter]'></component>
      <!-- Preview dotted indicator -->
      <div class='flex w-full justify-center space-x-2'>
        <div
          v-for='index in views.length'
          :key='index'
          :class="index - 1 === view_counter ? 'bg-gray-400' : 'bg-gray-200'"
          class='w-4 h-4 rounded-full hover:cursor-pointer'
          @click='change_preview(index - 1)'
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    mdiMonitor,
    mdiPlus,
    mdiUndo,
    mdiWeatherNight,
    mdiWhiteBalanceSunny,
  } from '@mdi/js';
  import ModeSelector from '@/components/Settings/ModeSelector.vue';
  import Theme from '@/components/Settings/Theme.vue';
  import SummaryPreview from '@/components/Settings/Mockups/SummaryPreview.vue';
  import ImportDataPreview from '@/components/Settings/Mockups/ImportDataPreview.vue';
  import { markRaw } from 'vue';
  import { useSettingsStore } from '@/vuex/settingsStore';
  import Button from '@/components/UI/Button.vue';

  export default {
    name: 'Themes',
    components: {
      Button,
      SummaryPreview,
      Theme,
      ModeSelector,
    },
    setup() {
      const settingsStore = useSettingsStore();
      return { settingsStore };
    },
    data() {
      return {
        selected_mode: 0,
        selected_theme: 0,
        revert_icon: mdiUndo,
        add_icon: mdiPlus,
        view_counter: 0,
        views: [
          // Not reactive components
          markRaw(SummaryPreview),
          markRaw(ImportDataPreview),
        ],
        themes_settings: {
          application_modes: [
            {
              mode: 'dark',
              description: 'settings.themes.app_modes.dark',
              icon: mdiWeatherNight,
            },
            {
              mode: 'light',
              description: 'settings.themes.app_modes.light',
              icon: mdiWhiteBalanceSunny,
            },
            {
              mode: 'system',
              description: 'settings.themes.app_modes.sys',
              icon: mdiMonitor,
            },
          ],
        },
      };
    },
    computed: {
      refresh_settings: function() {
        this.get_settings();
        return null;
      },
      app_themes: function() {
        return this.settingsStore.themes;
      },
    },
    watch: {
      // This will trigger computed refresh_settings
      // on vuex settings changed
      refresh_settings() {
      },
    },
    mounted() {
      this.get_settings();
    },
    methods: {
      /**
       * Switch between light or dark mode
       * @param selected_id: Selected mode ID
       */
      select_mode: function(selected_id) {
        this.selected_mode = selected_id;
        switch (selected_id) {
          case 0:
            this.settingsStore.setSettings({
              key: 'theme.mode',
              value: 'dark',
            });
            document.documentElement.classList.add('dark');
            break;
          case 1:
            this.settingsStore.setSettings({
              key: 'theme.mode',
              value: 'light',
            });
            document.documentElement.classList.remove('dark');
            break;
          case 2:
            console.log('System mode');
            // TODO: Apply system mode
            break;
        }
      },
      /**
       * Select between available themes
       * @param selected_id: Selected theme ID
       */
      select_theme: function(selected_id) {
        this.selected_theme = selected_id;
        // Dynamically apply the selected theme colours
        // to the root css variables
        let colour;
        this.settingsStore.themes[selected_id]['colours'].forEach(
          (col, index) => {
            colour = col.substring(col.indexOf('[') + 1, col.lastIndexOf(']'));
            document.documentElement.style.setProperty(
              this.settingsStore.colour_properties[index],
              colour,
            );
          },
        );
        this.settingsStore.setSettings({
          key: 'theme.selectedThemeID',
          value: selected_id,
        });
      },
      add_theme: function() {
        // TODO: Implement add theme button
      },
      revert_theme: function() {
        // TODO: Implement add theme button
      },
      /**
       * On preview dot click change the view counter
       * This will load the selected preview mockup
       * @param previewID
       */
      change_preview: function(previewID) {
        this.view_counter = previewID;
      },
      get_settings: function() {
        // Get themes settings sections
        let sections = Object.keys(this.themes_settings);

        // Get settings from vuex
        let sett = this.settingsStore.settings;

        // Current sections { 'application_modes', 'themes }
        sections.forEach((section) => {
          if (section === 'application_modes') {
            this.themes_settings[section].forEach((mode, index) => {
              if (mode.mode === sett['theme'].mode) {
                this.selected_mode = index;
              }
            });
          } else {
            // TODO: Load themes from user settings
          }
        });

        // Load user selected colour theme
        this.selected_theme = sett['theme']['selectedThemeID'];
      },
    },
  };
</script>

<style scoped></style>

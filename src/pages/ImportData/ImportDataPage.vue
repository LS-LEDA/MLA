<template>
  <section
    id='import_data_area'
    class='relative h-full w-full flex place-content-center'
  >
    <InformationPopUp
      v-if='show_popUp'
      @infoPopUp='toggle_information_pop_up'
    />
    <div
      class='flex flex-col bg-secondary dark:bg-dark_secondary rounded-3xl h-5/6 w-9/12 self-center justify-center'
    >
      <UploadProgressBar />
      <DragDropArea @onUpload='toggle_pop_up' @popUp='toggle_popup' />
    </div>
    <UploadConfirmation
      v-if='file_selected'
      :selected_file_name='selected_file_name'
      @buttonClick='confirm_upload'
    />
    <!-- Documentation Pop Up -->
    <!--TODO: Move popup to App.vue-->
    <PopUp
      v-if='popup'
      :current-pop-up='this.current_popup_up'
      :pop-up-props='this.docs_file'
      @closePopUp='this.toggle_popup'
    />
    <!-- Alert -->
    <Alert
      v-if='alert_status.status'
      :message='alert_status.message'
      @closeAlert='close_alert'
    />
  </section>
</template>

<script>
  import DragDropArea from '@/components/ImportData/DragDropArea.vue';
  import UploadConfirmation from '@/components/ImportData/UploadConfirmation.vue';
  import UploadProgressBar from '@/components/ImportData/UploadProgressBar.vue';
  import InformationPopUp from '@/components/ImportData/InformationPopUp.vue';
  import { local_processing } from '@/services/local-processing';
  import Alert from '@/components/UI/Alert.vue';
  import { useSettingsStore } from '@/vuex/settingsStore';
  import { useAppStore } from '@/vuex/appStore';
  import PopUp from '@/components/UI/PopUp.vue';
  import { markRaw } from 'vue';
  import Documentation from '@/components/UI/Documentation.vue';

  export default {
    name: 'ImportDataPage',
    setup() {
      const settingsStore = useSettingsStore();
      const appStore = useAppStore();
      return { appStore, settingsStore };
    },
    data() {
      return {
        file_selected: false,
        selected_file_name: '',
        selected_file: null,
        show_popUp: false,
        popup: false,
        // Documentation component is not reactive
        current_popup_up: markRaw(Documentation),
        docs_file: null,
      };
    },
    components: {
      UploadProgressBar,
      UploadConfirmation,
      DragDropArea,
      InformationPopUp,
      Alert,
      PopUp,
    },
    mounted() {
      this.get_settings();
    },
    computed: {
      alert_status() {
        return this.appStore.alert;
      },
      load_theme: function() {
        this.get_settings();
        return null;
      },
    },
    watch: {
      load_theme() {
      },
    },
    methods: {
      /**
       * Get MLA user saved settings and loads
       * app's mode & theme
       * This function will be fired on app startup
       */
      get_settings: function() {
        // Load user selected colour theme
        let colour;
        let selected_id =
          this.settingsStore.settings['theme']['selectedThemeID'];
        this.settingsStore.themes[selected_id]['colours'].forEach(
          (col, index) => {
            colour = col.substring(col.indexOf('[') + 1, col.lastIndexOf(']'));
            document.documentElement.style.setProperty(
              this.settingsStore.colour_properties[index],
              colour,
            );
          },
        );
        let app_mode = this.settingsStore.settings['theme']['mode'];
        switch (app_mode) {
          case 'dark':
            document.documentElement.classList.add('dark');
            break;
          case 'light':
            document.documentElement.classList.remove('dark');
            break;
          case 'system':
            console.log('System mode');
            // TODO: Apply system mode
            break;
        }
      },
      /**
       * Toggles the Information PopUp visibility
       */
      toggle_information_pop_up: function() {
        this.show_popUp = !this.show_popUp;
      },
      /**
       * Toggles the Upload Confirmation
       * PopUp visibility
       */
      toggle_pop_up: function(selected_file) {
        this.file_selected = !this.file_selected;
        // Store file name
        this.selected_file_name = selected_file.name;
        // Store file
        this.selected_file = selected_file;
      },
      /**
       * Emitted when a file has been selected
       * or dropped in the Import File Area
       */
      confirm_upload: function(whichButton) {
        // Check whether to upload or cancel
        // TODO: Upload to server back-end
        if (whichButton) {
          // Native Processing
          // Detect the log type: General logs or Forum chat logs
          local_processing(this.selected_file);
        }
        // Final Close the PopUp
        this.toggle_pop_up(this.selected_file_name);
      },
      close_alert: function() {
        // Clears toggle alert timeout if alert is dismissed by the user
        clearTimeout(this.appStore.alert.timeout);
        this.appStore.alert.status = false;
      },
      /**
       * Receives the file to be shown in the popup component
       * from its child and toggles the popup state
       * @param file File to be shown in the Documentation popup
       */
      toggle_popup: function(file) {
        this.popup = !this.popup;
        this.docs_file = {
          file: file,
        };
      },
    },
  };
</script>

<style scoped></style>

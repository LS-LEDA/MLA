<template>
  <div class="flex flex-col border-black border-2 rounded-3xl border-dashed mx-12 mb-12 p-5 justify-center items-center
                space-y-6"
       @dragenter.prevent="toggleActive"
       @dragleave.prevent="toggleActive"
       @dragover.prevent
       @drop.prevent="select_file"
       :class=" {'bg-primary dark:bg-dark_primary transition-all duration-300' :active }">
    <input type="file" ref="moodle_file" class="hidden" @change="select_file">
    <svg-icon class="w-1/4 h-1/4 justify-center"
              type="mdi" :path="upload_file_icon"></svg-icon>
    <span class="font-bold text-center text-5xl"> {{$t("app.drag_drop.drag_drop")}} </span>
    <span class="text-center text-4xl"> {{$t("app.drag_drop.or")}} </span>
    <Button
        :text="this.$t('app.drag_drop.browse')"
        :icon="open_folder_icon"
        @btnClick="browse_open"
        :class="{'bg-secondary dark:bg-dark_secondary transition-all duration-300' :active}"
    />
    <div class="flex flex-row w-full h-1/5 justify-end content-end">
      <div class="flex items-end cursor-pointer">
        <svg-icon type="mdi" :path="information_icon" @click="informationPopUp"></svg-icon>
      </div>
    </div>
  </div>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon'
import {mdiFileUpload, mdiFolderOpen, mdiHelpCircleOutline} from "@mdi/js"
import { ref } from 'vue'
import {html} from "@/documentation/import-data.md";
import Button from "@/components/UI/Button.vue";

export default {
  name: "DragDropArea",
  components: {
    Button,
    SvgIcon
  },
  emits: ['onUpload', 'popUp'],
  data() {
    return {
      open_folder_icon: mdiFolderOpen,
      upload_file_icon: mdiFileUpload,
      information_icon: mdiHelpCircleOutline,
      data_file: null
    }
  },
  setup() {
    const active = ref(false)
    const toggleActive = () => {
      active.value = !active.value;
    }

    return { active, toggleActive }
  },
  emits: ['onUpload', 'popUp'],
  data() {
    return {
          upload_file_icon: mdiFileUpload,
          information_icon: mdiHelpCircleOutline,
          data_file: null,
          show_docs: false,
          docs_file: html
      }
  }
  methods: {
    browse_open: function () {
      this.$refs.moodle_file.click();
    },
    /**
    * Emits popup event to its parent component
    * and sends the documentation file to be displayed
    */
    informationPopUp: function () {
      this.$emit('popUp', this.docs_file);
    },
    /**
     * Checks whether is a drop or a input change event
     * Stores the selected file and enables a popup
     * for the user to confirm the upload to the backend
     * @param e: drop or change event
     */
    select_file: function (e) {
      let uploaded_file;
      if (e.type === "drop") {
        this.toggleActive();
        uploaded_file = e.dataTransfer.files[0];
        if ( !uploaded_file ) return;
        this.data_file = uploaded_file;
        this.confirm_upload();
        return;
      }
      uploaded_file = e.target.files[0];
      if ( !uploaded_file ) return;
      this.data_file = uploaded_file;
      this.$refs.moodle_file.value = null;
      this.confirm_upload();
    },
    confirm_upload: function () {
      this.$emit('onUpload', this.data_file);
    }
  }
}
</script>

<style scoped>

</style>
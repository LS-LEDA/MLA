import { defineStore } from 'pinia';

interface SettingsStore {
  colour_properties: string[];
  themes: object[];
  settings: object;
  navigation_bar_status: boolean;
}

export const useSettingsStore = defineStore('settings', {
  state: (): SettingsStore => ({
    /**
     * Navigation bar status
     * true:    Expanded
     * false:   Shrank
     */
    navigation_bar_status: false,
    /**
     * MLA theme CSS variables
     */
    colour_properties: [
      '--primary',
      '--primary_variant',
      '--secondary',
      '--secondary_variant',
      '--background',
      '--typography',
    ],
    /**
     * MLA default themes
     */
    themes: [
      {
        name: 'Nabuki Sky',
        colours: [
          'bg-[#bfdbfe]',
          'bg-[#93c5fd]',
          'bg-[#ffffff]',
          'bg-[#ffffff]',
          'bg-[#dbeafe]',
        ],
        dark_colours: [
          'bg-[#64748b]',
          'bg-[#334155]',
          'bg-[#1e293b]',
          'bg-[#64748b]',
          'bg-[#0f172a]',
        ],
      },
      {
        name: 'Sakura Pink',
        colours: [
          'bg-[#fbcfe8]',
          'bg-[#f9a8d4]',
          'bg-[#ffffff]',
          'bg-[#ffffff]',
          'bg-[#fce7f3]',
        ],
      },
      {
        name: 'La Vie en Rose',
        colours: [
          'bg-[#fecdd3]',
          'bg-[#fda4af]',
          'bg-[#ffffff]',
          'bg-[#ffffff]',
          'bg-[#ffe4e6]',
        ],
      },
      {
        name: 'Summer Splash',
        colours: [
          'bg-[#264653]',
          'bg-[#2A9D8F]',
          'bg-[#E9C46A]',
          'bg-[#F4A261]',
          'bg-[#E76F51]',
        ],
      },
      {
        name: 'Pastel Dreams',
        colours: [
          'bg-[#CDB4DB]',
          'bg-[#FFC8DD]',
          'bg-[#FFAFCC]',
          'bg-[#BDE0FE]',
          'bg-[#A2D2FF]',
        ],
      },
      {
        name: 'Berry Blues',
        colours: [
          'bg-[#EF476F]',
          'bg-[#FFD166]',
          'bg-[#06D6A0]',
          'bg-[#118AB2]',
          'bg-[#073B4C]',
        ],
      },
    ],
    /**
     * Stores MLA user settings
     */
    settings: {},
  }),
  actions: {
    // Expand or shrink navigation bar
    changeNavigationBarStatus() {
      this.navigation_bar_status = !this.navigation_bar_status;
    },
    /**
     * Called every time a setting param changes
     * Persists in runtime Pinia store & config store
     * Electron's main process will handle the changes
     * @param settings Object containing the changes of a setting to be made
     * @example { key: 'general.gpu', value: true }
     */
    setSettings(settings) {
      // Update vuex settings
      // key might be a deep nested property like general.mode
      // TODO: Automate deeply nested properties
      let key = settings.key.split('.');
      this.settings[key[0]][key[1]] = settings.value;

      // Persist change to mla config
      window.ipc.send('write_settings', JSON.stringify(settings));
    },
    // Retrieve user's saved MLA settings
    async getSettings() {
      // Get user stored settings
      window.ipc.send('read_settings', ['general', 'theme', 'ai']);
    },
    /**
     * Removes IPC handler, called when Settings page is unmounted
     * @param state
     * @param channel The channel listener to be removed
     */
    removeIPCListener(channel) {
      window.ipc.removeListeners(channel);
    },
  },
  getters: {},
});

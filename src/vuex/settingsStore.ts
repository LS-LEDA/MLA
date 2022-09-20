import {defineStore} from "pinia";

interface SettingsStore {
    settings: object
}

export const useSettingsStore = defineStore('settings', {
    state: (): SettingsStore => ({
        /**
         * Stores MLA user settings
         */
        settings: {},
    }),
    actions: {
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
            let key = settings.key.split('.')
            this.settings[key[0]][key[1]] = settings.value

            // Persist change to mla config
            window.ipc.send('write_settings',
                JSON.stringify(settings)
            );
        },
    },
    getters: {
        // Retrieve user's saved MLA settings
        async getSettings() {
            // Get user stored settings
            window.ipc.send('read_settings', [
                    'general',
                    'theme',
                    'ai'
                ]
            );
        },
    }
});
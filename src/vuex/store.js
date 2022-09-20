import { createStore } from 'vuex'

const store = createStore({
    state() {
        return {
        }
    },
    actions: {
    },
    mutations: {
        /**
         * Removes IPC handler, called when Settings page is unmounted
         * @param state
         * @param channel The channel listener to be removed
         */
        removeIPCListener(state, channel) {
            window.ipc.removeListeners(channel);
        },
    }
});

export default store;
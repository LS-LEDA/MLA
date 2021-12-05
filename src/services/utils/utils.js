import store from "@/vuex/store";

function redirectionAlert(alert_message) {
    store.commit('toggleAlert', alert_message)
    // Delayed alert hiding & store timer ID for user manual dismiss
    store.state.alert.timeout = setTimeout( () => {
        // Automatically hide alert after 5s
        store.commit('toggleAlert', alert_message)
    }, 5000);
}

export { redirectionAlert }
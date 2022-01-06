import store from "@/vuex/store";

/**
 * Shows an alert and sets the a timer to
 * dismiss it after 5 secs.
 * @param alert_message The alert message
 * to display
 */
function redirectionAlert(alert_message) {
    // Sets alert message
    store.commit('setAlertMessage', alert_message)

    // If there's an ongoing timer then reset the timer
    // no need to toggle it because it's already shown,
    // otherwise show the alert
    if ( store.state.alert.status ) {
        window.clearTimeout( store.state.alert.timeout );
    } else {
        // Show alert
        store.commit('toggleAlert');
    }
    // Delayed alert hiding & store timer ID for user manual dismiss
    store.state.alert.timeout = setTimeout( () => {
        // Automatically hide alert after 5s
        store.commit('toggleAlert')
    }, 5000);
}

export { redirectionAlert }
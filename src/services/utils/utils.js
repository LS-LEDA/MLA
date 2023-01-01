import { useAppStore } from '@/vuex/appStore';

/**
 * Shows an alert and sets the a timer to
 * dismiss it after 5 secs.
 * @param alert_message The alert message
 * to display
 */
function redirectionAlert(alert_message) {
  const appStore = useAppStore();
  // Sets alert message
  appStore.setAlertMessage(alert_message);

  // If there's an ongoing timer then reset the timer
  // no need to toggle it because it's already shown,
  // otherwise show the alert
  if (appStore.alert.status) {
    window.clearTimeout(appStore.alert.timeout);
  } else {
    // Show alert
    appStore.toggleAlert();
  }
  // Delayed alert hiding & store timer ID for user manual dismiss
  appStore.alert.timeout = setTimeout(() => {
    // Automatically hide alert after 5s
    appStore.toggleAlert();
  }, 5000);
}

export { redirectionAlert };

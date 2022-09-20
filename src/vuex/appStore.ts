import {defineStore} from "pinia";

interface AppStore {
    alert: object;
    imported_data: object;
    dashboard: object;
    forum_file_name: string;
    forum_messages: [];
    forum: object;
}

export const useAppStore = defineStore('app', {
    state: (): AppStore => ({
        /**
         * Alert popup information
         * @param status: toggles alert
         * @param message: message for the alert
         * @param timeout: timer id for manual dismiss
         */
        alert: {
            status: false,
            message: "Error: Something went wrong",
            timeout: 0,
        },
        /**
         * This value will determine where the navigation
         * header will redirect to:
         * If there's uploaded data Dashboard page is
         * rendered, otherwise Import Data page
         */
        // TODO: Change description
        imported_data: {
            moodle_logs: false,
            forum_logs: false,
        },
        /**
         * Course logs related information
         */
        dashboard: {
            logs_file_name: "",
            course_name: "",
        },
        forum_file_name: "",
        forum_messages: [],
        forum: {
            forum_messages: [],
            messages: 0,
            users: 0,
            sentiments: {},
        },
    }),
    actions: {
        // Set the alert message
        setAlertMessage(message) {
            this.alert.message = message;
        },
        // Toggle alert
        toggleAlert() {
            this.alert.status = !this.alert.status;
        },
        // Call this method if data has been uploaded
        setImportedData({which, file_name, course_name}) {
            // Determine the type of imported file: Moodle logs or Forum logs
            if ( !which ) {
                this.imported_data.moodle_logs = true;
                this.dashboard.logs_file_name = file_name;
                this.dashboard.course_name = course_name;
            } else {
                this.imported_data.forum_logs = true;
                this.forum_file_name = file_name
            }
        },
        // Store the imported forum log
        storeForumMessages(forum) {
            this.forum = forum
        },
    }
});
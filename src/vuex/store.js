import { createStore } from 'vuex'

const store = createStore({
    state() {
        return {
            /**
             * Navigation bar status
             * true:    Expanded
             * false:   Shrank
             */
            navigation_bar_status: false,
            /**
             * This value will determine where the navigation
             * header will redirect to:
             * If there's uploaded data Dashboard page is
             * rendered, otherwise Import Data page
             */
            imported_data: false,
            forum_file_name: "",
            forum_messages: [],
            forum: {
                forum_messages: [],
                messages: 0,
                users: 0,
                sentiments: {},
            },
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
            }
        }
    },
    mutations: {
        // Expand or shrink navigation bar
        changeNavigationBarStatus(){
            this.state.navigation_bar_status = !this.state.navigation_bar_status
        },
        // Call this method if data has been uploaded
        setImportedData(state, file_name) {
            this.state.imported_data = true
            this.state.forum_file_name = file_name
        },
        // Store the imported forum log
        storeForumMessages(state, forum) {
            this.state.forum = forum
        },
        toggleAlert(state, message) {
            // Toggle alert
            this.state.alert.status = !this.state.alert.status;
            this.state.alert.message = message;
        }
    }
});

export default store;
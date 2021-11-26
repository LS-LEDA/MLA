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
            forum_messages: []
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
        // Store the imported chat log
        storeForumMessages(state, forum_messages) {
            this.state.forum_messages = forum_messages
        },
        // Set the date of the forum message
        setMessageDate(state, data) {
            this.state.forum_messages[data.index].created = data.time
        }
    }
});

export default store;
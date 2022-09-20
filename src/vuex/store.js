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
            // TODO: Change description
            imported_data: {
                moodle_logs: false,
                forum_logs: false,
            },
            forum_file_name: "",
            forum_messages: [],
            /**
             * Course logs related information
             */
            dashboard: {
                logs_file_name: "",
                course_name: "",
            },
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
            },
            logs: [],
            summary: {
                total_interactions: 0,
                summary_types: null,
                week_interactions: null,
            },
            summary_cards: [],
            upload_status: {
                status: 0,
                progress: 0
            },
            emotions_dataset: [],
            emotions: [],
            // Saves students participation
            students: {},
        }
    },
    actions: {
        loadProgress(state, time) {
            this.commit('resetProgress');
            this.commit('progressStepCounter', time);
        }
    },
    mutations: {
        // Expand or shrink navigation bar
        changeNavigationBarStatus(){
            this.state.navigation_bar_status = !this.state.navigation_bar_status
        },
        // Call this method if data has been uploaded
        setImportedData(state, {which, file_name, course_name}) {
            // Determine the type of imported file: Moodle logs or Forum logs
            if ( !which ) {
                this.state.imported_data.moodle_logs = true;
                this.state.dashboard.logs_file_name = file_name;
                this.state.dashboard.course_name = course_name;
            } else {
                this.state.imported_data.forum_logs = true;
                this.state.forum_file_name = file_name
            }
        },
        // Store the imported forum log
        storeForumMessages(state, forum) {
            this.state.forum = forum
        },
        // Set the alert message
        setAlertMessage(state, message) {
            this.state.alert.message = message;
        },
        // Toggle alert
        toggleAlert() {
            this.state.alert.status = !this.state.alert.status;
        },
        // Store computed summary data
        saveSummaryTypes(state, summary) {
            this.state.summary.total_interactions = summary.total_interactions;
            this.state.summary.summary_types = summary.summary_types;
        },
        // Saves students participation computed data
        saveStudentParticipation(state, {students}) {
            this.state.students = students;
        },
        // Save number of interactions across a week
        saveWeekInteractions(state, {week_interactions}) {
            this.state.summary.week_interactions = week_interactions;
        },
        // Store computed logs
        saveLogs(state, logs) {
            this.state.logs = logs;
        },
        saveSummaryCard(state, { summaryID, summary }) {
            this.state.summary_cards[summaryID] = summary;
        },
        incrementLoadProgress() {
            // Reset progress
            this.state.upload_status.progress++;
        },
        incrementLoadProgressStatus(){
            this.state.upload_status.progress = 0;
            this.state.upload_status.status++;
        },
        resetProgress() {
            // Store the upload status
            this.state.upload_status.status = 0;
            // Reset progress
            this.state.upload_status.progress = 0;
        },
        progressStepCounter(state, time) {
            let counter = 0;
            let step = time / 100;
            let count = () => {
                counter++;
                // Stop after 100
                if ( counter <= 100) {
                    this.commit('incrementLoadProgress');
                    setTimeout(count, step);
                } else {
                    // Base case, 3 steps completed, stop progress bar
                    if (this.state.upload_status.status >= 2) {
                        // Reset all progress bar status
                        this.commit('resetProgress');
                        return
                    }
                    this.commit('progressStepCounter', 3000);
                    // Once finished advanced to next step
                    this.commit('incrementLoadProgressStatus')
                }
            }
            count(time);
        },
        /**
         * Removes IPC handler, called when Settings page is unmounted
         * @param state
         * @param channel The channel listener to be removed
         */
        removeIPCListener(state, channel) {
            window.ipc.removeListeners(channel);
        },
        /**
         * Save the emotions list after reading it from the dataset
         * @param state
         * @param emotions_list
         */
        saveEmotions(state, emotions_list) {
            state.emotions_dataset = emotions_list;
        },
        /**
         * Save the emotions list
         * @param state
         * @param emotions_list
         */
        saveEmotionsList(state, emotions_list) {
            state.emotions = emotions_list;
        }
    }
});

export default store;
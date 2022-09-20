import { createStore } from 'vuex'

const store = createStore({
    state() {
        return {
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
        // Saves students participation computed data
        saveStudentParticipation(state, {students}) {
            this.state.students = students;
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
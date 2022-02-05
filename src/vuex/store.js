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
            },
            summary_cards: [],
            upload_status: {
                status: 0,
                progress: 0
            },
            /**
             * Stores MLA user settings
             */
            settings: {},
            /**
             * MLA default themes
             */
            themes: [
                {
                    name: "Nabuki Sky",
                    colours: [
                        'bg-[#bfdbfe]',
                        'bg-[#93c5fd]',
                        'bg-[#ffffff]',
                        'bg-[#ffffff]',
                        'bg-[#dbeafe]',
                    ],
                    dark_colours: [
                        'bg-[#64748b]',
                        'bg-[#334155]',
                        'bg-[#1e293b]',
                        'bg-[#64748b]',
                        'bg-[#0f172a]',
                    ]
                },
                {
                    name: "Sakura Pink",
                    colours: [
                        'bg-[#fbcfe8]',
                        'bg-[#f9a8d4]',
                        'bg-[#ffffff]',
                        'bg-[#ffffff]',
                        'bg-[#fce7f3]',
                    ]
                },
                {
                    name: "La Vie en Rose",
                    colours: [
                        'bg-[#fecdd3]',
                        'bg-[#fda4af]',
                        'bg-[#ffffff]',
                        'bg-[#ffffff]',
                        'bg-[#ffe4e6]',
                    ]
                },
                {
                    name: "Summer Splash",
                    colours: [
                        'bg-[#264653]',
                        'bg-[#2A9D8F]',
                        'bg-[#E9C46A]',
                        'bg-[#F4A261]',
                        'bg-[#E76F51]',
                    ]
                },
                {
                    name: "Pastel Dreams",
                    colours: [
                        'bg-[#CDB4DB]',
                        'bg-[#FFC8DD]',
                        'bg-[#FFAFCC]',
                        'bg-[#BDE0FE]',
                        'bg-[#A2D2FF]',
                    ]
                },
                {
                    name: "Berry Blues",
                    colours: [
                        'bg-[#EF476F]',
                        'bg-[#FFD166]',
                        'bg-[#06D6A0]',
                        'bg-[#118AB2]',
                        'bg-[#073B4C]',
                    ]
                }
            ],
            /**
             * MLA theme CSS variables
             */
            colour_properties: [
                '--primary',
                '--primary_variant',
                '--secondary',
                '--secondary_variant',
                '--background',
                '--typography'
            ],
        }
    },
    actions: {
        loadProgress(state, time) {
            this.commit('resetProgress');
            this.commit('progressStepCounter', time);
        },
        // Async method that retrieves user's MLA Settings
        getUserSettings() {
            this.commit('getSettings');
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
        // Retrieve MLA user saved settings
        getSettings() {
            // Get user stored settings
            window.ipc.send('read_settings', [
                    'general',
                    'theme'
                ]
            );
        },
        /**
         * Called every time a setting param changes
         * Persists in runtime vuex store & config store
         * Electron's main process will handle the changes
         * @param state
         * @param settings Object containing the changes of a setting to be made
         * @example { key: 'general.gpu', value: true }
         */
        setSettings(state, settings) {
            // Update vuex settings
            // key might be a deep nested property
            // general.mode
            // TODO: Automate deeply nested properties
            console.log(settings)
            let key = settings.key.split('.')
            this.state.settings[key[0]][key[1]] = settings.value

            // Persist change to mla config
            window.ipc.send('write_settings',
                settings
            );
        },
        /**
         * Removes IPC handler, called when Settings page is unmounted
         * @param state
         * @param channel The channel listener to be removed
         */
        removeIPCListener(state, channel) {
            window.ipc.removeListeners(channel);
        }
    }
});

export default store;
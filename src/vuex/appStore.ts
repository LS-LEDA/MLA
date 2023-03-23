import { defineStore } from 'pinia';
import { AppStore } from './appStoreTypes';


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
      message: 'Error: Something went wrong',
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
      logs_file_name: '',
      course_name: '',
    },
    forum_file_name: '',
    forum_messages: [],
    forum: {
      forum_messages: [],
      messages: 0,
      users: 0,
      sentiments: {},
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
      progress: 0,
    },
    emotions_dataset: [],
    emotions: [],
    // Saves students participation
    students: {},
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
    setImportedData({ which, file_name, course_name }) {
      // Determine the type of imported file: Moodle logs or Forum logs
      if (!which) {
        this.imported_data.moodle_logs = true;
        this.dashboard.logs_file_name = file_name;
        this.dashboard.course_name = course_name;
      } else {
        this.imported_data.forum_logs = true;
        this.forum_file_name = file_name;
      }
    },
    // Store the imported forum log
    storeForumMessages(forum) {
      this.forum = forum;
    },
    // Store computed logs
    saveLogs(logs) {
      this.logs = logs;
    },
    // Store computed summary data
    saveSummaryTypes(summary) {
      this.summary.total_interactions = summary.total_interactions;
      this.summary.summary_types = summary.summary_types;
    },
    // Save number of interactions across a week
    saveWeekInteractions({ week_interactions }) {
      this.summary.week_interactions = week_interactions;
    },
    saveSummaryCard({ summaryID, summary }) {
      this.summary_cards[summaryID] = summary;
    },
    incrementLoadProgress() {
      // Reset progress
      this.upload_status.progress++;
    },
    incrementLoadProgressStatus() {
      this.upload_status.progress = 0;
      this.upload_status.status++;
    },
    resetProgress() {
      // Store the upload status
      this.upload_status.status = 0;
      // Reset progress
      this.upload_status.progress = 0;
    },
    async loadProgress(time) {
      this.resetProgress();
      this.progressStepCounter(time);
    },
    async progressStepCounter(time) {
      let counter = 0;
      let step = time / 100;
      let count = () => {
        counter++;
        // Stop after 100
        if (counter <= 100) {
          this.incrementLoadProgress();
          setTimeout(count, step);
        } else {
          // Base case, 3 steps completed, stop progress bar
          if (this.upload_status.status >= 2) {
            // Reset all progress bar status
            this.resetProgress();
            return;
          }
          this.progressStepCounter(3000);
          // Once finished advanced to next step
          this.incrementLoadProgressStatus();
        }
      };
      count(time);
    },
    /**
     * Save the emotions list after reading it from the dataset
     * @param emotions_list
     */
    saveEmotions(emotions_list) {
      this.emotions_dataset = emotions_list;
    },
    /**
     * Save the emotions list
     * @param emotions_list
     */
    saveEmotionsList(emotions_list) {
      this.emotions = emotions_list;
    },
    // Saves students participation computed data
    saveStudentParticipation({ students }) {
      this.students = students;
    },
  },
});

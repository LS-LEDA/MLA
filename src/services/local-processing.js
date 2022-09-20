// Local Processing Service
import store from "@/vuex/store";
import router from "@/router/router";
import {moodle_logs_processing} from "@/services/moodle_logs_processing";
import {forum_logs_processing} from "@/services/forum_logs_processing";
import {useAppStore} from "@/vuex/appStore";

const UNSUPPORTED_FILE_TYPE = -2
const SUPPORTED_FILE_TYPE   = 2

const file_reader = new FileReader()

// Progress Status
/*const FILE_UPLOAD = 0;
const DATA_PROCESSING = 1;
const OVERVIEW_GENERATION = 2;
const FINISH = 3;*/

function local_processing(file) {
    const appStore = useAppStore();
    // Check if it's a JSON log file
    if ( check_file_type(file.type) === UNSUPPORTED_FILE_TYPE ) {
        return UNSUPPORTED_FILE_TYPE;
    }

    // Messages log file
    file_reader.onload = (event) => {
        let data = JSON.parse(event.target.result);
        // Check whether it's a Moodle Logs or Moodle Forum message Logs file
        if ( Array.isArray(data[0][0])) {
            moodle_logs_processing(data, file.name);
        } else {
            forum_logs_processing(data, file.name);
        }
    }

    // Start fake upload progress counting on load file.
    // Start fake data processing
    file_reader.onloadstart = () => {
        appStore.loadProgress(2000).then(
            () => {
                setTimeout( () => {
                    if ( appStore.imported_data.moodle_logs && appStore.imported_data.forum_logs ) {
                        router.push('/dashboard/summary');
                    }
                    // Redirect to Summary tab
                    if ( appStore.imported_data.moodle_logs && !appStore.imported_data.forum_logs ) {
                        router.push('/dashboard/summary');
                    }
                    // Redirect to Sentiment tab
                    if ( !appStore.imported_data.moodle_logs && appStore.imported_data.forum_logs ) {
                        router.push('/dashboard/sentiment');
                    }
                }, 9000)
            }
        );
    }

    // Upload file progress
    // This function will be called only once~twice for small - medium sized files
    /*file_reader.onprogress = (event) => {
        if ( event.lengthComputable ) {
            let progress = parseInt( ((event.loaded / event.total) * 100), 10 );
            console.log( progress );
            console.log(event)
        }
    }*/

    file_reader.readAsText(file)
}

function check_file_type(filetype) {
    if (filetype !== "application/json") {
        return UNSUPPORTED_FILE_TYPE;
    }
    return SUPPORTED_FILE_TYPE;
}

export { local_processing }
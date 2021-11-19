// Local Processing Service
import store from "@/vuex/store";

const UNSUPPORTED_FILE_TYPE = -2
const SUPPORTED_FILE_TYPE   = 2

const file_reader = new FileReader()

function local_processing(file) {

    // Check if it's a JSON log file
    if ( check_file_type(file.type) === UNSUPPORTED_FILE_TYPE ) {
        return UNSUPPORTED_FILE_TYPE
    }

    // Messages log file
    file_reader.onload = (event) => {
        let data = JSON.parse(event.target.result)

        let messages = data[0]

        // Store message in vuex
        store.commit('storeForumMessages', messages)
    }

    file_reader.readAsText(file)
}

function check_file_type(filetype) {
    console.log(filetype)
    if (filetype !== "application/json") {
        return UNSUPPORTED_FILE_TYPE
    }
    return SUPPORTED_FILE_TYPE
}

export { local_processing }
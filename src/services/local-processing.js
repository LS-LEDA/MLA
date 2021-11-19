// Local Processing Service

const UNSUPPORTED_FILE_TYPE = -2
const SUPPORTED_FILE_TYPE   = 2

const file_reader = new FileReader()

function local_processing(file) {

    // Check if it's a JSON log file
    if ( check_file_type(file.type) === UNSUPPORTED_FILE_TYPE ) {
        return UNSUPPORTED_FILE_TYPE
    }
}

function check_file_type(filetype) {
    console.log(filetype)
    if (filetype !== "application/json") {
        return UNSUPPORTED_FILE_TYPE
    }
    return SUPPORTED_FILE_TYPE
}

export { local_processing }
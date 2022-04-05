import {summary_processing, weekly_interactions_processing} from "@/services/Summary/summary-processing";
import Log from "@/services/model/Log";
import store from "@/vuex/store";
import {student_dedication, student_participation} from "@/services/Students/students-processing";
//import router from "@/router/router";

function moodle_logs_processing(data, name){
    let logs = [];

    // Get imported logs' course name
    let course_name = data[0][0][3].substr(
        data[0][0][3].indexOf(' ') + 1
    );

    data[0].forEach( (lg) => {
        logs.push(
            new Log(lg[0], lg[1], lg[2], lg[3], lg[4], lg[5], lg[6], lg[7], lg[8])
        )
    })
    store.commit('saveLogs', logs);

    // Save the first/last date with logs data
    let first_date = logs[logs.length - 1].timestamp;
    let last_date = logs[0].timestamp;
    store.commit('saveDataDates', {first_date: first_date, last_date: last_date})

    let summary_types = summary_processing(logs);
    let students = student_participation(logs);
    // TODO: Improve processing. Maybe create a Student model
    student_dedication(logs, students);
    let weekly_interactions = weekly_interactions_processing(logs)

    store.commit('saveSummaryTypes', {
            total_interactions: logs.length,
            summary_types: summary_types
        }
    );

    store.commit('saveStudentParticipation', {
            students: students,
        }
    );

    store.commit('saveWeekInteractions', {
            week_interactions: weekly_interactions,
        }
    );

    // Set moodle imported data true
    store.commit('setImportedData', {
            which: false,
            file_name: name,
            course_name: course_name
        }
    );
    // Push to Dashboard > Summary
    //router.push('/dashboard/summary');
}

/**
 * After a date selection, either start or end date.
 * It applies a filtering to the logs and updates the
 * values used in the app
 * @param start_date UNIX timestamp in ms / 1000
 * @param end_date UNIX timestamp in ms / 1000
 */
function logs_apply_filter(start_date, end_date) {
    let filtered_logs = store.state.logs.filter((log) => {
        if (log.timestamp >= start_date && log.timestamp <= end_date) {
            return true;
        }
        return false;
    })

    // TODO: Solve duplicated code from moodle_logs_processing
    let summary_types = summary_processing(filtered_logs);
    let students = student_participation(filtered_logs);
    student_dedication(filtered_logs, students);
    let weekly_interactions = weekly_interactions_processing(filtered_logs)

    store.commit('saveSummaryTypes', {
            total_interactions: filtered_logs.length,
            summary_types: summary_types
        }
    );

    store.commit('saveStudentParticipation', {
            students: students,
        }
    );

    store.commit('saveWeekInteractions', {
            week_interactions: weekly_interactions,
        }
    );
}

export { moodle_logs_processing, logs_apply_filter };
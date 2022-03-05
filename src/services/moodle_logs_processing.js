import {summary_processing} from "@/services/Summary/summary-processing";
import Log from "@/services/model/Log";
import store from "@/vuex/store";
import {student_participation} from "@/services/Students/students-processing";
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

    let summary_types = summary_processing(logs);
    let students = student_participation(logs);

    store.commit('saveSummaryTypes', {
            total_interactions: logs.length,
            summary_types: summary_types
        }
    );

    store.commit('saveStudentParticipation', {
            students: students,
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

export { moodle_logs_processing };
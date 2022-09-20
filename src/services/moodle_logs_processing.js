import {summary_processing, weekly_interactions_processing} from "@/services/Summary/summary-processing";
import Log from "@/services/model/Log";
import store from "@/vuex/store";
import {student_dedication, student_participation} from "@/services/Students/students-processing";
import {useAppStore} from "@/vuex/appStore";
//import router from "@/router/router";

function moodle_logs_processing(data, name){
    const appStore = useAppStore();
    let logs = [];

    // Get imported logs' course name
    // The first log index always contain the course name
    let first_log_index = data[0].length - 1;
    let course_name = data[0][first_log_index][3].substr(
        data[0][0][3].indexOf(' ') + 1
    );

    data[0].forEach( (lg) => {
        logs.push(
            new Log(lg[0], lg[1], lg[2], lg[3], lg[4], lg[5], lg[6], lg[7], lg[8])
        )
    })
    appStore.saveLogs(logs);

    let summary_types = summary_processing(logs);
    let students = student_participation(logs);
    // TODO: Improve processing. Maybe create a Student model
    student_dedication(logs, students);
    let weekly_interactions = weekly_interactions_processing(logs)

    appStore.saveSummaryTypes({
        total_interactions: logs.length,
        summary_types: summary_types
    });

    appStore.saveStudentParticipation({
        students: students,
    });

    appStore.saveWeekInteractions({
        week_interactions: weekly_interactions,
    });

    // Set moodle imported data true
    appStore.setImportedData({
        which: false,
        file_name: name,
        course_name: course_name
    });
    // Push to Dashboard > Summary
    //router.push('/dashboard/summary');
}

export { moodle_logs_processing };
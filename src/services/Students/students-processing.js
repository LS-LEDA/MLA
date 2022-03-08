/**
 * Groups and associates moodle logs to students
 * @param logs
 * @returns {} an object containing all students
 */
function student_participation(logs) {
    let students = {};
    logs.forEach( log => {
        if ( !(log.id in students) ) {
            students[log.id] = {
                count: 0,
                percent: 0.0,
                total: 1,
                timestamp: null,
                last_resource: ''
            }
        }
        students[log.id].count += 1;
    });

    // Calculate students' involvement percentage
    Object.keys(students).map(function(key) {
        students[key].percent = (students[key].count*100) / logs.length;
    });

    return students;
}

/**
 * Loops the logs and for each student
 * calculate a time dedication estimate
 * @param logs moodle logs
 * @param students an object containing all students
 */
function student_dedication(logs, students) {

    // Loop from the very end because the logs are in DESC order
    // which means that the first logs will be the more recent ones
    // Another option could be sorting the logs array, but that's inefficient
    for (let i = logs.length - 1; i >= 0; i--) {
        /*if ( !(logs[i].id in students) ) {
            students[logs[i].id] = {
                total: 1,
                timeField: logs[i].timestamp
            }
        }*/
        // Log timestamp and student's last timestamp difference
        let min = Math.abs( (logs[i].timestamp - students[logs[i].id].timestamp) / 1000 / 60 );

        if ( min <= 15 ) {
            // Add minutes difference
            students[logs[i].id].total += min;
        } else {
            // Add 1 minute for each hit below timeSession
            students[logs[i].id].total++;
        }
        // Lates interaction timestamp
        students[logs[i].id].timestamp = logs[i].timestamp;
        // Latest resource interaction
        students[logs[i].id].last_resource = logs[i].course;
    }
}

export { student_participation, student_dedication };
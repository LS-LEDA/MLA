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
                percent: 0.0
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

export { student_participation };
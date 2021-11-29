function summary_processing(logs) {
    let tasks_count =   0;
    let files_count =   0;
    let pages_count =   0;
    let url_count   =   0;
    let lti_count   =   0;
    let wiki_count  =   0;

    let task_type = {};
    let type = {};
    logs.forEach( (log) => {

        type[log.type] = (type[log.type] + 1) || 1;
        /*switch (log.type) {
            case 'Tarea':
            case 'Tarea':
            case 'Tarea':
            case 'Tarea':
            case 'Tarea':
            case 'Tarea':
        }*/
        if ( log.type === 'Tarea') {
            tasks_count++;
            task_type[log.interaction] = (task_type[log.interaction] + 1) || 1;
        }
    })
}

export { summary_processing };
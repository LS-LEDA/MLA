function summary_processing(logs) {
    let type = {};
    logs.forEach( (log) => {
        // Process all types of logs and count each one of them
        if ( type[log.type] !== undefined ) {
            type[log.type].count +=1;
            type[log.type].interactions[log.interaction] = (type[log.type].interactions[log.interaction] + 1) || 1;
        } else {
            type[log.type] = {
                count: 1,
                interactions: {}
            }
            type[log.type].interactions[log.interaction] = 1;
        }
    })

    return type;
}

export { summary_processing }